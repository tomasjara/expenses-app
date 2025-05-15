import { formatMoney } from '@/utils/formatMoney'
import { useState, useMemo } from 'react'
import { View, Text, StyleSheet, Pressable, ActivityIndicator } from 'react-native'
import { ContainerWidget } from '../ContainerWidget'
import { CategoryDetail } from '../CategoryDetail'

const calculateTotals = (list, expenses, getExpenseId) => {
    return list?.map(item => ({
        ...item,
        value: expenses
            .filter(expense => getExpenseId(expense) === item.id)
            .reduce((sum, expense) => sum + parseFloat(expense.value), 0)
    }))
}

const getFilteredAndSorted = (list, showAll) => {
    const sorted = list?.sort((a, b) => b.value - a.value)

    return showAll ? sorted : sorted?.slice(0, 4)
}

export const GastosPorOpcion = ({ expensesWithRelations, categories, paymentMethods }) => {
    const [showAllCategories, setShowAllCategories] = useState(false)
    const [showAllPaymentMethods, setShowAllPaymentMethods] = useState(false)

    const categoriesWithTotal = useMemo(
        () => calculateTotals(categories, expensesWithRelations, expense => expense.category.id),
        [categories, expensesWithRelations]
    )

    const paymentMethodsWithTotal = useMemo(
        () => calculateTotals(paymentMethods, expensesWithRelations, expense => expense.paymentMethod.id),
        [paymentMethods, expensesWithRelations]
    )

    const filteredCategories = useMemo(() => getFilteredAndSorted(categoriesWithTotal, showAllCategories), [categoriesWithTotal, showAllCategories])

    const filteredPaymentMethods = useMemo(() => getFilteredAndSorted(paymentMethodsWithTotal, showAllPaymentMethods), [paymentMethodsWithTotal, showAllPaymentMethods])

    return (
        <>
            {categories && (
                <ContainerWidget>
                    <ListHeader title="Lista de categorías" />
                    <View style={styles.containerOptions}>
                        {filteredCategories?.map((category) => (
                            <CategoryDetail
                                key={category.id}
                                expensesWithRelations={expensesWithRelations}
                                categoryColor={category.color}
                                categoryId={category.id}
                                categoryName={category.name}
                                categoryTotalValue={category.value}
                            />
                        ))}
                        {categories?.length > 4 && (
                            <ShowMoreButton
                                isShowingAll={showAllCategories}
                                onPress={() => setShowAllCategories(!showAllCategories)}
                            />
                        )}
                    </View>
                </ContainerWidget>
            )}

            {paymentMethods && (
                <ContainerWidget>
                    <ListHeader title="Lista de metodos de pago" />
                    <View style={styles.containerOptions}>
                        {filteredPaymentMethods?.map((paymentMethod) => (
                            <PaymentMethodItem key={paymentMethod.id} paymentMethod={paymentMethod} />
                        ))}
                        {paymentMethods?.length > 4 && (
                            <ShowMoreButton
                                isShowingAll={showAllPaymentMethods}
                                onPress={() => setShowAllPaymentMethods(!showAllPaymentMethods)}
                            />
                        )}
                    </View>
                </ContainerWidget>
            )}
        </>
    )
}

const ListHeader = ({ title }) => (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={{ color: 'black', fontSize: 12, opacity: 0.6, fontWeight: 'bold' }}>{title}</Text>
    </View>
)

const PaymentMethodItem = ({ paymentMethod }) => (
    <View style={styles.paymentMethodItem}>
        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 5 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, }}>
                <View style={[styles.colorIndicator, { backgroundColor: paymentMethod.color }]} />
                <Text style={styles.itemName}>{paymentMethod.name}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, }}>
                <Text style={styles.label}>Total:</Text>
                <Text style={styles.value}>{formatMoney(paymentMethod.value)}</Text>
            </View>
        </View>
    </View>
)

const ShowMoreButton = ({ isShowingAll, onPress }) => (
    <Pressable onPress={onPress} style={styles.showMoreButton}>
        <Text style={styles.showMoreText}>
            {isShowingAll ? 'Ver menos' : 'Ver más'}
        </Text>
    </Pressable>
)

const styles = StyleSheet.create({
    containerOptions: {
        gap: 8,
        paddingHorizontal: 15,
    },
    showMoreButton: {
        padding: 10,
        borderRadius: 10,
        backgroundColor: 'white',
        borderWidth: 0.4,
        borderColor: 'black',
        alignItems: 'center',
    },
    showMoreText: {
        color: 'black',
        fontSize: 15,
        fontWeight: 'bold',
    },
    paymentMethodItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderRadius: 10,
        backgroundColor: 'white',
        borderWidth: 0.4,
        borderColor: 'black'
    },
    colorIndicator: {
        width: 10,
        height: 10,
        borderRadius: 10
    },
    itemName: {
        color: 'black',
        fontSize: 15,
    },
    label: {
        color: 'gray',
        fontSize: 12
    },
    value: {
        color: 'black',
        fontSize: 15,
        fontWeight: 'bold'
    }
});