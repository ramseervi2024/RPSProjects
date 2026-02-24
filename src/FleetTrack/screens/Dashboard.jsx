import React, { useState } from 'react';
import {
    View, Text, StyleSheet, ScrollView, Dimensions, SafeAreaView,
    TouchableOpacity, Modal, TextInput, Alert
} from 'react-native';
import { COLORS, SPACING } from '../constants/theme';
import StatCard from '../components/StatCard';
import {
    Truck, Fuel, Activity, Bell, History, MapPin, TrendingUp, X,
    Navigation, User as UserIcon, Search, Brain, Zap, DollarSign,
    Cloud, Wind, ShieldCheck, CreditCard
} from 'lucide-react-native';
import useFleetStore from '../store/useFleetStore';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');

/* ──────────────────────────────────────────────
   MINI COMPONENTS
────────────────────────────────────────────── */

const DonutChart = ({ data }) => {
    const total = data.reduce((s, d) => s + d.y, 0);
    return (
        <View style={styles.pieWrap}>
            <View style={styles.donutRing}>
                {data.map((item, i) => (
                    <View key={i} style={[styles.donutSlice, { flex: item.y, backgroundColor: item.color }]} />
                ))}
                <View style={styles.donutHole}>
                    <Activity size={20} color={COLORS.primary} />
                    <Text style={styles.donutLabel}>LIVE</Text>
                </View>
            </View>
            <View style={styles.pieLegend}>
                {data.map((item, i) => (
                    <View key={i} style={styles.legendRow}>
                        <View style={[styles.legendDot, { backgroundColor: item.color }]} />
                        <View>
                            <Text style={styles.legendName}>{item.x}</Text>
                            <Text style={styles.legendCount}>{item.y} units ({((item.y / total) * 100).toFixed(0)}%)</Text>
                        </View>
                    </View>
                ))}
            </View>
        </View>
    );
};

const BarChart = ({ data }) => {
    const max = Math.max(...data.map(d => d.consumption));
    return (
        <View style={styles.barChart}>
            {data.map((item, i) => (
                <View key={i} style={styles.barCol}>
                    <View style={styles.barTrack}>
                        <LinearGradient
                            colors={[COLORS.primary, COLORS.secondary]}
                            style={[styles.barFill, { height: `${(item.consumption / max) * 100}%` }]}
                        />
                    </View>
                    <Text style={styles.barDay}>{item.day}</Text>
                </View>
            ))}
        </View>
    );
};

const TripRow = ({ trip, onPress }) => (
    <TouchableOpacity style={styles.tripRow} onPress={onPress} activeOpacity={0.7}>
        <View style={[styles.tripIconBox, { backgroundColor: COLORS.primary + '18' }]}>
            <MapPin size={16} color={COLORS.primary} />
        </View>
        <View style={styles.tripInfo}>
            <Text style={styles.tripRoute}>{trip.target}</Text>
            <Text style={styles.tripMeta}>{trip.driver} • {trip.time}</Text>
        </View>
        <View style={[styles.tripBadge, { backgroundColor: trip.status === 'Moving' ? COLORS.success + '18' : '#ffffff0a' }]}>
            <View style={[styles.tripDot, { backgroundColor: trip.status === 'Moving' ? COLORS.success : COLORS.textSecondary }]} />
            <Text style={[styles.tripStatus, { color: trip.status === 'Moving' ? COLORS.success : COLORS.textSecondary }]}>
                {trip.status}
            </Text>
        </View>
    </TouchableOpacity>
);

