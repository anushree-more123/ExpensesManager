import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ColorMethods } from '../../theme/color.methods';

export type ExpenseEntry = {
  id: string;
  amount: string;
  note: string;
  date: string;
  category: string;
};

export type Categories = {
  label: string,
  icon: string,
  color: string
}

export type ExpensesState = {
  expenseHistory: ExpenseEntry[];
  categoriesList: Categories[]
};

const initialState: ExpensesState = {
  expenseHistory: [],
  categoriesList: [
    { label: 'Food and Drinks', icon: 'pizza-slice', color: ColorMethods.GetColorFromColorCode('food_and_drinks') },
    { label: 'Leisure', icon: 'face-smile-wink', color: ColorMethods.GetColorFromColorCode('leisure') },
    { label: 'Transportation', icon: 'bus', color: ColorMethods.GetColorFromColorCode('transportation') },
    { label: 'Health', icon: 'hand-holding-medical', color: ColorMethods.GetColorFromColorCode('health') },
    { label: 'Shopping', icon: 'cart-shopping', color: ColorMethods.GetColorFromColorCode('shopping') },
    { label: 'Utilities', icon: 'screwdriver-wrench', color: ColorMethods.GetColorFromColorCode('utilities') },
  ]
};

const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    setExpenseHistory: (state, action: PayloadAction<ExpenseEntry[]>) => {
      state.expenseHistory = action.payload;
    },
    addExpenseHistory: (state, action: PayloadAction<ExpenseEntry>) => {
      state.expenseHistory.push(action.payload);
    },
    updateExpenseHistory: (state, action: PayloadAction<ExpenseEntry>) => {
      const index = state.expenseHistory.findIndex(
        entry => entry.id === action.payload.id,
      );
      if (index !== -1) {
        state.expenseHistory[index] = action.payload;
      }
    },
    setCategoryList: (state, action: PayloadAction<Categories[]>) => {
      state.categoriesList = action.payload
    }
  },
});

export const { setExpenseHistory, addExpenseHistory, updateExpenseHistory, setCategoryList } =
  expensesSlice.actions;

export default expensesSlice.reducer;
