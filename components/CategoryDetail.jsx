import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from "react-native"
import { useEffect, useState } from "react"
import { formatMoney } from "@/utils/formatMoney"
import { AntDesign } from "@expo/vector-icons"
import { useExpensesStore } from "@/store/expensesStore"
import { ExpensesSmallCard } from "./ExpensesSmallCard"
import { BarChart } from "react-native-chart-kit"
import { Dropdown } from 'react-native-element-dropdown'
import dayjs from "dayjs"
import { MONTHS_MAYUS } from "@/utils/constantes"

// const ORDER_VALUES1 = {
//     1: (a, b) => a.paymentDate > b.paymentDate ? -1 : 1,
//     2: (a, b) => a.paymentDate < b.paymentDate ? -1 : 1,
//     3: (a, b) => Number(a.value) > Number(b.value) ? -1 : 1,
//     4: (a, b) => Number(a.value) < Number(b.value) ? -1 : 1,
//     5: (a, b) => a.creationDate > b.creationDate ? -1 : 1,
//     6: (a, b) => a.creationDate < b.creationDate ? -1 : 1,
// }

const ORDER_VALUES1 = {
    1: (a, b) => dayjs(a.paymentDate).isAfter(dayjs(b.paymentDate)) ? -1 : 1, // Fecha de pago descendente
    2: (a, b) => dayjs(a.paymentDate).isBefore(dayjs(b.paymentDate)) ? -1 : 1, // Fecha de pago ascendente
    3: (a, b) => Number(a.value) > Number(b.value) ? -1 : 1, // Valor descendente
    4: (a, b) => Number(a.value) < Number(b.value) ? -1 : 1, // Valor ascendente
    5: (a, b) => dayjs(a.creationDate).isAfter(dayjs(b.creationDate)) ? -1 : 1, // Fecha de creación descendente
    6: (a, b) => dayjs(a.creationDate).isBefore(dayjs(b.creationDate)) ? -1 : 1, // Fecha de creación ascendente
};

const AllExpensesRegister = ({ category, orderValue }) => {
    const { expensesWithRelations } = useExpensesStore(state => state)
    const [expensesFilter, setExpensesFilter] = useState(null)


    useEffect(() => {
        if (!orderValue) return
        const expensesFilterResult = expensesWithRelations.filter(expense => expense.categoryId === category.id).sort(ORDER_VALUES1[orderValue.id])
        setExpensesFilter(expensesFilterResult)
    }, [orderValue, expensesWithRelations])

    // Grafico para grafico de lineas de ultimos 6 meses
    const UltimosCincoMeses = ''
    const expensesFilterUtilmosCincoMeses = ''

    return (
        expensesFilter && expensesFilter.map(expense => (
            <ExpensesSmallCard expense={expense} key={expense.id} theme="ligth" />
        ))
    )
}

const dataDropdown = [
    { label: 'Fecha de pago descendiente', id: 1 },
    { label: 'Fecha de pago ascendente', id: 2 },
    { label: 'Mayor a menor valor', id: 3 },
    { label: 'Menor a mayor valor', id: 4 },
    { label: 'Fecha de creación descendiente', id: 5 },
    { label: 'Fecha de creación ascendente', id: 6 },
];

const DropdownComponent = ({ value, setValue }) => {
    const [isFocus, setIsFocus] = useState(false);
    const renderLabel = () => {
        if (value || isFocus) {
            return (
                <Text style={[styles.label, isFocus && { color: 'blue' }]}>
                    Ordenar gastos por
                </Text>
            );
        }
        return null;
    };

    return (
        <View style={styles.container}>
            {renderLabel()}
            <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={dataDropdown}
                // search
                // searchPlaceholder="Search..."
                maxHeight={300}
                labelField="label"
                valueField="id"
                placeholder={!isFocus ? 'Ordenar gastos por' : '...'}
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                    setValue(item);
                    setIsFocus(false);
                }}
                renderLeftIcon={() => (
                    <AntDesign
                        style={styles.icon}
                        color={isFocus ? 'blue' : 'black'}
                        name="Safety"
                        size={20}
                    />
                )}
            />
        </View>
    );
};

