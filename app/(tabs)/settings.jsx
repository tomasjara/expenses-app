import { Button, Pressable, StyleSheet, Text, View } from 'react-native';
import { ContainerScreen } from './../../components/ContainerScreen';
import { ExportFiles } from './../../components/ExportFiles';
import { useExpensesStore } from './../../store/expensesStore';
import { ContainerWidget } from '../../components/ContainerWidget';

export default function SettingsScreen() {

  const { cleanExpensesState } = useExpensesStore(state => state)

  return (
    <ContainerScreen>
      <Text style={{ color: 'white', fontSize: 30 }}>Configuraciones</Text>
      <ContainerWidget>
        <View style={{ gap: 20 }}>
          <Pressable style={{ backgroundColor: 'red', padding: 10, borderRadius: 10 }}
          // onPress={() => { cleanExpensesState() }}
          >
            <Text style={{ color: 'white', textAlign: 'center', fontWeight: '700', fontSize: 17 }}>Eliminar expenses</Text>
          </Pressable>
          <ExportFiles />
        </View>
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