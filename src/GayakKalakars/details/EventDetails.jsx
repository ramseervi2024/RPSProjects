import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    StatusBar,
    Image,
} from 'react-native';
import { ChevronLeft, MapPin, Clock, Calendar, Users, Info, Share2 } from 'lucide-react-native';
import { COLORS } from '../theme';

export default function EventDetails({ event, onBack }) {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={onBack}>
                    <ChevronLeft size={28} color={COLORS.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Event Details</Text>
                <View style={styles.headerActions}>
                    <Share2 size={22} color={COLORS.text} />
                </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Hero Section */}
                <View style={styles.heroSection}>
                    <View style={styles.imagePlaceholder}>
                        <Text style={styles.imageText}>{event.title}</Text>
                        <View style={[styles.statusBadge, { backgroundColor: (event.status === 'LIVE' || event.status === 'Ongoing') ? '#E74C3C' : COLORS.accent }]}>
                            <Text style={styles.statusText}>{event.status}</Text>
                        </View>
                    </View>
                </View>

                {/* Event Content */}
                <View style={styles.contentSection}>
                    <Text style={styles.eventTitle}>{event.title}</Text>
                    <TouchableOpacity style={styles.artistRow}>
                        <View style={styles.artistAvatar} />
                        <View>
                            <Text style={styles.artistLabel}>Lead Performer</Text>
                            <Text style={styles.artistName}>{event.artist}</Text>
                        </View>
                    </TouchableOpacity>

                    <View style={styles.infoGrid}>
                        <View style={styles.infoCard}>
                            <Clock size={20} color={COLORS.accentRed} />
                            <Text style={styles.infoLabel}>Time</Text>
                            <Text style={styles.infoValue}>{event.startTime}</Text>
                        </View>
                        <View style={styles.infoCard}>
                            <MapPin size={20} color={COLORS.accentRed} />
                            <Text style={styles.infoLabel}>Location</Text>
                            <Text style={styles.infoValue}>{event.location}</Text>
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>About this Event</Text>
                        <Text style={styles.description}>
                            This is a traditional Marwari {event.title} featuring the soulful voice of {event.artist}.
                            Expect an evening filled with devotional songs, folk melodies, and a vibrant cultural atmosphere.
                            Open to all public attendees. Please arrive 30 minutes before the start time.
                        </Text>
                    </View>

                    <View style={styles.featuresList}>
                        <View style={styles.featureItem}>
                            <Users size={18} color={COLORS.textSecondary} />
                            <Text style={styles.featureText}>Expected: 500+ Attendees</Text>
                        </View>
                        <View style={styles.featureItem}>
                            <Calendar size={18} color={COLORS.textSecondary} />
                            <Text style={styles.featureText}>Date: {event.startTime.includes('Tomorrow') ? 'Next Day' : 'Today'}</Text>
                        </View>
                        <View style={styles.featureItem}>
                            <Info size={18} color={COLORS.textSecondary} />
                            <Text style={styles.featureText}>Entry: Free / Invitation Based</Text>
                        </View>
                    </View>
                </View>
                <View style={{ height: 50 }} />
            </ScrollView>

            <View style={styles.actionFooter}>
                <TouchableOpacity style={styles.primaryBtn}>
                    <Text style={styles.primaryBtnText}>Set Reminder</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.secondaryBtn}>
                    <MapPin size={20} color={COLORS.accentRed} />
                    <Text style={styles.secondaryBtnText}>Get Directions</Text>
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
        alignItems: 'flex-end',
    },
    heroSection: {
        height: 250,
        width: '100%',
    },
    imagePlaceholder: {
        flex: 1,
        backgroundColor: COLORS.accentRed,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageText: {
        color: COLORS.primary,
        fontSize: 24,
        fontWeight: 'bold',
    },
    statusBadge: {
        position: 'absolute',
        top: 20,
        right: 20,
        paddingHorizontal: 15,
        paddingVertical: 6,
        borderRadius: 20,
    },
    statusText: {
        color: COLORS.primary,
        fontSize: 12,
        fontWeight: 'bold',
    },
    contentSection: {
        padding: 20,
        marginTop: -30,
        backgroundColor: COLORS.primary,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    eventTitle: {
        fontSize: 26,
        fontWeight: 'bold',
        color: COLORS.text,
        marginBottom: 15,
    },
    artistRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 25,
        padding: 10,
        backgroundColor: COLORS.cardBackground,
        borderRadius: 15,
    },
    artistAvatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: COLORS.border,
        marginRight: 15,
    },
    artistLabel: {
        fontSize: 12,
        color: COLORS.textSecondary,
    },
    artistName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    infoGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 25,
    },
    infoCard: {
        flex: 0.48,
        backgroundColor: COLORS.cardBackground,
        padding: 15,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    infoLabel: {
        fontSize: 12,
        color: COLORS.textSecondary,
        marginTop: 10,
    },
    infoValue: {
        fontSize: 14,
        fontWeight: 'bold',
        color: COLORS.text,
        marginTop: 2,
    },
    section: {
        marginBottom: 25,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.text,
        marginBottom: 10,
    },
    description: {
        fontSize: 15,
        lineHeight: 24,
        color: COLORS.textSecondary,
        textAlign: 'justify',
    },
    featuresList: {
        backgroundColor: COLORS.cardBackground,
        padding: 20,
        borderRadius: 15,
    },
    featureItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    featureText: {
        fontSize: 14,
        color: COLORS.text,
        marginLeft: 15,
    },
    actionFooter: {
        flexDirection: 'row',
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
        backgroundColor: COLORS.primary,
    },
    primaryBtn: {
        flex: 1,
        backgroundColor: COLORS.accentRed,
        padding: 15,
        borderRadius: 12,
        alignItems: 'center',
        marginRight: 10,
    },
    primaryBtnText: {
        color: COLORS.primary,
        fontWeight: 'bold',
        fontSize: 16,
    },
    secondaryBtn: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: COLORS.primary,
        padding: 15,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: COLORS.accentRed,
    },
    secondaryBtnText: {
        color: COLORS.accentRed,
        fontWeight: 'bold',
        fontSize: 16,
        marginLeft: 8,
    },
});
