import { useExpensesStore } from '@/store/expensesStore'
import dayjs from 'dayjs'
import { View, Text, Button } from 'react-native'

const KeyValue = ({ keyValue, value }) => {
    return (
        <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
            <Text style={{ fontSize: 15 }}>{keyValue}</Text>
            <Text style={{ fontSize: 15 }}>{value}</Text>
        </View>
    )
}

export const DetailExpense = ({ expense, setDetailExpenseVisible }) => {

    const { id, value, description, category, paymentMethod, creationDate, paymentDate, lastModificationDate } = expense || {}
    const removeExpense = useExpensesStore(state => state.removeExpense)

    const onDelete = () => {
        removeExpense(id)
        setDetailExpenseVisible(false)
    }

    return (
        <View>
            <Text style={{ fontSize: 20 }}>Detalles de gasto</Text>
            <View style={{ gap: 5, marginVertical: 40 }}>
                <KeyValue keyValue={'id:'} value={id} />
                <KeyValue keyValue={'value:'} value={value} />
                <KeyValue keyValue={'description:'} value={description} />
                <KeyValue keyValue={'payment date:'} value={dayjs(paymentDate).format('DD/mm/YYYY')} />
                <KeyValue keyValue={'creation date:'} value={dayjs(creationDate).format('DD/mm/YYYY')} />
                <KeyValue keyValue={'last modification date:'} value={dayjs(lastModificationDate).format('DD/mm/YYYY')} />
                <Button title='Eliminar' color={'red'} onPress={onDelete} />
                <Button title='Cerrar' onPress={() => setDetailExpenseVisible(false)} />
            </View>
        </View>
    )
}