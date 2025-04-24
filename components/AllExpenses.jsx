import { Text, Modal, Button, View, ScrollView, Pressable } from 'react-native'
import { useExpensesStore } from '@/store/expensesStore'
import { ExpensesSmallCard } from './ExpensesSmallCard'
import { AntDesign } from '@expo/vector-icons'
import { useEffect, useState } from 'react'
import dayjs from 'dayjs'

export const AllExpenses = ({ modalAllExpensesVisible, setModalAllExpensesVisible }) => {
    const { expensesWithRelations } = useExpensesStore(state => state)
    const [sortedExpenses, setSortedExpenses] = useState([])

    useEffect(() => {
        const sortedExpensesResult = expensesWithRelations
        ? expensesWithRelations
            .sort((a, b) => dayjs(b.paymentDate).diff(dayjs(a.paymentDate)))
        : [];
        setSortedExpenses(sortedExpensesResult);
    }, [expensesWithRelations])
    

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
                        {sortedExpenses && sortedExpenses.map(expense => (
                            <ExpensesSmallCard key={expense.id} expense={expense} />
                        ))}
                    </View>
                </ScrollView>
            </View>
        </Modal>
    )
}