import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { ArrowLeft, Clock, DollarSign, Star } from 'lucide-react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import ProviderCard from '../components/ProviderCard';
import { providers } from '../data/providers';

const { width } = Dimensions.get('window');

const ServiceDetailScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { service } = route.params;

    // Filter providers for this service
    const serviceProviders = providers.filter(p => p.serviceType === service.name);

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.imageContainer}>
                    <Image source={{ uri: service.imageUrl }} style={styles.image} />
                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                        <ArrowLeft color="#fff" size={24} />
                    </TouchableOpacity>
                    <View style={styles.imageOverlay} />
                    <Text style={styles.titleOnImage}>{service.name}</Text>
                </View>

                <View style={styles.content}>
                    <Text style={styles.description}>{service.description}</Text>

                    <View style={styles.infoRow}>
                        <View style={styles.infoItem}>
                            <Clock color="#64748b" size={20} />
                            <Text style={styles.infoText}>{service.estimatedTime}</Text>
                        </View>
                        <View style={styles.infoItem}>
                            <DollarSign color="#64748b" size={20} />
                            <Text style={styles.infoText}>From ${service.basePrice}</Text>
                        </View>
                    </View>

                    <Text style={styles.sectionTitle}>Available Providers</Text>
                    {serviceProviders.length > 0 ? (
                        serviceProviders.map(provider => (
                            <ProviderCard
                                key={provider.id}
                                provider={provider}
                                onPress={() => { }} // Could go to provider profile
                            />
                        ))
                    ) : (
                        <Text style={styles.noProviders}>No providers available at the moment.</Text>
                    )}
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <View>
                    <Text style={styles.totalPriceLabel}>Starting Total</Text>
                    <Text style={styles.totalPrice}>${service.basePrice}</Text>
                </View>
                <TouchableOpacity
                    style={styles.bookButton}
                    onPress={() => navigation.navigate('BookNow', { service })}
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
        backgroundColor: '#fff',
    },
    scrollContent: {
        paddingBottom: 100,
    },
    imageContainer: {
        height: 300,
        width: width,
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    imageOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    backButton: {
        position: 'absolute',
        top: 50,
        left: 20,
        zIndex: 10,
        padding: 8,
        borderRadius: 20,
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    titleOnImage: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        color: '#fff',
        fontSize: 32,
        fontWeight: 'bold',
    },
    content: {
        padding: 20,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        marginTop: -20,
        backgroundColor: '#fff',
    },
    description: {
        fontSize: 16,
        color: '#334155',
        lineHeight: 24,
        marginBottom: 20,
    },
    infoRow: {
        flexDirection: 'row',
        marginBottom: 24,
        justifyContent: 'space-around',
        paddingVertical: 12,
        backgroundColor: '#f8fafc',
        borderRadius: 12,
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    infoText: {
        marginLeft: 8,
        fontSize: 16,
        fontWeight: '600',
        color: '#0f172a',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#0f172a',
        marginBottom: 16,
    },
    noProviders: {
        color: '#64748b',
        fontStyle: 'italic',
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#e2e8f0',
    },
    totalPriceLabel: {
        fontSize: 12,
        color: '#64748b',
    },
    totalPrice: {
        fontSize: 24,
        fontWeight: '800',
        color: '#0f172a',
    },
    bookButton: {
        backgroundColor: '#0284c7',
        paddingVertical: 14,
        paddingHorizontal: 32,
        borderRadius: 16,
    },
    bookButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
    },
});

export default ServiceDetailScreen;
