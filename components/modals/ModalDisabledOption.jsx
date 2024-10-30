import { Button, Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useExpensesStore } from '@/store/expensesStore'
import AntDesign from '@expo/vector-icons/AntDesign';

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
            <View style={{ padding: 30, gap: 10, backgroundColor: '#000', height: '100%' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20 }}>
                    <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold' }}>Opciones desactivadas</Text>
                    <Pressable onPress={() => setVisible(false)}>
                        <AntDesign name="close" size={24} color="white" />
                    </Pressable>
                </View>
                <View style={{ backgroundColor: 'white', padding: 10, borderRadius: 10, gap: 10 }}>
                    {optionNamesInExpenses && optionsFilter.length > 0 ? optionsFilter.map(option => (
                        <View style={{ flexDirection: 'row', paddingVertical: 10, borderWidth: 0.5, borderRadius: 10, alignItems: 'center', paddingHorizontal: 20 }} key={option.id}>
                            <View style={{ flex: 1 }}>
                                <Text>{option.name}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', gap: 6 }}>
                                <Pressable style={{ borderWidth: 0.5, borderRadius: 10, padding: 10, backgroundColor: 'blue' }} onPress={() => {
                                    onActive(option.id)
                                }}>
                                    <Text style={{ color: 'white', fontWeight: 'bold' }}>Activar</Text>
                                </Pressable>
                            </View>
                        </View>
                    )) : <Text style={{ textAlign: 'center' }}>No hay opciones desactivadas</Text>}
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({})