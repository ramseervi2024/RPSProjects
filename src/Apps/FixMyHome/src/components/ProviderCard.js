import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Star, MapPin } from 'lucide-react-native';

const ProviderCard = ({ provider, onPress }) => {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <Image source={{ uri: provider.profileImage }} style={styles.image} />
            <View style={styles.details}>
                <Text style={styles.name}>{provider.name}</Text>
                <Text style={styles.specialty}>{provider.serviceType}</Text>
                <View style={styles.ratingRow}>
                    <Star size={14} color="#fbbf24" fill="#fbbf24" />
                    <Text style={styles.rating}>{provider.rating}</Text>
                    <Text style={styles.reviews}>({provider.experienceYears} yrs exp)</Text>
                </View>
                <View style={styles.locationRow}>
                    <MapPin size={14} color="#94a3b8" />
                    <Text style={styles.location}>{provider.city}</Text>
                </View>
            </View>
            <View style={styles.priceContainer}>
                <Text style={styles.hourlyRate}>${provider.pricePerHour}</Text>
                <Text style={styles.perHr}>/hr</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 12,
        marginBottom: 12,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
        borderWidth: 1,
        borderColor: '#f1f5f9',
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 12,
    },
    details: {
        flex: 1,
    },
    name: {
        fontSize: 16,
        fontWeight: '600',
        color: '#0f172a',
    },
    specialty: {
        fontSize: 13,
        color: '#64748b',
        marginBottom: 4,
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 2,
    },
    rating: {
        fontSize: 13,
        fontWeight: '600',
        color: '#0f172a',
        marginLeft: 4,
        marginRight: 4,
    },
    reviews: {
        fontSize: 12,
        color: '#94a3b8',
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    location: {
        fontSize: 12,
        color: '#94a3b8',
        marginLeft: 2,
    },
    priceContainer: {
        alignItems: 'flex-end',
    },
    hourlyRate: {
        fontSize: 16,
        fontWeight: '700',
        color: '#0284c7',
    },
    perHr: {
        fontSize: 12,
        color: '#64748b',
    },
});

export default ProviderCard;
