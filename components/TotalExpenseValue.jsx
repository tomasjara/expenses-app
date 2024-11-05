import { Text } from 'react-native'
import React from 'react'
import { formatMoney } from '@/utils/formatMoney'

export const TotalExpenseValue = ({ dateValue, expensesPeriodSelected }) => {
    const totalValue = expensesPeriodSelected ? expensesPeriodSelected.reduce((total, expense) => {
        return total + parseFloat(expense.value)
    }, 0) : 0

    return (
        <>
            <Text style={{ fontSize: 12, marginBottom: 3, opacity: 0.5 }}>Total de gastos</Text>
            <Text style={{ fontSize: 30 }}>{formatMoney(totalValue)}</Text>
        </>
    )
}