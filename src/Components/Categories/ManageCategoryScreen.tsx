import React, {useEffect, useMemo, useState} from 'react';
import {View, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Button, Text, TextInput} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome6';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {setCategoryList} from '../CreateExpenses/expensesSlice';
import type {RootState} from '../../Store/store';
import type {Categories} from '../CreateExpenses/expensesSlice';
import {ColorMethods} from '../../theme/color.methods';

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
  ColorMethods.GetColorFromColorCode('category_1'),
  ColorMethods.GetColorFromColorCode('category_2'),
  ColorMethods.GetColorFromColorCode('category_3'),
  ColorMethods.GetColorFromColorCode('category_4'),
  ColorMethods.GetColorFromColorCode('category_5'),
  ColorMethods.GetColorFromColorCode('category_6'),
  ColorMethods.GetColorFromColorCode('category_7'),
  ColorMethods.GetColorFromColorCode('category_8'),
  ColorMethods.GetColorFromColorCode('category_9'),
  ColorMethods.GetColorFromColorCode('category_10'),
  ColorMethods.GetColorFromColorCode('category_11'),
  ColorMethods.GetColorFromColorCode('category_12'),
];

const ManageCategoryScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const params = route.params as RouteParams;

  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();

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
    <View style={Styles.container}>
      <View style={Styles.header}>
        <Text style={Styles.headerTitle}>
          {isEdit ? 'Edit Category' : 'Add Category'}
        </Text>
        <View style={Styles.headerRight}>
          {isEdit && (
            <TouchableOpacity onPress={handleDelete}>
              <AntDesign
                name="delete"
                size={24}
                color={ColorMethods.GetColorFromColorCode('red_600')}
              />
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign
              name="close"
              size={24}
              color={ColorMethods.GetColorFromColorCode('slate_500')}
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={[
          Styles.content,
          {paddingBottom: insets.bottom + 50},
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <View style={Styles.previewRow}>
          <View style={[Styles.previewCircle, {backgroundColor: color}]}>
            <Icon
              name={icon}
              size={24}
              color={ColorMethods.GetColorFromColorCode('slate_20')}
            />
          </View>
          <Text style={Styles.previewLabel}>{label || 'Category'}</Text>
        </View>

        <TextInput
          mode="outlined"
          label="Label"
          value={label}
          onChangeText={setLabel}
          style={Styles.input}
        />

        <Text style={Styles.sectionTitle}>Choose Icon</Text>
        <View style={Styles.iconGrid}>
          {ICON_CHOICES.map(ic => {
            const selected = ic === icon;
            return (
              <TouchableOpacity
                key={ic}
                style={[Styles.iconCell, selected && Styles.iconCellSelected]}
                activeOpacity={0.8}
                onPress={() => setIcon(ic)}>
                <View
                  style={[
                    Styles.iconCircleSmall,
                    {
                      backgroundColor: selected
                        ? color
                        : ColorMethods.GetColorFromColorCode('slate_200'),
                    },
                  ]}>
                  <Icon
                    name={ic}
                    size={22}
                    color={
                      selected
                        ? ColorMethods.GetColorFromColorCode('slate_20')
                        : ColorMethods.GetColorFromColorCode('slate_600')
                    }
                  />
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={Styles.sectionTitle}>Choose Color</Text>
        <View style={Styles.colorRow}>
          {COLOR_PALETTE.map(c => {
            const selected = c === color;
            return (
              <TouchableOpacity
                key={c}
                onPress={() => setColor(c)}
                style={[
                  Styles.colorSwatch,
                  {backgroundColor: c},
                  selected && Styles.colorSwatchSelected,
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
          backgroundColor: ColorMethods.GeSecondarytColorFromColorCode(
            'pageBackgroundColor',
          ),
          borderTopWidth: StyleSheet.hairlineWidth,
          borderTopColor: ColorMethods.GetColorFromColorCode('slate_200'),
        }}>
        <Button
          mode="contained"
          onPress={handleSave}
          disabled={!canSave || saving}
          style={canSave ? Styles.saveButton : Styles.disabledSaveButton}
          contentStyle={{paddingVertical: 5}}
          labelStyle={{fontSize: 16}}>
          {saving ? 'Saving…' : 'Save'}
        </Button>
      </View>
    </View>
  );
};

export default ManageCategoryScreen;

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 15,
    paddingBottom: 20,
    backgroundColor: ColorMethods.GeSecondarytColorFromColorCode(
      'pageBackgroundColor',
    ),
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
    color: ColorMethods.GeSecondarytColorFromColorCode('primaryFontColor'),
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
  previewLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: ColorMethods.GeSecondarytColorFromColorCode('primaryFontColor'),
  },
  input: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: ColorMethods.GeSecondarytColorFromColorCode('primaryFontColor'),
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
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: ColorMethods.GetColorFromColorCode('slate_300'),
    backgroundColor: ColorMethods.GetColorFromColorCode('slate_200'),
  },
  iconCellSelected: {
    borderWidth: 2,
    borderColor: ColorMethods.GetColorFromColorCode('purple_700'),
  },
  iconCircleSmall: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 36,
    height: 36,
    borderRadius: 99,
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
    borderColor: ColorMethods.GetColorFromColorCode('slate_500'),
  },
  saveButton: {
    borderRadius: 2,
    backgroundColor: ColorMethods.GetColorFromColorCode('purple_500'),
  },
  disabledSaveButton: {
    borderRadius: 2,
    backgroundColor: ColorMethods.GetColorFromColorCode('purple_200'),
  },
});
