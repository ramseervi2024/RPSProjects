import React, { useRef } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    StatusBar,
    Animated,
    Dimensions
} from 'react-native';
import {
    ArrowLeft, CheckCircle, IndianRupee,
    Target, TrendingUp, Briefcase, Wrench, ThumbsUp, ThumbsDown, Heart
} from 'lucide-react-native';
import * as Icons from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';
import useWishlistStore from '../store/useWishlistStore';

const { width } = Dimensions.get('window');

const BusinessDetails = ({ route, navigation }) => {
    const { business } = route.params;
    const IconComponent = Icons[business.iconName] || Briefcase;

    // Wishlist Logic
    const { isInWishlist, toggleWishlist } = useWishlistStore();
    const isSaved = isInWishlist(business.id);

    const handleBack = () => {
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

            {/* Header / Hero Section */}
            <View style={styles.header}>
                <LinearGradient
                    colors={['#1E293B', '#0F172A']}
                    style={StyleSheet.absoluteFill}
                />

                {/* Background Pattern */}
                <View style={styles.headerPattern}>
                    <IconComponent size={200} color="rgba(255,255,255,0.03)" />
                </View>

                <SafeAreaView>
                    <View style={styles.heroContent}>
                        <View style={styles.heroIconContainer}>
                            <LinearGradient
                                colors={['#3B82F6', '#2563EB']}
                                style={styles.heroIconGradient}
                            >
                                <IconComponent size={40} color="white" />
                            </LinearGradient>
                        </View>
                        <View style={{ flex: 1 }}>
                            <View style={styles.categoryTag}>
                                <Text style={styles.categoryTagText}>{business.category}</Text>
                            </View>
                            <Text style={styles.heroTitle} numberOfLines={2}>
                                {business.name}
                            </Text>
                        </View>
                    </View>
                </SafeAreaView>
            </View>

            <View style={styles.contentContainer}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                >
                    {/* Key Stats Cards */}
                    <View style={styles.statsRow}>
                        <View style={styles.statCard}>
                            <View style={[styles.statIcon, { backgroundColor: '#FFF7ED' }]}>
                                <IndianRupee size={20} color="#F97316" />
                            </View>
                            <Text style={styles.statLabel}>Investment</Text>
                            <Text style={styles.statValue}>{business.minInvestment}</Text>
                        </View>
                        <View style={styles.statCard}>
                            <View style={[styles.statIcon, { backgroundColor: '#F0FDF4' }]}>
                                <TrendingUp size={20} color="#16A34A" />
                            </View>
                            <Text style={styles.statLabel}>Monthly Income</Text>
                            <Text style={styles.statValue}>{business.monthlyIncome}</Text>
                        </View>
                    </View>

                    {/* Overview */}
                    <View style={styles.section}>
                        <Text style={styles.overviewText}>
                            {business.detailedOverview}
                        </Text>
                    </View>

                    {/* Workflow */}
                    <View style={styles.card}>
                        <View style={styles.cardHeader}>
                            <View style={[styles.cardIconBox, { backgroundColor: '#EFF6FF' }]}>
                                <Target size={20} color="#2563EB" />
                            </View>
                            <Text style={styles.cardTitle}>How it works</Text>
                        </View>

                        <View style={styles.timeline}>
                            {business.workflowSteps.map((step, index) => (
                                <View key={index} style={styles.timelineItem}>
                                    <View style={styles.timelineLeft}>
                                        <View style={styles.timelineCircle}>
                                            <Text style={styles.timelineNumber}>{index + 1}</Text>
                                        </View>
                                        {index !== business.workflowSteps.length - 1 && (
                                            <View style={styles.timelineLine} />
                                        )}
                                    </View>
                                    <View style={styles.timelineContent}>
                                        <Text style={styles.timelineText}>{step}</Text>
                                    </View>
                                </View>
                            ))}
                        </View>
                    </View>

                    {/* Setup Guide */}
                    <View style={styles.card}>
                        <View style={styles.cardHeader}>
                            <View style={[styles.cardIconBox, { backgroundColor: '#FEF2F2' }]}>
                                <Wrench size={20} color="#EF4444" />
                            </View>
                            <Text style={styles.cardTitle}>Setup Process</Text>
                        </View>
                        <View style={styles.checklist}>
                            {business.setupProcess.map((step, index) => (
                                <View key={index} style={styles.checklistItem}>
                                    <CheckCircle size={20} color="#22C55E" style={styles.checkIcon} />
                                    <Text style={styles.checklistText}>{step}</Text>
                                </View>
                            ))}
                        </View>
                    </View>

                    {/* Investment Breakdown */}
                    <View style={styles.card}>
                        <View style={styles.cardHeader}>
                            <View style={[styles.cardIconBox, { backgroundColor: '#FFF7ED' }]}>
                                <IndianRupee size={20} color="#F97316" />
                            </View>
                            <Text style={styles.cardTitle}>Cost Breakdown</Text>
                        </View>

                        <View style={styles.table}>
                            {business.investmentBreakdown.map((item, index) => (
                                <View key={index} style={[
                                    styles.tableRow,
                                    index !== business.investmentBreakdown.length - 1 && styles.tableRowBorder
                                ]}>
                                    <Text style={styles.tableLabel}>{item.item}</Text>
                                    <Text style={styles.tableValue}>{item.cost}</Text>
                                </View>
                            ))}
                            <View style={styles.tableTotal}>
                                <Text style={styles.tableTotalLabel}>Total Estimated Cost</Text>
                                <Text style={styles.tableTotalValue}>{business.minInvestment}</Text>
                            </View>
                        </View>
                    </View>

                    {/* Pros & Cons */}
                    <View style={styles.row}>
                        <View style={[styles.columnCard, { marginRight: 8 }]}>
                            <View style={styles.columnHeader}>
                                <ThumbsUp size={16} color="#16A34A" />
                                <Text style={[styles.columnTitle, { color: '#16A34A' }]}>Pros</Text>
                            </View>
                            {business.pros.map((pro, index) => (
                                <View key={index} style={styles.bulletItem}>
                                    <View style={[styles.bullet, { backgroundColor: '#16A34A' }]} />
                                    <Text style={styles.bulletText}>{pro}</Text>
                                </View>
                            ))}
                        </View>
                        <View style={[styles.columnCard, { marginLeft: 8 }]}>
                            <View style={styles.columnHeader}>
                                <ThumbsDown size={16} color="#DC2626" />
                                <Text style={[styles.columnTitle, { color: '#DC2626' }]}>Cons</Text>
                            </View>
                            {business.cons.map((con, index) => (
                                <View key={index} style={styles.bulletItem}>
                                    <View style={[styles.bullet, { backgroundColor: '#DC2626' }]} />
                                    <Text style={styles.bulletText}>{con}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                </ScrollView>
            </View>

            {/* Bottom Action Bar */}
            <View style={styles.bottomBarContainer}>
                <View style={styles.bottomBarBlur} />
                <TouchableOpacity
                    style={styles.actionButtonSecondary}
                    onPress={handleBack}
                >
                    <ArrowLeft size={20} color="#1E293B" />
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.actionButtonPrimary,
                        isSaved && styles.wishlistActive
                    ]}
                    onPress={() => toggleWishlist(business)}
                >
                    <Heart
                        size={20}
                        color={isSaved ? "white" : "white"}
                        fill={isSaved ? "white" : "transparent"}
                        style={styles.btnIcon}
                    />
                    <Text style={styles.btnText}>
                        {isSaved ? 'Saved to Wishlist' : 'Add to Wishlist'}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    header: {
        height: 280,
        backgroundColor: '#1E293B',
        position: 'relative',
    },
    headerPattern: {
        position: 'absolute',
        bottom: -40,
        right: -40,
        opacity: 0.5,
        transform: [{ rotate: '-15deg' }],
    },
    heroContent: {
        paddingHorizontal: 24,
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 60, // Adjusted for safe area/status bar
    },
    heroIconContainer: {
        marginRight: 16,
        shadowColor: "black",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 10,
    },
    heroIconGradient: {
        width: 72,
        height: 72,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
    },
    heroTitle: {
        fontSize: 24,
        fontWeight: '800',
        color: 'white',
        letterSpacing: -0.5,
        lineHeight: 30,
    },
    categoryTag: {
        backgroundColor: 'rgba(255,255,255,0.1)',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 100,
        alignSelf: 'flex-start',
        marginBottom: 8,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    categoryTagText: {
        color: '#94A3B8',
        fontSize: 12,
        fontWeight: '600',
        letterSpacing: 0.5,
    },
    contentContainer: {
        flex: 1,
        marginTop: -40,
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        backgroundColor: '#F8FAFC',
        overflow: 'hidden',
    },
    scrollContent: {
        padding: 20,
        paddingTop: 30,
        paddingBottom: 120, // Added padding for bottom bar
    },
    statsRow: {
        flexDirection: 'row',
        gap: 16,
        marginBottom: 24,
        marginTop: -60,
    },
    statCard: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 6,
        alignItems: 'center',
    },
    statIcon: {
        width: 40,
        height: 40,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    statLabel: {
        fontSize: 12,
        color: '#64748B',
        fontWeight: '600',
        marginBottom: 4,
    },
    statValue: {
        fontSize: 15,
        fontWeight: '700',
        color: '#0F172A',
        textAlign: 'center',
    },
    section: {
        marginBottom: 24,
    },
    overviewText: {
        fontSize: 16,
        color: '#334155',
        lineHeight: 26,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 24,
        padding: 24,
        marginBottom: 20,
        shadowColor: "#64748B",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 6,
        elevation: 3,
        borderWidth: 1,
        borderColor: '#F1F5F9',
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    cardIconBox: {
        width: 36,
        height: 36,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#0F172A',
    },
    timeline: {
        paddingLeft: 8,
    },
    timelineItem: {
        flexDirection: 'row',
        marginBottom: 2,
    },
    timelineLeft: {
        alignItems: 'center',
        width: 30,
        marginRight: 12,
    },
    timelineCircle: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#2563EB',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,
    },
    timelineNumber: {
        color: 'white',
        fontSize: 12,
        fontWeight: '700',
    },
    timelineLine: {
        width: 2,
        flex: 1,
        backgroundColor: '#E2E8F0',
        marginVertical: 4,
    },
    timelineContent: {
        flex: 1,
        paddingBottom: 20,
    },
    timelineText: {
        fontSize: 15,
        color: '#475569',
        lineHeight: 22,
        marginTop: 2,
    },
    checklist: {
        gap: 16,
    },
    checklistItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    checkIcon: {
        marginRight: 12,
        marginTop: 2,
    },
    checklistText: {
        fontSize: 15,
        color: '#475569',
        lineHeight: 22,
        flex: 1,
    },
    table: {
        backgroundColor: '#F8FAFC',
        borderRadius: 16,
        padding: 16,
    },
    tableRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
    },
    tableRowBorder: {
        borderBottomWidth: 1,
        borderBottomColor: '#E2E8F0',
    },
    tableLabel: {
        fontSize: 14,
        color: '#64748B',
        flex: 1,
    },
    tableValue: {
        fontSize: 14,
        color: '#0F172A',
        fontWeight: '600',
        marginLeft: 16,
    },
    tableTotal: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 12,
        paddingTop: 12,
        borderTopWidth: 2,
        borderTopColor: '#E2E8F0',
    },
    tableTotalLabel: {
        fontSize: 15,
        fontWeight: '700',
        color: '#0F172A',
    },
    tableTotalValue: {
        fontSize: 15,
        fontWeight: '800',
        color: '#2563EB',
    },
    row: {
        flexDirection: 'row',
    },
    columnCard: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 16,
        borderWidth: 1,
        borderColor: '#F1F5F9',
    },
    columnHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    columnTitle: {
        fontSize: 14,
        fontWeight: '700',
        marginLeft: 8,
    },
    bulletItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 10,
    },
    bullet: {
        width: 6,
        height: 6,
        borderRadius: 3,
        marginTop: 6,
        marginRight: 8,
    },
    bulletText: {
        fontSize: 13,
        color: '#475569',
        lineHeight: 18,
        flex: 1,
    },
    bottomBarContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        padding: 20,
        paddingBottom: 30,
        gap: 16,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: '#F1F5F9',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 20,
    },
    actionButtonSecondary: {
        width: 56,
        height: 56,
        borderRadius: 16,
        backgroundColor: '#F1F5F9',
        alignItems: 'center',
        justifyContent: 'center',
    },
    actionButtonPrimary: {
        flex: 1,
        height: 56,
        borderRadius: 16,
        backgroundColor: '#2563EB',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        shadowColor: "#2563EB",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    wishlistActive: {
        backgroundColor: '#EC4899',
        shadowColor: "#EC4899",
    },
    btnText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '700',
    },
    btnIcon: {
        marginRight: 8,
    }
});

export default BusinessDetails;
