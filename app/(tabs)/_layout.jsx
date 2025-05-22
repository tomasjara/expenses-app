import { Tabs } from 'expo-router';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { View } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarItemStyle: {
          margin: 0,
          padding: 0,
          flex: 1,
        },
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: "black",
          borderColor: 'white',
          borderWidth: 1,
          // borderTopWidth: 0,
          // elevation: 5, // sombra Android
          // shadowOpacity: 0.3, // sombra iOS
          bottom: 20, // separación inferior
          left: 20,
          right: 20,
          borderRadius: 10, // bordes redondeados
          height: 60,
        },
      }}>

      <Tabs.Screen
        name="graphics"
        options={{
          title: 'Graficos',
          tabBarItemStyle: {
            margin: 0,
            padding: 0,
            flex: 1,
          },
          tabBarIcon: ({ color, focused }) => (
            <Ionicons  name={focused ? 'bar-chart' : 'bar-chart-outline'} size={20} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarItemStyle: { paddingBottom: 0 },
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'home' : 'home-outline'} size={20} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Configuraciones',
          tabBarItemStyle: { paddingBottom: 0 },
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'settings' : 'settings-outline'} size={20} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}