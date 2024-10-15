import { View, Text, Modal, Button, Pressable } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'

export const ModalSeleccionarMetodoDePago = ({ setModalNewOptionVisible, setModalDeleteOptionVisible, setModalDisabledOptionsVisible, setOptionNameDisabled, setOptionIdDelete, paymentMethods, setpaymentMethod, paymentMethodSelected }) => {

    const [modalPaymentMethodVisible, setModalPaymentMethodVisible] = useState(false)

    return (
        <View>
            <Modal
                animationType="slide"
                transparent={false}
                visible={modalPaymentMethodVisible}
                onRequestClose={() => {
                    setModalPaymentMethodVisible(false)
                }}>
                <View style={{ gap: 20, paddingHorizontal: 20, marginVertical: 30 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={{ fontSize: 20 }}>Seleccion de metodo de pago</Text>
                        <Button title='  +  ' color={'red'} onPress={() => setModalNewOptionVisible(state => ({ ...state, type: 'create', optionName: 'paymentMethod', show: true }))} />
                    </View>
                    {paymentMethods && paymentMethods.map(paymentMethod => {
                        if (paymentMethod.disabled) return
                        return (
                            <View style={{ flexDirection: 'row', }} key={paymentMethod.id}>
                                <View style={{ flexDirection: 'row', gap: 6 }}>
                                    <Button
                                        title={'Editar'}
                                        color={'blue'}
                                        onPress={() => {
                                            setModalNewOptionVisible(state => ({ ...state, type: 'edit', optionName: 'paymentMethod', show: true, optionSelect: paymentMethod }))
                                        }} />
                                    <Button
                                        title={'Eliminar'}
                                        color={'red'}
                                        onPress={() => {
                                            // removePaymentMethod(paymentMethod.id)
                                            setModalDeleteOptionVisible(true)
                                            setOptionIdDelete(paymentMethod.id)
                                        }} />
                                </View>
                                <View style={{ flex: 1, marginStart: 6 }}>
                                    <Button
                                        title={paymentMethod.name || ''}
                                        color={paymentMethod.color || ''}
                                        onPress={() => {
                                            setpaymentMethod(paymentMethod)
                                            setModalPaymentMethodVisible(false)
                                        }} />
                                </View>
                            </View>
                        )
                    })}

                    <Button title='Cerrar' color={'red'} onPress={() => setModalPaymentMethodVisible(false)} />
                    <Button title='Ver metodos de pago desactivados' color={'blue'} onPress={() => {
                        setOptionNameDisabled('paymentMethods')
                        setModalDisabledOptionsVisible(true)
                    }} />
                </View>
            </Modal>
            <Pressable style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, opacity: 0.6 }} onPress={() => setModalPaymentMethodVisible(true)}>
                <Text>Metodo de pago:</Text>
                <Ionicons name="settings-outline" size={24} color="black" />
            </Pressable>
            <View style={{ flexWrap: 'wrap', gap: 10, paddingHorizontal: 10, marginTop: 10 }}>
                {paymentMethods && paymentMethods.map(paymentMethod => {
                    if (paymentMethod.disabled) return
                    return (
                        <View key={paymentMethod.id} style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                            <Pressable style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'start',
                                borderWidth: 0.5,
                                borderRadius: 10,
                                padding: 5,
                                gap: 5,
                                backgroundColor: paymentMethodSelected.id == paymentMethod.id ? '#f9f9f9' : 'white'
                            }} onPress={() => {
                                setpaymentMethod(paymentMethod)
                            }} >
                                <View style={{ height: 20, width: 20, borderRadius: 20, backgroundColor: paymentMethod.color || '' }}></View>
                                <Text >{paymentMethod.name || ''}</Text>
                            </Pressable>
                            {paymentMethodSelected.id == paymentMethod.id ? <View style={{ backgroundColor: 'black', width: 20, height: 20, borderRadius: 10 }}></View> : null}
                        </View>
                    )
                })}
            </View>
            {/* <Button title='Metodo de pago' onPress={() => setModalPaymentMethodVisible(true)} /> */}
        </View>
    )
}