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
import AppStatusBar from '../components/common/AppStatusBar';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  Briefcase,
  CheckCircle2,
  Camera,
  Shield,
  Lock,
} from 'lucide-react-native';
import { fontFamilies, fontSizes } from '../constants/fonts';
import { COLORS, GLOBAL_STYLES } from '../theme/theme';
import { showToast } from '../components/common/Toast';
import { updateProfileDetails } from '../redux/profile/action';

export default function UpdateProfileScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const profile = useSelector((state) => state.profile.profiledetails);

  const [firstName, setFirstName] = useState(profile?.first_name || profile?.name?.split(' ')[0] || 'Ramesh');
  const [lastName, setLastName] = useState(profile?.last_name || profile?.name?.split(' ')[1] || 'Seervi');
  const email = profile?.email || 'ramseervi4321@gmail.com';
  const [mobile, setMobile] = useState(profile?.mobile || '6360494477');
  const [platform, setPlatform] = useState(profile?.platform || 'accenture');
  const [saving, setSaving] = useState(false);

  const initials = `${(firstName || 'U')[0]}${(lastName || '')[0] || ''}`.toUpperCase();

  const handleSave = async () => {
    if (!firstName.trim()) {
      showToast.error('Validation Error', 'First name is required.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      showToast.error('Validation Error', 'Please enter a valid email address.');
      return;
    }

    setSaving(true);
    try {
      const updatedData = {
        ...profile,
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        name: `${firstName.trim()} ${lastName.trim()}`.trim(),
        email: email.trim(),
        mobile: mobile.trim(),
        platform: platform.trim(),
      };

      await dispatch(updateProfileDetails(updatedData));
      showToast.success('Profile Updated', 'Your profile details have been successfully saved.');
      navigation.goBack();
    } catch {
      showToast.error('Update Failed', 'Unable to update profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <View style={GLOBAL_STYLES.screenContainer}>
      <AppStatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

      {/* Top Header */}
      <View style={styles.topHeader}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <ArrowLeft size={20} color={COLORS.navy} />
        </TouchableOpacity>

        <View style={styles.headerTitleWrap}>
          <Text style={styles.headerTitle}>Update Profile</Text>
          <Text style={styles.headerSubtitle}>Corporate Employee Details</Text>
        </View>

        <TouchableOpacity
          style={[styles.saveHeaderBtn, saving && styles.saveHeaderBtnDisabled]}
          onPress={handleSave}
          disabled={saving}
          activeOpacity={0.8}
        >
          {saving ? (
            <ActivityIndicator size="small" color={COLORS.primary} />
          ) : (
            <Text style={styles.saveHeaderBtnText}>Save</Text>
          )}
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Avatar Profile Card */}
          <View style={styles.avatarCard}>
            <View style={styles.avatarWrap}>
              <View style={styles.avatarCircle}>
                <Text style={styles.avatarInitials}>{initials}</Text>
              </View>
              <TouchableOpacity
                style={styles.cameraBadge}
                onPress={() => showToast.info('Photo Upload', 'Custom photo upload will be available in the next release.')}
                activeOpacity={0.8}
              >
                <Camera size={14} color="#FFFFFF" strokeWidth={2.4} />
              </TouchableOpacity>
            </View>

            <Text style={styles.avatarName}>
              {firstName} {lastName}
            </Text>
            <View style={styles.corpBadge}>
              <Shield size={12} color="#0F766E" style={styles.corpBadgeIcon} />
              <Text style={styles.corpBadgeText}>{platform ? platform.toUpperCase() : 'CORPORATE'}</Text>
            </View>
          </View>

          {/* Form Card */}
          <View style={styles.formCard}>
            <Text style={styles.formSectionTitle}>PERSONAL & OFFICIAL DETAILS</Text>

            {/* First Name */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>First Name</Text>
              <View style={styles.inputBox}>
                <User size={16} color={COLORS.textMuted} style={styles.inputIcon} />
                <TextInput
                  style={styles.textInput}
                  value={firstName}
                  onChangeText={setFirstName}
                  placeholder="Enter first name"
                  placeholderTextColor={COLORS.textPlaceholder}
                  autoCapitalize="words"
                />
              </View>
            </View>

            {/* Last Name */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Last Name</Text>
              <View style={styles.inputBox}>
                <User size={16} color={COLORS.textMuted} style={styles.inputIcon} />
                <TextInput
                  style={styles.textInput}
                  value={lastName}
                  onChangeText={setLastName}
                  placeholder="Enter last name"
                  placeholderTextColor={COLORS.textPlaceholder}
                  autoCapitalize="words"
                />
              </View>
            </View>

            {/* Official Email (Disabled / Read-Only) */}
            <View style={styles.inputGroup}>
              <View style={styles.labelRow}>
                <Text style={styles.inputLabel}>Official Email Address</Text>
                <View style={styles.lockedBadge}>
                  <Lock size={10} color="#64748B" style={styles.lockedIcon} />
                  <Text style={styles.lockedBadgeText}>Verified & Locked</Text>
                </View>
              </View>
              <View style={[styles.inputBox, styles.inputBoxDisabled]}>
                <Mail size={16} color={COLORS.textMuted} style={styles.inputIcon} />
                <TextInput
                  style={[styles.textInput, styles.textInputDisabled]}
                  value={email}
                  editable={false}
                  selectTextOnFocus={false}
                  placeholder="Corporate email address"
                  placeholderTextColor={COLORS.textPlaceholder}
                  autoCapitalize="none"
                />
                <Lock size={14} color="#94A3B8" />
              </View>
            </View>

            {/* Registered Mobile */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Registered Mobile Number</Text>
              <View style={styles.inputBox}>
                <Phone size={16} color={COLORS.textMuted} style={styles.inputIcon} />
                <TextInput
                  style={styles.textInput}
                  value={mobile}
                  onChangeText={setMobile}
                  placeholder="Enter 10-digit mobile number"
                  placeholderTextColor={COLORS.textPlaceholder}
                  keyboardType="phone-pad"
                />
              </View>
            </View>

            {/* Corporate Platform */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Corporate Platform / Employer</Text>
              <View style={styles.inputBox}>
                <Briefcase size={16} color={COLORS.textMuted} style={styles.inputIcon} />
                <TextInput
                  style={styles.textInput}
                  value={platform}
                  onChangeText={setPlatform}
                  placeholder="Enter employer or organization"
                  placeholderTextColor={COLORS.textPlaceholder}
                  autoCapitalize="words"
                />
              </View>
            </View>
          </View>

          {/* Action Button */}
          <TouchableOpacity
            style={[styles.saveBtn, saving && styles.saveBtnDisabled]}
            onPress={handleSave}
            disabled={saving}
            activeOpacity={0.88}
          >
            {saving ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <>
                <CheckCircle2 size={18} color="#FFFFFF" strokeWidth={2.4} style={styles.btnIcon} />
                <Text style={styles.saveBtnText}>Save Changes</Text>
              </>
            )}
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
  },
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 14,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitleWrap: {
    flex: 1,
    marginLeft: 12,
  },
  headerTitle: {
    fontFamily: fontFamilies.bold,
    fontSize: fontSizes.size18,
    color: '#0F172A',
  },
  headerSubtitle: {
    fontFamily: fontFamilies.regular,
    fontSize: fontSizes.size12,
    color: '#64748B',
    marginTop: 1,
  },
  saveHeaderBtn: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 8,
    backgroundColor: '#F0FDFA',
    borderWidth: 1,
    borderColor: '#99F6E4',
  },
  saveHeaderBtnDisabled: {
    opacity: 0.6,
  },
  saveHeaderBtnText: {
    fontFamily: fontFamilies.semiBold,
    fontSize: fontSizes.size13,
    color: '#0F766E',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  avatarCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 16,
  },
  avatarWrap: {
    position: 'relative',
    marginBottom: 12,
  },
  avatarCircle: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: '#0F766E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitials: {
    fontFamily: fontFamilies.bold,
    fontSize: 26,
    color: '#FFFFFF',
  },
  cameraBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#0F172A',
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  avatarName: {
    fontFamily: fontFamilies.bold,
    fontSize: fontSizes.size18,
    color: '#0F172A',
    marginBottom: 6,
  },
  corpBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E6F4F1',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  corpBadgeIcon: {
    marginRight: 4,
  },
  corpBadgeText: {
    fontFamily: fontFamilies.semiBold,
    fontSize: fontSizes.size11,
    color: '#0F766E',
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 20,
  },
  formSectionTitle: {
    fontFamily: fontFamilies.bold,
    fontSize: fontSizes.size12,
    color: '#64748B',
    letterSpacing: 0.8,
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 14,
  },
  inputLabel: {
    fontFamily: fontFamilies.medium,
    fontSize: fontSizes.size12,
    color: '#334155',
    marginBottom: 6,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  lockedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  lockedIcon: {
    marginRight: 4,
  },
  lockedBadgeText: {
    fontFamily: fontFamilies.medium,
    fontSize: fontSizes.size10,
    color: '#64748B',
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 12,
    height: 46,
  },
  inputBoxDisabled: {
    backgroundColor: '#F1F5F9',
    borderColor: '#E2E8F0',
  },
  inputIcon: {
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    fontFamily: fontFamilies.medium,
    fontSize: fontSizes.size14,
    color: '#0F172A',
    paddingVertical: 0,
  },
  textInputDisabled: {
    color: '#64748B',
  },
  saveBtn: {
    backgroundColor: '#0F766E',
    borderRadius: 12,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#0F766E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  saveBtnDisabled: {
    opacity: 0.7,
  },
  btnIcon: {
    marginRight: 8,
  },
  saveBtnText: {
    fontFamily: fontFamilies.semiBold,
    fontSize: fontSizes.size15,
    color: '#FFFFFF',
  },
});
