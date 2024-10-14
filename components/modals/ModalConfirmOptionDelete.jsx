import { Button, Modal, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useExpensesStore } from '@/store/expensesStore'

export const ModalConfirmOptionDelete = ({ optionId, visible = false, setVisible }) => {
    const { categories, paymentMethods, expenses, removeCategory, removePaymentMethod, updateCategory, updatePaymentMethod, setExpenses } = useExpensesStore(state => state)
    const [relatedOption, setRelatedOption] = useState(null)
    const [lengthArray, setLengthArray] = useState()

    useEffect(() => {
        if (!relatedOption) return
        setLengthArray(searchArrays[relatedOption.key].filter(item => !item.disabled).length);
    }, [relatedOption])

    const searchArrays = {
        categories,
        paymentMethods
    }
    const optionNamesInExpenses = {
        categories: 'categoryId',
        paymentMethods: 'paymentMethodId'
    }
    const removeFuntions = {
        categories: removeCategory,
        paymentMethods: removePaymentMethod
    }
    const updateFuntions = {
        categories: updateCategory,
        paymentMethods: updatePaymentMethod
    }

    const onDeleteOption = () => {
        removeFuntions[relatedOption.key](relatedOption.option.id)
    }

    const onDelete = () => {
        const newExpenses = expenses.filter(expense => expense[optionNamesInExpenses[relatedOption.key]] != relatedOption.option.id)
        onDeleteOption()
        setExpenses(newExpenses)
    }


    const onDisable = () => {
        updateFuntions[relatedOption.key]({ id: relatedOption.option.id, disabled: true })
    }

    useEffect(() => {
        if (!optionId) return
        Object.keys(searchArrays).forEach((key) => {
            const optionResult = searchArrays[key].find(item => item.id === optionId)
            if (optionResult) {
                const expenseResult = expenses.find(expense => expense[optionNamesInExpenses[key]] === optionId)
                if (!expenseResult) {
                    setRelatedOption({ key: key, option: optionResult, relations: false })
                    return
                }
                setRelatedOption({ key: key, option: optionResult, relations: true })
            }
        })
    }, [optionId])

    return (
        <Modal
            animationType="fade"
            transparent={false}
            visible={visible}
            onRequestClose={() => {
                setVisible(false)
            }}>

            {lengthArray <= 1 && <View>
                <Text>Debe haber mas de un elemento activado para poder eliminar una opcion</Text>
            </View>}

            {relatedOption?.relations && lengthArray > 1 &&
                <View>
                    <Text>Esta categoria/Este metodo de pago esta relacionado con un gasto </Text>
                    <Button onPress={onDisable} title='Conservar los todos los gastos relacionados, desactivando la categoria/el metodo de pago' color={'green'} />
                    <Button onPress={onDelete} title='Eliminar todas los gastos relaciondos' color={'red'} />
                </View>}

            {!relatedOption?.relations && lengthArray > 1 &&
                <View>
                    <Button onPress={onDeleteOption} title='Eliminar categoria/metodo de pago' color={'red'} />
                    <Text>Opcion no relacionada</Text>
                </View>
            }

            <Button
                title='Cerrar'
                onPress={() => setVisible(false)} />
        </Modal>
    )
}

const styles = StyleSheet.create({})