import { ActivityIndicator, Button, Modal, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import uuid from 'react-native-uuid';
import { useExpensesStore } from '@/store/expensesStore';
import ColorPicker from 'react-native-wheel-color-picker';


export const UpdateCreateOptionExpense = ({ modalNewOptionVisible, setModalNewOptionVisible }) => {

    const [newOption, setNewOption] = useState({ name: '', description: '', color: '#138d75' })
    const [modalColorPickerVisible, setModalColorPickerVisible] = useState(false)

    const addPaymentMethod = useExpensesStore(state => state.addPaymentMethod)
    const updatePaymentMethod = useExpensesStore(state => state.updatePaymentMethod)
    const updateCategory = useExpensesStore(state => state.updateCategory)
    const addCategory = useExpensesStore(state => state.addCategory)

    useEffect(() => {
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
                {/* Selecto de color */}
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={modalColorPickerVisible}
                    onRequestClose={() => {
                        setModalColorPickerVisible(false)
                    }}>
                    <View>
                        <Button
                            onPress={() => setModalColorPickerVisible(false)}
                            color={'red'}
                            title='Cerrar' />
                        <Text>Color seleccionado: {newOption.color}</Text>
                        <View style={{ backgroundColor: newOption.color, width: 200, height: 100, borderRadius: 10 }}>
                        </View>
                    </View>

                    <View style={{ padding: 20, gap: 20 }}>
                        <ColorPicker
                            // ref={r => { this.picker = r }}
                            color={newOption.color}
                            // swatchesOnly={this.state.swatchesOnly}
                            onColorChange={color => setNewOption(prevState => ({ ...prevState, color: color }))}
                            // onColorChangeComplete={this.onColorChangeComplete}
                            thumbSize={40}
                            sliderSize={40}
                            noSnap={true}
                            row={false}
                            // swatchesLast={this.state.swatchesLast}
                            // swatches={this.state.swatchesEnabled}
                            // discrete={this.state.disc}
                            wheelLodingIndicator={<ActivityIndicator size={40} />}
                            sliderLodingIndicator={<ActivityIndicator size={20} />}
                            useNativeDriver={false}
                            useNativeLayout={false}
                        />
                    </View>
                </Modal>
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
                    <View style={{ gap: 10, marginBottom: 50 }}>
                        <Text>Color: {newOption.color}</Text>
                        <View style={{ backgroundColor: newOption.color, height: 60, borderRadius: 10, borderWidth: 0.5 }}></View>
                    </View>
                    <Button title='Selecciona un color' onPress={() => setModalColorPickerVisible(true)} />
                    <Button title='Agregar' color={'green'} onPress={onPress} />
                    <Button title='Cerrar' color={'red'} onPress={() => setModalNewOptionVisible(state => ({ ...state, show: false }))} />
                </View>
            </Modal>
        </>
    )
}