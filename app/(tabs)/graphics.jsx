import { Dimensions, ScrollView, StyleSheet, Text } from 'react-native';
import { ContainerScreen } from '@/components/ContainerScreen';
import { ContainerWidget } from '@/components/ContainerWidget';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import { useExpensesStore } from '@/store/expensesStore';

const screenWidth = Dimensions.get("window").width;

const data = {
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
      data: [
        Math.random() * 100,
        Math.random() * 100,
        Math.random() * 100,
        Math.random() * 100,
        Math.random() * 100,
        Math.random() * 100
      ]
    }
  ]
}

const dataPieChart = [
  {
    name: "Seoul",
    population: 21500000,
    color: "rgba(131, 167, 234, 1)",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  },
  {
    name: "Toronto",
    population: 2800000,
    color: "#F00",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  },
  {
    name: "Beijing",
    population: 527612,
    color: "red",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  },
  {
    name: "New York",
    population: 8538000,
    color: "#ffffff",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  },
  {
    name: "Moscow",
    population: 11920000,
    color: "rgb(0, 0, 255)",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  }
];

const chartConfig = {
  backgroundColor: "#e26a00",
  backgroundGradientFrom: "#fb8c00",
  backgroundGradientTo: "#ffa726",
  decimalPlaces: 1,
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: "6",
    strokeWidth: "2",
    stroke: "#ffa726"
  }
};

export default function GraphicsScreen() {
  const { expensesWithRelations } = useExpensesStore(state => state)

  const expensesPieChart = expensesWithRelations.reduce((acc, expense) => {
    const categoryName = expense.category.name;
    const value = parseFloat(expense.value);
    // Buscar si la categoría ya está en el acumulador
    const existingCategory = acc.find(item => item.name === categoryName);
    if (existingCategory) {
      // Si ya existe, sumar el valor
      existingCategory.value += value;
    } else {
      // Si no existe, agregar una nueva entrada
      acc.push({
        name: categoryName, value, color: expense.category.color,
        legendFontColor: expense.category.color,
        legendFontSize: 15
      });
    }
    return acc;
  }, [])
  return (
    <ScrollView>
      <ContainerScreen>
        <Text style={{ color: 'white', fontSize: 30 }}>Graficos</Text>
        {/* <ContainerWidget>
          <Text style={{ color: 'black', fontSize: 25, alignSelf: 'flex-start' }}>Grafico 1</Text>
          <LineChart
            data={data}
            width={310}
            height={240}
            yAxisLabel="$"
            yAxisSuffix="k"
            yAxisInterval={1}
            chartConfig={chartConfig}
            bezier
            style={{
              borderRadius: 16,
            }}
          />
        </ContainerWidget> */}
        {expensesPieChart.length != 0 && <ContainerWidget customStyle={{ alignItems: 'center' }}>
          <Text style={{ color: 'black', fontSize: 25, alignSelf: 'flex-start' }}>Gastos por categorias</Text>
          <PieChart
            data={expensesPieChart}
            width={340}
            height={220}
            chartConfig={chartConfig}
            accessor={"value"}
            backgroundColor={"transparent"}
            center={[12, 0]}
          // absolute
          />
        </ContainerWidget>}

        {/* <ContainerWidget>
          <Text style={{ color: 'black', fontSize: 25, alignSelf: 'flex-start' }}>Grafico 2</Text>
          <ContributionGraph
            values={[
              { date: "2017-01-02", count: 1 },
              { date: "2017-01-03", count: 2 },
              { date: "2017-01-04", count: 3 },
              { date: "2017-01-05", count: 4 },
              { date: "2017-01-06", count: 5 },
              { date: "2017-01-30", count: 2 },
              { date: "2017-01-31", count: 3 },
              { date: "2017-03-01", count: 2 },
              { date: "2017-04-02", count: 4 },
              { date: "2017-03-05", count: 2 },
              { date: "2017-02-30", count: 4 }
            ]}
            endDate={new Date("2017-04-01")}
            numDays={105}
            width={320}
            height={220}
            chartConfig={chartConfig}
          />
        </ContainerWidget> */}
      </ContainerScreen>
    </ScrollView>
  );
}