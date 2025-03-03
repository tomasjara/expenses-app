import { Alert, Button, Platform, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useExpensesStore } from './../store/expensesStore'
import * as FileSystem from 'expo-file-system'
import * as XLSX from 'xlsx'
import * as Sharing from "expo-sharing";
import { jsonToCSV } from 'react-native-csv'
import dayjs from 'dayjs'
import ButtonBase from './ButtonBase'

// TODO:
// Eliminar la funcion de leer el archivo, crearlo directamente desde el json a la carpeta de descargas

export const ExportFiles = () => {
    const { expenses, categories, paymentMethods } = useExpensesStore(state => state)
    const FILE_NAME = 'datos_exportados' + dayjs().format('DD_MM_YYYY:HH:mm:ss') + '.csv'

    const createFile = async (data) => {
        const fileUri = FileSystem.documentDirectory + `${FILE_NAME}`;
        try {
            await FileSystem.writeAsStringAsync(fileUri, data, {
                encoding: FileSystem.EncodingType.UTF8,
            });
            console.log(`Archivogenerado: ${fileUri}`);
            return fileUri
        } catch (error) {
            console.error('Error al guardar el archivo:', error);
            return null
        }
    };

    const jsonToCsvFormated = (data) => {
        return jsonToCSV(data)
    };

    const moveToDownloads = async (fileUri, exportType) => {
        try {
            const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
            if (!permissions.granted) {
                console.log('Permiso denegado');
                return;
            }

            const fileContent = await FileSystem.readAsStringAsync(fileUri
                // , { encoding: FileSystem.EncodingType.UTF8 }
            );
            console.log({ fileContent });

            const uri = await FileSystem.StorageAccessFramework.createFileAsync(
                permissions.directoryUri,
                FILE_NAME,
                'text/csv'
            );
            await FileSystem.writeAsStringAsync(uri, fileContent, { encoding: 'utf8' }
            );
            console.log('Archivo movido a la carpeta de descargas');
        } catch (error) {
            console.error('Error al mover el archivo a la carpeta de descargas:', error);
        }
    };

    const generateFile = async (data) => {
        try {
            const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();

            if (!permissions.granted) {
                console.log('Permiso denegado');
                return;
            }

            const uri = await FileSystem.StorageAccessFramework.createFileAsync(
                permissions.directoryUri,
                FILE_NAME,
                'text/csv'
            );

            await FileSystem.writeAsStringAsync(uri, data
                // ,{ encoding: FileSystem.EncodingType.UTF8 }
            );
            console.log(data);
            console.log('Archivo creado en la carpeta de la descarga');
        } catch (error) {
            console.error('Error al crear un archivo:', error);
        }
    }


    const exportData = async () => {
        const dataJson = JSON.stringify(expenses, categories, paymentMethods)
        // const dataJson = JSON.stringify({
        //     expenses: expenses,
        //     categories: categories,
        //     paymentMethods: paymentMethods
        // })
        console.log(dataJson);
        // const dataJson = JSON.stringify(expenses)
        // console.log();
        const dataFormated = jsonToCsvFormated(dataJson)
        // const fileUri = await createFile(dataFormated)
        // if (fileUri)  {
        //     moveToDownloads(fileUri, 'text/csv')
        // }
        await generateFile(dataFormated)
    };


    const ExportExcel = async () => {
        try {
          // Datos de prueba
          const data = [
            { id: 1, nombre: "Juan", edad: 25, ciudad: "Santiago" },
            { id: 2, nombre: "María", edad: 30, ciudad: "Valparaíso" },
            { id: 3, nombre: "Carlos", edad: 28, ciudad: "Concepción" },
          ];
      
          // Crear hoja de trabajo y libro de Excel
          const expensesWs = XLSX.utils.json_to_sheet(expenses);
          const categoriesWs = XLSX.utils.json_to_sheet(categories);
          const paymentMethodsWs = XLSX.utils.json_to_sheet(paymentMethods);
          const wb = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(wb, expensesWs, "Expenses");
          XLSX.utils.book_append_sheet(wb, categoriesWs, "Categorias");
          XLSX.utils.book_append_sheet(wb, paymentMethodsWs, "Metodos de pago");
      
          // Convertir a base64
          const wbout = XLSX.write(wb, { type: "base64", bookType: "xlsx" });
      
          // Nombre del archivo
          const FILE_NAME = "datos.xlsx";
      
          // Solicitar acceso a la carpeta del usuario en Android
          const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
          
          if (!permissions.granted) {
            Alert.alert("Permiso denegado", "No se pudo acceder a la carpeta.");
            return;
          }
      
          // Crear el archivo en la carpeta seleccionada
          const uri = await FileSystem.StorageAccessFramework.createFileAsync(
            permissions.directoryUri,
            FILE_NAME,
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          );
      
          // Escribir el archivo en la ubicación seleccionada
          await FileSystem.writeAsStringAsync(uri, wbout, { encoding: FileSystem.EncodingType.Base64 });
      
          Alert.alert("Éxito", "Archivo guardado correctamente.");
      
        } catch (error) {
          console.error("Error exportando XLSX", error);
          Alert.alert("Error", "No se pudo exportar el archivo.");
        }
      };

    return (
        <ButtonBase title={'Exportar datos en XLSX'} onPress={ExportExcel} customStyleText={{ textAlign: 'start' }} />
    );

}

const styles = StyleSheet.create({});