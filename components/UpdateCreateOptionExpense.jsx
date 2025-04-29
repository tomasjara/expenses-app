import { ActivityIndicator, Button, Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import uuid from 'react-native-uuid';
import { useExpensesStore } from '@/store/expensesStore';
import ColorPicker from 'react-native-wheel-color-picker';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import ButtonBase from './ButtonBase';
import RBSheet from 'react-native-raw-bottom-sheet';

function ButtonAddExpense({ }) {
    const refRBSheet = useRef();
    const { setModalUpdateCreateExpense, expenses } = useExpensesStore(state => state)

    return (
        <View style={{ flex: 1 }}>
            <RBSheet
                ref={refRBSheet}
                draggable
                height={600}
                customModalProps={{
                    statusBarTranslucent: false,
                }}
                closeOnPressBack
                customAvoidingViewProps={{
                    enabled: true,
                }}
                customStyles={{
                    container: {
                        backgroundColor: 'white',
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10,
                    },
                    draggableIcon: {
                        width: 50,
                    },
                }}>
                <UpdateCreateExpenseModal refRBSheet={refRBSheet} />
            </RBSheet>
            <Pressable
                onPress={() => {
                    refRBSheet.current.open()
                    setModalUpdateCreateExpense({
                        // show: true, 
                        type: 'create'
                    })
                }}
                style={{ backgroundColor: 'white', opacity: 0.95, position: 'absolute', padding: 10, bottom: 20, right: 15, borderRadius: 20, shadowRadius: 10, elevation: 5, borderColor: 'black', borderWidth: 1 }}>
                <Ionicons name="add-circle-sharp" size={45} color="black" />
            </Pressable>
        </View>
    );
}

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

export const UpdateCreateOptionExpense = ({ textNewOption, refRBSheet, modalNewOptionVisible, setModalNewOptionVisible, optionSingular = '' }) => {

    const [newOption, setNewOption] = useState({ name: '', description: '', color: COLORS8[0] })
    const [modalColorPickerVisible, setModalColorPickerVisible] = useState(false)

    const addPaymentMethod = useExpensesStore(state => state.addPaymentMethod)
    const updatePaymentMethod = useExpensesStore(state => state.updatePaymentMethod)
    const updateCategory = useExpensesStore(state => state.updateCategory)
    const addCategory = useExpensesStore(state => state.addCategory)

    useEffect(() => {
        if (modalNewOptionVisible && modalNewOptionVisible.type === 'create') {
            setNewOption(prevState => ({ name: '', description: '', color: COLORS8[0] }))
        }
        if (modalNewOptionVisible && modalNewOptionVisible.type === 'edit') {
            setNewOption(modalNewOptionVisible.optionSelect)
        }
    }, [modalNewOptionVisible])

    const onChangeOptionProp = (key, value) => { setNewOption(prevState => ({ ...prevState, [key]: value })) }
    const closeModal = () => setModalNewOptionVisible(state => ({ ...state, show: false }))

    const onPress = () => {
        if (!newOption || !newOption.name) {
            // TODO
            // console.log('newOption requiered and name is required');
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
                refRBSheet.current.close()
                closeModal()
            }
            if (modalNewOptionVisible.optionName === 'paymentMethods') {
                updatePaymentMethod(newOption);
                refRBSheet.current.close()

                closeModal()
            }
        }
        if (modalNewOptionVisible.type === 'create') {
            if (modalNewOptionVisible.optionName === 'categories') {
                addCategory(newOptionyObj)
                refRBSheet.current.close()

                closeModal()
            }
            if (modalNewOptionVisible.optionName === 'paymentMethods') {
                addPaymentMethod(newOptionyObj)
                refRBSheet.current.close()

                closeModal()
            }
        }
    }

    return (
        <>
            <RBSheet
                ref={refRBSheet}
                draggable
                height={340}
                customModalProps={{
                    statusBarTranslucent: false,
                }}
                closeOnPressBack
                customAvoidingViewProps={{
                    enabled: true,
                }}
                customStyles={{
                    container: {
                        backgroundColor: 'white',
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10,
                    },
                    draggableIcon: {
                        width: 50,
                    },
                }}>
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
                    <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 }}>{optionSingular === 'categoría' ? modalNewOptionVisible.type === 'edit' ? 'Edita tu categoría' : 'Crea una nueva categoría' : modalNewOptionVisible.type === 'edit' ? 'Edita tu método de pago' : 'Crea un nuevo método de pago'}</Text>
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
            </RBSheet>
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