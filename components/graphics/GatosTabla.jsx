import { useExpensesStore } from '@/store/expensesStore';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, Pressable, Modal, Text } from 'react-native';
import { Table, Row } from 'react-native-table-component';
import { ModalDatePicker } from '../modals/ModalDatePicker';
import { formatMoney } from '@/utils/formatMoney';

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