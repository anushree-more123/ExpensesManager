import { ExpenseEntry } from "../CreateExpenses/expensesSlice";

export type RootStackParamList = {
    Home: undefined;
    AddExpenses: undefined;
    UpdateExpenses: { expenseDetails: ExpenseEntry };
    CategoriesScreen: undefined;
    ManageCategory: { mode: 'add' } | { mode: 'edit'; index: number };
};
