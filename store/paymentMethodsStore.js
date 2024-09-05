import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const usePaymentMethodsStore = create(
  persist(
    (set, get) => ({
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
      // setExpenses: (newExpenses) => set((state) => ({ expenses: newExpenses })),
      removePaymentMethod: (idPaymentMethod) =>
        set((state) => {
          const newPaymentMethods = state.paymentMethods.filter(
            (paymentMethod) => paymentMethod.id !== idPaymentMethod
          );
          return { paymentMethods: newPaymentMethods };
        }),
      updatePaymentMethod: (newObject) =>
        set((state) => {
          const newPaymentMethods = state.paymentMethods.map((paymentMetohd) =>
            paymentMetohd.id === newObject.id ? newObject : paymentMetohd
          );
          return {
            paymentMethods: newPaymentMethods,
          };
        }),
      // setHasHydrated: (state) =>
      //   set((prevState) => ({
      //     ...prevState,
      //     _hasHydrated: state,
      //   })),
    }),
    {
      name: "paymentMethod-storagev1",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
