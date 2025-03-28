import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bell } from 'lucide-react-native';

export default function HomeScreen() {
  const featuredJobs = [
    {
      id: 1,
      title: 'Senior React Developer',
      company: 'Tech Corp',
      location: 'Remote',
      salary: '$120k - $150k',
      image: 'https://images.unsplash.com/photo-1549924231-f129b911e442?w=200&h=200&fit=crop',
    },
    {
      id: 2,
      title: 'UX Designer',
      company: 'Design Studio',
      location: 'New York, NY',
      salary: '$90k - $110k',
      image: 'https://images.unsplash.com/photo-1571844307880-751c6d86f3f3?w=200&h=200&fit=crop',
    },
  ];

  const freelanceProjects = [
    {
      id: 1,
      title: 'E-commerce Website Development',
      budget: '$5,000',
      duration: '2 months',
      skills: ['React', 'Node.js', 'MongoDB'],
    },
    {
      id: 2,
      title: 'Mobile App UI Design',
      budget: '$3,000',
      duration: '1 month',
      skills: ['Figma', 'UI/UX', 'iOS'],
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Good morning</Text>
          <Text style={styles.name}>John Doe</Text>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <Bell size={24} color="#1F2937" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured Jobs</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {featuredJobs.map(job => (
              <TouchableOpacity key={job.id} style={styles.jobCard}>
                <Image source={{ uri: job.image }} style={styles.companyLogo} />
                <Text style={styles.jobTitle}>{job.title}</Text>
                <Text style={styles.companyName}>{job.company}</Text>
                <View style={styles.jobDetails}>
                  <Text style={styles.jobLocation}>{job.location}</Text>
                  <Text style={styles.jobSalary}>{job.salary}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Freelance Projects</Text>
          {freelanceProjects.map(project => (
            <TouchableOpacity key={project.id} style={styles.projectCard}>
              <Text style={styles.projectTitle}>{project.title}</Text>
              <View style={styles.projectDetails}>
                <Text style={styles.projectBudget}>{project.budget}</Text>
                <Text style={styles.projectDuration}>{project.duration}</Text>
              </View>
              <View style={styles.skillsContainer}>
                {project.skills.map((skill, index) => (
                  <View key={index} style={styles.skillBadge}>
                    <Text style={styles.skillText}>{skill}</Text>
                  </View>
                ))}
              </View>
            </TouchableOpacity>
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
  greeting: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
  },
  name: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: '#1F2937',
    marginTop: 4,
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
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
  jobCard: {
    width: 280,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  companyLogo: {
    width: 48,
    height: 48,
    borderRadius: 8,
    marginBottom: 12,
  },
  jobTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1F2937',
    marginBottom: 4,
  },
  companyName: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
  },
  jobDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  jobLocation: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#059669',
  },
  jobSalary: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#1F2937',
  },
  projectCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  projectTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1F2937',
    marginBottom: 8,
  },
  projectDetails: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  projectBudget: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#059669',
    marginRight: 16,
  },
  projectDuration: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#6B7280',
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
    fontSize: 12,
    color: '#4B5563',
  },
});