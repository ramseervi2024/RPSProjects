import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ScrollView, Modal } from 'react-native';
import Header from '../components/Header';
import { ARTISANS } from '../data/artisans';
import { MapPin, Star, X } from 'lucide-react-native';

const ArtisansScreen = () => {
    const [selectedArtisan, setSelectedArtisan] = useState(null);

    const renderArtisan = ({ item }) => (
        <TouchableOpacity style={styles.card} onPress={() => setSelectedArtisan(item)}>
            <Image source={{ uri: item.profileImage }} style={styles.image} />
            <View style={styles.info}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.specialty}>{item.specialty}</Text>
                <View style={styles.row}>
                    <MapPin size={14} color="#9CA3AF" />
                    <Text style={styles.city}>{item.city}</Text>
                </View>
                <View style={styles.row}>
                    <Star size={14} color="#C59D5F" fill="#C59D5F" />
                    <Text style={styles.subtext}>{item.rating} • {item.experienceYears} Years Exp.</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Header title="Our Artisans" showCart={false} />
            <FlatList
                data={ARTISANS}
                renderItem={renderArtisan}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContent}
            />

            {/* Artisan Profile Modal */}
            <Modal visible={!!selectedArtisan} animationType="slide" transparent={true}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        {selectedArtisan && (
                            <ScrollView>
                                <TouchableOpacity
                                    style={styles.closeButton}
                                    onPress={() => setSelectedArtisan(null)}
                                >
                                    <X size={24} color="#E5E7EB" />
                                </TouchableOpacity>
                                <Image source={{ uri: selectedArtisan.storeImage }} style={styles.modalCover} />
                                <View style={styles.profileSection}>
                                    <Image source={{ uri: selectedArtisan.profileImage }} style={styles.modalProfilePic} />
                                    <Text style={styles.modalName}>{selectedArtisan.name}</Text>
                                    <Text style={styles.modalSpecialty}>{selectedArtisan.specialty} Specialist</Text>
                                </View>

                                <View style={styles.detailsSection}>
                                    <Text style={styles.sectionTitle}>About</Text>
                                    <Text style={styles.bio}>{selectedArtisan.bio}</Text>

                                    <View style={styles.statRow}>
                                        <View style={styles.statItem}>
                                            <Text style={styles.statValue}>{selectedArtisan.experienceYears}+</Text>
                                            <Text style={styles.statLabel}>Years</Text>
                                        </View>
                                        <View style={styles.statItem}>
                                            <Text style={styles.statValue}>{selectedArtisan.rating}</Text>
                                            <Text style={styles.statLabel}>Rating</Text>
                                        </View>
                                        <View style={styles.statItem}>
                                            <Text style={styles.statValue}>{selectedArtisan.city}</Text>
                                            <Text style={styles.statLabel}>Location</Text>
                                        </View>
                                    </View>
                                </View>
                            </ScrollView>
                        )}
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0F172A',
    },
    listContent: {
        padding: 16,
    },
    card: {
        flexDirection: 'row',
        backgroundColor: '#111827',
        borderRadius: 16,
        padding: 12,
        marginBottom: 16,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 35,
        borderWidth: 2,
        borderColor: '#C59D5F',
    },
    info: {
        marginLeft: 16,
        flex: 1,
    },
    name: {
        fontSize: 18,
        fontWeight: '600',
        color: '#E5E7EB',
    },
    specialty: {
        color: '#C59D5F',
        marginBottom: 4,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginTop: 2,
    },
    city: {
        color: '#9CA3AF',
        fontSize: 12,
    },
    subtext: {
        color: '#9CA3AF',
        fontSize: 12,
    },

    // Modal Styles
    modalContainer: {
        flex: 1,
        paddingTop: 50,
        backgroundColor: 'rgba(0,0,0,0.9)',
    },
    modalContent: {
        flex: 1,
        backgroundColor: '#0F172A',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        overflow: 'hidden',
    },
    modalCover: {
        width: '100%',
        height: 180,
        resizeMode: 'cover',
    },
    closeButton: {
        position: 'absolute',
        top: 16,
        right: 16,
        zIndex: 10,
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 20,
        padding: 8,
    },
    profileSection: {
        alignItems: 'center',
        marginTop: -40,
        marginBottom: 20,
    },
    modalProfilePic: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 3,
        borderColor: '#0F172A',
    },
    modalName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#E5E7EB',
        marginTop: 8,
    },
    modalSpecialty: {
        fontSize: 16,
        color: '#C59D5F',
    },
    detailsSection: {
        padding: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#E5E7EB',
        marginBottom: 8,
    },
    bio: {
        color: '#9CA3AF',
        lineHeight: 22,
        marginBottom: 24,
    },
    statRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#111827',
        padding: 16,
        borderRadius: 16,
    },
    statItem: {
        alignItems: 'center',
    },
    statValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#C59D5F',
    },
    statLabel: {
        fontSize: 12,
        color: '#6B7280',
        marginTop: 4,
    },
});

export default ArtisansScreen;
