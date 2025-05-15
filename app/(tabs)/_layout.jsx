import { Tabs } from 'expo-router';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#111', 
          borderTopColor: 'transparent', 
        },
      }}>
      <Tabs.Screen
        name="graphics"
        options={{
          title: 'Graficos',
          tabBarItemStyle: { paddingBottom: 5 },
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'bar-chart' : 'bar-chart-outline'} size={20} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarItemStyle: { paddingBottom: 5 },
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'home' : 'home-outline'} size={20} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Configuraciones',
          tabBarItemStyle: { paddingBottom: 5 },
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'settings' : 'settings-outline'} size={20} color={color} />

          ),
        }}
      />
    </Tabs>
  );
}