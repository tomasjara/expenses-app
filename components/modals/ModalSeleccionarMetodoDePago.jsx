import { View, Text, Modal, Button } from 'react-native'
import React, { useState } from 'react'

export const ModalSeleccionarMetodoDePago = ({setModalNewOptionVisible, setModalDeleteOptionVisible, setModalDisabledOptionsVisible, setOptionNameDisabled, setOptionIdDelete, paymentMethods, setpaymentMethod }) => {

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
            <Button title='Metodo de pago' onPress={() => setModalPaymentMethodVisible(true)} />
        </View>
    )
}