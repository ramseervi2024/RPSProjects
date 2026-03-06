import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { Calendar as CalendarIcon, MapPin, Info } from 'lucide-react-native';
import { COLORS } from '../theme';

export default function BookedTab({ bookedEvents, onSelectBooking }) {
    return (
        <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
            <Text style={styles.pageTitle}>My Bookings</Text>
            {bookedEvents.map(booking => (
                <TouchableOpacity
                    key={booking.id}
                    style={styles.bookedCard}
                    onPress={() => onSelectBooking(booking)}
                >
                    <View style={styles.bookedHeader}>
                        <Text style={styles.bookedArtist}>{booking.artist}</Text>
                        <View style={styles.confirmedBadge}>
                            <Text style={styles.confirmedText}>{booking.status}</Text>
                        </View>
                    </View>
                    <View style={styles.bookedDetails}>
                        <View style={styles.detailRow}>
                            <CalendarIcon size={16} color={COLORS.textSecondary} />
                            <Text style={styles.detailText}>{booking.date}</Text>
                        </View>
                        <View style={styles.detailRow}>
                            <MapPin size={16} color={COLORS.textSecondary} />
                            <Text style={styles.detailText}>{booking.venue}</Text>
                        </View>
                        <View style={styles.detailRow}>
                            <Info size={16} color={COLORS.textSecondary} />
                            <Text style={styles.detailText}>Total Paid: {booking.amountPaid}</Text>
                        </View>
                    </View>
                    <View style={styles.detailsBtn}>
                        <Text style={styles.detailsBtnText}>View Full Details</Text>
                    </View>
                </TouchableOpacity>
            ))}
            <View style={{ height: 100 }} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    tabContent: {
        flex: 1,
        padding: 20,
        backgroundColor: COLORS.primary,
    },
    pageTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.text,
        marginBottom: 20,
    },
    bookedCard: {
        backgroundColor: COLORS.primary,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: COLORS.border,
        padding: 20,
        marginBottom: 15,
    },
    bookedHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    bookedArtist: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    confirmedBadge: {
        backgroundColor: COLORS.success,
        paddingHorizontal: 12,
        paddingVertical: 5,
        borderRadius: 20,
    },
    confirmedText: {
        color: COLORS.primary,
        fontSize: 11,
        fontWeight: 'bold',
    },
    bookedDetails: {
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
        paddingTop: 15,
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    detailText: {
        fontSize: 14,
        color: COLORS.textSecondary,
        marginLeft: 10,
    },
    detailsBtn: {
        marginTop: 10,
        alignItems: 'center',
        padding: 10,
    },
    detailsBtnText: {
        color: COLORS.accentRed,
        fontWeight: '600',
        fontSize: 14,
    },
});
