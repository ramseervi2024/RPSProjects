import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Battery, Cpu, Thermometer, WifiOff } from 'lucide-react-native';

export default function Dashboard() {
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
    grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 16,
    },
    card: {
      width: '47%',
      backgroundColor: theme.card,
      borderRadius: 12,
      padding: 16,
      borderWidth: 1,
      borderColor: theme.border,
    },
    cardTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.text,
      marginTop: 8,
    },
    cardValue: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.primary,
      marginTop: 4,
    },
    alertContainer: {
      backgroundColor: theme.error,
      borderRadius: 12,
      padding: 16,
      marginTop: 16,
      flexDirection: 'row',
      alignItems: 'center',
    },
    alertText: {
      color: '#ffffff',
      marginLeft: 12,
      flex: 1,
    },
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.header}>System Overview</Text>
        
        <View style={styles.grid}>
          <Pressable style={styles.card}>
            <Thermometer color={theme.primary} size={24} />
            <Text style={styles.cardTitle}>Temperature</Text>
            <Text style={styles.cardValue}>24.5°C</Text>
          </Pressable>

          <Pressable style={styles.card}>
            <Battery color={theme.primary} size={24} />
            <Text style={styles.cardTitle}>Battery</Text>
            <Text style={styles.cardValue}>85%</Text>
          </Pressable>

          <Pressable style={styles.card}>
            <Cpu color={theme.primary} size={24} />
            <Text style={styles.cardTitle}>CPU Load</Text>
            <Text style={styles.cardValue}>42%</Text>
          </Pressable>

          <Pressable style={styles.card}>
            <Cpu color={theme.primary} size={24} />
            <Text style={styles.cardTitle}>Memory</Text>
            <Text style={styles.cardValue}>2.4GB</Text>
          </Pressable>
        </View>

        <View style={styles.alertContainer}>
          <WifiOff color="#ffffff" size={24} />
          <Text style={styles.alertText}>
            Connection lost with Robot-A32. Check network status.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}