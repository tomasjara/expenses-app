import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useExpensesStore } from './../store/expensesStore'
import * as FileSystem from 'expo-file-system'
import { jsonToCSV } from 'react-native-csv'
import dayjs from 'dayjs'

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
            console.log({ data });
            console.log('Archivo creado en la carpeta de la descarga');
        } catch (error) {
            console.error('Error al crear un archivo:', error);
        }
    }


    const exportData = async () => {
        const dataJson = JSON.stringify(expenses)
        const dataFormated = jsonToCsvFormated(dataJson)
        // const fileUri = await createFile(dataFormated)
        // if (fileUri)  {
        //     moveToDownloads(fileUri, 'text/csv')
        // }
        await generateFile(dataFormated)
    };

    return (
        <View style={{ padding: 20 }}>
            <Text>Exportar datos en varios formatos</Text>
            <Button title="Exportar CSV" onPress={exportData} />
        </View>
    );

}

const styles = StyleSheet.create({})