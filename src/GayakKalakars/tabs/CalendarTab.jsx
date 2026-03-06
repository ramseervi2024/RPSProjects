import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
} from 'react-native';
import { COLORS } from '../theme';

const { width } = Dimensions.get('window');

export default function CalendarTab() {
    return (
        <View style={styles.tabContent}>
            <Text style={styles.pageTitle}>Event Calendar</Text>
            <View style={styles.calendarMock}>
                <Text style={styles.calendarDate}>March 2026</Text>
                <View style={styles.calendarDays}>
                    {/* Mocking a simple grid */}
                    {Array.from({ length: 31 }, (_, i) => (
                        <View key={i} style={[styles.calendarDay, (i + 1 === 15) && styles.calendarDayActive]}>
                            <Text style={[styles.calendarDayText, (i + 1 === 15) && styles.calendarDayTextActive]}>{i + 1}</Text>
                            {(i + 1 === 15 || i + 1 === 22) && <View style={styles.eventDot} />}
                        </View>
                    ))}
                </View>
            </View>
            <View style={styles.selectedDateInfo}>
                <Text style={styles.selectedDateTitle}>15th March Events</Text>
                <View style={styles.listEventCard}>
                    <Text style={styles.listEventArtist}>Prakash Mali</Text>
                    <Text style={styles.listEventTitle}>Mega Bhajan Sandhya</Text>
                </View>
            </View>
        </View>
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
    calendarMock: {
        backgroundColor: COLORS.cardBackground,
        padding: 20,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    calendarDate: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    calendarDays: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    calendarDay: {
        width: (width - 100) / 7,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 2,
    },
    calendarDayText: {
        fontSize: 14,
        color: COLORS.text,
    },
    calendarDayActive: {
        backgroundColor: COLORS.accentRed,
        borderRadius: 20,
    },
    calendarDayTextActive: {
        color: COLORS.primary,
        fontWeight: 'bold',
    },
    eventDot: {
        width: 4,
        height: 4,
        backgroundColor: COLORS.accent,
        borderRadius: 2,
        position: 'absolute',
        bottom: 4,
    },
    selectedDateInfo: {
        marginTop: 25,
    },
    selectedDateTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    listEventCard: {
        backgroundColor: COLORS.cardBackground,
        padding: 15,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: COLORS.border,
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
});
