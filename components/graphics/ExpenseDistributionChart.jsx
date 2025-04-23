import { View, Text } from 'react-native';
import { PieChart } from 'react-native-chart-kit';  // Para gráfico circular
import { Dimensions } from 'react-native';  // Para ajustar el tamaño del gráfico

// Asegúrate de tener datos estructurados para el gráfico
const screenWidth = Dimensions.get('window').width;

export const ExpenseDistributionChart = ({ expenses }) => {
    const groupedByCategory = expenses.reduce((acc, expense) => {
        const { category } = expense;
        const value = parseFloat(expense.value);

        if (!acc[category.id]) {
            acc[category.id] = {
                name: category.name,
                total: value,
                color: category.color,
            };
        } else {
            acc[category.id].total += value;
        }

        return acc;
    }, {});

    const total = Object.values(groupedByCategory).reduce((sum, item) => sum + item.total, 0);

    const chartData = Object.values(groupedByCategory).map(item => ({
        name: item.name,
        population: item.total,
        color: item.color,
    }));

    return (
        <View style={{ alignItems: 'center', marginBottom: 20 }}>
            <Text style={{ fontSize: 15, fontWeight: 'bold', marginBottom: 10 }}>Distribución de Gastos por categoría</Text>
            <PieChart
                data={chartData.map(item => ({
                    ...item,
                    legendFontColor: 'transparent',
                    legendFontSize: 0,
                }))}
                hasLegend={false}
                width={screenWidth}
                height={240}
                style={{ margin: 'auto', width: '60%' }}
                chartConfig={{
                    backgroundColor: '#fff',
                    backgroundGradientFrom: '#fff',
                    backgroundGradientTo: '#fff',
                    decimalPlaces: 0,
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                }}
                accessor="population"
                backgroundColor="transparent"
                absolute
            />
            <View style={{ width: '100%', marginTop: 20 }}>
                {chartData.map((item, index) => {
                    const percentage = ((item.population / total) * 100).toFixed(1);
                    return (
                        <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
                            <View style={{ width: 12, height: 12, backgroundColor: item.color, marginRight: 8, borderRadius: 6 }} />
                            <Text style={{ fontSize: 14 }}>{percentage}% {item.name}</Text>
                        </View>
                    );
                })}
            </View>
        </View>
    );
};