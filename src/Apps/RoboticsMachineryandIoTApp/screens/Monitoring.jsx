import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Activity, TriangleAlert as AlertTriangle, CircleCheck as CheckCircle2 } from 'lucide-react-native';

const EVENTS = [
  {
    id: '1',
    type: 'alert',
    message: 'High temperature detected in Robot Arm A32',
    time: '2 minutes ago',
  },
  {
    id: '2',
    type: 'success',
    message: 'Maintenance completed for CNC Machine B12',
    time: '15 minutes ago',
  },
  {
    id: '3',
    type: 'info',
    message: 'System update scheduled for tonight at 2 AM',
    time: '1 hour ago',
  },
  {
    id: '4',
    type: 'alert',
    message: 'Low battery warning for Conveyor C45',
    time: '2 hours ago',
  },
];

export default function Monitoring() {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    content: {
      padding: 16,
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.text,
      marginBottom: 16,
    },
    statsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 24,
    },
    statCard: {
      backgroundColor: theme.card,
      borderRadius: 12,
      padding: 16,
      width: '48%',
      alignItems: 'center',
    },
    statValue: {
      fontSize: 32,
      fontWeight: 'bold',
      color: theme.primary,
      marginTop: 8,
    },
    statLabel: {
      color: theme.text,
      marginTop: 4,
    },
    eventCard: {
      backgroundColor: theme.card,
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      flexDirection: 'row',
      alignItems: 'flex-start',
    },
    eventIcon: {
      marginRight: 12,
      marginTop: 2,
    },
    eventContent: {
      flex: 1,
    },
    eventMessage: {
      color: theme.text,
      fontSize: 16,
      marginBottom: 4,
    },
    eventTime: {
      color: theme.secondary,
      fontSize: 14,
    },
  });

  const getEventIcon = (type) => {
    switch (type) {
      case 'alert':
        return <AlertTriangle size={24} color={theme.error} style={styles.eventIcon} />;
      case 'success':
        return <CheckCircle2 size={24} color={theme.success} style={styles.eventIcon} />;
      default:
        return <Activity size={24} color={theme.info} style={styles.eventIcon} />;
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.header}>System Status</Text>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Activity size={24} color={theme.primary} />
            <Text style={styles.statValue}>98%</Text>
            <Text style={styles.statLabel}>Uptime</Text>
          </View>

          <View style={styles.statCard}>
            <AlertTriangle size={24} color={theme.primary} />
            <Text style={styles.statValue}>2</Text>
            <Text style={styles.statLabel}>Active Alerts</Text>
          </View>
        </View>

        <Text style={styles.header}>Recent Events</Text>

        {EVENTS.map((event) => (
          <View key={event.id} style={styles.eventCard}>
            {getEventIcon(event.type)}
            <View style={styles.eventContent}>
              <Text style={styles.eventMessage}>{event.message}</Text>
              <Text style={styles.eventTime}>{event.time}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}