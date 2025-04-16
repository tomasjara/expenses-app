import { Text, View } from 'react-native'
import React from 'react'
import { formatMoney } from '@/utils/formatMoney'

export const TotalExpenseValue = ({ dateValue, expensesPeriodSelected }) => {
    const totalValue = expensesPeriodSelected ? expensesPeriodSelected.reduce((total, expense) => {
        return total + parseFloat(expense.value)
    }, 0) : 0

    return (
        <View style={{ marginBottom: 20, marginTop: 50 }}>
            <Text style={{ fontSize: 12, marginBottom: 3, color: 'white', textAlign: 'center', opacity: 0.5 }}>Total de gastos</Text>
            <Text style={{ fontSize: 50, color: 'white', textAlign: 'center', fontWeight: 'bold' }}>{formatMoney(totalValue)}</Text>
        </View>
    )
    // return (
    //     <>
    //         <Text style={{ fontSize: 12, marginBottom: 3, opacity: 0.5 }}>Total de gastos</Text>
    //         <Text style={{ fontSize: 30 }}>{formatMoney(totalValue)}</Text>
    //     </>
    // )
}