import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {PieChart} from 'react-native-gifted-charts';
import {useTheme} from 'react-native-paper';

interface ReportSummaryChartProps {
  pieData: {value: number; color: string; label: string}[];
  totalAmount: number;
}

const ReportSummaryChart: React.FC<ReportSummaryChartProps> = ({
  pieData,
  totalAmount,
}) => {
  const {colors} = useTheme();
  const styles = getStyles(colors);
  console.log('pieData', pieData);
  if (!pieData || pieData.length === 0) {
    return;
  }
  return (
    <View style={styles.container}>
      {/* Pie Chart */}
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

      {/* Legend Section */}
      <View style={styles.legendWrapper}>
        {pieData.map((item, index) => (
          <View key={index} style={styles.legendItem}>
            <View style={[styles.colorDot, {backgroundColor: item.color}]} />
            <Text style={styles.legendText}>{item.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default ReportSummaryChart;

const getStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      marginTop: 20,
    },
    pieChartWrapper: {
      alignItems: 'center',
      marginBottom: 16,
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
    legendWrapper: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      paddingHorizontal: 20,
      gap: 8,
    },
    legendItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: 8,
      marginVertical: 4,
    },
    colorDot: {
      width: 12,
      height: 12,
      borderRadius: 2,
      marginRight: 6,
    },
    legendText: {
      fontSize: 13,
      color: colors.onSurface,
    },
  });
