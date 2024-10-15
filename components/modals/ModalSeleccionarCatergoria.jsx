import { Button, Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useExpensesStore } from '@/store/expensesStore'
import { Ionicons } from '@expo/vector-icons'

export const ModalSeleccionarCatergoria = ({ setModalNewOptionVisible, setModalDeleteOptionVisible, setCategory, categorySelected, setModalDisabledOptionsVisible, setOptionNameDisabled, setOptionIdDelete }) => {
    const [modalCategoriesVisible, setModalCategoriesVisible] = useState(false)
    const { categories } = useExpensesStore(state => state)

    return (
        <View>
            {/* Modal SELECCIONAR CATEGORIA: modalCategoriesVisible */}
            <Modal
                animationType="slide"
                transparent={false}
                visible={modalCategoriesVisible}
                onRequestClose={() => {
                    setModalCategoriesVisible((state) => !state);
                }}>

                <View style={{ gap: 20, paddingHorizontal: 20, marginVertical: 30 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={{ fontSize: 20 }}>Seleccion de categorias</Text>
                        <Button title='  +  ' color={'red'} onPress={() => setModalNewOptionVisible(state => ({ ...state, type: 'create', optionName: 'category', show: true }))} />
                    </View>
                    {categories && categories.map(category => {
                        if (category.disabled) return
                        return (
                            <View style={{ flexDirection: 'row' }} key={category.id}>
                                <View style={{ flexDirection: 'row', gap: 6 }}>
                                    <Button
                                        title={'Editar'}
                                        color={'blue'}
                                        onPress={() => {
                                            setModalNewOptionVisible(state => ({ ...state, type: 'edit', optionName: 'category', show: true, optionSelect: category }))
                                        }} />
                                    <Button
                                        title={'Eliminar'}
                                        color={'red'}
                                        onPress={() => {
                                            // removeCategory(category.id)
                                            setModalDeleteOptionVisible(true)
                                            setOptionIdDelete(category.id)
                                        }} />
                                </View>
                                <View style={{ flex: 1, marginStart: 6 }}>
                                    <Button
                                        key={category.id}
                                        title={category.name || ''}
                                        color={category.color || ''}
                                        onPress={() => {
                                            setCategory(category)
                                            setModalCategoriesVisible(false)
                                        }} />
                                </View>
                            </View>
                        )
                    })}
                    <Button title='Cerrar' color={'red'} onPress={() => setModalCategoriesVisible(false)} />
                    <Button title='Ver categorias desactivadas' color={'blue'} onPress={() => {
                        setOptionNameDisabled('categories')
                        setModalDisabledOptionsVisible(true)
                    }} />
                </View>
            </Modal>
            <Pressable style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, opacity: 0.6 }} onPress={() => setModalCategoriesVisible(true)}>
                <Text>Categoria:</Text>
                <Ionicons name="settings-outline" size={24} color="black" />
            </Pressable>
            <View style={{ flexWrap: 'wrap', gap: 10, paddingHorizontal: 10, marginTop: 10 }}>
                {categories && categories.map(category => {
                    if (category.disabled) return
                    return (
                        <View key={category.id} style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                            <Pressable style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'start',
                                borderWidth: 0.5,
                                borderRadius: 10,
                                padding: 5,
                                gap: 5,
                                backgroundColor: categorySelected.id == category.id ? '#f9f9f9' : 'white'
                            }} onPress={() => {
                                setCategory(category)
                            }} >
                                <View style={{ height: 20, width: 20, borderRadius: 20, backgroundColor: category.color || '' }}></View>
                                <Text >{category.name || ''}</Text>
                            </Pressable>
                            {categorySelected.id == category.id ? <View style={{ backgroundColor: 'black', width: 20, height: 20, borderRadius: 10 }}></View> : null}
                        </View>
                    )
                })}
            </View>
            {/* <Button title='Categorias' onPress={() => setModalCategoriesVisible(true)} /> */}
        </View>
    )
}

const styles = StyleSheet.create({})