import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { MoveVertical as MoreVertical, Folder } from 'lucide-react-native';

const projects = [
  {
    id: '1',
    title: 'Marketing Campaign 2025',
    lastModified: '2 hours ago',
    thumbnail: 'https://images.unsplash.com/photo-1664575198308-3959904fa430',
  },
  {
    id: '2',
    title: 'Social Media Posts',
    lastModified: '1 day ago',
    thumbnail: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868',
  },
  {
    id: '3',
    title: 'Company Presentation',
    lastModified: '3 days ago',
    thumbnail: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e',
  },
];

export default function ProjectsScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Your projects</Text>
        <TouchableOpacity style={styles.folderButton}>
          <Folder size={20} color="#7c3aed" />
          <Text style={styles.folderButtonText}>New Folder</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.projectsGrid}>
        {projects.map((project) => (
          <TouchableOpacity key={project.id} style={styles.projectCard}>
            <Image
              source={{ uri: project.thumbnail }}
              style={styles.projectThumbnail}
            />
            <View style={styles.projectInfo}>
              <View style={styles.projectHeader}>
                <Text style={styles.projectTitle}>{project.title}</Text>
                <TouchableOpacity>
                  <MoreVertical size={20} color="#64748b" />
                </TouchableOpacity>
              </View>
              <Text style={styles.lastModified}>Modified {project.lastModified}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1e293b',
  },
  folderButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#f3e8ff',
    gap: 8,
  },
  folderButtonText: {
    color: '#7c3aed',
    fontSize: 14,
    fontWeight: '600',
  },
  projectsGrid: {
    padding: 20,
    gap: 20,
  },
  projectCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  projectThumbnail: {
    width: '100%',
    height: 160,
    backgroundColor: '#f1f5f9',
  },
  projectInfo: {
    padding: 16,
  },
  projectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  projectTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
  },
  lastModified: {
    fontSize: 14,
    color: '#64748b',
  },
});