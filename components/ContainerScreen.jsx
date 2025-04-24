import { StyleSheet, View } from 'react-native'
import React from 'react'
import Constants from 'expo-constants'

export const ContainerScreen = ({ children }) => {
    return (
        <View style={styles.container}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        marginBottom: 40,
        marginHorizontal: 20,
        gap: 20,
    }
})