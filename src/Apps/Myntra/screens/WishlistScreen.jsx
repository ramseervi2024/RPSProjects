import { View, Text, StyleSheet, ScrollView, Image, Pressable } from 'react-native';
import { Heart } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const WISHLIST_ITEMS = [
    {
        id: 1,
        title: 'Floral Summer Dress',
        brand: 'Zara',
        price: '₹2,499',
        image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&q=80',
    },
    {
        id: 2,
        title: 'Denim Jacket',
        brand: 'Levis',
        price: '₹3,999',
        image: 'https://images.unsplash.com/photo-1543076447-215ad9ba6923?w=500&q=80',
    },
];

export default function WishlistScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Wishlist</Text>
                </View>

                {WISHLIST_ITEMS.length > 0 ? (
                    <View style={styles.itemsContainer}>
                        {WISHLIST_ITEMS.map((item) => (
                            <View key={item.id} style={styles.wishlistItem}>
                                <Image source={{ uri: item.image }} style={styles.itemImage} />
                                <View style={styles.itemInfo}>
                                    <Text style={styles.brandName}>{item.brand}</Text>
                                    <Text style={styles.itemTitle}>{item.title}</Text>
                                    <Text style={styles.itemPrice}>{item.price}</Text>
                                </View>
                                <Pressable style={styles.removeButton}>
                                    <Heart size={24} color="#FF3F6C" fill="#FF3F6C" />
                                </Pressable>
                            </View>
                        ))}
                    </View>
                ) : (
                    <View style={styles.emptyState}>
                        <Heart size={64} color="#ccc" />
                        <Text style={styles.emptyStateText}>Your wishlist is empty</Text>
                        <Text style={styles.emptyStateSubtext}>Save items you love to shop them later</Text>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        padding: 20,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#282C3F',
    },
    itemsContainer: {
        padding: 15,
    },
    wishlistItem: {
        flexDirection: 'row',
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
        paddingBottom: 20,
    },
    itemImage: {
        width: 100,
        height: 130,
        borderRadius: 8,
    },
    itemInfo: {
        flex: 1,
        paddingHorizontal: 15,
    },
    brandName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#282C3F',
    },
    itemTitle: {
        fontSize: 14,
        color: '#7E818C',
        marginTop: 4,
    },
    itemPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#282C3F',
        marginTop: 8,
    },
    removeButton: {
        padding: 10,
    },
    emptyState: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 40,
        marginTop: 100,
    },
    emptyStateText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#282C3F',
        marginTop: 20,
    },
    emptyStateSubtext: {
        fontSize: 14,
        color: '#7E818C',
        marginTop: 8,
        textAlign: 'center',
    },
});