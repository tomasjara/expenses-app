import { useExpensesStore } from '@/store/expensesStore'
import { formatMoney } from '@/utils/formatMoney'
import { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { ContainerWidget } from '../ContainerWidget'
import { CategoryDetail } from '../CategoryDetail'

export const GastosPorOpcion = () => {

    const { expensesWithRelations, categories } = useExpensesStore(state => state)
    const [expensesCategory, setExpensesCategory] = useState()
    const [expensesPaymentMethod, setExpensesPaymentMethod] = useState()

    useEffect(() => {
        const expensesCategoryTransformed = expensesWithRelations.reduce((acc, expense) => {
            const categoryName = expense.category.name;
            const value = parseFloat(expense.value);
            const existingCategory = acc.find(item => item.name === categoryName);
            if (existingCategory) {
                existingCategory.value += value;
            } else {
                acc.push({
                    name: categoryName,
                    value,
                    color: expense.category.color,
                    id: expense.category.id
                });
            }
            return acc;
        }, [])
        const expensesPaymentMethodTransformed = expensesWithRelations.reduce((acc, expense) => {
            const paymentMethod = expense.paymentMethod.name;
            const value = parseFloat(expense.value);
            const existingPaymentMethod = acc.find(item => item.name === paymentMethod);
            if (existingPaymentMethod) {
                existingPaymentMethod.value += value;
            } else {
                acc.push({
                    name: paymentMethod,
                    value,
                    color: expense.paymentMethod.color,
                });
            }
            return acc;
        }, [])

        setExpensesPaymentMethod(expensesPaymentMethodTransformed)
        setExpensesCategory(expensesCategoryTransformed)
    }, [expensesWithRelations])

    return (
        <>
            <ContainerWidget>
                <Text style={{ color: 'black', fontSize: 15, alignSelf: 'flex-start', opacity: 0.6, fontWeight: 'bold' }}>Total gastos por categoría</Text>
                <View style={styles.containerOptions}>
                    {expensesCategory && expensesCategory.sort((a, b) => a.value > b.value ? -1 : 1).map((category, index) => (
                        <CategoryDetail key={index} categoryColor={category.color} categoryId={category.id} categoryName={category.name} categoryTotalValue={category.value} />
                    ))}
                </View>
            </ContainerWidget>
            <ContainerWidget>
                <Text style={{ color: 'black', fontSize: 15, alignSelf: 'flex-start', opacity: 0.6, fontWeight: 'bold' }}>Total gastos por metodo de pago</Text>
                <View style={styles.containerOptions}>
                    {expensesPaymentMethod && expensesPaymentMethod.sort((a, b) => a.value > b.value ? -1 : 1).map((category, index) => (
                        <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, borderRadius: 10, backgroundColor: category.color }}>
                            <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold' }}>{category.name}</Text>
                            <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold' }}>{formatMoney(category.value)}</Text>
                        </View>
                    ))}
                </View>
            </ContainerWidget>
        </>
    )
}

const styles = StyleSheet.create({
    containerOptions: {
        gap: 8,
        paddingHorizontal: 15,
    },
});