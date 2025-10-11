import React from 'react';
import {Text, SectionList, SafeAreaView, StyleSheet} from 'react-native';
import {useTheme} from 'react-native-paper';
import {useSelector} from 'react-redux';
import moment from 'moment';
import {getFormattedHistory} from '../Utils/getFormattedHistory';
import {RootState} from '../../Store/store';
import BarChartCard from '../ExpenseHistory/BarChartCard';
import TransactionItem from '../ExpenseHistory/TransactionItem';

const ExpenseHistoryScreen = () => {
  const {colors} = useTheme();
  const styles = getStyles(colors);

  const expenseHistory = useSelector(
    (state: RootState) => state.expenses.expenseHistory,
  );
  const {categoriesList} = useSelector((state: RootState) => state.expenses);

  const formattedHistory = getFormattedHistory(expenseHistory, categoriesList);

  const renderItem = ({item}: any) => <TransactionItem item={item} />;

  const renderSectionHeader = ({section: {title}}: any) => (
    <Text style={styles.sectionHeader}>{title}</Text>
  );

  const currentYear = moment().year();
  const monthlyTotals = Object.values(
    expenseHistory
      .filter(entry => moment(entry.date).year() === currentYear)
      .reduce((acc: Record<string, {label: string; value: number}>, entry) => {
        const month = moment(entry.date).format('MMM');
        const amount = parseFloat(String(entry.amount) || '0');
        if (!acc[month]) acc[month] = {label: month, value: 0};
        acc[month].value += isNaN(amount) ? 0 : amount;
        return acc;
      }, {}),
  ).sort(
    (a, b) => moment(a.label, 'MMM').month() - moment(b.label, 'MMM').month(),
  );

  const totalAmount = expenseHistory
    .reduce(
      (total, entry) => total + parseFloat(String(entry.amount) || '0'),
      0,
    )
    .toFixed(2);

  return (
    <SafeAreaView style={styles.container}>
      <BarChartCard totalAmount={totalAmount} monthlyTotals={monthlyTotals} />
      <SectionList
        sections={formattedHistory}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        contentContainerStyle={styles.listContent}
        stickySectionHeadersEnabled
      />
    </SafeAreaView>
  );
};

export default ExpenseHistoryScreen;

const getStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      width: '100%',
      flex: 1,
      backgroundColor: colors.background,
    },
    listContent: {
      paddingHorizontal: 20,
    },
    sectionHeader: {
      fontSize: 16,
      marginTop: 20,
      marginBottom: 10,
      fontFamily: 'Roboto-Bold',
    },
  });
