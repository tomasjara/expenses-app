import { useExpensesStore } from '@/store/expensesStore'
import dayjs from 'dayjs'
import { View, Text, Button, Pressable } from 'react-native'
import Toast from 'react-native-toast-message'
import { UpdateCreateExpenseModal } from './UpdateCreateExpenseModal';
import RBSheet from 'react-native-raw-bottom-sheet';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect, useRef, useState } from 'react';

function BottomSheetModal({ expense }) {
    const refRBSheet = useRef();
    const { setModalUpdateCreateExpense, expensesWithRelations } = useExpensesStore(state => state)

    return (
        <View >
            <RBSheet
                ref={refRBSheet}
                draggable
                height={400}
                customModalProps={{
                    animationType: 'fade',
                    statusBarTranslucent: true,
                }}
                customStyles={{
                    container: {
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10,
                    },
                    draggableIcon: {
                        width: 80,
                    },
                }}>
                <UpdateCreateExpenseModal refRBSheet={refRBSheet} />
            </RBSheet>

            <Button title='editar' color={'blue'} onPress={() => {
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
            <Text style={{ fontSize: 15 }}>{keyValue}</Text>
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
        <View style={{ padding: 30 }}>
            <Text style={{ fontSize: 20 }}>Detalles de gasto</Text>
            <View style={{ gap: 5, marginVertical: 40 }}>
                <KeyValue keyValue={'id:'} value={id} />
                <KeyValue keyValue={'value:'} value={value} />
                <KeyValue keyValue={'description:'} value={description} />
                <KeyValue keyValue={'category:'} value={category?.name} />
                <KeyValue keyValue={'metodo de pago:'} value={paymentMethod?.name} />
                <KeyValue keyValue={'payment date:'} value={dayjs(paymentDate).format('DD/MM/YYYY')} />
                <KeyValue keyValue={'creation date:'} value={dayjs(creationDate).format('DD/MM/YYYY')} />
                <KeyValue keyValue={'last modification date:'} value={dayjs(lastModificationDate).format('DD/MM/YYYY')} />
                {color && <>
                    <KeyValue keyValue={'Color:'} value={color} />
                    <View style={{ backgroundColor: color, width: 300, height: 100, borderRadius: 10 }}></View>
                </>}
                <BottomSheetModal expense={expense} />
                {/* <Button title='editar' color={'blue'} onPress={() => setModalUpdateCreateExpense({ type: 'edit', show: true, optionSelect: expense })} /> */}

                <Button title='Eliminar' color={'red'} onPress={onDelete} />
                <View style={{ marginTop: 10 }}>
                    <Button title='Cerrar' onPress={() => setDetailExpenseVisible(false)} />
                </View>
            </View>
            <Toast />
        </View>
    )
}