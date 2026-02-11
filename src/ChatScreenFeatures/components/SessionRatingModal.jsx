import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Alert } from 'react-native';
import { BlurView } from '@react-native-community/blur'; // Ensure this is installed, else fallback
import { Star } from 'lucide-react-native';

export default function SessionRatingModal({ visible, onClose }) {
    const [rating, setRating] = useState(0);

    const handleSubmit = () => {
        Alert.alert("Feedback Received", "Thank you for rating your session!", [
            { text: "OK", onPress: onClose }
        ]);
    };

    return (
        <Modal visible={visible} transparent animationType="fade">
            <View style={styles.container}>
                {/* Fallback to semi-transparent view if BlurView fails or is not linked properly */}
                {/* <View style={styles.blurFallback} /> */}
                <BlurView // Uncomment if native module is linked
                    style={StyleSheet.absoluteFill}
                    blurType="light"
                    blurAmount={10}
                    reducedTransparencyFallbackColor="white"
                />

                <View style={styles.card}>
                    <Text style={styles.title}>Session Ended</Text>
                    <Text style={styles.subtitle}>How was your consultation with Astrologer Vikram?</Text>

                    <View style={styles.stars}>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <TouchableOpacity key={star} onPress={() => setRating(star)}>
                                <Star
                                    size={32}
                                    color={star <= rating ? "#FFD700" : "#E0E0E0"}
                                    fill={star <= rating ? "#FFD700" : "transparent"}
                                />
                            </TouchableOpacity>
                        ))}
                    </View>

                    <TouchableOpacity
                        style={[styles.submitButton, rating === 0 && styles.submitButtonDisabled]}
                        onPress={handleSubmit}
                        disabled={rating === 0}
                    >
                        <Text style={styles.submitButtonText}>Submit Feedback</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.skipButton} onPress={onClose}>
                        <Text style={styles.skipButtonText}>Skip</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    blurFallback: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 24,
        padding: 24,
        width: '100%',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 8,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 24,
    },
    stars: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 32,
    },
    submitButton: {
        backgroundColor: '#6C63FF',
        paddingVertical: 14,
        paddingHorizontal: 32,
        borderRadius: 30,
        width: '100%',
        alignItems: 'center',
        marginBottom: 12,
    },
    submitButtonDisabled: {
        backgroundColor: '#ccc',
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    skipButton: {
        padding: 12,
    },
    skipButtonText: {
        color: '#999',
        fontSize: 14,
    }
});
