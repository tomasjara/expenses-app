import { Button, StyleSheet, Text } from 'react-native';
import { ContainerScreen } from './../../components/ContainerScreen';
import { ExportFiles } from './../../components/ExportFiles';
import { useExpensesStore } from './../../store/expensesStore';

export default function SettingsScreen() {

  const { cleanExpensesState } = useExpensesStore(state => state)

  return (
    <ContainerScreen>
      <Text style={{ color: 'white', fontSize: 30 }}>Configuraciones</Text>
      <Button
        title='Limpiar state de expenses'
        color={'red'}
        onPress={() => {
          cleanExpensesState(true)
        }}
      />
      <ExportFiles />
    </ContainerScreen>
  );
}