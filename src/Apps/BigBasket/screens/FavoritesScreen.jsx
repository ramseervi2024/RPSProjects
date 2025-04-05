import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Heart } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const favoriteItems = [
    {
        id: 1,
        name: 'Fresh Oranges',
        price: '4.99',
        image: 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=500&q=80',
    },
    {
        id: 2,
        name: 'Organic Milk',
        price: '3.99',
        image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=500&q=80',
    },
    {
        id: 3,
        name: 'Whole Wheat Bread',
        price: '2.99',
        image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&q=80',
    },
];

export default function FavoritesScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Favorites</Text>
                </View>

                <ScrollView style={styles.content}>
                    <View style={styles.grid}>
                        {favoriteItems.map((item) => (
                            <View key={item.id} style={styles.card}>
                                <Image source={{ uri: item.image }} style={styles.image} />
                                <TouchableOpacity style={styles.favoriteButton}>
                                    <Heart size={20} color="#ef4444" fill="#ef4444" />
                                </TouchableOpacity>
                                <View style={styles.info}>
                                    <Text style={styles.name}>{item.name}</Text>
                                    <Text style={styles.price}>${item.price}</Text>
                                    <TouchableOpacity style={styles.addButton}>
                                        <Text style={styles.addButtonText}>Add to Cart</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))}
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    header: {
        padding: 16,
        backgroundColor: '#ffffff',
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    headerTitle: {
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 24,
        color: '#1f2937',
    },
    content: {
        flex: 1,
        padding: 16,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    card: {
        width: '48%',
        backgroundColor: '#ffffff',
        borderRadius: 8,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    image: {
        width: '100%',
        height: 160,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    favoriteButton: {
        position: 'absolute',
        top: 8,
        right: 8,
        backgroundColor: '#ffffff',
        padding: 8,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    info: {
        padding: 12,
    },
    name: {
        fontFamily: 'Poppins_500Medium',
        fontSize: 14,
        color: '#1f2937',
        marginBottom: 4,
    },
    price: {
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 16,
        color: '#16a34a',
        marginBottom: 8,
    },
    addButton: {
        backgroundColor: '#16a34a',
        padding: 8,
        borderRadius: 6,
        alignItems: 'center',
    },
    addButtonText: {
        fontFamily: 'Poppins_500Medium',
        fontSize: 14,
        color: '#ffffff',
    },
});