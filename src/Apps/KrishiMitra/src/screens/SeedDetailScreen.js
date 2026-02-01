import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { ArrowLeft, ShoppingCart, ShieldCheck } from 'lucide-react-native';

const SeedDetailScreen = ({ route, navigation }) => {
    const { product } = route.params;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <ArrowLeft color="#FFFFFF" size={24} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Product Details</Text>
                <View style={{ width: 24 }} />
            </View>
            <ScrollView contentContainerStyle={styles.content}>
                <Image source={{ uri: product.imageUrl }} style={styles.image} />

                <View style={styles.infoContainer}>
                    <View style={styles.badge}>
                        <ShieldCheck size={14} color="#16A34A" />
                        <Text style={styles.badgeText}>Certified Seller</Text>
                    </View>
                    <Text style={styles.name}>{product.name}</Text>
                    <Text style={styles.seller}>Sold by {product.sellerName}</Text>
                    <Text style={styles.price}>₹{product.price} <Text style={styles.unit}>/ packet</Text></Text>

                    <View style={styles.divider} />

                    <Text style={styles.sectionTitle}>Description</Text>
                    <Text style={styles.description}>{product.description}</Text>

                    <Text style={styles.sectionTitle}>Crop Type</Text>
                    <View style={styles.tag}>
                        <Text style={styles.tagText}>{product.cropType}</Text>
                    </View>
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity style={styles.buyButton}>
                    <ShoppingCart color="#FFFFFF" size={20} />
                    <Text style={styles.buyButtonText}>Buy Now</Text>
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
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        backgroundColor: '#111827'
    },
    headerTitle: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold'
    },
    content: {
        paddingBottom: 80,
    },
    image: {
        width: '100%',
        height: 300,
        resizeMode: 'cover',
    },
    infoContainer: {
        padding: 20,
        marginTop: -20,
        backgroundColor: '#0F172A',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
    },
    badge: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
        gap: 4
    },
    badgeText: {
        color: '#16A34A',
        fontSize: 12,
        fontWeight: '600'
    },
    name: {
        color: '#FFFFFF',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    seller: {
        color: '#9CA3AF',
        fontSize: 14,
        marginBottom: 16,
    },
    price: {
        color: '#16A34A',
        fontSize: 28,
        fontWeight: 'bold',
    },
    unit: {
        fontSize: 16,
        color: '#9CA3AF',
        fontWeight: 'normal'
    },
    divider: {
        height: 1,
        backgroundColor: '#374151',
        marginVertical: 20
    },
    sectionTitle: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8
    },
    description: {
        color: '#D1D5DB',
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 20,
    },
    tag: {
        backgroundColor: '#1F2937',
        alignSelf: 'flex-start',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8
    },
    tagText: {
        color: '#FFFFFF'
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 16,
        backgroundColor: '#111827',
        borderTopWidth: 1,
        borderTopColor: '#374151',
    },
    buyButton: {
        backgroundColor: '#16A34A',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        borderRadius: 12,
        gap: 8,
    },
    buyButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default SeedDetailScreen;
