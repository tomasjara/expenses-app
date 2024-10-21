import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
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
import dayjs from 'dayjs';
import GastosPorMesBarChart from './../../components/graphics/GastosPorMesBarChart';
import { GatosTabla } from './../../components/graphics/GatosTabla';

const screenWidth = Dimensions.get("window").width;

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

const TitleSections = ({ title }) => {
  return (
    <Text style={{ color: 'black', fontSize: 15, alignSelf: 'flex-start', opacity: 0.6, fontWeight: 'bold' }}>{title}</Text>
  )
}

export default function GraphicsScreen() {
  const { expensesWithRelations } = useExpensesStore(state => state)

  const expensesPieChart = expensesWithRelations.reduce((acc, expense) => {
    const categoryName = expense.category.name;
    const value = parseFloat(expense.value);
    const existingCategory = acc.find(item => item.name === categoryName);
    if (existingCategory) {
      existingCategory.value += value;
    } else {
      acc.push({
        name: categoryName, value, color: expense.category.color,
        legendFontColor: expense.category.color,
        legendFontSize: 15
      });
    }
    return acc;
  }, [])

  const expensesContributionChart = expensesWithRelations.reduce((acc, expense) => {
    const paymentDate = dayjs(expense.paymentDate).format('YYYY-MM-DD');
    const existingCategory = acc.find(item => item.date === paymentDate);
    if (existingCategory) {
      existingCategory.count += 1;
    } else {
      acc.push({
        date: paymentDate,
        count: 1,
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
          <TitleSections title={'Gastos por categorías'} />
          <PieChart
            data={expensesPieChart}
            width={340}
            height={220}
            chartConfig={chartConfig}
            accessor={"value"}
            backgroundColor={"transparent"}
            center={[12, 0]}
          />
        </ContainerWidget>}

        <ContainerWidget>
          <TitleSections title={'Gastos durante el tiempo'} />
          <View style={{ alignItems: 'center' }}>
            <ContributionGraph
              values={expensesContributionChart || []}
              endDate={dayjs()}
              numDays={93}
              width={screenWidth - 60}
              height={200}
              squareSize={17}
              style={{ borderRadius: 10 }}
              chartConfig={{
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              }}
            />
          </View>

        </ContainerWidget>

        {/* <ContainerWidget>
          <TitleSections title={'Gastos en los meses de 2024'} />
          <GastosPorMesBarChart />
        </ContainerWidget> */}

        {/* <ContainerWidget>
          <TitleSections title={'Gastos en los meses de 2024'} />
          <GatosTabla />
        </ContainerWidget> */}
      </ContainerScreen>
    </ScrollView>
  );
}