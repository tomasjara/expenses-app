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

export const validateImport_RequiredProperties = (
  newExpenses,
  newCategories,
  newPaymentMethod
) => {
  let errors = [];
  let missingFieldsExpenses = new Set();
  let missingFieldsCategories = new Set();
  let missingFieldsPaymentMethods = new Set();
  let individualErrors = [];
  let unknownFieldsDetected = false;

  // Lista de campos permitidos
  const allowedExpenseFields = [
    "id",
    "value",
    "paymentDate",
    "categoryId",
    "paymentMethodId",
  ];
  const allowedCategoryFields = ["id", "name"];
  const allowedPaymentMethodFields = ["id", "name"];

  // Validar gastos
  newExpenses.forEach((expense, index) => {
    let missingFields = [];

    if (!expense.id) missingFields.push("id");
    if (!expense.value) missingFields.push("value");
    if (!expense.paymentDate) missingFields.push("paymentDate");
    if (!expense.categoryId) missingFields.push("categoryId");
    if (!expense.paymentMethodId) missingFields.push("paymentMethodId");

    // Detectar campos no permitidos
    Object.keys(expense).forEach((field) => {
      if (!allowedExpenseFields.includes(field)) unknownFieldsDetected = true;
    });

    missingFields.forEach((field) => missingFieldsExpenses.add(field));

    if (missingFields.length > 0) {
      individualErrors.push(
        `Gasto ${index + 1} tiene errores: Faltan ${missingFields.join(", ")}`
      );
    }
  });

  // Validar categorías
  newCategories.forEach((item, index) => {
    let missingFields = [];

    if (!item.id) missingFields.push("id");
    if (!item.name) missingFields.push("name");

    // Detectar campos no permitidos
    Object.keys(item).forEach((field) => {
      if (!allowedCategoryFields.includes(field)) unknownFieldsDetected = true;
    });

    missingFields.forEach((field) => missingFieldsCategories.add(field));

    if (missingFields.length > 0) {
      individualErrors.push(
        `Categoría ${index + 1} tiene errores: Faltan ${missingFields.join(", ")}`
      );
    }
  });

  // Validar métodos de pago
  newPaymentMethod.forEach((item, index) => {
    let missingFields = [];

    if (!item.id) missingFields.push("id");
    if (!item.name) missingFields.push("name");

    // Detectar campos no permitidos
    Object.keys(item).forEach((field) => {
      if (!allowedPaymentMethodFields.includes(field))
        unknownFieldsDetected = true;
    });

    missingFields.forEach((field) => missingFieldsPaymentMethods.add(field));

    if (missingFields.length > 0) {
      individualErrors.push(
        `Método de pago ${index + 1} tiene errores: Faltan ${missingFields.join(", ")}`
      );
    }
  });

  // Agregar errores de encabezado si faltan en todos los objetos
  if (missingFieldsExpenses.size > 0) {
    errors.push(
      `Faltan encabezados en gastos: ${[...missingFieldsExpenses].join(", ")}`
    );
  }
  if (missingFieldsCategories.size > 0) {
    errors.push(
      `Faltan encabezados en categorías: ${[...missingFieldsCategories].join(", ")}`
    );
  }
  if (missingFieldsPaymentMethods.size > 0) {
    errors.push(
      `Faltan encabezados en métodos de pago: ${[...missingFieldsPaymentMethods].join(", ")}`
    );
  }

  // Agregar advertencia si hay campos desconocidos
  if (unknownFieldsDetected) {
    errors.push(
      `Se detectaron campos no reconocidos en los datos importados. Estos campos no serán importados. Para más detalles, revisa la plantilla de importación y sus instrucciones.`
    );
  }

  // Unir los errores de encabezados con los individuales
  errors = errors.concat(individualErrors);

  return {
    totalErrors: errors.length,
    errorDetails: errors,
  };
};
