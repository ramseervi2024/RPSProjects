import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import Header from '../components/Header';
import { PRODUCTS } from '../data/products';
import { Minus, Plus, Trash2 } from 'lucide-react-native';

const CartScreen = ({ navigation }) => {
    // Dummy cart items
    const cartItems = [
        { ...PRODUCTS[0], quantity: 1, selectedSize: 'M' },
        { ...PRODUCTS[2], quantity: 2, selectedSize: 'L' },
        { ...PRODUCTS[4], quantity: 1, selectedSize: 'S' },
    ];

    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const renderItem = ({ item }) => (
        <View style={styles.cartItem}>
            <Image source={{ uri: item.imageUrl }} style={styles.image} />
            <View style={styles.details}>
                <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
                <Text style={styles.variant}>Size: {item.selectedSize} | {item.category}</Text>
                <Text style={styles.price}>₹{item.price}</Text>

                <View style={styles.actions}>
                    <View style={styles.quantityControls}>
                        <TouchableOpacity style={styles.qtyBtn}>
                            <Minus size={14} color="#E5E7EB" />
                        </TouchableOpacity>
                        <Text style={styles.qtyText}>{item.quantity}</Text>
                        <TouchableOpacity style={styles.qtyBtn}>
                            <Plus size={14} color="#E5E7EB" />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity>
                        <Trash2 size={18} color="#EF4444" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Header title="My Cart" showCart={false} />
            <FlatList
                data={cartItems}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContent}
            />

            <View style={styles.footer}>
                <View style={styles.totalRow}>
                    <Text style={styles.totalLabel}>Total</Text>
                    <Text style={styles.totalAmount}>₹{total}</Text>
                </View>
                <TouchableOpacity style={styles.checkoutButton}>
                    <Text style={styles.checkoutText}>Proceed to Checkout</Text>
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
    listContent: {
        padding: 16,
    },
    cartItem: {
        flexDirection: 'row',
        backgroundColor: '#111827',
        borderRadius: 16,
        padding: 12,
        marginBottom: 16,
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 12,
    },
    details: {
        flex: 1,
        marginLeft: 12,
        justifyContent: 'space-between',
    },
    name: {
        color: '#E5E7EB',
        fontSize: 16,
        fontWeight: '600',
    },
    variant: {
        color: '#9CA3AF',
        fontSize: 12,
    },
    price: {
        color: '#C59D5F',
        fontSize: 16,
        fontWeight: '700',
        marginTop: 4,
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 8,
    },
    quantityControls: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1F2937',
        borderRadius: 8,
    },
    qtyBtn: {
        padding: 6,
    },
    qtyText: {
        color: '#E5E7EB',
        paddingHorizontal: 12,
        fontWeight: '600',
    },
    footer: {
        padding: 20,
        backgroundColor: '#111827',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    totalLabel: {
        color: '#9CA3AF',
        fontSize: 16,
    },
    totalAmount: {
        color: '#E5E7EB',
        fontSize: 24,
        fontWeight: 'bold',
    },
    checkoutButton: {
        backgroundColor: '#C59D5F',
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
    },
    checkoutText: {
        color: '#0F172A',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default CartScreen;
