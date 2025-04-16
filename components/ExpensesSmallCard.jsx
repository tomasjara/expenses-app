import dayjs from "dayjs"
import { Modal, Pressable, Text, View } from "react-native"
import { formatMoney } from '@/utils/formatMoney'
import { dayOfWeek } from '@/utils/dayOfWeek'
import { AntDesign, Entypo, FontAwesome, SimpleLineIcons } from "@expo/vector-icons"
import { useState } from "react"
import { DetailExpense } from "./DetailExpense"

const CategoryComponent = ({ name = '', color = 'blue' }) => (
    <Text style={{ backgroundColor: color, width: 'auto', color: 'white', fontWeight: '600', padding: 4, borderRadius: 7, fontSize: 10 }}>{name}</Text>
)

export const ExpensesSmallCard = ({ expense, onPress = () => { }, minimalStyle = false }) => {
    const { value, description, category, paymentMethod, paymentDate } = expense || {}
    const [visible, setVisible] = useState(false)
    const dayWeek = dayOfWeek('small', dayjs(paymentDate).day() - 1)
    const day = dayjs(paymentDate).date().toString().padStart(2, '0')
    const moneyFormatted = formatMoney(value)

    return (
        <>
            <Modal
                animationType="fade"
                transparent={false}
                visible={visible}
                onRequestClose={() => {
                    setVisible(false)
                }}>
                <View>
                    <DetailExpense expenseSelect={expense} setDetailExpenseVisible={setVisible} />
                </View>
            </Modal>

            {minimalStyle
                ? <>
                    <Pressable style={{ flexDirection: 'row', justifyContent: 'space-between', borderWidth: 1, marginBottom: 10, borderColor: '#333', paddingVertical: 9, paddingHorizontal: 12, borderRadius: 10 }} onPress={() => {
                        setVisible(true)
                    }}>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                            <View style={{ backgroundColor: category.color, width: 10, height: 10, borderRadius: 100 }}></View>
                            <Text style={{ fontWeight: 'bold', color: 'white' }}>{category?.name}</Text>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 7, justifyContent: 'flex-end' }}>
                            <Text style={{ color: 'white', maxWidth: 100 }}>{formatMoney(value)}</Text>
                            <FontAwesome name="angle-right" size={20} color="white" />
                        </View>
                    </Pressable>
                </>
                : <Pressable style={{ flexDirection: 'row', justifyContent: 'space-between', borderWidth: 1, marginBottom: 10, borderColor: '#0000007a', paddingVertical: 9, paddingHorizontal: 12, borderRadius: 10 }} onPress={() => {
                    setVisible(true)
                }}>
                    <View style={{ gap: 5, maxWidth: 210 }}>
                        <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
                                <Text>{day}</Text>
                                <Text style={{ fontSize: 11, opacity: 0.5 }}>{dayWeek}</Text>
                            </View>
                            <Text style={{ fontSize: 11, opacity: 0.5 }}>{dayjs(paymentDate).format('DD/MM/YYYY')}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'row', gap: 5, flexWrap: 'wrap' }}>
                                {/* <CategoryComponent name={'Texto largoooooooooooo000000000000000000000000000000000largoooooooooooo000000000000000000000000000000000'} /> */}
                                {/* <CategoryComponent name={'Texto largoooooooooooo000000000000000000000000000000000largoooooooooooo000000000000000000000000000000000'} color='green' /> */}
                                <CategoryComponent name={category?.name ? category.name : ''} color={category?.color ? category.color : 'blue'} />
                                <CategoryComponent name={paymentMethod?.name ? paymentMethod.name : ''} color={paymentMethod?.color ? paymentMethod.color : 'green'} />
                            </View>
                        </View>
                        {description && <View style={{ flexDirection: 'row' }}>
                            {/* <Text style={{ marginStart: 4, opacity: 0.8, fontSize: 13 }}>Texto largoooooooooooo000000000000000000000000000000000largoooooooooooo000000000000000000000000000000000</Text> */}
                            <Text style={{ marginStart: 4, opacity: 0.8, fontSize: 13 }}>{description}</Text>
                        </View>}
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 15 }}>{moneyFormatted}</Text>
                    </View>
                    <View style={{ position: 'absolute', top: 6, right: 15 }}>
                        <SimpleLineIcons name="options" size={12} color="black" />
                    </View>
                </Pressable>}

        </>
    )
}