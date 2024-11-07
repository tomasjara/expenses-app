import { useEffect, useState } from 'react'
import dayjs from "dayjs"
import { Pressable, Text, View } from "react-native"
import { formatMoney } from '@/utils/formatMoney'
import { dayOfWeek } from '@/utils/dayOfWeek'
import { useExpensesStore } from '@/store/expensesStore'

const CategoryComponent = ({ name = '', color = 'blue' }) => (
    <Text style={{ backgroundColor: color, width: 'auto', color: 'white', fontWeight: '600', padding: 4, borderRadius: 7, fontSize: 10 }}>{name}</Text>
)

export const ExpensesSmallCard = ({ expense, onPress = () => { } }) => {
    const { value, description, category, paymentMethod, paymentDate } = expense || {}

    const dayWeek = dayOfWeek('small', dayjs(paymentDate).day() - 1)
    const day = dayjs(paymentDate).date().toString().padStart(2, '0')
    const month = (dayjs(paymentDate).month() + 1).toString().padStart(2, '0')
    const year = dayjs(paymentDate).year()
    const moneyFormatted = formatMoney(value)

    return (
        <Pressable style={{ flexDirection: 'row', justifyContent: 'space-between', borderWidth: 1, marginBottom: 10, borderColor: '#0000007a', paddingVertical: 9, paddingHorizontal: 12, borderRadius: 10 }} onPress={onPress}>
            <View style={{ gap: 5 }}>
                <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text>{day}</Text>
                        <Text style={{ fontSize: 11, opacity: 0.5 }}>{dayWeek}</Text>
                    </View>
                    <Text style={{ fontSize: 11, opacity: 0.5 }}>{dayjs(paymentDate).format('DD/MM/YYYY')}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 5, flexWrap: 'wrap', maxWidth: 240 }}>
                        {/* <CategoryComponent name={'Texto largoooooooooooo000000000000000000000000000000000largoooooooooooo000000000000000000000000000000000'} /> */}
                        {/* <CategoryComponent name={'Texto largoooooooooooo000000000000000000000000000000000largoooooooooooo000000000000000000000000000000000'} color='green' /> */}
                        <CategoryComponent name={category?.name ? category.name : ''} />
                        <CategoryComponent name={paymentMethod?.name ? paymentMethod.name : ''} color='green' />
                    </View>
                </View>
                {description && <View style={{ flexDirection: 'row' }}>
                    <Text style={{ marginStart: 4, opacity: 0.8, fontSize: 13 }}>{description}</Text>
                </View>}
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 15 }}>{moneyFormatted}</Text>
            </View>
        </Pressable>
    )
}