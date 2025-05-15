import React from 'react';
import { View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';

export default function NotFoundScreen() {
  const router = useRouter();

  const handleGoHome = () => {
    router.push('/'); 
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Página no encontrada</Text>
      <Text style={{ fontSize: 16, marginBottom: 20 }}>
        Lo sentimos, la página que buscas no existe.
      </Text>
      <Button title="Ir a la página de inicio" onPress={handleGoHome} />
    </View>
  );
}
