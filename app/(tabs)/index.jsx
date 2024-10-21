import { Pressable } from 'react-native';
import { Button, ScrollView, Text, View } from 'react-native';
import { ContainerWidget } from './../../components/ContainerWidget'
import { ContainerScreen } from './../../components/ContainerScreen'
import { AllExpenses } from './../../components/AllExpenses'
import { useRef, useState } from 'react';
import { useExpensesStore } from '@/store/expensesStore'
import { ExpensesSmallCard } from '@/components/ExpensesSmallCard'
import { TotalExpenseValue } from '@/components/TotalExpenseValue'
import { UpdateCreateExpenseModal } from './../../components/UpdateCreateExpenseModal';
import Toast from 'react-native-toast-message';
import Ionicons from '@expo/vector-icons/Ionicons';

import RBSheet from 'react-native-raw-bottom-sheet';
import { GatosTabla } from '@/components/graphics/GatosTabla';

function Example({ }) {
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
        style={{ backgroundColor: 'white', opacity: 0.95, position: 'absolute', padding: 10, bottom: 20, right: 20, borderRadius: 20, shadowRadius: 10, elevation: 4 }}>
        <Ionicons name="add-circle-sharp" size={45} color="black" />
      </Pressable>
    </View>
  );
}

export default function HomeScreen() {
  const { setModalUpdateCreateExpense, expensesWithRelations } = useExpensesStore(state => state)
  const [modalAllExpensesVisible, setModalAllExpensesVisible] = useState(false)

  return (
    <>
      <ScrollView>
        <ContainerScreen>
          <AllExpenses modalAllExpensesVisible={modalAllExpensesVisible} setModalAllExpensesVisible={setModalAllExpensesVisible} />
          <ContainerWidget >
            <TotalExpenseValue />
          </ContainerWidget>
          <ContainerWidget>
            <Text style={{ fontSize: 17, marginBottom: 10, opacity: 0.6 }}>Ultimos gastos</Text>
            {expensesWithRelations && expensesWithRelations.slice(0, 3).map((expense) => {
              return (
                <ExpensesSmallCard key={expense.id} expense={expense} />
              )
            })}
            <View style={{ gap: 10 }}>
              <Pressable style={{ backgroundColor: 'black', padding: 10, borderRadius: 10, }} onPress={() => { setModalAllExpensesVisible(true) }}>
                <Text style={{ color: 'white', textAlign: 'center', fontWeight: '700', fontSize: 17 }}>Lista de todos los gastos</Text>
              </Pressable>
              <GatosTabla />
            </View>
          </ContainerWidget>
        </ContainerScreen>
      </ScrollView >
      <Example />
      <Toast />
    </>
  );
}