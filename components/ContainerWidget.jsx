import { View, StyleSheet } from 'react-native'
import React from 'react'

export const ContainerWidget = ({ children }) => {
  return (
    <View style={styles.container()}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: () => ({
    borderRadius: 10,
    backgroundColor: 'white',
    // height: 150,
    gap: 10,
    alignItems: 'center',
    padding: 20
  })
});