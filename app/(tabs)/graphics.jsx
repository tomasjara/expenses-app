import { ScrollView, Text } from 'react-native';
import { ContainerScreen } from '@/components/ContainerScreen';
import { useExpensesStore } from '@/store/expensesStore';
import { GastosPorOpcion } from '@/components/graphics/GastosPorOpcion';
import { ExpenseDistributionChart } from '@/components/graphics/ExpenseDistributionChart';
import { formatExpensesForCalc } from '@/utils/expenses';
import { useEffect, useState } from 'react';
import { MONTHS } from '@/utils/constantes';
import dayjs from 'dayjs';
import { formatFirstLetterString } from '@/utils/formatFirstLetterString';
import YearAndMonthSelect from '@/components/YearAndMonthSelect';

export default function GraphicsScreen() {
  const { expensesWithRelations, categories, paymentMethods } = useExpensesStore(state => state)
  const [dateValue, setDateValue] = useState({ month: { id: dayjs().get('M'), name: formatFirstLetterString(MONTHS[dayjs().get('M')]) }, year: dayjs().get('y') })
  const [expensesFilterMonthAndYear, setExpensesFilterMonthAndYear] = useState([])

  useEffect(() => {
    const expensesFilterMonthAndYearResult = expensesWithRelations.filter((expense) => {
      const paymentDate = dayjs(expense.paymentDate);
      return paymentDate.month() === dateValue.month.id && paymentDate.year() === dateValue.year;
    })
    setExpensesFilterMonthAndYear(dateValue.month.id === '' ? expensesWithRelations : expensesFilterMonthAndYearResult)
  }, [dateValue, expensesWithRelations])

  useEffect(() => {
    console.log();
    console.log('----------- dateValue -----------');
    console.log(dateValue);
    console.log();
  }, [dateValue, expensesWithRelations])

  useEffect(() => {
    console.log();
    console.log('----------- expensesFilterMonthAndYear -----------');
    console.log(expensesFilterMonthAndYear);
    console.log();
  }, [expensesFilterMonthAndYear])

  return (
    <ScrollView>
      <ContainerScreen>
        <Text style={{ color: 'white', fontSize: 30, textAlign: 'center' }}>Información</Text>
        <YearAndMonthSelect dateValue={dateValue} expensesMonthWithYear={[]} setDateValue={setDateValue} />
        <ExpenseDistributionChart expenses={formatExpensesForCalc(expensesFilterMonthAndYear)} />
        <GastosPorOpcion categories={categories} expensesWithRelations={expensesFilterMonthAndYear} paymentMethods={paymentMethods} />
      </ContainerScreen>
    </ScrollView>
  );
}