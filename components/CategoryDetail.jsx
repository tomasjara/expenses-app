import { Dimensions, Modal, Pressable, ScrollView, Text, View } from "react-native"
import { useState } from "react"
import { formatMoney } from "@/utils/formatMoney"
import { AntDesign } from "@expo/vector-icons"
import { useExpensesStore } from "@/store/expensesStore"
import { ExpensesSmallCard } from "./ExpensesSmallCard"
import { BarChart, LineChart } from "react-native-chart-kit"

const AllExpensesRegister = ({ category }) => {
    const { expensesWithRelations } = useExpensesStore(state => state)
    const expensesFilter = expensesWithRelations.filter(expense => expense.categoryId === category.id)

    // Grafico para grafico de lineas de ultimos 6 meses
    const UltimosCincoMeses = ''
    const expensesFilterUtilmosCincoMeses = ''

    return (
        <View style={{ paddingHorizontal: 20 }}>
            {expensesFilter.map(expense => (
                <ExpensesSmallCard expense={expense} key={expense.id} />
            ))}
        </View>
    )
}
const data = {
    labels: ["Jul", "Ago", "Sep", "Oct", "Nov"],
    datasets: [
        {
            data: [0, 15000, 7500, 142000, 216000]
        }
    ]
};
export const CategoryDetail = ({ category }) => {
    const [visible, setVisible] = useState(false)

    return (
        <>
            <Modal
                animationType="fade"
                transparent={false}
                visible={visible}
                onRequestClose={() => {
                    setVisible(false)
                }}>
                <View >
                    <View style={{ flexDirection: 'row', gap: 19, padding: 15, justifyContent: 'start', alignItems: 'center', backgroundColor: category.color }}>
                        <Pressable onPress={() => { setVisible(false) }}>
                            <AntDesign name="close" size={24} color="white" />
                        </Pressable>
                        <Text style={{ fontSize: 20, color: 'white' }}>{category.name}</Text>
                    </View>
                    <ScrollView>
                        <View style={{ gap: 10 }}>
                            <View style={{ flexDirection: 'row', gap: 20, padding: 10 }}>
                                <Text style={{ fontSize: 15, }}>Total de gastos</Text>
                                <Text style={{ fontSize: 15 }}> {formatMoney(category.value)}</Text>
                            </View>
                            <View style={{ gap: 10, paddingHorizontal: 10 }}>
                                <Text style={{ fontSize: 15, }}>- Total de gastos registrados</Text>
                                <Text style={{ fontSize: 15, }}>- Limite de gasto</Text>
                            </View>
                            <View style={{ gap: 10, borderWidth: 1, borderRadius: 10, marginHorizontal: 10 }}>
                                <Text style={{ fontSize: 15, }}>- Frecuencia de gasto</Text>
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <ScrollView horizontal>

                                        <BarChart
                                            chartConfig={{
                                                backgroundColor: "#000",
                                                decimalPlaces: 0, // optional, defaults to 2dp
                                                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                            }}
                                            data={data}
                                            width={320}
                                            showValuesOnTopOfBars
                                            height={220}
                                            yAxisLabel="$"
                                            verticalLabelRotation={30}
                                        />
                                    </ScrollView>
                                </View>
                            </View>
                            <View style={{ gap: 10, borderWidth: 1, borderRadius: 10, marginBottom: 80, marginHorizontal: 10 }}>
                                <Text style={{ fontSize: 15, textAlign: 'center' }}>Todos los gastos - (Opciones de ordenamiento) </Text>
                                <AllExpensesRegister category={category} />
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </Modal>
            <Pressable style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, borderRadius: 10, backgroundColor: category.color }} onPress={() => { setVisible(true) }}>
                <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold' }}>{category.name}</Text>
                <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold' }}>{formatMoney(category.value)}</Text>
            </Pressable>
        </>
    )
}
