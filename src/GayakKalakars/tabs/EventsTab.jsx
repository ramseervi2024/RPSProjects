import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { Clock, MapPin, ChevronRight } from 'lucide-react-native';
import { COLORS } from '../theme';
import { ONGOING_EVENTS } from '../ongoingupcomingevents';

export default function EventsTab({ onSelectEvent }) {
    return (
        <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
            <Text style={styles.pageTitle}>Ongoing & Upcoming</Text>
            {ONGOING_EVENTS.map(event => (
                <TouchableOpacity
                    key={event.id}
                    style={styles.listEventCard}
                    onPress={() => onSelectEvent(event)}
                >
                    <View style={[styles.statusBadge, { backgroundColor: event.status === 'LIVE' ? '#E74C3C' : COLORS.accent }]}>
                        <Text style={styles.statusText}>{event.status}</Text>
                    </View>
                    <View style={styles.listEventInfo}>
                        <Text style={styles.listEventArtist}>{event.artist}</Text>
                        <Text style={styles.listEventTitle}>{event.title}</Text>
                        <View style={styles.eventInfoRow}>
                            <Clock size={14} color={COLORS.textSecondary} />
                            <Text style={styles.eventInfoText}>{event.startTime}</Text>
                        </View>
                        <View style={styles.eventInfoRow}>
                            <MapPin size={14} color={COLORS.textSecondary} />
                            <Text style={styles.eventInfoText}>{event.location}</Text>
                        </View>
                    </View>
                    <View style={styles.viewDetailsBtn}>
                        <ChevronRight size={20} color={COLORS.accentRed} />
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
    listEventCard: {
        flexDirection: 'row',
        backgroundColor: COLORS.cardBackground,
        padding: 15,
        borderRadius: 16,
        marginBottom: 15,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    statusBadge: {
        width: 80,
        height: 24,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 10,
        right: 10,
    },
    statusText: {
        fontSize: 10,
        color: COLORS.primary,
        fontWeight: 'bold',
    },
    listEventInfo: {
        flex: 1,
    },
    listEventArtist: {
        fontSize: 14,
        fontWeight: 'bold',
        color: COLORS.accentRed,
    },
    listEventTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.text,
        marginVertical: 5,
    },
    eventInfoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    eventInfoText: {
        fontSize: 12,
        color: COLORS.textSecondary,
        marginLeft: 4,
    },
    viewDetailsBtn: {
        padding: 10,
    },
});
