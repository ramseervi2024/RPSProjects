import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Clock, Bookmark } from 'lucide-react-native';

export default function NewsCard({ imageUrl, title, description, category }) {
  return (
    <TouchableOpacity style={styles.card}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <View style={styles.content}>
        <View style={styles.categoryContainer}>
          <Text style={styles.category}>{category}</Text>
        </View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        <View style={styles.footer}>
          <View style={styles.footerItem}>
            <Clock size={16} color="#666" />
            <Text style={styles.footerText}>2 घंटे पहले</Text>
          </View>
          <View style={styles.footerItem}>
            <Bookmark size={16} color="#666" />
            <Text style={styles.footerText}>सेव करें</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    margin: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 200,
  },
  content: {
    padding: 16,
  },
  categoryContainer: {
    backgroundColor: '#FEE7E7',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginBottom: 8,
  },
  category: {
    color: '#D24D4D',
    fontSize: 12,
    fontWeight: '600',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#EEE',
    paddingTop: 12,
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerText: {
    marginLeft: 4,
    fontSize: 12,
    color: '#666',
  },
});