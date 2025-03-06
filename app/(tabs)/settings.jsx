import { Alert, Button, Pressable, StyleSheet, Text, View } from 'react-native';
import { ContainerScreen } from './../../components/ContainerScreen';
import { ExportImportFiles } from '../../components/ExportImportFiles';
import { useExpensesStore } from './../../store/expensesStore';
import { ContainerWidget } from '../../components/ContainerWidget';
import ButtonBase from '@/components/ButtonBase';
import { ModalComponent } from '../../components/modals/ModalComponent';
import { useState } from 'react';

export default function SettingsScreen() {

  const { cleanAllData } = useExpensesStore(state => state)
  const [modalVisibleDeleteData, setModalVisibleDeleteData] = useState(false)

  const onDeleteData = () => {
    setModalVisibleDeleteData(false)
    cleanAllData()
    Alert.alert("Datos eliminados", "Todos los datos han sido eliminados correctamente")
  }

  return (
    <ContainerScreen>
      <Text style={{ color: 'white', fontSize: 30 }}>Configuraciones</Text>
      <ContainerWidget>
        <View style={{ gap: 15 }}>
          {/* <Pressable style={{ backgroundColor: 'red', padding: 10, borderRadius: 10 }}
          // onPress={() => { cleanExpensesState() }}
          >
            <Text style={{ color: 'white', textAlign: 'center', fontWeight: '700', fontSize: 17 }}>Eliminar expenses</Text>
          </Pressable> */}
          {/* <ButtonBase title={'Configurar categorías'} customStyleText={{ textAlign: 'start' }} onPress={() => { }} /> */}
          {/* <ButtonBase title={'Configurar métodos de pagos'} customStyleText={{ textAlign: 'start' }} onPress={() => { }} /> */}
          <ExportImportFiles />
        </View>
      </ContainerWidget>

      <ContainerWidget>
        <ModalComponent modalVisible={modalVisibleDeleteData} setModalVisible={setModalVisibleDeleteData} >
          <View style={{ gap: 10 }}>
            <Text style={{ fontSize: 19, fontWeight: 'semibold', textAlign: 'center' }}>¿Estas seguro de eliminar todos sus datos registrados?</Text>
            <Text style={{ fontSize: 12, textAlign: 'center' }}>Incluye gastos, categorias y metodos de pago</Text>
            <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center', justifyContent: 'center' }}>
              <Button onPress={onDeleteData} title='Confirmar' color={'green'} />
              <Button onPress={() => setModalVisibleDeleteData(false)} title='Cencelar' color={'red'} />
            </View>
          </View>
        </ModalComponent>
        <ButtonBase title={'Eliminar datos'} customStyleContainer={{ backgroundColor: 'red' }} customStyleText={{ textAlign: 'center' }} onPress={() => { setModalVisibleDeleteData(true) }} />
      </ContainerWidget>

      {/* <Button
        title='Limpiar state de expenses'
        color={'red'}
        onPress={() => {
          cleanExpensesState(true)
        }}
      /> */}
    </ContainerScreen>
  );
}