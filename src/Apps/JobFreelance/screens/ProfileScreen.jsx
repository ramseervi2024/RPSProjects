import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Settings, Edit2, MapPin, Mail, Phone } from 'lucide-react-native';

export default function ProfileScreen() {
  const skills = ['React Native', 'JavaScript', 'TypeScript', 'UI/UX Design'];
  const experience = [
    {
      id: 1,
      role: 'Senior React Developer',
      company: 'Tech Corp',
      duration: '2020 - Present',
    },
    {
      id: 2,
      role: 'Frontend Developer',
      company: 'Web Solutions Inc',
      duration: '2018 - 2020',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
        <TouchableOpacity>
          <Settings size={24} color="#1F2937" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.profileSection}>
          <View style={styles.profileHeader}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop' }}
              style={styles.profileImage}
            />
            <TouchableOpacity style={styles.editButton}>
              <Edit2 size={16} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          <Text style={styles.name}>John Doe</Text>
          <Text style={styles.title}>Senior React Developer</Text>

          <View style={styles.infoContainer}>
            <View style={styles.infoItem}>
              <MapPin size={16} color="#6B7280" />
              <Text style={styles.infoText}>San Francisco, CA</Text>
            </View>
            <View style={styles.infoItem}>
              <Mail size={16} color="#6B7280" />
              <Text style={styles.infoText}>john.doe@example.com</Text>
            </View>
            <View style={styles.infoItem}>
              <Phone size={16} color="#6B7280" />
              <Text style={styles.infoText}>+1 (555) 123-4567</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills</Text>
          <View style={styles.skillsContainer}>
            {skills.map((skill, index) => (
              <View key={index} style={styles.skillBadge}>
                <Text style={styles.skillText}>{skill}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Experience</Text>
          {experience.map(item => (
            <View key={item.id} style={styles.experienceItem}>
              <Text style={styles.role}>{item.role}</Text>
              <Text style={styles.company}>{item.company}</Text>
              <Text style={styles.duration}>{item.duration}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 24,
    color: '#1F2937',
  },
  profileSection: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  profileHeader: {
    position: 'relative',
    marginBottom: 16,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  editButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: '#007AFF',
    borderRadius: 20,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 24,
    color: '#1F2937',
    marginBottom: 4,
  },
  jobTitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 16,
  },
  infoContainer: {
    width: '100%',
    marginTop: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 8,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#1F2937',
    marginBottom: 16,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillBadge: {
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  skillText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#4B5563',
  },
  experienceItem: {
    marginBottom: 16,
  },
  role: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1F2937',
    marginBottom: 4,
  },
  company: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  duration: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#9CA3AF',
  },
});