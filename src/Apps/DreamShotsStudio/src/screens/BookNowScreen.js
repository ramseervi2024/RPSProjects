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
                <CheckCircle size={80} color="#000000" />
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
                            <Calendar color={selectedDate === date ? '#FFFFFF' : '#6B7280'} size={24} />
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
        backgroundColor: '#FFFFFF',
    },
    colorContent: {
        padding: 20,
    },
    content: {
        padding: 20,
    },
    subtitle: {
        color: '#000000',
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 16,
    },
    dateScroll: {
        marginBottom: 20,
    },
    dateCard: {
        backgroundColor: '#FFFFFF',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginRight: 12,
        borderWidth: 1,
        borderColor: '#000000',
        width: 80,
    },
    dateCardActive: {
        backgroundColor: '#000000',
        borderColor: '#000000',
    },
    dateText: {
        color: '#4B5563',
        marginTop: 8,
        fontWeight: '600',
    },
    dateTextActive: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    packageCard: {
        backgroundColor: '#FFFFFF',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#000000',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    packageCardActive: {
        borderColor: '#000000',
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
    },
    pkgName: {
        color: '#000000',
        fontSize: 16,
        fontWeight: 'bold',
    },
    pkgNameActive: {
        color: '#000000',
    },
    pkgFeatures: {
        color: '#4B5563',
        fontSize: 12,
        marginTop: 4,
    },
    pkgPrice: {
        color: '#000000',
        fontSize: 16,
        fontWeight: 'bold',
    },
    pkgPriceActive: {
        color: '#000000',
    },
    summaryTitle: {
        color: '#000000',
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 12,
    },
    summaryCard: {
        backgroundColor: '#F3F4F6',
        padding: 20,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    summaryLabel: {
        color: '#4B5563',
    },
    summaryValue: {
        color: '#000000',
        fontWeight: '600',
    },
    summaryPrice: {
        color: '#000000',
        fontWeight: 'bold',
        fontSize: 18,
    },
    footer: {
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: '#000000',
    },
    confirmButton: {
        backgroundColor: '#000000',
        padding: 16,
        borderRadius: 30,
        alignItems: 'center',
    },
    confirmButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 18,
    },
    centerContent: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
    },
    successTitle: {
        color: '#000000',
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 20,
    },
    successText: {
        color: '#4B5563',
        textAlign: 'center',
        marginTop: 10,
        fontSize: 16,
    },
    homeButton: {
        marginTop: 40,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: '#000000',
    },
    homeButtonText: {
        color: '#000000',
        fontWeight: '600',
    },
});

export default BookNowScreen;
