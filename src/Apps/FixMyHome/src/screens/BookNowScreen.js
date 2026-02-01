import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Calendar, Clock, CheckCircle } from 'lucide-react-native';
import Header from '../components/Header';
import { useRoute } from '@react-navigation/native';

const BookNowScreen = ({ navigation }) => {
    const route = useRoute();
    const service = route.params?.service || { name: 'Service', basePrice: 0 };

    const [selectedDate, setSelectedDate] = useState('Tomorrow');
    const [selectedTime, setSelectedTime] = useState('10:00 AM');

    // Simple hardcoded selections for UI only
    const handleBook = () => {
        Alert.alert(
            "Booking Confirmed!",
            `Your ${service.name} service has been scheduled for ${selectedDate} at ${selectedTime}.`,
            [
                { text: "OK", onPress: () => navigation.navigate('MyOrders') }
            ]
        );
    };

    return (
        <View style={styles.container}>
            <Header title="Book Service" />
            <ScrollView contentContainerStyle={styles.content}>

                <View style={styles.summaryCard}>
                    <Text style={styles.serviceName}>{service.name}</Text>
                    <Text style={styles.price}>Estimated Cost: ${service.basePrice}</Text>
                </View>

                <Text style={styles.sectionTitle}>Select Date</Text>
                <View style={styles.optionsRow}>
                    {['Today', 'Tomorrow', 'Fri, 15'].map((date) => (
                        <TouchableOpacity
                            key={date}
                            style={[styles.optionChip, selectedDate === date && styles.selectedChip]}
                            onPress={() => setSelectedDate(date)}
                        >
                            <Calendar size={16} color={selectedDate === date ? '#fff' : '#64748b'} />
                            <Text style={[styles.chipText, selectedDate === date && styles.selectedChipText]}>
                                {date}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <Text style={styles.sectionTitle}>Select Time</Text>
                <View style={styles.optionsRow}>
                    {['10:00 AM', '12:00 PM', '02:00 PM', '04:00 PM'].map((time) => (
                        <TouchableOpacity
                            key={time}
                            style={[styles.optionChip, selectedTime === time && styles.selectedChip]}
                            onPress={() => setSelectedTime(time)}
                        >
                            <Clock size={16} color={selectedTime === time ? '#fff' : '#64748b'} />
                            <Text style={[styles.chipText, selectedTime === time && styles.selectedChipText]}>
                                {time}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <View style={styles.detailsContainer}>
                    <Text style={styles.detailsTitle}>Payment Details</Text>
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Subtotal</Text>
                        <Text style={styles.detailValue}>${service.basePrice}</Text>
                    </View>
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Tax (5%)</Text>
                        <Text style={styles.detailValue}>${(service.basePrice * 0.05).toFixed(2)}</Text>
                    </View>
                    <View style={[styles.detailRow, styles.totalRow]}>
                        <Text style={styles.totalLabel}>Total</Text>
                        <Text style={styles.totalValue}>${(service.basePrice * 1.05).toFixed(2)}</Text>
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
        backgroundColor: '#f8fafc',
    },
    content: {
        padding: 20,
    },
    summaryCard: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 16,
        marginBottom: 24,
        borderLeftWidth: 4,
        borderLeftColor: '#0284c7',
    },
    serviceName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#0f172a',
        marginBottom: 8,
    },
    price: {
        fontSize: 16,
        color: '#64748b',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#0f172a',
        marginBottom: 12,
        marginTop: 12,
    },
    optionsRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 12,
    },
    optionChip: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 24,
        marginRight: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#e2e8f0',
    },
    selectedChip: {
        backgroundColor: '#0284c7',
        borderColor: '#0284c7',
    },
    chipText: {
        marginLeft: 6,
        color: '#64748b',
        fontWeight: '600',
    },
    selectedChipText: {
        color: '#fff',
    },
    detailsContainer: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 16,
        marginTop: 24,
    },
    detailsTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#0f172a',
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    detailLabel: {
        color: '#64748b',
        fontSize: 15,
    },
    detailValue: {
        color: '#0f172a',
        fontSize: 15,
        fontWeight: '500',
    },
    totalRow: {
        borderTopWidth: 1,
        borderTopColor: '#e2e8f0',
        paddingTop: 12,
        marginTop: 4,
        marginBottom: 0,
    },
    totalLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#0f172a',
    },
    totalValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#0284c7',
    },
    footer: {
        padding: 20,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#e2e8f0',
    },
    confirmButton: {
        backgroundColor: '#0284c7',
        paddingVertical: 16,
        borderRadius: 16,
        alignItems: 'center',
    },
    confirmButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default BookNowScreen;
