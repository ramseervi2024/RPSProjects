import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { ArrowUpRight, TrendingUp, Users, Package } from 'lucide-react-native';

export default function HomeScreen() {
  const stats = [
    { title: 'Active Deals', value: '12', icon: TrendingUp, color: '#34C759' },
    { title: 'New Leads', value: '28', icon: Users, color: '#007AFF' },
    { title: 'Products', value: '156', icon: Package, color: '#FF9500' },
  ];

  const recentDeals = [
    {
      company: 'TechCorp Solutions',
      amount: '$75,000',
      status: 'In Progress',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=200&h=200&fit=crop',
    },
    {
      company: 'Global Innovations',
      amount: '$120,000',
      status: 'Negotiation',
      image: 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=200&h=200&fit=crop',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Good morning,</Text>
          <Text style={styles.name}>John Smith</Text>
        </View>
      </View>

      <View style={styles.statsContainer}>
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <View key={index} style={styles.statCard}>
              <View style={[styles.iconContainer, { backgroundColor: `${stat.color}15` }]}>
                <Icon size={24} color={stat.color} />
              </View>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statTitle}>{stat.title}</Text>
            </View>
          );
        })}
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Deals</Text>
          <TouchableOpacity>
            <ArrowUpRight size={20} color="#007AFF" />
          </TouchableOpacity>
        </View>

        {recentDeals.map((deal, index) => (
          <TouchableOpacity key={index} style={styles.dealCard}>
            <Image source={{ uri: deal.image }} style={styles.companyImage} />
            <View style={styles.dealInfo}>
              <Text style={styles.companyName}>{deal.company}</Text>
              <Text style={styles.dealAmount}>{deal.amount}</Text>
            </View>
            <View style={styles.statusContainer}>
              <Text style={styles.statusText}>{deal.status}</Text>
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
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#fff',
  },
  greeting: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: '#666',
  },
  name: {
    fontFamily: 'Inter_700Bold',
    fontSize: 24,
    color: '#1a1a1a',
    marginTop: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontFamily: 'Inter_700Bold',
    fontSize: 24,
    color: '#1a1a1a',
    marginBottom: 4,
  },
  statTitle: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#666',
  },
  section: {
    padding: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 18,
    color: '#1a1a1a',
  },
  dealCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    marginBottom: 12,
  },
  companyImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  dealInfo: {
    flex: 1,
    marginLeft: 12,
  },
  companyName: {
    fontFamily: 'Inter_500Medium',
    fontSize: 16,
    color: '#1a1a1a',
  },
  dealAmount: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  statusContainer: {
    backgroundColor: '#007AFF15',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 12,
    color: '#007AFF',
  },
});