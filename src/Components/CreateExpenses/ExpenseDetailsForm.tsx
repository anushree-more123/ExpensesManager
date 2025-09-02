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
// @ts-ignore
import Icon from 'react-native-vector-icons/FontAwesome6';
import {Button, useTheme} from 'react-native-paper';
import {categories} from '../Constants/categories';

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
  const {colors} = useTheme();
  const styles = getStyles(colors);
  return (
    <View style={styles.detailsContainer}>
      <ScrollView>
        <Text style={styles.sectionLabel}>Category</Text>
        <View style={styles.categoryGrid}>
          {categories.map(cat => (
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
                  expenseDetails.category === cat.label ? '#fff' : cat.color
                }
              />
              <Text
                style={[
                  styles.categoryLabel,
                  {
                    color:
                      expenseDetails.category === cat.label ? '#fff' : '#000',
                  },
                ]}>
                {cat.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

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
    sectionLabel: {
      fontSize: 16,
      marginBottom: 10,
      fontFamily: 'Roboto-Bold',
    },
    categoryGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    categoryButton: {
      width: '32%',
      backgroundColor: '#eee',
      padding: 10,
      marginBottom: '2%',
      borderRadius: 8,
      alignItems: 'center',
      height: 100,
      justifyContent: 'center',
    },
    categoryLabel: {
      marginTop: 6,
      fontSize: 14,
      textAlign:'center',
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
