import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import Header from '../components/Header';
import { Calendar, CheckCircle } from 'lucide-react-native';

const BookNowScreen = ({ route, navigation }) => {
    const { photographer } = route.params;
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [isSuccess, setIsSuccess] = useState(false);

    const dates = ['Oct 24', 'Oct 25', 'Oct 26', 'Oct 27', 'Oct 28', 'Oct 29'];

    const handleBook = () => {
        if (!selectedDate || !selectedPackage) {
            Alert.alert('Incomplete', 'Please select a date and a package.');
            return;
        }
        setIsSuccess(true);
    };

    if (isSuccess) {
        return (
            <View style={[styles.container, styles.centerContent]}>
                <CheckCircle size={80} color="#FFD700" />
                <Text style={styles.successTitle}>Booking Confirmed!</Text>
                <Text style={styles.successText}>
                    Your session with {photographer.name} on {selectedDate} is booked.
                </Text>
                <TouchableOpacity
                    style={styles.homeButton}
                    onPress={() => navigation.popToTop()}
                >
                    <Text style={styles.homeButtonText}>Back to Home</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Header title="Book Request" showNotification={false} />
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.subtitle}>Select Date</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.dateScroll}>
                    {dates.map((date) => (
                        <TouchableOpacity
                            key={date}
                            style={[styles.dateCard, selectedDate === date && styles.dateCardActive]}
                            onPress={() => setSelectedDate(date)}
                        >
                            <Calendar color={selectedDate === date ? '#0F172A' : '#9CA3AF'} size={24} />
                            <Text style={[styles.dateText, selectedDate === date && styles.dateTextActive]}>{date}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                <Text style={styles.subtitle}>Select Package</Text>
                {photographer.packages.map((pkg) => (
                    <TouchableOpacity
                        key={pkg.id}
                        style={[styles.packageCard, selectedPackage === pkg.id && styles.packageCardActive]}
                        onPress={() => setSelectedPackage(pkg.id)}
                    >
                        <View>
                            <Text style={[styles.pkgName, selectedPackage === pkg.id && styles.pkgNameActive]}>{pkg.name}</Text>
                            <Text style={styles.pkgFeatures}>{pkg.features[0]} + {pkg.features.length - 1} more</Text>
                        </View>
                        <Text style={[styles.pkgPrice, selectedPackage === pkg.id && styles.pkgPriceActive]}>{pkg.price}</Text>
                    </TouchableOpacity>
                ))}

                <Text style={styles.summaryTitle}>Booking Summary</Text>
                <View style={styles.summaryCard}>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Photographer</Text>
                        <Text style={styles.summaryValue}>{photographer.name}</Text>
                    </View>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Date</Text>
                        <Text style={styles.summaryValue}>{selectedDate || 'Select Date'}</Text>
                    </View>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Total</Text>
                        <Text style={styles.summaryPrice}>
                            {selectedPackage ? photographer.packages.find(p => p.id === selectedPackage).price : '-'}
                        </Text>
                    </View>
                </View>

            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity style={styles.confirmButton} onPress={handleBook}>
                    <Text style={styles.confirmButtonText}>Confirm Booking</Text>
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
    colorContent: {
        padding: 20,
    },
    content: {
        padding: 20,
    },
    subtitle: {
        color: '#F3F4F6',
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 16,
    },
    dateScroll: {
        marginBottom: 20,
    },
    dateCard: {
        backgroundColor: '#1F2937',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginRight: 12,
        borderWidth: 1,
        borderColor: '#374151',
        width: 80,
    },
    dateCardActive: {
        backgroundColor: '#FFD700',
        borderColor: '#FFD700',
    },
    dateText: {
        color: '#9CA3AF',
        marginTop: 8,
        fontWeight: '600',
    },
    dateTextActive: {
        color: '#0F172A',
        fontWeight: 'bold',
    },
    packageCard: {
        backgroundColor: '#111827',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#374151',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    packageCardActive: {
        borderColor: '#FFD700',
        backgroundColor: 'rgba(255, 215, 0, 0.1)',
    },
    pkgName: {
        color: '#F3F4F6',
        fontSize: 16,
        fontWeight: 'bold',
    },
    pkgNameActive: {
        color: '#FFD700',
    },
    pkgFeatures: {
        color: '#9CA3AF',
        fontSize: 12,
        marginTop: 4,
    },
    pkgPrice: {
        color: '#F3F4F6',
        fontSize: 16,
        fontWeight: 'bold',
    },
    pkgPriceActive: {
        color: '#FFD700',
    },
    summaryTitle: {
        color: '#F3F4F6',
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 12,
    },
    summaryCard: {
        backgroundColor: '#1F2937',
        padding: 20,
        borderRadius: 16,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    summaryLabel: {
        color: '#9CA3AF',
    },
    summaryValue: {
        color: '#F3F4F6',
        fontWeight: '600',
    },
    summaryPrice: {
        color: '#FFD700',
        fontWeight: 'bold',
        fontSize: 18,
    },
    footer: {
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: '#1F2937',
    },
    confirmButton: {
        backgroundColor: '#FFD700',
        padding: 16,
        borderRadius: 30,
        alignItems: 'center',
    },
    confirmButtonText: {
        color: '#0F172A',
        fontWeight: 'bold',
        fontSize: 18,
    },
    centerContent: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
    },
    successTitle: {
        color: '#FFD700',
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 20,
    },
    successText: {
        color: '#D1D5DB',
        textAlign: 'center',
        marginTop: 10,
        fontSize: 16,
    },
    homeButton: {
        marginTop: 40,
        backgroundColor: '#1F2937',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 24,
    },
    homeButtonText: {
        color: '#F3F4F6',
        fontWeight: '600',
    },
});

export default BookNowScreen;
