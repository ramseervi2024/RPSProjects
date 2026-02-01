import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { ArrowLeft, Clock, CheckCircle } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const SafariDetailScreen = ({ route, navigation }) => {
    const { item } = route.params;

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
                <View style={styles.imageContainer}>
                    <Image source={{ uri: item.imageUrl }} style={styles.image} resizeMode="cover" />
                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                        <ArrowLeft color="#fff" size={24} />
                    </TouchableOpacity>
                </View>

                <View style={styles.content}>
                    <Text style={styles.title}>{item.name}</Text>
                    <Text style={styles.price}>{item.price}</Text>

                    <View style={styles.row}>
                        <Clock color="#666" size={16} />
                        <Text style={styles.duration}>Duration: {item.duration}</Text>
                    </View>

                    <View style={styles.divider} />

                    <Text style={styles.sectionTitle}>Overview</Text>
                    <Text style={styles.description}>{item.description}</Text>

                    <Text style={styles.sectionTitle}>Includes</Text>
                    {item.includes.map((inc, index) => (
                        <View key={index} style={styles.includeRow}>
                            <CheckCircle color="#4CAF50" size={18} />
                            <Text style={styles.includeText}>{inc}</Text>
                        </View>
                    ))}
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity style={styles.bookButton}>
                    <Text style={styles.bookButtonText}>Book Now</Text>
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
    imageContainer: {
        height: 300,
        width: width,
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    backButton: {
        position: 'absolute',
        top: 50,
        left: 20,
        backgroundColor: 'rgba(0,0,0,0.3)',
        borderRadius: 20,
        padding: 8,
    },
    content: {
        padding: 24,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    price: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#DAA520',
        marginBottom: 12,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    duration: {
        fontSize: 16,
        color: '#666',
        marginLeft: 8,
    },
    divider: {
        height: 1,
        backgroundColor: '#eee',
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 12,
    },
    description: {
        fontSize: 15,
        color: '#555',
        lineHeight: 22,
        marginBottom: 24,
    },
    includeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    includeText: {
        fontSize: 15,
        color: '#444',
        marginLeft: 10,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        padding: 20,
        paddingBottom: 34, // Safe Area padding approx
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
    },
    bookButton: {
        backgroundColor: '#DAA520',
        paddingVertical: 16,
        borderRadius: 16,
        alignItems: 'center',
        shadowColor: '#DAA520',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    bookButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    }
});

export default SafariDetailScreen;
