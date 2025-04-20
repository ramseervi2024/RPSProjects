import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Star, ThumbsUp } from 'lucide-react-native';

const reviews = [
  {
    id: 1,
    user: 'Geetanjali Kumawat',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
    rating: 5,
    date: '2 days ago',
    review: 'This Rajasthani Bandhani saree is absolutely stunning! The color and the craftsmanship of the tie-dye work are exceptional. It fits perfectly for weddings and festivals.',
    helpful: 124,
  },
  {
    id: 2,
    user: 'Ravi Sharma',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
    rating: 4,
    date: '1 week ago',
    review: 'I purchased a Marwari lehenga for my sister’s wedding. The embroidery work is top-notch, but the size chart could have been more accurate. Still, a great purchase!',
    helpful: 89,
  },
  {
    id: 3,
    user: 'Anjali Singh',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
    rating: 5,
    date: '2 weeks ago',
    review: 'I ordered a traditional Marwari Anarkali dress, and it is worth every penny! The fabric is soft, and the color is just perfect for a royal look. Highly recommended!',
    helpful: 156,
  },
];

export default function ReviewsScreen() {
  return (
    <ScrollView style={styles.container}>
        <View style={styles.ratingOverview}>
          <Text style={styles.averageRating}>4.8</Text>
          <View style={styles.starsContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} size={24} color="#FFB800" fill="#FFB800" />
            ))}
          </View>
          <Text style={styles.totalReviews}>Based on 2,547 reviews</Text>
        </View>

      <View style={styles.reviewsList}>
        {reviews.map((review) => (
          <View key={review.id} style={styles.reviewCard}>
            <View style={styles.reviewHeader}>
              <Image source={{ uri: review.avatar }} style={styles.avatar} />
              <View style={styles.reviewHeaderText}>
                <Text style={styles.userName}>{review.user}</Text>
                <View style={styles.ratingContainer}>
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={16} color="#FFB800" fill="#FFB800" />
                  ))}
                  <Text style={styles.reviewDate}>{review.date}</Text>
                </View>
              </View>
            </View>
            
            <Text style={styles.reviewText}>{review.review}</Text>
            
            <TouchableOpacity style={styles.helpfulButton}>
              <ThumbsUp size={16} color="#007AFF" />
              <Text style={styles.helpfulText}>Helpful ({review.helpful})</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
      
      <TouchableOpacity style={styles.writeReviewButton}>
        <Text style={styles.writeReviewText}>Write a Review</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  ratingOverview: {
    alignItems: 'center',
    borderWidth:0.3,
    padding:20,
    marginHorizontal:20,
    borderRadius:20
  },
  averageRating: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#000',
  },
  starsContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  totalReviews: {
    color: '#666',
    fontSize: 14,
  },
  reviewsList: {
    padding: 20,
  },
  reviewCard: {
    backgroundColor: '#F2F2F7',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
  },
  reviewHeader: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  reviewHeaderText: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  reviewDate: {
    marginLeft: 10,
    color: '#666',
    fontSize: 12,
  },
  reviewText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#333',
    marginBottom: 10,
  },
  helpfulButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E5E5EA',
    alignSelf: 'flex-start',
    padding: 8,
    borderRadius: 15,
  },
  helpfulText: {
    marginLeft: 5,
    color: '#007AFF',
    fontSize: 12,
  },
  writeReviewButton: {
    backgroundColor: '#000',
    margin: 20,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  writeReviewText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
