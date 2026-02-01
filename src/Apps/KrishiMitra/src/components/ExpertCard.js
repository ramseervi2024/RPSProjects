import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Star, MessageCircle } from 'lucide-react-native';

const ExpertCard = ({ expert }) => {
    return (
        <View style={styles.card}>
            <Image source={{ uri: expert.image }} style={styles.image} />
            <View style={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.name}>{expert.name}</Text>
                    <View style={styles.rating}>
                        <Star size={14} color="#FACC15" fill="#FACC15" />
                        <Text style={styles.ratingText}>{expert.rating}</Text>
                    </View>
                </View>
                <Text style={styles.specialization}>{expert.specialization}</Text>
                <Text style={styles.experience}>{expert.experienceYears} Years Exp. • {expert.city}</Text>
            </View>
            <TouchableOpacity style={styles.chatButton}>
                <MessageCircle size={20} color="#FFFFFF" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#111827',
        borderRadius: 16,
        padding: 12,
        marginBottom: 12,
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 12,
    },
    content: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    name: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    rating: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(250, 204, 21, 0.1)',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
    },
    ratingText: {
        color: '#FACC15',
        marginLeft: 4,
        fontSize: 12,
        fontWeight: 'bold',
    },
    specialization: {
        color: '#16A34A',
        fontSize: 14,
        marginBottom: 2,
    },
    experience: {
        color: '#9CA3AF',
        fontSize: 12,
    },
    chatButton: {
        backgroundColor: '#16A34A',
        padding: 10,
        borderRadius: 12,
        marginLeft: 8,
    },
});

export default ExpertCard;
