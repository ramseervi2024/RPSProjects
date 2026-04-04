import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    Image,
    Linking
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Mail, Phone, MapPin, ExternalLink, Briefcase, GraduationCap, Award, ChevronLeft, Users, Zap, CheckCircle2 } from 'lucide-react-native';
import Animated, { FadeIn, FadeInDown, SlideInRight, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { portfolioprofile } from './portfoliodata';

export default function Portfolio1({ navigation }) {
    const { personal_info, hero, summary, projects, technical_stack, education } = portfolioprofile;

    const SectionHeader = ({ title, icon: Icon }) => (
        <Animated.View entering={FadeInDown.duration(600)} style={styles.sectionHeader}>
            <View style={styles.iconCircle}>
                <Icon size={20} color="#3B82F6" />
            </View>
            <Text style={styles.sectionTitle}>{title}</Text>
        </Animated.View>
    );

    return (
        <View style={styles.mainContainer}>
            <SafeAreaView style={styles.safeArea}>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

                    {/* Header Nav */}
                    <View style={styles.headerNav}>
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={styles.backButton}
                        >
                            <ChevronLeft color="#0F172A" size={24} />
                        </TouchableOpacity>
                    </View>

                    {/* Hero Section */}
                    <View style={styles.heroCard}>

                        <Animated.View entering={FadeInDown.duration(800).delay(300)} style={styles.profileInfo}>
                            <Text style={styles.name}>{personal_info.name}</Text>
                            <Text style={styles.title}>{personal_info.title.toUpperCase()}</Text>
                            <View style={styles.heroLine} />
                            <View style={styles.badgeContainer}>
                                <View style={styles.statusDot} />
                                <Text style={styles.badgeText}>AVAILABLE FOR HIRE</Text>
                            </View>
                        </Animated.View>

                        <View style={styles.statsStrip}>
                            <View style={styles.statBox}>
                                <Text style={styles.statNumber}>{personal_info.experience_years}+</Text>
                                <Text style={styles.statLabel}>Exp Years</Text>
                            </View>
                            <View style={styles.statDivider} />
                            <View style={styles.statBox}>
                                <Text style={styles.statNumber}>15+</Text>
                                <Text style={styles.statLabel}>Projects</Text>
                            </View>
                            <View style={styles.statDivider} />
                            <View style={styles.statBox}>
                                <Text style={styles.statNumber}>100%</Text>
                                <Text style={styles.statLabel}>Success</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.metaSection}>
                        <View style={styles.metaRow}>
                            <View style={styles.metaItem}>
                                <Mail size={14} color="#3B82F6" />
                                <Text style={styles.metaText}>{personal_info.email}</Text>
                            </View>
                            <View style={styles.metaItem}>
                                <MapPin size={14} color="#3B82F6" />
                                <Text style={styles.metaText}>{personal_info.location}</Text>
                            </View>
                        </View>
                    </View>

                    {/* About Section */}
                    <View style={styles.section}>
                        <SectionHeader title="Professional Summary" icon={Award} />
                        <Animated.Text entering={FadeIn.delay(200)} style={styles.summaryText}>
                            {summary}
                        </Animated.Text>
                    </View>

                    {/* Skills Section */}
                    <View style={styles.section}>
                        <SectionHeader title="Technical Stack" icon={Briefcase} />
                        <View style={styles.skillsGrid}>
                            {technical_stack.mobile.map((skill, index) => (
                                <Animated.View
                                    key={index}
                                    entering={FadeInDown.delay(index * 50)}
                                    style={styles.skillBadge}
                                >
                                    <Text style={styles.skillText}>{skill}</Text>
                                </Animated.View>
                            ))}
                        </View>
                    </View>

                    {/* Projects Section */}
                    <View style={styles.section}>
                        <SectionHeader title="Featured Projects" icon={ExternalLink} />
                        {projects.slice(0, 4).map((project, index) => (
                            <Animated.View
                                key={index}
                                entering={SlideInRight.delay(index * 100)}
                                style={styles.projectCard}
                            >
                                <View style={styles.projectHeader}>
                                    <Text style={styles.projectName}>{project.name}</Text>
                                    <View style={styles.categoryBadge}>
                                        <Text style={styles.projectCategory}>{project.category}</Text>
                                    </View>
                                </View>
                                <Text style={styles.projectDesc}>{project.description}</Text>
                                <View style={styles.techList}>
                                    {project.technologies.map((tech, i) => (
                                        <Text key={i} style={styles.techText}>#{tech.replace(/\s/g, '')}</Text>
                                    ))}
                                </View>
                            </Animated.View>
                        ))}
                    </View>

                    {/* Education */}
                    <View style={styles.section}>
                        <SectionHeader title="Education" icon={GraduationCap} />
                        <Animated.View entering={FadeInDown.delay(500)} style={styles.eduCard}>
                            <LinearGradient
                                colors={['#1E293B', '#0F172A']}
                                style={StyleSheet.absoluteFill}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                            />
                            <Text style={styles.degree}>{education.degree}</Text>
                            <Text style={styles.institution}>{education.institution}</Text>
                            <Text style={styles.eduYear}>{education.year}</Text>
                        </Animated.View>
                    </View>

                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    safeArea: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 60,
        paddingHorizontal: 32,
    },
    heroCard: {
        paddingVertical: 50,
        backgroundColor: '#F8FAFC',
        justifyContent: 'center',
        marginBottom: 30,
    },
    headerNav: {
        paddingHorizontal: 16,
        paddingTop: 12,
        paddingBottom: 20,
        backgroundColor: '#F8FAFC',
    },
    backButton: {
        padding: 8,
        alignSelf: 'flex-start',
    },
    profileInfo: {
        alignItems: 'center',
        marginVertical: 5,
        zIndex: 5,
    },
    name: {
        fontSize: 36,
        fontWeight: '900',
        color: '#0F172A',
        letterSpacing: -1.5,
        textAlign: 'center',
    },
    title: {
        fontSize: 11,
        color: '#3B82F6',
        fontWeight: '800',
        marginTop: 10,
        letterSpacing: 3,
    },
    heroLine: {
        height: 1,
        width: 30,
        backgroundColor: '#E2E8F0',
        marginTop: 15,
    },
    badgeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F0FDF4',
        paddingHorizontal: 12,
        paddingVertical: 5,
        borderRadius: 24,
        marginTop: 15,
        borderWidth: 1,
        borderColor: '#DCFCE7',
        gap: 6,
    },
    statusDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#10B981',
    },
    badgeText: {
        color: '#10B981',
        fontSize: 10,
        fontWeight: '900',
        letterSpacing: 1,
    },
    statsStrip: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 30,
        backgroundColor: '#FFFFFF',
        paddingVertical: 18,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: '#F1F5F9',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.03,
        shadowRadius: 10,
        zIndex: 5,
    },
    statBox: {
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    statNumber: {
        color: '#0F172A',
        fontSize: 24,
        fontWeight: '900',
        letterSpacing: -1,
    },
    statLabel: {
        color: '#94A3B8',
        fontSize: 9,
        fontWeight: '800',
        marginTop: 4,
        textTransform: 'uppercase',
        letterSpacing: 1.5,
    },
    statDivider: {
        width: 1,
        height: '50%',
        backgroundColor: '#F1F5F9',
        alignSelf: 'center',
    },
    metaSection: {
        backgroundColor: '#FFF',
        paddingVertical: 24,
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
        marginBottom: 60,
        marginHorizontal: -32,
        paddingHorizontal: 32,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.02,
        shadowRadius: 10,
    },
    metaRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 32,
    },
    metaItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    metaText: {
        color: '#64748B',
        fontSize: 12,
        fontWeight: '700',
    },
    section: {
        marginBottom: 60,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        gap: 14,
    },
    iconCircle: {
        width: 44,
        height: 44,
        borderRadius: 14,
        backgroundColor: '#EFF6FF',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#DBEAFE',
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: '900',
        color: '#0F172A',
        letterSpacing: -0.5,
    },
    summaryText: {
        fontSize: 16,
        color: '#475569',
        lineHeight: 28,
        fontWeight: '500',
    },
    skillsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    skillBadge: {
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.04,
        shadowRadius: 8,
        elevation: 2,
    },
    skillText: {
        color: '#334155',
        fontSize: 13,
        fontWeight: '700',
    },
    projectCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        padding: 24,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#F1F5F9',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.05,
        shadowRadius: 20,
        elevation: 4,
    },
    projectHeader: {
        marginBottom: 16,
        gap: 6,
    },
    projectName: {
        fontSize: 22,
        fontWeight: '900',
        color: '#0F172A',
        letterSpacing: -0.5,
    },
    categoryBadge: {
        backgroundColor: '#EFF6FF',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        alignSelf: 'flex-start',
    },
    projectCategory: {
        fontSize: 9,
        color: '#3B82F6',
        fontWeight: '900',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    projectDesc: {
        fontSize: 14,
        color: '#64748B',
        lineHeight: 22,
        marginBottom: 16,
        fontWeight: '500',
    },
    techList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    techText: {
        fontSize: 11,
        color: '#94A3B8',
        fontWeight: '600',
        backgroundColor: '#F8FAFC',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    },
    eduCard: {
        padding: 26,
        borderRadius: 24,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    degree: {
        fontSize: 18,
        fontWeight: '800',
        color: '#FFFFFF',
        marginBottom: 6,
    },
    institution: {
        fontSize: 14,
        color: '#94A3B8',
        fontWeight: '600',
    },
    eduYear: {
        fontSize: 12,
        color: '#3B82F6',
        fontWeight: '800',
        marginTop: 14,
        letterSpacing: 1,
    }
});
