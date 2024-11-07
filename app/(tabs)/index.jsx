import { Pressable } from 'react-native';
import { Button, ScrollView, Text, View } from 'react-native';
import { ContainerWidget } from './../../components/ContainerWidget'
import { ContainerScreen } from './../../components/ContainerScreen'
import { AllExpenses } from './../../components/AllExpenses'
import { useEffect, useRef, useState } from 'react';
import { useExpensesStore } from '@/store/expensesStore'
import { ExpensesSmallCard } from '@/components/ExpensesSmallCard'
import { TotalExpenseValue } from '@/components/TotalExpenseValue'
import { UpdateCreateExpenseModal } from './../../components/UpdateCreateExpenseModal';
import Toast from 'react-native-toast-message';
import Ionicons from '@expo/vector-icons/Ionicons';
import { formatFirstLetterString } from '@/utils/formatFirstLetterString';
import RBSheet from 'react-native-raw-bottom-sheet';
import { GatosTabla } from '@/components/graphics/GatosTabla';
import dayjs from 'dayjs';
import { MONTHS, MONTHS_LIST, MONTHS_MAYUS } from '@/utils/constantes';
import YearAndMonthSelect from '@/components/YearAndMonthSelect';

function ButtonAddExpense({ }) {
  const refRBSheet = useRef();
  const { setModalUpdateCreateExpense, expensesWithRelations } = useExpensesStore(state => state)

  return (
    <View style={{ flex: 1 }}>
      <RBSheet
        ref={refRBSheet}
        draggable
        height={600}
        customModalProps={{
          animationType: 'fade',
          statusBarTranslucent: true,
        }}
        customStyles={{
          container: {
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          },
          draggableIcon: {
            width: 80,
          },
        }}>
        <UpdateCreateExpenseModal refRBSheet={refRBSheet} />
      </RBSheet>
      <Pressable
        onPress={() => {
          refRBSheet.current.open()
          setModalUpdateCreateExpense({
            // show: true, 
            type: 'create'
          })
        }}
        style={{ backgroundColor: 'white', opacity: 0.95, position: 'absolute', padding: 10, bottom: 20, right: 15, borderRadius: 20, shadowRadius: 10, elevation: 5, borderColor: 'black', borderWidth: 1 }}>
        <Ionicons name="add-circle-sharp" size={45} color="black" />
      </Pressable>
    </View>
  );
}

export default function HomeScreen() {
  const initialValuesPeriod = { month: { id: dayjs().get('M'), name: formatFirstLetterString(MONTHS[dayjs().get('M')]) }, year: dayjs().get('y') }
  const [dateValue, setDateValue] = useState(initialValuesPeriod)
  const { expensesWithRelations } = useExpensesStore(state => state)
  const [modalAllExpensesVisible, setModalAllExpensesVisible] = useState(false)
  const [expensesPeriodSelected, setExpensesPeriodSelected] = useState()
  const [totalCountExpensesPeriodSelected, setTotalCountExpensesPeriodSelected] = useState(0)
  const [expensesMonthWithYear, setExpensesMonthWithYear] = useState([])

  useEffect(() => {
    const expensesFilterYear = expensesWithRelations.filter((expense) => dayjs(expense.paymentDate).year() === dateValue.year)
    const expensesPeriod = expensesWithRelations.filter((expense) => dayjs(expense.paymentDate).month() === dateValue.month.id && dayjs(expense.paymentDate).year() === dateValue.year)
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
    setExpensesPeriodSelected(expensesPeriod)
    setTotalCountExpensesPeriodSelected(expensesPeriod.length)
  }, [dateValue, expensesWithRelations])

  return (
    <>
      <ScrollView>
        <ContainerScreen>
          <AllExpenses modalAllExpensesVisible={modalAllExpensesVisible} setModalAllExpensesVisible={setModalAllExpensesVisible} />
          <ContainerWidget >
            <YearAndMonthSelect dateValue={dateValue} expensesMonthWithYear={expensesMonthWithYear} setDateValue={setDateValue} />
          </ContainerWidget>
          <ContainerWidget >
            <TotalExpenseValue expensesPeriodSelected={expensesPeriodSelected} dateValue={dateValue} />
            <Text style={{ fontSize: 12, opacity: 0.5 }}>Gastos registrados: {totalCountExpensesPeriodSelected}</Text>
          </ContainerWidget>
          <ContainerWidget>
            <Text style={{ fontSize: 17, marginBottom: 10, opacity: 0.6 }}>Ultimos gastos</Text>
            <View>
              {expensesPeriodSelected && expensesPeriodSelected.sort((a, b) => dayjs(b.paymentDate) - dayjs(a.paymentDate)).slice(0, 3).map((expense) => {
                return (
                  <ExpensesSmallCard key={expense.id} expense={expense} />
                )
              })}
            </View>
            <View style={{ gap: 10 }}>
              <Pressable style={{ backgroundColor: 'black', padding: 10, borderRadius: 10, }} onPress={() => { setModalAllExpensesVisible(true) }}>
                <Text style={{ color: 'white', textAlign: 'center', fontWeight: '700', fontSize: 17 }}>Lista de todos los gastos</Text>
              </Pressable>
              <GatosTabla />
            </View>
          </ContainerWidget>
        </ContainerScreen>
      </ScrollView >
      <ButtonAddExpense />
      <Toast />
    </>
  );
}