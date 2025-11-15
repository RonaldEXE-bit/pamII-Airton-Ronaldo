import React, { useRef, useState } from 'react';
import { Animated, Easing, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


export default function ThemeToggle({ onToggle }) {
  const [isDark, setIsDark] = useState(false);
  const knobAnim = useRef(new Animated.Value(0)).current; // valor inicial 0 (sol)

  const toggleTheme = () => {
    const newValue = !isDark;
    setIsDark(newValue);

    Animated.timing(knobAnim, {
      toValue: newValue ? 1 : 0,
      duration: 600,
      easing: Easing.bounce, // ✅ agora funciona
      useNativeDriver: false,
    }).start();
    

    if (onToggle) onToggle(newValue);
  };

  // posição horizontal do knob
  const knobTranslate = knobAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [4, 32], // desloca da esquerda (sol) para direita (lua)
  });

  // cor do knob
  const knobColor = knobAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#f1c40f', '#f0e6d2'], // amarelo sol → creme lua
  });

  // sombra/brilho
  const knobShadow = knobAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [
      'rgba(241,196,15,0.9)', // brilho do sol
      'rgba(170,170,170,0.8)', // sombra da lua
    ],
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleTheme} style={styles.switch}>
        <Animated.View
          style={[
            styles.slider,
            { backgroundColor: isDark ? '#2c3e50' : '#87CEEB' },
          ]}
        />
        <Animated.View
          style={[
            styles.knob,
            {
              transform: [{ translateX: knobTranslate }],
              backgroundColor: knobColor,
              shadowColor: knobShadow,
            },
          ]}
        />
      </TouchableOpacity>
      <Text style={styles.label}>{isDark ? '🌙 Noite' : '☀️ Dia'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center' },
  switch: {
    width: 70,
    height: 36,
    borderRadius: 36,
    backgroundColor: '#87CEEB',
    justifyContent: 'center',
    padding: 4,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  slider: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 36,
  },
  knob: {
    width: 28,
    height: 28,
    borderRadius: 14,
    shadowOpacity: 0.8,
    shadowRadius: 6,
  },
  label: {
    marginTop: 6,
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
});
