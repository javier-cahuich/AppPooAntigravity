import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Animated,
} from 'react-native';
import { useRouter } from 'expo-router';
import { OOP_MODULES } from '@/constants/oopModules';
import { useProgress } from '@/hooks/useProgress';
import ProgressBar from '@/components/ProgressBar';

export default function ProgressScreen() {
  const router = useRouter();
  const { completedCount, totalModules, completionPercentage, isComplete } = useProgress();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const getMotivationalMessage = () => {
    if (completionPercentage === 0) return { emoji: '🚀', msg: '¡Empieza tu viaje hoy!' };
    if (completionPercentage < 30) return { emoji: '🌱', msg: '¡Buen comienzo! Sigue así.' };
    if (completionPercentage < 60) return { emoji: '⚡', msg: '¡Vas a mitad del camino!' };
    if (completionPercentage < 100) return { emoji: '🔥', msg: '¡Casi lo logras! No pares.' };
    return { emoji: '🏆', msg: '¡Eres un experto en POO!' };
  };

  const { emoji, msg } = getMotivationalMessage();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0F0F23" />
      <Animated.ScrollView
        style={{ opacity: fadeAnim }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerOrb} />
          <Text style={styles.headerLabel}>Tu avance</Text>
          <Text style={styles.headerTitle}>Progreso</Text>
        </View>

        {/* Motivational banner */}
        <View style={styles.banner}>
          <Text style={styles.bannerEmoji}>{emoji}</Text>
          <View style={styles.bannerContent}>
            <Text style={styles.bannerMsg}>{msg}</Text>
            <Text style={styles.bannerSub}>
              {completedCount} de {totalModules} módulos completados
            </Text>
          </View>
        </View>

        {/* Big percentage */}
        <View style={styles.statsCard}>
          <View style={styles.statsOrb} />
          <Text style={styles.bigPercentage}>{completionPercentage}%</Text>
          <Text style={styles.statsLabel}>Completado</Text>
          <View style={{ marginTop: 16 }}>
            <ProgressBar
              percentage={completionPercentage}
              color="#7C3AED"
              height={14}
            />
          </View>
          <View style={styles.statsBadges}>
            <View style={styles.statsBadge}>
              <Text style={styles.statsBadgeNum}>{completedCount}</Text>
              <Text style={styles.statsBadgeLabel}>Completados</Text>
            </View>
            <View style={[styles.statsBadge, styles.statsBadgeDivider]}>
              <Text style={styles.statsBadgeNum}>{totalModules - completedCount}</Text>
              <Text style={styles.statsBadgeLabel}>Pendientes</Text>
            </View>
            <View style={styles.statsBadge}>
              <Text style={styles.statsBadgeNum}>{totalModules}</Text>
              <Text style={styles.statsBadgeLabel}>Total</Text>
            </View>
          </View>
        </View>

        {/* Modules list */}
        <Text style={styles.sectionTitle}>Todos los módulos</Text>

        {OOP_MODULES.map((mod, index) => {
          const done = isComplete(mod.id);
          return (
            <TouchableOpacity
              key={mod.id}
              style={styles.moduleRow}
              onPress={() => router.push(`/module/${mod.id}`)}
              activeOpacity={0.7}
            >
              <View
                style={[
                  styles.moduleStatusDot,
                  { backgroundColor: done ? '#10B981' : '#252545' },
                ]}
              >
                <Text style={styles.moduleStatusIcon}>
                  {done ? '✓' : (index + 1).toString()}
                </Text>
              </View>
              <View style={styles.moduleRowContent}>
                <Text style={styles.moduleRowIcon}>{mod.icon}</Text>
                <View style={styles.moduleRowText}>
                  <Text style={styles.moduleRowTitle}>{mod.title}</Text>
                  <Text style={styles.moduleRowDuration}>⏱ {mod.durationMinutes} min</Text>
                </View>
              </View>
              <View
                style={[
                  styles.statusPill,
                  done ? styles.statusPillDone : styles.statusPillPending,
                ]}
              >
                <Text
                  style={[
                    styles.statusPillText,
                    done ? styles.statusTextDone : styles.statusTextPending,
                  ]}
                >
                  {done ? 'Listo' : 'Pendiente'}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F23',
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  header: {
    paddingTop: 56,
    paddingBottom: 8,
    overflow: 'hidden',
    position: 'relative',
  },
  headerOrb: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: '#0EA5E9',
    opacity: 0.08,
    top: -50,
    right: -40,
  },
  headerLabel: {
    fontSize: 13,
    color: '#0EA5E9',
    fontWeight: '600',
    marginBottom: 2,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#F0F0FF',
    marginBottom: 20,
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E3A',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#2A2A50',
    gap: 14,
  },
  bannerEmoji: {
    fontSize: 36,
  },
  bannerContent: {
    flex: 1,
  },
  bannerMsg: {
    fontSize: 16,
    fontWeight: '700',
    color: '#F0F0FF',
    marginBottom: 2,
  },
  bannerSub: {
    fontSize: 13,
    color: '#8888AA',
  },
  statsCard: {
    backgroundColor: '#16162A',
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#252545',
    overflow: 'hidden',
    position: 'relative',
    alignItems: 'center',
  },
  statsOrb: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#7C3AED',
    opacity: 0.06,
    top: -80,
    right: -60,
  },
  bigPercentage: {
    fontSize: 72,
    fontWeight: '900',
    color: '#A78BFA',
    lineHeight: 80,
  },
  statsLabel: {
    fontSize: 14,
    color: '#8888AA',
    marginBottom: 8,
  },
  statsBadges: {
    flexDirection: 'row',
    marginTop: 20,
    width: '100%',
  },
  statsBadge: {
    flex: 1,
    alignItems: 'center',
  },
  statsBadgeDivider: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#252545',
  },
  statsBadgeNum: {
    fontSize: 24,
    fontWeight: '800',
    color: '#F0F0FF',
  },
  statsBadgeLabel: {
    fontSize: 11,
    color: '#6B7280',
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#F0F0FF',
    marginBottom: 12,
  },
  moduleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#16162A',
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#252545',
    gap: 12,
  },
  moduleStatusDot: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  moduleStatusIcon: {
    fontSize: 12,
    color: '#F0F0FF',
    fontWeight: '700',
  },
  moduleRowContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  moduleRowIcon: {
    fontSize: 20,
  },
  moduleRowText: {
    flex: 1,
  },
  moduleRowTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#E0E0FF',
    marginBottom: 2,
  },
  moduleRowDuration: {
    fontSize: 11,
    color: '#6B7280',
  },
  statusPill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 99,
  },
  statusPillDone: {
    backgroundColor: '#10B98122',
    borderWidth: 1,
    borderColor: '#10B98144',
  },
  statusPillPending: {
    backgroundColor: '#1E1E3A',
    borderWidth: 1,
    borderColor: '#2A2A50',
  },
  statusPillText: {
    fontSize: 11,
    fontWeight: '600',
  },
  statusTextDone: {
    color: '#10B981',
  },
  statusTextPending: {
    color: '#6B7280',
  },
});
