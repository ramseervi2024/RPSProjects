import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, SafeAreaView, TouchableOpacity, Modal, TextInput, Alert } from 'react-native';
import { COLORS, SPACING, SIZES } from '../constants/theme';
import StatCard from '../components/StatCard';
import { Truck, Users, AlertTriangle, Fuel, Activity, Bell, History, MapPin, TrendingUp, X, Navigation, User as UserIcon } from 'lucide-react-native';
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

const RecentTripItem = ({ target, driver, time, status }) => (
    <View style={styles.tripItem}>
        <LinearGradient
            colors={[COLORS.primary + '20', COLORS.primary + '05']}
            style={styles.tripIcon}
        >
            <MapPin size={18} color={COLORS.primary} />
        </LinearGradient>
        <View style={styles.tripInfo}>
            <Text style={styles.tripTarget}>{target}</Text>
            <Text style={styles.tripDetails}>{driver} • {time}</Text>
        </View>
        <View style={[styles.tripStatus, { backgroundColor: status === 'Moving' ? COLORS.success + '15' : COLORS.textSecondary + '10' }]}>
            <View style={[styles.statusPulse, { backgroundColor: status === 'Moving' ? COLORS.success : COLORS.textSecondary }]} />
            <Text style={[styles.tripStatusText, { color: status === 'Moving' ? COLORS.success : COLORS.textSecondary }]}>{status}</Text>
        </View>
    </View>
);

const Dashboard = ({ navigation }) => {
    const { vehicles, drivers, trips, addTrip } = useFleetStore();
    const [modalVisible, setModalVisible] = useState(false);
    const [newTrip, setNewTrip] = useState({
        target: '',
        driver: '',
        status: 'Moving'
    });

    const activeVehicles = vehicles.filter(v => v.status === 'Active').length;
    const maintenanceVehicles = vehicles.filter(v => v.status === 'Maintenance').length;
    const idleVehicles = vehicles.length - activeVehicles - maintenanceVehicles;
    const totalFuel = vehicles.reduce((acc, v) => acc + v.fuelLevel, 0) / vehicles.length;

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
                    <View>
                        <Text style={styles.greeting}>Fleet Overview</Text>
                        <Text style={styles.subGreeting}>Business Intelligence Portal</Text>
                    </View>
                    <View style={styles.headerActions}>
                        <TouchableOpacity style={styles.headerBtn}>
                            <Bell color={COLORS.text} size={22} />
                            <View style={styles.badge} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.profileBtn}>
                            <Activity color={COLORS.primary} size={20} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.statsGrid}>
                    <View style={styles.statsRow}>
                        <StatCard title="Total Vehicles" value={vehicles.length} icon={Truck} color={COLORS.primary} />
                        <StatCard title="Active Drivers" value={drivers.length} icon={Users} color={COLORS.secondary} />
                    </View>
                    <View style={styles.statsRow}>
                        <StatCard title="In Service" value={maintenanceVehicles} icon={AlertTriangle} color={COLORS.warning} />
                        <StatCard title="Avg Fuel" value={`${totalFuel.toFixed(0)}%`} icon={Fuel} color={COLORS.success} />
                    </View>
                </View>

                <View style={styles.mainCard}>
                    <View style={styles.cardHeader}>
                        <View style={styles.cardHeaderTitle}>
                            <TrendingUp size={18} color={COLORS.primary} style={{ marginRight: 8 }} />
                            <Text style={styles.cardTitle}>Real-time Fleet Status</Text>
                        </View>
                        <TouchableOpacity onPress={() => navigation.navigate('TripsList')}>
                            <Text style={styles.viewMore}>View All</Text>
                        </TouchableOpacity>
                    </View>
                    <CustomPieChart data={chartData} />
                </View>

                <View style={styles.mainCard}>
                    <View style={styles.cardHeader}>
                        <View style={styles.cardHeaderTitle}>
                            <Fuel size={18} color={COLORS.success} style={{ marginRight: 8 }} />
                            <Text style={styles.cardTitle}>Weekly Fuel Intake (L)</Text>
                        </View>
                    </View>
                    <CustomBarChart data={fuelData} />
                </View>

                <View style={styles.mainCard}>
                    <View style={styles.cardHeader}>
                        <View style={styles.cardHeaderTitle}>
                            <History size={18} color={COLORS.accent} style={{ marginRight: 8 }} />
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
                            target={trip.target}
                            driver={trip.driver}
                            time={trip.time}
                            status={trip.status}
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
        padding: 16,
        paddingBottom: 110,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
        marginTop: 8,
    },
    greeting: {
        fontSize: 28,
        fontWeight: '800',
        color: COLORS.text,
        letterSpacing: -1,
    },
    subGreeting: {
        fontSize: 14,
        color: COLORS.textSecondary,
        marginTop: 2,
        fontWeight: '500',
    },
    headerActions: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    headerBtn: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: COLORS.surface,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ffffff08',
    },
    badge: {
        position: 'absolute',
        top: 12,
        right: 12,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: COLORS.danger,
        borderWidth: 1.5,
        borderColor: COLORS.surface,
    },
    profileBtn: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: COLORS.surface,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.primary + '30',
    },
    statsGrid: {
        marginBottom: 16,
    },
    statsRow: {
        flexDirection: 'row',
        marginBottom: 4,
    },
    mainCard: {
        backgroundColor: COLORS.surface,
        borderRadius: 20,
        padding: 20,
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
    cardTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: COLORS.text,
    },
    viewMore: {
        fontSize: 12,
        color: COLORS.primary,
        fontWeight: '600',
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
        borderColor: '#ffffff05',
        transform: [{ rotate: '45deg' }],
    },
    pieSegment: {
        height: '100%',
    },
    donutCenter: {
        position: 'absolute',
        width: 70,
        height: 70,
        borderRadius: 35,
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
        fontSize: 10,
        fontWeight: '900',
        marginTop: 2,
    },
    pieLegend: {
        flex: 1,
        marginLeft: 24,
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    colorDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginRight: 12,
    },
    legendLabel: {
        color: COLORS.text,
        fontSize: 14,
        fontWeight: '600',
    },
    legendValue: {
        color: COLORS.textSecondary,
        fontSize: 11,
        marginTop: 1,
    },
    barChartContainer: {
        height: 140,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        paddingTop: 10,
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
        width: 16,
        height: 100,
        backgroundColor: COLORS.surfaceLight + '40',
        borderRadius: 8,
        overflow: 'hidden',
        justifyContent: 'flex-end',
    },
    barFill: {
        width: '100%',
        borderRadius: 8,
    },
    barLabel: {
        marginTop: 10,
        color: COLORS.textSecondary,
        fontSize: 10,
        fontWeight: '700',
    },
    tripItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
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
        fontSize: 12,
        marginTop: 3,
    },
    tripStatus: {
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
    tripStatusText: {
        fontSize: 10,
        fontWeight: '800',
        textTransform: 'uppercase',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: COLORS.background,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: SPACING.md,
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
        fontSize: 22,
        fontWeight: 'bold',
    },
    modalForm: {
        paddingBottom: 30,
    },
    inputLabel: {
        color: COLORS.textSecondary,
        fontSize: 14,
        fontWeight: '700',
        marginBottom: 10,
        marginTop: 20,
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
        fontSize: 16,
    },
    statusOptions: {
        flexDirection: 'row',
        gap: 10,
        marginTop: 8,
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
        fontSize: 12,
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
});

export default Dashboard;
