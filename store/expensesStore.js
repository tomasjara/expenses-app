import { expensesDataSanitization } from "@/utils/expensesDataSanitization";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import {
  createJSONStorage,
  persist,
  subscribeWithSelector,
} from "zustand/middleware";

export const useExpensesStore = create(
  persist(
    subscribeWithSelector((set, get) => ({
      // hasHydrated
      _hasHydrated: false,
      setHasHydrated: (state) =>
        set((prevState) => ({
          ...prevState,
          _hasHydrated: state,
        })),

      importData: async (data) =>
        set((state) => ({
          expenses: data.expenses
            ? [...state.expenses, ...data.expenses]
            : state.expenses,
          categories: data.categories
            ? [...state.categories, ...data.categories]
            : state.categories,
          paymentMethods: data.paymentMethods
            ? [...state.paymentMethods, ...data.paymentMethods]
            : state.paymentMethods,
        })),
      // Expenses
      expenses: [],
      addExpense: (newExpense) =>
        set((state) => ({ expenses: [...state.expenses, newExpense] })),
      updateExpense: (newObject) =>
        set((state) => {
          const newExpenses = state.expenses.map((expense) =>
            expense.id === newObject.id ? newObject : expense
          );
          return {
            expenses: newExpenses,
          };
        }),
      setExpenses: (newExpenses) => set((state) => ({ expenses: newExpenses })),
      removeExpense: (idExpense) =>
        set((state) => {
          const newExpenses = state.expenses.filter(
            (expense) => expense.id !== idExpense
          );
          return { expenses: newExpenses };
        }),
      cleanExpensesState: () =>
        set((prevState) => ({
          expenses: [],
        })),
      cleanAllData: () =>
        set((prevState) => ({
          expenses: [],
          categories: [],
          paymentMethods: [],
        })),
      expensesDataSanitizationStore: () =>
        set((prevState) => ({
          expenses: expensesDataSanitization(prevState.expenses),
        })),
      // Expenses with relations
      expensesWithRelations: [],
      setExpensesWithRelations: () =>
        set((state) => {
          const newExpenses = state.getExpensesWithRelations();
          return {
            expensesWithRelations: newExpenses,
          };
        }),
      getExpensesWithRelations: () => {
        const { expenses, categories, paymentMethods } = get();

        const expensesWithRelations = expenses.map((expense) => {
          const category =
            categories.find((cat) => cat.id === expense.categoryId) || null;
          const paymentMethod =
            paymentMethods.find(
              (method) => method.id === expense.paymentMethodId
            ) || null;

          return {
            ...expense,
            category,
            paymentMethod,
          };
        });

        return expensesWithRelations;
      },

      // Categories
      categories: [
        {
          id: "18a9a02a-fc75-4766-a7f2-2359267a69a0",
          name: "Otros",
          color: "#2ecc71",
        },
      ],
      updateCategory: (newObject) =>
        set((state) => {
          const newCategories = state.categories.map((category) =>
            category.id === newObject.id
              ? { ...category, ...newObject }
              : category
          );
          return {
            categories: newCategories,
          };
        }),
      addCategory: (newCategory) =>
        set((state) => ({
          categories: [...state.categories, newCategory],
        })),
      disableCategory: (idCategory) =>
        set((state) => {
          const categoryFind = state.categories.find(
            (category) => category.id !== idCategory
          );

          const categoryDisabled = {
            ...categoryFind,
            disabled: true,
          };

          return { categories: [state.categories, categoryDisabled] };
        }),
      removeCategory: (idCategory) =>
        set((state) => {
          const newCategories = state.categories.filter(
            (category) => category.id !== idCategory
          );
          return { categories: newCategories };
        }),

      // PaymentMethods
      paymentMethods: [
        {
          id: "f739c40d-3545-40e4-aaf7-83b875c122bb",
          name: "Principal",
          description: "",
          color: "#3498db",
        },
      ],
      addPaymentMethod: (newPaymentMethod) =>
        set((state) => ({
          paymentMethods: [...state.paymentMethods, newPaymentMethod],
        })),
      removePaymentMethod: (idPaymentMethod) =>
        set((state) => {
          const newPaymentMethods = state.paymentMethods.filter(
            (paymentMethod) => paymentMethod.id !== idPaymentMethod
          );
          return { paymentMethods: newPaymentMethods };
        }),
      updatePaymentMethod: (newObject) =>
        set((state) => {
          const newPaymentMethods = state.paymentMethods.map((paymentMethod) =>
            paymentMethod.id === newObject.id
              ? { ...paymentMethod, ...newObject }
              : paymentMethod
          );
          return {
            paymentMethods: newPaymentMethods,
          };
        }),

      // Modal
      modalUpdateCreateExpense: { show: false },
      setModalUpdateCreateExpense: (newState) =>
        set((state) => ({ modalUpdateCreateExpense: newState })),
    })),
    {
      name: "expenses-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

useExpensesStore.subscribe(
  (state) => state.expenses,
  () => {
    const setExpensesWithRelations =
      useExpensesStore.getState().setExpensesWithRelations;
    setExpensesWithRelations();
  }
);
useExpensesStore.subscribe(
  (state) => state.categories,
  () => {
    const setExpensesWithRelations =
      useExpensesStore.getState().setExpensesWithRelations;
    setExpensesWithRelations();
  }
);
useExpensesStore.subscribe(
  (state) => state.paymentMethods,
  () => {
    const setExpensesWithRelations =
      useExpensesStore.getState().setExpensesWithRelations;
    setExpensesWithRelations();
  }
);
