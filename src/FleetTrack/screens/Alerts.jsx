import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, FlatList, Animated } from 'react-native';
import { COLORS, SPACING, SIZES } from '../constants/theme';
import { ArrowLeft, Bell, AlertTriangle, ShieldAlert, X, ShieldCheck, MapPin, User, Info } from 'lucide-react-native';
import useFleetStore from '../store/useFleetStore';
import LinearGradient from 'react-native-linear-gradient';

const AlertItem = ({ alert, onClear }) => {
    const isCritical = alert.severity === 'Critical';

    return (
        <View style={[styles.alertCard, isCritical && styles.alertCardCritical]}>
            <View style={[styles.alertIconBox, { backgroundColor: isCritical ? COLORS.danger + '20' : COLORS.warning + '20' }]}>
                {isCritical ? <ShieldAlert size={22} color={COLORS.danger} /> : <AlertTriangle size={22} color={COLORS.warning} />}
            </View>

            <View style={styles.alertContent}>
                <View style={styles.alertHeader}>
                    <Text style={[styles.alertType, { color: isCritical ? COLORS.danger : COLORS.warning }]}>
                        {alert.type}
                    </Text>
                    <Text style={styles.alertTime}>{alert.time}</Text>
                </View>

                <Text style={styles.alertDesc}>
                    Vehicle <Text style={styles.bold}>{alert.vehicle}</Text> driven by <Text style={styles.bold}>{alert.driver}</Text> reported an incidence.
                </Text>

                <View style={styles.alertActions}>
                    <TouchableOpacity style={styles.actionBtn}>
                        <MapPin size={14} color={COLORS.primary} />
                        <Text style={styles.actionBtnText}>Locate</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionBtn} onPress={() => onClear(alert.id)}>
                        <ShieldCheck size={14} color={COLORS.success} />
                        <Text style={styles.actionBtnText}>Resolve</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const Alerts = ({ navigation }) => {
    const { activeAlerts, clearAlert } = useFleetStore();

    return (
        <SafeAreaView style={styles.safeContainer}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <ArrowLeft color={COLORS.text} size={24} />
                </TouchableOpacity>
                <View style={styles.headerTitleBox}>
                    <Text style={styles.headerTitle}>Incident Center</Text>
                    <View style={styles.activePill}>
                        <View style={styles.pulseDot} />
                        <Text style={styles.activeText}>{activeAlerts.length} Active</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.headerBtn}>
                    <Bell color={COLORS.text} size={22} />
                </TouchableOpacity>
            </View>

            <FlatList
                data={activeAlerts}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <ShieldCheck size={64} color={COLORS.success + '40'} />
                        <Text style={styles.emptyTitle}>All Clear</Text>
                        <Text style={styles.emptySub}>No active incidents reported across the fleet.</Text>
                    </View>
                }
                renderItem={({ item }) => (
                    <AlertItem alert={item} onClear={clearAlert} />
                )}
            />

            <View style={styles.footer}>
                <View style={styles.securitySeal}>
                    <ShieldCheck size={16} color={COLORS.success} />
                    <Text style={styles.sealText}>Real-time Security Monitoring Active</Text>
                </View>
            </View>
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
    headerTitleBox: {
        alignItems: 'center',
    },
    headerTitle: {
        color: COLORS.text,
        fontSize: 18,
        fontWeight: '700',
    },
    activePill: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.danger + '15',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 20,
        marginTop: 4,
        gap: 6,
    },
    pulseDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: COLORS.danger,
    },
    activeText: {
        color: COLORS.danger,
        fontSize: 10,
        fontWeight: '800',
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
    listContent: {
        padding: 20,
        paddingBottom: 100,
    },
    alertCard: {
        flexDirection: 'row',
        backgroundColor: COLORS.surface,
        borderRadius: 20,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#ffffff08',
    },
    alertCardCritical: {
        borderColor: COLORS.danger + '30',
        backgroundColor: COLORS.danger + '05',
    },
    alertIconBox: {
        width: 48,
        height: 48,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
    },
    alertContent: {
        flex: 1,
        marginLeft: 16,
    },
    alertHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 6,
    },
    alertType: {
        fontSize: 14,
        fontWeight: '800',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    alertTime: {
        color: COLORS.textSecondary,
        fontSize: 11,
    },
    alertDesc: {
        color: COLORS.textSecondary,
        fontSize: 13,
        lineHeight: 18,
    },
    bold: {
        color: COLORS.text,
        fontWeight: '700',
    },
    alertActions: {
        flexDirection: 'row',
        marginTop: 16,
        gap: 12,
    },
    actionBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff05',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 10,
        gap: 6,
        borderWidth: 1,
        borderColor: '#ffffff08',
    },
    actionBtnText: {
        color: COLORS.text,
        fontSize: 11,
        fontWeight: '700',
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 100,
    },
    emptyTitle: {
        color: COLORS.text,
        fontSize: 22,
        fontWeight: '800',
        marginTop: 20,
    },
    emptySub: {
        color: COLORS.textSecondary,
        fontSize: 14,
        textAlign: 'center',
        marginTop: 8,
        paddingHorizontal: 40,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 20,
        alignItems: 'center',
    },
    securitySeal: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.surface,
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 30,
        gap: 8,
        borderWidth: 1,
        borderColor: COLORS.success + '20',
    },
    sealText: {
        color: COLORS.textSecondary,
        fontSize: 11,
        fontWeight: '600',
    },
});

export default Alerts;
