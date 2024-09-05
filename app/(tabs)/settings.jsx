import { StyleSheet, Text } from 'react-native';
import { ContainerScreen } from '@/components/ContainerScreen';

export default function SettingsScreen() {
  return (
    <ContainerScreen>
      <Text style={{ color: 'white', fontSize: 30 }}>Configuraciones</Text>
    </ContainerScreen>
  );
}