import { Text } from 'react-native'
import React from 'react'
import { useExpensesStore } from '@/store/expensesStore'
import { formatMoney } from '@/utils/formatMoney'
import dayjs from 'dayjs'

export const TotalExpenseValue = ({dateValue}) => {
    const expenses = useExpensesStore(state => state.expenses)

    const totalValue = expenses ? expenses.reduce((total, expense) => {
        if (dayjs(expense.paymentDate).month() === dateValue.month.id) {
            return total + parseFloat(expense.value)
        }
        return total
    }, 0) : 0

    return (
        <>
            <Text style={{ fontSize: 12, marginBottom: 3, opacity: 0.5 }}>Total de gastos en {dateValue.month.name}</Text>
            <Text style={{ fontSize: 30 }}>{formatMoney(totalValue)}</Text>
        </>
    )
}