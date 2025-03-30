import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { TrendingUp, TrendingDown, Search, Filter, MapPin } from 'lucide-react-native';

const MARKET_NEWS = [
  {
    id: '1',
    title: 'सरकार ने गेहूं का न्यूनतम समर्थन मूल्य बढ़ाया',
    source: 'कृषि मंत्रालय',
    time: '2 घंटे पहले',
  },
  {
    id: '2',
    title: 'सरसों के निर्यात में वृद्धि की संभावना',
    source: 'व्यापार समाचार',
    time: '4 घंटे पहले',
  },
];

const MARKET_ANALYSIS = [
  {
    id: '1',
    crop: 'गेहूं',
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b',
    prediction: 'अगले महीने दाम बढ़ने की संभावना',
    confidence: '85%',
  },
  {
    id: '2',
    crop: 'सरसों',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c',
    prediction: 'स्थिर दाम की संभावना',
    confidence: '75%',
  },
];

export default function MarketScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>बाजार भाव</Text>
        <View style={styles.searchContainer}>
          <TouchableOpacity style={styles.searchBar}>
            <Search size={20} color="#757575" />
            <Text style={styles.searchText}>फसल खोजें...</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}>
            <Filter size={20} color="#212121" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView>
        <View style={styles.locationSection}>
          <MapPin size={20} color="#4CAF50" />
          <Text style={styles.locationText}>आस-पास की मंडियां</Text>
        </View>

        <View style={styles.marketCard}>
          <Text style={styles.marketName}>जयपुर कृषि मंडी</Text>
          <Text style={styles.marketDistance}>5 किमी दूर</Text>
          <View style={styles.cropList}>
            <CropItem
              name="गेहूं"
              price="2,400"
              change="+120"
              trend="up"
              volume="250"
            />
            <CropItem
              name="सरसों"
              price="5,200"
              change="-80"
              trend="down"
              volume="180"
            />
            <CropItem
              name="चना"
              price="4,800"
              change="+200"
              trend="up"
              volume="120"
            />
          </View>
        </View>

        <View style={styles.marketCard}>
          <Text style={styles.marketName}>अजमेर कृषि मंडी</Text>
          <Text style={styles.marketDistance}>25 किमी दूर</Text>
          <View style={styles.cropList}>
            <CropItem
              name="गेहूं"
              price="2,380"
              change="+100"
              trend="up"
              volume="300"
            />
            <CropItem
              name="सरसों"
              price="5,150"
              change="+90"
              trend="up"
              volume="200"
            />
            <CropItem
              name="चना"
              price="4,750"
              change="-50"
              trend="down"
              volume="150"
            />
          </View>
        </View>

        <View style={styles.newsSection}>
          <Text style={styles.sectionTitle}>बाजार समाचार</Text>
          {MARKET_NEWS.map((news) => (
            <TouchableOpacity key={news.id} style={styles.newsCard}>
              <Text style={styles.newsTitle}>{news.title}</Text>
              <View style={styles.newsFooter}>
                <Text style={styles.newsSource}>{news.source}</Text>
                <Text style={styles.newsTime}>{news.time}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.analysisSection}>
          <Text style={styles.sectionTitle}>बाजार विश्लेषण</Text>
          {MARKET_ANALYSIS.map((analysis) => (
            <TouchableOpacity key={analysis.id} style={styles.analysisCard}>
              <Image source={{ uri: analysis.image }} style={styles.analysisImage} />
              <View style={styles.analysisContent}>
                <Text style={styles.analysisCrop}>{analysis.crop}</Text>
                <Text style={styles.analysisPrediction}>{analysis.prediction}</Text>
                <View style={styles.confidenceBar}>
                  <View style={[styles.confidenceFill, { width: analysis.confidence }]} />
                  <Text style={styles.confidenceText}>विश्वसनीयता: {analysis.confidence}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

function CropItem({ name, price, change, trend, volume }) {
  return (
    <View style={styles.cropItem}>
      <View style={styles.cropHeader}>
        <Text style={styles.cropName}>{name}</Text>
        <Text style={styles.volumeText}>{volume} क्विंटल</Text>
      </View>
      <View style={styles.cropDetails}>
        <Text style={styles.cropPrice}>₹{price}/क्विंटल</Text>
        <View style={styles.trendContainer}>
          {trend === 'up' ? (
            <TrendingUp size={16} color="#4CAF50" />
          ) : (
            <TrendingDown size={16} color="#F44336" />
          )}
          <Text
            style={[
              styles.changeText,
              { color: trend === 'up' ? '#4CAF50' : '#F44336' },
            ]}>
            ₹{change}
          </Text>
        </View>
      </View>
    </View>
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
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: '#212121',
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 12,
    borderRadius: 8,
    marginRight: 8,
  },
  searchText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#757575',
    marginLeft: 8,
  },
  filterButton: {
    padding: 12,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
  },
  locationSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  locationText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#212121',
    marginLeft: 8,
  },
  marketCard: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    elevation: 2,
  },
  marketName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#212121',
  },
  marketDistance: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#757575',
    marginTop: 4,
    marginBottom: 16,
  },
  cropList: {
    gap: 12,
  },
  cropItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  cropHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  cropName: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#212121',
  },
  volumeText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#757575',
  },
  cropDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cropPrice: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#212121',
  },
  trendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  changeText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    marginLeft: 4,
  },
  newsSection: {
    padding: 16,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#212121',
    marginBottom: 16,
  },
  newsCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
  },
  newsTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#212121',
  },
  newsFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  newsSource: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#4CAF50',
  },
  newsTime: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#757575',
  },
  analysisSection: {
    padding: 16,
  },
  analysisCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
    elevation: 2,
  },
  analysisImage: {
    width: '100%',
    height: 120,
  },
  analysisContent: {
    padding: 16,
  },
  analysisCrop: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#212121',
  },
  analysisPrediction: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#757575',
    marginTop: 4,
  },
  confidenceBar: {
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    marginTop: 8,
    overflow: 'hidden',
  },
  confidenceFill: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    backgroundColor: '#4CAF50',
    borderRadius: 2,
  },
  confidenceText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#757575',
    marginTop: 8,
  },
});