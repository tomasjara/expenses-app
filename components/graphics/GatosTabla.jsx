import { useExpensesStore } from '@/store/expensesStore';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, Pressable, Modal, Text } from 'react-native';
import { Table, TableWrapper, Row } from 'react-native-table-component';
import { ModalDatePicker } from '../modals/ModalDatePicker';
import { formatMoney } from '@/utils/formatMoney';

const MOCK_EXPENSES = [
    {
        "category": { "color": "#2ecc71", "id": "18a9a02a-fc75-4766-a7f2-2359267a69a0", "name": "Otros" },
        "categoryId": "18a9a02a-fc75-4766-a7f2-2359267a69a0",
        "creationDate": '2024-10-17T13:13:40.213Z',
        "description": "njasdjnadsjnkasdjnkasdnjksadnjkasdjnkasdnjsadnjasdadsnjk",
        "id": "7ffa11c7-cab0-49cc-bc99-11181be40797",
        "lastModificationDate": '2024-10-17T13:13:40.213Z',
        "paymentDate": '2024-10-17T13:13:33.301Z',
        "paymentMethod": {
            "color": "#3498db", "description": "",
            "id": "f739c40d-3545-40e4-aaf7-83b875c122bb",
            "name": "Principal"
        },
        "paymentMethodId": "f739c40d-3545-40e4-aaf7-83b875c122bb",
        "value": "50000"
    },
    { "category": { "color": "#2ecc71", "id": "18a9a02a-fc75-4766-a7f2-2359267a69a0", "name": "Otros" }, "categoryId": "18a9a02a-fc75-4766-a7f2-2359267a69a0", "creationDate": '2024-10-17T13:13:47.578Z', "description": "", "id": "38d54edf-ec55-4710-9fe7-a89fccc75b52", "lastModificationDate": '2024-10-17T13:13:47.578Z', "paymentDate": '2024-10-17T13:13:41.829Z', "paymentMethod": { "color": "#3498db", "description": "", "id": "f739c40d-3545-40e4-aaf7-83b875c122bb", "name": "Principal" }, "paymentMethodId": "f739c40d-3545-40e4-aaf7-83b875c122bb", "value": "15000" },
    { "category": { "color": "#2ecc71", "id": "18a9a02a-fc75-4766-a7f2-2359267a69a0", "name": "Otros" }, "categoryId": "18a9a02a-fc75-4766-a7f2-2359267a69a0", "creationDate": '2024-10-17T13:13:53.411Z', "description": "", "id": "c4422dc8-c66b-40f1-b86b-998a4ab0f1ed", "lastModificationDate": '2024-10-17T13:13:53.411Z', "paymentDate": '2024-10-17T13:13:48.838Z', "paymentMethod": { "color": "#3498db", "description": "", "id": "f739c40d-3545-40e4-aaf7-83b875c122bb", "name": "Principal" }, "paymentMethodId": "f739c40d-3545-40e4-aaf7-83b875c122bb", "value": "26000" }]

const data = {
    tableHead: ['Head', 'Head2', 'Head3', 'Head4', 'Head5', 'Head6', 'Head7', 'Head8', 'Head9'],
    widthArr: [['content', 'content2', 'content3', 'content4', 'content5', 'content6', 'content7', 'content8', 'content9'], ['content', 'content2', 'content3', 'content4', 'content5', 'content6', 'content7', 'content8', 'content9'], ['content', 'content2', 'content3', 'content4', 'content5', 'content6', 'content7', 'content8', 'content9'], ['content', 'content2', 'content3', 'content4', 'content5', 'content6', 'content7', 'content8', 'content9'], ['content', 'content2', 'content3', 'content4', 'content5', 'content6', 'content7', 'content8', 'content9'], ['content', 'content2', 'content3', 'content4', 'content5', 'content6', 'content7', 'content8', 'content9'], ['content', 'content2', 'content3', 'content4', 'content5', 'content6', 'content7', 'content8', 'content9'], ['content', 'content2', 'content3', 'content4', 'content5', 'content6', 'content7', 'content8', 'content9'], ['content', 'content2', 'content3', 'content4', 'content5', 'content6', 'content7', 'content8', 'content9'], ['content', 'content2', 'content3', 'content4', 'content5', 'content6', 'content7', 'content8', 'content9'], ['content', 'content2', 'content3', 'content4', 'content5', 'content6', 'content7', 'content8', 'content9'], ['content', 'content2', 'content3', 'content4', 'content5', 'content6', 'content7', 'content8', 'content9'], ['content', 'content2', 'content3', 'content4', 'content5', 'content6', 'content7', 'content8', 'content9'], ['content', 'content2', 'content3', 'content4', 'content5', 'content6', 'content7', 'content8', 'content9'], ['content', 'content2', 'content3', 'content4', 'content5', 'content6', 'content7', 'content8', 'content9']]
}

