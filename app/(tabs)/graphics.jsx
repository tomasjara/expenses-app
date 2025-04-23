import { Dimensions, ScrollView, Text, View } from 'react-native';
import { ContainerScreen } from '@/components/ContainerScreen';
import { ContainerWidget } from '@/components/ContainerWidget';
import {
  PieChart,
  ContributionGraph,
} from "react-native-chart-kit";
import { useExpensesStore } from '@/store/expensesStore';
import dayjs from 'dayjs';
import { GastosPorOpcion } from '@/components/graphics/GastosPorOpcion';
import YearAndMonthSelect from '@/components/YearAndMonthSelect';
import { useEffect, useState } from 'react';
import { formatFirstLetterString } from '@/utils/formatFirstLetterString';
import { MONTHS, MONTHS_MAYUS } from '@/utils/constantes';
import { ExpenseDistributionChart } from '@/components/graphics/ExpenseDistributionChart';
import { formatExpensesForCalc } from '@/utils/expenses';

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
  const initialValuesPeriod = { month: { id: dayjs().get('M'), name: formatFirstLetterString(MONTHS[dayjs().get('M')]) }, year: dayjs().get('y') }
  const { expensesWithRelations } = useExpensesStore(state => state)
  const [dateValue, setDateValue] = useState(initialValuesPeriod)
  const [expensesMonthWithYear, setExpensesMonthWithYear] = useState([])

  useEffect(() => {
    const expensesFilterYear = expensesWithRelations.filter((expense) => dayjs(expense.paymentDate).year() === dateValue.year)
    const expensesMonthWithYearTransformed = expensesFilterYear ? expensesFilterYear.reduce((total, expense) => {
      const currentMonth = MONTHS_MAYUS[dayjs(expense.paymentDate).month()]
      const ifMesExistente = total.find(item => item[currentMonth])
      if (ifMesExistente) {
        ifMesExistente[currentMonth] += 1;
      } else {
        total.push({ [MONTHS_MAYUS[dayjs(expense.paymentDate).month()]]: 1 })
      }
      return total
    }, []) : []
    setExpensesMonthWithYear(expensesMonthWithYearTransformed)
  }, [dateValue, expensesWithRelations])

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
        <Text style={{ color: 'white', fontSize: 30, textAlign: 'center' }}>Información</Text>
        {/* <ContainerWidget>
          <TitleSections title={'Periodo de tiempo seleccionado'} />
          <YearAndMonthSelect dateValue={dateValue} expensesMonthWithYear={expensesMonthWithYear} setDateValue={setDateValue} />
        </ContainerWidget> */}
        <ContainerWidget>
          <ExpenseDistributionChart expenses={formatExpensesForCalc(expensesWithRelations)} />
        </ContainerWidget>
        <GastosPorOpcion />
        {/* <ContainerWidget>
          <TitleSections title={'Todos los gastos durante el tiempo'} />
          <View style={{ alignItems: 'center' }}>
            <ContributionGraph
              values={expensesContributionChart || []}
              endDate={dayjs()}
              numDays={93}
              width={screenWidth - 60}
              height={200}
              squareSize={19}
              style={{ borderRadius: 10 }}
              chartConfig={{
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              }}
            />
          </View>

        </ContainerWidget> */}

        {/* {expensesPieChart.length != 0 && <ContainerWidget customStyle={{ alignItems: 'center' }}>
          <TitleSections title={'Todos los gastos por categorías'} />
          <ScrollView horizontal>
            <PieChart
              data={expensesPieChart}
              width={350}
              height={220}
              chartConfig={chartConfig}
              accessor={"value"}
              backgroundColor={"transparent"}
              center={[0, 0]}
            />
          </ScrollView>
        </ContainerWidget>} */}

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