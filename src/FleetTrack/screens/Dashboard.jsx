import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, SafeAreaView, TouchableOpacity, Modal, TextInput, Alert, Image } from 'react-native';
import { COLORS, SPACING, SIZES } from '../constants/theme';
import StatCard from '../components/StatCard';
import { Truck, Users, AlertTriangle, Fuel, Activity, Bell, History, MapPin, TrendingUp, X, Navigation, User as UserIcon, Search, Brain, Zap, DollarSign, Cloud, Wind, ShieldCheck, CreditCard } from 'lucide-react-native';
import useFleetStore from '../store/useFleetStore';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');

const CustomPieChart = ({ data }) => {
    const total = data.reduce((acc, item) => acc + item.y, 0);
    return (
        <View style={styles.pieContainer}>
            <View style={styles.pieVisual}>
                <View style={styles.donutBase}>
                    {data.map((item, index) => (
                        <View
                            key={index}
                            style={[
                                styles.pieSegment,
                                {
                                    backgroundColor: item.color,
                                    flex: item.y,
                                }
                            ]}
                        />
                    ))}
                    <View style={styles.donutCenter}>
                        <Activity size={24} color={COLORS.primary} strokeWidth={3} />
                        <Text style={styles.donutText}>LIVE</Text>
                    </View>
                </View>
            </View>
            <View style={styles.pieLegend}>
                {data.map((item, index) => {
                    const percentage = (item.y / total) * 100;
                    return (
                        <View key={index} style={styles.legendItem}>
                            <View style={[styles.colorDot, { backgroundColor: item.color }]} />
                            <View>
                                <Text style={styles.legendLabel}>{item.x}</Text>
                                <Text style={styles.legendValue}>{item.y} units ({percentage.toFixed(0)}%)</Text>
                            </View>
                        </View>
                    );
                })}
            </View>
        </View>
    );
};

const CustomBarChart = ({ data }) => {
    const maxVal = Math.max(...data.map(d => d.consumption));
    return (
        <View style={styles.barChartContainer}>
            {data.map((item, index) => {
                const barHeight = (item.consumption / maxVal) * 100;
                return (
                    <View key={index} style={styles.barItem}>
                        <View style={styles.barColumn}>
                            <View style={styles.barTrack}>
                                <LinearGradient
                                    colors={[COLORS.primary, COLORS.secondary]}
                                    style={[styles.barFill, { height: `${barHeight}%` }]}
                                />
                            </View>
                            <Text style={styles.barLabel}>{item.day}</Text>
                        </View>
                    </View>
                );
            })}
        </View>
    );
};

const RecentTripItem = ({ trip, onPress }) => (
    <TouchableOpacity style={styles.tripItem} onPress={onPress} activeOpacity={0.7}>
        <LinearGradient
            colors={[COLORS.primary + '20', COLORS.primary + '05']}
            style={styles.tripIcon}
        >
            <MapPin size={18} color={COLORS.primary} />
        </LinearGradient>
        <View style={styles.tripInfo}>
            <Text style={styles.tripTarget}>{trip.target}</Text>
            <Text style={styles.tripDetails}>{trip.driver} • {trip.time}</Text>
        </View>
        <View style={[styles.tripStatus, { backgroundColor: trip.status === 'Moving' ? COLORS.success + '15' : COLORS.textSecondary + '10' }]}>
            <View style={[styles.statusPulse, { backgroundColor: trip.status === 'Moving' ? COLORS.success : COLORS.textSecondary }]} />
            <Text style={[styles.tripStatusText, { color: trip.status === 'Moving' ? COLORS.success : COLORS.textSecondary }]}>{trip.status}</Text>
        </View>
    </TouchableOpacity>
);

