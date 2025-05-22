import { Text, View } from 'react-native';
import { ContainerScreen } from './../../components/ContainerScreen';
import { useExpensesStore } from './../../store/expensesStore';
import { ContainerWidget } from '../../components/ContainerWidget';
import ButtonBase from '@/components/ButtonBase';
import { ModalConfigMetodoDePago } from '../../components/modals/ModalConfigMetodoDePago';
import { ModalConfigCategoria } from '../../components/modals/ModalConfigCategoria';
import { useRef } from 'react';
import { exportBackup, importBackup } from '../../utils/backupService';
import RBSheet from 'react-native-raw-bottom-sheet';
import Toast from 'react-native-toast-message';

export default function SettingsScreen() {

  const { cleanAllData, expenses, categories, paymentMethods } = useExpensesStore(state => state)

  const refRBSheet = useRef()

  const onDeleteData = () => {
    cleanAllData()
    refRBSheet.current.close()
    Toast.show({
      type: 'success',
      text1: 'Todos los datos han sido eliminados correctamente',
    })
  }

  return (
    <View style={{ height: '100%', backgroundColor: 'black' }}>
      <ContainerScreen>
        <Text style={{ color: 'white', fontSize: 30, textAlign: 'center' }}>Configuraciones</Text>
        <ContainerWidget>
          <ModalConfigMetodoDePago />
          <ModalConfigCategoria />
        </ContainerWidget>
        <ContainerWidget>
          <ButtonBase customStyleText={{ textAlign: 'start' }} title="Exportar copia de seguridad" onPress={() => exportBackup({ expenses, categories, paymentMethods })} />
          <ButtonBase customStyleText={{ textAlign: 'start' }} title="Importar copia de seguridad" onPress={() => importBackup()} />
        </ContainerWidget>
        {/* delete data */}
        <ContainerWidget>
          <RBSheet
            ref={refRBSheet}
            draggable
            height={320}
            customModalProps={{
              statusBarTranslucent: false,
            }}
            closeOnPressBack
            customAvoidingViewProps={{
              enabled: true,
            }}
            customStyles={{
              container: {
                backgroundColor: 'white',
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
              },
              draggableIcon: {
                width: 50,
              },
            }}>
            <View style={{ paddingHorizontal: 10 }}>
              <Text style={{ fontSize: 19, fontWeight: 'bold', textAlign: 'center', marginBottom: 15 }}>¿Estás seguro de que deseas eliminar todos los datos de la aplicación?</Text>
              <Text style={{ fontSize: 12, textAlign: 'center', marginBottom: 15 }}>Esta acción eliminará permanentemente todos tus gastos, categorías y métodos de pago.</Text>
              <Text style={{ fontSize: 12, textAlign: 'start', paddingHorizontal: 20 }}>Se crearán valores por defecto:</Text>
              <Text style={{ fontSize: 12, textAlign: 'start', paddingHorizontal: 20 }}>Categoría: Sin categoría</Text>
              <Text style={{ fontSize: 12, textAlign: 'start', paddingHorizontal: 20 }}>Método de pago: Sin especificar</Text>
              <Text style={{ fontSize: 12, textAlign: 'start', color: 'red', paddingHorizontal: 20, marginBottom: 25 }}>Esta acción no se puede deshacer.</Text>
              <View style={{ flexDirection: 'row', gap: 25, alignItems: 'center', justifyContent: 'center' }}>
                <ButtonBase onPress={() => refRBSheet.current.close()} title='Cancelar' color={'red'} />
                <ButtonBase onPress={onDeleteData} title='Eliminar datos' color={'green'} />
              </View>
            </View>
          </RBSheet>
          <ButtonBase title={'Eliminar datos'} customStyleContainer={{ backgroundColor: 'red' }} customStyleText={{ textAlign: 'center' }} onPress={() => { refRBSheet.current.open() }} />
        </ContainerWidget>
      </ContainerScreen>
      <Toast />
    </View>
  );
}