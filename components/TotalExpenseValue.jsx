import { Text } from 'react-native'
import React from 'react'
import { useExpensesStore } from '@/store/expensesStore'
import { formatMoney } from '@/utils/formatMoney'

export const TotalExpenseValue = () => {

    const expenses = useExpensesStore(state => state.expenses)
    const totalValue = expenses ? expenses.reduce((total, expense) => total + parseFloat(expense.value), 0) : 0

    return (
        <>
            <Text style={{ fontSize: 12, marginBottom: 3, opacity: 0.5 }}>Total de gastos</Text>
            <Text style={{ fontSize: 30 }}>{formatMoney(totalValue)}</Text>
        </>
    )
}