const Dashboard = ({ navigation }) => {
    const { vehicles, drivers, trips, addTrip, activeAlerts } = useFleetStore();
    const [modalVisible, setModalVisible] = useState(false);
    const [newTrip, setNewTrip] = useState({
        target: '',
        driver: '',
        status: 'Moving'
    });

    const activeVehicles = vehicles.filter(v => v.status === 'Active').length;
    const maintenanceVehicles = vehicles.filter(v => v.status === 'Maintenance').length;
    const idleVehicles = vehicles.length - activeVehicles - maintenanceVehicles;
    const totalFuel = vehicles.reduce((acc, v) => acc + v.fuelLevel, 0) / (vehicles.length || 1);

    const chartData = [
        { x: 'Active', y: activeVehicles, color: COLORS.success },
        { x: 'Maint.', y: maintenanceVehicles, color: COLORS.warning },
        { x: 'Idle', y: idleVehicles, color: COLORS.primary },
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

    const handleAddTrip = () => {
        if (!newTrip.target || !newTrip.driver) {
            Alert.alert('Error', 'Please fill in route and driver');
            return;
        }
        addTrip(newTrip);
        setModalVisible(false);
        setNewTrip({ target: '', driver: '', status: 'Moving' });
    };

    return (
        <SafeAreaView style={styles.safeContainer}>
            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.header}>
                    <View style={styles.headerInfo}>
                        <View style={styles.envOverlay}>
                            <View style={styles.envItem}>
                                <Cloud size={10} color={COLORS.primary} />
                                <Text style={styles.envText}>24°C • Sunny</Text>
                            </View>
                            <View style={styles.envDivider} />
                            <View style={styles.envItem}>
                                <Wind size={10} color={COLORS.success} />
                                <Text style={styles.envText}>Stable Traffic</Text>
                            </View>
                        </View>
                        <Text style={styles.greeting}>Fleet Control Center</Text>
                        <Text style={styles.subGreeting}>AI-Powered Logistics Intelligence</Text>
                    </View>
                    <View style={styles.headerActions}>
                        <TouchableOpacity style={styles.headerBtn}>
                            <Search color={COLORS.text} size={22} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.headerBtn} onPress={() => navigation.navigate('Alerts')}>
                            <Bell color={COLORS.text} size={22} />
                            {activeAlerts.length > 0 && (
                                <View style={styles.badge}>
                                    <Text style={styles.badgeText}>{activeAlerts.length}</Text>
                                </View>
                            )}
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.profileBtn} onPress={() => navigation.navigate('Profile')}>
                            <LinearGradient
                                colors={[COLORS.primary, COLORS.secondary]}
                                style={styles.profileGradient}
                            >
                                <UserIcon color="white" size={20} />
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>

                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.actionScroller} contentContainerStyle={styles.actionContent}>
                    {[
                        { icon: ShieldCheck, label: 'Geo-fence', color: COLORS.primary },
                        { icon: CreditCard, label: 'Log Expense', color: COLORS.success },
                        { icon: Activity, label: 'SOS Alert', color: COLORS.danger },
                        { icon: MapPin, label: 'Asset Tracker', color: COLORS.accent },
                    ].map((item, idx) => (
                        <TouchableOpacity key={idx} style={styles.actionItem}>
                            <View style={[styles.actionIcon, { backgroundColor: item.color + '15' }]}>
                                <item.icon size={18} color={item.color} />
                            </View>
                            <Text style={styles.actionLabel}>{item.label}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                <View style={styles.statsGrid}>
                    <View style={styles.statsRow}>
                        <StatCard title="Daily Revenue" value="$4,280" icon={DollarSign} color={COLORS.success} trend="+12%" />
                        <StatCard title="Op. Expense" value="$1,120" icon={CreditCard} color={COLORS.danger} trend="-5%" />
                    </View>
                    <View style={styles.statsRow}>
                        <StatCard title="All Vehicles" value={vehicles.length} icon={Truck} color={COLORS.primary} />
                        <StatCard title="Active Drivers" value={drivers.length} icon={Users} color={COLORS.secondary} />
                    </View>
                    <View style={styles.statsRow}>
                        <StatCard title="In Service" value={maintenanceVehicles} icon={AlertTriangle} color={COLORS.warning} />
                        <StatCard
                            title="Avg Fuel"
                            value={`${totalFuel.toFixed(0)}%`}
                            icon={Fuel}
                            color={COLORS.success}
                            onPress={() => navigation.navigate('FleetHealth')}
                        />
                    </View>
                </View>

                <TouchableOpacity style={styles.aiBanner}>
                    <LinearGradient colors={[COLORS.primary, COLORS.secondary]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.aiGradient}>
                        <View style={styles.aiIconBox}>
                            <Brain size={24} color="white" />
                        </View>
                        <View style={styles.aiContent}>
                            <Text style={styles.aiTitle}>AI Fleet Recommendation</Text>
                            <Text style={styles.aiDesc}>Predictive maintenance suggest checking TX-4092 brakes within 48h to avoid route delay.</Text>
                        </View>
                        <Zap size={20} color="white" opacity={0.6} />
                    </LinearGradient>
                </TouchableOpacity>

                <View style={styles.mainCard}>
                    <View style={styles.cardHeader}>
                        <View style={styles.cardHeaderTitle}>
                            <View style={[styles.cardIconBox, { backgroundColor: COLORS.primary + '20' }]}>
                                <TrendingUp size={18} color={COLORS.primary} />
                            </View>
                            <Text style={styles.cardTitle}>Real-time Fleet Status</Text>
                        </View>
                        <TouchableOpacity onPress={() => navigation.navigate('Reports')}>
                            <Text style={styles.viewMore}>Analysis</Text>
                        </TouchableOpacity>
                    </View>
                    <CustomPieChart data={chartData} />
                </View>

                <View style={styles.mainCard}>
                    <View style={styles.cardHeader}>
                        <View style={styles.cardHeaderTitle}>
                            <View style={[styles.cardIconBox, { backgroundColor: COLORS.success + '20' }]}>
                                <Fuel size={18} color={COLORS.success} />
                            </View>
                            <Text style={styles.cardTitle}>Weekly Fuel Intake (L)</Text>
                        </View>
                    </View>
                    <CustomBarChart data={fuelData} />
                </View>

                <View style={styles.mainCard}>
                    <View style={styles.cardHeader}>
                        <View style={styles.cardHeaderTitle}>
                            <View style={[styles.cardIconBox, { backgroundColor: COLORS.accent + '20' }]}>
                                <History size={18} color={COLORS.accent} />
                            </View>
                            <Text style={styles.cardTitle}>Operational Feed</Text>
                        </View>
                        <View style={{ flexDirection: 'row', gap: 12 }}>
                            <TouchableOpacity onPress={() => setModalVisible(true)}>
                                <Text style={styles.viewMore}>+ Dispatch</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.navigate('TripsList')}>
                                <Text style={styles.viewMore}>View All</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {trips.slice(0, 5).map((trip) => (
                        <RecentTripItem
                            key={trip.id}
                            trip={trip}
                            onPress={() => navigation.navigate('TripDetails', { trip })}
                        />
                    ))}
                </View>
            </ScrollView>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Dispatch New Trip</Text>
                            <TouchableOpacity onPress={() => setModalVisible(false)}>
                                <X color={COLORS.text} size={24} />
                            </TouchableOpacity>
                        </View>

                        <ScrollView style={styles.modalForm}>
                            <Text style={styles.inputLabel}>Route (From → To)</Text>
                            <View style={styles.inputBox}>
                                <Navigation size={18} color={COLORS.primary} style={{ marginRight: 10 }} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="e.g. Warehouse A → Terminal 2"
                                    placeholderTextColor={COLORS.textSecondary + '80'}
                                    value={newTrip.target}
                                    onChangeText={(text) => setNewTrip({ ...newTrip, target: text })}
                                />
                            </View>

                            <Text style={styles.inputLabel}>Assign Driver</Text>
                            <View style={styles.inputBox}>
                                <UserIcon size={18} color={COLORS.primary} style={{ marginRight: 10 }} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="e.g. John Doe"
                                    placeholderTextColor={COLORS.textSecondary + '80'}
                                    value={newTrip.driver}
                                    onChangeText={(text) => setNewTrip({ ...newTrip, driver: text })}
                                />
                            </View>

                            <Text style={styles.inputLabel}>Trip Status</Text>
                            <View style={styles.statusOptions}>
                                {['Moving', 'Idle', 'Delayed'].map((status) => (
                                    <TouchableOpacity
                                        key={status}
                                        style={[styles.statusToggle, newTrip.status === status && { backgroundColor: COLORS.primary }]}
                                        onPress={() => setNewTrip({ ...newTrip, status })}
                                    >
                                        <Text style={[styles.statusToggleText, newTrip.status === status && { color: 'white' }]}>{status}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>

                            <TouchableOpacity style={styles.submitBtn} onPress={handleAddTrip}>
                                <Text style={styles.submitBtnText}>Dispatch Trip</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                </View>
            </Modal>
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
    content: {
        padding: 20, // Unified main container padding
        paddingBottom: 110,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
        marginTop: 4,
    },
    alertBadge: {
        position: 'absolute',
        top: -4,
        right: -4,
        backgroundColor: COLORS.danger,
        borderRadius: 10,
        minWidth: 16,
        height: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: COLORS.surface,
    },
    alertCount: {
        color: 'white',
        fontSize: 8,
        fontWeight: '800',
    },
    greeting: {
        fontSize: 26, // Slightly adjusted for better balance
        fontWeight: '800',
        color: COLORS.text,
        letterSpacing: -0.8,
    },
    subGreeting: {
        fontSize: 13,
        color: COLORS.textSecondary,
        marginTop: 1,
        fontWeight: '500',
    },
    headerActions: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    headerBtn: {
        width: 42,
        height: 42,
        borderRadius: 12,
        backgroundColor: COLORS.surface,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ffffff08',
    },
    badge: {
        position: 'absolute',
        top: 8,
        right: 8,
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: COLORS.danger,
        borderWidth: 1.5,
        borderColor: COLORS.surface,
        justifyContent: 'center',
        alignItems: 'center',
    },
    badgeText: {
        color: 'white',
        fontSize: 7,
        fontWeight: '900',
    },
    profileBtn: {
        width: 42,
        height: 42,
        borderRadius: 12,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: COLORS.primary + '30',
    },
    profileGradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    statsGrid: {
        marginBottom: 12,
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8, // Fixed gap between rows
        gap: 8, // Symmetrical gap between cards
    },
    mainCard: {
        backgroundColor: COLORS.surface,
        borderRadius: 20,
        padding: 20, // Standardized inner padding
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#ffffff08',
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    cardHeaderTitle: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    cardIconBox: {
        width: 34,
        height: 34,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    cardTitle: {
        fontSize: 15,
        fontWeight: '700',
        color: COLORS.text,
    },
    viewMore: {
        fontSize: 11,
        color: COLORS.primary,
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    pieContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    pieVisual: {
        width: 120,
        height: 120,
        justifyContent: 'center',
        alignItems: 'center',
    },
    donutBase: {
        width: 110,
        height: 110,
        borderRadius: 55,
        backgroundColor: COLORS.background,
        overflow: 'hidden',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 4,
        borderColor: '#ffffff03',
        transform: [{ rotate: '45deg' }],
    },
    pieSegment: {
        height: '100%',
    },
    donutCenter: {
        position: 'absolute',
        width: 74,
        height: 74,
        borderRadius: 37,
        backgroundColor: COLORS.surface,
        justifyContent: 'center',
        alignItems: 'center',
        transform: [{ rotate: '-45deg' }],
        borderWidth: 1,
        borderColor: '#ffffff08',
        elevation: 4,
    },
    donutText: {
        color: COLORS.success,
        fontSize: 9,
        fontWeight: '900',
        marginTop: 2,
    },
    pieLegend: {
        flex: 1,
        marginLeft: 20,
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    colorDot: {
        width: 7,
        height: 7,
        borderRadius: 3.5,
        marginRight: 10,
    },
    legendLabel: {
        color: COLORS.text,
        fontSize: 13,
        fontWeight: '600',
    },
    legendValue: {
        color: COLORS.textSecondary,
        fontSize: 10,
        marginTop: 1,
    },
    barChartContainer: {
        height: 140,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        paddingTop: 8,
    },
    barItem: {
        flex: 1,
        alignItems: 'center',
    },
    barColumn: {
        alignItems: 'center',
        width: '100%',
    },
    barTrack: {
        width: 12,
        height: 100,
        backgroundColor: '#ffffff05',
        borderRadius: 6,
        overflow: 'hidden',
        justifyContent: 'flex-end',
    },
    barFill: {
        width: '100%',
        borderRadius: 6,
    },
    barLabel: {
        marginTop: 10,
        color: COLORS.textSecondary,
        fontSize: 9,
        fontWeight: '700',
    },
    tripItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14, // Tighter vertical padding
        borderBottomWidth: 1,
        borderBottomColor: '#ffffff05',
    },
    tripIcon: {
        width: 40,
        height: 40,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tripInfo: {
        flex: 1,
        marginLeft: 14,
    },
    tripTarget: {
        color: COLORS.text,
        fontSize: 14,
        fontWeight: '700',
    },
    tripDetails: {
        color: COLORS.textSecondary,
        fontSize: 11,
        marginTop: 2,
    },
    tripStatus: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
        gap: 6,
    },
    statusPulse: {
        width: 5,
        height: 5,
        borderRadius: 2.5,
    },
    tripStatusText: {
        fontSize: 9,
        fontWeight: '800',
        textTransform: 'uppercase',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.85)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: COLORS.background,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 24,
        maxHeight: '85%',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ffffff10',
    },
    modalTitle: {
        color: COLORS.text,
        fontSize: 20,
        fontWeight: 'bold',
    },
    modalForm: {
        paddingBottom: 40,
    },
    inputLabel: {
        color: COLORS.textSecondary,
        fontSize: 13,
        fontWeight: '700',
        marginBottom: 10,
        marginTop: 18,
        marginLeft: 4,
    },
    inputBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.surface,
        borderRadius: 16,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: '#ffffff08',
    },
    input: {
        flex: 1,
        paddingVertical: 14,
        color: COLORS.text,
        fontSize: 15,
    },
    statusOptions: {
        flexDirection: 'row',
        gap: 10,
        marginTop: 6,
    },
    statusToggle: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 12,
        backgroundColor: COLORS.surface,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ffffff10',
    },
    statusToggleText: {
        color: COLORS.textSecondary,
        fontWeight: 'bold',
        fontSize: 11,
    },
    submitBtn: {
        backgroundColor: COLORS.primary,
        borderRadius: 16,
        padding: 18,
        alignItems: 'center',
        marginTop: 40,
        marginBottom: 20,
    },
    submitBtnText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    headerInfo: {
        flex: 1,
    },
    envOverlay: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
    },
    envItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    envText: {
        color: COLORS.textSecondary,
        fontSize: 10,
        fontWeight: '700',
        letterSpacing: 0.3,
    },
    envDivider: {
        width: 1,
        height: 10,
        backgroundColor: '#ffffff15',
        marginHorizontal: 12,
    },
    actionScroller: {
        marginBottom: 20,
        marginTop: 4,
    },
    actionContent: {
        paddingRight: 20,
    },
    actionItem: {
        alignItems: 'center',
        marginRight: 16,
        width: 80,
    },
    actionIcon: {
        width: 48,
        height: 48,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
        borderWidth: 1,
        borderColor: '#ffffff05',
    },
    actionLabel: {
        color: COLORS.textSecondary,
        fontSize: 10,
        fontWeight: '700',
        textAlign: 'center',
    },
    aiBanner: {
        borderRadius: 24,
        overflow: 'hidden',
        marginBottom: 24,
        elevation: 10,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
    },
    aiGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
    },
    aiIconBox: {
        width: 50,
        height: 50,
        borderRadius: 16,
        backgroundColor: '#ffffff20',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    aiContent: {
        flex: 1,
    },
    aiTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: '800',
        marginBottom: 4,
    },
    aiDesc: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 12,
        lineHeight: 16,
    },
});

export default Dashboard;
