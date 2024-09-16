import { Pressable } from 'react-native';
import { Button, ScrollView, Text, View } from 'react-native';
import { ContainerWidget } from './../../components/ContainerWidget'
import { ContainerScreen } from './../../components/ContainerScreen'
import { AllExpenses } from './../../components/AllExpenses'
import { useEffect, useState } from 'react';
import { useExpensesStore } from '@/store/expensesStore'
import { ExpensesSmallCard } from '@/components/ExpensesSmallCard'
import { TotalExpenseValue } from '@/components/TotalExpenseValue'
import Toast from 'react-native-toast-message';
import { UpdateCreateExpenseModal } from '@/components/UpdateCreateExpenseModal';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function HomeScreen() {
  const { setModalUpdateCreateExpense, cleanExpensesState, expensesWithRelations } = useExpensesStore(state => state)
  const [modalAllExpensesVisible, setModalAllExpensesVisible] = useState(false)

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
            {expensesWithRelations && expensesWithRelations.slice(0, 3).map((expense) => {
              return (
                <ExpensesSmallCard key={expense.id} expense={expense} />
              )
            })}
            <View style={{ gap: 10 }}>
              <Button
                title='Ver todos los gastos'
                onPress={() => {
                  setModalAllExpensesVisible(true)
                }}
              />
            </View>
          </ContainerWidget>
        </ContainerScreen>
      </ScrollView >
      <Pressable onPress={() => setModalUpdateCreateExpense({ show: true, type: 'create' })} style={{ backgroundColor: 'white', opacity: 0.95, position: 'absolute', padding: 10, bottom: 20, right: 20, borderRadius: 20, shadowRadius: 10, elevation: 4 }}>
        <Ionicons name="add-circle-sharp" size={45} color="black" />
      </Pressable>
      <UpdateCreateExpenseModal />
      <Toast />
    </>
  );
}