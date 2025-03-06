import * as FileSystem from "expo-file-system";
import * as DocumentPicker from "expo-document-picker";
import { Alert } from "react-native";
import { useExpensesStore } from "@/store/expensesStore";
import uuid from "react-native-uuid";
import { expensesDataSanitization } from "./expensesDataSanitization";

export const saveExcelFile = async (
  wbout,
  nameFile,
  successMessage = "Archivo descargado correctamente"
) => {
  const permissions =
    await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();

  if (!permissions.granted) {
    Alert.alert("Permiso denegado", "No se pudo acceder a la carpeta.");
    return;
  }

  const uri = await FileSystem.StorageAccessFramework.createFileAsync(
    permissions.directoryUri,
    nameFile,
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );

  await FileSystem.writeAsStringAsync(uri, wbout, {
    encoding: FileSystem.EncodingType.Base64,
  });

  Alert.alert("Éxito", successMessage);
};

export const readExcelFile = async () => {
  const res = await DocumentPicker.getDocumentAsync({
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  if (res.canceled) return false;

  const fileUri = res.assets[0].uri;
  const fileData = await FileSystem.readAsStringAsync(fileUri, {
    encoding: FileSystem.EncodingType.Base64,
  });

  return fileData;
};

export const getHeadersForSheet = (arr) => {
  if (!Array.isArray(arr) || arr.length === 0) {
    return [["El array está vacío o no es válido"]];
  }

  let headers = [];
  arr.forEach((obj) => {
    Object.keys(obj).forEach((key) => {
      if (!headers.includes(key)) {
        headers.push(key);
      }
    });
  });

  return [headers];
};

export const validateImport_Ids = (
  newExpenses,
  newCategories,
  newPaymentMethods
) => {
  const currentExpenses = useExpensesStore.getState().expenses;
  const existingExpensesIds = new Set(
    currentExpenses.map((expense) => expense.id)
  );
  const expensesProcessing = newExpenses
    .filter((expense) => !existingExpensesIds.has(expense.id))
    .map((expense) => ({
      ...expense,
      id: expense.id && expense.id.trim() !== "" ? expense.id : uuid.v4(),
    }));

  const categoriesExpenses = useExpensesStore.getState().categories;
  const existingCategoriesIds = new Set(
    categoriesExpenses.map((category) => category.id)
  );
  const categoriesProcessing = newCategories
    .filter((category) => !existingCategoriesIds.has(category.id))
    .map((category) => ({
      ...category,
      id: category.id && category.id.trim() !== "" ? category.id : uuid.v4(),
    }));

  const paymentMethodsExpenses = useExpensesStore.getState().paymentMethods;
  const existingPaymentMethodsIds = new Set(
    paymentMethodsExpenses.map(
      (paymentMethodsExpenses) => paymentMethodsExpenses.id
    )
  );
  const paymentMethodsProcessing = newPaymentMethods
    .filter((paymentMethod) => !existingPaymentMethodsIds.has(paymentMethod.id))
    .map((paymentMethod) => ({
      ...paymentMethod,
      id:
        paymentMethod.id && paymentMethod.id.trim() !== ""
          ? paymentMethod.id
          : uuid.v4(),
    }));

  return {
    expenses: expensesDataSanitization(expensesProcessing),
    categories: categoriesProcessing,
    paymentMethods: paymentMethodsProcessing,
  };
};

export const validateImport_RequiredProperties = (data) => {
  // Todo
  // validacion de que esten todas las propiedades necesarias
  // let errorCount = 0
  // expensesSanitization.forEach(expense => {
  //     if (!expense.value || !expense.paymentDate || !expense.creationDate || !expense.lastModificationDate || !expense.categoryId || !expense.paymentMethodId) {
  //         errorCount++
  //         return;
  //     }
  // })
  // if (errorCount > 0) {
  //     Alert.alert("Error", "Los datos importados no tienen todas las propiedades necesarias, numero de lineas erroneas: " + errorCount);
  //     console.log(expensesSanitization);
  //     return
  // }
};
