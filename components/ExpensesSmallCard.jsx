import dayjs from "dayjs"
import { Pressable, Text, View } from "react-native"
import { formatMoney } from '@/utils/formatMoney'
import { dayOfWeek } from '@/utils/dayOfWeek'

export const ExpensesSmallCard = ({ expense, onPress = () => { } }) => {
    const { value, description, category, paymentDate } = expense || {}

    return (
        <Pressable style={{ borderWidth: 1, borderRightWidth: 0, borderLeftWidth: 0, marginBottom: 10, borderColor: '#0000007a', paddingVertical: 3 }} onPress={onPress}>
            <View style={{ flexDirection: 'row', gap: 4, alignItems: 'center' }}>
                <Text>{dayjs(paymentDate).date().toString().padStart(2, '0')}</Text>
                <Text style={{ fontSize: 11, opacity: 0.5 }}>{dayOfWeek('small', dayjs(paymentDate).day())}, {dayjs(paymentDate).month() + 1}, {dayjs(paymentDate).year()}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                    <View style={{ width: 10, height: 10, backgroundColor: 'black' }}></View>
                    <Text style={{ opacity: 0.8 }}>{description ? description : category?.name}</Text>
                </View>
                <Text style={{ fontSize: 15 }}>{formatMoney(value)}</Text>
            </View>
            {description && <Text style={{ fontSize: 11, opacity: 0.5 }}>{description ? category?.name : description}</Text>}
        </Pressable>
    )
}