import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { MapPin } from 'lucide-react-native';

const PropertyCard = ({ property, onPress }) => {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>
            <Image source={{ uri: property.images[0] }} style={styles.image} />

            <View style={styles.tagContainer}>
                <View style={styles.tag}>
                    <Text style={styles.tagText}>{property.type}</Text>
                </View>
                <View style={[styles.tag, styles.statusTag]}>
                    <Text style={[styles.tagText, styles.statusText]}>{property.status}</Text>
                </View>
            </View>

            <View style={styles.content}>
                <Text style={styles.price}>{property.price}</Text>
                <Text style={styles.title} numberOfLines={1}>{property.title}</Text>

                <View style={styles.footer}>
                    <View style={styles.locationRow}>
                        <MapPin size={14} color="#8E8E93" />
                        <Text style={styles.location} numberOfLines={1}>{property.location}</Text>
                    </View>
                    <Text style={styles.area}>{property.area}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        width: 260, // Fixed width for horizontal lists
        backgroundColor: '#fff',
        borderRadius: 16,
        marginRight: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.06,
        shadowRadius: 10,
        elevation: 4,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: 160,
        backgroundColor: '#f0f0f0',
    },
    tagContainer: {
        position: 'absolute',
        top: 12,
        left: 12,
        flexDirection: 'row',
    },
    tag: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
        marginRight: 8,
    },
    statusTag: {
        backgroundColor: '#007AFF',
    },
    tagText: {
        fontSize: 10,
        fontWeight: '700',
        color: '#333',
        textTransform: 'uppercase',
    },
    statusText: {
        color: '#fff',
    },
    content: {
        padding: 12,
    },
    price: {
        fontSize: 18,
        fontWeight: '800',
        color: '#007AFF',
        marginBottom: 4,
    },
    title: {
        fontSize: 15,
        fontWeight: '600',
        color: '#1a1a1a',
        marginBottom: 8,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 8,
        borderTopWidth: 1,
        borderTopColor: '#f2f2f2',
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    location: {
        fontSize: 12,
        color: '#8E8E93',
        marginLeft: 4,
        paddingRight: 8,
    },
    area: {
        fontSize: 12,
        fontWeight: '600',
        color: '#333',
    },
});

export default PropertyCard;
