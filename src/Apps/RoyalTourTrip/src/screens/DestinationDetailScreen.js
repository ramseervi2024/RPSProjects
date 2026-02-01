import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { ArrowLeft, Clock, MapPin } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const DestinationDetailScreen = ({ route, navigation }) => {
    const { item } = route.params;

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
                <View style={styles.imageContainer}>
                    <Image source={{ uri: item.imageUrl }} style={styles.image} resizeMode="cover" />
                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                        <ArrowLeft color="#fff" size={24} />
                    </TouchableOpacity>
                </View>

                <View style={styles.content}>
                    <Text style={styles.title}>{item.name}</Text>

                    <View style={styles.row}>
                        <MapPin color="#DAA520" size={18} />
                        <Text style={styles.location}>{item.city}</Text>
                    </View>

                    <View style={styles.divider} />

                    <Text style={styles.sectionTitle}>About</Text>
                    <Text style={styles.description}>{item.description}</Text>

                    <View style={styles.infoBox}>
                        <Clock color="#DAA520" size={20} />
                        <View style={styles.infoTextContainer}>
                            <Text style={styles.infoLabel}>Best Time to Visit</Text>
                            <Text style={styles.infoValue}>{item.bestTimeToVisit}</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    imageContainer: {
        height: 350,
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
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        marginTop: -40,
        padding: 24,
        minHeight: 500, // Ensure it fills remaining space visually
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    location: {
        fontSize: 16,
        color: '#666',
        marginLeft: 6,
    },
    divider: {
        height: 1,
        backgroundColor: '#eee',
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 12,
    },
    description: {
        fontSize: 16,
        color: '#555',
        lineHeight: 24,
        marginBottom: 24,
    },
    infoBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFAEC', // Light amber
        padding: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#FFE082',
    },
    infoTextContainer: {
        marginLeft: 16,
    },
    infoLabel: {
        fontSize: 14,
        color: '#888',
    },
    infoValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
});

export default DestinationDetailScreen;
