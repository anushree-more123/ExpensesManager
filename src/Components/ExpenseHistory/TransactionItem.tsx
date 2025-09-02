import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../Navigation/navigationTypes';

// Define types for the props
type NavigationProp = StackNavigationProp<RootStackParamList, 'UpdateExpenses'>;

interface TransactionItemProps {
  item: {
    icon: string;
    color: string;
    title: string;
    subtitle: string;
    amount: string; // Initially a string, but will be converted to a number for display
    date: string; // ISO string date
    id: string; // Unique identifier for the transaction
  };
}

const TransactionItem: React.FC<TransactionItemProps> = ({ item }) => {
  const navigation = useNavigation<NavigationProp>();
  const { colors } = useTheme();
  const styles = getStyles(colors);

  const amount = parseFloat(item.amount); // Convert amount to number

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('UpdateExpenses', {
          expenseDetails: item,
        });
      }}
    >
      <View style={styles.transactionItem}>
        <View style={[styles.iconWrapper, { backgroundColor: item.color }]}>
          <Icon name={item.icon} size={18} color="#fff" />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.transactionTitle}>{item.title}</Text>
          <Text style={styles.transactionSubtitle}>{item.subtitle}</Text>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={styles.transactionAmount}>₹{amount.toFixed(2)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const getStyles = (colors: any) =>
  StyleSheet.create({
    transactionItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 18,
    },
    iconWrapper: {
      width: 40,
      height: 40,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 12,
    },
    transactionTitle: {
      fontSize: 14,
      fontFamily: 'Roboto-Bold',
    },
    transactionSubtitle: {
      fontSize: 12,
      color: colors.placeholder,
      fontFamily: 'Roboto-Regular',
    },
    transactionAmount: {
      fontFamily: 'Roboto-Bold',
    },
  });

export default TransactionItem;
