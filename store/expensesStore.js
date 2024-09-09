import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useExpensesStore = create(
  persist(
    (set, get) => ({
      _hasHydrated: false,
      expenses: [],
      categories: [
        {
          id: "18a9a02a-fc75-4766-a7f2-2359267a69a0",
          name: "Otros",
          color: "#2ecc71",
        },
      ],
      paymentMethods: [
        {
          id: "f739c40d-3545-40e4-aaf7-83b875c122bb",
          name: "Principal",
          description: "",
          color: "#3498db",
        },
      ],
      modalUpdateCreateExpense: { show: false },
      setModalUpdateCreateExpense: (newState) =>
        set((state) => ({ modalUpdateCreateExpense: newState })),
      setExpenses: (newExpenses) => set((state) => ({ expenses: newExpenses })),
      addExpense: (newExpense) =>
        set((state) => ({ expenses: [...state.expenses, newExpense] })),
      addCategory: (newCategory) =>
        set((state) => ({
          categories: [...state.categories, newCategory],
        })),
      addPaymentMethod: (newPaymentMethod) =>
        set((state) => ({
          paymentMethods: [...state.paymentMethods, newPaymentMethod],
        })),
      removeExpense: (idExpense) =>
        set((state) => {
          const newExpenses = state.expenses.filter(
            (expense) => expense.id !== idExpense
          );
          return { expenses: newExpenses };
        }),
      removeCategory: (idCategory) =>
        set((state) => {
          const newCategories = state.categories.filter(
            (category) => category.id !== idCategory
          );
          return { categories: newCategories };
        }),
      removePaymentMethod: (idPaymentMethod) =>
        set((state) => {
          const newPaymentMethods = state.paymentMethods.filter(
            (paymentMethod) => paymentMethod.id !== idPaymentMethod
          );
          return { paymentMethods: newPaymentMethods };
        }),
      updateExpense: (newObject) =>
        set((state) => {
          const newExpenses = state.expenses.map((expense) =>
            expense.id === newObject.id ? newObject : expense
          );
          return {
            expenses: newExpenses,
          };
        }),
      updateCategory: (newObject) =>
        set((state) => {
          const newCategories = state.categories.map((category) =>
            category.id === newObject.id ? newObject : category
          );
          const newExpenses = state.expenses.map((expense) => {
            expense.category.id === newObject.id
              ? { ...expense, category: newObject }
              : expense;
          });
          return {
            categories: newCategories,
            expenses: newExpenses,
          };
        }),
      updatePaymentMethod: (newObject) =>
        set((state) => {
          const newPaymentMethods = state.paymentMethods.map((paymentMetohd) =>
            paymentMetohd.id === newObject.id ? newObject : paymentMetohd
          );
          const newExpenses = state.expenses.map((expense) => {
            expense.paymentMethod.id === newObject.id
              ? { ...expense, paymentMethod: newObject }
              : expense;
          });
          return {
            paymentMethods: newPaymentMethods,
            expenses: newExpenses,
          };
        }),
      setHasHydrated: (state) =>
        set((prevState) => ({
          ...prevState,
          _hasHydrated: state,
        })),
    }),
    {
      name: "expenses-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
