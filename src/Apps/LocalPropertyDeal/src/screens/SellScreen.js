import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Upload, ChevronRight } from 'lucide-react-native';
import Header from '../components/Header';
import CategoryPill from '../components/CategoryPill';

const SellScreen = ({ navigation }) => {
    const [propertyType, setPropertyType] = useState('House');
    const [success, setSuccess] = useState(false);

    const categories = ['Land', 'House', 'Shop', 'Plot', 'Farm'];

    const handleSubmit = () => {
        setSuccess(true);
        setTimeout(() => {
            setSuccess(false);
            navigation.navigate('My Listings');
        }, 2000);
    };

    if (success) {
        return (
            <View style={styles.successContainer}>
                <Text style={styles.successTitle}>Successfully Submitted!</Text>
                <Text style={styles.successSub}>Your property is now under review.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Header title="Sell Property" showLocation={false} />
            <ScrollView contentContainerStyle={styles.content}>

                {/* Type Selection */}
                <Text style={styles.label}>Property Type</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.pillScroll}>
                    {categories.map((cat, index) => (
                        <CategoryPill
                            key={index}
                            label={cat}
                            isSelected={propertyType === cat}
                            onPress={() => setPropertyType(cat)}
                        />
                    ))}
                </ScrollView>

                <Text style={styles.label}>Location</Text>
                <TextInput
                    placeholder="Enter city, area (e.g. Pali)"
                    style={styles.input}
                    placeholderTextColor="#999"
                />

                <Text style={styles.label}>Price (₹)</Text>
                <TextInput
                    placeholder="Expected Price"
                    keyboardType="numeric"
                    style={styles.input}
                    placeholderTextColor="#999"
                />

                <Text style={styles.label}>Area (sq ft / Bigha)</Text>
                <TextInput
                    placeholder="Total Area"
                    style={styles.input}
                    placeholderTextColor="#999"
                />

                <Text style={styles.label}>Description</Text>
                <TextInput
                    placeholder="Describe your property..."
                    multiline
                    numberOfLines={4}
                    style={[styles.input, styles.textArea]}
                    placeholderTextColor="#999"
                />

                {/* Image Upload Mock */}
                <Text style={styles.label}>Photos</Text>
                <TouchableOpacity style={styles.uploadBox}>
                    <Upload size={32} color="#007AFF" />
                    <Text style={styles.uploadText}>Tap to Upload Images</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
                    <Text style={styles.submitText}>Submit Listing</Text>
                    <ChevronRight size={20} color="#fff" />
                </TouchableOpacity>

            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFAFA',
    },
    content: {
        padding: 20,
        paddingBottom: 100,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
        marginTop: 16,
    },
    pillScroll: {
        marginBottom: 8,
    },
    input: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#E5E5E5',
        borderRadius: 12,
        padding: 16,
        fontSize: 16,
        color: '#333',
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
    },
    uploadBox: {
        height: 150,
        backgroundColor: '#F0F8FF',
        borderWidth: 2,
        borderColor: '#007AFF',
        borderStyle: 'dashed',
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
    },
    uploadText: {
        marginTop: 12,
        color: '#007AFF',
        fontWeight: '600',
    },
    submitBtn: {
        backgroundColor: '#007AFF',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 18,
        borderRadius: 16,
        shadowColor: '#007AFF',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    submitText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginRight: 8,
    },
    successContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    successTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#28a745',
        marginBottom: 8,
    },
    successSub: {
        fontSize: 16,
        color: '#666',
    },
});

export default SellScreen;
