import { useExpensesStore } from '@/store/expensesStore'
import dayjs from 'dayjs'
import { View, Text, Button, Pressable, ScrollView } from 'react-native'
import Toast from 'react-native-toast-message'
import { UpdateCreateExpenseModal } from './UpdateCreateExpenseModal';
import RBSheet from 'react-native-raw-bottom-sheet';
import { useEffect, useRef, useState } from 'react';
import { ModalConfirmExpenseDelete } from './modals/ModalConfirmExpenseDelete';
import ButtonBase from './ButtonBase';
import { formatFirstLetterString } from '@/utils/formatFirstLetterString';
import { AntDesign } from '@expo/vector-icons';
import { formatMoney } from '@/utils/formatMoney';

function ButtonEditExpense({ expense }) {
    const refRBSheet = useRef();
    const { setModalUpdateCreateExpense } = useExpensesStore(state => state)

    return (
        <View >
            <RBSheet
                ref={refRBSheet}
                draggable
                height={600}
                customModalProps={{
                    statusBarTranslucent: false,
                }}
                closeOnPressBack
                customAvoidingViewProps={{
                    enabled: true,
                }}
                customStyles={{
                    container: {
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10,
                    },
                    draggableIcon: {
                        width: 50,
                    },
                }}>
                <UpdateCreateExpenseModal refRBSheet={refRBSheet} />
            </RBSheet>
            <ButtonBase title={'Editar'} onPress={() => {
                refRBSheet.current.open()
                setModalUpdateCreateExpense({ type: 'edit', show: true, optionSelect: expense }
                )
            }} />
        </View>
    );
}

const KeyValue = ({ keyValue, value }) => {
    return (
        <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{formatFirstLetterString(keyValue)}</Text>
            <Text style={{ fontSize: 15 }}>{value}</Text>
        </View>
    )
}

export const DetailExpense = ({ expenseSelect, setDetailExpenseVisible }) => {
    const [expense, setExpense] = useState(expenseSelect)
    const { removeExpense, expensesWithRelations } = useExpensesStore(state => state)
    const { id, value, description, category, paymentMethod, creationDate, paymentDate, lastModificationDate, color } = expense || {}

    useEffect(() => {
        const expenseFind = expensesWithRelations.find(item => item.id === expense.id)
        setExpense(expenseFind)
    }, [expensesWithRelations])

    const onDelete = () => {
        removeExpense(id)
        setDetailExpenseVisible(false)
    }

    return (
        <View style={{ backgroundColor: 'white' }}>
            <View style={{ flexDirection: 'row', gap: 19, padding: 20, justifyContent: 'start', alignItems: 'center', }}>
                <Pressable onPress={() => setDetailExpenseVisible(false)}>
                    <AntDesign name="leftcircleo" size={30} color="black" />
                </Pressable>
            </View>
            <ScrollView >
                <View style={{ gap: 10, marginTop: 10, marginBottom: 25 }}>
                    <Text style={{ textAlign: 'center', fontSize: 50 }}>💸</Text>
                    <Text style={{ textAlign: 'center', fontSize: 50 }}>{formatMoney(value)}</Text>
                    {description && <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <Text style={{ textAlign: 'center', fontSize: 14, opacity: 0.5, maxWidth: 230 }}>{description}</Text></View>}
                    <View style={{ flexDirection: 'row', gap: 10, justifyContent: 'center', alignItems: 'center', padding: 10, flexWrap: 'wrap' }}>
                        <View style={{ borderRadius: 50, borderColor: 'black', paddingHorizontal: 20, paddingVertical: 8, borderWidth: 0, elevation: 2, backgroundColor: 'white' }}><Text style={{ color: 'black', fontSize: 15 }}>{category?.name}</Text></View>
                        <View style={{ borderRadius: 50, borderColor: 'black', paddingHorizontal: 20, paddingVertical: 8, borderWidth: 0, elevation: 2, backgroundColor: 'white' }}><Text style={{ color: 'black', fontSize: 15 }}>{paymentMethod?.name}</Text></View>
                    </View>
                </View>
                <View style={{ borderTopWidth: 0.3, marginTop: 20, borderColor: 'black', paddingVertical: 10, paddingHorizontal: 20 }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>Detalle de gasto</Text>
                    <View style={{ flexDirection: 'row', gap: 10, justifyContent: 'space-between', alignItems: 'center', padding: 10 }}>
                        <Text style={{ fontSize: 16, opacity: 0.5 }}>Fecha de pago</Text>
                        <Text style={{ fontSize: 16 }}>{dayjs(paymentDate).format('DD/MM/YYYY')}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', gap: 10, justifyContent: 'space-between', alignItems: 'center', padding: 10 }}>
                        <Text style={{ fontSize: 16, opacity: 0.5 }}>Fecha de registro</Text>
                        <Text style={{ fontSize: 16 }}>{dayjs(creationDate).format('DD/MM/YYYY')}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', gap: 10, justifyContent: 'space-between', alignItems: 'center', padding: 10 }}>
                        <Text style={{ fontSize: 16, opacity: 0.5 }}>Ultima modificación</Text>
                        <Text style={{ fontSize: 16 }}>{dayjs(lastModificationDate).format('DD/MM/YYYY')}</Text>
                    </View>
                    <View style={{ paddingVertical: 25 }}>
                        <ButtonEditExpense expense={expense} />
                    </View>
                </View>
            </ScrollView>
        </View >
    )
}