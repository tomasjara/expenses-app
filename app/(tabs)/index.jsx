import { Pressable } from 'react-native';
import { Button, ScrollView, Text, View } from 'react-native';
import { ContainerWidget } from './../../components/ContainerWidget'
import { ContainerScreen } from './../../components/ContainerScreen'
import { AllExpenses } from './../../components/AllExpenses'
import { useState } from 'react';
import { useExpensesStore } from '@/store/expensesStore'
import { ExpensesSmallCard } from '@/components/ExpensesSmallCard'
import { TotalExpenseValue } from '@/components/TotalExpenseValue'
import Toast from 'react-native-toast-message';
import { UpdateCreateExpenseModal } from '@/components/UpdateCreateExpenseModal';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function HomeScreen() {
  const setModalUpdateCreateExpense = useExpensesStore(state => state.setModalUpdateCreateExpense)
  const [modalAllExpensesVisible, setModalAllExpensesVisible] = useState(false)
  const expenses = useExpensesStore(state => state.expenses)

  return (
    <>
      <ScrollView>
        <ContainerScreen>
          <AllExpenses modalAllExpensesVisible={modalAllExpensesVisible} setModalAllExpensesVisible={setModalAllExpensesVisible} />

          <ContainerWidget backgroundColor={'white'}>
            <TotalExpenseValue />
          </ContainerWidget>

          <ContainerWidget backgroundColor={'white'}>
            <Text style={{ fontSize: 20, marginBottom: 10 }}>Ultimos gastos</Text>
            {expenses && expenses.map(expense => (
              <ExpensesSmallCard key={expense.id} expense={expense} />
            ))}
            <View style={{ gap: 10 }}>
              <Button
                title='Ver todos los gastos'
                onPress={() => {
                  setModalAllExpensesVisible(true)
                }}
              />
              {/* <Button title='Añadir nuevo gasto' onPress={() => setModalUpdateCreateExpense({ show: true, type: 'create' })} /> */}
            </View>
          </ContainerWidget>
        </ContainerScreen>
      </ScrollView >
      <Pressable onPress={() => setModalUpdateCreateExpense({ show: true, type: 'create' })} style={{ backgroundColor: 'white', opacity: 0.95, position: 'absolute', padding: 10, bottom: 20, right: 20, borderRadius: 20, shadowRadius: 10, elevation: 4 }}>
        {/* <View style={{ backgroundColor: 'white', borderRadius: 15, width: 45, height: 45, justifyContent: 'center', alignItems: 'center' }}> */}
        <Ionicons name="add-circle-sharp" size={45} color="black" />
        {/* </View> */}
      </Pressable>
      <UpdateCreateExpenseModal />
      <Toast />
    </>
  );
}