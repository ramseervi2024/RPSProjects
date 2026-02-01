import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Star, MapPin } from 'lucide-react-native';

const PhotographerCard = ({ photographer, onPress }) => {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <Image source={{ uri: photographer.coverImage }} style={styles.image} />
            <View style={styles.content}>
                <View style={styles.headerRow}>
                    <Text style={styles.name}>{photographer.name}</Text>
                    <View style={styles.ratingContainer}>
                        <Star color="#000000" fill="#000000" size={14} />
                        <Text style={styles.rating}>{photographer.rating}</Text>
                    </View>
                </View>

                <View style={styles.locationRow}>
                    <MapPin color="#4B5563" size={14} />
                    <Text style={styles.location}>{photographer.city}</Text>
                </View>

                <View style={styles.footerRow}>
                    <View style={styles.categories}>
                        {photographer.categories.slice(0, 2).map((cat, index) => (
                            <View key={index} style={styles.categoryBadge}>
                                <Text style={styles.categoryText}>{cat}</Text>
                            </View>
                        ))}
                    </View>
                    <Text style={styles.price}>{photographer.price}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        marginBottom: 16,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
        borderWidth: 1,
        borderColor: '#000000',
    },
    image: {
        width: '100%',
        height: 180,
        resizeMode: 'cover',
    },
    content: {
        padding: 16,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000000',
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
    },
    rating: {
        color: '#000000',
        fontWeight: 'bold',
        marginLeft: 4,
        fontSize: 12,
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    location: {
        color: '#4B5563',
        marginLeft: 4,
        fontSize: 14,
    },
    footerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    categories: {
        flexDirection: 'row',
    },
    categoryBadge: {
        backgroundColor: '#F3F4F6',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
        marginRight: 6,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    categoryText: {
        color: '#374151',
        fontSize: 10,
        fontWeight: '600',
    },
    price: {
        color: '#000000',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default PhotographerCard;
