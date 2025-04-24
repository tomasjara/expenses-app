import { ScrollView, Text } from 'react-native';
import { ContainerScreen } from '@/components/ContainerScreen';
import { useExpensesStore } from '@/store/expensesStore';
import { GastosPorOpcion } from '@/components/graphics/GastosPorOpcion';
import { ExpenseDistributionChart } from '@/components/graphics/ExpenseDistributionChart';
import { formatExpensesForCalc } from '@/utils/expenses';
import { useEffect, useState } from 'react';
import { MONTHS, MONTHS_MAYUS } from '@/utils/constantes';
import dayjs from 'dayjs';
import { formatFirstLetterString } from '@/utils/formatFirstLetterString';
import YearAndMonthSelect from '@/components/YearAndMonthSelect';

export default function GraphicsScreen() {
  const { expensesWithRelations, categories, paymentMethods } = useExpensesStore(state => state)
  const [dateValue, setDateValue] = useState({ month: { id: dayjs().get('M'), name: formatFirstLetterString(MONTHS[dayjs().get('M')]) }, year: dayjs().get('y') })
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
  }, [])


  return (
    <ScrollView>
      <ContainerScreen>
        {/* <YearAndMonthSelect dateValue={dateValue} expensesMonthWithYear={expensesMonthWithYear} setDateValue={setDateValue} /> */}
        <Text style={{ color: 'white', fontSize: 30, textAlign: 'center' }}>Información</Text>
        <ExpenseDistributionChart expenses={formatExpensesForCalc(expensesWithRelations)} />
        <GastosPorOpcion categories={categories} expensesWithRelations={expensesWithRelations} paymentMethods={paymentMethods} />
      </ContainerScreen>
    </ScrollView>
  );
}