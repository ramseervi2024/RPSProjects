import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { COLORS, SPACING, SIZES } from '../constants/theme';
import useFleetStore from '../store/useFleetStore';
import { MapPin, Navigation, History, ArrowLeft, Clock } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';

const TripsList = ({ navigation }) => {
    const { trips } = useFleetStore();

    const renderItem = ({ item }) => (
        <View style={styles.card}>
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
        </View>
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
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.md,
        gap: 16,
    },
    backBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
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
    },
    subTitle: {
        fontSize: 13,
        color: COLORS.textSecondary,
    },
    summaryCard: {
        flexDirection: 'row',
        backgroundColor: COLORS.surface,
        borderRadius: 20,
        padding: 20,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#ffffff08',
    },
    summaryItem: {
        flex: 1,
        alignItems: 'center',
    },
    summaryVal: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.primary,
    },
    summaryLab: {
        fontSize: 12,
        color: COLORS.textSecondary,
        marginTop: 4,
    },
    divider: {
        width: 1,
        height: '100%',
        backgroundColor: '#ffffff08',
    },
    listContent: {
        padding: SPACING.md,
        paddingBottom: 40,
    },
    card: {
        backgroundColor: COLORS.surface,
        borderRadius: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#ffffff05',
        overflow: 'hidden',
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
    },
    iconContainer: {
        width: 44,
        height: 44,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    info: {
        flex: 1,
        marginLeft: 16,
    },
    target: {
        color: COLORS.text,
        fontSize: 15,
        fontWeight: '700',
        marginBottom: 4,
    },
    details: {
        color: COLORS.textSecondary,
        fontSize: 12,
    },
    timeTag: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginTop: 6,
        backgroundColor: COLORS.surfaceLight + '30',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
        alignSelf: 'flex-start',
    },
    timeText: {
        fontSize: 9,
        color: COLORS.textSecondary,
        fontWeight: '600',
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 8,
        gap: 6,
    },
    statusPulse: {
        width: 6,
        height: 6,
        borderRadius: 3,
    },
    statusText: {
        fontSize: 10,
        fontWeight: '900',
        textTransform: 'uppercase',
    },
});

export default TripsList;
