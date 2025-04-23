import { ActivityIndicator, Button, Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import uuid from 'react-native-uuid';
import { useExpensesStore } from '@/store/expensesStore';
import ColorPicker from 'react-native-wheel-color-picker';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import ButtonBase from './ButtonBase';

const COLORS8 = [
    "#486b00", // grass
    "#a2c523", // lime
    "#003b46", // deep aqua
    "#ee693f", // carrot
    "#cf3721", // tomato
    "#c99e10", // gold
    "#E4B600", // sunflower
    "#4d648d", // blueberry
    "#7d4427", // earth
    "#4897d8", // electric blue 

];
const TitleModal = ({ modalNewOptionVisible, setModalNewOptionVisible, optionSingular }) => {

    const title = optionSingular === 'categoría' ? 'Edita tu categoría' : 'Edita tu método de pago'

    return (
        <View style={{ flexDirection: 'row', gap: 19, padding: 20, justifyContent: 'start', alignItems: 'center', }}>
            <Pressable onPress={() => setModalNewOptionVisible(state => ({ ...state, show: false }))}>
                <AntDesign name="leftcircleo" size={30} color="black" />
            </Pressable>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{title}</Text>
        </View>
    )
}

export const UpdateCreateOptionExpense = ({ modalNewOptionVisible, setModalNewOptionVisible, optionSingular = '' }) => {

    const [newOption, setNewOption] = useState({ name: '', description: '', color: COLORS8[0] })
    const [modalColorPickerVisible, setModalColorPickerVisible] = useState(false)

    const addPaymentMethod = useExpensesStore(state => state.addPaymentMethod)
    const updatePaymentMethod = useExpensesStore(state => state.updatePaymentMethod)
    const updateCategory = useExpensesStore(state => state.updateCategory)
    const addCategory = useExpensesStore(state => state.addCategory)

    useEffect(() => {
        if (modalNewOptionVisible && modalNewOptionVisible.type === 'create') {
            setNewOption(prevState => ({ ...prevState, color: COLORS8[0] }))
        }
        if (modalNewOptionVisible && modalNewOptionVisible.type === 'edit') {
            setNewOption(modalNewOptionVisible.optionSelect)
        }
    }, [modalNewOptionVisible])

    const onChangeOptionProp = (key, value) => { setNewOption(prevState => ({ ...prevState, [key]: value })) }
    const closeModal = () => setModalNewOptionVisible(state => ({ ...state, show: false }))

    const onPress = () => {
        if (!newOption || !newOption.name) {
            console.error('newOption requiered and name is required');
            return
        }
        const newOptionyObj = {
            ...newOption,
            id: uuid.v4(),
            disabled: false,
        }
        if (modalNewOptionVisible.type === 'edit') {
            if (modalNewOptionVisible.optionName === 'categories') {
                updateCategory(newOption);
                closeModal()
            }
            if (modalNewOptionVisible.optionName === 'paymentMethods') {
                updatePaymentMethod(newOption);
                closeModal()
            }
        }
        if (modalNewOptionVisible.type === 'create') {
            if (modalNewOptionVisible.optionName === 'categories') {
                addCategory(newOptionyObj)
                closeModal()
            }
            if (modalNewOptionVisible.optionName === 'paymentMethods') {
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
                {/* Selecto de color */}
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalColorPickerVisible}
                    onRequestClose={() => {
                        setModalColorPickerVisible(false)
                    }}>
                    <Pressable style={{ justifyContent: 'center', height: '100%', paddingHorizontal: 50, backgroundColor: 'rgba(0, 0, 0, 0.6)' }} onPress={() => setModalColorPickerVisible(false)}>
                        <Pressable style={{ backgroundColor: 'white', paddingVertical: 20, borderRadius: 10, gap: 10 }} onPress={() => { }}>
                            <Text style={{ marginStart: 28, color: 'black', fontWeight: 'bold', fontSize: 20 }}>Escoge un color</Text>
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <View style={{ gap: 10, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', width: 250 }}>
                                    {COLORS8.map((color, index) =>
                                        <Pressable key={index}
                                            onPress={() => setNewOption(prevState => ({ ...prevState, color: color }))}
                                            style={{ borderRadius: 10, width: 40, height: 40, backgroundColor: color, justifyContent: 'center', alignItems: 'center' }}>
                                            {newOption.color === color && <AntDesign name="check" size={24} color="white" />}
                                        </Pressable>
                                    )}
                                </View>
                            </View>
                        </Pressable>
                    </Pressable>
                </Modal>
                <View style={{ padding: 20, gap: 10 }}>
                    <TitleModal modalNewOptionVisible={modalNewOptionVisible} setModalNewOptionVisible={setModalNewOptionVisible} optionSingular={optionSingular} />
                    <TextInput
                        keyboardType='default'
                        value={newOption.name}
                        onChangeText={(e) => onChangeOptionProp('name', e)}
                        placeholder='Nombre'
                        style={styles.input}
                    />
                    <View style={{ gap: 10, marginBottom: 20 }}>
                        <Pressable
                            onPress={() => setModalColorPickerVisible(true)}
                            style={{ backgroundColor: newOption.color, height: 60, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>Seleccionar color</Text>
                        </Pressable>
                    </View>
                    <ButtonBase title={'Aceptar'} onPress={onPress} />
                </View>
            </Modal>
        </>
    )
}

const styles = StyleSheet.create({
    input: {
        borderRadius: 10,
        padding: 10,
        borderWidth: 1,
        marginBottom: 10
    },
});