import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome6';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import {Button, useTheme} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {RootState} from '../../Store/store';
import {useNavigation} from '@react-navigation/native';

interface ExpenseDetailsFormProps {
  expenseDetails: any;
  setExpenseDetails: any;
  showDatePicker: boolean;
  setShowDatePicker: (val: boolean) => void;
  onChangeDate: (event: DateTimePickerEvent, selectedDate?: Date) => void;
  onSave: () => void;
}

const ExpenseDetailsForm: React.FC<ExpenseDetailsFormProps> = ({
  expenseDetails,
  setExpenseDetails,
  showDatePicker,
  setShowDatePicker,
  onChangeDate,
  onSave,
}) => {
  const navigation = useNavigation();
  const {categoriesList} = useSelector((state: RootState) => state.expenses);
  const {colors} = useTheme();
  const styles = getStyles(colors);

  const half = Math.ceil(categoriesList.length / 2);
  const row1 = categoriesList.slice(0, half);
  const row2 = categoriesList.slice(half);

  return (
    <View style={styles.detailsContainer}>
      <ScrollView>
        <View style={styles.categoryTitleWrapper}>
          <Text style={styles.sectionLabel}>Category</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('CategoriesScreen')}>
            <EntypoIcon
              name="dots-three-vertical"
              size={20}
              style={styles.inputIcon}
            />
          </TouchableOpacity>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalCategoryWrapper}>
          <View style={styles.twoRowGrid}>
            {[row1, row2].map((row, idx) => (
              <View key={idx} style={styles.categoryRow}>
                {row.map(cat => (
                  <TouchableOpacity
                    key={cat.label}
                    style={[
                      styles.categoryButton,
                      expenseDetails.category === cat.label && {
                        backgroundColor: cat.color,
                      },
                    ]}
                    onPress={() =>
                      setExpenseDetails((prev: any) => ({
                        ...prev,
                        category: cat.label,
                      }))
                    }>
                    <Icon
                      name={cat.icon}
                      size={24}
                      color={
                        expenseDetails.category === cat.label
                          ? '#fff'
                          : cat.color
                      }
                    />
                    <Text
                      style={[
                        styles.categoryLabel,
                        {
                          color:
                            expenseDetails.category === cat.label
                              ? '#fff'
                              : '#000',
                        },
                      ]}>
                      {cat.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </View>
        </ScrollView>

        <Text style={styles.sectionLabel}>Details</Text>
        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <View style={styles.inputRow}>
            <Icon name="calendar" size={20} style={styles.inputIcon} />
            <Text style={styles.input}>
              {typeof expenseDetails.date === 'string'
                ? new Date(expenseDetails.date).toDateString()
                : expenseDetails.date.toDateString()}
            </Text>
          </View>
        </TouchableOpacity>

        <View style={styles.inputRow}>
          <Icon name="sticky-note" size={20} style={styles.inputIcon} />
          <TextInput
            placeholder="Add a note..."
            value={expenseDetails.note}
            onChangeText={text =>
              setExpenseDetails((prev: any) => ({...prev, note: text}))
            }
            style={styles.input}
          />
        </View>

        {showDatePicker && (
          <DateTimePicker
            value={
              typeof expenseDetails.date === 'string'
                ? new Date(expenseDetails.date)
                : expenseDetails.date
            }
            mode="date"
            onChange={onChangeDate}
            display="spinner"
          />
        )}
      </ScrollView>

      <Button
        mode="contained"
        onPress={onSave}
        style={styles.saveButton}
        contentStyle={{paddingVertical: 8}}
        labelStyle={{fontSize: 16}}>
        Save Expense
      </Button>
    </View>
  );
};

const getStyles = (colors: any) =>
  StyleSheet.create({
    detailsContainer: {
      flexGrow: 1,
      paddingTop: 30,
      paddingBottom: 80,
      paddingHorizontal: 20,
    },
    categoryTitleWrapper: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    sectionLabel: {
      fontSize: 16,
      marginBottom: 10,
      fontFamily: 'Roboto-Bold',
    },
    horizontalCategoryWrapper: {
      flexDirection: 'row',
    },
    twoRowGrid: {
      flexDirection: 'column',
    },
    categoryRow: {
      flexDirection: 'row',
      marginBottom: 10,
    },
    categoryButton: {
      width: 110,
      height: 100,
      backgroundColor: '#eee',
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 10,
    },
    categoryLabel: {
      marginTop: 6,
      fontSize: 14,
      textAlign: 'center',
      fontFamily: 'Roboto-Regular',
    },
    inputRow: {
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomWidth: 1,
      marginBottom: 20,
    },
    inputIcon: {marginRight: 8, color: '#555'},
    input: {
      flex: 1,
      fontSize: 16,
      paddingVertical: 8,
      fontFamily: 'Roboto-Regular',
    },
    saveButton: {
      marginTop: 20,
      borderRadius: 8,
      backgroundColor: colors['700'],
    },
  });

export default ExpenseDetailsForm;
