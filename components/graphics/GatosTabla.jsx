import { useExpensesStore } from '@/store/expensesStore';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { View, ScrollView, Pressable, Modal, Text } from 'react-native';
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
        const tableHead = ['Categoría', 'Metodo de pago', 'Valor', 'Descripción', 'Fecha de pago', 'Fecha de creación', 'Fecha de modificación'];
        const widthArr = expenses
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
                <View style={{ paddingHorizontal: 30, paddingTop: 30, gap: 10 }}>
                    <Text style={{ fontSize: 20, color: 'black', fontWeight: 'bold', textAlign: 'center' }}>Tabla de todos los gastos</Text>
                    <ModalDatePicker mode='range' startDateValue={dateSelected.startDate} endDateValue={dateSelected.endDate} setDateValue={setDateSelected} />
                </View>
                <View >
                    <ScrollView horizontal style={{ maxHeight: 600, margin: 3, borderRadius: 10 }}>
                        {/* Headers */}
                        <View style={{ position: 'absolute', top: 0, right: 0, flexDirection: 'row', paddingHorizontal: 10}}>
                            {tableData && tableData.tableHead.map((colName, colIndex) => (
                                <Text key={colName} style={{ fontSize: 12, textAlign: 'center', padding: 10, width: colIndex === 3 ? 200 : colIndex === 6 ? 141 : 120 }}>{colName}</Text>
                            ))}
                        </View>
                        <ScrollView style={{paddingTop: 35}}>
                            {/* Rows */}
                            <View style={{ paddingHorizontal: 10 }}>
                                {tableData && tableData.widthArr.map((rowData, cellIndex) => (
                                    <View key={cellIndex} style={{ flexDirection: 'row' }}>
                                        <View style={{ width: 120, borderWidth: 0.5, borderLeftWidth: 0, borderColor: '#C1C0B9', padding: 5, alignItems: 'center' }}>
                                            <View style={{ backgroundColor: rowData.category.color, borderRadius: 10, paddingHorizontal: 10, paddingVertical: 3 }}>
                                                <Text style={{ color: 'white', textAlign: 'center', fontSize: 12 }}>{rowData.category.name}</Text>
                                                {/* <Text style={{ color: 'white', textAlign: 'center', fontSize: 12 }}>asdasd asd asdasdasdasdas dasdasdas asdasdasdasd asda dasdasasddasadd asdasdasdas asdasdasdasda asd asdas sadasdas</Text> */}
                                            </View>
                                        </View>
                                        <View style={{ width: 120, borderWidth: 0.5, borderColor: '#C1C0B9', padding: 5, alignItems: 'center' }}>
                                            <View style={{ backgroundColor: rowData.category.color, borderRadius: 10, paddingHorizontal: 10, paddingVertical: 3 }}>
                                                <Text style={{ color: 'white', textAlign: 'center', fontSize: 12 }}>{rowData.paymentMethod.name}</Text>
                                                {/* <Text style={{ color: 'white', textAlign: 'center', fontSize: 12 }}>asdasd asd asdasdasdasdas dasdasdas asdasdasdasd asda dasdasasddasadd asdasdasdas asdasdasdasda asd asdas sadasdas</Text> */}
                                            </View>
                                        </View>
                                        <Text style={{ width: 120, borderWidth: 0.5, borderColor: '#C1C0B9', padding: 5, textAlign: 'right', fontSize: 12 }}>{formatMoney(rowData.value)}</Text>
                                        <Text style={{ width: 200, borderWidth: 0.5, borderColor: '#C1C0B9', padding: 5, fontSize: 12 }}>{rowData.description}</Text>
                                        {/* <Text style={{ width: 200, borderWidth: 0.5, borderColor: '#C1C0B9', padding: 5, fontSize: 12 }}>asdasd asd asdasdasdasdas dasdasdas asdasdasdasd asda dasdasasddasadd asdasdasdas asdasdasdasda asd asdas sadasdas asdasd asdasdasdasdad asd as dasd</Text> */}
                                        <Text style={{ width: 120, borderWidth: 0.5, borderColor: '#C1C0B9', padding: 5, fontSize: 12 }}>{dayjs(rowData.paymentDate).format('DD/MM/YYYY')}</Text>
                                        <Text style={{ width: 120, borderWidth: 0.5, borderColor: '#C1C0B9', padding: 5, fontSize: 12 }}>{dayjs(rowData.creationDate).format('DD/MM/YYYY')}</Text>
                                        <Text style={{ width: 141, borderWidth: 0.5, borderRightWidth: 0, borderColor: '#C1C0B9', padding: 5, fontSize: 12 }}>{dayjs(rowData.lastModificationDate).format('DD/MM/YYYY')}</Text>
                                    </View>
                                ))}
                            </View>
                        </ScrollView>
                    </ScrollView>
                </View>
            </Modal>
            <Pressable style={{ backgroundColor: 'black', padding: 10, borderRadius: 10, }} onPress={() => { serModalTable(true) }}>
                <Text style={{ color: 'white', textAlign: 'center', fontWeight: '700', fontSize: 17 }}>Tabla de todos los gastos</Text>
            </Pressable>
        </View>
    );
};