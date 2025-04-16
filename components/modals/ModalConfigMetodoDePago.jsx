import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Modal, Pressable, ScrollView, Button } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ButtonBase from '../ButtonBase';
// import { useExpensesStore } from '../../store/useExpensesStore';
import { useExpensesStore } from '../../store/expensesStore';
import { UpdateCreateOptionExpense } from '../UpdateCreateOptionExpense'
import { ModalConfirmOptionDelete } from '../modals/ModalConfirmOptionDelete'
import { ModalDisabledOption } from '../modals/ModalDisabledOption'

export const ModalConfigMetodoDePago = () => {
    const { paymentMethods } = useExpensesStore(state => state)
    const [modalVisible, setModalVisible] = useState(false)
    const [modalNewOptionVisible, setModalNewOptionVisible] = useState({ show: false })
    const [modalDeleteOptionVisible, setModalDeleteOptionVisible] = useState(false)
    const [optionIdDelete, setOptionIdDelete] = useState()
    const [optionNameDisabled, setOptionNameDisabled] = useState()
    const [modalDisabledOptionsVisible, setModalDisabledOptionsVisible] = useState(false)

    return (
        <>
            <ModalConfirmOptionDelete optionId={optionIdDelete} setVisible={setModalDeleteOptionVisible} visible={modalDeleteOptionVisible} />
            <UpdateCreateOptionExpense modalNewOptionVisible={modalNewOptionVisible} setModalNewOptionVisible={setModalNewOptionVisible} />
            <ModalDisabledOption optionName={optionNameDisabled} visible={modalDisabledOptionsVisible} setVisible={setModalDisabledOptionsVisible} />

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(false)
                }}>
                <Pressable style={{ alignItems: 'center', justifyContent: 'center', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.6)' }} onPress={() => setModalVisible(false)} >
                    <Pressable style={{ backgroundColor: 'white', gap: 20, borderRadius: 10, height: '80%', width: '95%' }}  >
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20 }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Seleccion de metodo de pago</Text>
                            <Pressable onPress={() => setModalVisible(false)}>
                                <MaterialCommunityIcons name="window-close" size={24} color="black" />
                            </Pressable>
                        </View>
                        <View>

                            <ScrollView keyboardShouldPersistTaps="handled">
                                <View style={{ gap: 20, paddingHorizontal: 20, paddingBottom: 20 }}>
                                    {paymentMethods && paymentMethods.map(paymentMethod => {
                                        if (paymentMethod.disabled) return
                                        return (
                                            <View style={{ flexDirection: 'row', paddingVertical: 10, borderWidth: 0.5, borderRadius: 10, alignItems: 'center' }} key={paymentMethod.id}>
                                                <View style={{ flex: 1, marginStart: 6 }}>
                                                    <View style={{ backgroundColor: paymentMethod.color || '', height: 20, width: 8 }}></View>
                                                    <Text>{paymentMethod.name || ''}</Text>
                                                </View>
                                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 10 }}>
                                                    <Pressable style={{ borderRadius: 10, padding: 10, backgroundColor: 'black' }} onPress={() => {
                                                        setModalNewOptionVisible(state => ({ ...state, type: 'edit', optionName: 'paymentMethod', show: true, optionSelect: paymentMethod }))
                                                    }} >
                                                        <Feather name="edit" size={24} color="white" />
                                                    </Pressable>
                                                    <Pressable style={{ borderRadius: 10, padding: 10, backgroundColor: 'red' }} onPress={() => {
                                                        setModalDeleteOptionVisible(true)
                                                        setOptionIdDelete(paymentMethod.id)
                                                    }} >
                                                        <MaterialIcons name="delete-outline" size={24} color="white" />
                                                    </Pressable>
                                                </View>

                                            </View>
                                        )
                                    })}
                                    <ButtonBase title={'Añadir un nuevo método de pago'} onPress={() => setModalNewOptionVisible(state => ({ ...state, type: 'create', optionName: 'paymentMethod', show: true }))} />
                                    <ButtonBase title={'Ver métodos de pagos desactivados'} onPress={() => {
                                        setOptionNameDisabled('paymentMethods')
                                        setModalDisabledOptionsVisible(true)
                                    }} />
                                </View>
                            </ScrollView>
                        </View>

                    </Pressable>
                </Pressable>
            </Modal>
            <ButtonBase title={'Configurar metodo de pago'} customStyleText={{ textAlign: 'start' }} onPress={() => setModalVisible(true)} />
            {/* <Pressable onPress={() => setModalVisible(true)} style={{ padding: 10, borderRadius: 10, backgroundColor: 'white', marginTop: 10 }}>
                <Text>Configurar metodo de pago</Text>
            </Pressable> */}
        </>

    );
};