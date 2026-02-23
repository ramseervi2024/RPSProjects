import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Dimensions, Animated, ActivityIndicator, Share } from 'react-native';
import { COLORS, SPACING, SIZES } from '../constants/theme';
import { ArrowLeft, Download, Share2, TrendingUp, Users, DollarSign, FileText, CheckCircle2, Star, Shield, Zap } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';
import useFleetStore from '../store/useFleetStore';

const { width } = Dimensions.get('window');

const CustomLineChart = ({ data }) => {
    const maxVal = Math.max(...data);
    return (
        <View style={styles.lineChartContainer}>
            {data.map((val, i) => {
                const height = (val / maxVal) * 80;
                return (
                    <View key={i} style={styles.lineBarContainer}>
                        <LinearGradient
                            colors={[COLORS.primary, COLORS.primary + '40']}
                            style={[styles.lineBar, { height: `${height}%` }]}
                        />
                        <View style={styles.dot} />
                    </View>
                );
            })}
        </View>
    );
};

const ExportModal = ({ visible, onClose, type }) => {
    const [step, setStep] = useState(0);
    const steps = ['Syncing Fleet Data', 'Formatting Analytics', 'Generating PDF Structure', 'Finalizing Report'];
    const progress = new Animated.Value(0);

    useEffect(() => {
        if (visible) {
            setStep(0);
            let currentStep = 0;
            const interval = setInterval(() => {
                if (currentStep < steps.length - 1) {
                    currentStep++;
                    setStep(currentStep);
                } else {
                    clearInterval(interval);
                    setTimeout(() => {
                        handleShare();
                    }, 800);
                }
            }, 1200);
            return () => clearInterval(interval);
        }
    }, [visible]);

    const handleShare = async () => {
        try {
            await Share.share({
                message: `FleetTrack Report: ${type} generated on ${new Date().toLocaleDateString()}`,
                title: 'FleetTrack Report',
            });
            onClose();
        } catch (error) {
            console.log(error.message);
        }
    };

    if (!visible) return null;

    return (
        <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
                <Zap size={48} color={COLORS.primary} style={styles.modalIcon} />
                <Text style={styles.modalTitle}>Exporting {type}</Text>
                <Text style={styles.modalSubTitle}>Please wait while we prepare your high-fidelity document.</Text>

                <View style={styles.stepContainer}>
                    {steps.map((s, i) => (
                        <View key={i} style={styles.stepRow}>
                            <View style={[styles.stepDot, step >= i && { backgroundColor: COLORS.primary }]}>
                                {step > i && <CheckCircle2 size={12} color="white" />}
                            </View>
                            <Text style={[styles.stepText, step === i && styles.stepTextActive]}>{s}</Text>
                            {step === i && <ActivityIndicator size="small" color={COLORS.primary} style={{ marginLeft: 10 }} />}
                        </View>
                    ))}
                </View>

                <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
                    <Text style={styles.cancelBtnText}>Cancel</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const Reports = ({ navigation }) => {
    const { vehicles, drivers, trips } = useFleetStore();
    const [exportVisible, setExportVisible] = useState(false);
    const [reportType, setReportType] = useState('Fleet Summary');

    const totalCost = vehicles.reduce((acc, v) => acc + v.avgCost, 0);
    const topDrivers = [...drivers].sort((a, b) => b.rating - a.rating).slice(0, 3);

    return (
        <SafeAreaView style={styles.safeContainer}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <ArrowLeft color={COLORS.text} size={24} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Analytics & Reports</Text>
                <TouchableOpacity style={styles.downloadBtn} onPress={() => setExportVisible(true)}>
                    <Download color={COLORS.primary} size={22} />
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.container} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                <View style={styles.typeSelector}>
                    {['Fleet Summary', 'Performance', 'Expenses'].map((t) => (
                        <TouchableOpacity
                            key={t}
                            style={[styles.typeTab, reportType === t && styles.typeTabActive]}
                            onPress={() => setReportType(t)}
                        >
                            <Text style={[styles.typeText, reportType === t && styles.typeTextActive]}>{t}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <View style={styles.mainInsight}>
                    <LinearGradient colors={[COLORS.primary + '20', 'transparent']} style={styles.insightGradient}>
                        <View style={styles.insightHeader}>
                            <View>
                                <Text style={styles.insightLabel}>Total Fleet Expenditure</Text>
                                <Text style={styles.insightValue}>${totalCost.toLocaleString()}</Text>
                            </View>
                            <View style={styles.trendBadge}>
                                <TrendingUp size={14} color={COLORS.success} />
                                <Text style={styles.trendText}>+12.4%</Text>
                            </View>
                        </View>
                        <CustomLineChart data={[40, 65, 55, 80, 75, 95, 85]} />
                    </LinearGradient>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Performance Leaders</Text>
                    {topDrivers.map((driver, index) => (
                        <View key={driver.id} style={styles.leaderCard}>
                            <View style={styles.leaderRank}>
                                <Text style={styles.rankText}>#{index + 1}</Text>
                            </View>
                            <View style={styles.leaderInfo}>
                                <Text style={styles.leaderName}>{driver.name}</Text>
                                <Text style={styles.leaderMeta}>{driver.trips} Trips • {driver.experience}</Text>
                            </View>
                            <View style={styles.ratingBox}>
                                <Star size={14} color={COLORS.warning} fill={COLORS.warning} />
                                <Text style={styles.ratingText}>{driver.rating}</Text>
                            </View>
                        </View>
                    ))}
                </View>

                <View style={styles.statsGrid}>
                    <View style={styles.statBox}>
                        <Shield size={20} color={COLORS.success} />
                        <Text style={styles.statBoxVal}>98.2%</Text>
                        <Text style={styles.statBoxLab}>Safety Score</Text>
                    </View>
                    <View style={styles.statBox}>
                        <DollarSign size={20} color={COLORS.accent} />
                        <Text style={styles.statBoxVal}>$3.2k</Text>
                        <Text style={styles.statBoxLab}>Avg / Trip</Text>
                    </View>
                </View>

                <TouchableOpacity style={styles.exportFullBtn} onPress={() => setExportVisible(true)}>
                    <FileText color="white" size={20} />
                    <Text style={styles.exportFullText}>Generate Full Business Report</Text>
                </TouchableOpacity>
            </ScrollView>

            <ExportModal visible={exportVisible} onClose={() => setExportVisible(false)} type={reportType} />
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
    downloadBtn: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: COLORS.primary + '15',
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 40,
    },
    typeSelector: {
        flexDirection: 'row',
        backgroundColor: COLORS.surface,
        borderRadius: 14,
        padding: 4,
        marginBottom: 24,
    },
    typeTab: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 10,
    },
    typeTabActive: {
        backgroundColor: COLORS.primary,
    },
    typeText: {
        color: COLORS.textSecondary,
        fontSize: 12,
        fontWeight: '600',
    },
    typeTextActive: {
        color: 'white',
    },
    mainInsight: {
        backgroundColor: COLORS.surface,
        borderRadius: 24,
        marginBottom: 24,
        borderWidth: 1,
        borderColor: '#ffffff08',
        overflow: 'hidden',
    },
    insightGradient: {
        padding: 20,
    },
    insightHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 20,
    },
    insightLabel: {
        color: COLORS.textSecondary,
        fontSize: 12,
        fontWeight: '600',
    },
    insightValue: {
        color: COLORS.text,
        fontSize: 28,
        fontWeight: '800',
        marginTop: 4,
    },
    trendBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.success + '15',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
        gap: 4,
    },
    trendText: {
        color: COLORS.success,
        fontSize: 11,
        fontWeight: '700',
    },
    lineChartContainer: {
        height: 100,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    lineBarContainer: {
        width: 8,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    lineBar: {
        width: '100%',
        borderRadius: 4,
    },
    dot: {
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: COLORS.primary,
        marginTop: 4,
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        color: COLORS.text,
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 16,
    },
    leaderCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.surface,
        borderRadius: 16,
        padding: 14,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ffffff05',
    },
    leaderRank: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: COLORS.primary + '15',
        justifyContent: 'center',
        alignItems: 'center',
    },
    rankText: {
        color: COLORS.primary,
        fontSize: 12,
        fontWeight: '800',
    },
    leaderInfo: {
        flex: 1,
        marginLeft: 14,
    },
    leaderName: {
        color: COLORS.text,
        fontSize: 15,
        fontWeight: '700',
    },
    leaderMeta: {
        color: COLORS.textSecondary,
        fontSize: 11,
        marginTop: 2,
    },
    ratingBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff05',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
        gap: 4,
    },
    ratingText: {
        color: COLORS.warning,
        fontSize: 12,
        fontWeight: '800',
    },
    statsGrid: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 32,
    },
    statBox: {
        flex: 1,
        backgroundColor: COLORS.surface,
        borderRadius: 20,
        padding: 16,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ffffff08',
    },
    statBoxVal: {
        color: COLORS.text,
        fontSize: 18,
        fontWeight: '800',
        marginTop: 8,
    },
    statBoxLab: {
        color: COLORS.textSecondary,
        fontSize: 11,
        marginTop: 2,
    },
    exportFullBtn: {
        backgroundColor: COLORS.primary,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 18,
        borderRadius: 16,
        gap: 10,
    },
    exportFullText: {
        color: 'white',
        fontSize: 15,
        fontWeight: '700',
    },
    modalOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(15, 23, 42, 0.95)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
    modalContent: {
        width: width - 60,
        backgroundColor: COLORS.surface,
        borderRadius: 32,
        padding: 30,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ffffff10',
    },
    modalIcon: {
        marginBottom: 20,
    },
    modalTitle: {
        color: COLORS.text,
        fontSize: 20,
        fontWeight: '800',
        marginBottom: 8,
    },
    modalSubTitle: {
        color: COLORS.textSecondary,
        fontSize: 13,
        textAlign: 'center',
        marginBottom: 30,
        lineHeight: 18,
    },
    stepContainer: {
        width: '100%',
        marginBottom: 30,
    },
    stepRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    stepDot: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#ffffff10',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    stepText: {
        color: COLORS.textSecondary,
        fontSize: 14,
        fontWeight: '600',
    },
    stepTextActive: {
        color: COLORS.primary,
    },
    cancelBtn: {
        padding: 10,
    },
    cancelBtnText: {
        color: COLORS.danger,
        fontSize: 14,
        fontWeight: '600',
    },
});

export default Reports;
