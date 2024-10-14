import { Button, Modal, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useExpensesStore } from '@/store/expensesStore'

export const ModalDisabledOption = ({ optionName, visible = false, setVisible }) => {
    const { categories, paymentMethods, expenses, removeCategory, removePaymentMethod, updateCategory, updatePaymentMethod, setExpenses } = useExpensesStore(state => state)
    if (!visible) return

    const optionNamesInExpenses = {
        categories: categories,
        paymentMethods: paymentMethods
    }

    const updateFuntions = {
        categories: updateCategory,
        paymentMethods: updatePaymentMethod
    }

    const optionsFilter = optionNamesInExpenses[optionName].filter(option => option.disabled)

    const onActive = (optionId) => {
        updateFuntions[optionName]({ id: optionId, disabled: false })
    }

    return (
        <Modal
            animationType="fade"
            transparent={false}
            visible={visible}
            onRequestClose={() => {
                setVisible(false)
            }}>
            <View style={{ padding: 30, gap: 10 }}>
                <Text>Opciones desabilidatadas</Text>
                {optionNamesInExpenses && optionsFilter.map(option => (
                    <View style={{ flexDirection: 'row', gap: 5 }} key={option.id}>
                        <View style={{ flexDirection: 'row', gap: 6 }}>
                            <Button
                                title={'Activar'}
                                color={'blue'}
                                onPress={() => {
                                    onActive(option.id)
                                }} />
                        </View>
                        <View style={{ flex: 1, marginStart: 6 }}>
                            <Button
                                key={option.id}
                                title={option.name}
                                onPress={() => {
                                    // setCategory(category)
                                    // setModalCategoriesVisible(false)
                                }} />
                        </View>
                    </View>
                ))}
                <Button onPress={() => setVisible(false)} title='Cerrar' color={'red'} />
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({})