import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { ArrowLeft, Star, MapPin, Wifi, Coffee, Car, Utensils } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const HotelDetailScreen = ({ route, navigation }) => {
    const { item } = route.params;

    // Helper to get icon for amenity
    const getAmenityIcon = (name) => {
        const lower = name.toLowerCase();
        if (lower.includes('pool') || lower.includes('spa')) return <Coffee size={20} color="#DAA520" />;
        if (lower.includes('dining') || lower.includes('food') || lower.includes('buffet')) return <Utensils size={20} color="#DAA520" />;
        if (lower.includes('parking') || lower.includes('transfer')) return <Car size={20} color="#DAA520" />;
        return <Wifi size={20} color="#DAA520" />;
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
                <View style={styles.imageContainer}>
                    <Image source={{ uri: item.imageUrl }} style={styles.image} resizeMode="cover" />
                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                        <ArrowLeft color="#fff" size={24} />
                    </TouchableOpacity>
                </View>

                <View style={styles.content}>
                    <View style={styles.header}>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.title}>{item.name}</Text>
                            <View style={styles.locationRow}>
                                <MapPin color="#666" size={14} />
                                <Text style={styles.location}>{item.city}</Text>
                            </View>
                        </View>
                        <View style={styles.ratingBox}>
                            <Star color="#fff" size={14} fill="#fff" />
                            <Text style={styles.ratingText}>{item.rating}</Text>
                        </View>
                    </View>

                    <View style={styles.divider} />

                    <Text style={styles.sectionTitle}>Amenities</Text>
                    <View style={styles.amenitiesGrid}>
                        {item.amenities.map((amenity, index) => (
                            <View key={index} style={styles.amenityItem}>
                                <View style={styles.iconCircle}>
                                    {getAmenityIcon(amenity)}
                                </View>
                                <Text style={styles.amenityName}>{amenity}</Text>
                            </View>
                        ))}
                    </View>

                    <View style={styles.divider} />

                    <Text style={styles.sectionTitle}>Description</Text>
                    <Text style={styles.description}>
                        Experience world-class luxury and traditional Rajasthani hospitality at {item.name}.
                        Located in the heart of {item.city}, this property offers stunning views and premium amenities
                        to make your stay unforgettable.
                    </Text>

                </View>
            </ScrollView>

            <View style={styles.footer}>
                <View>
                    <Text style={styles.priceLabel}>Price per night</Text>
                    <Text style={styles.price}>{item.pricePerNight}</Text>
                </View>
                <TouchableOpacity style={styles.bookButton}>
                    <Text style={styles.bookButtonText}>Book Stay</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    imageContainer: {
        height: 300,
        width: width,
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    backButton: {
        position: 'absolute',
        top: 50,
        left: 20,
        backgroundColor: 'rgba(0,0,0,0.3)',
        borderRadius: 20,
        padding: 8,
    },
    content: {
        padding: 24,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        marginTop: -30,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    location: {
        fontSize: 16,
        color: '#666',
        marginLeft: 4,
    },
    ratingBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#DAA520', // Gold
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
    },
    ratingText: {
        color: '#fff',
        fontWeight: 'bold',
        marginLeft: 4,
    },
    divider: {
        height: 1,
        backgroundColor: '#eee',
        marginVertical: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 16,
    },
    amenitiesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    amenityItem: {
        width: '50%',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    iconCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#FFF8E1',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    amenityName: {
        color: '#555',
        fontSize: 14,
    },
    description: {
        fontSize: 15,
        color: '#666',
        lineHeight: 22,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        padding: 20,
        paddingBottom: 34,
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    priceLabel: {
        fontSize: 12,
        color: '#888',
    },
    price: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#DAA520',
    },
    bookButton: {
        backgroundColor: '#333',
        paddingHorizontal: 32,
        paddingVertical: 14,
        borderRadius: 16,
    },
    bookButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default HotelDetailScreen;
