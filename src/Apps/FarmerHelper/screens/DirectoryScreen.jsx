import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Calendar, Clock, Leaf, AlertCircle, PlusCircle } from 'lucide-react-native';

export default function CropManagement() {
  const [crops] = useState([
    {
      id: 1,
      name: 'Tomatoes',
      stage: 'Growing',
      plantedDate: '2025-03-15',
      daysToHarvest: 45,
      health: 'Good',
      nextAction: 'Fertilize in 2 days',
      image: 'https://api.a0.dev/assets/image?text=healthy%20tomato%20plant%20growing&aspect=4:3'
    },
    {
      id: 2,
      name: 'Corn',
      stage: 'Seedling',
      plantedDate: '2025-04-01',
      daysToHarvest: 75,
      health: 'Excellent',
      nextAction: 'Water today',
      image: 'https://api.a0.dev/assets/image?text=corn%20seedling%20growing%20in%20field&aspect=4:3'
    },
    {
      id: 3,
      name: 'Potatoes',
      stage: 'Pre-harvest',
      plantedDate: '2025-02-01',
      daysToHarvest: 5,
      health: 'Good',
      nextAction: 'Prepare for harvest',
      image: 'https://api.a0.dev/assets/image?text=potato%20plant%20ready%20for%20harvest&aspect=4:3'
    }
  ]);

  const getStatusColor = (health) => {
    switch (health) {
      case 'Excellent': return '#2ECC71';
      case 'Good': return '#3498DB';
      case 'Fair': return '#F1C40F';
      case 'Poor': return '#E74C3C';
      default: return '#95A5A6';
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.summary}>
        <Text style={styles.summaryTitle}>Crop Overview</Text>
        <View style={styles.summaryStats}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{crops.length}</Text>
            <Text style={styles.statLabel}>Active Crops</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>2</Text>
            <Text style={styles.statLabel}>Need Action</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>1</Text>
            <Text style={styles.statLabel}>Ready to Harvest</Text>
          </View>
        </View>
      </View>

      {crops.map((crop) => (
        <View key={crop.id} style={styles.cropCard}>
          <Image source={{ uri: crop.image }} style={styles.cropImage} />
          <View style={styles.cropInfo}>
            <View style={styles.cropHeader}>
              <Text style={styles.cropName}>{crop.name}</Text>
              <View style={[styles.statusBadge, { backgroundColor: getStatusColor(crop.health) }]}>
                <Text style={styles.statusText}>{crop.health}</Text>
              </View>
            </View>

            <View style={styles.cropDetails}>
              <View style={styles.detailRow}>
                <Calendar size={16} color="#666" />
                <Text style={styles.detailText}>Planted: {crop.plantedDate}</Text>
              </View>
              <View style={styles.detailRow}>
                <Clock size={16} color="#666" />
                <Text style={styles.detailText}>Days to harvest: {crop.daysToHarvest}</Text>
              </View>
              <View style={styles.detailRow}>
                <Leaf size={16} color="#666" />
                <Text style={styles.detailText}>Stage: {crop.stage}</Text>
              </View>
            </View>

            <View style={styles.actionSection}>
              <AlertCircle size={16} color="#FF715B" />
              <Text style={styles.actionText}>{crop.nextAction}</Text>
            </View>
          </View>
        </View>
      ))}

      <TouchableOpacity style={styles.addButton}>
        <PlusCircle size={24} color="white" />
        <Text style={styles.addButtonText}>Add New Crop</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  summary: {
    backgroundColor: 'white',
    margin: 15,
    padding: 20,
    borderRadius: 15,
    elevation: 2,
  },
  summaryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 15,
  },
  summaryStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#69B578',
  },
  statLabel: {
    fontSize: 12,
    color: '#7F8C8D',
    marginTop: 5,
  },
  cropCard: {
    backgroundColor: 'white',
    margin: 15,
    borderRadius: 15,
    elevation: 2,
    overflow: 'hidden',
  },
  cropImage: {
    width: '100%',
    height: 150,
  },
  cropInfo: {
    padding: 15,
  },
  cropHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  cropName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  cropDetails: {
    marginVertical: 10,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 3,
  },
  detailText: {
    marginLeft: 8,
    color: '#666',
    fontSize: 14,
  },
  actionSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF5F5',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  actionText: {
    marginLeft: 8,
    color: '#FF715B',
    fontSize: 14,
  },
  addButton: {
    backgroundColor: '#69B578',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 15,
    padding: 15,
    borderRadius: 10,
    marginBottom: 30,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});