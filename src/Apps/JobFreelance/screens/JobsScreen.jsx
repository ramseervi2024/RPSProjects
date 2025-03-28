import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MapPin, DollarSign, Clock, Briefcase } from 'lucide-react-native';

export default function JobsScreen() {
  const jobs = [
    {
      id: 1,
      title: 'Senior React Developer',
      company: 'Tech Corp',
      location: 'Remote',
      salary: '$120k - $150k',
      type: 'Full-time',
      posted: '2 days ago',
    },
    {
      id: 2,
      title: 'UX Designer',
      company: 'Design Studio',
      location: 'New York, NY',
      salary: '$90k - $110k',
      type: 'Full-time',
      posted: '3 days ago',
    },
    {
      id: 3,
      title: 'iOS Developer',
      company: 'Mobile Apps Inc',
      location: 'San Francisco, CA',
      salary: '$130k - $160k',
      type: 'Full-time',
      posted: '1 week ago',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Browse Jobs</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {jobs.map(job => (
          <TouchableOpacity key={job.id} style={styles.jobCard}>
            <View style={styles.jobHeader}>
              <Text style={styles.jobTitle}>{job.title}</Text>
              <Text style={styles.companyName}>{job.company}</Text>
            </View>

            <View style={styles.jobDetails}>
              <View style={styles.detailItem}>
                <MapPin size={16} color="#6B7280" />
                <Text style={styles.detailText}>{job.location}</Text>
              </View>
              <View style={styles.detailItem}>
                <DollarSign size={16} color="#6B7280" />
                <Text style={styles.detailText}>{job.salary}</Text>
              </View>
              <View style={styles.detailItem}>
                <Briefcase size={16} color="#6B7280" />
                <Text style={styles.detailText}>{job.type}</Text>
              </View>
              <View style={styles.detailItem}>
                <Clock size={16} color="#6B7280" />
                <Text style={styles.detailText}>{job.posted}</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.applyButton}>
              <Text style={styles.applyButtonText}>Apply Now</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
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
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 24,
    color: '#1F2937',
  },
  jobCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  jobHeader: {
    marginBottom: 12,
  },
  jobTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#1F2937',
    marginBottom: 4,
  },
  companyName: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
  },
  jobDetails: {
    marginBottom: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 8,
  },
  applyButton: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  applyButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
});