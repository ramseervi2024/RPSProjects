import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    StatusBar,
    SafeAreaView,
    Platform,
    LayoutAnimation,
    UIManager
} from 'react-native';
import {
    CheckCircle, IndianRupee,
    Target, TrendingUp, Briefcase, Wrench, ThumbsUp, ThumbsDown, Heart, ArrowLeft, ArrowRight, ChevronRight, ChevronLeft
} from 'lucide-react-native';
import * as Icons from 'lucide-react-native';
import useWishlistStore from '../store/useWishlistStore';
import { businessIdeas } from './data';

if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
}

const BusinessDetails = ({ route, navigation }) => {
    const { business } = route.params;
    const IconComponent = Icons[business.iconName] || Briefcase;
    const [activeTab, setActiveTab] = useState('Stats');

    // Wishlist Logic
    const { isInWishlist, toggleWishlist } = useWishlistStore();
    const isSaved = isInWishlist(business.id);

    // Navigation Logic
    const currentIndex = businessIdeas.findIndex(b => b.id === business.id);
    const nextBusiness = currentIndex !== -1 && currentIndex < businessIdeas.length - 1
        ? businessIdeas[currentIndex + 1]
        : null;

    const handleBack = () => {
        navigation.goBack();
    };

    const handleNext = () => {
        if (nextBusiness) {
            // Reset tab on navigation
            setActiveTab('Stats');
            navigation.push('BusinessDetails', { business: nextBusiness });
        }
    };

    const tabs = [
        { id: 'Stats', label: 'Overview' },
        { id: 'Workflow', label: 'Workflow' },
        { id: 'Costs', label: 'Costs' },
        { id: 'ProsCons', label: 'Pros & Cons' },
    ];

    const handleTabChange = (id) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setActiveTab(id);
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'Stats':
                return (
                    <View style={styles.tabContent}>
                        <View style={styles.statsRow}>
                            <View style={styles.statCard}>
                                <View style={[styles.statIconBadge, { backgroundColor: '#FFF7ED' }]}>
                                    <IndianRupee size={24} color="#F97316" />
                                </View>
                                <Text style={styles.statLabel}>Investment</Text>
                                <Text style={styles.statValue}>{business.minInvestment}</Text>
                            </View>
                            <View style={styles.statCard}>
                                <View style={[styles.statIconBadge, { backgroundColor: '#F0FDF4' }]}>
                                    <TrendingUp size={24} color="#16A34A" />
                                </View>
                                <Text style={styles.statLabel}>Monthly Income</Text>
                                <Text style={styles.statValue}>{business.monthlyIncome}</Text>
                            </View>
                        </View>
                    </View>
                );
            case 'Workflow':
                return (
                    <View style={styles.card}>
                        <View style={styles.cardHeader}>
                            <Target size={20} color="#2563EB" />
                            <Text style={styles.cardTitle}>Step-by-Step Workflow</Text>
                        </View>
                        <View style={styles.listContainer}>
                            {business.workflowSteps.map((step, index) => (
                                <View key={index} style={styles.listItem}>
                                    <View style={styles.stepCircle}>
                                        <Text style={styles.stepNumber}>{index + 1}</Text>
                                    </View>
                                    <View style={styles.listTextContainer}>
                                        <Text style={styles.listText}>{step}</Text>
                                    </View>
                                </View>
                            ))}
                        </View>
                    </View>
                );
            case 'Costs':
                return (
                    <View style={styles.card}>
                        <View style={styles.cardHeader}>
                            <IndianRupee size={20} color="#F59E0B" />
                            <Text style={styles.cardTitle}>Investment Breakdown</Text>
                        </View>
                        {business.investmentBreakdown.map((item, index) => (
                            <View key={index} style={styles.tableRow}>
                                <Text style={styles.tableLabel}>{item.item}</Text>
                                <Text style={styles.tableValue}>{item.cost}</Text>
                            </View>
                        ))}
                        <View style={styles.totalRow}>
                            <Text style={styles.totalLabel}>Total Estimated</Text>
                            <Text style={styles.totalValue}>{business.minInvestment}</Text>
                        </View>
                    </View>
                );
            case 'ProsCons':
                return (
                    <View style={styles.gridColumn}>
                        <View style={[styles.gridCard, { backgroundColor: '#F0FDF4', borderColor: '#BBF7D0' }]}>
                            <View style={styles.gridHeader}>
                                <ThumbsUp size={16} color="#16A34A" />
                                <Text style={[styles.gridTitle, { color: '#16A34A' }]}>Pros</Text>
                            </View>
                            {business.pros.map((pro, i) => (
                                <View key={i} style={styles.bulletRow}>
                                    <View style={[styles.bulletDot, { backgroundColor: '#16A34A' }]} />
                                    <Text style={styles.gridText}>{pro}</Text>
                                </View>
                            ))}
                        </View>
                        <View style={[styles.gridCard, { backgroundColor: '#FEF2F2', borderColor: '#FECACA' }]}>
                            <View style={styles.gridHeader}>
                                <ThumbsDown size={16} color="#DC2626" />
                                <Text style={[styles.gridTitle, { color: '#DC2626' }]}>Cons</Text>
                            </View>
                            {business.cons.map((con, i) => (
                                <View key={i} style={styles.bulletRow}>
                                    <View style={[styles.bulletDot, { backgroundColor: '#DC2626' }]} />
                                    <Text style={styles.gridText}>{con}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                );
            default:
                return null;
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

            {/* Header: Back - Title - Wishlist */}
            <View style={styles.header}>
                <SafeAreaView>
                    <View style={styles.headerContent}>
                        <TouchableOpacity
                            onPress={handleBack}
                            style={styles.iconButton}
                            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                        >
                            <ArrowLeft size={24} color="#1E293B" />
                        </TouchableOpacity>

                        <View style={styles.headerTitleWrapper}>
                            <Text style={styles.headerTitle} numberOfLines={1}>{business.name}</Text>
                        </View>

                        <TouchableOpacity
                            onPress={() => toggleWishlist(business)}
                            style={styles.iconButton}
                            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                        >
                            <Heart
                                size={24}
                                color={isSaved ? "#EC4899" : "#64748B"}
                                fill={isSaved ? "#EC4899" : "transparent"}
                            />
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </View>

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Info Card: Title & Overview */}
                <View style={styles.infoCard}>
                    <View style={styles.infoHeader}>
                        <View style={styles.infoIconBox}>
                            <IconComponent size={32} color="#2563EB" />
                        </View>
                        <View style={{ flex: 1 }}>
                            <View style={styles.catBadge}>
                                <Text style={styles.catText}>{business.category}</Text>
                            </View>
                            <Text style={styles.infoTitle}>{business.name}</Text>
                        </View>
                    </View>
                    <View style={styles.divider} />
                    <Text style={styles.overviewText}>{business.detailedOverview}</Text>
                </View>

                {/* Tabs Row */}
                <View style={styles.tabsContainer}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsScroll}>
                        {tabs.map(tab => (
                            <TouchableOpacity
                                key={tab.id}
                                onPress={() => handleTabChange(tab.id)}
                                style={[
                                    styles.tabItem,
                                    activeTab === tab.id ? styles.tabItemActive : styles.tabItemInactive
                                ]}
                            >
                                <Text style={[
                                    styles.tabText,
                                    activeTab === tab.id ? styles.tabTextActive : styles.tabTextInactive
                                ]}>
                                    {tab.label}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                {/* Content Area */}
                <View style={styles.contentArea}>
                    {renderContent()}
                </View>

            </ScrollView>

            {/* Bottom Bar: Back - Next */}
            <SafeAreaView style={styles.bottomBarBackground}>
                <View style={styles.bottomBar}>
                    <TouchableOpacity
                        style={[styles.navButton, styles.navButtonSecondary]}
                        onPress={handleBack}
                        activeOpacity={0.7}
                    >
                        <ChevronLeft size={20} color="#1E293B" />
                        <Text style={styles.navButtonTextSecondary}>Back</Text>
                    </TouchableOpacity>

                    {nextBusiness ? (
                        <TouchableOpacity
                            style={[styles.navButton, styles.navButtonPrimary]}
                            onPress={handleNext}
                            activeOpacity={0.7}
                        >
                            <Text style={styles.navButtonTextPrimary}>Next Business</Text>
                            <ChevronRight size={20} color="white" />
                        </TouchableOpacity>
                    ) : (
                        <View style={[styles.navButton, styles.navButtonDisabled]}>
                            <Text style={styles.navButtonTextDisabled}>End of List</Text>
                        </View>
                    )}
                </View>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    // Header
    header: {
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#E2E8F0',
        zIndex: 10,
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        height: Platform.OS === 'android' ? 60 : 50,
    },
    headerTitleWrapper: {
        flex: 1,
        marginHorizontal: 16,
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#0F172A',
    },
    iconButton: {
        padding: 8,
        borderRadius: 8,
    },

    // Scroll
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 40,
    },

    // Info Card
    infoCard: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 20,
        marginBottom: 24,
        shadowColor: "#64748B",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    infoHeader: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 16,
    },
    infoIconBox: {
        width: 56,
        height: 56,
        borderRadius: 14,
        backgroundColor: '#EFF6FF',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    catBadge: {
        backgroundColor: '#F1F5F9',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 6,
        alignSelf: 'flex-start',
        marginBottom: 6,
    },
    catText: {
        fontSize: 12,
        color: '#64748B',
        fontWeight: '600',
    },
    infoTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#0F172A',
        lineHeight: 26,
    },
    divider: {
        height: 1,
        backgroundColor: '#F1F5F9',
        marginBottom: 16,
    },
    overviewText: {
        fontSize: 15,
        color: '#475569',
        lineHeight: 24,
    },

    // Tabs
    tabsContainer: {
        marginBottom: 20,
    },
    tabsScroll: {
        paddingRight: 20,
    },
    tabItem: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 100,
        marginRight: 12,
        borderWidth: 1,
    },
    tabItemActive: {
        backgroundColor: '#2563EB',
        borderColor: '#2563EB',
    },
    tabItemInactive: {
        backgroundColor: 'white',
        borderColor: '#E2E8F0',
    },
    tabText: {
        fontSize: 14,
        fontWeight: '600',
    },
    tabTextActive: {
        color: 'white',
    },
    tabTextInactive: {
        color: '#64748B',
    },

    // Content Area
    contentArea: {
        minHeight: 300,
    },
    tabContent: {
        // Animation container
    },

    // Stats
    statsRow: {
        flexDirection: 'column',
        gap: 16,
    },
    statCard: {
        backgroundColor: 'white',
        padding: 24,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.02,
        shadowRadius: 4,
        elevation: 1,
    },
    statIconBadge: {
        width: 48,
        height: 48,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
    },
    statLabel: {
        fontSize: 14,
        color: '#64748B',
        marginBottom: 6,
        fontWeight: '500',
    },
    statValue: {
        fontSize: 24,
        fontWeight: '700',
        color: '#0F172A',
    },

    // Common Card
    card: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 20,
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        gap: 10,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#0F172A',
    },

    // List
    listContainer: {
        gap: 16,
    },
    listItem: {
        flexDirection: 'row',
    },
    stepCircle: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: '#DBEAFE',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 14,
        marginTop: 0,
    },
    stepNumber: {
        color: '#2563EB',
        fontWeight: '700',
        fontSize: 12,
    },
    listTextContainer: {
        flex: 1,
        justifyContent: 'center',
        minHeight: 28,
    },
    listText: {
        fontSize: 15,
        color: '#334155',
        lineHeight: 24,
    },

    // Table
    tableRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
    },
    tableLabel: {
        fontSize: 15,
        color: '#64748B',
    },
    tableValue: {
        fontSize: 15,
        fontWeight: '600',
        color: '#0F172A',
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16,
        paddingTop: 16,
        borderTopWidth: 2,
        borderTopColor: '#F1F5F9',
    },
    totalLabel: {
        fontSize: 16,
        fontWeight: '700',
        color: '#0F172A',
    },
    totalValue: {
        fontSize: 18,
        fontWeight: '700',
        color: '#2563EB',
    },

    // Grid (Pros/Cons)
    gridColumn: {
        gap: 16,
    },
    gridCard: {
        padding: 20,
        borderRadius: 16,
        borderWidth: 1,
    },
    gridHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        gap: 8,
    },
    gridTitle: {
        fontSize: 16,
        fontWeight: '700',
    },
    bulletRow: {
        flexDirection: 'row',
        marginBottom: 10,
        alignItems: 'flex-start',
    },
    bulletDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        marginTop: 8,
        marginRight: 10,
    },
    gridText: {
        fontSize: 15,
        color: '#475569',
        flex: 1,
        lineHeight: 22,
    },

    // Bottom Bar
    bottomBarBackground: {
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: '#E2E8F0',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 10,
    },
    bottomBar: {
        flexDirection: 'row',
        padding: 16,
        paddingTop: 12,
        gap: 12,
    },
    navButton: {
        flex: 1,
        height: 50,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 8,
    },
    navButtonSecondary: {
        backgroundColor: '#F1F5F9',
    },
    navButtonPrimary: {
        backgroundColor: '#2563EB',
    },
    navButtonDisabled: {
        backgroundColor: '#F1F5F9',
        opacity: 0.5,
    },
    navButtonTextSecondary: {
        fontSize: 15,
        fontWeight: '600',
        color: '#1E293B',
    },
    navButtonTextPrimary: {
        fontSize: 15,
        fontWeight: '600',
        color: 'white',
    },
    navButtonTextDisabled: {
        fontSize: 15,
        fontWeight: '600',
        color: '#94A3B8',
    },
});

export default BusinessDetails;
