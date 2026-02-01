import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    SafeAreaView
} from 'react-native';
import {
    ArrowLeft, CheckCircle, Clock, IndianRupee,
    Target, TrendingUp, AlertCircle, Briefcase, Wrench, ThumbsUp, ThumbsDown
} from 'lucide-react-native';
import * as Icons from 'lucide-react-native';

const BusinessDetails = ({ route, navigation }) => {
    const { business } = route.params;
    const IconComponent = Icons[business.iconName] || Briefcase;

    const handleBack = () => {
        navigation.goBack();
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Header / Hero Section */}
            <View style={styles.header}>
                <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                    <ArrowLeft size={24} color="#6B7280" />
                    <Text style={styles.backText}>Back</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle} numberOfLines={1}>{business.name}</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                {/* Overview Card */}
                <View style={[styles.card, styles.overviewCard]}>
                    <View style={styles.overviewHeader}>
                        <View style={styles.overviewIconContainer}>
                            <IconComponent size={40} color="#2563EB" />
                        </View>
                        <View style={styles.overviewTitleContainer}>
                            <Text style={styles.businessName}>{business.name}</Text>
                            <View style={styles.categoryBadge}>
                                <Text style={styles.categoryText}>{business.category}</Text>
                            </View>
                        </View>
                    </View>

                    <Text style={styles.overviewText}>
                        {business.detailedOverview}
                    </Text>

                    <View style={styles.statsGrid}>
                        <View style={[styles.statBox, styles.statBoxBlue]}>
                            <View style={styles.statHeader}>
                                <IndianRupee size={16} color="#1D4ED8" />
                                <Text style={[styles.statTitle, { color: '#1D4ED8' }]}>Min Investment</Text>
                            </View>
                            <Text style={styles.statValue}>{business.minInvestment}</Text>
                        </View>
                        <View style={[styles.statBox, styles.statBoxGreen]}>
                            <View style={styles.statHeader}>
                                <TrendingUp size={16} color="#15803D" />
                                <Text style={[styles.statTitle, { color: '#15803D' }]}>Monthly Income</Text>
                            </View>
                            <Text style={styles.statValue}>{business.monthlyIncome}</Text>
                        </View>
                    </View>
                </View>

                {/* Workflow / Process */}
                <View style={styles.card}>
                    <View style={styles.sectionHeader}>
                        <Target size={20} color="#2563EB" />
                        <Text style={styles.sectionTitle}>Workflow & Process</Text>
                    </View>
                    <View style={styles.listContainer}>
                        {business.workflowSteps.map((step, index) => (
                            <View key={index} style={styles.workflowItem}>
                                <View style={styles.stepNumberContainer}>
                                    <Text style={styles.stepNumber}>{index + 1}</Text>
                                </View>
                                <Text style={styles.workflowText}>{step}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Setup Guide */}
                <View style={styles.card}>
                    <View style={styles.sectionHeader}>
                        <Wrench size={20} color="#EA580C" />
                        <Text style={styles.sectionTitle}>Setup Guide</Text>
                    </View>
                    <View style={styles.listContainer}>
                        {business.setupProcess.map((step, index) => (
                            <View key={index} style={styles.setupItem}>
                                <CheckCircle size={18} color="#22C55E" style={{ marginTop: 2, marginRight: 10 }} />
                                <Text style={styles.setupText}>{step}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Investment Breakdown */}
                <View style={styles.card}>
                    <View style={styles.sectionHeader}>
                        <IndianRupee size={20} color="#F97316" />
                        <Text style={styles.sectionTitle}>Cost Breakdown</Text>
                    </View>
                    <View style={styles.costContainer}>
                        {business.investmentBreakdown.map((item, index) => (
                            <View key={index} style={styles.costRow}>
                                <Text style={styles.costLabel}>{item.item}</Text>
                                <Text style={styles.costValue}>{item.cost}</Text>
                            </View>
                        ))}
                        <View style={styles.costTotalRow}>
                            <Text style={styles.costTotalLabel}>Total Est.</Text>
                            <Text style={styles.costTotalValue}>{business.minInvestment}</Text>
                        </View>
                    </View>
                </View>

                {/* Pros & Cons */}
                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>Pros & Cons</Text>

                    <View style={styles.prosConsSection}>
                        <View style={styles.prosConsHeader}>
                            <ThumbsUp size={18} color="#15803D" />
                            <Text style={[styles.prosConsTitle, { color: '#15803D' }]}>Advantages</Text>
                        </View>
                        {business.pros.map((pro, index) => (
                            <View key={index} style={styles.bulletItem}>
                                <View style={[styles.bullet, { backgroundColor: '#22C55E' }]} />
                                <Text style={styles.bulletText}>{pro}</Text>
                            </View>
                        ))}
                    </View>

                    <View style={[styles.prosConsSection, { marginTop: 16 }]}>
                        <View style={styles.prosConsHeader}>
                            <ThumbsDown size={18} color="#B91C1C" />
                            <Text style={[styles.prosConsTitle, { color: '#B91C1C' }]}>Challenges</Text>
                        </View>
                        {business.cons.map((con, index) => (
                            <View key={index} style={styles.bulletItem}>
                                <View style={[styles.bullet, { backgroundColor: '#EF4444' }]} />
                                <Text style={styles.bulletText}>{con}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Key Insights */}
                <View style={[styles.card, { marginBottom: 30 }]}>
                    <View style={styles.sectionHeader}>
                        <AlertCircle size={20} color="#3B82F6" />
                        <Text style={styles.sectionTitle}>Key Insights</Text>
                    </View>

                    <View style={styles.insightRow}>
                        <Text style={styles.insightLabel}>BREAK EVEN TIME</Text>
                        <View style={styles.insightValueContainer}>
                            <Clock size={16} color="#A855F7" style={{ marginRight: 6 }} />
                            <Text style={styles.insightValue}>{business.breakEven}</Text>
                        </View>
                    </View>

                    <View style={[styles.insightRow, { marginTop: 16 }]}>
                        <Text style={styles.insightLabel}>REQUIRED SKILLS</Text>
                        <View style={styles.skillsContainer}>
                            {business.skills.map((skill, index) => (
                                <View key={index} style={styles.skillChip}>
                                    <Text style={styles.skillText}>{skill}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FAFB',
    },
    header: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
        flexDirection: 'row',
        alignItems: 'center',
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 16,
    },
    backText: {
        fontSize: 16,
        color: '#6B7280',
        fontWeight: '500',
        marginLeft: 4,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#111827',
        flex: 1,
    },
    scrollContent: {
        padding: 16,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#F3F4F6',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
    },
    overviewCard: {

    },
    overviewHeader: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 16,
    },
    overviewIconContainer: {
        padding: 12,
        backgroundColor: '#EFF6FF',
        borderRadius: 12,
        marginRight: 16,
    },
    overviewTitleContainer: {
        flex: 1,
    },
    businessName: {
        fontSize: 24,
        fontWeight: '800',
        color: '#111827',
        marginBottom: 6,
    },
    categoryBadge: {
        alignSelf: 'flex-start',
        paddingHorizontal: 10,
        paddingVertical: 4,
        backgroundColor: '#F3F4F6',
        borderRadius: 100,
    },
    categoryText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#4B5563',
    },
    overviewText: {
        fontSize: 15,
        color: '#374151',
        lineHeight: 24,
        marginBottom: 20,
    },
    statsGrid: {
        flexDirection: 'row',
        gap: 12,
    },
    statBox: {
        flex: 1,
        padding: 12,
        borderRadius: 12,
        borderWidth: 1,
    },
    statBoxBlue: {
        backgroundColor: '#EFF6FF',
        borderColor: '#DBEAFE',
    },
    statBoxGreen: {
        backgroundColor: '#F0FDF4',
        borderColor: '#DCFCE7',
    },
    statHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    statTitle: {
        fontSize: 12,
        fontWeight: '700',
        marginLeft: 6,
    },
    statValue: {
        fontSize: 16,
        fontWeight: '700',
        color: '#111827',
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#111827',
        marginLeft: 8,
    },
    listContainer: {
        gap: 12,
    },
    workflowItem: {
        flexDirection: 'row',
        gap: 12,
    },
    stepNumberContainer: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#EFF6FF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    stepNumber: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#2563EB',
    },
    workflowText: {
        fontSize: 14,
        color: '#374151',
        lineHeight: 22,
        flex: 1,
    },
    setupItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    setupText: {
        fontSize: 14,
        color: '#374151',
        lineHeight: 22,
        flex: 1,
    },
    costContainer: {
        gap: 8,
    },
    costRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    costLabel: {
        fontSize: 14,
        color: '#4B5563',
    },
    costValue: {
        fontSize: 14,
        fontWeight: '500',
        color: '#111827',
    },
    costTotalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
        paddingTop: 8,
        borderTopWidth: 1,
        borderTopColor: '#F3F4F6',
    },
    costTotalLabel: {
        fontSize: 15,
        fontWeight: '700',
        color: '#111827',
    },
    costTotalValue: {
        fontSize: 15,
        fontWeight: '700',
        color: '#111827',
    },
    prosConsSection: {

    },
    prosConsHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    prosConsTitle: {
        fontSize: 15,
        fontWeight: '600',
        marginLeft: 8,
    },
    bulletItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginTop: 4,
    },
    bullet: {
        width: 6,
        height: 6,
        borderRadius: 3,
        marginTop: 7,
        marginRight: 8,
    },
    bulletText: {
        fontSize: 13,
        color: '#4B5563',
        lineHeight: 20,
        flex: 1,
    },
    insightRow: {

    },
    insightLabel: {
        fontSize: 11,
        color: '#6B7280',
        fontWeight: '700',
        marginBottom: 4,
        letterSpacing: 0.5,
    },
    insightValueContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    insightValue: {
        fontSize: 15,
        fontWeight: '500',
        color: '#111827',
    },
    skillsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    skillChip: {
        backgroundColor: '#F3F4F6',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    },
    skillText: {
        fontSize: 12,
        color: '#4B5563',
    }
});

export default BusinessDetails;
