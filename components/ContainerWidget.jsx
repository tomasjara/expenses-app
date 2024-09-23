import { View, StyleSheet } from 'react-native'
import React from 'react'

export const ContainerWidget = ({ children, customStyle }) => {
  return (
    <View style={styles.container(customStyle)}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: (customStyle) => ({
    borderRadius: 10,
    backgroundColor: 'white',
    // height: 150,
    gap: 10,
    // alignItems: 'center',
    padding: 20,
    ...customStyle
  })
});