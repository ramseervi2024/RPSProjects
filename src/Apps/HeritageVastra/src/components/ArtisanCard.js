import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { MapPin, Star } from 'lucide-react-native';

const ArtisanCard = ({ artisan, onPress }) => {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <Image source={{ uri: artisan.profileImage }} style={styles.image} />
            <View style={styles.content}>
                <Text style={styles.name}>{artisan.name}</Text>
                <Text style={styles.specialty}>{artisan.specialty} Specialist</Text>

                <View style={styles.infoRow}>
                    <MapPin size={14} color="#9CA3AF" />
                    <Text style={styles.city}>{artisan.city}</Text>
                </View>

                <View style={styles.infoRow}>
                    <Star size={14} color="#C59D5F" fill="#C59D5F" />
                    <Text style={styles.rating}>{artisan.rating} ({artisan.experienceYears} Years Exp.)</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#111827',
        borderRadius: 16,
        padding: 12,
        marginRight: 12,
        width: 160,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 40,
        alignSelf: 'center',
        marginBottom: 12,
        borderWidth: 2,
        borderColor: '#C59D5F',
    },
    content: {
        alignItems: 'center',
    },
    name: {
        fontSize: 16,
        fontWeight: '600',
        color: '#E5E7EB',
        textAlign: 'center',
        marginBottom: 4,
    },
    specialty: {
        fontSize: 12,
        color: '#C59D5F',
        marginBottom: 8,
        textAlign: 'center',
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    city: {
        marginLeft: 4,
        fontSize: 12,
        color: '#9CA3AF',
    },
    rating: {
        marginLeft: 4,
        fontSize: 12,
        color: '#9CA3AF',
    },
});

export default ArtisanCard;
