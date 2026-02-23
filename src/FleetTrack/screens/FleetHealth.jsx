import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { COLORS } from '../constants/theme';
import { ArrowLeft, Tool, Calendar, Zap, CheckCircle2, Settings } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';
import useFleetStore from '../store/useFleetStore';

const HealthProgressBar = ({ label, value, color }) => (
    <View style={styles.healthItem}>
        <View style={styles.healthLabelRow}>
            <Text style={styles.healthLabel}>{label}</Text>
            <Text style={[styles.healthValue, { color }]}>{value}%</Text>
        </View>
        <View style={styles.healthBarBg}>
            <View style={[styles.healthBarFill, { width: `${value}%`, backgroundColor: color }]} />
        </View>
    </View>
);

const FleetHealth = ({ navigation }) => {
    const { vehicles, maintenanceHistory } = useFleetStore();
    const [selectedVehicle, setSelectedVehicle] = useState(vehicles[0]);

    const getHealthHP = (health) => {
        if (!health) return 0;
        const values = Object.values(health);
        return Math.round(values.reduce((a, b) => a + b, 0) / values.length);
    };

    const currentHP = getHealthHP(selectedVehicle.health);

    return (
        <SafeAreaView style={styles.safeContainer}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <ArrowLeft color={COLORS.text} size={24} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Fleet Health</Text>
                <TouchableOpacity style={styles.headerBtn}>
                    <Settings color={COLORS.text} size={22} />
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.container} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {/* Vehicle Selector */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.selectorScroll}>
                    {vehicles.map((v) => (
                        <TouchableOpacity
                            key={v.id}
                            onPress={() => setSelectedVehicle(v)}
                            style={[styles.vehicleTab, selectedVehicle.id === v.id && styles.vehicleTabActive]}
                        >
                            <Text style={[styles.vehicleTabText, selectedVehicle.id === v.id && styles.vehicleTabTextActive]}>
                                {v.plateNumber}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* Main Health Card */}
                <LinearGradient colors={[COLORS.surface, COLORS.surfaceLight]} style={styles.healthMainCard}>
                    <View style={styles.healthHeader}>
                        <View style={styles.healthTitleBox}>
                            <Text style={styles.vehicleModel}>{selectedVehicle.model}</Text>
                            <View style={styles.statusRow}>
                                <View style={[styles.statusDot, { backgroundColor: selectedVehicle.status === 'Active' ? COLORS.success : COLORS.warning }]} />
                                <Text style={styles.statusText}>{selectedVehicle.status}</Text>
                            </View>
                        </View>
                        <View style={styles.scoreCircle}>
                            <Text style={styles.scoreVal}>{currentHP}</Text>
                            <Text style={styles.scoreLab}>HP</Text>
                        </View>
                    </View>

                    <View style={styles.healthMetrics}>
                        <HealthProgressBar label="Engine Efficiency" value={selectedVehicle.health.engine} color={COLORS.primary} />
                        <HealthProgressBar label="Tire Tread Life" value={selectedVehicle.health.tires} color={COLORS.success} />
                        <HealthProgressBar label="Electronics Sync" value={selectedVehicle.health.electronics} color={COLORS.accent} />
                    </View>

                    <View style={styles.nextServiceBox}>
                        <Calendar size={16} color={COLORS.warning} />
                        <Text style={styles.nextServiceText}>Next Service: </Text>
                        <Text style={styles.nextServiceVal}>{selectedVehicle.nextService}</Text>
                    </View>
                </LinearGradient>

                {/* Maintenance Logs */}
                <View style={styles.logsSection}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Maintenance Logs</Text>
                        <TouchableOpacity>
                            <Text style={styles.viewMore}>Schedule Service</Text>
                        </TouchableOpacity>
                    </View>

                    {maintenanceHistory.filter(m => m.vehicleId === selectedVehicle.id).map((log) => (
                        <View key={log.id} style={styles.logCard}>
                            <View style={styles.logIconBox}>
                                <Tool size={18} color={COLORS.primary} />
                            </View>
                            <View style={styles.logInfo}>
                                <Text style={styles.logType}>{log.type}</Text>
                                <Text style={styles.logDate}>{log.date}</Text>
                            </View>
                            <View style={styles.logMeta}>
                                <Text style={styles.logCost}>${log.cost}</Text>
                                <View style={styles.completedBadge}>
                                    <CheckCircle2 size={10} color={COLORS.success} />
                                    <Text style={styles.completedText}>DONE</Text>
                                </View>
                            </View>
                        </View>
                    ))}
                </View>

                {/* Predictive Insights */}
                <View style={styles.insightCard}>
                    <View style={styles.insightIconRow}>
                        <Zap size={24} color={COLORS.warning} />
                        <Text style={styles.insightTitle}>Predictive Health Insight</Text>
                    </View>
                    <Text style={styles.insightDesc}>
                        Based on current mileage and sensor data, we recommend cooling system inspection within the next 500 miles to prevent overheating.
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    backBtn: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: COLORS.surface,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ffffff08',
    },
    headerTitle: {
        color: COLORS.text,
        fontSize: 18,
        fontWeight: '700',
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
    scrollContent: {
        padding: 20,
        paddingBottom: 40,
    },
    selectorScroll: {
        marginBottom: 20,
    },
    vehicleTab: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 12,
        backgroundColor: COLORS.surface,
        marginRight: 10,
        borderWidth: 1,
        borderColor: '#ffffff08',
    },
    vehicleTabActive: {
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
    },
    vehicleTabText: {
        color: COLORS.textSecondary,
        fontSize: 12,
        fontWeight: '700',
    },
    vehicleTabTextActive: {
        color: 'white',
    },
    healthMainCard: {
        borderRadius: 24,
        padding: 24,
        borderWidth: 1,
        borderColor: '#ffffff10',
        marginBottom: 24,
    },
    healthHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    vehicleModel: {
        color: COLORS.text,
        fontSize: 22,
        fontWeight: '800',
    },
    statusRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    statusDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        marginRight: 6,
    },
    statusText: {
        color: COLORS.textSecondary,
        fontSize: 12,
        fontWeight: '600',
    },
    scoreCircle: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: COLORS.primary + '20',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: COLORS.primary,
    },
    scoreVal: {
        color: COLORS.primary,
        fontSize: 18,
        fontWeight: '800',
    },
    scoreLab: {
        color: COLORS.primary,
        fontSize: 8,
        fontWeight: '700',
    },
    healthMetrics: {
        gap: 16,
        marginBottom: 24,
    },
    healthItem: {},
    healthLabelRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 6,
    },
    healthLabel: {
        color: COLORS.textSecondary,
        fontSize: 12,
        fontWeight: '600',
    },
    healthValue: {
        fontSize: 12,
        fontWeight: '700',
    },
    healthBarBg: {
        height: 6,
        backgroundColor: '#ffffff08',
        borderRadius: 3,
        overflow: 'hidden',
    },
    healthBarFill: {
        height: '100%',
        borderRadius: 3,
    },
    nextServiceBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.warning + '10',
        padding: 12,
        borderRadius: 12,
        borderWidth: 1,
        borderStyle: 'dashed',
        borderColor: COLORS.warning + '40',
    },
    nextServiceText: {
        color: COLORS.textSecondary,
        fontSize: 12,
        marginLeft: 8,
    },
    nextServiceVal: {
        color: COLORS.warning,
        fontSize: 12,
        fontWeight: '700',
    },
    logsSection: {
        marginBottom: 24,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    sectionTitle: {
        color: COLORS.text,
        fontSize: 16,
        fontWeight: '700',
    },
    viewMore: {
        color: COLORS.primary,
        fontSize: 12,
        fontWeight: '700',
    },
    logCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.surface,
        padding: 14,
        borderRadius: 16,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ffffff05',
    },
    logIconBox: {
        width: 36,
        height: 36,
        borderRadius: 10,
        backgroundColor: COLORS.primary + '15',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logInfo: {
        flex: 1,
        marginLeft: 14,
    },
    logType: {
        color: COLORS.text,
        fontSize: 14,
        fontWeight: '700',
    },
    logDate: {
        color: COLORS.textSecondary,
        fontSize: 11,
        marginTop: 2,
    },
    logMeta: {
        alignItems: 'flex-end',
    },
    logCost: {
        color: COLORS.text,
        fontSize: 14,
        fontWeight: '800',
    },
    completedBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginTop: 4,
    },
    completedText: {
        color: COLORS.success,
        fontSize: 8,
        fontWeight: '800',
    },
    insightCard: {
        backgroundColor: COLORS.surface,
        borderRadius: 20,
        padding: 20,
        borderWidth: 1,
        borderColor: COLORS.warning + '20',
    },
    insightIconRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 10,
    },
    insightTitle: {
        color: COLORS.warning,
        fontSize: 15,
        fontWeight: '700',
    },
    insightDesc: {
        color: COLORS.textSecondary,
        fontSize: 13,
        lineHeight: 18,
    },
});

export default FleetHealth;
