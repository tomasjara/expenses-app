import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useExpensesStore = create(
  persist(
    (set, get) => ({
      _hasHydrated: false,
      expenses: [],
      addExpense: (newExpense) =>
        set((state) => ({ expenses: [...state.expenses, newExpense] })),
      setExpenses: (newExpenses) => set((state) => ({ expenses: newExpenses })),
      removeExpense: (idExpense) =>
        set((state) => {
          const newExpenses = state.expenses.filter(
            (expense) => expense.id !== idExpense
          );
          return { expenses: newExpenses };
        }),
      setHasHydrated: (state) =>
        set((prevState) => ({
          ...prevState,
          _hasHydrated: state,
        })),
    }),
    {
      name: "expenses-storagev1",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);