/* ──────────────────────────────────────────────
   MAIN SCREEN
────────────────────────────────────────────── */
const Dashboard = ({ navigation }) => {
    const { vehicles, drivers, trips, addTrip, activeAlerts } = useFleetStore();
    const [modalVisible, setModalVisible] = useState(false);
    const [newTrip, setNewTrip] = useState({ target: '', driver: '', status: 'Moving' });

    const active = vehicles.filter(v => v.status === 'Active').length;
    const maint = vehicles.filter(v => v.status === 'Maintenance').length;
    const idle = vehicles.length - active - maint;
    const avgFuel = vehicles.length > 0
        ? Math.round(vehicles.reduce((s, v) => s + v.fuelLevel, 0) / vehicles.length)
        : 0;

    const chartData = [
        { x: 'Active', y: active || 1, color: COLORS.success },
        { x: 'Maint.', y: maint || 1, color: COLORS.warning },
        { x: 'Idle', y: idle || 1, color: COLORS.primary },
    ];

    const fuelData = [
        { day: 'Mon', consumption: 45 },
        { day: 'Tue', consumption: 52 },
        { day: 'Wed', consumption: 48 },
        { day: 'Thu', consumption: 61 },
        { day: 'Fri', consumption: 55 },
        { day: 'Sat', consumption: 38 },
        { day: 'Sun', consumption: 30 },
    ];

    const quickActions = [
        { icon: ShieldCheck, label: 'Geo-fence', color: COLORS.primary },
        { icon: CreditCard, label: 'Log Expense', color: COLORS.success },
        { icon: Activity, label: 'SOS Alert', color: COLORS.danger },
        { icon: MapPin, label: 'Tracker', color: COLORS.accent },
    ];

    const handleAddTrip = () => {
        if (!newTrip.target || !newTrip.driver) {
            Alert.alert('Missing Info', 'Please fill in route and driver.');
            return;
        }
        addTrip(newTrip);
        setModalVisible(false);
        setNewTrip({ target: '', driver: '', status: 'Moving' });
    };

    return (
        <SafeAreaView style={styles.safe}>
            <ScrollView
                style={styles.scroll}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* ── HEADER ── */}
                <View style={styles.header}>
                    <View style={styles.headerLeft}>
                        <View style={styles.envRow}>
                            <Cloud size={11} color={COLORS.textSecondary} />
                            <Text style={styles.envText}>24°C · Sunny</Text>
                            <Text style={styles.envSep}>|</Text>
                            <Wind size={11} color={COLORS.textSecondary} />
                            <Text style={styles.envText}>Stable Traffic</Text>
                        </View>
                        <Text style={styles.screenTitle}>Fleet Control</Text>
                        <Text style={styles.screenSub}>AI-Powered Logistics</Text>
                    </View>
                    <View style={styles.headerRight}>
                        <TouchableOpacity style={styles.iconBtn}>
                            <Search size={19} color={COLORS.text} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.iconBtn}
                            onPress={() => navigation.navigate('Alerts')}
                        >
                            <Bell size={19} color={COLORS.text} />
                            {activeAlerts.length > 0 && (
                                <View style={styles.badge}>
                                    <Text style={styles.badgeText}>{activeAlerts.length}</Text>
                                </View>
                            )}
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.avatarBtn}
                            onPress={() => navigation.navigate('Profile')}
                        >
                            <LinearGradient
                                colors={[COLORS.primary, COLORS.secondary]}
                                style={styles.avatarGrad}
                            >
                                <UserIcon size={18} color="white" />
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* ── QUICK ACTIONS ── */}
                <Text style={styles.sectionLabel}>Quick Actions</Text>
                <View style={styles.actionRow}>
                    {quickActions.map((item, idx) => (
                        <TouchableOpacity key={idx} style={styles.actionCard} activeOpacity={0.75}>
                            <View style={[styles.actionIconBox, { backgroundColor: item.color + '18' }]}>
                                <item.icon size={20} color={item.color} />
                            </View>
                            <Text style={styles.actionLabel}>{item.label}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* ── STAT CARDS ── */}
                <Text style={styles.sectionLabel}>Overview</Text>
                <View style={styles.statRow}>
                    <StatCard title="Revenue" value="$4,280" icon={DollarSign} color={COLORS.success} trend="+12%" />
                    <StatCard title="Expense" value="$1,120" icon={CreditCard} color={COLORS.danger} trend="-5%" />
                </View>
                <View style={styles.statRow}>
                    <StatCard title="Vehicles" value={vehicles.length} icon={Truck} color={COLORS.primary} />
                    <StatCard
                        title="Avg Fuel"
                        value={`${avgFuel}%`}
                        icon={Fuel}
                        color={COLORS.accent}
                        trend="-2%"
                        onPress={() => navigation.navigate('FleetHealth')}
                    />
                </View>

                {/* ── AI INSIGHT BANNER ── */}
                <TouchableOpacity style={styles.aiBanner} activeOpacity={0.85}>
                    <LinearGradient
                        colors={['#4f46e5', '#7c3aed']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.aiInner}
                    >
                        <View style={styles.aiIcon}>
                            <Brain size={24} color="white" />
                        </View>
                        <View style={styles.aiText}>
                            <Text style={styles.aiTitle}>AI Fleet Insight</Text>
                            <Text style={styles.aiDesc} numberOfLines={2}>
                                Predictive maintenance: Check TX-4092 brakes within 48h to avoid delays.
                            </Text>
                        </View>
                        <Zap size={18} color="rgba(255,255,255,0.55)" />
                    </LinearGradient>
                </TouchableOpacity>

                {/* ── FLEET STATUS CARD ── */}
                <View style={styles.card}>
                    <View style={styles.cardHead}>
                        <View style={styles.cardHeadLeft}>
                            <View style={[styles.cardIcon, { backgroundColor: COLORS.primary + '18' }]}>
                                <TrendingUp size={16} color={COLORS.primary} />
                            </View>
                            <Text style={styles.cardTitle}>Real-time Fleet Status</Text>
                        </View>
                        <TouchableOpacity onPress={() => navigation.navigate('Reports')}>
                            <Text style={styles.cardLink}>Analysis</Text>
                        </TouchableOpacity>
                    </View>
                    <DonutChart data={chartData} />
                </View>

                {/* ── FUEL CARD ── */}
                <View style={styles.card}>
                    <View style={styles.cardHead}>
                        <View style={styles.cardHeadLeft}>
                            <View style={[styles.cardIcon, { backgroundColor: COLORS.success + '18' }]}>
                                <Fuel size={16} color={COLORS.success} />
                            </View>
                            <Text style={styles.cardTitle}>Weekly Fuel Intake (L)</Text>
                        </View>
                    </View>
                    <BarChart data={fuelData} />
                </View>

                {/* ── TRIPS CARD ── */}
                <View style={styles.card}>
                    <View style={styles.cardHead}>
                        <View style={styles.cardHeadLeft}>
                            <View style={[styles.cardIcon, { backgroundColor: COLORS.accent + '18' }]}>
                                <History size={16} color={COLORS.accent} />
                            </View>
                            <Text style={styles.cardTitle}>Operational Feed</Text>
                        </View>
                        <View style={{ flexDirection: 'row', gap: 14 }}>
                            <TouchableOpacity onPress={() => setModalVisible(true)}>
                                <Text style={styles.cardLink}>+ Dispatch</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.navigate('TripsList')}>
                                <Text style={styles.cardLink}>View All</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {trips.slice(0, 5).map(trip => (
                        <TripRow
                            key={trip.id}
                            trip={trip}
                            onPress={() => navigation.navigate('TripDetails', { trip })}
                        />
                    ))}
                </View>
            </ScrollView>

            {/* ── DISPATCH MODAL ── */}
            <Modal
                animationType="slide"
                transparent
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalSheet}>
                        <View style={styles.modalHead}>
                            <Text style={styles.modalTitle}>Dispatch New Trip</Text>
                            <TouchableOpacity onPress={() => setModalVisible(false)}>
                                <X color={COLORS.text} size={22} />
                            </TouchableOpacity>
                        </View>
                        <ScrollView style={styles.modalBody}>
                            <Text style={styles.inputLabel}>Route (From → To)</Text>
                            <View style={styles.inputRow}>
                                <Navigation size={16} color={COLORS.primary} style={{ marginRight: 10 }} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="e.g. Warehouse A → Terminal 2"
                                    placeholderTextColor={COLORS.textSecondary + '60'}
                                    value={newTrip.target}
                                    onChangeText={t => setNewTrip({ ...newTrip, target: t })}
                                />
                            </View>
                            <Text style={styles.inputLabel}>Assign Driver</Text>
                            <View style={styles.inputRow}>
                                <UserIcon size={16} color={COLORS.primary} style={{ marginRight: 10 }} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="e.g. John Doe"
                                    placeholderTextColor={COLORS.textSecondary + '60'}
                                    value={newTrip.driver}
                                    onChangeText={t => setNewTrip({ ...newTrip, driver: t })}
                                />
                            </View>
                            <Text style={styles.inputLabel}>Trip Status</Text>
                            <View style={styles.statusRow}>
                                {['Moving', 'Idle', 'Delayed'].map(s => (
                                    <TouchableOpacity
                                        key={s}
                                        style={[
                                            styles.statusChip,
                                            newTrip.status === s && { backgroundColor: COLORS.primary, borderColor: COLORS.primary }
                                        ]}
                                        onPress={() => setNewTrip({ ...newTrip, status: s })}
                                    >
                                        <Text style={[styles.statusChipText, newTrip.status === s && { color: 'white' }]}>
                                            {s}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                            <TouchableOpacity style={styles.dispatchBtn} onPress={handleAddTrip}>
                                <Text style={styles.dispatchBtnText}>Dispatch Trip</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

/* ──────────────────────────────────────────────
   STYLES
────────────────────────────────────────────── */
const styles = StyleSheet.create({
    safe: { flex: 1, backgroundColor: COLORS.background },
    scroll: { flex: 1 },
    scrollContent: { padding: 20, paddingBottom: 110 },

    /* Header */
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 28,
        marginTop: 4,
    },
    headerLeft: { flex: 1 },
    headerRight: { flexDirection: 'row', alignItems: 'center', gap: 10 },
    envRow: { flexDirection: 'row', alignItems: 'center', gap: 5, marginBottom: 6 },
    envText: { color: COLORS.textSecondary, fontSize: 11, fontWeight: '600' },
    envSep: { color: COLORS.textSecondary, marginHorizontal: 4, fontSize: 11 },
    screenTitle: { fontSize: 28, fontWeight: '800', color: COLORS.text, letterSpacing: -0.8 },
    screenSub: { fontSize: 13, color: COLORS.textSecondary, marginTop: 2 },
    iconBtn: {
        width: 40, height: 40, borderRadius: 12,
        backgroundColor: COLORS.surface,
        justifyContent: 'center', alignItems: 'center',
        borderWidth: 1, borderColor: '#ffffff08',
    },
    badge: {
        position: 'absolute', top: 6, right: 6,
        width: 14, height: 14, borderRadius: 7,
        backgroundColor: COLORS.danger,
        borderWidth: 1.5, borderColor: COLORS.background,
        justifyContent: 'center', alignItems: 'center',
    },
    badgeText: { color: 'white', fontSize: 7, fontWeight: '900' },
    avatarBtn: {
        width: 40, height: 40, borderRadius: 12, overflow: 'hidden',
    },
    avatarGrad: { flex: 1, justifyContent: 'center', alignItems: 'center' },

    /* Section Label */
    sectionLabel: {
        color: COLORS.textSecondary, fontSize: 11, fontWeight: '700',
        textTransform: 'uppercase', letterSpacing: 1,
        marginBottom: 12, marginTop: 4,
    },

    /* Quick Actions */
    actionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 24,
    },
    actionCard: { alignItems: 'center', flex: 1 },
    actionIconBox: {
        width: 52, height: 52, borderRadius: 16,
        justifyContent: 'center', alignItems: 'center',
        marginBottom: 8, borderWidth: 1, borderColor: '#ffffff06',
    },
    actionLabel: {
        color: COLORS.textSecondary, fontSize: 10, fontWeight: '700',
        textAlign: 'center',
    },

    /* Stat Cards */
    statRow: {
        flexDirection: 'row', gap: 10, marginBottom: 10,
    },

    /* AI Banner */
    aiBanner: {
        borderRadius: 18, overflow: 'hidden',
        marginBottom: 24, marginTop: 6,
        shadowColor: '#4f46e5', shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.35, shadowRadius: 12, elevation: 8,
    },
    aiInner: {
        flexDirection: 'row', alignItems: 'center',
        paddingHorizontal: 18, paddingVertical: 16,
    },
    aiIcon: {
        width: 46, height: 46, borderRadius: 14,
        backgroundColor: 'rgba(255,255,255,0.18)',
        justifyContent: 'center', alignItems: 'center',
        marginRight: 14,
    },
    aiText: { flex: 1, paddingRight: 8 },
    aiTitle: { color: 'white', fontSize: 15, fontWeight: '800', marginBottom: 3 },
    aiDesc: { color: 'rgba(255,255,255,0.85)', fontSize: 12, lineHeight: 17 },

    /* Cards */
    card: {
        backgroundColor: COLORS.surface, borderRadius: 20,
        padding: 18, marginBottom: 14,
        borderWidth: 1, borderColor: '#ffffff08',
    },
    cardHead: {
        flexDirection: 'row', justifyContent: 'space-between',
        alignItems: 'center', marginBottom: 18,
    },
    cardHeadLeft: { flexDirection: 'row', alignItems: 'center' },
    cardIcon: {
        width: 32, height: 32, borderRadius: 10,
        justifyContent: 'center', alignItems: 'center', marginRight: 10,
    },
    cardTitle: { fontSize: 14, fontWeight: '700', color: COLORS.text },
    cardLink: { fontSize: 11, color: COLORS.primary, fontWeight: '700', textTransform: 'uppercase' },

    /* Donut chart */
    pieWrap: { flexDirection: 'row', alignItems: 'center' },
    donutRing: {
        width: 110, height: 110, borderRadius: 55,
        overflow: 'hidden', flexDirection: 'row',
        backgroundColor: COLORS.background,
        borderWidth: 3, borderColor: '#ffffff04',
        transform: [{ rotate: '45deg' }],
    },
    donutSlice: { height: '100%' },
    donutHole: {
        position: 'absolute',
        width: 72, height: 72, borderRadius: 36,
        backgroundColor: COLORS.surface,
        justifyContent: 'center', alignItems: 'center',
        transform: [{ rotate: '-45deg' }],
        borderWidth: 1, borderColor: '#ffffff08',
        top: 19, left: 19,
    },
    donutLabel: { color: COLORS.success, fontSize: 8, fontWeight: '900', marginTop: 2 },
    pieLegend: { flex: 1, marginLeft: 20 },
    legendRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
    legendDot: { width: 8, height: 8, borderRadius: 4, marginRight: 10 },
    legendName: { color: COLORS.text, fontSize: 13, fontWeight: '600' },
    legendCount: { color: COLORS.textSecondary, fontSize: 10, marginTop: 1 },

    /* Bar chart */
    barChart: {
        height: 130, flexDirection: 'row',
        justifyContent: 'space-between', alignItems: 'flex-end',
    },
    barCol: { flex: 1, alignItems: 'center' },
    barTrack: {
        width: 10, height: 100, borderRadius: 5,
        backgroundColor: COLORS.background, overflow: 'hidden',
        justifyContent: 'flex-end',
    },
    barFill: { width: '100%', borderRadius: 5 },
    barDay: { color: COLORS.textSecondary, fontSize: 9, marginTop: 6, fontWeight: '600' },

    /* Trip row */
    tripRow: {
        flexDirection: 'row', alignItems: 'center', paddingVertical: 12,
        borderBottomWidth: 1, borderBottomColor: '#ffffff06',
    },
    tripIconBox: { width: 36, height: 36, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
    tripInfo: { flex: 1, marginLeft: 12 },
    tripRoute: { color: COLORS.text, fontSize: 13, fontWeight: '700' },
    tripMeta: { color: COLORS.textSecondary, fontSize: 11, marginTop: 2 },
    tripBadge: {
        flexDirection: 'row', alignItems: 'center',
        paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, gap: 5,
    },
    tripDot: { width: 5, height: 5, borderRadius: 2.5 },
    tripStatus: { fontSize: 10, fontWeight: '800', textTransform: 'uppercase' },

    /* Modal */
    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'flex-end' },
    modalSheet: {
        backgroundColor: COLORS.background, borderTopLeftRadius: 28,
        borderTopRightRadius: 28, padding: 24, maxHeight: '85%',
    },
    modalHead: {
        flexDirection: 'row', justifyContent: 'space-between',
        alignItems: 'center', marginBottom: 20,
        paddingBottom: 18, borderBottomWidth: 1, borderBottomColor: '#ffffff10',
    },
    modalTitle: { color: COLORS.text, fontSize: 18, fontWeight: '800' },
    modalBody: { paddingBottom: 40 },
    inputLabel: {
        color: COLORS.textSecondary, fontSize: 12, fontWeight: '700',
        marginTop: 18, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5,
    },
    inputRow: {
        flexDirection: 'row', alignItems: 'center',
        backgroundColor: COLORS.surface, borderRadius: 14,
        paddingHorizontal: 14, borderWidth: 1, borderColor: '#ffffff10',
    },
    input: { flex: 1, paddingVertical: 14, color: COLORS.text, fontSize: 14 },
    statusRow: { flexDirection: 'row', gap: 10, marginTop: 4 },
    statusChip: {
        flex: 1, paddingVertical: 11, borderRadius: 12,
        backgroundColor: COLORS.surface, alignItems: 'center',
        borderWidth: 1, borderColor: '#ffffff12',
    },
    statusChipText: { color: COLORS.textSecondary, fontWeight: '700', fontSize: 12 },
    dispatchBtn: {
        backgroundColor: COLORS.primary, borderRadius: 16,
        padding: 17, alignItems: 'center', marginTop: 36, marginBottom: 20,
    },
    dispatchBtnText: { color: 'white', fontSize: 15, fontWeight: '800' },
});

export default Dashboard;
