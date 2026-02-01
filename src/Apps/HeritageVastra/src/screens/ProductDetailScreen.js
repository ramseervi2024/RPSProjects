import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import Header from '../components/Header';
import { Star, Truck, ShieldCheck, Heart } from 'lucide-react-native';

const ProductDetailScreen = ({ route, navigation }) => {
    const { product } = route.params;
    const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
    const [selectedColor, setSelectedColor] = useState(product.colors[0]);

    return (
        <View style={styles.container}>
            <Header title="Details" showMenu={false} />
            <ScrollView>
                <Image source={{ uri: product.imageUrl }} style={styles.image} />

                <View style={styles.content}>
                    <View style={styles.headerRow}>
                        <View>
                            <Text style={styles.category}>{product.category}</Text>
                            <Text style={styles.name}>{product.name}</Text>
                        </View>
                        <TouchableOpacity style={styles.wishlistButton}>
                            <Heart size={24} color="#C59D5F" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.ratingRow}>
                        <Star size={16} color="#C59D5F" fill="#C59D5F" />
                        <Text style={styles.ratingText}>{product.rating} Rating</Text>
                    </View>

                    <View style={styles.priceRow}>
                        <Text style={styles.price}>₹{product.price}</Text>
                        {product.originalPrice && <Text style={styles.originalPrice}>₹{product.originalPrice}</Text>}
                        <Text style={styles.discount}>{product.discount}% OFF</Text>
                    </View>

                    <Text style={styles.sectionTitle}>Select Size</Text>
                    <View style={styles.optionsRow}>
                        {product.sizes.map(size => (
                            <TouchableOpacity
                                key={size}
                                style={[styles.sizeOption, selectedSize === size && styles.selectedSize]}
                                onPress={() => setSelectedSize(size)}
                            >
                                <Text style={[styles.sizeText, selectedSize === size && styles.selectedSizeText]}>{size}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <Text style={styles.sectionTitle}>Select Color</Text>
                    <View style={styles.optionsRow}>
                        {product.colors.map(color => (
                            <TouchableOpacity
                                key={color}
                                style={[styles.colorOption, selectedColor === color && styles.selectedColor]}
                                onPress={() => setSelectedColor(color)}
                            >
                                <Text style={[styles.colorText, selectedColor === color && styles.selectedColorText]}>{color}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <Text style={styles.sectionTitle}>Description</Text>
                    <Text style={styles.description}>{product.description}</Text>

                    <View style={styles.features}>
                        <View style={styles.featureItem}>
                            <Truck size={20} color="#C59D5F" />
                            <Text style={styles.featureText}>Free Shipping</Text>
                        </View>
                        <View style={styles.featureItem}>
                            <ShieldCheck size={20} color="#C59D5F" />
                            <Text style={styles.featureText}>Authentic</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity style={styles.addToCartButton} onPress={() => navigation.navigate('Cart')}>
                    <Text style={styles.addToCartText}>Add to Cart</Text>
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
    image: {
        width: '100%',
        height: 400,
        resizeMode: 'cover',
    },
    content: {
        padding: 20,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'start',
    },
    wishlistButton: {
        padding: 8,
        backgroundColor: '#111827',
        borderRadius: 20,
    },
    category: {
        color: '#C59D5F',
        fontSize: 14,
        marginBottom: 4,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#E5E7EB',
        marginBottom: 8,
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        gap: 6,
    },
    ratingText: {
        color: '#9CA3AF',
    },
    priceRow: {
        flexDirection: 'row',
        alignItems: 'baseline',
        marginBottom: 24,
        gap: 12,
    },
    price: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#C59D5F',
    },
    originalPrice: {
        fontSize: 18,
        textDecorationLine: 'line-through',
        color: '#6B7280',
    },
    discount: {
        color: '#4ADE80',
        fontWeight: '600',
        fontSize: 16,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#E5E7EB',
        marginBottom: 12,
    },
    optionsRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
        marginBottom: 24,
    },
    sizeOption: {
        width: 48,
        height: 48,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: '#374151',
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedSize: {
        backgroundColor: '#C59D5F',
        borderColor: '#C59D5F',
    },
    sizeText: {
        color: '#E5E7EB',
        fontWeight: '500',
    },
    selectedSizeText: {
        color: '#0F172A',
    },
    colorOption: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#374151',
    },
    selectedColor: {
        backgroundColor: '#C59D5F',
        borderColor: '#C59D5F',
    },
    colorText: {
        color: '#E5E7EB',
    },
    selectedColorText: {
        color: '#0F172A',
        fontWeight: '600',
    },
    description: {
        color: '#9CA3AF',
        lineHeight: 24,
        marginBottom: 24,
    },
    features: {
        flexDirection: 'row',
        gap: 24,
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: '#1F2937',
    },
    featureItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    featureText: {
        color: '#E5E7EB',
        fontSize: 14,
    },
    footer: {
        padding: 16,
        backgroundColor: '#111827',
        borderTopWidth: 1,
        borderTopColor: '#1F2937',
    },
    addToCartButton: {
        backgroundColor: '#C59D5F',
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
    },
    addToCartText: {
        color: '#0F172A',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default ProductDetailScreen;