function groupfrequencyExpensesByMonthAndYear(payments, year) {
    const months = ["En", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

    // Inicializar un objeto para almacenar los totales de cada mes.
    const monthlyTotals = Array(12).fill(0);

    // Procesar cada pago en el array
    payments.forEach(({ paymentDate, value }) => {
        const date = new Date(paymentDate); // Convertir la fecha a un objeto Date
        if (date.getFullYear() === year) { // Filtrar solo los pagos del año especificado
            const month = date.getMonth(); // Obtener el índice del mes (0-11)
            monthlyTotals[month] += Number(value); // Sumar el valor al mes correspondiente
        }
    });

    // Crear el objeto final
    return {
        labels: months,
        datasets: [
            {
                data: monthlyTotals
            }
        ]
    };
}

const getMaxExpenseMonth = (data) => {
    if (!data || data.length === 0) return null;

    const monthlyTotals = data.reduce((acc, item) => {
        const date = new Date(item.paymentDate);
        const month = date.getMonth(); // 0 = Enero, 11 = Diciembre
        const year = date.getFullYear();
        const key = `${year}-${month}`; // clave por año y mes

        acc[key] = (acc[key] || 0) + parseFloat(item.value);
        return acc;
    }, {});

    const maxExpenseMonth = Object.entries(monthlyTotals).reduce(
        (max, [key, value]) => (value > max.value ? { key, value } : max),
        { key: null, value: 0 }
    );

    if (!maxExpenseMonth.key) return null;

    const [yearStr, monthStr] = maxExpenseMonth.key.split("-");
    const year = Number(yearStr);
    const month = Number(monthStr);

    return {
        year,
        month: month, // Ajustar porque getMonth() es 0-based
        value: maxExpenseMonth.value,
    };
};


const InfoContainer = ({ children, customStyleContainer }) => {
    return (
        <View style={{ marginHorizontal: 20, padding: 10, borderRadius: 10, borderWidth: 1, ...customStyleContainer }}>
            {children}
        </View>
    )
}

export const CategoryDetail = ({ categoryId, categoryName, categoryColor, categoryTotalValue, expensesWithRelations }) => {
    const [visible, setVisible] = useState(false)
    const [orderValue, setOrderValue] = useState(dataDropdown[0]);
    const [frequencyExpenses, setFrequencyExpenses] = useState(null)
    const [yearToFrecuencyExpenses, setYearToFrecuencyExpenses] = useState(dayjs().year())
    const [monthMaxExpenses, setMonthMaxExpenses] = useState(null)
    const [category, setCategory] = useState(null)
    const { categories } = useExpensesStore(state => state)
    const regexNumberInt = /^[0-9]+$/;

    useEffect(() => {
        const categoryActually = categories.find(category => category.id === categoryId)
        setCategory(categoryActually)
        setMonthMaxExpenses(getMaxExpenseMonth(expensesWithRelations.filter(expense => expense.categoryId === categoryId)))
    }, [expensesWithRelations])

    useEffect(() => {
        const expensesFilterResult = expensesWithRelations.filter(expense => expense.categoryId === categoryId)
        const expensesFrequencyResult = groupfrequencyExpensesByMonthAndYear(expensesFilterResult, yearToFrecuencyExpenses)
        setFrequencyExpenses(expensesFrequencyResult)
    }, [yearToFrecuencyExpenses, expensesWithRelations])

    return (
        <>
            <Modal
                animationType="fade"
                transparent={false}
                visible={visible}
                onRequestClose={() => {
                    setVisible(false)
                }}>
                {category &&
                    <View style={{ flex: 1 }}>
                        <View style={{ flexDirection: 'row', gap: 19, padding: 20, justifyContent: 'start', alignItems: 'center', borderBottomWidth: 1, borderColor: 'black' }}>
                            <Pressable onPress={() => setVisible(false)}>
                                <AntDesign name="leftcircleo" size={30} color="black" />
                            </Pressable>
                            <Text style={{ fontSize: 20, color: 'black' }}>{category.name}</Text>
                        </View>
                        {expensesWithRelations.filter(expense => expense.categoryId === category.id).length > 0
                            ? <ScrollView>
                                <View style={{ flex: 1, flexDirection: 'column', gap: 10, gap: 15, paddingTop: 10, paddingHorizontal: 20 }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', flexDirection: 'column', alignItems: 'flex-start' }}>
                                        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Total gastos:</Text>
                                        <Text style={{ fontSize: 12 }}> {formatMoney(categoryTotalValue)}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', flexDirection: 'column', alignItems: 'flex-start' }}>
                                        <Text style={{ fontSize: 15, fontWeight: 'bold', }}>Cantidad de registros:</Text>
                                        <Text style={{ fontSize: 12, }}>{expensesWithRelations ? expensesWithRelations.filter(expense => expense.categoryId === category.id).length : 0}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'column', alignItems: 'start' }}>
                                        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Mes con mayor gasto:</Text>
                                        {monthMaxExpenses && <View style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 1 }}>
                                            <Text style={{ fontSize: 12, }}>{MONTHS_MAYUS[monthMaxExpenses.month]}/{monthMaxExpenses.year}</Text>
                                            <Text style={{ fontSize: 12, }}>{formatMoney(monthMaxExpenses.value)}</Text>
                                        </View>}
                                    </View>
                                </View>
                                <View style={{ borderTopWidth: 0.2, marginVertical: 20 }}></View>
                                <View style={{ flex: 1, flexDirection: 'column', gap: 10, marginBottom: 30 }}>
                                    <View style={{ paddingHorizontal: 15, gap: 10 }}>
                                        <Text style={{ fontSize: 20, textAlign: 'center' }}>Frecuencia de gastos</Text>
                                        <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center', justifyContent: 'center' }}>
                                            <Pressable onPress={() => setYearToFrecuencyExpenses(yearToFrecuencyExpenses - 1)}>
                                                <AntDesign name="left" size={24} color="black" />
                                            </Pressable>
                                            <Text style={{ fontSize: 20 }}>{yearToFrecuencyExpenses}</Text>
                                            <Pressable onPress={() => yearToFrecuencyExpenses >= dayjs().year() ? null : setYearToFrecuencyExpenses(yearToFrecuencyExpenses + 1)}>
                                                <AntDesign name="right" size={24} color={yearToFrecuencyExpenses >= dayjs().year() ? 'gray' : 'black'} />
                                            </Pressable>
                                        </View>
                                        {frequencyExpenses && <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'black', padding: 10, borderRadius: 10 }}>
                                            <ScrollView horizontal>
                                                <BarChart
                                                    chartConfig={{
                                                        decimalPlaces: 0,
                                                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                                    }}
                                                    style={{ borderRadius: 20 }}
                                                    data={frequencyExpenses}
                                                    width={720}
                                                    height={250}
                                                    fromZero
                                                    showValuesOnTopOfBars
                                                />
                                            </ScrollView>
                                        </View>}
                                    </View>
                                    <View style={{ borderTopWidth: 0.2, marginVertical: 20 }}></View>
                                    <View style={{ flex: 1, flexDirection: 'column', gap: 10 }}>
                                        <View style={{ gap: 15, paddingHorizontal: 20 }}>
                                            <Text style={{ fontSize: 20, textAlign: 'center' }}>Todos los gastos de la categoría</Text>
                                            <DropdownComponent setValue={setOrderValue} value={orderValue} />
                                            <View style={{ gap: 10 }}>
                                                <AllExpensesRegister category={category} orderValue={orderValue} />
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </ScrollView>
                            : <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: 20, marginHorizontal: 10, textAlign: 'center', opacity: 0.6 }}>No hay registros en esta categoría</Text>
                            </View>
                        }
                    </View >
                }
            </Modal >

            <Pressable style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, borderRadius: 10, backgroundColor: 'white', borderWidth: 0.4, borderColor: 'black' }} onPress={() => { setVisible(true) }}>
                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 5 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, }}>
                        <View style={{ width: 10, height: 10, backgroundColor: categoryColor, borderRadius: 10 }}></View>
                        <Text style={{ color: 'black', fontSize: 15, fontWeight: 'normal' }}>{categoryName}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, }}>
                        <Text style={{ color: 'gray', fontSize: 12, }}>Total:</Text>
                        <Text style={{ color: 'black', fontSize: 15, fontWeight: 'bold' }}>{formatMoney(categoryTotalValue)}  </Text>
                    </View>
                </View>
                <AntDesign name="right" size={16} color="black" />
            </Pressable>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        paddingVertical: 16,
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
});