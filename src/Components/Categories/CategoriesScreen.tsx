import React, {useMemo} from 'react';
import {View, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {Appbar, useTheme, Text, FAB} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome6';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import type {RootState} from '../../Store/store';
import type {Categories} from '../CreateExpenses/expensesSlice';
import {ColorMethods} from '../../theme/color.methods';

const CategoriesScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const {colors} = useTheme();
  const styles = getStyles(colors);

  const categories = useSelector((s: RootState) => s.expenses.categoriesList);

  const openAdd = () => {
    navigation.navigate('ManageCategory', {mode: 'add' as const});
  };

  const openEdit = (index: number) => {
    navigation.navigate('ManageCategory', {mode: 'edit' as const, index});
  };

  const renderItem = ({item, index}: {item: Categories; index: number}) => (
    <TouchableOpacity activeOpacity={0.7} onPress={() => openEdit(index)}>
      <View style={styles.row}>
        <View style={[styles.iconCircle, {backgroundColor: item.color}]}>
          <Icon
            name={item.icon || 'circle'}
            size={18}
            color={ColorMethods.GetColorFromColorCode('slate_20')}
          />
        </View>
        <Text style={styles.label}>{item.label}</Text>
        <View style={{flex: 1}} />
        <Icon
          name="bars"
          size={16}
          color={ColorMethods.GetColorFromColorCode('slate_500')}
        />
      </View>
    </TouchableOpacity>
  );

  const keyExtractor = (item: Categories, idx: number) =>
    `${item.label}-${idx}`;

  const ItemSeparator = useMemo(
    () => () => <View style={styles.separator} />,
    [styles.separator],
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Categories</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign
            name="close"
            size={24}
            color={ColorMethods.GetColorFromColorCode('slate_500')}
          />
        </TouchableOpacity>
      </View>

      <FlatList
        data={categories}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ItemSeparatorComponent={ItemSeparator}
        contentContainerStyle={[styles.listContent]}
        showsVerticalScrollIndicator={false}
      />
      <FAB icon="plus" style={styles.fab} onPress={openAdd} />
    </View>
  );
};

export default CategoriesScreen;

const getStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 15,
      paddingVertical: 15,
      backgroundColor: colors.background,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 15,
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: 600,
    },
    listContent: {
      paddingTop: 8,
    },
    row: {flexDirection: 'row', alignItems: 'center', paddingVertical: 14},
    iconCircle: {
      width: 40,
      height: 40,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 12,
    },
    label: {fontSize: 15, fontWeight: '500'},
    separator: {
      height: 1,
      backgroundColor: colors.outlineVariant ?? 'rgba(0,0,0,0.06)',
    },
    fab: {position: 'absolute', right: 20, bottom: 24, borderRadius: 28},
  });
