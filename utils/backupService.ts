import * as FileSystem from "expo-file-system";
import * as DocumentPicker from "expo-document-picker";
import { Alert } from "react-native";
import dayjs from "dayjs";
import { useExpensesStore } from "@/store/expensesStore";

export const exportBackup = async (
  jsonData: any,
  successMessage: string = "Archivo JSON guardado correctamente"
) => {
  try {
    const permissions =
      await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();

    if (!permissions.granted) {
      Alert.alert("Permiso denegado", "No se pudo acceder a la carpeta.");
      return;
    }

    const FILE_NAME = dayjs().format("DD_MM_YYYY") + "expenses_app_export.json";

    const uri = await FileSystem.StorageAccessFramework.createFileAsync(
      permissions.directoryUri,
      FILE_NAME,
      "application/json"
    );

    const jsonString = JSON.stringify(jsonData, null, 2);

    await FileSystem.writeAsStringAsync(uri, jsonString, {
      encoding: FileSystem.EncodingType.UTF8,
    });

    Alert.alert("Éxito", successMessage);
  } catch (error) {
    console.error("Error al crear y guardar el archivo JSON", error);
    Alert.alert("Error", "No se pudo crear o guardar el archivo JSON.");
  }
};

/**
 * Importa datos desde un archivo JSON y los carga al store.
 */

export const importBackup = async (
  successMessage: string = "Datos importados correctamente"
) => {
  const importBackupStore = useExpensesStore.getState().importBackup;
  const expensesStore = useExpensesStore.getState().expenses;
  const paymentMethodsStore = useExpensesStore.getState().paymentMethods;
  const categoriesStore = useExpensesStore.getState().categories;

  try {
    const result = await DocumentPicker.getDocumentAsync({
      type: "application/json",
      copyToCacheDirectory: true,
    });

    if (result.canceled || !result.assets?.length) {
      Alert.alert("Importación cancelada", "No se seleccionó ningún archivo.");
      return;
    }

    const fileUri = result.assets[0].uri;
    const jsonString = await FileSystem.readAsStringAsync(fileUri);
    const parsedData = JSON.parse(jsonString);
    const { categories, expenses, paymentMethods } = parsedData;

    // Validaciones básicas de tipo
    if (
      !Array.isArray(categories) ||
      !Array.isArray(expenses) ||
      !Array.isArray(paymentMethods)
    ) {
      Alert.alert(
        "Archivo inválido",
        "Faltan categorías, gastos o métodos de pago."
      );
      return;
    }

    if (
      !categories.every(isValidCategory) ||
      !expenses.every(isValidExpense) ||
      !paymentMethods.every(isValidPaymentMethod)
    ) {
      Alert.alert(
        "Archivo inválido",
        "El archivo tiene campos inválidos o estructuras incorrectas."
      );
      return;
    }

    // Validación de referencias
    const categoryIds = new Set(categories.map((c) => c.id));
    const paymentMethodIds = new Set(paymentMethods.map((p) => p.id));

    if (!validateExpenseReferences(expenses, categoryIds, paymentMethodIds))
      Alert.alert(
        "Referencias inválidas",
        "Uno o más gastos hacen referencia a categorías o métodos de pago inexistentes."
      );

    const newCategories = filterNewItems(
      parsedData.categories,
      categoriesStore
    );
    const newExpenses = filterNewItems(parsedData.expenses, expensesStore).map(
      (expense) => {
        const {
          value,
          description,
          id,
          paymentDate,
          creationDate,
          lastModificationDate,
          paymentMethodId,
          categoryId,
        } = expense;
        return {
          value,
          description,
          id,
          paymentDate,
          creationDate,
          lastModificationDate,
          paymentMethodId,
          categoryId,
        };
      }
    );
    const newPaymentMethods = filterNewItems(
      parsedData.paymentMethods,
      paymentMethodsStore
    );

    const finalDataImport = {
      expenses: newExpenses,
      categories: newCategories,
      paymentMethods: newPaymentMethods,
    };

    // console.log(finalDataImport);
    importBackupStore(finalDataImport);
    Alert.alert("Éxito", successMessage);
  } catch (error) {
    console.error("Error al importar el archivo JSON", error);
    Alert.alert("Error", "No se pudo importar el archivo JSON.");
  }
};

/**
 * Filtra los elementos importados y devuelve solo los que no estén ya en la lista existente.
 *
 * @param imported - Lista de elementos nuevos (desde el archivo de respaldo).
 * @param existing - Lista actual de elementos ya almacenados.
 * @returns Un array con solo los elementos nuevos que no están repetidos por ID.
 */
const filterNewItems = (imported: any[], existing: any[]) => {
  // Crea un Set con los IDs de los elementos existentes para búsqueda rápida
  const existingIds = new Set(existing.map((item) => item.id));
  // Devuelve solo los elementos cuyo ID no está ya en los existentes
  return imported.filter((item) => !existingIds.has(item.id));
};

const isValidCategory = (cat: any): boolean =>
  typeof cat.id === "string" &&
  typeof cat.name === "string" &&
  typeof cat.color === "string";

const isValidPaymentMethod = (pm: any): boolean =>
  typeof pm.id === "string" &&
  typeof pm.name === "string" &&
  typeof pm.color === "string";

const isValidExpense = (exp: any): boolean =>
  typeof exp.id === "string" &&
  typeof exp.categoryId === "string" &&
  typeof exp.paymentMethodId === "string" &&
  typeof exp.creationDate === "string" &&
  typeof exp.paymentDate === "string" &&
  typeof exp.lastModificationDate === "string" &&
  typeof exp.value === "string"; // Puedes cambiar a number si es necesario

const validateExpenseReferences = (
  expenses: any[],
  categoryIds: Set<string>,
  paymentMethodIds: Set<string>
): boolean => {
  return expenses.every(
    (exp) =>
      categoryIds.has(exp.categoryId) &&
      paymentMethodIds.has(exp.paymentMethodId)
  );
};
