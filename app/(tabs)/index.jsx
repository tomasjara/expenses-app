import { Button, ScrollView, Text, View } from 'react-native';
import { ContainerWidget } from './../../components/ContainerWidget'
import { ContainerScreen } from './../../components/ContainerScreen'
import { NewExpenseForm } from './../../components/NewExpenseForm'
import { AllExpenses } from './../../components/AllExpenses'
import { useState } from 'react';
import { useExpensesStore } from '@/store/expensesStore'
import { ExpensesSmallCard } from '@/components/ExpensesSmallCard'
import { TotalExpenseValue } from '@/components/TotalExpenseValue'
import Toast from 'react-native-toast-message';

export default function HomeScreen() {

  const [modalFormVisible, setModalFormVisible] = useState(false)
  const [modalAllExpensesVisible, setModalAllExpensesVisible] = useState(false)
  const expenses = useExpensesStore(state => state.expenses)

  return (
    <>
      <ScrollView>
        <ContainerScreen>
          <NewExpenseForm modalFormVisible={modalFormVisible} setModalFormVisible={setModalFormVisible} />
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
                  setModalAllExpensesVisible(state => !state)
                }}
              />
              <Button title='Añadir nuevo gasto' onPress={() => setModalFormVisible(state => !state)} />
            </View>
          </ContainerWidget>

        </ContainerScreen>
      </ScrollView >
      <Toast />
    </>
  );
}