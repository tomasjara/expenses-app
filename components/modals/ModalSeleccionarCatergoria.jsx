import { Button, Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useExpensesStore } from '@/store/expensesStore'
import { Feather, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import ButtonBase from '../ButtonBase'

export const ModalSeleccionarCatergoria = ({ setModalNewOptionVisible, setModalDeleteOptionVisible, setCategory, categorySelected, setModalDisabledOptionsVisible, setOptionNameDisabled, setOptionIdDelete }) => {
    const [modalCategoriesVisible, setModalCategoriesVisible] = useState(false)
    const { categories } = useExpensesStore(state => state)
    return (
        <View>
            {/* Modal SELECCIONAR CATEGORIA: modalCategoriesVisible */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalCategoriesVisible}
                onRequestClose={() => {
                    setModalCategoriesVisible(false);
                }}>
                <Pressable style={{ alignItems: 'center', justifyContent: 'center', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.6)' }} onPress={() => setModalCategoriesVisible(false)}>
                    <Pressable style={{ backgroundColor: 'white', borderRadius: 10, height: '80%', width: '95%' }} onPress={() => { }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20 }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Configuración de categorias</Text>
                            <Pressable onPress={() => setModalCategoriesVisible(false)}>
                                <MaterialCommunityIcons name="window-close" size={24} color="black" />
                            </Pressable>
                        </View>
                        <ScrollView>
                            <View style={{ gap: 20, paddingHorizontal: 20, paddingBottom: 20 }}>
                                {categories && categories.map(category => {
                                    if (category.disabled) return
                                    return (
                                        <View style={{ flexDirection: 'row', paddingVertical: 10, borderWidth: 0.5, borderRadius: 10, alignItems: 'center' }} key={category.id}>
                                            <View style={{ flex: 1, marginStart: 6 }}>
                                                <Pressable style={{ flexDirection: 'row', gap: 6, flex: 1, alignItems: 'center' }} onPress={() => {
                                                    setCategory(category)
                                                    setModalCategoriesVisible(false)
                                                }}>
                                                    <View style={{ backgroundColor: category.color || '', height: 20, width: 8 }}></View>
                                                    <Text>{category.name || ''}</Text>
                                                </Pressable>
                                            </View>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 10 }}>
                                                <Pressable style={{ borderRadius: 10, padding: 10, backgroundColor: 'black' }} onPress={() => {
                                                    setModalNewOptionVisible(state => ({ ...state, type: 'edit', optionName: 'category', show: true, optionSelect: category }))
                                                }}>
                                                    <Feather name="edit" size={24} color="white" />
                                                </Pressable>
                                                <Pressable style={{ borderRadius: 10, padding: 10, backgroundColor: 'red' }} onPress={() => {
                                                    // removeCategory(category.id)
                                                    setModalDeleteOptionVisible(true)
                                                    setOptionIdDelete(category.id)
                                                }}>
                                                    <MaterialIcons name="delete-outline" size={24} color="white" />
                                                </Pressable>
                                            </View>
                                        </View>
                                    )
                                })}
                                <ButtonBase title={'Añadir una nueva categoría'} onPress={() => setModalNewOptionVisible(state => ({ ...state, type: 'create', optionName: 'category', show: true }))} />
                                <ButtonBase title={'Ver categorías desactivadas'} onPress={() => {
                                    setOptionNameDisabled('categories')
                                    setModalDisabledOptionsVisible(true)
                                }} />
                            </View>
                        </ScrollView>
                    </Pressable>
                </Pressable>
            </Modal>
            <Pressable style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, opacity: 0.6, alignItems: 'center'}} onPress={() => setModalCategoriesVisible(true)}>
                <Text style={{fontSize: 14}}> Categoria:</Text>
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
                                // borderWidth: 0.5,
                                borderWidth: categorySelected.id == category.id ? 1.5 : 0.5,
                                borderRadius: 10,
                                padding: 5,
                                gap: 5,
                                backgroundColor: categorySelected.id == category.id ? '#eaf4fc' : 'transparent'
                            }} onPress={() => {
                                setCategory(category)
                            }} >
                                <View style={{ height: 15, width: 15, borderRadius: 20, backgroundColor: category.color || '' }}></View>
                                <Text >{category.name || ''}</Text>
                            </Pressable>
                        </View>
                    )
                })}
            </View>
            {/* <Button title='Categorias' onPress={() => setModalCategoriesVisible(true)} /> */}
        </View>
    )
}

const styles = StyleSheet.create({})