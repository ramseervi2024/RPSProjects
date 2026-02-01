import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Calendar, DollarSign } from 'lucide-react-native';

const TripCard = ({ item, onPress }) => {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <View style={styles.header}>
                <Text style={styles.title}>{item.title}</Text>
            </View>

            <View style={styles.body}>
                <View style={styles.row}>
                    <Calendar color="#666" size={16} />
                    <Text style={styles.text}>{item.days}</Text>
                </View>
                <View style={styles.row}>
                    <DollarSign color="#666" size={16} />
                    <Text style={styles.text}>{item.budget}</Text>
                </View>
            </View>

            <Text style={styles.places}>Places: {item.places.join(', ')}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        marginRight: 16,
        width: 280, // Horizontal card
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        borderLeftWidth: 4,
        borderLeftColor: '#DAA520',
    },
    header: {
        marginBottom: 12,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    body: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        fontSize: 14,
        color: '#666',
        marginLeft: 6,
    },
    places: {
        fontSize: 12,
        color: '#888',
        fontStyle: 'italic',
    }
});

export default TripCard;
