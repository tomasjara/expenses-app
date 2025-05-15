import { Modal, Pressable } from 'react-native';
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
import dayjs from 'dayjs';
import { MONTHS, MONTHS_MAYUS } from '@/utils/constantes';
import YearAndMonthSelect from '@/components/YearAndMonthSelect';
import { DetailExpense } from '@/components/DetailExpense';
import { FontAwesome } from '@expo/vector-icons';

function ButtonAddExpense({ }) {
  const refRBSheet = useRef();
  const { setModalUpdateCreateExpense, expenses } = useExpensesStore(state => state)

  return (
    <View style={{ flex: 1 }}>
      <RBSheet
        ref={refRBSheet}
        draggable
        height={600}
        customModalProps={{
          statusBarTranslucent: false,
        }}
        closeOnPressBack
        customAvoidingViewProps={{
          enabled: true,
        }}
        customStyles={{
          container: {
            backgroundColor: 'white',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          },
          draggableIcon: {
            width: 50,
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
  const { expensesWithRelations, expenses, categories, paymentMethods } = useExpensesStore(state => state)
  const [modalAllExpensesVisible, setModalAllExpensesVisible] = useState(false)
  const [expensesPeriodSelected, setExpensesPeriodSelected] = useState()
  const [totalCountExpensesPeriodSelected, setTotalCountExpensesPeriodSelected] = useState(0)
  const [expensesMonthWithYear, setExpensesMonthWithYear] = useState([])
  const [detailExpenseVisible, setDetailExpenseVisible] = useState(false)
  const [expenseSelect, setExpenseSelect] = useState()

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
      <Modal
        animationType="fade"
        transparent={false}
        visible={detailExpenseVisible}
        onRequestClose={() => {
          setDetailExpenseVisible(false);
        }}>
        <View>
          {expenseSelect && <DetailExpense key={expenseSelect.id} expenseSelect={expenseSelect} setDetailExpenseVisible={setDetailExpenseVisible} />}
        </View>
      </Modal>
      <View style={{ height: '100%', backgroundColor: 'black' }}>
        <ContainerScreen>
          <AllExpenses modalAllExpensesVisible={modalAllExpensesVisible} setModalAllExpensesVisible={setModalAllExpensesVisible} />
          <TotalExpenseValue expensesPeriodSelected={expensesPeriodSelected} dateValue={dateValue} />
          <View style={{
            gap: 10,
            padding: 15,
          }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <Text style={{ padding: 10, fontSize: 13, marginBottom: 3, color: 'white', textAlign: 'center', opacity: 0.5 }}>Ultimos gastos</Text>
              <Pressable style={{ padding: 10, borderRadius: 10, }} onPress={() => {
                setModalAllExpensesVisible(true)
              }}><Text style={{ fontSize: 13, marginBottom: 3, color: 'white', textAlign: 'center', opacity: 0.5 }}>Ver mas <FontAwesome name="angle-right" size={14} color="white" /></Text></Pressable>
            </View>
            <View >
              {expensesPeriodSelected && expensesPeriodSelected.length > 0 ? expensesPeriodSelected.sort((a, b) => dayjs(b.paymentDate) - dayjs(a.paymentDate)).slice(0, 4).map((expense) => {
                return (
                  <ExpensesSmallCard key={expense.id} minimalStyle={true} expense={expense} onPress={() => {
                    setExpenseSelect(expense)
                    setDetailExpenseVisible(true)
                  }} />
                )
              })
                : <Text style={{ color: 'white', textAlign: 'center' }}>No has registrado ningún gasto este mes</Text>
              }
            </View>
          </View>
        </ContainerScreen>
      </View>
      <ButtonAddExpense />
      <Toast />
    </>
  );
}