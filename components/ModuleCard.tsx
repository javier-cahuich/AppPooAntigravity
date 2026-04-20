import React, { useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import { OopModule } from '@/constants/oopModules';

interface ModuleCardProps {
  module: OopModule;
  index: number;
  isCompleted: boolean;
  onPress: () => void;
}

export default function ModuleCard({
  module,
  index,
  isCompleted,
  onPress,
}: ModuleCardProps) {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.97,
      useNativeDriver: true,
      tension: 300,
      friction: 10,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      tension: 300,
      friction: 10,
    }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={onPress}
        style={styles.card}
      >
        {/* Left accent bar */}
        <View
          style={[styles.accentBar, { backgroundColor: module.accentColor }]}
        />

        {/* Icon badge */}
        <View
          style={[
            styles.iconBadge,
            { backgroundColor: module.accentColor + '22' },
          ]}
        >
          <Text style={styles.icon}>{module.icon}</Text>
        </View>

        {/* Content */}
        <View style={styles.content}>
          <View style={styles.topRow}>
            <Text style={styles.moduleNumber}>Módulo {index + 1}</Text>
            {isCompleted && (
              <View style={styles.completedBadge}>
                <Text style={styles.completedText}>✓ Completado</Text>
              </View>
            )}
          </View>
          <Text style={styles.title} numberOfLines={1}>
            {module.title}
          </Text>
          <Text style={styles.description} numberOfLines={2}>
            {module.shortDescription}
          </Text>
          <View style={styles.footer}>
            <Text style={styles.duration}>⏱ {module.durationMinutes} min</Text>
            <View
              style={[
                styles.arrowBadge,
                { backgroundColor: module.accentColor + '33' },
              ]}
            >
              <Text style={[styles.arrow, { color: module.accentColor }]}>
                →
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#16162A',
    borderRadius: 16,
    marginBottom: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#252545',
    alignItems: 'stretch',
  },
  accentBar: {
    width: 4,
  },
  iconBadge: {
    width: 56,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 16,
    borderRadius: 12,
    aspectRatio: 1,
  },
  icon: {
    fontSize: 26,
  },
  content: {
    flex: 1,
    paddingVertical: 14,
    paddingRight: 16,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  moduleNumber: {
    fontSize: 11,
    color: '#6B7280',
    fontWeight: '600',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  completedBadge: {
    backgroundColor: '#10B98122',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 99,
    borderWidth: 1,
    borderColor: '#10B98144',
  },
  completedText: {
    fontSize: 10,
    color: '#10B981',
    fontWeight: '600',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#F0F0FF',
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    color: '#8888AA',
    lineHeight: 17,
    marginBottom: 10,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  duration: {
    fontSize: 11,
    color: '#6B7280',
  },
  arrowBadge: {
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrow: {
    fontSize: 14,
    fontWeight: '700',
  },
});
