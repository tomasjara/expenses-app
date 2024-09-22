import { useExpensesStore } from '@/store/expensesStore'
import dayjs from 'dayjs'
import { View, Text, Button } from 'react-native'
import Toast from 'react-native-toast-message'

const KeyValue = ({ keyValue, value }) => {
    return (
        <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
            <Text style={{ fontSize: 15 }}>{keyValue}</Text>
            <Text style={{ fontSize: 15 }}>{value}</Text>
        </View>
    )
}

export const DetailExpense = ({ expense, setDetailExpenseVisible }) => {
    const { removeExpense, setModalUpdateCreateExpense } = useExpensesStore(state => state)
    const { id, value, description, category, paymentMethod, creationDate, paymentDate, lastModificationDate } = expense || {}

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
                <Button title='editar' color={'blue'} onPress={() => setModalUpdateCreateExpense({ type: 'edit', show: true, optionSelect: expense })} />
                <Button title='Eliminar' color={'red'} onPress={onDelete} />
                <View style={{ marginTop: 10 }}>
                    <Button title='Cerrar' onPress={() => setDetailExpenseVisible(false)} />
                </View>
            </View>
            <Toast />
        </View>
    )
}