import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    Dimensions,
} from 'react-native';
import { ChevronLeft, User, Briefcase, Cpu, GraduationCap, ArrowRight, Mail } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { portfolioprofile } from './portfoliodata';

const { width } = Dimensions.get('window');

const NeumorphicCard = ({ children, style }) => (
    <View style={[styles.neuCardOuter, style]}>
        <View style={styles.neuCardInner}>
            {children}
        </View>
    </View>
);

const SectionHeader = ({ title, icon: Icon }) => (
    <View style={styles.sectionHeader}>
        <View style={[styles.iconNeu, { width: 44, height: 44, borderRadius: 22 }]}>
            <Icon size={20} color="#6366F1" />
        </View>
        <Text style={styles.sectionTitle}>{title}</Text>
    </View>
);

export default function Portfolio18({ navigation }) {
    const { personal_info, hero, summary, technical_stack, projects, education, stats } = portfolioprofile;

    return (
        <View style={styles.container}>
            <LinearGradient colors={['#E0E5EC', '#E0E5EC']} style={StyleSheet.absoluteFill} />
            
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconNeu}>
                        <ChevronLeft size={24} color="#4B5563" />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>PORTFOLIO / 018</Text>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    {/* Hero Section */}
                    <View style={styles.heroSection}>
                        <View style={styles.profileNeu}>
                            <User size={60} color="#6366F1" strokeWidth={1} />
                        </View>
                        <Animated.Text entering={FadeInUp.duration(1000)} style={styles.name}>
                            {personal_info.name}
                        </Animated.Text>
                        <View style={styles.badgeNeu}>
                            <Text style={styles.badgeText}>{personal_info.title.toUpperCase()}</Text>
                        </View>
                        <Text style={styles.headline}>{personal_info.headline}</Text>
                    </View>

                    {/* Stats Row */}
                    <View style={styles.statsRow}>
                        {stats.slice(0, 3).map((stat, i) => (
                            <NeumorphicCard key={i} style={styles.statCard}>
                                <Text style={styles.statValue}>{stat.value}</Text>
                                <Text style={styles.statLabel}>{stat.label}</Text>
                            </NeumorphicCard>
                        ))}
                    </View>

                    {/* Summary Card */}
                    <View style={styles.section}>
                        <SectionHeader title="Professional Summary" icon={Briefcase} />
                        <NeumorphicCard style={styles.summaryCard}>
                            <Text style={styles.summaryText}>{summary}</Text>
                        </NeumorphicCard>
                    </View>

                    {/* Technical Skills */}
                    <View style={styles.section}>
                        <SectionHeader title="Technical Stack" icon={Cpu} />
                        <View style={styles.skillsGrid}>
                            {technical_stack.mobile.concat(technical_stack.frontend.slice(0, 3)).map((skill, i) => (
                                <View key={i} style={styles.skillChipNeu}>
                                    <Text style={styles.skillText}>{skill}</Text>
                                </View>
                            ))}
                        </View>
                    </View>

                    {/* Projects Page */}
                    <View style={styles.section}>
                        <SectionHeader title="Recent Projects" icon={ArrowRight} />
                        {projects.slice(0, 3).map((project, i) => (
                            <NeumorphicCard key={i} style={styles.projectCard}>
                                <View style={styles.projectHeader}>
                                    <Text style={styles.projectName}>{project.name}</Text>
                                    <View style={styles.typeBadge}>
                                        <Text style={styles.typeText}>{project.category}</Text>
                                    </View>
                                </View>
                                <Text style={styles.projectDesc}>{project.description.slice(0, 100)}...</Text>
                                <TouchableOpacity style={styles.viewBtnNeu}>
                                    <Text style={styles.viewBtnText}>VIEW PROJECT</Text>
                                    <ArrowRight size={16} color="#6366F1" />
                                </TouchableOpacity>
                            </NeumorphicCard>
                        ))}
                    </View>

                    {/* Contact Footer */}
                    <TouchableOpacity style={[styles.neuCardOuter, styles.footerBtn]} onPress={() => navigation.goBack()}>
                        <LinearGradient 
                            colors={['#6366F1', '#4F46E5']} 
                            start={{ x: 0, y: 0 }} 
                            end={{ x: 1, y: 1 }}
                            style={styles.footerGradient}
                        >
                            <Text style={styles.footerBtnText}>GET IN TOUCH</Text>
                            <Mail size={20} color="#FFF" />
                        </LinearGradient>
                    </TouchableOpacity>

                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingVertical: 16,
        gap: 20,
    },
    headerText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#4B5563',
        letterSpacing: 2,
    },
    scrollContent: {
        paddingHorizontal: 24,
        paddingBottom: 60,
        paddingTop: 20,
    },
    heroSection: {
        alignItems: 'center',
        marginBottom: 40,
    },
    profileNeu: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#E0E5EC',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
        shadowColor: '#FFF',
        shadowOffset: { width: -6, height: -6 },
        shadowOpacity: 1,
        shadowRadius: 6,
        elevation: 8,
    },
    name: {
        fontSize: 32,
        fontWeight: '900',
        color: '#1A1A1A',
        marginBottom: 12,
    },
    badgeNeu: {
        backgroundColor: '#E0E5EC',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        marginBottom: 20,
        shadowColor: '#FFF',
        shadowOffset: { width: -3, height: -3 },
        shadowOpacity: 1,
        shadowRadius: 3,
        elevation: 5,
    },
    badgeText: {
        fontSize: 12,
        fontWeight: '800',
        color: '#6366F1',
        letterSpacing: 1,
    },
    headline: {
        fontSize: 16,
        color: '#6B7280',
        textAlign: 'center',
        lineHeight: 24,
        paddingHorizontal: 20,
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 40,
    },
    statCard: {
        width: (width - 68) / 3,
        paddingVertical: 20,
        alignItems: 'center',
    },
    statValue: {
        fontSize: 20,
        fontWeight: '900',
        color: '#1A1A1A',
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 10,
        color: '#6B7280',
        fontWeight: '700',
        textTransform: 'uppercase',
    },
    neuCardOuter: {
        borderRadius: 24,
        backgroundColor: '#E0E5EC',
        shadowColor: 'rgba(163, 177, 198, 0.6)',
        shadowOffset: { width: 9, height: 9 },
        shadowOpacity: 1,
        shadowRadius: 16,
        elevation: 10,
    },
    neuCardInner: {
        borderRadius: 24,
        padding: 24,
        backgroundColor: '#E0E5EC',
        shadowColor: '#FFF',
        shadowOffset: { width: -9, height: -9 },
        shadowOpacity: 1,
        shadowRadius: 16,
        elevation: 8,
    },
    iconNeu: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#E0E5EC',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: 'rgba(163, 177, 198, 0.6)',
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 6,
        elevation: 5,
    },
    section: {
        marginBottom: 40,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        gap: 16,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '900',
        color: '#1A1A1A',
    },
    summaryCard: {
        marginBottom: 0,
    },
    summaryText: {
        fontSize: 15,
        color: '#4B5563',
        lineHeight: 26,
    },
    skillsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    skillChipNeu: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 14,
        backgroundColor: '#E0E5EC',
        shadowColor: 'rgba(163, 177, 198, 0.4)',
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 4,
        elevation: 4,
    },
    skillText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#4B5563',
    },
    projectCard: {
        marginBottom: 24,
    },
    projectHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    projectName: {
        fontSize: 18,
        fontWeight: '900',
        color: '#1A1A1A',
        flex: 1,
    },
    typeBadge: {
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
    },
    typeText: {
        fontSize: 10,
        fontWeight: '800',
        color: '#6366F1',
    },
    projectDesc: {
        fontSize: 14,
        color: '#6B7280',
        lineHeight: 22,
        marginBottom: 20,
    },
    viewBtnNeu: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        alignSelf: 'flex-start',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 12,
        backgroundColor: '#E0E5EC',
        shadowColor: 'rgba(163, 177, 198, 0.4)',
        shadowOffset: { width: 3, height: 3 },
        shadowOpacity: 1,
        shadowRadius: 3,
    },
    viewBtnText: {
        fontSize: 12,
        fontWeight: '800',
        color: '#6366F1',
    },
    footerBtn: {
        marginTop: 20,
        overflow: 'hidden',
        borderRadius: 24,
    },
    footerGradient: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 24,
        gap: 16,
    },
    footerBtnText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '900',
        letterSpacing: 2,
    }
});
