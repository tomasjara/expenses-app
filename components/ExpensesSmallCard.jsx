import dayjs from "dayjs"
import { Modal, Pressable, Text, View } from "react-native"
import { formatMoney } from '@/utils/formatMoney'
import { dayOfWeek } from '@/utils/dayOfWeek'
import { FontAwesome, SimpleLineIcons } from "@expo/vector-icons"
import { useState } from "react"
import { DetailExpense } from "./DetailExpense"

export const ExpensesSmallCard = ({ expense, onPress = () => { }, minimalStyle = false, theme = 'dark' }) => {
    const { value, description, category, paymentMethod, paymentDate } = expense || {}
    const [visible, setVisible] = useState(false)
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
                : <Pressable style={{ flexDirection: 'column', borderWidth: 0.5, borderColor: theme == 'dark' ? 'white' : 'black', borderRadius: 8, paddingVertical: 4, paddingHorizontal: 20, gap: 10 }} onPress={() => {
                    setVisible(true)
                }}>
                    <Text style={{ alignSelf: 'center', fontSize: 13, opacity: 0.5, color: theme == 'dark' ? 'white' : 'black' }}>{dayjs(paymentDate).format('DD/MM/YYYY')}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 10, flexWrap: 'wrap' }}>
                        <View style={{ flexDirection: 'row', borderWidth: 0.5, borderColor: theme == 'dark' ? 'white' : 'black', alignItems: 'center', gap: 6, padding: 4, borderRadius: 7, }}>
                            <View style={{ backgroundColor: category?.color ? category.color : 'blue', width: 10, height: 10, borderRadius: 10 }}></View>
                            <Text style={{ fontWeight: 'bold', color: theme == 'dark' ? 'white' : 'black', fontWeight: '600', fontSize: 10 }}>{category?.name ? category.name : ''}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', borderWidth: 0.5, borderColor: theme == 'dark' ? 'white' : 'black', alignItems: 'center', gap: 6, padding: 4, borderRadius: 7, }}>
                            <View style={{ backgroundColor: paymentMethod?.color ? paymentMethod.color : 'green', width: 10, height: 10, borderRadius: 10 }}></View>
                            <Text style={{ fontWeight: 'bold', color: theme == 'dark' ? 'white' : 'black', fontWeight: '600', fontSize: 10 }}>{paymentMethod?.name ? paymentMethod.name : ''}</Text>
                        </View>
                    </View>
                    <View style={{ position: 'absolute', top: 6, right: 15 }}>
                        <SimpleLineIcons name="options" size={12} color={theme == 'dark' ? 'white' : 'black'} />
                    </View>
                    {description && <Text style={{ marginStart: 4, opacity: 0.8, fontSize: 13, color: theme == 'dark' ? 'white' : 'black', textAlign: 'center' }}>{description}</Text>}
                    <Text style={{ fontSize: 20, textAlign: 'center', color: theme == 'dark' ? 'white' : 'black' }}>{moneyFormatted}</Text>
                </Pressable>
            }

        </>
    )
}