import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarShowLabel: false,
      }}>
      <Tabs.Screen
        name="graphics"
        options={{
          title: 'Graficos',
          tabBarItemStyle: { paddingBottom: 5 },
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon size={20} name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarItemStyle: { paddingBottom: 5 },
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon size={20} name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Configuraciones',
          tabBarItemStyle: { paddingBottom: 5 },
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon size={20} name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}