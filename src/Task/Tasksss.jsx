import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
} from 'react-native';
import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';

// Mock AsyncStorage since it's not in dependencies
const mockAsyncStorage = {
    setItem: async (key, value) => {
        console.log(`[MockStorage] Set ${key}:`, value);
        return Promise.resolve();
    },
};

export default function Tasksss() {
    const [products, setProducts] = useState([]);
    const [quantities, setQuantities] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [isOrdered, setIsOrdered] = useState(false);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            setError(false);
            const response = await axios.get('https://fakestoreapi.com/products');
            setProducts(response.data);
            // Initialize quantities
            const initialQuantities = {};
            response.data.forEach(item => {
                initialQuantities[item.id] = 0;
            });
            setQuantities(initialQuantities);
        } catch (err) {
            console.error('Fetch error:', err);
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    const updateQuantity = (id, delta) => {
        setQuantities(prev => ({
            ...prev,
            [id]: Math.max(0, (prev[id] || 0) + delta),
        }));
    };

    const totalPrice = useMemo(() => {
        return products.reduce((acc, item) => {
            const qty = quantities[item.id] || 0;
            return acc + item.price * qty;
        }, 0);
    }, [products, quantities]);

    const handleOrder = async () => {
        const orderData = products
            .filter(item => quantities[item.id] > 0)
            .map(item => ({
                id: item.id,
                title: item.title,
                price: item.price,
                quantity: quantities[item.id],
            }));

        if (orderData.length === 0) {
            Alert.alert('Empty Cart', 'Please add items to your cart before ordering.');
            return;
        }

        try {
            await mockAsyncStorage.setItem('lastOrder', JSON.stringify(orderData));
            setIsOrdered(true);
            // Clear quantities
            const clearedQuantities = {};
            products.forEach(item => {
                clearedQuantities[item.id] = 0;
            });
            setQuantities(clearedQuantities);
        } catch (err) {
            Alert.alert('Error', 'Failed to place order.');
        }
    };

    if (loading) {
        return (
            <View style={styles.centerContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.centerContainer}>
                <Text style={styles.errorText}>Something went wrong</Text>
                <TouchableOpacity style={styles.retryButton} onPress={fetchProducts}>
                    <Text style={styles.retryText}>Retry</Text>
                </TouchableOpacity>
            </View>
        );
    }

    if (isOrdered) {
        return (
            <View style={styles.centerContainer}>
                <Text style={styles.successText}>Thanks for your order</Text>
                <TouchableOpacity
                    style={styles.orderButton}
                    onPress={() => setIsOrdered(false)}>
                    <Text style={styles.orderButtonText}>Buy More</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>CART APP</Text>
            <FlatList
                data={products}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.itemRow}>
                        <Text style={styles.itemInfo}>
                            {item.title.split(' ').slice(0, 2).join(' ')} ({item.price}$)
                        </Text>
                        <View style={styles.controls}>
                            <TouchableOpacity
                                style={styles.controlButton}
                                onPress={() => updateQuantity(item.id, 1)}>
                                <Text style={styles.controlText}>[+]</Text>
                            </TouchableOpacity>
                            <Text style={styles.quantityText}>{quantities[item.id] || 0}</Text>
                            <TouchableOpacity
                                style={styles.controlButton}
                                onPress={() => updateQuantity(item.id, -1)}>
                                <Text style={styles.controlText}>[-]</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
                contentContainerStyle={styles.listContent}
            />

            <View style={styles.footer}>
                <Text style={styles.totalText}>Total price: {totalPrice.toFixed(2)}$</Text>
                <TouchableOpacity style={styles.orderButton} onPress={handleOrder}>
                    <Text style={styles.orderButtonText}>[ORDER]</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    listContent: {
        paddingBottom: 20,
    },
    itemRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    itemInfo: {
        fontSize: 16,
        flex: 1,
    },
    controls: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    controlButton: {
        padding: 10,
    },
    controlText: {
        fontSize: 18,
        color: '#007AFF',
        fontWeight: 'bold',
    },
    quantityText: {
        fontSize: 18,
        marginHorizontal: 15,
        minWidth: 20,
        textAlign: 'center',
    },
    footer: {
        paddingTop: 20,
        borderTopWidth: 2,
        borderTopColor: '#eee',
    },
    totalText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    orderButton: {
        backgroundColor: '#000',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    orderButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    errorText: {
        fontSize: 18,
        color: 'red',
        marginBottom: 20,
    },
    retryButton: {
        padding: 10,
        backgroundColor: '#eee',
        borderRadius: 5,
    },
    retryText: {
        fontSize: 16,
        color: '#007AFF',
    },
    successText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'green',
        marginBottom: 20,
    },
});