import { View, StyleSheet } from 'react-native'
import React from 'react'

export const ContainerWidget = ({ children, backgroundColor }) => {
  return (
    <View style={styles.container(backgroundColor)}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: (backgroundColor) => ({
    borderRadius: 10,
    backgroundColor: backgroundColor,
    // height: 150,
    padding: 20
  })
});