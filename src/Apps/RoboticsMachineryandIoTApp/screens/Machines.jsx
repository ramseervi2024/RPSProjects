import { View, Text, ScrollView, StyleSheet, Image, Pressable } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Battery, Circle } from 'lucide-react-native';

const MACHINES = [
  {
    id: '1',
    name: 'Robot Arm A32',
    status: 'offline',
    battery: 85,
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400',
  },
  {
    id: '2',
    name: 'CNC Machine B12',
    status: 'active',
    battery: 92,
    image: 'https://images.unsplash.com/photo-1565873124556-40db1b5c43d1?w=400',
  },
  {
    id: '3',
    name: 'Conveyor C45',
    status: 'idle',
    battery: 76,
    image: 'https://images.unsplash.com/photo-1581091226825-c6a89e7e4801?w=400',
  },
];

export default function Machines() {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    content: {
      padding: 16,
    },
    card: {
      backgroundColor: theme.card,
      borderRadius: 12,
      marginBottom: 16,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: theme.border,
    },
    image: {
      width: '100%',
      height: 200,
    },
    cardContent: {
      padding: 16,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    name: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.text,
    },
    statusContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 8,
    },
    status: {
      marginLeft: 6,
      color: theme.text,
    },
    batteryContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 8,
    },
    batteryText: {
      marginLeft: 6,
      color: theme.text,
    },
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return theme.success;
      case 'idle':
        return theme.warning;
      default:
        return theme.error;
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {MACHINES.map((machine) => (
          <Pressable key={machine.id} style={styles.card}>
            <Image source={{ uri: machine.image }} style={styles.image} />
            <View style={styles.cardContent}>
              <Text style={styles.name}>{machine.name}</Text>
              <View style={styles.statusContainer}>
                <Circle size={12} fill={getStatusColor(machine.status)} color={getStatusColor(machine.status)} />
                <Text style={styles.status}>{machine.status}</Text>
              </View>
              <View style={styles.batteryContainer}>
                <Battery size={16} color={theme.text} />
                <Text style={styles.batteryText}>{machine.battery}%</Text>
              </View>
            </View>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}