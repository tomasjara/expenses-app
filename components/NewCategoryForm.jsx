import { Button, Modal, Text, TextInput } from 'react-native'
import React, { useState } from 'react'
import uuid from 'react-native-uuid';
import { useCategoriesStore } from '@/store/categoriesStore';

export const NewCategoryForm = ({ modalCategoryCrudVisible, setModalCategoryCrudVisible }) => {

    const [newCategory, setNewCategory] = useState()
    const addCategory = useCategoriesStore(state => state.addCategory)

    const onChangeCategoryProp = (key, value) => { setNewCategory(prevState => ({ ...prevState, [key]: value })) }

    const onPress = () => {
        const newCategoryObj = {
            ...newCategory,
            id: uuid.v4(),
            color: "green",
        }
        addCategory(newCategoryObj)
        setModalCategoryCrudVisible(false)
    }

    return (
        <>
            <Modal
                animationType="fade"
                transparent={false}
                visible={modalCategoryCrudVisible}
                onRequestClose={() => {
                    setModalCategoryCrudVisible(false);
                }}>
                <Text style={{ fontSize: 20 }}>Formulario</Text>
                <TextInput
                    keyboardType='default'
                    onChangeText={(e) => onChangeCategoryProp('name', e)}
                    placeholder='Nombre: '
                    style={{ padding: 3, borderWidth: 1 }}
                />
                <TextInput
                    keyboardType='default'
                    onChangeText={(e) => onChangeCategoryProp('description', e)}
                    placeholder='Descripcion: '
                    style={{ padding: 3, borderWidth: 1 }}
                />
                <Button title='Agregar' color={'red'} onPress={onPress} />
                <Button title='Cerrar' color={'red'} onPress={() => setModalCategoryCrudVisible(false)} />
            </Modal>
        </>
    )
}