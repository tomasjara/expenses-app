import { Button, Modal, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import uuid from 'react-native-uuid';
import { useExpensesStore } from '@/store/expensesStore';


export const UpdateCreateOptionExpense = ({ modalNewOptionVisible, setModalNewOptionVisible }) => {

    const [newOption, setNewOption] = useState({ name: '', description: '' })

    const addPaymentMethod = useExpensesStore(state => state.addPaymentMethod)
    const updatePaymentMethod = useExpensesStore(state => state.updatePaymentMethod)
    const updateCategory = useExpensesStore(state => state.updateCategory)
    const addCategory = useExpensesStore(state => state.addCategory)

    useEffect(() => {
        if (modalNewOptionVisible && modalNewOptionVisible.type === 'edit') {
            console.log('PRUEBAA');
            setNewOption(modalNewOptionVisible.optionSelect)
        }
    }, [modalNewOptionVisible])

    const onChangeOptionProp = (key, value) => { setNewOption(prevState => ({ ...prevState, [key]: value })) }
    const closeModal = () => setModalNewOptionVisible(state => ({ ...state, show: false }))

    const onPress = () => {
        // ! Name obligatorio
        if (!newOption || !newOption.name) {
            console.error('newOption requiered and name is required');
            return
        }

        const newOptionyObj = {
            ...newOption,
            id: uuid.v4(),
            color: "green",
        }
        if (modalNewOptionVisible.type === 'edit') {
            if (modalNewOptionVisible.optionName === 'category') {
                updateCategory(newOption);
                closeModal()
            }
            if (modalNewOptionVisible.optionName === 'paymentMethod') {
                updatePaymentMethod(newOption);
                closeModal()
            }
        }
        if (modalNewOptionVisible.type === 'create') {
            if (modalNewOptionVisible.optionName === 'category') {
                addCategory(newOptionyObj)
                closeModal()
            }
            if (modalNewOptionVisible.optionName === 'paymentMethod') {
                addPaymentMethod(newOptionyObj)
                closeModal()
            }
        }
    }

    return (
        <>
            <Modal
                animationType="fade"
                transparent={false}
                visible={modalNewOptionVisible.show}
                onRequestClose={() => {
                    setModalNewOptionVisible(state => ({ ...state, show: false }));
                }}>
                <View style={{ padding: 20, gap: 10 }}>
                    <Text style={{ fontSize: 20 }}>Formulario</Text>
                    <Text style={{ fontSize: 20 }}>{modalNewOptionVisible.optionName} - {modalNewOptionVisible.type}</Text>
                    <TextInput
                        keyboardType='default'
                        value={newOption.name}
                        onChangeText={(e) => onChangeOptionProp('name', e)}
                        placeholder='Nombre: '
                        style={{ padding: 3, borderWidth: 1 }}
                    />
                    <TextInput
                        keyboardType='default'
                        value={newOption.description}
                        onChangeText={(e) => onChangeOptionProp('description', e)}
                        placeholder='Descripcion: '
                        style={{ padding: 3, borderWidth: 1 }}
                    />

                    <Button title='Agregar' color={'green'} onPress={onPress} />
                    <Button title='Cerrar' color={'red'} onPress={() => setModalNewOptionVisible(state => ({ ...state, show: false }))} />
                </View>
            </Modal>
        </>
    )
}