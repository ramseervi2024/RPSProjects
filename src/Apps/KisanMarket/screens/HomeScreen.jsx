import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Sun, CloudRain, Leaf, TrendingUp, Calendar, TriangleAlert as AlertTriangle, Truck, DollarSign } from 'lucide-react-native';

const MARKET_INSIGHTS = [
  {
    id: '1',
    title: 'मंडी विश्लेषण',
    description: 'पिछले 3 महीनों में गेहूं के दाम में 15% की वृद्धि',
    image: 'https://images.unsplash.com/photo-1601648764658-cf37e8c89b70',
  },
  {
    id: '2',
    title: 'फसल मांग',
    description: 'सरसों की मांग अगले महीने 20% बढ़ने की संभावना',
    image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399',
  },
];

const ALERTS = [
  {
    id: '1',
    type: 'warning',
    message: 'कल तेज हवाएं चलने की चेतावनी',
    time: '24 घंटे',
  },
  {
    id: '2',
    type: 'info',
    message: 'नई सरकारी योजना की घोषणा',
    time: '2 दिन',
  },
];

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>नमस्ते, राम सिंह</Text>
        <Text style={styles.locationText}>राजस्थान, भारत</Text>
      </View>

      <View style={styles.weatherCard}>
        <View style={styles.weatherInfo}>
          <Sun size={32} color="#FF9800" />
          <Text style={styles.temperature}>32°C</Text>
          <Text style={styles.weatherDesc}>धूप</Text>
        </View>
        <View style={styles.weatherDetails}>
          <Text style={styles.weatherText}>आज खेती के लिए अच्छा मौसम है</Text>
          <Text style={styles.weatherSubtext}>कल बारिश की संभावना: 20%</Text>
        </View>
      </View>

      <View style={styles.alertsSection}>
        <Text style={styles.sectionTitle}>महत्वपूर्ण सूचनाएं</Text>
        {ALERTS.map((alert) => (
          <View key={alert.id} style={styles.alertCard}>
            <AlertTriangle size={20} color={alert.type === 'warning' ? '#FF9800' : '#2196F3'} />
            <View style={styles.alertContent}>
              <Text style={styles.alertMessage}>{alert.message}</Text>
              <Text style={styles.alertTime}>{alert.time}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.marketUpdate}>
        <Text style={styles.sectionTitle}>बाजार अपडेट</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.cropCard}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b' }}
              style={styles.cropImage}
            />
            <Text style={styles.cropName}>गेहूं</Text>
            <Text style={styles.cropPrice}>₹2,400/क्विंटल</Text>
            <View style={styles.trendContainer}>
              <TrendingUp size={16} color="#4CAF50" />
              <Text style={styles.trendText}>+5%</Text>
            </View>
          </View>
          <View style={styles.cropCard}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1586201375761-83865001e31c' }}
              style={styles.cropImage}
            />
            <Text style={styles.cropName}>सरसों</Text>
            <Text style={styles.cropPrice}>₹5,200/क्विंटल</Text>
            <View style={styles.trendContainer}>
              <TrendingUp size={16} color="#4CAF50" />
              <Text style={styles.trendText}>+3%</Text>
            </View>
          </View>
        </ScrollView>
      </View>

      <View style={styles.insightsSection}>
        <Text style={styles.sectionTitle}>बाजार विश्लेषण</Text>
        {MARKET_INSIGHTS.map((insight) => (
          <TouchableOpacity key={insight.id} style={styles.insightCard}>
            <Image source={{ uri: insight.image }} style={styles.insightImage} />
            <View style={styles.insightContent}>
              <Text style={styles.insightTitle}>{insight.title}</Text>
              <Text style={styles.insightDesc}>{insight.description}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.quickActions}>
        <TouchableOpacity style={styles.actionCard}>
          <Calendar size={32} color="#4CAF50" />
          <Text style={styles.actionText}>फसल कैलेंडर</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionCard}>
          <Truck size={32} color="#2196F3" />
          <Text style={styles.actionText}>परिवहन बुक करें</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionCard}>
          <DollarSign size={32} color="#FF9800" />
          <Text style={styles.actionText}>ऋण सुविधा</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionCard}>
          <Leaf size={32} color="#4CAF50" />
          <Text style={styles.actionText}>फसल बीमा</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#4CAF50',
  },
  welcomeText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: '#FFFFFF',
  },
  locationText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#E8F5E9',
    marginTop: 4,
  },
  weatherCard: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
  },
  weatherInfo: {
    alignItems: 'center',
    marginRight: 16,
  },
  temperature: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: '#212121',
    marginTop: 8,
  },
  weatherDesc: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#757575',
  },
  weatherDetails: {
    flex: 1,
  },
  weatherText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#212121',
  },
  weatherSubtext: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#757575',
    marginTop: 4,
  },
  alertsSection: {
    padding: 16,
  },
  alertCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    elevation: 2,
  },
  alertContent: {
    marginLeft: 12,
    flex: 1,
  },
  alertMessage: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: '#212121',
  },
  alertTime: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#757575',
    marginTop: 4,
  },
  marketUpdate: {
    padding: 16,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#212121',
    marginBottom: 16,
  },
  cropCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginRight: 12,
    width: 160,
    elevation: 2,
  },
  cropImage: {
    width: '100%',
    height: 100,
    borderRadius: 8,
  },
  cropName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#212121',
    marginTop: 8,
  },
  cropPrice: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#757575',
    marginTop: 4,
  },
  trendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  trendText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: '#4CAF50',
    marginLeft: 4,
  },
  insightsSection: {
    padding: 16,
  },
  insightCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
    elevation: 2,
  },
  insightImage: {
    width: '100%',
    height: 160,
  },
  insightContent: {
    padding: 16,
  },
  insightTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#212121',
  },
  insightDesc: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#757575',
    marginTop: 4,
  },
  quickActions: {
    padding: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    width: '48%',
    marginBottom: 16,
    elevation: 2,
  },
  actionText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: '#212121',
    marginTop: 8,
    textAlign: 'center',
  },
});