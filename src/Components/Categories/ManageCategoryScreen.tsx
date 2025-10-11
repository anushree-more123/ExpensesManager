import React, {useEffect, useMemo, useState} from 'react';
import {View, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import {Button, Text, TextInput, useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome6';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
import {setCategoryList} from '../CreateExpenses/expensesSlice';
import type {RootState} from '../../Store/store';
import type {Categories} from '../CreateExpenses/expensesSlice';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type RouteParams = {mode: 'add'} | {mode: 'edit'; index: number};

const ICON_CHOICES = [
  'pizza-slice',
  'face-smile-wink',
  'bus',
  'hand-holding-medical',
  'cart-shopping',
  'screwdriver-wrench',
  'person',
  'wifi',
  'link',
  'music',
  'wrench',
  'cake-candles',
  'palette',
  'laptop',
  'person-biking',
  'car-side',
  'person-running',
  'gamepad',
  'building',
  'table-cells',
  'pen',
  'heart',
  'gear',
  'plane',
  'credit-card',
  'users',
  'headphones',
  'house',
  'martini-glass',
  'square-plus',
  'ticket',
  'camera',
  'plug',
  'graduation-cap',
  'circle',
  'mobile-screen-button',
  'chart-line',
  'mountain',
  'gift',
  'person-hiking',
  'globe',
  'water',
  'truck',
  'envelope',
  'recycle',
  'wand-magic-sparkles',
  'baby',
  'landmark',
  'umbrella-beach',
  'gem',
  'feather',
  'fish',
  'laptop-code',
  'paw',
  'tree',
  'shield-halved',
  'tooth',
  'wallet',
  'train',
  'bottle-water',
  'bowl-food',
  'stethoscope',
  'pills',
  'hospital',
  'bandage',
];

const COLOR_PALETTE = [
  '#6BC16B',
  '#FF5C5C',
  '#5BB3FF',
  '#7B1FA2',
  '#FF9A3E',
  '#9E9E9E',
  '#FF7043',
  '#81C784',
  '#4FC3F7',
  '#FF2C2C',
  '#5A5A5A',
  '#7C4DFF',
];

const ManageCategoryScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const params = route.params as RouteParams;

  const dispatch = useDispatch();
  const {colors} = useTheme();
  const insets = useSafeAreaInsets();
  const styles = getStyles(colors);

  const {categoriesList} = useSelector((s: RootState) => s.expenses);

  const isEdit = params?.mode === 'edit';
  const editingIndex = isEdit ? ((params as any).index as number) : null;

  const initial: Categories = useMemo(() => {
    if (isEdit && editingIndex != null && categoriesList[editingIndex]) {
      return categoriesList[editingIndex];
    }
    return {label: '', icon: 'utensils', color: COLOR_PALETTE[0]};
  }, [isEdit, editingIndex, categoriesList]);

  const [label, setLabel] = useState(initial.label);
  const [icon, setIcon] = useState(initial.icon);
  const [color, setColor] = useState(initial.color);
  const [saving, setSaving] = useState(false);
  const canSave = label.trim().length > 0;

  useEffect(() => {
    setLabel(initial.label);
    setIcon(initial.icon);
    setColor(initial.color);
  }, [initial]);

  const handleSave = () => {
    if (!canSave || saving) return;
    setSaving(true);

    const next =
      isEdit && editingIndex != null
        ? categoriesList.map((c, i) =>
            i === editingIndex ? {...c, label: label.trim(), icon, color} : c,
          )
        : [...categoriesList, {label: label.trim(), icon, color}];

    dispatch(setCategoryList(next));
    setSaving(false);
    navigation.goBack();
  };

  const handleDelete = () => {
    if (!isEdit || editingIndex == null) return;
    const next = categoriesList.filter((_c, i) => i !== editingIndex);
    dispatch(setCategoryList(next));
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          {isEdit ? 'Edit Category' : 'Add Category'}
        </Text>
        <View style={styles.headerRight}>
          {isEdit && (
            <TouchableOpacity onPress={handleDelete}>
              <AntDesign name="delete" size={24} color={'red'} />
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="close" size={24} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={[
          styles.content,
          {paddingBottom: insets.bottom + 50},
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <View style={styles.previewRow}>
          <View style={[styles.previewCircle, {backgroundColor: color}]}>
            <Icon name={icon} size={24} color="#fff" />
          </View>
          <Text style={styles.previewLabel}>{label || 'Category'}</Text>
        </View>

        <TextInput
          mode="outlined"
          label="Label"
          value={label}
          onChangeText={setLabel}
          style={styles.input}
        />

        <Text style={styles.sectionTitle}>Choose Icon</Text>
        <View style={styles.iconGrid}>
          {ICON_CHOICES.map(ic => {
            const selected = ic === icon;
            return (
              <TouchableOpacity
                key={ic}
                style={[styles.iconCell, selected && styles.iconCellSelected]}
                activeOpacity={0.8}
                onPress={() => setIcon(ic)}>
                <View
                  style={[
                    styles.iconCircleSmall,
                    selected && {backgroundColor: color},
                  ]}>
                  <Icon
                    name={ic}
                    size={22}
                    color={selected ? '#fff' : '#000'}
                  />
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={styles.sectionTitle}>Choose Color</Text>
        <View style={styles.colorRow}>
          {COLOR_PALETTE.map(c => {
            const selected = c === color;
            return (
              <TouchableOpacity
                key={c}
                onPress={() => setColor(c)}
                style={[
                  styles.colorSwatch,
                  {backgroundColor: c},
                  selected && styles.colorSwatchSelected,
                ]}
                activeOpacity={0.85}
              />
            );
          })}
        </View>
      </ScrollView>

      <View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          paddingTop: 8,
          paddingHorizontal: 16,
          paddingBottom: insets.bottom + 8,
          backgroundColor: colors.background,
          borderTopWidth: StyleSheet.hairlineWidth,
          borderTopColor: colors.outlineVariant ?? 'rgba(0,0,0,0.12)',
        }}>
        <Button
          mode="contained"
          onPress={handleSave}
          disabled={!canSave || saving}
          style={canSave ? styles.saveButton : styles.disabledSaveButton}
          contentStyle={{paddingVertical: 5}}
          labelStyle={{fontSize: 16}}>
          {saving ? 'Saving…' : 'Save'}
        </Button>
      </View>
    </View>
  );
};

export default ManageCategoryScreen;

const getStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 15,
      paddingVertical: 15,
      paddingBottom: 20,
      backgroundColor: colors.background,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 15,
    },
    headerRight: {
      flexDirection: 'row',
      gap: 20,
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: 600,
    },
    content: {},
    previewRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
      gap: 12,
    },
    previewCircle: {
      width: 46,
      height: 46,
      borderRadius: 23,
      alignItems: 'center',
      justifyContent: 'center',
    },
    previewLabel: {fontSize: 18, fontWeight: '600'},
    input: {marginBottom: 16},

    sectionTitle: {
      fontSize: 14,
      fontWeight: '600',
      marginBottom: 8,
      color: colors.onSurface,
    },

    iconGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      gap: 4,
      marginBottom: 16,
    },
    iconCell: {
      width: 60,
      height: 60,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.outlineVariant ?? 'rgba(0,0,0,0.12)',
      backgroundColor: colors.surface,
    },
    iconCellSelected: {
      borderWidth: 2,
      borderColor: colors.primary,
    },
    iconCircleSmall: {
      width: 36,
      height: 36,
      borderRadius: 18,
      alignItems: 'center',
      justifyContent: 'center',
    },
    colorRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
      marginBottom: 24,
    },
    colorSwatch: {
      width: 40,
      height: 40,
      borderRadius: 20,
      borderWidth: 2,
      borderColor: 'transparent',
    },
    colorSwatchSelected: {
      borderColor: colors.onSurface,
    },
    saveButton: {
      borderRadius: 8,
      backgroundColor: colors['700'],
    },
    disabledSaveButton: {
      borderRadius: 8,
      backgroundColor: colors['300'],
    },
  });