export const GatosTabla = () => {

    const { expensesWithRelations } = useExpensesStore(state => state)
    const [tableData, setTableData] = useState()
    const [modalTable, serModalTable] = useState(false)
    const [dateSelected, setDateSelected] = useState({
        startDate: '',
        endDate: ''
    })

    function filterExpensesByDate(expenses, { startDate, endDate, specificDate }) {
        return expenses.filter(expense => {
            const paymentDate = dayjs(expense.paymentDate);

            if (specificDate) {
                const specific = dayjs(specificDate);
                return (
                    paymentDate.get('year') === specific.get('year') &&
                    paymentDate.get('month') === specific.get('month') &&
                    paymentDate.get('date') === specific.get('date')
                );
            }

            if (startDate && endDate) {
                const start = dayjs(startDate);
                const end = dayjs(endDate);
                return paymentDate >= start && paymentDate <= end;
            }

            return true;
        });
    }

    const startDate = '2024-10-16';
    const endDate = '2024-10-18';
    const specificDate = '2024-10-16';

    useEffect(() => {
        const data = transformToTableData(expensesWithRelations);
        setTableData(data)
    }, [expensesWithRelations])

    useEffect(() => {
        if (dateSelected.startDate === '' && !dateSelected.endDate) {
            const data = transformToTableData(expensesWithRelations);
            setTableData(data)
            return
        }
        if (dateSelected.startDate && !dateSelected.endDate) {
            const filteredBySpecificDate = filterExpensesByDate(expensesWithRelations, { specificDate: dayjs(dateSelected.startDate).format('YYYY-MM-DD') });
            const data = transformToTableData(filteredBySpecificDate);
            setTableData(data)
            return
        }
        if (dateSelected.startDate && dateSelected.endDate) {
            const filteredByRange = filterExpensesByDate(expensesWithRelations, { startDate: dayjs(dateSelected.startDate).format('YYYY-MM-DD'), endDate: dayjs(dateSelected.endDate).format('YYYY-MM-DD') });
            const data = transformToTableData(filteredByRange);
            setTableData(data)
            return
        }
    }, [dateSelected])

    function transformToTableData(expenses) {
        const tableHead = ['Descripción', 'Valor', 'Categoría', 'Metodo de pago', 'Fecha de pago', 'Fecha de creación', 'Fecha de modificación']; 

        const widthArr = expenses.map(expense => {
            return [
                expense.description || "",
                formatMoney(expense.value) || "",
                expense.category?.name || "",
                expense.paymentMethod?.name || "",
                dayjs(expense.paymentDate).format('DD/MM/YYYY') || "",
                dayjs(expense.creationDate).format('DD/MM/YYYY') || "",
                dayjs(expense.lastModificationDate).format('DD/MM/YYYY') || ""
            ];
        });
        return { tableHead, widthArr };
    }

    // const data = transformToTableData(MOCK_EXPENSES);

    return (
        <View>
            <Modal
                animationType="fade"
                transparent={false}
                visible={modalTable}
                onRequestClose={() => {
                    serModalTable(false);
                }}>
                <View>
                    <Text>Todos los gastos</Text>
                    <ModalDatePicker mode='range' startDateValue={dateSelected.startDate} endDateValue={dateSelected.endDate} setDateValue={setDateSelected} />
                </View>
                <View style={styles.container}>
                    <ScrollView horizontal={true}>
                        <View>
                            <Table borderStyle={{ borderWidth: 0, borderColor: '#C1C0B9' }}>
                                {tableData && <Row data={tableData.tableHead} widthArr={[100, 120, 110, 120, 120, 120, 120]} style={styles.header} textStyle={styles.textHeader} />}
                            </Table>
                            <ScrollView style={styles.dataWrapper}>
                                <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
                                    {
                                        tableData && tableData.widthArr.map((rowData, index) => (
                                            <Row
                                                key={index}
                                                data={rowData}
                                                widthArr={[100, 120, 110, 120, 120, 120, 120]}
                                                style={[styles.row, index % 2 && { backgroundColor: '#f9f9f9' }]}
                                                textStyle={styles.textContent}
                                            />
                                        ))
                                    }
                                </Table>
                            </ScrollView>
                        </View>
                    </ScrollView>
                </View>
            </Modal>
            <Pressable style={{ backgroundColor: 'black', padding: 10, borderRadius: 10, }} onPress={() => { serModalTable(true) }}>
                <Text style={{ color: 'white', textAlign: 'center', fontWeight: '700', fontSize: 17 }}>Tabla de todos los gastos</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { padding: 5, paddingTop: 30, backgroundColor: '#fff', maxHeight: 600, borderRadius: 10 },
    header: { backgroundColor: '#ffff' },
    textHeader: { color: '#000', textAlign: 'start', fontWeight: 'bold', paddingStart: 9, marginVertical: 11 },
    textContent: { textAlign: 'center', fontWeight: 'normal', marginVertical: 11, paddingHorizontal: 5 },
    dataWrapper: { marginTop: -1 },
    row: { backgroundColor: '#e9e9e9' }
});