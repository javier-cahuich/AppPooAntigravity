import React, { useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Alert,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { OOP_MODULES, ContentSection } from '@/constants/oopModules';
import { useProgress } from '@/hooks/useProgress';
import CodeBlock from '@/components/CodeBlock';

function SectionContent({ section }: { section: ContentSection }) {
  switch (section.type) {
    case 'heading':
      return <Text style={styles.sectionHeading}>{section.value}</Text>;
    case 'code':
      return <CodeBlock code={section.value} />;
    case 'tip':
      return (
        <View style={styles.tipBox}>
          <Text style={styles.tipText}>{section.value}</Text>
        </View>
      );
    default:
      return <Text style={styles.sectionText}>{section.value}</Text>;
  }
}

export default function ModuleDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const moduleId = parseInt(id ?? '1', 10);
  const mod = OOP_MODULES.find((m) => m.id === moduleId);
  const { markComplete, markIncomplete, isComplete } = useProgress();

  const completed = isComplete(moduleId);
  const currentIndex = OOP_MODULES.findIndex((m) => m.id === moduleId);
  const prevModule = currentIndex > 0 ? OOP_MODULES[currentIndex - 1] : null;
  const nextModule =
    currentIndex < OOP_MODULES.length - 1
      ? OOP_MODULES[currentIndex + 1]
      : null;

  const handleToggleComplete = useCallback(() => {
    if (completed) {
      markIncomplete(moduleId);
    } else {
      markComplete(moduleId);
      if (!nextModule) {
        Alert.alert(
          '🎉 ¡Felicitaciones!',
          'Has completado todos los módulos. ¡Eres un experto en POO con JavaScript!',
          [{ text: '¡Genial!', onPress: () => router.back() }]
        );
      }
    }
  }, [completed, markComplete, markIncomplete, moduleId, nextModule]);

  if (!mod) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Módulo no encontrado</Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backBtnText}>← Volver</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={mod.accentColor} />

      {/* Hero Header */}
      <View style={[styles.hero, { backgroundColor: mod.gradientColors[0] }]}>
        {/* Decorative circles */}
        <View style={[styles.heroOrb1, { backgroundColor: mod.gradientColors[1] }]} />
        <View style={[styles.heroOrb2, { backgroundColor: '#ffffff0D' }]} />

        {/* Back button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>

        <View style={styles.heroContent}>
          <Text style={styles.heroIcon}>{mod.icon}</Text>
          <Text style={styles.heroModuleNumber}>
            Módulo {currentIndex + 1} de {OOP_MODULES.length}
          </Text>
          <Text style={styles.heroTitle}>{mod.title}</Text>
          <Text style={styles.heroDescription}>{mod.shortDescription}</Text>
          <View style={styles.heroDuration}>
            <Text style={styles.heroDurationText}>⏱ {mod.durationMinutes} minutos</Text>
          </View>
        </View>
      </View>

      {/* Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {mod.sections.map((section, index) => (
          <SectionContent key={index} section={section} />
        ))}

        {/* Complete / Navigation */}
        <View style={styles.actionsContainer}>
          {/* Mark complete button */}
          <TouchableOpacity
            style={[
              styles.completeBtn,
              completed && styles.completeBtnDone,
            ]}
            onPress={handleToggleComplete}
            activeOpacity={0.8}
          >
            <Text style={styles.completeBtnText}>
              {completed ? '✓ Completado' : 'Marcar como completado'}
            </Text>
          </TouchableOpacity>

          {/* Navigation row */}
          <View style={styles.navRow}>
            {prevModule ? (
              <TouchableOpacity
                style={styles.navBtn}
                onPress={() => router.replace(`/module/${prevModule.id}`)}
              >
                <Text style={styles.navBtnIcon}>←</Text>
                <View>
                  <Text style={styles.navBtnLabel}>Anterior</Text>
                  <Text style={styles.navBtnTitle} numberOfLines={1}>
                    {prevModule.title}
                  </Text>
                </View>
              </TouchableOpacity>
            ) : (
              <View />
            )}

            {nextModule ? (
              <TouchableOpacity
                style={[styles.navBtn, styles.navBtnRight, { borderColor: mod.accentColor + '55' }]}
                onPress={() => router.replace(`/module/${nextModule.id}`)}
              >
                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={styles.navBtnLabel}>Siguiente</Text>
                  <Text style={styles.navBtnTitle} numberOfLines={1}>
                    {nextModule.title}
                  </Text>
                </View>
                <Text style={[styles.navBtnIcon, { color: mod.accentColor }]}>→</Text>
              </TouchableOpacity>
            ) : (
              <View />
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F23',
  },
  hero: {
    paddingBottom: 32,
    overflow: 'hidden',
  },
  heroOrb1: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    opacity: 0.3,
    top: -60,
    right: -50,
  },
  heroOrb2: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    bottom: -30,
    left: -30,
  },
  backButton: {
    marginTop: 52,
    marginLeft: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#00000033',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  heroContent: {
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  heroIcon: {
    fontSize: 44,
    marginBottom: 8,
  },
  heroModuleNumber: {
    fontSize: 12,
    color: '#FFFFFF99',
    fontWeight: '600',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 8,
    lineHeight: 34,
  },
  heroDescription: {
    fontSize: 14,
    color: '#FFFFFFCC',
    lineHeight: 22,
    marginBottom: 12,
  },
  heroDuration: {
    alignSelf: 'flex-start',
    backgroundColor: '#00000033',
    borderRadius: 99,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  heroDurationText: {
    fontSize: 12,
    color: '#FFFFFFCC',
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 48,
  },
  sectionHeading: {
    fontSize: 19,
    fontWeight: '700',
    color: '#E0E0FF',
    marginTop: 24,
    marginBottom: 10,
  },
  sectionText: {
    fontSize: 15,
    color: '#A0A8C0',
    lineHeight: 26,
    marginBottom: 8,
  },
  tipBox: {
    backgroundColor: '#7C3AED1A',
    borderLeftWidth: 3,
    borderLeftColor: '#7C3AED',
    borderRadius: 8,
    padding: 14,
    marginVertical: 12,
  },
  tipText: {
    fontSize: 14,
    color: '#C4B5FD',
    lineHeight: 22,
  },
  actionsContainer: {
    marginTop: 32,
  },
  completeBtn: {
    backgroundColor: '#7C3AED',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  completeBtnDone: {
    backgroundColor: '#10B981',
  },
  completeBtnText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  navRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  navBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#16162A',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#252545',
  },
  navBtnRight: {
    justifyContent: 'flex-end',
  },
  navBtnIcon: {
    fontSize: 22,
    color: '#8888AA',
    fontWeight: '700',
  },
  navBtnLabel: {
    fontSize: 10,
    color: '#6B7280',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  navBtnTitle: {
    fontSize: 12,
    color: '#D0D0EE',
    fontWeight: '600',
    maxWidth: 100,
  },
  errorContainer: {
    flex: 1,
    backgroundColor: '#0F0F23',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  errorText: {
    fontSize: 18,
    color: '#F0F0FF',
    marginBottom: 16,
  },
  backBtn: {
    backgroundColor: '#7C3AED',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  backBtnText: {
    color: '#fff',
    fontWeight: '700',
  },
});
