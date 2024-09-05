import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useCategoriesStore = create(
  persist(
    (set, get) => ({
      categories: [
        {
          id: "18a9a02a-fc75-4766-a7f2-2359267a69a0",
          name: "Otros",
          color: "#2ecc71",
        },
      ],
      addCategory: (newCategory) =>
        set((state) => ({
          categories: [...state.categories, newCategory],
        })),
      removeCategory: (idCategory) =>
        set((state) => {
          const newCategories = state.categories.filter(
            (category) => category.id !== idCategory
          );
          return { categories: newCategories };
        }),
      updateCategory: (newObject) =>
        set((state) => {
          const newCategories = state.categories.map((category) =>
            category.id === newObject.id ? newObject : category
          );
          return {
            categories: newCategories,
          };
        }),
      // setHasHydrated: (state) =>
      //   set((prevState) => ({
      //     ...prevState,
      //     _hasHydrated: state,
      //   })),
    }),
    {
      name: "categories-storagev1",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
