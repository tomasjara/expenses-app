import { useExpensesStore } from '@/store/expensesStore'
import dayjs from 'dayjs'
import { View, Text, Button } from 'react-native'
import Toast from 'react-native-toast-message'
import { UpdateCreateExpenseModal } from './UpdateCreateExpenseModal';
import RBSheet from 'react-native-raw-bottom-sheet';
import { useEffect, useRef, useState } from 'react';
import { ModalConfirmExpenseDelete } from './modals/ModalConfirmExpenseDelete';
import ButtonBase from './ButtonBase';
import { formatFirstLetterString } from '@/utils/formatFirstLetterString';

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
                <View style={{ gap: 15, marginTop: 20 }}>
                    <ButtonEditExpense expense={expense} />
                    <ModalConfirmExpenseDelete onDeleteOption={onDelete} />
                    <Button title='Cerrar' onPress={() => setDetailExpenseVisible(false)} />
                </View>
            </View>
            <Toast />
        </View>
    )
}