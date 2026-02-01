import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { ArrowRight, IndianRupee, TrendingUp, Briefcase } from 'lucide-react-native';
import * as Icons from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');

const BusinessCard = ({ business, onPress }) => {
    const IconComponent = Icons[business.iconName] || Briefcase;

    return (
        <TouchableOpacity
            onPress={() => onPress(business)}
            activeOpacity={0.95}
            style={styles.container}
        >
            <View style={styles.cardContainer}>
                {/* Gradient Border Effect */}
                <LinearGradient
                    colors={['#ffffff', '#f8fafc']}
                    style={styles.card}
                >
                    {/* Background Decor */}
                    <View style={styles.watermarkContainer}>
                        <IconComponent size={100} color="rgba(37, 99, 235, 0.03)" />
                    </View>

                    <View style={styles.content}>
                        {/* Header */}
                        <View style={styles.header}>
                            <View style={styles.iconWrapper}>
                                <LinearGradient
                                    colors={['#EFF6FF', '#DBEAFE']}
                                    style={styles.iconBackground}
                                >
                                    <IconComponent size={24} color="#2563EB" />
                                </LinearGradient>
                            </View>
                            <View style={styles.categoryBadge}>
                                <Text style={styles.categoryText}>{business.category}</Text>
                            </View>
                        </View>

                        {/* Title & Desc */}
                        <Text style={styles.title}>{business.name}</Text>
                        <Text style={styles.description} numberOfLines={2}>
                            {business.description}
                        </Text>

                        {/* Metrics */}
                        <View style={styles.statsContainer}>
                            <View style={styles.statItem}>
                                <View style={styles.statIconBadge}>
                                    <IndianRupee size={14} color="#F97316" />
                                </View>
                                <View>
                                    <Text style={styles.statLabel}>Investment</Text>
                                    <Text style={styles.statValue}>{business.minInvestment}</Text>
                                </View>
                            </View>

                            <View style={styles.divider} />

                            <View style={styles.statItem}>
                                <View style={[styles.statIconBadge, { backgroundColor: '#F0FDF4' }]}>
                                    <TrendingUp size={14} color="#16A34A" />
                                </View>
                                <View>
                                    <Text style={styles.statLabel}>Income</Text>
                                    <Text style={styles.statValue}>{business.monthlyIncome}</Text>
                                </View>
                            </View>
                        </View>

                        {/* Action Footer */}
                        <View style={styles.footer}>
                            <Text style={styles.viewPlanText}>View Business Plan</Text>
                            <View style={styles.arrowCircle}>
                                <ArrowRight size={14} color="#ffffff" />
                            </View>
                        </View>
                    </View>
                </LinearGradient>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
        shadowColor: "#2563EB",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 8,
    },
    cardContainer: {
        borderRadius: 24,
        backgroundColor: 'white',
        overflow: 'hidden',
    },
    card: {
        borderRadius: 24,
        borderWidth: 1,
        borderColor: '#F1F5F9',
    },
    watermarkContainer: {
        position: 'absolute',
        top: -10,
        right: -20,
        transform: [{ rotate: '-10deg' }],
    },
    content: {
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 16,
    },
    iconWrapper: {
        shadowColor: "#2563EB",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 4,
    },
    iconBackground: {
        padding: 12,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#BFDBFE',
    },
    categoryBadge: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        backgroundColor: '#F3F4F6',
        borderRadius: 100,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    categoryText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#4B5563',
    },
    title: {
        fontSize: 20,
        fontWeight: '800',
        color: '#0F172A',
        marginBottom: 8,
        letterSpacing: -0.5,
    },
    description: {
        fontSize: 14,
        color: '#64748B',
        lineHeight: 22,
        marginBottom: 20,
    },
    statsContainer: {
        flexDirection: 'row',
        backgroundColor: '#F8FAFC',
        borderRadius: 16,
        padding: 12,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#F1F5F9',
        marginBottom: 20,
    },
    statItem: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    statIconBadge: {
        width: 32,
        height: 32,
        borderRadius: 10,
        backgroundColor: '#FFF7ED',
        alignItems: 'center',
        justifyContent: 'center',
    },
    statLabel: {
        fontSize: 10,
        color: '#94A3B8',
        fontWeight: '600',
        textTransform: 'uppercase',
        marginBottom: 2,
    },
    statValue: {
        fontSize: 13,
        fontWeight: '700',
        color: '#334155',
    },
    divider: {
        width: 1,
        height: '80%',
        backgroundColor: '#E2E8F0',
        marginHorizontal: 12,
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 4,
    },
    viewPlanText: {
        fontSize: 15,
        fontWeight: '600',
        color: '#2563EB',
    },
    arrowCircle: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: '#2563EB',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default BusinessCard;
