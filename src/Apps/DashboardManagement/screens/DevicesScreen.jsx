import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useI18n } from '@/context/I18nContext';
import { Mail, Phone, MapPin, CreditCard as Edit2 } from 'lucide-react-native';
const locale = 'en'

export default function ProfileScreen() {

  const profileData = {
    name: 'John Doe',
    role: 'Product Manager',
    email: 'john.doe@example.com',
    phone: '+1 234 567 890',
    location: 'San Francisco, CA',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: profileData.avatar }} style={styles.avatar} />
        <TouchableOpacity style={styles.editButton}>
          <Edit2 size={20} color="#007AFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.profileInfo}>
        <Text style={[styles.name, { fontFamily: locale === 'ar' ? 'Cairo-Bold' : 'Inter-Bold' }]}>
          {profileData.name}
        </Text>
        <Text style={[styles.role, { fontFamily: locale === 'ar' ? 'Cairo-Regular' : 'Inter-Regular' }]}>
          {profileData.role}
        </Text>
      </View>

      <View style={styles.detailsContainer}>
        <View style={styles.detailItem}>
          <Mail size={20} color="#666" />
          <Text style={[styles.detailText, { fontFamily: locale === 'ar' ? 'Cairo-Regular' : 'Inter-Regular' }]}>
            {profileData.email}
          </Text>
        </View>
        <View style={styles.detailItem}>
          <Phone size={20} color="#666" />
          <Text style={[styles.detailText, { fontFamily: locale === 'ar' ? 'Cairo-Regular' : 'Inter-Regular' }]}>
            {profileData.phone}
          </Text>
        </View>
        <View style={styles.detailItem}>
          <MapPin size={20} color="#666" />
          <Text style={[styles.detailText, { fontFamily: locale === 'ar' ? 'Cairo-Regular' : 'Inter-Regular' }]}>
            {profileData.location}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 20,
    position: 'relative',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#fff',
  },
  editButton: {
    position: 'absolute',
    right: 20,
    top: 40,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileInfo: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  name: {
    fontSize: 24,
    color: '#1A1A1A',
    marginBottom: 4,
  },
  role: {
    fontSize: 16,
    color: '#666',
  },
  detailsContainer: {
    backgroundColor: '#fff',
    margin: 20,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  detailText: {
    fontSize: 16,
    color: '#1A1A1A',
    marginLeft: 12,
  },
});