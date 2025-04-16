import { Alert, Button, Pressable, StyleSheet, Text, View } from 'react-native';
import { ContainerScreen } from './../../components/ContainerScreen';
import { ExportImportFiles } from '../../components/ExportImportFiles';
import { useExpensesStore } from './../../store/expensesStore';
import { ContainerWidget } from '../../components/ContainerWidget';
import ButtonBase from '@/components/ButtonBase';
import { ModalComponent } from '../../components/modals/ModalComponent';
import { ModalConfigMetodoDePago } from '../../components/modals/ModalConfigMetodoDePago';
import { ModalConfigOption } from '../../components/modals/ModalConfigOption'
import { useState } from 'react';

export default function SettingsScreen() {

  const { cleanAllData, categories, paymentMethods } = useExpensesStore(state => state)
  const [modalVisibleDeleteData, setModalVisibleDeleteData] = useState(false)

  const [configCategoriesModalVisible, setConfigCategoriesModalVisible] = useState(false);
  const [configPaymentMethodsModalVisible, setConfigPaymentMethodsModalVisible] = useState(false);

  const onDeleteData = () => {
    setModalVisibleDeleteData(false)
    cleanAllData()
    Alert.alert("Datos eliminados", "Todos los datos han sido eliminados correctamente")
  }

  return (
    <ContainerScreen>
      <Text style={{ color: 'white', fontSize: 30, textAlign: 'center' }}>Configuraciones</Text>

      {/* <ContainerWidget>
        <View style={{ gap: 15 }}>
          <ExportImportFiles />
        </View>
      </ContainerWidget> */}

      <ContainerWidget>
        <ModalConfigOption
          title="Configuración de categorías"
          optionName="categories"
          options={categories}
          modalVisible={configCategoriesModalVisible}
          setModalVisible={setConfigCategoriesModalVisible}
        />
        <ButtonBase customStyleText={{ textAlign: 'start' }} title="Configurar categorías" onPress={() => setConfigCategoriesModalVisible(true)} />
        <ModalConfigOption
          title="Configuración de métodos de pago"
          optionName="paymentMethods"
          options={paymentMethods}
          modalVisible={configPaymentMethodsModalVisible}
          setModalVisible={setConfigPaymentMethodsModalVisible}
        />
        <ButtonBase customStyleText={{ textAlign: 'start' }} title="Configurar método de pago" onPress={() => setConfigPaymentMethodsModalVisible(true)} />
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
    </ContainerScreen>
  );
}