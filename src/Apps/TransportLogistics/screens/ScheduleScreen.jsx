import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { ChevronLeft, ChevronRight, Clock, MapPin } from 'lucide-react-native';
import { format, addDays, startOfWeek } from 'date-fns';

export default function ScheduleScreen() {
  const today = new Date();
  const weekStart = startOfWeek(today);
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Schedule</Text>
        <View style={styles.dateSelector}>
          <TouchableOpacity style={styles.dateButton}>
            <ChevronLeft size={20} color="#007AFF" />
          </TouchableOpacity>
          <Text style={styles.dateText}>January 2024</Text>
          <TouchableOpacity style={styles.dateButton}>
            <ChevronRight size={20} color="#007AFF" />
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.weekDays}>
          {weekDays.map((date, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.dayButton,
                format(date, 'yyyy-MM-dd') === format(today, 'yyyy-MM-dd') && styles.activeDayButton,
              ]}>
              <Text style={[styles.dayName, format(date, 'yyyy-MM-dd') === format(today, 'yyyy-MM-dd') && styles.activeDayText]}>
                {format(date, 'EEE')}
              </Text>
              <Text style={[styles.dayNumber, format(date, 'yyyy-MM-dd') === format(today, 'yyyy-MM-dd') && styles.activeDayText]}>
                {format(date, 'd')}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView style={styles.content}>
        {[1, 2, 3, 4].map((item) => (
          <View key={item} style={styles.deliveryCard}>
            <View style={styles.timeContainer}>
              <Clock size={16} color="#8E8E93" />
              <Text style={styles.timeText}>{9 + item}:00 AM</Text>
            </View>

            <View style={styles.deliveryContent}>
              <View style={styles.deliveryHeader}>
                <Text style={styles.deliveryTitle}>Delivery #{item}234</Text>
                <View style={styles.statusContainer}>
                  <View style={[styles.statusDot, { backgroundColor: '#34C759' }]} />
                  <Text style={styles.statusText}>On Schedule</Text>
                </View>
              </View>

              <View style={styles.locationContainer}>
                <MapPin size={16} color="#8E8E93" />
                <Text style={styles.locationText}>123 Main St, Brooklyn, NY 10001</Text>
              </View>

              <View style={styles.packageInfo}>
                <Text style={styles.packageText}>2 packages • Standard Delivery</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  header: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#000000',
    marginBottom: 16,
  },
  dateSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  dateButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F2F2F7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#000000',
  },
  weekDays: {
    flexDirection: 'row',
  },
  dayButton: {
    width: 64,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    borderRadius: 12,
    backgroundColor: '#F2F2F7',
  },
  activeDayButton: {
    backgroundColor: '#007AFF',
  },
  dayName: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#8E8E93',
    marginBottom: 4,
  },
  dayNumber: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#000000',
  },
  activeDayText: {
    color: '#FFFFFF',
  },
  content: {
    padding: 20,
  },
  deliveryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  timeText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#8E8E93',
    marginLeft: 6,
  },
  deliveryContent: {
    borderTopWidth: 1,
    borderColor: '#E5E5EA',
    paddingTop: 12,
  },
  deliveryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  deliveryTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#000000',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#34C759',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#8E8E93',
    marginLeft: 6,
  },
  packageInfo: {
    backgroundColor: '#F2F2F7',
    borderRadius: 8,
    padding: 8,
  },
  packageText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#8E8E93',
  },
});