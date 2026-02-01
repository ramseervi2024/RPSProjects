import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Star, Heart } from 'lucide-react-native';

const ProductCard = ({ product, onPress, onLikePress }) => {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <Image source={{ uri: product.imageUrl }} style={styles.image} />
            <TouchableOpacity style={styles.likeButton} onPress={onLikePress}>
                <Heart size={20} color="#C59D5F" />
            </TouchableOpacity>
            <View style={styles.content}>
                <Text style={styles.category}>{product.category}</Text>
                <Text style={styles.name} numberOfLines={1}>{product.name}</Text>
                <View style={styles.ratingContainer}>
                    <Star size={14} color="#C59D5F" fill="#C59D5F" />
                    <Text style={styles.rating}>{product.rating}</Text>
                </View>
                <View style={styles.priceContainer}>
                    <Text style={styles.price}>₹{product.price}</Text>
                    {product.originalPrice && (
                        <Text style={styles.originalPrice}>₹{product.originalPrice}</Text>
                    )}
                    {product.discount && (
                        <Text style={styles.discount}>{product.discount}% OFF</Text>
                    )}
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#111827',
        borderRadius: 16,
        overflow: 'hidden',
        marginBottom: 16,
        flex: 1,
        marginHorizontal: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    image: {
        width: '100%',
        height: 150,
        resizeMode: 'cover',
    },
    likeButton: {
        position: 'absolute',
        top: 8,
        right: 8,
        backgroundColor: 'rgba(15, 23, 42, 0.6)',
        borderRadius: 20,
        padding: 6,
    },
    content: {
        padding: 12,
    },
    category: {
        fontSize: 12,
        color: '#9CA3AF',
        marginBottom: 4,
    },
    name: {
        fontSize: 16,
        fontWeight: '600',
        color: '#E5E7EB',
        marginBottom: 4,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    rating: {
        marginLeft: 4,
        fontSize: 12,
        color: '#E5E7EB',
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'baseline',
        flexWrap: 'wrap',
    },
    price: {
        fontSize: 16,
        fontWeight: '700',
        color: '#C59D5F',
        marginRight: 6,
    },
    originalPrice: {
        fontSize: 12,
        color: '#6B7280',
        textDecorationLine: 'line-through',
        marginRight: 6,
    },
    discount: {
        fontSize: 12,
        color: '#4ADE80',
        fontWeight: '600',
    },
});

export default ProductCard;
