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
                    
                    {/* Hero Section */}
                    <LinearGradient 
                        colors={['#0F172A', '#1E293B', '#334155']} 
                        style={styles.heroCard}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                    >
                        <TouchableOpacity 
                            onPress={() => navigation.goBack()}
                            style={styles.backButton}
                        >
                            <ChevronLeft color="#FFF" size={24} />
                        </TouchableOpacity>
                        
                        <Animated.View entering={FadeIn.duration(1000)} style={styles.profileInfo}>
                            <Text style={styles.name}>{personal_info.name}</Text>
                            <Text style={styles.title}>{personal_info.title.toUpperCase()}</Text>
                            <View style={styles.badgeContainer}>
                                <Text style={styles.badgeText}>AVAILABLE FOR HIRE</Text>
                            </View>
                        </Animated.View>

                        <View style={styles.statsStrip}>
                            <View style={styles.statBox}>
                                <Text style={styles.statNumber}>{personal_info.experience_years}+</Text>
                                <Text style={styles.statLabel}>Years Exp</Text>
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
                    </LinearGradient>

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
                                    <Text style={styles.projectCategory}>{project.category}</Text>
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
                        <View style={styles.eduCard}>
                            <Text style={styles.degree}>{education.degree}</Text>
                            <Text style={styles.institution}>{education.institution}</Text>
                            <Text style={styles.eduYear}>{education.year}</Text>
                        </View>
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
        paddingBottom: 40,
    },
    heroCard: {
        paddingVertical: 48,
        paddingHorizontal: 24,
        marginBottom: 0,
        overflow: 'hidden',
        minHeight: 320,
        justifyContent: 'center',
    },
    backButton: {
        position: 'absolute',
        top: 20,
        left: 20,
        zIndex: 10,
        padding: 8,
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 12,
    },
    profileInfo: {
        alignItems: 'center',
        marginVertical: 10,
    },
    name: {
        fontSize: 38,
        fontWeight: '900',
        color: '#FFFFFF',
        letterSpacing: -1,
        textAlign: 'center',
    },
    title: {
        fontSize: 14,
        color: '#3B82F6',
        fontWeight: '800',
        marginTop: 8,
        letterSpacing: 2,
    },
    badgeContainer: {
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        paddingHorizontal: 12,
        paddingVertical: 5,
        borderRadius: 20,
        marginTop: 20,
        borderWidth: 1,
        borderColor: 'rgba(16, 185, 129, 0.3)',
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
        marginTop: 35,
        backgroundColor: 'rgba(255,255,255,0.03)',
        paddingVertical: 20,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
    },
    statBox: {
        alignItems: 'center',
        paddingHorizontal: 15,
    },
    statNumber: {
        color: '#FFF',
        fontSize: 22,
        fontWeight: '900',
    },
    statLabel: {
        color: '#64748B',
        fontSize: 10,
        fontWeight: '700',
        marginTop: 4,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    statDivider: {
        width: 1,
        height: '60%',
        backgroundColor: 'rgba(255,255,255,0.1)',
        alignSelf: 'center',
    },
    metaSection: {
        backgroundColor: '#FFF',
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
        marginBottom: 40,
    },
    metaRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 32,
    },
    metaItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    metaText: {
        color: '#475569',
        fontSize: 12,
        fontWeight: '700',
    },
    section: {
        paddingHorizontal: 32,
        marginBottom: 48,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        gap: 12,
    },
    iconCircle: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#EFF6FF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '800',
        color: '#1E293B',
        letterSpacing: -0.5,
    },
    summaryText: {
        fontSize: 15,
        color: '#475569',
        lineHeight: 24,
    },
    skillsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    skillBadge: {
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
    },
    skillText: {
        color: '#334155',
        fontSize: 13,
        fontWeight: '600',
    },
    projectCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 20,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#F1F5F9',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 3,
    },
    projectHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    projectName: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1E293B',
    },
    projectCategory: {
        fontSize: 11,
        color: '#3B82F6',
        fontWeight: '700',
        textTransform: 'uppercase',
    },
    projectDesc: {
        fontSize: 14,
        color: '#64748B',
        lineHeight: 20,
        marginBottom: 12,
    },
    techList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    techText: {
        fontSize: 12,
        color: '#94A3B8',
        fontWeight: '500',
    },
    eduCard: {
        backgroundColor: '#1E293B',
        padding: 20,
        borderRadius: 20,
    },
    degree: {
        fontSize: 16,
        fontWeight: '700',
        color: '#FFFFFF',
    },
    institution: {
        fontSize: 14,
        color: '#94A3B8',
        marginTop: 4,
    },
    eduYear: {
        fontSize: 12,
        color: '#3B82F6',
        fontWeight: '600',
        marginTop: 8,
    }
});
