import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { COLORS, SPACING, SIZES } from '../constants/theme';
import useFleetStore from '../store/useFleetStore';
import { MapPin, Navigation, History, ArrowLeft, Clock } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';

const TripsList = ({ navigation }) => {
    const { trips } = useFleetStore();

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.card}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('TripDetails', { trip: item })}
        >
            <View style={styles.cardContent}>
                <LinearGradient
                    colors={[COLORS.primary + '20', COLORS.primary + '05']}
                    style={styles.iconContainer}
                >
                    <Navigation size={20} color={COLORS.primary} />
                </LinearGradient>
                <View style={styles.info}>
                    <Text style={styles.target}>{item.target}</Text>
                    <Text style={styles.details}>{item.driver} • {item.time}</Text>
                    <View style={styles.timeTag}>
                        <Clock size={10} color={COLORS.textSecondary} />
                        <Text style={styles.timeText}>Scheduled: Today, 02:30 PM</Text>
                    </View>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: item.status === 'Moving' ? COLORS.success + '15' : COLORS.textSecondary + '10' }]}>
                    <View style={[styles.statusPulse, { backgroundColor: item.status === 'Moving' ? COLORS.success : COLORS.textSecondary }]} />
                    <Text style={[styles.statusText, { color: item.status === 'Moving' ? COLORS.success : COLORS.textSecondary }]}>{item.status}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.safeContainer}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <ArrowLeft color={COLORS.text} size={24} />
                    </TouchableOpacity>
                    <View>
                        <Text style={styles.title}>All Active Trips</Text>
                        <Text style={styles.subTitle}>{trips.length} Operational Units</Text>
                    </View>
                </View>

                <FlatList
                    data={trips}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={() => (
                        <View style={styles.summaryCard}>
                            <View style={styles.summaryItem}>
                                <Text style={styles.summaryVal}>{trips.filter(t => t.status === 'Moving').length}</Text>
                                <Text style={styles.summaryLab}>In Transit</Text>
                            </View>
                            <View style={styles.divider} />
                            <View style={styles.summaryItem}>
                                <Text style={styles.summaryVal}>{trips.filter(t => t.status !== 'Moving').length}</Text>
                                <Text style={styles.summaryLab}>Parked/Idle</Text>
                            </View>
                        </View>
                    )}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 12,
        gap: 14,
    },
    backBtn: {
        width: 38,
        height: 38,
        borderRadius: 10,
        backgroundColor: COLORS.surface,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ffffff08',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: COLORS.text,
        letterSpacing: -0.5,
    },
    subTitle: {
        fontSize: 12,
        color: COLORS.textSecondary,
        marginTop: 1,
    },
    summaryCard: {
        flexDirection: 'row',
        backgroundColor: COLORS.surface,
        borderRadius: 20,
        padding: 16, // Unified padding
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#ffffff08',
    },
    summaryItem: {
        flex: 1,
        alignItems: 'center',
    },
    summaryVal: {
        fontSize: 22,
        fontWeight: 'bold',
        color: COLORS.primary,
    },
    summaryLab: {
        fontSize: 11,
        color: COLORS.textSecondary,
        marginTop: 2,
    },
    divider: {
        width: 1,
        height: '100%',
        backgroundColor: '#ffffff08',
    },
    listContent: {
        padding: 20, // Standardized padding
        paddingBottom: 40,
    },
    card: {
        backgroundColor: COLORS.surface,
        borderRadius: 16,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ffffff05',
        overflow: 'hidden',
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 14, // Unified card inner padding
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    info: {
        flex: 1,
        marginLeft: 14,
    },
    target: {
        color: COLORS.text,
        fontSize: 14,
        fontWeight: '700',
        marginBottom: 2,
    },
    details: {
        color: COLORS.textSecondary,
        fontSize: 11,
    },
    timeTag: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginTop: 4,
        backgroundColor: COLORS.surfaceLight + '30',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
        alignSelf: 'flex-start',
    },
    timeText: {
        fontSize: 8,
        color: COLORS.textSecondary,
        fontWeight: '600',
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 8,
        gap: 6,
    },
    statusPulse: {
        width: 5,
        height: 5,
        borderRadius: 2.5,
    },
    statusText: {
        fontSize: 9,
        fontWeight: '900',
        textTransform: 'uppercase',
    },
});

export default TripsList;
