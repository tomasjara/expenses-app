import { Button, Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import ButtonBase from '../ButtonBase'

export const ModalConfirmExpenseDelete = ({ onDeleteOption = () => { }, }) => {
  const [visible, setVisible] = useState(false)

  const onDelete = () => {
    onDeleteOption()
    setVisible(false)
  }

  return (
    <>
      <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        onRequestClose={() => {
          setVisible(false)
        }}>

        <Pressable style={{ justifyContent: 'center', height: '100%', paddingHorizontal: 20, backgroundColor: 'rgba(0, 0, 0, 0.6)' }} onPress={() => setVisible(false)}>
          <Pressable style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, }} onPress={() => { }}>
            <View style={{ gap: 10 }}>
              <Text style={{ fontSize: 19, fontWeight: 'semibold', textAlign: 'center' }}>¿Estas seguro de eliminar este gasto?</Text>
              <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center', justifyContent: 'center' }}>
                <Button onPress={onDelete} title='Confirmar' color={'green'} />
                <Button onPress={() => setVisible(false)} title='Cencelar' color={'red'} />
              </View>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
      <ButtonBase title={'Eliminar'} onPress={() => setVisible(true)} />
    </>
  )
}

const styles = StyleSheet.create({})