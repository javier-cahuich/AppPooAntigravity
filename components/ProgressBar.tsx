import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';

interface ProgressBarProps {
  percentage: number;
  color?: string;
  height?: number;
  showLabel?: boolean;
}

export default function ProgressBar({
  percentage,
  color = '#7C3AED',
  height = 8,
  showLabel = false,
}: ProgressBarProps) {
  const animatedWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(animatedWidth, {
      toValue: percentage,
      tension: 40,
      friction: 8,
      useNativeDriver: false,
    }).start();
  }, [percentage]);

  return (
    <View>
      {showLabel && (
        <Text style={styles.label}>{percentage}% completado</Text>
      )}
      <View style={[styles.track, { height }]}>
        <Animated.View
          style={[
            styles.fill,
            {
              height,
              backgroundColor: color,
              width: animatedWidth.interpolate({
                inputRange: [0, 100],
                outputRange: ['0%', '100%'],
              }),
            },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    backgroundColor: '#2A2A4A',
    borderRadius: 99,
    overflow: 'hidden',
  },
  fill: {
    borderRadius: 99,
  },
  label: {
    color: '#A0A8C0',
    fontSize: 12,
    marginBottom: 6,
  },
});
