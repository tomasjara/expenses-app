import { Animated, Modal, Pressable, StyleSheet } from 'react-native';
import { Text, View } from 'react-native';
import { ContainerScreen } from './../../components/ContainerScreen'
import { AllExpenses } from './../../components/AllExpenses'
import { useEffect, useRef, useState } from 'react';
import { useExpensesStore } from '@/store/expensesStore'
import { ExpensesSmallCard } from '@/components/ExpensesSmallCard'
import { TotalExpenseValue } from '@/components/TotalExpenseValue'
import { UpdateCreateExpenseModal } from './../../components/UpdateCreateExpenseModal';
import Ionicons from '@expo/vector-icons/Ionicons';
import { formatFirstLetterString } from '@/utils/formatFirstLetterString';
import RBSheet from 'react-native-raw-bottom-sheet';
import dayjs from 'dayjs';
import { MONTHS, MONTHS_MAYUS } from '@/utils/constantes';
import { DetailExpense } from '@/components/DetailExpense';
import { FontAwesome } from '@expo/vector-icons';
import ButtonBase from '@/components/ButtonBase';

function ButtonAddExpense({ }) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(0.95)).current;

  const handlePressIn = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 0.93,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0.8,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handlePressOut = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handlePress = () => {
    refRBSheet.current?.open();
    setModalUpdateCreateExpense({
      type: 'create',
    });
  };

  const refRBSheet = useRef();
  const { setModalUpdateCreateExpense, expenses } = useExpensesStore(state => state)

  return (
    <View style={{ flex: 1 }}>
        <RBSheet
        ref={refRBSheet}
        draggable
        useNativeDriver={false}
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
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={handlePress}
        style={styles.wrapper}
      >
        <Animated.View style={[styles.button, {
          transform: [{ scale: scaleAnim }],
          opacity: opacityAnim,
        }]}>
          <Ionicons name="add-circle-sharp" size={45} color="black" />
        </Animated.View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 100,
    right: 15,
  },
  button: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 20,
    borderColor: 'black',
    borderWidth: 1,
    shadowRadius: 10,
    elevation: 5,
  },
});

export default function HomeScreen() {
  const initialValuesPeriod = { month: { id: dayjs().get('M'), name: formatFirstLetterString(MONTHS[dayjs().get('M')]) }, year: dayjs().get('y') }
  const [dateValue, setDateValue] = useState(initialValuesPeriod)
  const { expensesWithRelations } = useExpensesStore(state => state)
  const [modalAllExpensesVisible, setModalAllExpensesVisible] = useState(false)
  const [expensesPeriodSelected, setExpensesPeriodSelected] = useState()
  const [detailExpenseVisible, setDetailExpenseVisible] = useState(false)
  const [expenseSelect, setExpenseSelect] = useState()

  useEffect(() => {
    const expensesPeriod = expensesWithRelations.filter((expense) => dayjs(expense.paymentDate).month() === dateValue.month.id && dayjs(expense.paymentDate).year() === dateValue.year)
    setExpensesPeriodSelected(expensesPeriod)
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
    </>
  );
}