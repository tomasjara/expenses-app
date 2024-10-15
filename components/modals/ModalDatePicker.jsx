import { Button, Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';

export const ModalDatePicker = ({ dateValue, setDateValue }) => {
    const [modalDatePickerVisible, setModalDatePickerVisible] = useState(false)
    return (
        <View>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalDatePickerVisible}
                onRequestClose={() => {
                    setModalDatePickerVisible(false);
                }}
            >
                <Pressable style={{ justifyContent: 'center', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.6)' }} onPress={() => setModalDatePickerVisible(false)}>
                    <Pressable style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, }} onPress={() => { }}>
                        <DateTimePicker
                            mode="single"
                            date={dateValue}
                            onChange={(params) => {
                                setDateValue(params.date)
                                setModalDatePickerVisible(false);
                            }}
                        />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20, paddingHorizontal: 20 }}>
                            <Text>{dayjs(dateValue).format('DD/MM/YYYY')}</Text>
                            <Pressable style={{ borderRadius: 10, paddingVertical: 10, paddingHorizontal: 30, backgroundColor: '#2383e2' }} onPress={() => {
                                setDateValue(new Date())
                                setModalDatePickerVisible(false)
                            }}>
                                <Text style={{ color: 'white' }}>Hoy</Text>
                            </Pressable>
                        </View>
                    </Pressable>
                </Pressable>
            </Modal>
            <Pressable style={{
                borderRadius: 10,
                padding: 10,
                borderWidth: 1,
                marginBottom: 10, height: 45, flexDirection: 'row'
            }} onPress={() => setModalDatePickerVisible(true)}>
                <Text style={{ opacity: 0.6 }}>Fecha: </Text>
                <Text>{dayjs(dateValue).format('DD/MM/YYYY')} </Text>
                <Text style={{ opacity: 0.6 }}>{dayjs(dateValue).format('DD/MM/YYYY') === dayjs(new Date()).format('DD/MM/YYYY') && <Text style={{ opacity: 0.6 }}>- Hoy</Text>}</Text>
            </Pressable>
            {/* <Button title="Fecha" onPress={() => setModalDatePickerVisible(true)} /> */}
        </View>
    )
}

const styles = StyleSheet.create({})