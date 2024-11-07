import { Text, Modal, Button, View, ScrollView, Pressable } from 'react-native'
import { useExpensesStore } from '@/store/expensesStore'
import { useState } from 'react'
import { DetailExpense } from '@/components/DetailExpense'
import { ExpensesSmallCard } from './ExpensesSmallCard'
import { AntDesign } from '@expo/vector-icons'

export const AllExpenses = ({ modalAllExpensesVisible, setModalAllExpensesVisible }) => {
    const [detailExpenseVisible, setDetailExpenseVisible] = useState(false)
    const [expenseSelect, setExpenseSelect] = useState()
    const { expensesWithRelations } = useExpensesStore(state => state)

    return (
        <Modal
            animationType="fade"
            transparent={false}
            visible={modalAllExpensesVisible}
            onRequestClose={() => {
                setModalAllExpensesVisible((state) => !state);
            }}>
            <Modal
                animationType="fade"
                transparent={false}
                visible={detailExpenseVisible}
                onRequestClose={() => {
                    setDetailExpenseVisible(false);
                }}>
                <View style={{}}>
                    {expenseSelect && <DetailExpense expenseSelect={expenseSelect} setDetailExpenseVisible={setDetailExpenseVisible} />}
                </View>
            </Modal>
            <ScrollView >
                <View style={{ padding: 30, gap: 20 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20 }}>
                        <Text style={{ fontSize: 20, color: 'black', fontWeight: 'bold' }}>Todos los gastos</Text>
                        <Pressable onPress={() => setModalAllExpensesVisible(false)}>
                            <AntDesign name="close" size={24} color="black" />
                        </Pressable>
                    </View>
                    <View>
                        {expensesWithRelations && expensesWithRelations.map(expense => (
                            <ExpensesSmallCard key={expense.id} expense={expense} onPress={() => {
                                setExpenseSelect(expense)
                                setDetailExpenseVisible(true)
                            }} />
                        ))}
                    </View>
                    <Button title='Cerrar' onPress={() => setModalAllExpensesVisible(false)} />
                </View>
            </ScrollView>
        </Modal>
    )
}