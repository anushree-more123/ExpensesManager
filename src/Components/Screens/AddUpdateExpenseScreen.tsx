import React, {useEffect, useMemo, useState} from 'react';
import {View, TouchableOpacity, StyleSheet, Platform} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch} from 'react-redux';
import uuid from 'react-native-uuid';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {
  addExpenseHistory,
  updateExpenseHistory,
  type ExpenseEntry,
} from '../CreateExpenses/expensesSlice';
import AmountDisplay from '../CreateExpenses/AmountDisplay';
import CalculatorKeyboard from '../CreateExpenses/CalculatorKeyboard';
import ExpenseDetailsForm from '../CreateExpenses/ExpenseDetailsForm';
import {RootStackParamList} from '../Navigation/RootStackParamList';
import {ColorMethods} from '../../theme/color.methods';

type Nav = StackNavigationProp<
  RootStackParamList,
  'AddExpenses' | 'UpdateExpenses'
>;
type Rte = RouteProp<RootStackParamList, 'AddExpenses' | 'UpdateExpenses'>;

type ExpenseDetailsState = Omit<ExpenseEntry, 'id' | 'date'> & {
  id?: string;
  date: Date | string;
};

type LegacyExpenseParam = {
  id: string;
  amount: string;
  title: string;
  subtitle: string;
  date: string;
};

function normalizeFromRouteParam(
  e?: ExpenseEntry | LegacyExpenseParam,
): ExpenseDetailsState | null {
  if (!e) return null;
  if ('title' in e && 'subtitle' in e) {
    return {
      id: e.id,
      amount: e.amount ?? '',
      note: e.title ?? '',
      category: e.subtitle ?? '',
      date: e.date,
    };
  }
  return {
    id: e.id,
    amount: e.amount ?? '',
    note: e.note ?? '',
    category: e.category ?? '',
    date: e.date,
  };
}

const AddUpdateExpenseScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Rte>();

  const dispatch = useDispatch();

  const initialState: ExpenseDetailsState = useMemo(
    () => ({
      amount: '',
      note: '',
      date: new Date(),
      category: '',
      id: undefined,
    }),
    [],
  );

  const [expenseDetails, setExpenseDetails] = useState<ExpenseDetailsState>({
    ...initialState,
  });
  const [showDetails, setShowDetails] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Pre-fill when UpdateExpenses
  useEffect(() => {
    if (route.name === 'UpdateExpenses') {
      const pre = normalizeFromRouteParam(route.params?.expenseDetails as any);
      if (pre) {
        setExpenseDetails(pre);
        setShowDetails(true);
      }
    }
  }, [route]);

  const handleKeyPress = (key: string) => {
    const operators = ['+', '-', '*', '/', '.'];

    if (key === '✓') {
      try {
        const cleanAmount = expenseDetails.amount.replace(/[-*+/\.]+$/, '');
        if (cleanAmount !== '') {
          const result = eval(cleanAmount);
          if (!isNaN(result)) {
            setExpenseDetails(prev => ({
              ...prev,
              amount: Number(result).toFixed(2),
            }));
            setShowDetails(true);
          }
        } else {
          setShowDetails(true);
        }
      } catch {
        console.warn('Invalid expression');
      }
      return;
    }

    setExpenseDetails(prev => {
      const lastChar = prev.amount.slice(-1);
      if (operators.includes(lastChar) && operators.includes(key)) {
        return {...prev, amount: prev.amount.slice(0, -1) + key};
      }
      return {...prev, amount: prev.amount + key};
    });
  };

  const onChangeDate = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setExpenseDetails(prev => ({...prev, date: selectedDate}));
    }
  };

  const clearState = () => {
    setShowDetails(false);
    setExpenseDetails({...initialState});
  };

  const closeAddExpenses = () => {
    if (showDetails) {
      clearState();
      navigation.navigate('Home');
    } else {
      setShowDetails(true);
    }
  };

  const saveExpense = () => {
    if (expenseDetails.amount.length === 0) return;

    const normalizedDate =
      typeof expenseDetails.date === 'string'
        ? expenseDetails.date
        : expenseDetails.date.toISOString();

    if (route.name === 'UpdateExpenses') {
      if (!expenseDetails.id) {
        console.warn('Missing expense id for update');
        return;
      }
      const payload: ExpenseEntry = {
        id: expenseDetails.id,
        amount: expenseDetails.amount,
        note: expenseDetails.note,
        category: expenseDetails.category || 'Others',
        date: normalizedDate,
      };
      dispatch(updateExpenseHistory(payload));
    } else {
      const payload: ExpenseEntry = {
        id: uuid.v4() as string,
        amount: expenseDetails.amount,
        note: expenseDetails.note,
        category: expenseDetails.category || 'Others',
        date: normalizedDate,
      };
      dispatch(addExpenseHistory(payload));
    }

    closeAddExpenses();
  };

  return (
    <View style={Styles.container}>
      <View style={Styles.headerContainer}>
        <View style={Styles.header}>
          <TouchableOpacity onPress={closeAddExpenses}>
            <AntDesign
              name="close"
              size={24}
              color={ColorMethods.GetColorFromColorCode('slate_500')}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => setShowDetails(false)}>
          <AmountDisplay
            amount={expenseDetails.amount}
            showDetails={showDetails}
            onBackspace={() =>
              setExpenseDetails(prev => ({
                ...prev,
                amount: prev.amount.slice(0, -1),
              }))
            }
          />
        </TouchableOpacity>
      </View>

      <View style={Styles.flexArea}>
        {!showDetails ? (
          <CalculatorKeyboard onKeyPress={handleKeyPress} />
        ) : (
          <ExpenseDetailsForm
            expenseDetails={expenseDetails}
            setExpenseDetails={setExpenseDetails}
            showDatePicker={showDatePicker}
            setShowDatePicker={setShowDatePicker}
            onChangeDate={onChangeDate}
            onSave={saveExpense}
          />
        )}
      </View>
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorMethods.GeSecondarytColorFromColorCode(
      'pageBackgroundColor',
    ),
    paddingTop: 20,
  },
  headerContainer: {paddingHorizontal: 20},
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
  },
  flexArea: {flexGrow: 1, justifyContent: 'flex-end'},
});

export default AddUpdateExpenseScreen;
