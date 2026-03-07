import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    StatusBar,
} from 'react-native';
import { ChevronLeft, Calendar, MapPin, Info, Phone, Download, CheckCircle2, DollarSign } from 'lucide-react-native';
import { COLORS } from '../theme';

export default function BookingDetails({ booking, onBack }) {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={onBack}>
                    <ChevronLeft size={28} color={COLORS.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Booking Receipt</Text>
                <View style={styles.headerActions} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
                {/* Status Card */}
                <View style={styles.statusCard}>
                    <CheckCircle2 size={48} color={COLORS.success} />
                    <Text style={styles.statusTitle}>Booking Confirmed</Text>
                    <Text style={styles.bookingId}>ID: #MAR-2026-081</Text>
                </View>

                {/* Artist Info */}
                <View style={styles.artistSection}>
                    <View style={styles.artistAvatar} />
                    <View>
                        <Text style={styles.artistName}>{booking.artist}</Text>
                        <Text style={styles.eventLabel}>{booking.event}</Text>
                    </View>
                </View>

                {/* Details Grid */}
                <View style={styles.detailsGrid}>
                    <View style={styles.detailItem}>
                        <Calendar size={18} color={COLORS.textSecondary} />
                        <View style={styles.detailContent}>
                            <Text style={styles.detailLabel}>Event Date</Text>
                            <Text style={styles.detailValue}>{booking.date}</Text>
                        </View>
                    </View>
                    <View style={styles.detailItem}>
                        <MapPin size={18} color={COLORS.textSecondary} />
                        <View style={styles.detailContent}>
                            <Text style={styles.detailLabel}>Venue</Text>
                            <Text style={styles.detailValue}>{booking.venue}</Text>
                        </View>
                    </View>
                </View>

                {/* Payment Breakdown */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Payment Summary</Text>
                    <View style={styles.paymentCard}>
                        <View style={styles.paymentRow}>
                            <Text style={styles.paymentLabel}>Artist Fee</Text>
                            <Text style={styles.paymentValue}>₹1,50,000</Text>
                        </View>
                        <View style={styles.paymentRow}>
                            <Text style={styles.paymentLabel}>Management Fee</Text>
                            <Text style={styles.paymentValue}>₹10,000</Text>
                        </View>
                        <View style={styles.paymentRow}>
                            <Text style={styles.paymentLabel}>Platform Service Fee (5%)</Text>
                            <Text style={styles.paymentValue}>₹7,500</Text>
                        </View>
                        <View style={[styles.paymentRow, styles.totalRow]}>
                            <Text style={styles.totalLabel}>Total Amount</Text>
                            <Text style={styles.totalValue}>₹1,67,500</Text>
                        </View>
                        <View style={styles.paidBadge}>
                            <DollarSign size={14} color={COLORS.success} />
                            <Text style={styles.paidText}>Paid: {booking.amountPaid}</Text>
                        </View>
                    </View>
                </View>

                {/* Contact Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Contact Support</Text>
                    <TouchableOpacity style={styles.supportCard}>
                        <Phone size={20} color={COLORS.accentRed} />
                        <View style={styles.supportInfo}>
                            <Text style={styles.supportName}>Hemant Seervi (Manager)</Text>
                            <Text style={styles.supportPhone}>+91 98XXX XXXXX</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.infoBox}>
                    <Info size={16} color={COLORS.textSecondary} />
                    <Text style={styles.infoBoxText}>
                        Please keep this digital receipt ready at the venue.
                        The remaining balance is due on the event day before the performance starts.
                    </Text>
                </View>

                <View style={{ height: 100 }} />
            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity style={styles.downloadBtn}>
                    <Download size={20} color={COLORS.primary} />
                    <Text style={styles.downloadBtnText}>Download PDF</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.primary,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    headerActions: {
        width: 40,
    },
    scroll: {
        padding: 20,
    },
    statusCard: {
        alignItems: 'center',
        padding: 30,
        backgroundColor: 'rgba(39, 174, 96, 0.05)',
        borderRadius: 20,
        marginBottom: 25,
    },
    statusTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: COLORS.success,
        marginTop: 15,
    },
    bookingId: {
        fontSize: 12,
        color: COLORS.textSecondary,
        marginTop: 5,
    },
    artistSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 25,
    },
    artistAvatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: COLORS.border,
        marginRight: 15,
    },
    artistName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    eventLabel: {
        fontSize: 14,
        color: COLORS.textSecondary,
    },
    detailsGrid: {
        backgroundColor: COLORS.cardBackground,
        borderRadius: 15,
        padding: 20,
        marginBottom: 25,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    detailItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    detailContent: {
        marginLeft: 15,
    },
    detailLabel: {
        fontSize: 12,
        color: COLORS.textSecondary,
    },
    detailValue: {
        fontSize: 15,
        fontWeight: '600',
        color: COLORS.text,
    },
    section: {
        marginBottom: 25,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.text,
        marginBottom: 15,
    },
    paymentCard: {
        backgroundColor: COLORS.cardBackground,
        borderRadius: 15,
        padding: 20,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    paymentRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    paymentLabel: {
        color: COLORS.textSecondary,
    },
    paymentValue: {
        fontWeight: '500',
        color: COLORS.text,
    },
    totalRow: {
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
        paddingTop: 10,
        marginTop: 5,
    },
    totalLabel: {
        fontWeight: 'bold',
        color: COLORS.text,
    },
    totalValue: {
        fontWeight: 'bold',
        fontSize: 18,
        color: COLORS.accentRed,
    },
    paidBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        backgroundColor: 'rgba(39, 174, 96, 0.1)',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 6,
        marginTop: 15,
    },
    paidText: {
        fontSize: 12,
        color: COLORS.success,
        marginLeft: 6,
        fontWeight: 'bold',
    },
    supportCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.cardBackground,
        padding: 15,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    supportInfo: {
        marginLeft: 15,
    },
    supportName: {
        fontSize: 15,
        fontWeight: '600',
        color: COLORS.text,
    },
    supportPhone: {
        fontSize: 13,
        color: COLORS.textSecondary,
    },
    infoBox: {
        flexDirection: 'row',
        padding: 15,
        backgroundColor: COLORS.cardBackground,
        borderRadius: 10,
        alignItems: 'center',
    },
    infoBoxText: {
        fontSize: 12,
        color: COLORS.textSecondary,
        marginLeft: 10,
        flex: 1,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        padding: 20,
        backgroundColor: COLORS.primary,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
    },
    downloadBtn: {
        flexDirection: 'row',
        backgroundColor: COLORS.accentRed,
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    downloadBtnText: {
        color: COLORS.primary,
        fontWeight: 'bold',
        fontSize: 16,
        marginLeft: 10,
    },
});
