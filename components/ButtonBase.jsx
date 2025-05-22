import { useRef, useState } from 'react';
import { Text, Pressable, StyleSheet, Animated } from 'react-native'

export default function ButtonBase({ title, onPress, customStyleContainer, customStyleText }) {
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const backgroundAnim = useRef(new Animated.Value(0)).current;

    const handlePressIn = () => {
        Animated.parallel([
            Animated.spring(scaleAnim, {
                toValue: 0.97,
                useNativeDriver: true,
            }),
            Animated.timing(backgroundAnim, {
                toValue: 1,
                duration: 100,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const handlePressOut = () => {
        Animated.parallel([
            Animated.spring(scaleAnim, {
                toValue: 1,
                useNativeDriver: true,
            }),
            Animated.timing(backgroundAnim, {
                toValue: 0,
                duration: 100,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const interpolatedBgColor = backgroundAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['black', '#222'], // color normal y al presionar
    });
    return (
        <Pressable
            // style={{ backgroundColor: 'black', padding: 10, borderRadius: 10, ...customStyleContainer, }}
            onPressIn={handlePressIn} onPressOut={handlePressOut} onPress={onPress}
        >
            <Animated.View
                style={[
                    styles.container,
                    {
                        transform: [{ scale: scaleAnim }],
                        backgroundColor: interpolatedBgColor,
                    },
                    customStyleContainer,
                ]}
            >
                <Text style={[styles.text, customStyleText]}>
                    {title}
                {/* <Text style={{ color: 'white', textAlign: 'center', fontWeight: '700', fontSize: 17, ...customStyleText }}>{title}</Text> */}
                </Text>
            </Animated.View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 10,
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 17,
  },
});