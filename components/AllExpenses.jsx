import { Text, Modal, Button, View, ScrollView } from 'react-native'
import { useExpensesStore } from '@/store/expensesStore'
import { useState } from 'react'
import { DetailExpense } from '@/components/DetailExpense'
import { ExpensesSmallCard } from './ExpensesSmallCard'

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
                    {expenseSelect && <DetailExpense expense={expenseSelect} setDetailExpenseVisible={setDetailExpenseVisible} />}
                </View>
            </Modal>
            <ScrollView >
                <View style={{ padding: 30, gap: 10 }}>
                    <Text style={{ fontSize: 20, marginBottom: 20 }}>Todos los gastos</Text>
                    {expensesWithRelations && expensesWithRelations.map(expense => (
                        <ExpensesSmallCard key={expense.id} expense={expense} onPress={() => {
                            setExpenseSelect(expense)
                            setDetailExpenseVisible(true)
                        }} />
                    ))}
                    <Button title='Cerrar' onPress={() => setModalAllExpensesVisible(false)} />
                </View>
            </ScrollView>
        </Modal>
    )
}