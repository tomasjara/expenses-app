import { Alert, Button, Text, View } from 'react-native';
import { ContainerScreen } from './../../components/ContainerScreen';
import { useExpensesStore } from './../../store/expensesStore';
import { ContainerWidget } from '../../components/ContainerWidget';
import ButtonBase from '@/components/ButtonBase';
import { ModalComponent } from '../../components/modals/ModalComponent';
import { ModalConfigMetodoDePago } from '../../components/modals/ModalConfigMetodoDePago';
import { ModalConfigCategoria } from '../../components/modals/ModalConfigCategoria';
import { useState } from 'react';
import { exportBackup, importBackup } from '../../utils/backupService';

export default function SettingsScreen() {

  const [modalVisibleDeleteData, setModalVisibleDeleteData] = useState(false)
  const { cleanAllData } = useExpensesStore(state => state)

  const onDeleteData = () => {
    setModalVisibleDeleteData(false)
    cleanAllData()
    Alert.alert("Datos eliminados", "Todos los datos han sido eliminados correctamente")
  }

  return (
    <ContainerScreen>
      <Text style={{ color: 'white', fontSize: 30, textAlign: 'center' }}>Configuraciones</Text>
      <ContainerWidget>
        <ModalConfigMetodoDePago />
        <ModalConfigCategoria />
      </ContainerWidget>
      {/* <ContainerWidget>
        <ButtonBase title="Exportar Backup" onPress={exportBackup} />
        <ButtonBase title="Importar Backup" onPress={importBackup} />
      </ContainerWidget> */}
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
    </ContainerScreen>
  );
}