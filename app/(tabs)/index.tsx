import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Animated,
  StatusBar,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { OOP_MODULES } from '@/constants/oopModules';
import { useProgress } from '@/hooks/useProgress';
import ModuleCard from '@/components/ModuleCard';
import ProgressBar from '@/components/ProgressBar';

const { width } = Dimensions.get('window');

function Header({ completedCount, totalModules, completionPercentage }: {
  completedCount: number;
  totalModules: number;
  completionPercentage: number;
}) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 60,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.header,
        { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
      ]}
    >
      {/* Decorative orb */}
      <View style={styles.orb1} />
      <View style={styles.orb2} />

      <View style={styles.headerTop}>
        <View>
          <Text style={styles.greeting}>Bienvenido 👋</Text>
          <Text style={styles.headerTitle}>Aprende POO</Text>
          <Text style={styles.headerSubtitle}>con JavaScript</Text>
        </View>
        <View style={styles.progressCircle}>
          <Text style={styles.progressPct}>{completionPercentage}%</Text>
          <Text style={styles.progressLabel}>listo</Text>
        </View>
      </View>

      <View style={styles.progressSection}>
        <View style={styles.progressRow}>
          <Text style={styles.progressText}>
            {completedCount} de {totalModules} módulos completados
          </Text>
        </View>
        <ProgressBar
          percentage={completionPercentage}
          color="#7C3AED"
          height={10}
        />
      </View>

      {/* Pillars chips */}
      <View style={styles.pillarsRow}>
        {['Clases', 'Herencia', 'Polimorfismo', 'Abstracción'].map((p) => (
          <View key={p} style={styles.pillarChip}>
            <Text style={styles.pillarText}>{p}</Text>
          </View>
        ))}
      </View>
    </Animated.View>
  );
}

export default function HomeScreen() {
  const router = useRouter();
  const { isComplete, completedCount, totalModules, completionPercentage } =
    useProgress();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0F0F23" />
      <FlatList
        data={OOP_MODULES}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <Header
            completedCount={completedCount}
            totalModules={totalModules}
            completionPercentage={completionPercentage}
          />
        }
        ListHeaderComponentStyle={styles.listHeader}
        renderItem={({ item, index }) => (
          <ModuleCard
            module={item}
            index={index}
            isCompleted={isComplete(item.id)}
            onPress={() => router.push(`/module/${item.id}`)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F23',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  listHeader: {
    marginBottom: 8,
  },
  header: {
    paddingTop: 56,
    paddingBottom: 24,
    overflow: 'hidden',
  },
  orb1: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#7C3AED',
    opacity: 0.12,
    top: -60,
    right: -40,
  },
  orb2: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#0EA5E9',
    opacity: 0.1,
    bottom: 0,
    left: -20,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  greeting: {
    fontSize: 14,
    color: '#7C3AED',
    fontWeight: '600',
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#F0F0FF',
    lineHeight: 36,
  },
  headerSubtitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#7C3AED',
    lineHeight: 36,
  },
  progressCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#7C3AED22',
    borderWidth: 2,
    borderColor: '#7C3AED44',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  progressPct: {
    fontSize: 18,
    fontWeight: '800',
    color: '#A78BFA',
  },
  progressLabel: {
    fontSize: 10,
    color: '#8877AA',
    fontWeight: '500',
  },
  progressSection: {
    marginBottom: 16,
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressText: {
    fontSize: 13,
    color: '#8888AA',
  },
  pillarsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  pillarChip: {
    backgroundColor: '#1E1E3A',
    borderRadius: 99,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: '#352252',
  },
  pillarText: {
    fontSize: 11,
    color: '#A78BFA',
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#F0F0FF',
    marginBottom: 12,
  },
});
