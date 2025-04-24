import { formatMoney } from '@/utils/formatMoney'
import { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import { ContainerWidget } from '../ContainerWidget'
import { CategoryDetail } from '../CategoryDetail'

export const GastosPorOpcion = ({ expensesWithRelations, categories, paymentMethods }) => {
    const [expensesCategory, setExpensesCategory] = useState()
    const [expensesPaymentMethod, setExpensesPaymentMethod] = useState()

    useEffect(() => {
        const expensesCategoryTransformed = categories.map(category => {
            const totalValue = expensesWithRelations.filter(expense => expense.category.id === category.id).reduce((sum, expense) => sum + parseFloat(expense.value), 0);
            return {
                id: category.id,
                name: category.name,
                color: category.color,
                value: totalValue
            };
        });
        const expensesPaymentMethodTransformed = paymentMethods.map(paymentMethod => {
            const totalValue = expensesWithRelations.filter(expense => expense.paymentMethod.id === paymentMethod.id).reduce((sum, expense) => sum + parseFloat(expense.value), 0);
            return {
                id: paymentMethod.id,
                name: paymentMethod.name,
                color: paymentMethod.color,
                value: totalValue
            };
        });
        setExpensesPaymentMethod(expensesPaymentMethodTransformed)
        setExpensesCategory(expensesCategoryTransformed)
    }, [expensesWithRelations])

    return (
        <>
            {expensesCategory &&
                <ContainerWidget>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={{ color: 'black', fontSize: 12, opacity: 0.6, fontWeight: 'bold' }}>Lista de categorías</Text>
                        <Text style={{ color: 'black', fontSize: 12, opacity: 0.6, fontWeight: 'bold' }}>Valores totales </Text>
                    </View>
                    <View style={styles.containerOptions}>
                        {expensesCategory.sort((a, b) => a.value > b.value ? -1 : 1).map((category, index) => (
                            <CategoryDetail key={index} categoryColor={category.color} categoryId={category.id} categoryName={category.name} categoryTotalValue={category.value} />
                        ))
                        }
                    </View>
                </ContainerWidget>
            }

            {expensesPaymentMethod &&
                <ContainerWidget>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={{ color: 'black', fontSize: 12, opacity: 0.6, fontWeight: 'bold' }}>Lista de metodos de pago</Text>
                        <Text style={{ color: 'black', fontSize: 12, opacity: 0.6, fontWeight: 'bold' }}>Valores totales </Text>
                    </View>
                    <View style={styles.containerOptions}>
                        {expensesPaymentMethod.sort((a, b) => a.value > b.value ? -1 : 1).map((category, index) => (
                            <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, borderRadius: 10, backgroundColor: 'white', borderWidth: 0.4, borderColor: 'black', }}>
                                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                                        <View style={{ width: 10, height: 10, backgroundColor: category.color, borderRadius: 10 }}></View>
                                        <Text style={{ color: 'black', fontSize: 15, fontWeight: 'bold' }}>{category.name}</Text>
                                    </View>
                                    <Text style={{ color: 'black', fontSize: 15, fontWeight: 'bold', marginStart: 20 }}>{formatMoney(category.value)}  </Text>
                                </View>
                            </View>
                        ))}
                    </View>
                </ContainerWidget>
            }
        </>
    )
}

const styles = StyleSheet.create({
    containerOptions: {
        gap: 8,
        paddingHorizontal: 15,
    },
});