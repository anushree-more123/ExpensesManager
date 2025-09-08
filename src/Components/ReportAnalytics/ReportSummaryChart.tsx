import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';
import { useTheme } from 'react-native-paper';

interface ReportSummaryChartProps {
  pieData: { value: number; color: string; label: string }[];
  totalAmount: number;
}

const ReportSummaryChart: React.FC<ReportSummaryChartProps> = ({ pieData, totalAmount }) => {
  const { colors } = useTheme();
  const styles = getStyles(colors);

  return (
    <View style={styles.pieChartWrapper}>
      <PieChart
        data={pieData}
        donut
        showText
        textColor={colors.onSurface}
        textSize={18}
        radius={90}
        innerRadius={60}
        centerLabelComponent={() => (
          <View>
            <Text style={styles.centerLabel}>Amount</Text>
            <Text style={styles.centerValue}>₹{totalAmount.toFixed(0)}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default ReportSummaryChart;

const getStyles = (colors: any) =>
  StyleSheet.create({
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
  });
