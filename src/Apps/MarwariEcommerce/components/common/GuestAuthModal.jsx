import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ShieldCheck, ArrowRight, X } from 'lucide-react-native';

export default function GuestAuthModal({ visible, onClose, message = "Please sign in to continue." }) {
  const navigation = useNavigation();
  const { width } = useWindowDimensions();

  const handleLogin = () => {
    onClose();
    navigation.navigate('Login');
  };

  const handleRegister = () => {
    onClose();
    navigation.navigate('Register');
  };

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={[styles.modalCard, { width: Math.min(width - 40, 340) }]}>
          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <X size={20} color="#64748B" />
          </TouchableOpacity>

          <View style={styles.iconCircle}>
            <ShieldCheck size={32} color="#831843" />
          </View>

          <Text style={styles.title}>Royal Privileges</Text>
          <Text style={styles.subtitle}>{message}</Text>

          <TouchableOpacity style={styles.primaryBtn} onPress={handleLogin} activeOpacity={0.8}>
            <Text style={styles.primaryBtnText}>Login Now</Text>
            <ArrowRight size={16} color="#FFFFFF" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryBtn} onPress={handleRegister} activeOpacity={0.8}>
            <Text style={styles.secondaryBtnText}>Create Account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 10,
  },
  closeBtn: {
    position: 'absolute',
    top: 16,
    right: 16,
    padding: 4,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FDF2F8',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  primaryBtn: {
    backgroundColor: '#831843',
    width: '100%',
    height: 48,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  primaryBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  secondaryBtn: {
    width: '100%',
    height: 48,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#831843',
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondaryBtnText: {
    color: '#831843',
    fontSize: 15,
    fontWeight: '700',
  },
});
