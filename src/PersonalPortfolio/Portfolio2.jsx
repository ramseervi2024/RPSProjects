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
import LinearGradient from 'react-native-linear-gradient';
import { Terminal, Shield, Zap, Code, ChevronLeft, Github, Linkedin, Twitter } from 'lucide-react-native';
import Animated, { FadeInUp, ZoomIn } from 'react-native-reanimated';
import { portfolioprofile } from './portfoliodata';

const { width } = Dimensions.get('window');

export default function Portfolio2({ navigation }) {
    const { personal_info, summary, core_expertise, technical_stack, projects } = portfolioprofile;

    const SkillPill = ({ name, index }) => (
        <Animated.View 
            entering={ZoomIn.delay(index * 50)}
            style={styles.pill}
        >
            <Text style={styles.pillText}>{name}</Text>
        </Animated.View>
    );

    return (
        <View style={styles.container}>
            <LinearGradient colors={['#0F172A', '#020617']} style={StyleSheet.absoluteFill} />
            <SafeAreaView style={styles.safeArea}>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
                    
                    {/* Header Nav */}
                    <View style={styles.nav}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
                            <ChevronLeft size={20} color="#FACC15" />
                        </TouchableOpacity>
                        <Text style={styles.navTitle}>PORTFOLIO.OS</Text>
                        <View style={styles.onlineBadge}>
                            <View style={styles.onlineDot} />
                            <Text style={styles.onlineText}>ACTIVE</Text>
                        </View>
                    </View>

                    {/* Intro Section */}
                    <Animated.View entering={FadeInUp.duration(800)} style={styles.introCard}>
                        <Terminal size={40} color="#FACC15" strokeWidth={1.5} />
                        <Text style={styles.welcomeText}>SYSTEM INIT: {personal_info.name.toUpperCase()}</Text>
                        <Text style={styles.heroHeadline}>{personal_info.headline}</Text>
                        <View style={styles.socialRow}>
                            <TouchableOpacity style={styles.socialIcon}><Github size={20} color="#94A3B8" /></TouchableOpacity>
                            <TouchableOpacity style={styles.socialIcon}><Linkedin size={20} color="#94A3B8" /></TouchableOpacity>
                            <TouchableOpacity style={styles.socialIcon}><Twitter size={20} color="#94A3B8" /></TouchableOpacity>
                        </View>
                    </Animated.View>

                    {/* Stats Row */}
                    <View style={styles.statsRow}>
                        <View style={styles.statItem}>
                            <Text style={styles.statVal}>{personal_info.experience_years}+</Text>
                            <Text style={styles.statLabel}>Exp Years</Text>
                        </View>
                        <View style={[styles.statItem, styles.statBorder]}>
                            <Text style={styles.statVal}>5+</Text>
                            <Text style={styles.statLabel}>Live Apps</Text>
                        </View>
                        <View style={styles.statItem}>
                            <Zap size={24} color="#FACC15" />
                            <Text style={styles.statLabel}>Fast Delivery</Text>
                        </View>
                    </View>

                    {/* Expertise Section */}
                    <View style={styles.section}>
                        <Text style={styles.sectionHeader}>CORE_EXPERTISE</Text>
                        <View style={styles.expertiseGrid}>
                            {core_expertise.map((item, index) => (
                                <View key={index} style={styles.expertiseItem}>
                                    <Shield size={16} color="#A855F7" />
                                    <Text style={styles.expertiseText}>{item}</Text>
                                </View>
                            ))}
                        </View>
                    </View>

                    {/* Tech Stack Overlay */}
                    <View style={styles.section}>
                        <Text style={styles.sectionHeader}>TECHNICAL_STACK</Text>
                        <View style={styles.pillContainer}>
                            {technical_stack.mobile.concat(technical_stack.frontend).map((tech, index) => (
                                <SkillPill key={index} name={tech} index={index} />
                            ))}
                        </View>
                    </View>

                    {/* Project Terminal */}
                    <View style={styles.section}>
                        <Text style={styles.sectionHeader}>LATEST_REPOS</Text>
                        {projects.slice(0, 3).map((project, index) => (
                            <View key={index} style={styles.projectTerminal}>
                                <View style={styles.terminalHeader}>
                                    <View style={styles.terminalDots}>
                                        <View style={[styles.dot, { backgroundColor: '#EF4444' }]} />
                                        <View style={[styles.dot, { backgroundColor: '#FBBF24' }]} />
                                        <View style={[styles.dot, { backgroundColor: '#10B981' }]} />
                                    </View>
                                    <Text style={styles.terminalPath}>~/projects/{project.name.toLowerCase().replace(/\s/g, '-')}</Text>
                                </View>
                                <View style={styles.terminalBody}>
                                    <Text style={styles.terminalTitle}>{project.name}</Text>
                                    <Text style={styles.terminalDesc}>{project.description}</Text>
                                    <TouchableOpacity style={styles.viewBtn}>
                                        <Text style={styles.viewBtnText}>EXECUTE --DETAILS</Text>
                                        <Code size={14} color="#FACC15" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))}
                    </View>

                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    safeArea: {
        flex: 1,
    },
    scrollContainer: {
        padding: 20,
        paddingBottom: 40,
    },
    nav: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 30,
    },
    navTitle: {
        fontSize: 14,
        fontWeight: '900',
        color: '#FACC15',
        letterSpacing: 2,
    },
    iconBtn: {
        padding: 8,
        backgroundColor: '#1E293B',
        borderRadius: 8,
    },
    onlineBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        gap: 6,
    },
    onlineDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#10B981',
    },
    onlineText: {
        fontSize: 10,
        color: '#10B981',
        fontWeight: '800',
    },
    introCard: {
        backgroundColor: 'rgba(30, 41, 59, 0.5)',
        borderRadius: 24,
        padding: 24,
        borderWidth: 1,
        borderColor: '#334155',
        alignItems: 'center',
        marginBottom: 24,
    },
    welcomeText: {
        color: '#FACC15',
        fontSize: 12,
        fontWeight: '800',
        marginTop: 16,
        letterSpacing: 1,
    },
    heroHeadline: {
        fontSize: 24,
        fontWeight: '700',
        color: '#F8FAFC',
        textAlign: 'center',
        marginTop: 12,
        lineHeight: 32,
    },
    socialRow: {
        flexDirection: 'row',
        marginTop: 20,
        gap: 16,
    },
    socialIcon: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#0F172A',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#334155',
    },
    statsRow: {
        flexDirection: 'row',
        backgroundColor: '#1E293B',
        borderRadius: 20,
        padding: 20,
        marginBottom: 32,
    },
    statItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    statBorder: {
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: '#334155',
    },
    statVal: {
        fontSize: 20,
        fontWeight: '900',
        color: '#F1F5F9',
    },
    statLabel: {
        fontSize: 10,
        color: '#64748B',
        fontWeight: '700',
        textTransform: 'uppercase',
        marginTop: 4,
    },
    section: {
        marginBottom: 32,
    },
    sectionHeader: {
        fontSize: 12,
        fontWeight: '900',
        color: '#94A3B8',
        letterSpacing: 2,
        marginBottom: 16,
        paddingLeft: 4,
    },
    expertiseGrid: {
        gap: 12,
    },
    expertiseItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#0F172A',
        padding: 14,
        borderRadius: 12,
        gap: 12,
        borderWidth: 1,
        borderColor: '#1E293B',
    },
    expertiseText: {
        color: '#CBD5E1',
        fontSize: 14,
        fontWeight: '600',
    },
    pillContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    pill: {
        backgroundColor: '#1E293B',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#334155',
    },
    pillText: {
        color: '#A855F7',
        fontSize: 12,
        fontWeight: '700',
    },
    projectTerminal: {
        backgroundColor: '#020617',
        borderRadius: 12,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#1E293B',
        marginBottom: 16,
    },
    terminalHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1E293B',
        padding: 8,
        gap: 12,
    },
    terminalDots: {
        flexDirection: 'row',
        gap: 6,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    terminalPath: {
        color: '#64748B',
        fontSize: 10,
        fontFamily: 'Courier',
    },
    terminalBody: {
        padding: 16,
    },
    terminalTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#F8FAFC',
        marginBottom: 8,
    },
    terminalDesc: {
        fontSize: 14,
        color: '#94A3B8',
        lineHeight: 20,
        marginBottom: 16,
    },
    viewBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        alignSelf: 'flex-start',
    },
    viewBtnText: {
        color: '#FACC15',
        fontSize: 12,
        fontWeight: '800',
    }
});
