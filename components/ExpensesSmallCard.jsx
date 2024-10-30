import { useEffect, useState } from 'react'
import dayjs from "dayjs"
import { Pressable, Text, View } from "react-native"
import { formatMoney } from '@/utils/formatMoney'
import { dayOfWeek } from '@/utils/dayOfWeek'
import { useExpensesStore } from '@/store/expensesStore'

const CategoryComponent = ({ name = '', color = 'blue' }) => (
    <Text style={{ backgroundColor: color, width: 'auto', color: 'white', fontWeight: '600', padding: 4, borderRadius: 10, fontSize: 12 }}>{name}</Text>
)

export const ExpensesSmallCard = ({ expense, onPress = () => { } }) => {
    const { value, description, category, paymentMethod, paymentDate } = expense || {}

    const dayWeek = dayOfWeek('small', dayjs(paymentDate).day())
    const day = dayjs(paymentDate).date().toString().padStart(2, '0')
    const month = (dayjs(paymentDate).month() + 1).toString().padStart(2, '0')
    const year = dayjs(paymentDate).year()
    const moneyFormatted = formatMoney(value)

    return (
        <Pressable style={{ borderWidth: 1, borderRightWidth: 0, borderLeftWidth: 0, marginBottom: 10, borderColor: '#0000007a', paddingVertical: 3 }} onPress={onPress}>
            <View style={{ flexDirection: 'row', gap: 4, alignItems: 'center' }}>
                <Text>{day}</Text>
                <Text style={{ fontSize: 11, opacity: 0.5 }}>{dayWeek}, {month}, {year}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                    <View style={{ width: 10, height: 10, backgroundColor: 'black' }}></View>
                    {description ? <Text style={{ opacity: 0.8, fontSize: 16 }}>{description}</Text> : <CategoryComponent name={category?.name ? category.name : ''} />}
                </View>
                <Text style={{ fontSize: 15 }}>{moneyFormatted}</Text>
            </View>
            <View style={{ flexDirection: 'row', gap: 5, marginTop: 6 }}>
                {description && <CategoryComponent name={category?.name ? category.name : ''} />}
                <CategoryComponent name={paymentMethod?.name ? paymentMethod.name : ''} color='green' />
            </View>
        </Pressable>
    )
}