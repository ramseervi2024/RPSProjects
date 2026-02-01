import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { ArrowLeft, MapPin, Share2, Heart, MessageCircle, Phone, Square } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const PropertyDetailScreen = ({ route, navigation }) => {
    const { property } = route.params;

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {/* Image Header */}
                <View style={styles.imageContainer}>
                    <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
                        {property.images.map((img, idx) => (
                            <Image key={idx} source={{ uri: img }} style={styles.image} />
                        ))}
                    </ScrollView>

                    <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                        <ArrowLeft color="#fff" size={24} />
                    </TouchableOpacity>

                    <View style={styles.topActions}>
                        <TouchableOpacity style={styles.actionBtn}>
                            <Share2 color="#fff" size={20} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.actionBtn}>
                            <Heart color="#fff" size={20} />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Content */}
                <View style={styles.content}>
                    <View style={styles.headerRow}>
                        <Text style={styles.price}>{property.price}</Text>
                        <View style={[styles.statusTag, property.status === 'Buy' ? styles.buyTag : styles.rentTag]}>
                            <Text style={styles.statusText}>{property.status}</Text>
                        </View>
                    </View>

                    <Text style={styles.title}>{property.title}</Text>

                    <View style={styles.locationRow}>
                        <MapPin size={16} color="#666" />
                        <Text style={styles.location}>{property.location}</Text>
                    </View>

                    {/* Quick Stats */}
                    <View style={styles.statsContainer}>
                        <View style={styles.statItem}>
                            <Square size={20} color="#007AFF" />
                            <Text style={styles.statValue}>{property.area}</Text>
                            <Text style={styles.statLabel}>Total Area</Text>
                        </View>
                        <View style={styles.statItem}>
                            <Text style={styles.emoji}>🏠</Text>
                            <Text style={styles.statValue}>{property.type}</Text>
                            <Text style={styles.statLabel}>Property Type</Text>
                        </View>
                    </View>

                    {/* Description */}
                    <Text style={styles.sectionTitle}>Description</Text>
                    <Text style={styles.description}>{property.description}</Text>

                    {/* Map Placeholder */}
                    <Text style={styles.sectionTitle}>Location</Text>
                    <View style={styles.mapPlaceholder}>
                        <Text style={styles.mapText}>Map View Placeholder</Text>
                    </View>

                    {/* Owner */}
                    <Text style={styles.sectionTitle}>Contact Owner</Text>
                    <View style={styles.ownerCard}>
                        <View style={styles.ownerInfo}>
                            <View style={styles.ownerAvatar}>
                                <Text style={styles.initials}>{property.ownerName.charAt(0)}</Text>
                            </View>
                            <View>
                                <Text style={styles.ownerName}>{property.ownerName}</Text>
                                <Text style={styles.ownerRole}>Owner</Text>
                            </View>
                        </View>
                        <View style={styles.contactRow}>
                            <TouchableOpacity style={[styles.contactBtn, styles.msgBtn]}>
                                <MessageCircle size={20} color="#007AFF" />
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.contactBtn, styles.callBtn]}>
                                <Phone size={20} color="#fff" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>

            {/* Button Action Bar */}
            <View style={styles.actionBar}>
                <TouchableOpacity style={styles.chatButton}>
                    <Text style={styles.chatBtnText}>Chat with Owner</Text>
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
        width: width,
        height: 300,
        resizeMode: 'cover',
    },
    backBtn: {
        position: 'absolute',
        top: 44,
        left: 20,
        padding: 8,
        borderRadius: 20,
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    topActions: {
        position: 'absolute',
        top: 44,
        right: 20,
        flexDirection: 'row',
    },
    actionBtn: {
        padding: 8,
        borderRadius: 20,
        backgroundColor: 'rgba(0,0,0,0.3)',
        marginLeft: 10,
    },
    content: {
        padding: 20,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        marginTop: -24,
        backgroundColor: '#fff',
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    price: {
        fontSize: 26,
        fontWeight: '800',
        color: '#007AFF',
    },
    statusTag: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
    },
    buyTag: { backgroundColor: '#E3F2FD' },
    rentTag: { backgroundColor: '#FFF3E0' },
    statusText: {
        fontWeight: '700',
        color: '#333',
        textTransform: 'uppercase',
        fontSize: 12,
    },
    title: {
        fontSize: 22,
        fontWeight: '700',
        color: '#1a1a1a',
        marginBottom: 8,
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
    },
    location: {
        fontSize: 16,
        color: '#666',
        marginLeft: 6,
    },
    statsContainer: {
        flexDirection: 'row',
        marginBottom: 24,
        backgroundColor: '#F9F9F9',
        borderRadius: 16,
        padding: 16,
        justifyContent: 'space-around',
    },
    statItem: {
        alignItems: 'center',
    },
    emoji: { fontSize: 20 },
    statValue: {
        fontSize: 16,
        fontWeight: '700',
        marginTop: 4,
        color: '#333',
    },
    statLabel: {
        fontSize: 12,
        color: '#888',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 12,
        marginTop: 12,
        color: '#1a1a1a',
    },
    description: {
        fontSize: 16,
        lineHeight: 24,
        color: '#555',
        marginBottom: 12,
    },
    mapPlaceholder: {
        height: 150,
        backgroundColor: '#eee',
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    mapText: { color: '#999' },
    ownerCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#FAFAFA',
        padding: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#f0f0f0',
    },
    ownerInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ownerAvatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#007AFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    initials: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    ownerName: {
        fontSize: 16,
        fontWeight: '700',
        color: '#333',
    },
    ownerRole: {
        fontSize: 13,
        color: '#888',
    },
    contactRow: {
        flexDirection: 'row',
    },
    contactBtn: {
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 12,
    },
    msgBtn: { backgroundColor: '#E3F2FD' },
    callBtn: { backgroundColor: '#007AFF' },
    actionBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        padding: 20,
        paddingBottom: 34,
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
    },
    chatButton: {
        backgroundColor: '#007AFF',
        paddingVertical: 16,
        borderRadius: 16,
        alignItems: 'center',
    },
    chatBtnText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default PropertyDetailScreen;
