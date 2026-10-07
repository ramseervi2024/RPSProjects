import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  CheckCircle2,
  Sparkles,
} from 'lucide-react-native';
import AppStatusBar from '../components/common/AppStatusBar';
import { COLORS, RADII } from '../theme/theme';
import { showToast } from '../components/common/Toast';
import { updateProfileDetails } from '../redux/profile/action';

export default function UpdateProfileScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();

  const profile = useSelector((state) => state.profile.profiledetails) || {};
  const authUser = useSelector((state) => state.auth.user) || {};

  const [name, setName] = useState(profile?.name || authUser?.name || '');
  const [email, setEmail] = useState(profile?.email || authUser?.email || '');
  const [phone, setPhone] = useState(profile?.phone || authUser?.phone || '');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!name.trim()) {
      showToast.error('Name Required', 'Please enter your full name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      showToast.error('Email Required', 'Please enter a valid email address.');
      return;
    }

    setSaving(true);
    try {
      const updated = {
        ...profile,
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
      };
      await dispatch(updateProfileDetails(updated));
      showToast.success('Profile Inscribed', 'Your account details have been updated.');
      navigation.goBack();
    } catch (err) {
      showToast.error('Update Notice', err?.message || 'Could not update profile.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <View style={styles.container}>
      <AppStatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

      {/* Top Header */}
      <View style={[styles.header, { paddingTop: Math.max(insets.top, 10) }]}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <ArrowLeft size={20} color="#0F172A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Royal Profile</Text>
        <View style={{ width: 36 }} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Avatar Banner */}
          <View style={styles.avatarCard}>
            <View style={styles.avatarWrap}>
              <Text style={styles.avatarText}>{(name[0] || 'R').toUpperCase()}</Text>
            </View>
            <Text style={styles.avatarSubtitle}>Artisan Patron Credentials</Text>
          </View>

          {/* Form Card */}
          <View style={styles.formCard}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Full Name</Text>
              <View style={styles.inputWrap}>
                <User size={18} color="#94A3B8" />
                <TextInput
                  style={styles.inputField}
                  value={name}
                  onChangeText={setName}
                  placeholder="Ramesh Seervi"
                  placeholderTextColor="#94A3B8"
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Email Address</Text>
              <View style={styles.inputWrap}>
                <Mail size={18} color="#94A3B8" />
                <TextInput
                  style={styles.inputField}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  placeholder="ramesh@example.com"
                  placeholderTextColor="#94A3B8"
                  autoCapitalize="none"
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Mobile Phone</Text>
              <View style={styles.inputWrap}>
                <Phone size={18} color="#94A3B8" />
                <Text style={styles.countryCode}>+91</Text>
                <TextInput
                  style={styles.inputField}
                  value={phone}
                  onChangeText={setPhone}
                  keyboardType="phone-pad"
                  placeholder="9001122334"
                  placeholderTextColor="#94A3B8"
                />
              </View>
            </View>

            <TouchableOpacity
              style={styles.saveBtn}
              onPress={handleSave}
              disabled={saving}
              activeOpacity={0.88}
            >
              {saving ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.saveBtnText}>Save Profile</Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderColor: '#E2E8F0',
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
  },
  scrollContent: {
    padding: 16,
    gap: 16,
  },
  avatarCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 8,
  },
  avatarWrap: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#831843',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#FEF08A',
    fontSize: 28,
    fontWeight: '800',
  },
  avatarSubtitle: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '600',
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 14,
  },
  inputGroup: {},
  inputLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#475569',
    marginBottom: 6,
  },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 46,
    backgroundColor: '#F8FAFC',
    gap: 8,
  },
  countryCode: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  inputField: {
    flex: 1,
    fontSize: 14,
    color: '#0F172A',
  },
  saveBtn: {
    backgroundColor: '#831843',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  saveBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
});
