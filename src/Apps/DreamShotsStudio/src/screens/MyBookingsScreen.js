import React from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import Header from '../components/Header';
import { Calendar, Clock, MapPin } from 'lucide-react-native';

const dummyBookings = [
    {
        id: '1',
        photographerName: 'Elena Rodriguez',
        photographerImage: 'https://images.unsplash.com/photo-1554080353-a576cf803bda?auto=format&fit=crop&w=800&q=80',
        date: 'Oct 24, 2023',
        time: '10:00 AM',
        package: 'Basic Wedding',
        status: 'Upcoming',
        location: 'Central Park, NY'
    },
    {
        id: '2',
        photographerName: 'Noah Williams',
        photographerImage: 'https://images.unsplash.com/photo-1500634245200-e5245c7574ef?auto=format&fit=crop&w=800&q=80',
        date: 'Sep 15, 2023',
        time: '2:00 PM',
        package: 'Corporate Event',
        status: 'Completed',
        location: 'Downtown Conference Center'
    }
];

const MyBookingsScreen = () => {
    return (
        <View style={styles.container}>
            <Header title="My Bookings" />
            <FlatList
                data={dummyBookings}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.list}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <View style={styles.header}>
                            <Image source={{ uri: item.photographerImage }} style={styles.image} />
                            <View style={styles.headerInfo}>
                                <Text style={styles.name}>{item.photographerName}</Text>
                                <Text style={styles.pkg}>{item.package}</Text>
                                <View style={[styles.badge, item.status === 'Completed' ? styles.badgeCompleted : styles.badgeUpcoming]}>
                                    <Text style={styles.badgeText}>{item.status}</Text>
                                </View>
                            </View>
                        </View>

                        <View style={styles.divider} />

                        <View style={styles.details}>
                            <View style={styles.row}>
                                <Calendar size={16} color="#4B5563" />
                                <Text style={styles.detailText}>{item.date}</Text>
                            </View>
                            <View style={styles.row}>
                                <Clock size={16} color="#4B5563" />
                                <Text style={styles.detailText}>{item.time}</Text>
                            </View>
                            <View style={styles.row}>
                                <MapPin size={16} color="#4B5563" />
                                <Text style={styles.detailText}>{item.location}</Text>
                            </View>
                        </View>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    list: {
        padding: 20,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#000000',
    },
    header: {
        flexDirection: 'row',
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 16,
    },
    headerInfo: {
        flex: 1,
    },
    name: {
        color: '#000000',
        fontWeight: 'bold',
        fontSize: 16,
    },
    pkg: {
        color: '#4B5563',
        fontSize: 14,
        marginBottom: 8,
    },
    badge: {
        alignSelf: 'flex-start',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    },
    badgeUpcoming: {
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
    },
    badgeCompleted: {
        backgroundColor: 'rgba(52, 211, 153, 0.1)',
    },
    badgeText: {
        color: '#000000',
        fontSize: 12,
        fontWeight: '600',
    },
    divider: {
        height: 1,
        backgroundColor: '#E5E7EB',
        marginVertical: 12,
    },
    details: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    detailText: {
        color: '#374151',
        fontSize: 12,
        marginLeft: 4,
    },
});

export default MyBookingsScreen;
