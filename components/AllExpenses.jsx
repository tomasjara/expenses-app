import { Text, Modal, Button, View, ScrollView, Pressable } from 'react-native'
import { useExpensesStore } from '@/store/expensesStore'
import { ExpensesSmallCard } from './ExpensesSmallCard'
import { AntDesign } from '@expo/vector-icons'

export const AllExpenses = ({ modalAllExpensesVisible, setModalAllExpensesVisible }) => {
    const { expensesWithRelations } = useExpensesStore(state => state)

    return (
        <Modal
            animationType="fade"
            transparent={false}
            visible={modalAllExpensesVisible}
            onRequestClose={() => {
                setModalAllExpensesVisible((state) => !state);
            }}
        >
            <View style={{ height: '100%', backgroundColor: 'black' }}>
                <View style={{ flexDirection: 'row', gap: 19, padding: 20, justifyContent: 'start', alignItems: 'center', }}>
                    <Pressable onPress={() => setModalAllExpensesVisible(false)}>
                        <AntDesign name="leftcircleo" size={30} color="white" />
                    </Pressable>
                    <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold' }}>Todos los gastos</Text>
                </View>
                <ScrollView >
                    <View style={{ flex: 1, padding: 30, gap: 20 }}>
                        {expensesWithRelations && expensesWithRelations.map(expense => (
                            <ExpensesSmallCard key={expense.id} expense={expense} />
                        ))}
                    </View>
                </ScrollView>
            </View>
        </Modal>
    )
}