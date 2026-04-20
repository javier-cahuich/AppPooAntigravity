import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Animated,
} from 'react-native';
import { IconSymbol } from '@/components/ui/icon-symbol';

export default function PerfilScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(24)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 60,
        friction: 9,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0F0F23" />

      {/* Background decorative orbs */}
      <View style={styles.orb1} />
      <View style={styles.orb2} />

      <Animated.View
        style={[
          styles.content,
          { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
        ]}
      >
        {/* ── Header ── */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Perfil</Text>
        </View>

        {/* ── Avatar section ── */}
        <View style={styles.avatarSection}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatarRing}>
              <View style={styles.avatarInner}>
                <IconSymbol size={48} name="person.fill" color="#A78BFA" />
              </View>
            </View>
          </View>

          <Text style={styles.userName}>Nombre del usuario</Text>
          <Text style={styles.userEmail}>correo@ejemplo.com</Text>

          {/* Status badge */}
          <View style={styles.badge}>
            <View style={styles.badgeDot} />
            <Text style={styles.badgeText}>Sin sesión iniciada</Text>
          </View>
        </View>

        {/* ── Divider ── */}
        <View style={styles.divider} />

        {/* ── Info placeholders ── */}
        <View style={styles.infoSection}>
          <View style={styles.infoRow}>
            <View style={styles.infoIcon}>
              <IconSymbol size={16} name="book.fill" color="#7C3AED" />
            </View>
            <View style={styles.infoText}>
              <Text style={styles.infoLabel}>Módulos completados</Text>
              <Text style={styles.infoValue}>—</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoIcon}>
              <IconSymbol size={16} name="star.fill" color="#7C3AED" />
            </View>
            <View style={styles.infoText}>
              <Text style={styles.infoLabel}>Puntuación total</Text>
              <Text style={styles.infoValue}>—</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoIcon}>
              <IconSymbol size={16} name="calendar" color="#7C3AED" />
            </View>
            <View style={styles.infoText}>
              <Text style={styles.infoLabel}>Miembro desde</Text>
              <Text style={styles.infoValue}>—</Text>
            </View>
          </View>
        </View>

        {/* ── CTA Buttons ── */}
        <View style={styles.actionsSection}>
          <TouchableOpacity style={styles.btnPrimary} activeOpacity={0.8}>
            <IconSymbol size={18} name="person.crop.circle" color="#FFFFFF" />
            <Text style={styles.btnPrimaryText}>Iniciar sesión</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnSecondary} activeOpacity={0.8}>
            <IconSymbol size={18} name="person.badge.plus" color="#A78BFA" />
            <Text style={styles.btnSecondaryText}>Registrarse</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.footerNote}>
          Inicia sesión para guardar tu progreso y acceder a todas las
          funcionalidades.
        </Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F23',
  },
  orb1: {
    position: 'absolute',
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: '#7C3AED',
    opacity: 0.08,
    top: -80,
    right: -60,
  },
  orb2: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: '#0EA5E9',
    opacity: 0.07,
    bottom: 120,
    left: -40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },

  // ── Header ──
  header: {
    paddingTop: 60,
    paddingBottom: 8,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#F0F0FF',
  },

  // ── Avatar ──
  avatarSection: {
    alignItems: 'center',
    paddingTop: 32,
    paddingBottom: 28,
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatarRing: {
    width: 108,
    height: 108,
    borderRadius: 54,
    borderWidth: 2,
    borderColor: '#7C3AED55',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#7C3AED11',
  },
  avatarInner: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: '#1E1E3A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#F0F0FF',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#8888AA',
    marginBottom: 12,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#1E1E3A',
    borderRadius: 99,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: '#2E2E50',
  },
  badgeDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#4B5563',
  },
  badgeText: {
    fontSize: 11,
    color: '#8888AA',
    fontWeight: '600',
  },

  // ── Divider ──
  divider: {
    height: 1,
    backgroundColor: '#1E1E3A',
    marginBottom: 20,
  },

  // ── Info rows ──
  infoSection: {
    backgroundColor: '#13132A',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#1E1E3A',
    padding: 4,
    marginBottom: 28,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 14,
  },
  infoIcon: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: '#7C3AED18',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoText: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: '#8888AA',
    fontWeight: '500',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 15,
    color: '#F0F0FF',
    fontWeight: '600',
  },

  // ── Action buttons ──
  actionsSection: {
    gap: 12,
    marginBottom: 20,
  },
  btnPrimary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: '#7C3AED',
    borderRadius: 14,
    paddingVertical: 15,
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 6,
  },
  btnPrimaryText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  btnSecondary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: 'transparent',
    borderRadius: 14,
    paddingVertical: 14,
    borderWidth: 1.5,
    borderColor: '#7C3AED66',
  },
  btnSecondaryText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#A78BFA',
  },

  // ── Footer note ──
  footerNote: {
    textAlign: 'center',
    fontSize: 12,
    color: '#555577',
    lineHeight: 18,
    paddingHorizontal: 8,
  },
});
