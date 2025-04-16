import { KeyboardAvoidingView, Modal, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native"
import { useEffect, useState } from "react"
import { formatMoney } from "@/utils/formatMoney"
import { AntDesign } from "@expo/vector-icons"
import { useExpensesStore } from "@/store/expensesStore"
import { ExpensesSmallCard } from "./ExpensesSmallCard"
import { BarChart, LineChart } from "react-native-chart-kit"
import { Dropdown } from 'react-native-element-dropdown'
import dayjs from "dayjs"
import { MONTHS_MAYUS } from "@/utils/constantes"
import ButtonBase from "./ButtonBase"

const ORDER_VALUES = [
    { id: 1, name: 'Fecha de pago ascendente', condition: (a, b) => a.paymentDate > b.paymentDate ? -1 : 1 },
    { id: 2, name: 'Fecha de pago descendiente', condition: (a, b) => a.paymentDate < b.paymentDate ? -1 : 1 },
    { id: 3, name: 'Mayor a menor valor', condition: (a, b) => a.value > b.value ? -1 : 1 },
    { id: 4, name: 'Menor a mayor valor', condition: (a, b) => a.value < b.value ? -1 : 1 },
    { id: 5, name: 'Fecha de creación ascendente', condition: (a, b) => a.creationDate > b.creationDate ? -1 : 1 },
    { id: 6, name: 'Fecha de creación descendiente', condition: (a, b) => a.creationDate < b.creationDate ? -1 : 1 },
]
const ORDER_VALUES1 = {
    1: (a, b) => a.paymentDate > b.paymentDate ? -1 : 1,
    2: (a, b) => a.paymentDate < b.paymentDate ? -1 : 1,
    3: (a, b) => Number(a.value) > Number(b.value) ? -1 : 1,
    4: (a, b) => Number(a.value) < Number(b.value) ? -1 : 1,
    5: (a, b) => a.creationDate > b.creationDate ? -1 : 1,
    6: (a, b) => a.creationDate < b.creationDate ? -1 : 1,
}

const AllExpensesRegister = ({ category, orderValue }) => {
    const { expensesWithRelations } = useExpensesStore(state => state)
    const [expensesFilter, setExpensesFilter] = useState(null)


    useEffect(() => {
        if (!orderValue) return
        const expensesFilterResult = expensesWithRelations.filter(expense => expense.categoryId === category.id).sort(ORDER_VALUES1[orderValue.id])
        setExpensesFilter(expensesFilterResult)
    }, [orderValue])

    // Grafico para grafico de lineas de ultimos 6 meses
    const UltimosCincoMeses = ''
    const expensesFilterUtilmosCincoMeses = ''

    return (
        <View style={{}}>
            {expensesFilter && expensesFilter.map(expense => (
                <ExpensesSmallCard expense={expense} key={expense.id} />
            ))}
        </View>
    )
}

const data = {
    labels: ["En", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
    datasets: [
        {
            data: [0, 0, 1500, 52000, 15000, 0, 1450, 0, 0, 7500, 142000, 216.000]
        }
    ]
};

const dataDropdown = [
    { label: 'Fecha de pago ascendente', id: 1 },
    { label: 'Fecha de pago descendiente', id: 2 },
    { label: 'Mayor a menor valor', id: 3 },
    { label: 'Menor a mayor valor', id: 4 },
    { label: 'Fecha de creación ascendente', id: 5 },
    { label: 'Fecha de creación descendiente', id: 6 },
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

const example = {
    "category": { "color": "#138d75", "description": "", "disabled": false, "id": "483fe888-5655-41e6-895c-59cf64313482", "name": "Sin categoria" },
    "categoryId": "483fe888-5655-41e6-895c-59cf64313482",
    "creationDate": "2024-11-14T16:46:38.597Z",
    "description": "Rifa nilo", "id": "44e585a4-7f88-4c9d-b341-5e62940b5e77",
    "lastModificationDate": "2024-11-14T16:46:55.578Z",
    "paymentDate": "2024-11-14T16:45:36.898Z",
    "paymentMethod": { "color": "#138d75", "description": "", "disabled": false, "id": "ca326445-68ce-4fa4-9176-cf22dd485d9c", "name": "Efectivo" },
    "paymentMethodId": "ca326445-68ce-4fa4-9176-cf22dd485d9c",
    "value": "2000"
}
const getMaxExpenseMonth = (data) => {
    // if(!data) return
    // Convertir los valores a números y agrupar por mes y año
    const monthlyTotals = data.reduce((acc, item) => {
        const date = new Date(item.paymentDate);
        const month = date.getMonth(); // 0 = Enero, 11 = Diciembre
        const year = date.getFullYear();
        const key = `${year}-${month}`;

        acc[key] = (acc[key] || 0) + parseFloat(item.value);
        return acc;
    }, {});

    // Encontrar el mes con el mayor gasto
    const maxExpenseMonth = Object.entries(monthlyTotals).reduce(
        (max, [key, value]) => (value > max.value ? { key, value } : max),
        { key: null, value: 0 }
    );
    // Separar el mes y el año
    // const [year, month] = maxExpenseMonth.key.split("-").map(Number);

    return {
        year,
        month: month + 1, // Ajustar porque getMonth() es 0-based
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

export const CategoryDetail = ({ categoryId, categoryName, categoryColor, categoryTotalValue }) => {
    const [visible, setVisible] = useState(false)
    const [orderValue, setOrderValue] = useState(dataDropdown[0]);
    const [frequencyExpenses, setFrequencyExpenses] = useState(null)
    const [yearToFrecuencyExpenses, setYearToFrecuencyExpenses] = useState(dayjs().year())
    const [monthMaxExpenses, setMonthMaxExpenses] = useState(null)
    const [expensesTotalAcutallyMonth, setExpensesTotalAcutallyMonth] = useState(null)
    const [modalAsignarLimiteVisible, setModalAsignarLimiteVisible] = useState({ show: false })
    const [limitInputValue, setLimitInputValue] = useState('')
    // TODO
    const [category, setCategory] = useState(null)
    const { expensesWithRelations, updateCategory, categories } = useExpensesStore(state => state)
    const regexNumberInt = /^[0-9]+$/;

    useEffect(() => {
        const categoryActually = categories.find(category => category.id === categoryId)
        setCategory(categoryActually)
        setExpensesTotalAcutallyMonth(expensesWithRelations.filter(expense => expense.categoryId === categoryId && dayjs(expense.paymentDate).month() === dayjs().month()).reduce((acc, expense) => acc + parseFloat(expense.value), 0))
        // setMonthMaxExpenses(getMaxExpenseMonth(expensesWithRelations.filter(expense => expense.categoryId === categoryId)))
    }, [expensesWithRelations])

    useEffect(() => {
        const expensesFilterResult = expensesWithRelations.filter(expense => expense.categoryId === categoryId)
        const expensesFrequencyResult = groupfrequencyExpensesByMonthAndYear(expensesFilterResult, yearToFrecuencyExpenses)
        setFrequencyExpenses(expensesFrequencyResult)
    }, [yearToFrecuencyExpenses])

    useEffect(() => {
        if (modalAsignarLimiteVisible.option === 'edit') {
            setLimitInputValue(category.limit)
        }
        if (modalAsignarLimiteVisible.option === 'create') {
            setLimitInputValue('')
        }
    }, [modalAsignarLimiteVisible])

    const onAsignLimit = () => {
        if (!limitInputValue) return
        if (!regexNumberInt.test(limitInputValue)) return
        if (limitInputValue <= 0) {
            const categoryEdited = {
                ...category,
                limit: undefined
            }
            updateCategory(categoryEdited)
            setModalAsignarLimiteVisible({ show: false })
            return
        }
        const categoryEdited = {
            ...category,
            limit: limitInputValue
        }
        updateCategory(categoryEdited)
        setModalAsignarLimiteVisible({ show: false })
    }

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
                    <View >
                        <View style={{ flexDirection: 'row', gap: 19, padding: 15, justifyContent: 'start', alignItems: 'center', backgroundColor: category.color }}>
                            <Pressable onPress={() => { setVisible(false) }}>
                                <AntDesign name="left" size={24} color="white" />
                            </Pressable>
                            <Text style={{ fontSize: 20, color: 'white' }}>{category.name}</Text>
                        </View>
                        <ScrollView>
                            <View style={{ gap: 20, marginTop: 10 }}>
                                <View style={{ flexDirection: 'row', marginHorizontal: 20, alignItems: 'flex-start', justifyContent: 'space-between', gap: 10 }}>
                                    <View style={{ justifyContent: 'space-around', alignItems: 'center', maxWidth: 130, height: 70, borderWidth: 1, borderRadius: 10, padding: 10 }}>
                                        <Text style={{ fontSize: 12, fontWeight: 'bold' }}>Total gastos</Text>
                                        <Text style={{ fontSize: 12 }}> {formatMoney(categoryTotalValue)}</Text>
                                    </View>
                                    <View style={{ justifyContent: 'space-around', alignItems: 'center', maxWidth: 150, height: 70, borderWidth: 1, borderRadius: 10, padding: 10 }}>
                                        <Text style={{ fontSize: 12, fontWeight: 'bold' }}>Registros</Text>
                                        <Text style={{ fontSize: 12, }}>{expensesWithRelations ? expensesWithRelations.filter(expense => expense.categoryId === category.id).length : 0}</Text>
                                    </View>
                                    {/* <View style={{ justifyContent: 'space-around', alignItems: 'center', width: 160, height: 70, borderWidth: 1, borderRadius: 10, padding: 10 }}>
                                        <Text style={{ fontSize: 12, fontWeight: 'bold' }}>Mes con mayor gasto</Text>
                                        {monthMaxExpenses && <View style={{ alignItems: 'center' }}>
                                            <Text style={{ fontSize: 12, }}>{MONTHS_MAYUS[monthMaxExpenses.month]} - {monthMaxExpenses.year}</Text>
                                            <Text style={{ fontSize: 12, }}>{formatMoney(monthMaxExpenses.value)}</Text>
                                        </View>}
                                    </View> */}
                                </View>
                                {/* <InfoContainer >
                                    <View style={{ gap: 10 }}>
                                        <Text style={{ fontSize: 25, textAlign: 'center' }}>Limite mensual</Text>
                                        <Modal
                                            animationType="fade"
                                            transparent={true}
                                            visible={modalAsignarLimiteVisible.show}
                                            onRequestClose={() => {
                                                setModalAsignarLimiteVisible({ show: false });
                                            }}>
                                            <Pressable style={{ alignItems: 'center', justifyContent: 'center', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.6)' }} onPress={() => { setModalAsignarLimiteVisible({ show: false }) }}>
                                                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                                                    <Pressable style={{ backgroundColor: 'white', padding: 25, borderRadius: 10, alignItems: 'center', gap: 15 }} onPress={() => { }}>
                                                        {modalAsignarLimiteVisible.option === 'edit' ? <Text style={{ fontSize: 22, textAlign: 'center' }}>Editar límite mensual</Text> : <Text style={{ fontSize: 22, textAlign: 'center' }}>Asignar límite mensual</Text>}
                                                        <TextInput style={{
                                                            borderRadius: 10,
                                                            padding: 10,
                                                            borderWidth: 1,
                                                            width: 200
                                                        }}
                                                            keyboardType="numeric"
                                                            placeholder={'Limite mensual'}
                                                            onChangeText={(e) => setLimitInputValue(e.replace(/[^0-9]/g, ""))}
                                                            value={limitInputValue} />
                                                        <ButtonBase customStyleContainer={{ width: 200, margin: 0 }} title={'Aceptar'} onPress={onAsignLimit} />
                                                    </Pressable>
                                                </KeyboardAvoidingView>
                                            </Pressable>
                                        </Modal>
                                        {category.limit ?
                                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                                <View style={{ width: '60%', gap: 10 }}>
                                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                        <Text style={{ fontSize: 14 }}>Límite mensual</Text>
                                                        <Text style={{ fontSize: 14 }}>{formatMoney(category.limit)}</Text>
                                                    </View>
                                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                        <Text style={{ fontSize: 14 }}>Gasto actual</Text>
                                                        <Text style={{ fontSize: 14 }}>{expensesTotalAcutallyMonth ? formatMoney(expensesTotalAcutallyMonth) : ''}</Text>
                                                    </View>
                                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                        <Text style={{ fontSize: 14 }}>Diferencia</Text>
                                                        <Text style={{ fontSize: 14 }}>{expensesTotalAcutallyMonth ? formatMoney(category.limit - expensesTotalAcutallyMonth) : ''}</Text>
                                                    </View>
                                                    <ButtonBase title={'Editar límite mensual'} onPress={() => setModalAsignarLimiteVisible({ show: true, option: 'edit' })} />
                                                </View>
                                            </View>
                                            : <View >
                                                <ButtonBase title={'Asignar límite mensual'} onPress={() => setModalAsignarLimiteVisible({ show: true, option: 'create' })} />
                                            </View>
                                        }

                                    </View>
                                </InfoContainer> */}
                                <InfoContainer>
                                    <View style={{}}>
                                        <Text style={{ fontSize: 25, textAlign: 'center' }}>Frecuencia de gastos</Text>
                                        <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center', justifyContent: 'center', padding: 10 }}>
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
                                </InfoContainer>
                                <InfoContainer customStyleContainer={{ marginBottom: 80, }}>
                                    <View style={{ gap: 10, paddingHorizontal: 20 }}>
                                        <Text style={{ fontSize: 25, textAlign: 'center' }}>Todos los gastos</Text>
                                        <DropdownComponent setValue={setOrderValue} value={orderValue} />
                                        <AllExpensesRegister category={category} orderValue={orderValue} />
                                    </View>
                                </InfoContainer>
                            </View>
                        </ScrollView>
                    </View >
                }
            </Modal >
            <Pressable style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, borderRadius: 10, backgroundColor: categoryColor }} onPress={() => { setVisible(true) }}>
                <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold' }}><AntDesign name="right" size={16} color="white" /> {categoryName}</Text>
                <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold' }}>{formatMoney(categoryTotalValue)}</Text>
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