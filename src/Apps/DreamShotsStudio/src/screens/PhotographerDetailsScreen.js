import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Star, MapPin, Check } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const PhotographerDetailsScreen = ({ route, navigation }) => {
    const { photographer } = route.params;

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Header Image */}
                <Image source={{ uri: photographer.coverImage }} style={styles.coverImage} />

                <View style={styles.profileSection}>
                    <Image source={{ uri: photographer.profileImage }} style={styles.profileImage} />
                    <View style={styles.headerInfo}>
                        <Text style={styles.name}>{photographer.name}</Text>
                        <View style={styles.row}>
                            <MapPin color="#9CA3AF" size={16} />
                            <Text style={styles.location}>{photographer.city}</Text>
                        </View>
                        <View style={styles.ratingRow}>
                            <Star color="#FFD700" fill="#FFD700" size={16} />
                            <Text style={styles.rating}>{photographer.rating} Rating</Text>
                        </View>
                    </View>
                </View>

                {/* Bio */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>About</Text>
                    <Text style={styles.bioText}>{photographer.bio}</Text>
                </View>

                {/* Portfolio */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Portfolio</Text>
                    <View style={styles.portfolioGrid}>
                        {photographer.portfolio.map((img, index) => (
                            <Image key={index} source={{ uri: img }} style={styles.portfolioItem} />
                        ))}
                    </View>
                </View>

                {/* Packages */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Packages</Text>
                    {photographer.packages.map((pkg) => (
                        <View key={pkg.id} style={styles.packageCard}>
                            <View style={styles.packageHeader}>
                                <Text style={styles.packageName}>{pkg.name}</Text>
                                <Text style={styles.packagePrice}>{pkg.price}</Text>
                            </View>
                            <View style={styles.featuresList}>
                                {pkg.features.map((feature, idx) => (
                                    <View key={idx} style={styles.featureRow}>
                                        <Check color="#FFD700" size={14} />
                                        <Text style={styles.featureText}>{feature}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                    ))}
                </View>
                <View style={{ height: 100 }} />
            </ScrollView>

            {/* Book Now Button */}
            <View style={styles.footer}>
                <View>
                    <Text style={styles.priceLabel}>Starting from</Text>
                    <Text style={styles.footerPrice}>{photographer.price}</Text>
                </View>
                <TouchableOpacity
                    style={styles.bookButton}
                    onPress={() => navigation.navigate('BookNow', { photographer })}
                >
                    <Text style={styles.bookButtonText}>Book Now</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0F172A',
    },
    scrollContent: {
        paddingBottom: 20,
    },
    coverImage: {
        width: '100%',
        height: 250,
    },
    profileSection: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        marginTop: -40,
        alignItems: 'flex-end',
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 4,
        borderColor: '#0F172A',
    },
    headerInfo: {
        marginLeft: 16,
        paddingBottom: 4,
    },
    name: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#F3F4F6',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    location: {
        color: '#9CA3AF',
        marginLeft: 4,
        fontSize: 14,
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    rating: {
        color: '#FFD700',
        marginLeft: 4,
        fontWeight: '600',
    },
    section: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#1F2937',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#F3F4F6',
        marginBottom: 12,
    },
    bioText: {
        color: '#D1D5DB',
        lineHeight: 22,
    },
    portfolioGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    portfolioItem: {
        width: (width - 60) / 3, // 3 columns with padding
        height: (width - 60) / 3,
        marginBottom: 10,
        borderRadius: 8,
    },
    packageCard: {
        backgroundColor: '#111827',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#374151',
    },
    packageHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    packageName: {
        color: '#F3F4F6',
        fontSize: 16,
        fontWeight: 'bold',
    },
    packagePrice: {
        color: '#FFD700',
        fontSize: 18,
        fontWeight: 'bold',
    },
    featuresList: {
        marginTop: 8,
    },
    featureRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
    },
    featureText: {
        color: '#9CA3AF',
        marginLeft: 8,
        fontSize: 14,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#111827',
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#374151',
    },
    priceLabel: {
        color: '#9CA3AF',
        fontSize: 12,
    },
    footerPrice: {
        color: '#F3F4F6',
        fontSize: 20,
        fontWeight: 'bold',
    },
    bookButton: {
        backgroundColor: '#FFD700',
        paddingHorizontal: 32,
        paddingVertical: 12,
        borderRadius: 24,
    },
    bookButtonText: {
        color: '#0F172A',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default PhotographerDetailsScreen;
