import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const SeedCard = ({ product, onPress }) => {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <Image source={{ uri: product.imageUrl }} style={styles.image} />
            <View style={styles.info}>
                <Text style={styles.name} numberOfLines={1}>{product.name}</Text>
                <Text style={styles.seller}>{product.sellerName}</Text>
                <View style={styles.priceRow}>
                    <Text style={styles.price}>₹{product.price}</Text>
                    <View style={styles.addButton}>
                        <Text style={styles.addText}>ADD</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        flex: 1,
        backgroundColor: '#111827',
        borderRadius: 12,
        overflow: 'hidden',
        margin: 6,
        maxWidth: '47%',
    },
    image: {
        width: '100%',
        height: 120,
        resizeMode: 'cover',
    },
    info: {
        padding: 12,
    },
    name: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
    },
    seller: {
        color: '#9CA3AF',
        fontSize: 12,
        marginBottom: 8,
    },
    priceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    price: {
        color: '#16A34A',
        fontSize: 16,
        fontWeight: 'bold',
    },
    addButton: {
        backgroundColor: '#16A34A',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 6,
    },
    addText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: 'bold',
    },
});

export default SeedCard;
