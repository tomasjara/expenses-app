import { Text, Modal, Button, View, ScrollView } from 'react-native'
import { useExpensesStore } from '@/store/expensesStore'
import { useState } from 'react'
import { DetailExpense } from '@/components/DetailExpense'
import { ExpensesSmallCard } from './ExpensesSmallCard'

export const AllExpenses = ({ modalAllExpensesVisible, setModalAllExpensesVisible }) => {
    const [detailExpenseVisible, setDetailExpenseVisible] = useState(false)
    const [expenseSelect, setExpenseSelect] = useState()
    const expenses = useExpensesStore(state => state.expenses)

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
                    {expenseSelect && <DetailExpense expense={expenseSelect} setDetailExpenseVisible={setDetailExpenseVisible}  />}
                </View>
            </Modal>
            <ScrollView style={{ padding: 30 }}>
                <Text style={{ fontSize: 20, marginBottom: 20 }}>Todos los gastos</Text>
                {expenses && expenses.map(expense => (
                    <ExpensesSmallCard key={expense.id} expense={expense} onPress={() => {
                        setExpenseSelect(expense)
                        setDetailExpenseVisible(true)
                    }} />
                ))}
                <Button title='Cerrar' onPress={() => setModalAllExpensesVisible(false)} />
            </ScrollView>
        </Modal>
    )
}