import { Button, Modal, Pressable, StyleSheet, Text, View } from 'react-native'
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
        setVisible(false)
    }

    const onDelete = () => {
        const newExpenses = expenses.filter(expense => expense[optionNamesInExpenses[relatedOption.key]] != relatedOption.option.id)
        onDeleteOption()
        setExpenses(newExpenses)
        setVisible(false)
    }


    const onDisable = () => {
        updateFuntions[relatedOption.key]({ id: relatedOption.option.id, disabled: true })
        setVisible(false)
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
            transparent={true}
            visible={visible}
            onRequestClose={() => {
                setVisible(false)
            }}>
            <Pressable style={{ justifyContent: 'center', height: '100%', paddingHorizontal: 20, backgroundColor: 'rgba(0, 0, 0, 0.6)' }} onPress={() => setVisible(false)}>
                <Pressable style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, }} onPress={() => { }}>
                    {lengthArray <= 1 &&
                        <View style={{ gap: 10 }}>
                            <Text style={{ fontSize: 19, fontWeight: 'semibold', textAlign: 'center' }}>Debe haber mas de un elemento activado para poder eliminar una opcion</Text>
                            <Button
                                title='Cerrar'
                                onPress={() => setVisible(false)} />
                        </View>}

                    {relatedOption?.relations && lengthArray > 1 &&
                        <View style={{ gap: 10 }}>
                            <Text style={{ fontSize: 19, fontWeight: 'semibold', textAlign: 'center' }}>Esta categoria/Este metodo de pago esta relacionado con un gasto </Text>
                            <View style={{ gap: 10 }}>
                                <Button onPress={onDisable} title='Desactivar categoria/el metodo de pago' color={'green'} />
                                <Button onPress={onDelete} title='Eliminar todos los gastos relacioanados' color={'red'} />
                            </View>
                            <Button onPress={() => setVisible(false)} title='Cancelar' color={'red'} />
                        </View>}

                    {!relatedOption?.relations && lengthArray > 1 &&
                        <View style={{ gap: 10 }}>
                            <Text style={{ fontSize: 19, fontWeight: 'semibold', textAlign: 'center' }}>¿Estas seguro de eliminar esta categoria/metodo de pago?</Text>
                            <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center', justifyContent: 'center' }}>
                                <Button onPress={onDeleteOption} title='Confirmar' color={'green'} />
                                <Button onPress={() => setVisible(false)} title='Cencelar' color={'red'} />
                            </View>
                        </View>
                    }

                </Pressable>
            </Pressable>
        </Modal >
    )
}

const styles = StyleSheet.create({})