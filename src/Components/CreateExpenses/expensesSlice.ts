import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
    { label: 'Food and Drinks', icon: 'pizza-slice', color: '#FF7043', },
    { label: 'Leisure', icon: 'face-smile-wink', color: '#81C784' },
    { label: 'Transportation', icon: 'bus', color: '#4FC3F7' },
    { label: 'Health', icon: 'hand-holding-medical', color: '#FF2C2C' },
    { label: 'Shopping', icon: 'cart-shopping', color: '#7B1FA2' },
    { label: 'Utilities', icon: 'screwdriver-wrench', color: '#5A5A5A' },
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
