import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { useTheme } from 'react-native-paper';
import { RootState } from '../../Store/store';
import { Period } from '../ReportAnalytics/ReportAnalyticsType';
import ReportSummaryChart from '../ReportAnalytics/ReportSummaryChart';
import ReportList from '../ReportAnalytics/ReportList';
import DurationTab from '../ReportAnalytics/DurationTab';

interface Category {
  label: string;
  icon: string;
  color: string;
}
interface ExpenseEntry {
  category: string;
  amount: string;
  date: string;
}

const categories: Category[] = [
  { label: 'Food and Drinks', icon: 'pizza-slice', color: '#FF7043' },
  { label: 'Leisure', icon: 'face-smile-wink', color: '#81C784' },
  { label: 'Transportation', icon: 'bus', color: '#4FC3F7' },
  { label: 'Health', icon: 'hand-holding-medical', color: '#FF2C2C' },
  { label: 'Shopping', icon: 'cart-shopping', color: '#7B1FA2' },
  { label: 'Utilities', icon: 'screwdriver-wrench', color: '#5A5A5A' },
];

const ReportScreen: React.FC = () => {
  const { colors } = useTheme();
  const styles = getStyles(colors);

  const expenseHistory = useSelector((state: RootState) => state.expenses.expenseHistory);
  const [period, setPeriod] = useState<Period>('Monthly');

  const currentMonth = moment().month();
  const currentYear = moment().year();
  const currentWeek = moment().week();

  const groupByCategory = (data: ExpenseEntry[]) => {
    const grouped: { [key: string]: ExpenseEntry[] } = {};
    data.forEach((entry) => {
      const entryDate = moment(entry.date);
      let periodMatch = false;
      switch (period) {
        case 'Monthly':
          periodMatch = entryDate.month() === currentMonth && entryDate.year() === currentYear;
          break;
        case 'Weekly':
          periodMatch = entryDate.week() === currentWeek && entryDate.year() === currentYear;
          break;
        case 'Yearly':
          periodMatch = entryDate.year() === currentYear;
          break;
      }
      if (periodMatch) {
        if (!grouped[entry.category]) grouped[entry.category] = [];
        grouped[entry.category].push(entry);
      }
    });
    return grouped;
  };

  const groupedData = useMemo(() => groupByCategory(expenseHistory), [expenseHistory, period]);

  const pieData = useMemo(
    () =>
      Object.keys(groupedData).map((key) => {
        const total = groupedData[key].reduce((sum, e) => sum + parseFloat(e.amount || '0'), 0);
        const categoryMeta = categories.find((c) => c.label === key);
        return {
          value: total,
          color: categoryMeta?.color || colors['500'],
          label: key,
        };
      }),
    [groupedData]
  );

  const totalAmount = pieData.reduce(
    (sum, p) => sum + (typeof p.value === 'number' && !isNaN(p.value) ? p.value : 0),
    0
  );

  const getPeriodLabel = () => {
    switch (period) {
      case 'Monthly':
        return moment().format('MMMM YYYY');
      case 'Weekly':
        return `Week ${currentWeek} of ${currentYear}`;
      case 'Yearly':
        return currentYear.toString();
      default:
        return moment().format('MMMM YYYY');
    }
  };

  return (
    <View style={styles.container}>
      <DurationTab value={period} onChange={setPeriod} />

      <View style={styles.headerCard}>
        <View style={styles.headerRow}>
          <Text style={styles.headerTitle}>Summary</Text>
          <TouchableOpacity>
            <Text style={styles.periodSelector}>{getPeriodLabel()}</Text>
          </TouchableOpacity>
        </View>

        <ReportSummaryChart pieData={pieData} totalAmount={totalAmount} />
      </View>

      <ReportList data={pieData} groupedData={groupedData} categories={categories} />
    </View>
  );
};

export default ReportScreen;

const getStyles = (colors: any) =>
  StyleSheet.create({
    container: { flex: 1, width: '100%', backgroundColor: colors.background },
    listContent: { padding: 20, paddingBottom: 120 },

    headerCard: {
      margin: 16,
      borderRadius: 16,
      padding: 20,
      backgroundColor: colors.surface,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.outline,
    },
    headerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.onSurface,
    },
    periodSelector: {
      fontSize: 14,
      color: colors.onSurface,
      opacity: 0.7,
    },
    pieChartWrapper: {
      alignItems: 'center',
      marginTop: 20,
    },

    centerLabel: {
      fontSize: 12,
      textAlign: 'center',
      color: colors.outline,
    },
    centerValue: {
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      color: colors.onSurface,
    },

    card: {
      backgroundColor: colors.surface,
      padding: 16,
      borderRadius: 12,
      marginBottom: 12,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.outline,
    },
    rowBetween: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    rowLeft: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    cardTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.onSurface,
    },
    cardSubtitle: {
      fontSize: 12,
      color: colors.outline,
      marginTop: 4,
    },
    cardAmount: {
      fontSize: 16,
      fontWeight: '700',
      color: colors.onSurface,
    },
  });
