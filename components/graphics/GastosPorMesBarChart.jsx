import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { BarChart } from 'react-native-chart-kit'
import { Dimensions } from 'react-native';
import { useExpensesStore } from '@/store/expensesStore';
import dayjs from 'dayjs';

const MOCK_DATA = {
    labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", 'junio', 'julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    datasets: [
        {
            data: [20, 45, 28, 80, 99]
        },
    ]
};

const GastosPorMesBarChart = () => {
    const { expensesWithRelations } = useExpensesStore(state => state)
    const screenWidth = Dimensions.get("window").width;

    // console.log(expensesWithRelations.map(item => item.paymentDate));

    const groupedByMonth = expensesWithRelations.reduce((acc, expense) => {
        // Extraer el mes y año de la fecha
        const month = dayjs(expense.paymentDate).format("M");
        // console.log(month);
        // Si el mes ya existe en el acumulador, sumar el valor
        if (acc[month]) {
            acc[month] += Number(expense.value);
        } else {
            // Si no existe, inicializar el valor
            acc[month] = Number(expense.value);
        }

        return acc;
    }, []);

    // console.log(groupedByMonth);

    // Necesito crear un array de objetos en los que aparesca el mes y el valor total del mes

    return (
        <ScrollView horizontal>
            <BarChart
                chartConfig={{
                    backgroundGradientFrom: 'white',
                    backgroundGradientTo: 'white',
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                }}
                style={{ borderRadius: 10, fontSize: 10, backgroundColor: 'red' }}
                data={MOCK_DATA}
                width={screenWidth + 100}
                height={300}
                yAxisLabel="$"
                showValuesOnTopOfBars
                // chartConfig={chartConfig}
                verticalLabelRotation={20}
            />
        </ScrollView>
    )
}

export default GastosPorMesBarChart

const styles = StyleSheet.create({})