// import * as FileSystem from "expo-file-system";
// import * as DocumentPicker from "expo-document-picker";
// import { useExpensesStore } from "./../store/expensesStore"; // ajusta la ruta según tu proyecto
// import * as MediaLibrary from "expo-media-library";
// import * as Sharing from "expo-sharing";
// import { Alert, PermissionsAndroid, Platform } from "react-native";
// import RNFS from "react-native-fs";

/**
 * Exporta los datos a un archivo JSON y permite compartirlo.
 */
export const exportBackup = async () => {
//   try {
//     const state = useExpensesStore.getState();

//     const data = {
//       expenses: state.expenses,
//       categories: state.categories,
//       paymentMethods: state.paymentMethods,
//     };

//     const json = JSON.stringify(data, null, 2);
//     const fileName = `gastos-backup-${Date.now()}.json`;

//     // 📁 Ruta de descarga en Android
//     const downloadPath = `${RNFS.DownloadDirectoryPath}/${fileName}`;

//     // 🛡️ Pedir permisos
//     if (Platform.OS === "android") {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
//         {
//           title: "Permiso para guardar",
//           message:
//             "La app necesita guardar archivos en tu carpeta de Descargas.",
//           buttonNeutral: "Preguntar luego",
//           buttonNegative: "Cancelar",
//           buttonPositive: "Permitir",
//         }
//       );

//       if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
//         Alert.alert(
//           "Permiso denegado",
//           "No se puede guardar el backup sin permiso."
//         );
//         return;
//       }
//     }

//     // 💾 Guardar archivo
//     await RNFS.writeFile(downloadPath, json, "utf8");

//     Alert.alert("Backup guardado", `Se guardó en Descargas:\n${fileName}`);
//   } catch (error) {
//     console.error("Error exportando backup:", error);
//     Alert.alert("Error", "No se pudo guardar el backup en Descargas.");
//   }
};
/**
 * Importa datos desde un archivo JSON y los carga al store.
 */
export const importBackup = async () => {
//   try {
//     const result = await DocumentPicker.getDocumentAsync({
//       type: "application/json",
//     });

//     if (result.type === "success") {
//       const content = await FileSystem.readAsStringAsync(result.uri);
//       const data = JSON.parse(content);

//       if (data.expenses && data.categories && data.paymentMethods) {
//         const store = useExpensesStore.getState();

//         store.setExpenses(data.expenses);
//         // Limpia primero para evitar duplicados o conflictos
//         store.cleanAllData();
//         // Luego agrega las categorías y métodos
//         data.categories.forEach((cat) => store.addCategory(cat));
//         data.paymentMethods.forEach((method) => store.addPaymentMethod(method));
//         data.expenses.forEach((exp) => store.addExpense(exp));

//         console.log("Backup importado con éxito");
//       } else {
//         console.warn("El archivo no tiene el formato correcto");
//       }
//     }
//   } catch (error) {
//     console.error("Error importando backup:", error);
//   }
};
