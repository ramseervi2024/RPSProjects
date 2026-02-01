import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Star } from 'lucide-react-native';

const AgentCard = ({ agent }) => {
    return (
        <TouchableOpacity style={styles.card} activeOpacity={0.9}>
            <Image source={{ uri: agent.profileImage }} style={styles.image} />
            <View style={styles.info}>
                <Text style={styles.name}>{agent.name}</Text>
                <Text style={styles.city}>{agent.city}</Text>

                <View style={styles.ratingContainer}>
                    <Star size={12} color="#FFD700" fill="#FFD700" />
                    <Text style={styles.rating}>{agent.rating}</Text>
                    <Text style={styles.experience}>• {agent.experienceYears}y exp</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 12,
        marginRight: 16,
        width: 240,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 3,
        borderWidth: 1,
        borderColor: '#f0f0f0',
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 12,
        backgroundColor: '#f0f0f0',
    },
    info: {
        flex: 1,
    },
    name: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1a1a1a',
        marginBottom: 2,
    },
    city: {
        fontSize: 13,
        color: '#666',
        marginBottom: 4,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rating: {
        fontSize: 12,
        fontWeight: '700',
        color: '#333',
        marginLeft: 4,
        marginRight: 6,
    },
    experience: {
        fontSize: 12,
        color: '#8E8E93',
    },
});

export default AgentCard;
