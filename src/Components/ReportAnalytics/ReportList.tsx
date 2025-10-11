import React from 'react';
import {FlatList, View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import {useTheme} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {RootState} from '../../Store/store';

interface ReportListProps {
  data: {label: string; value: number}[];
  groupedData: {[key: string]: any[]};
}

const ReportList: React.FC<ReportListProps> = ({data, groupedData}) => {
  const {colors} = useTheme();
  const styles = getStyles(colors);
  const {categoriesList} = useSelector((state: RootState) => state.expenses);

  const renderLegendItem = ({item}: {item: {label: string; value: number}}) => {
    const meta = categoriesList.find(c => c.label === item.label);
    const amount = typeof item.value === 'number' ? item.value : 0;
    return (
      <View style={styles.card}>
        <View style={styles.rowBetween}>
          <View style={styles.rowLeft}>
            <Icon
              name={meta?.icon || 'circle'}
              size={20}
              color={meta?.color || colors['500']}
              style={{marginRight: 8}}
            />
            <Text style={styles.cardTitle}>{item.label}</Text>
          </View>
          <Text style={styles.cardAmount}>₹{amount.toFixed(2)}</Text>
        </View>
        <Text style={styles.cardSubtitle}>
          {groupedData[item.label]?.length || 0} Transactions
        </Text>
      </View>
    );
  };

  return (
    <FlatList
      data={data}
      renderItem={renderLegendItem}
      keyExtractor={item => item.label}
      contentContainerStyle={styles.listContent}
    />
  );
};

export default ReportList;

const getStyles = (colors: any) =>
  StyleSheet.create({
    listContent: {padding: 20, paddingBottom: 120},
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
