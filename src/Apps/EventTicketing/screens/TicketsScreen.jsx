import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar, MapPin, QrCode } from 'lucide-react-native';
import { Link } from 'expo-router';

const MY_TICKETS = [
  {
    id: '1',
    eventTitle: 'Summer Music Festival',
    ticketType: 'VIP Pass',
    date: 'July 15-17, 2025',
    location: 'Central Park, NYC',
    status: 'upcoming',
  },
  {
    id: '2',
    eventTitle: 'Tech Conference 2025',
    ticketType: 'General Admission',
    date: 'August 22-24, 2025',
    location: 'Moscone Center, SF',
    status: 'upcoming',
  },
  {
    id: '3',
    eventTitle: 'Comedy Night',
    ticketType: 'Front Row',
    date: 'June 1, 2025',
    location: 'Laugh Factory, LA',
    status: 'past',
  },
];

export default function TicketsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Tickets</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Text style={styles.sectionTitle}>Upcoming Events</Text>
          
          {MY_TICKETS.filter(ticket => ticket.status === 'upcoming').map((ticket) => (
            <View key={ticket.id} href={`/ticket/${ticket.id}`} asChild>
              <TouchableOpacity style={styles.ticketCard}>
                <View style={styles.ticketHeader}>
                  <Text style={styles.eventTitle}>{ticket.eventTitle}</Text>
                  <TouchableOpacity style={styles.qrButton}>
                    <QrCode size={20} color="#6366f1" />
                  </TouchableOpacity>
                </View>

                <View style={styles.ticketType}>
                  <Text style={styles.ticketTypeText}>{ticket.ticketType}</Text>
                </View>
                
                <View style={styles.ticketDetails}>
                  <View style={styles.detailRow}>
                    <Calendar size={16} color="#6b7280" />
                    <Text style={styles.detailText}>{ticket.date}</Text>
                  </View>
                  
                  <View style={styles.detailRow}>
                    <MapPin size={16} color="#6b7280" />
                    <Text style={styles.detailText}>{ticket.location}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          ))}

          <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Past Events</Text>
          
          {MY_TICKETS.filter(ticket => ticket.status === 'past').map((ticket) => (
            <View key={ticket.id} style={[styles.ticketCard, styles.pastTicket]}>
              <Text style={[styles.eventTitle, styles.pastText]}>{ticket.eventTitle}</Text>
              <View style={[styles.ticketType, styles.pastTicketType]}>
                <Text style={[styles.ticketTypeText, styles.pastText]}>{ticket.ticketType}</Text>
              </View>
              
              <View style={styles.ticketDetails}>
                <View style={styles.detailRow}>
                  <Calendar size={16} color="#9ca3af" />
                  <Text style={[styles.detailText, styles.pastText]}>{ticket.date}</Text>
                </View>
                
                <View style={styles.detailRow}>
                  <MapPin size={16} color="#9ca3af" />
                  <Text style={[styles.detailText, styles.pastText]}>{ticket.location}</Text>
                </View>
              </View>
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
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f1f1',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  ticketCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#f1f1f1',
  },
  ticketHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    flex: 1,
  },
  qrButton: {
    backgroundColor: '#eff6ff',
    padding: 8,
    borderRadius: 8,
  },
  ticketType: {
    backgroundColor: '#eff6ff',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 12,
  },
  ticketTypeText: {
    color: '#6366f1',
    fontSize: 12,
    fontWeight: '600',
  },
  ticketDetails: {
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    color: '#6b7280',
    fontSize: 14,
  },
  pastTicket: {
    opacity: 0.7,
  },
  pastTicketType: {
    backgroundColor: '#f3f4f6',
  },
  pastText: {
    color: '#9ca3af',
  },
});