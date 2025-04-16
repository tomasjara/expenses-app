import { Alert, StyleSheet } from 'react-native'
import React from 'react'
import { useExpensesStore } from '../store/expensesStore'
import * as XLSX from 'xlsx'
import dayjs from 'dayjs'
import ButtonBase from './ButtonBase'
import { getHeadersForSheet, readExcelFile, saveExcelFile, validateImport_Ids, validateImport_RequiredProperties } from '../utils/excelUtils'

const NAMES_WS = {
    expenses: 'Expenses',
    categories: 'Categories',
    paymentMethods: 'PaymentMethods'
}

export const ExportImportFiles = () => {
    const { expenses, categories, paymentMethods, importData } = useExpensesStore(state => state)

    const importExcel = async () => {
        try {

            // Leer archivo
            const fileData = await readExcelFile()
            if (!fileData) {
                Alert.alert("Error", "No se seleccionó ningún archivo.");
                return
            }
            const workbook = XLSX.read(fileData, { type: "base64" });

            const expensesWs = workbook.Sheets[NAMES_WS.expenses];
            const categoriesWs = workbook.Sheets[NAMES_WS.categories];
            const paymentMethodsWs = workbook.Sheets[NAMES_WS.paymentMethods];

            // TODO: Validaciones

            //1. Validar que las hojas existan
            if (!expensesWs || !categoriesWs || !paymentMethodsWs) {
                Alert.alert("Error", "La plantilla no tiene todas las hojas necesarioas (" + NAMES_WS.expenses + ", " + NAMES_WS.categories + ", " + NAMES_WS.paymentMethods + ")");
                return;
            }

            const expensesJsonData = XLSX.utils.sheet_to_json(expensesWs);
            const categoriesJsonData = XLSX.utils.sheet_to_json(categoriesWs);
            const paymentMethodsJsonData = XLSX.utils.sheet_to_json(paymentMethodsWs);

            // TODO: 2. Validar los encabezados necesarios en las hojas
            // 4. Validar propiedades requeridas
            const dataPropetiesValidate = validateImport_RequiredProperties(expensesJsonData, categoriesJsonData, paymentMethodsJsonData)

            if (dataPropetiesValidate.totalErrors > 0) {
                Alert.alert("Error", `${dataPropetiesValidate.errorDetails.map((error, index) => `${index + 1}. ${error}`).join('\n')} ${
                   dataPropetiesValidate.totalWarnings > 0 ? dataPropetiesValidate.warningDetails.map((warning, index) => `${index + 1}. ${warning}`).join('\n') : '' 
                }`);
                return
            }

            // 3 Validar duplicidad de datos por id
            const dataImportProcessing = validateImport_Ids(expensesJsonData, categoriesJsonData, paymentMethodsJsonData)


            // TODO: 5. Validar datos (Formatos o tipo)
            // TODO: 6. Confirmacion para importar, mostrar errores encontrados y cantidad de registros a importar

            importData(dataImportProcessing)

            Alert.alert("Éxito", "Datos importados correctamente.");

        } catch (error) {
            console.error("Error al importar Excel", error);
            Alert.alert("Error", "No se pudo importar el archivo.");
        }
    };

    const downloadTemplateToImport = async () => {
        try {
            const wb = XLSX.utils.book_new();

            const instructions = [
                ["Bienvenido a la plantilla de datos"],
                ["1. Ingrese la información en la hoja 'Datos'"],
                ["2. No elimine ni cambie los nombres de las columnas"],
                ["3. Una vez completado, importe el archivo en la aplicación"],
            ];

            const wsInstructions = XLSX.utils.aoa_to_sheet(instructions);
            XLSX.utils.book_append_sheet(wb, wsInstructions, "Instrucciones");

            const expensesHeaders = getHeadersForSheet(expenses);
            const expensesWsData = XLSX.utils.aoa_to_sheet([...expensesHeaders]);
            XLSX.utils.book_append_sheet(wb, expensesWsData, NAMES_WS.expenses);

            const categoriesHeaders = getHeadersForSheet(categories);
            const categoriesWsData = XLSX.utils.aoa_to_sheet([...categoriesHeaders]);
            XLSX.utils.book_append_sheet(wb, categoriesWsData, NAMES_WS.categories);

            const paymentMethodHeaders = getHeadersForSheet(paymentMethods);
            const paymentMethodWsData = XLSX.utils.aoa_to_sheet([...paymentMethodHeaders]);
            XLSX.utils.book_append_sheet(wb, paymentMethodWsData, NAMES_WS.paymentMethods);

            const wbout = XLSX.write(wb, { type: "base64", bookType: "xlsx" });

            saveExcelFile(wbout, 'Plantilla_expenses_app.xlsx', "Plantilla descargada correctamente.")

        } catch (error) {
            console.error("Error al descargar plantilla", error);
            Alert.alert("Error", "No se pudo descargar la plantilla.");
        }
    }

    const ExportExcel = async () => {
        try {
            const expensesWs = XLSX.utils.json_to_sheet(expenses.map(item => {
                return {
                    id: item.id,
                    value: item.value,
                    description: item.description,
                    paymentDate: item.paymentDate,
                    categoryId: item.categoryId,
                    paymentMethodId: item.paymentMethodId,
                }
            }));
            const categoriesWs = XLSX.utils.json_to_sheet(categories.map(item => ({
                id: item.id,
                name: item.name,
                description: item.description,
            })));
            const paymentMethodsWs = XLSX.utils.json_to_sheet(paymentMethods.map(item => ({
                id: item.id,
                name: item.name,
                description: item.description,
            })));

            const wb = XLSX.utils.book_new();

            XLSX.utils.book_append_sheet(wb, expensesWs, NAMES_WS.expenses);
            XLSX.utils.book_append_sheet(wb, categoriesWs, NAMES_WS.categories);
            XLSX.utils.book_append_sheet(wb, paymentMethodsWs, NAMES_WS.paymentMethods);

            const wbout = XLSX.write(wb, { type: "base64", bookType: "xlsx" });

            const FILE_NAME = dayjs().format('DD_MM_YYYY:HH:mm:ss') + 'expenses_app_export.xlsx'

            saveExcelFile(wbout, FILE_NAME, "Archivo guardado correctamente.")

        } catch (error) {
            console.error("Error exportando XLSX", error);
            Alert.alert("Error", "No se pudo exportar el archivo.");
        }
    };

    return (
        <>
            <ButtonBase title={'Exportar datos en XLSX'} onPress={ExportExcel} customStyleText={{ textAlign: 'start' }} />
            <ButtonBase title={'Importar datos en XLSX'} onPress={importExcel} customStyleText={{ textAlign: 'start' }} />
            <ButtonBase title={'Descargar plantilla para importar datos (xlsx)'} onPress={downloadTemplateToImport} customStyleText={{ textAlign: 'start' }} />
        </>
    );

}

const styles = StyleSheet.create({});