import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    Dimensions
} from 'react-native';
import { ShieldCheck, Zap, BarChart3, Users, ChevronLeft, ArrowRight, MessageSquare, Briefcase } from 'lucide-react-native';
import Animated, { FadeInDown, FadeInRight } from 'react-native-reanimated';
import { portfolioprofile } from './portfoliodata';

const { width } = Dimensions.get('window');

export default function Portfolio5({ navigation }) {
    const { personal_info, hero, services, stats, achievements } = portfolioprofile;

    const FeatureCard = ({ title, desc, icon: Icon, index }) => (
        <Animated.View 
            entering={FadeInDown.delay(index * 100)}
            style={styles.featureCard}
        >
            <View style={styles.featureIcon}>
                <Icon size={24} color="#6366F1" />
            </View>
            <Text style={styles.featureTitle}>{title}</Text>
            <Text style={styles.featureDesc}>{desc}</Text>
        </Animated.View>
    );

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
                    
                    {/* Header */}
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                            <ChevronLeft size={20} color="#6366F1" />
                        </TouchableOpacity>
                        <View style={styles.statusPill}>
                            <View style={styles.statusDot} />
                            <Text style={styles.statusText}>Open for Projects</Text>
                        </View>
                    </View>

                    {/* Startup Hero */}
                    <View style={styles.heroSection}>
                        <Animated.Text entering={FadeInRight.duration(800)} style={styles.heroPre}>MOBILE ARCHITECT // 3.5+ YEARS</Animated.Text>
                        <Text style={styles.heroTitle}>Building the next generation of mobile experiences.</Text>
                        <Text style={styles.heroSubtitle}>{hero.subtitle}</Text>
                        <View style={styles.ctaGroup}>
                            <TouchableOpacity style={styles.primaryBtn}>
                                <Text style={styles.primaryBtnText}>Hire Ramesh</Text>
                                <ArrowRight size={18} color="#FFF" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.secondaryBtn}>
                                <Text style={styles.secondaryBtnText}>View Works</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Client Stats Row */}
                    <View style={styles.statsRow}>
                        {stats.map((stat, index) => (
                            <View key={index} style={styles.statBox}>
                                <Text style={styles.statVal}>{stat.value}</Text>
                                <Text style={styles.statLabel}>{stat.label}</Text>
                            </View>
                        ))}
                    </View>

                    {/* Services / Feature Grid */}
                    <View style={styles.section}>
                        <View style={styles.sectionBadge}>
                            <Text style={styles.badgeText}>CORE CAPABILITIES</Text>
                        </View>
                        <Text style={styles.sectionTitle}>Full-stack mobile engineering tailored for growth.</Text>
                        <View style={styles.featureGrid}>
                            <FeatureCard title="Cross-Platform" desc="Native performance on both iOS & Android via React Native." icon={Zap} index={0} />
                            <FeatureCard title="UI/UX Focus" desc="Pixel-perfect translation from Figma to high-quality code." icon={BarChart3} index={1} />
                            <FeatureCard title="Scale & Perf" desc="Optimized for 60FPS and millions of active users." icon={ShieldCheck} index={2} />
                            <FeatureCard title="Team Collab" desc="Expertise in Agile, Git, and complex CI/CD environments." icon={Users} index={3} />
                        </View>
                    </View>

                    {/* Why Me / Achievements Section */}
                    <View style={styles.achievementSection}>
                        <View style={styles.achievementCard}>
                            <View style={styles.achTitleRow}>
                                <Briefcase size={20} color="#6366F1" />
                                <Text style={styles.achHeader}>KEY ACHIEVEMENTS</Text>
                            </View>
                            {achievements.map((ach, index) => (
                                <View key={index} style={styles.achRow}>
                                    <View style={styles.checkIcon}><ShieldCheck size={14} color="#FFF" /></View>
                                    <Text style={styles.achText}>{ach}</Text>
                                </View>
                            ))}
                        </View>
                    </View>

                    {/* Final CTA */}
                    <View style={styles.footerCTA}>
                        <Text style={styles.footerTitle}>Ready to launch your project?</Text>
                        <Text style={styles.footerDesc}>Join high-performance teams already shipping with confidence.</Text>
                        <TouchableOpacity style={styles.footerBtn}>
                            <MessageSquare size={20} color="#FFF" />
                            <Text style={styles.footerBtnText}>Contact Ramesh Today</Text>
                        </TouchableOpacity>
                    </View>

                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    safeArea: {
        flex: 1,
    },
    scrollContainer: {
        paddingBottom: 40,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
    },
    backBtn: {
        padding: 8,
        backgroundColor: '#FFF',
        borderRadius: 12,
        shadowColor: '#6366F1',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 2,
    },
    statusPill: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        gap: 8,
    },
    statusDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#6366F1',
    },
    statusText: {
        fontSize: 12,
        color: '#6366F1',
        fontWeight: '700',
    },
    heroSection: {
        padding: 24,
        marginTop: 20,
    },
    heroPre: {
        fontSize: 12,
        fontWeight: '800',
        color: '#6366F1',
        letterSpacing: 2,
        marginBottom: 16,
    },
    heroTitle: {
        fontSize: 36,
        fontWeight: '800',
        color: '#0F172A',
        lineHeight: 44,
        letterSpacing: -1,
    },
    heroSubtitle: {
        fontSize: 16,
        color: '#64748B',
        marginTop: 16,
        lineHeight: 24,
    },
    ctaGroup: {
        flexDirection: 'row',
        marginTop: 32,
        gap: 16,
    },
    primaryBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#6366F1',
        paddingHorizontal: 24,
        paddingVertical: 14,
        borderRadius: 14,
        gap: 10,
        shadowColor: '#6366F1',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 5,
    },
    primaryBtnText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '700',
    },
    secondaryBtn: {
        paddingHorizontal: 20,
        paddingVertical: 14,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        justifyContent: 'center',
    },
    secondaryBtnText: {
        color: '#475569',
        fontSize: 16,
        fontWeight: '600',
    },
    statsRow: {
        flexDirection: 'row',
        padding: 24,
        paddingTop: 0,
        gap: 20,
    },
    statBox: {
        flex: 1,
    },
    statVal: {
        fontSize: 24,
        fontWeight: '900',
        color: '#0F172A',
    },
    statLabel: {
        fontSize: 11,
        color: '#94A3B8',
        fontWeight: '600',
        marginTop: 4,
        textTransform: 'uppercase',
    },
    section: {
        padding: 24,
    },
    sectionBadge: {
        backgroundColor: '#EEF2FF',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
        alignSelf: 'flex-start',
        marginBottom: 12,
    },
    badgeText: {
        fontSize: 10,
        fontWeight: '900',
        color: '#6366F1',
        letterSpacing: 1.5,
    },
    sectionTitle: {
        fontSize: 28,
        fontWeight: '800',
        color: '#0F172A',
        lineHeight: 36,
        marginBottom: 32,
    },
    featureGrid: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        gap: 16,
    },
    featureCard: {
        width: (width - 64) / 2,
        backgroundColor: '#FFF',
        padding: 20,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#F1F5F9',
        shadowColor: '#000',
        shadowOpacity: 0.05,
        elevation: 2,
    },
    featureIcon: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: '#EEF2FF',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    featureTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1E293B',
        marginBottom: 8,
    },
    featureDesc: {
        fontSize: 13,
        color: '#64748B',
        lineHeight: 18,
    },
    achievementSection: {
        padding: 24,
    },
    achievementCard: {
        backgroundColor: '#0F172A',
        borderRadius: 30,
        padding: 24,
    },
    achTitleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 24,
    },
    achHeader: {
        fontSize: 14,
        fontWeight: '900',
        color: '#FFF',
        letterSpacing: 2,
    },
    achRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        marginBottom: 20,
    },
    checkIcon: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#6366F1',
        justifyContent: 'center',
        alignItems: 'center',
    },
    achText: {
        flex: 1,
        color: '#94A3B8',
        fontSize: 14,
        lineHeight: 20,
        fontWeight: '500',
    },
    footerCTA: {
        padding: 40,
        alignItems: 'center',
        backgroundColor: '#FFF',
        marginTop: 40,
    },
    footerTitle: {
        fontSize: 24,
        fontWeight: '800',
        color: '#0F172A',
        textAlign: 'center',
        marginBottom: 12,
    },
    footerDesc: {
        fontSize: 16,
        color: '#64748B',
        textAlign: 'center',
        marginBottom: 32,
    },
    footerBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#6366F1',
        paddingHorizontal: 32,
        paddingVertical: 16,
        borderRadius: 20,
        gap: 12,
        shadowColor: '#6366F1',
        shadowOpacity: 0.4,
        shadowRadius: 15,
        elevation: 8,
    },
    footerBtnText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '800',
    }
});
