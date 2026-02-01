import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { ArrowRight, IndianRupee, TrendingUp, Briefcase } from 'lucide-react-native';
import * as Icons from 'lucide-react-native';

const BusinessCard = ({ business, onPress }) => {
    // Dynamically load icon, fallback to Briefcase
    const IconComponent = Icons[business.iconName] || Briefcase;

    return (
        <TouchableOpacity
            onPress={() => onPress(business)}
            style={styles.card}
            activeOpacity={0.9}
        >
            {/* Background Icon Watermark */}
            <View style={styles.watermarkContainer}>
                <IconComponent size={80} color="rgba(0,0,0,0.05)" />
            </View>

            {/* Header: Icon & Category */}
            <View style={styles.header}>
                <View style={styles.iconContainer}>
                    <IconComponent size={24} color="#2563EB" />
                </View>
                <View style={styles.categoryBadge}>
                    <Text style={styles.categoryText}>{business.category}</Text>
                </View>
            </View>

            {/* Title */}
            <Text style={styles.title}>{business.name}</Text>

            {/* Description */}
            <Text style={styles.description} numberOfLines={2}>
                {business.description}
            </Text>

            {/* Stats: Investment & Income */}
            <View style={styles.statsContainer}>
                <View style={styles.statRow}>
                    <IndianRupee size={16} color="#F97316" />
                    <Text style={styles.statLabel}>Investment:</Text>
                    <Text style={styles.statValue}>{business.minInvestment}</Text>
                </View>

                <View style={styles.statRow}>
                    <TrendingUp size={16} color="#22C55E" />
                    <Text style={styles.statLabel}>Income:</Text>
                    <Text style={styles.statValue}>{business.monthlyIncome}</Text>
                </View>
            </View>

            {/* View Plan Link */}
            <View style={styles.footer}>
                <Text style={styles.viewPlanText}>View Plan</Text>
                <ArrowRight size={16} color="#2563EB" style={{ marginLeft: 4 }} />
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 20,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#F3F4F6',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.05,
        shadowRadius: 3.84,
        elevation: 5,
        overflow: 'hidden',
        position: 'relative',
    },
    watermarkContainer: {
        position: 'absolute',
        top: 0,
        right: 0,
        padding: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 16,
    },
    iconContainer: {
        padding: 12,
        backgroundColor: '#EFF6FF',
        borderRadius: 12,
    },
    categoryBadge: {
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
    title: {
        fontSize: 20,
        fontWeight: '700',
        color: '#111827',
        marginBottom: 8,
    },
    description: {
        fontSize: 14,
        color: '#6B7280',
        marginBottom: 24,
        lineHeight: 20,
    },
    statsContainer: {
        borderTopWidth: 1,
        borderTopColor: '#F3F4F6',
        paddingTop: 16,
        gap: 12,
    },
    statRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    statLabel: {
        fontSize: 14,
        color: '#6B7280',
        marginLeft: 8,
        marginRight: 4,
    },
    statValue: {
        fontSize: 14,
        fontWeight: '600',
        color: '#111827',
    },
    footer: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    viewPlanText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#2563EB',
    },
});

export default BusinessCard;
