import { create } from "zustand";

interface Expense {
  id: string;
  name: string;
  amount: number;
}

interface ExpensesStore {
  expenses: Expense[];
  addExpense: (expense: Omit<Expense, "id">) => void;
  editExpense: (updatedExpense: Expense) => void;
  deleteExpense: (id: string) => void;
}

export const useExpensesStore = create<ExpensesStore>((set) => ({
  expenses: [],
  addExpense: (expense) =>
    set((state) => ({
      expenses: [...state.expenses, { id: Date.now().toString(), ...expense }],
    })),
  editExpense: (updatedExpense) =>
    set((state) => ({
      expenses: state.expenses.map((exp) =>
        exp.id === updatedExpense.id ? updatedExpense : exp
      ),
    })),
  deleteExpense: (id) =>
    set((state) => ({
      expenses: state.expenses.filter((exp) => exp.id !== id),
    })),
}));
