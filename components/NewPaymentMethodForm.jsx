import { Modal, Button, Text, TextInput } from 'react-native'
import React, { useState } from 'react'
import { usePaymentMethodsStore } from '@/store/paymentMethodsStore'
import uuid from 'react-native-uuid';

export const NewPaymentMethodForm = ({ modalPaymentMethodCrudVisible, setModalPaymentMethodCrudVisible }) => {
  
  const [newPaymentMethod, setNewPaymentMethod] = useState()
  const addPaymentMethod = usePaymentMethodsStore(state => state.addPaymentMethod)

  const onChangePaymentMethodProp = (key, value) => { setNewPaymentMethod(prevState => ({ ...prevState, [key]: value })) }

  const onPress = () => {
      const newPaymentMethodObj = {
          ...newPaymentMethod,
          id: uuid.v4(),
          color: "green",
      }
      addPaymentMethod(newPaymentMethodObj)
      setModalPaymentMethodCrudVisible(false)
  }
  
  return (
    <>
      <Modal
        animationType="fade"
        transparent={false}
        visible={modalPaymentMethodCrudVisible}
        onRequestClose={() => {
          setModalPaymentMethodCrudVisible(false);
        }}>
            <Text style={{ fontSize: 20 }}>Formulario</Text>
                <TextInput
                    keyboardType='default'
                    onChangeText={(e) => onChangePaymentMethodProp('name', e)}
                    placeholder='Nombre: '
                    style={{ padding: 3, borderWidth: 1 }}
                />
                <TextInput
                    keyboardType='default'
                    onChangeText={(e) => onChangePaymentMethodProp('description', e)}
                    placeholder='Descripcion: '
                    style={{ padding: 3, borderWidth: 1 }}
                />
                <Button title='Agregar' color={'red'} onPress={onPress} />
        <Button title='Cerrar' color={'red'} onPress={() => setModalPaymentMethodCrudVisible(false)} />
      </Modal>
    </>
  )
}