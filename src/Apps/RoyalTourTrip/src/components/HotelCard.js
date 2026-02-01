import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Star, MapPin } from 'lucide-react-native';

const HotelCard = ({ item, onPress }) => {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <Image source={{ uri: item.imageUrl }} style={styles.image} resizeMode="cover" />
            <View style={styles.info}>
                <View style={styles.headerRow}>
                    <Text style={styles.name}>{item.name}</Text>
                    <View style={styles.ratingContainer}>
                        <Star color="#FFC107" size={14} fill="#FFC107" />
                        <Text style={styles.rating}>{item.rating}</Text>
                    </View>
                </View>

                <View style={styles.row}>
                    <MapPin color="#888" size={14} />
                    <Text style={styles.city}>{item.city}</Text>
                </View>

                <View style={styles.amenitiesRow}>
                    {item.amenities.slice(0, 2).map((amenity, index) => (
                        <Text key={index} style={styles.amenityBadge}>{amenity}</Text>
                    ))}
                    {item.amenities.length > 2 && <Text style={styles.moreAmenities}>+{item.amenities.length - 2} more</Text>}
                </View>

                <View style={styles.priceRow}>
                    <Text style={styles.price}>{item.pricePerNight}</Text>
                    <Text style={styles.perNight}>/ night</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 16,
        marginBottom: 16,
        marginHorizontal: 16,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        height: 140,
        overflow: 'hidden',
    },
    image: {
        width: 120,
        height: '100%',
    },
    info: {
        flex: 1,
        padding: 12,
        justifyContent: 'space-between',
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        flex: 1,
        marginRight: 8,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF8E1',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 8,
    },
    rating: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#FFC107',
        marginLeft: 4,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    city: {
        fontSize: 12,
        color: '#888',
        marginLeft: 4,
    },
    amenitiesRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 8,
    },
    amenityBadge: {
        fontSize: 10,
        color: '#555',
        backgroundColor: '#f0f0f0',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
        marginRight: 6,
    },
    moreAmenities: {
        fontSize: 10,
        color: '#888',
        marginTop: 2,
    },
    priceRow: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        alignSelf: 'flex-end',
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#DAA520',
    },
    perNight: {
        fontSize: 12,
        color: '#888',
        marginLeft: 2,
        marginBottom: 2,
    },
});

export default HotelCard;
