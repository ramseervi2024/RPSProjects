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
import { ChevronLeft, Compass, Cpu, Layout, Smartphone, Mail, ArrowUpRight, Zap } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { FadeIn, FadeInDown, SlideInRight } from 'react-native-reanimated';
import { portfolioprofile } from './portfoliodata';

const { width, height } = Dimensions.get('window');

const VisionGlass = ({ children, style, intensity = 0.1 }) => (
    <View style={[styles.visionGlass, style]}>
        <LinearGradient 
            colors={[`rgba(255,255,255,${intensity + 0.1})`, `rgba(255,255,255,${intensity})`]} 
            style={StyleSheet.absoluteFill}
        />
        <View style={styles.glassContent}>
            {children}
        </View>
    </View>
);

export default function Portfolio24({ navigation }) {
    const { personal_info, hero, summary, technical_stack, projects, stats } = portfolioprofile;

    return (
        <View style={styles.container}>
            {/* Immersive Background */}
            <LinearGradient colors={['#0F172A', '#1E293B', '#334155']} style={StyleSheet.absoluteFill} />
            <View style={styles.lightOrb} />

            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.navBtn}>
                        <ChevronLeft size={24} color="#FFF" />
                    </TouchableOpacity>
                    <View style={styles.visionBadge}>
                        <Compass size={14} color="rgba(255,255,255,0.7)" />
                        <Text style={styles.visionBadgeText}>VISION_OS_24</Text>
                    </View>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    {/* Hero Module */}
                    <View style={styles.heroSection}>
                        <Animated.Text entering={FadeIn.duration(1500)} style={styles.heroPreTitle}>SPATIAL_IDENTITY</Animated.Text>
                        <Animated.Text entering={FadeInDown.delay(300).duration(1000)} style={styles.name}>{personal_info.name}</Animated.Text>
                        <Animated.Text entering={FadeInDown.delay(500).duration(1000)} style={styles.headline}>{personal_info.headline}</Animated.Text>
                    </View>

                    {/* Stats Cards */}
                    <View style={styles.statsGrid}>
                        {stats.map((stat, i) => (
                            <VisionGlass key={i} style={styles.statItem}>
                                <Text style={styles.statLabel}>{stat.label.toUpperCase()}</Text>
                                <Text style={styles.statValue}>{stat.value}</Text>
                            </VisionGlass>
                        ))}
                    </View>

                    {/* Core Narrative */}
                    <View style={styles.section}>
                        <VisionGlass style={styles.summaryModule}>
                            <View style={styles.moduleHeader}>
                                <Cpu size={20} color="#FFF" />
                                <Text style={styles.moduleTitle}>CORE_PROCESSOR_LOGS</Text>
                            </View>
                            <Text style={styles.summaryText}>{summary}</Text>
                        </VisionGlass>
                    </View>

                    {/* Expertise Grid */}
                    <View style={styles.section}>
                        <Text style={styles.sectionLabel}>TECH_CAPABILITIES</Text>
                        <View style={styles.skillsContainer}>
                            {technical_stack.mobile.concat(technical_stack.frontend).map((skill, i) => (
                                <VisionGlass key={i} style={styles.skillChip} intensity={0.05}>
                                    <Text style={styles.skillText}>{skill}</Text>
                                </VisionGlass>
                            ))}
                        </View>
                    </View>

                    {/* Project Environments */}
                    <View style={styles.section}>
                        <Text style={styles.sectionLabel}>ECOSYSTEM_OUTPUTS</Text>
                        {projects.slice(0, 4).map((p, i) => (
                            <TouchableOpacity key={i} style={styles.projectModule}>
                                <VisionGlass style={styles.projectGlass} intensity={0.1}>
                                    <View style={styles.projectTop}>
                                        <View style={styles.projectInfo}>
                                            <Text style={styles.projectTitle}>{p.name}</Text>
                                            <Text style={styles.projectType}>{p.category.toUpperCase()}</Text>
                                        </View>
                                        <View style={styles.externalIcon}>
                                            <ArrowUpRight size={18} color="#FFF" />
                                        </View>
                                    </View>
                                    <View style={styles.divider} />
                                    <Text style={styles.projectDesc}>{p.description.slice(0, 100)}...</Text>
                                </VisionGlass>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Final Uplink */}
                    <TouchableOpacity style={styles.connectBtn} onPress={() => navigation.goBack()}>
                        <VisionGlass style={styles.connectInternal} intensity={0.3}>
                            <Text style={styles.connectText}>ESTABLISH_PERSISTENT_LINK</Text>
                            <Zap size={20} color="#FFF" fill="#FFF" />
                        </VisionGlass>
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
    lightOrb: {
        position: 'absolute',
        top: -100,
        right: -100,
        width: 400,
        height: 400,
        borderRadius: 200,
        backgroundColor: '#3B82F6',
        opacity: 0.15,
        filter: 'blur(100px)',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingVertical: 16,
    },
    navBtn: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(255,255,255,0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    visionBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingHorizontal: 16,
        paddingVertical: 10,
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    visionBadgeText: {
        fontSize: 10,
        fontWeight: '900',
        color: 'rgba(255,255,255,0.8)',
        letterSpacing: 2,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 60,
    },
    heroSection: {
        alignItems: 'center',
        paddingVertical: 60,
    },
    heroPreTitle: {
        fontSize: 11,
        fontWeight: '900',
        color: '#60A5FA',
        letterSpacing: 6,
        marginBottom: 20,
    },
    name: {
        fontSize: 48,
        fontWeight: '900',
        color: '#FFF',
        textAlign: 'center',
        marginBottom: 24,
        letterSpacing: -1,
    },
    headline: {
        fontSize: 18,
        color: 'rgba(255,255,255,0.6)',
        textAlign: 'center',
        lineHeight: 28,
        fontWeight: '300',
        paddingHorizontal: 20,
    },
    statsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
        marginBottom: 40,
    },
    statItem: {
        flex: 1,
        minWidth: (width - 64) / 2,
        paddingVertical: 24,
    },
    statLabel: {
        fontSize: 9,
        fontWeight: '900',
        color: 'rgba(255,255,255,0.5)',
        textAlign: 'center',
        marginBottom: 8,
        letterSpacing: 1,
    },
    statValue: {
        fontSize: 24,
        fontWeight: '900',
        color: '#FFF',
        textAlign: 'center',
    },
    visionGlass: {
        borderRadius: 30,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.12)',
    },
    glassContent: {
        padding: 24,
    },
    section: {
        marginBottom: 40,
    },
    moduleHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        marginBottom: 20,
    },
    moduleTitle: {
        fontSize: 11,
        fontWeight: '900',
        color: '#FFF',
        letterSpacing: 4,
    },
    summaryText: {
        fontSize: 16,
        color: 'rgba(255,255,255,0.7)',
        lineHeight: 28,
        fontWeight: '300',
    },
    sectionLabel: {
        fontSize: 10,
        fontWeight: '900',
        color: 'rgba(255,255,255,0.4)',
        letterSpacing: 4,
        marginBottom: 24,
        marginLeft: 4,
    },
    skillsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    skillChip: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 20,
    },
    skillText: {
        fontSize: 13,
        fontWeight: '700',
        color: 'rgba(255,255,255,0.9)',
    },
    projectModule: {
        marginBottom: 16,
    },
    projectTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    projectTitle: {
        fontSize: 20,
        fontWeight: '900',
        color: '#FFF',
        marginBottom: 4,
    },
    projectType: {
        fontSize: 9,
        fontWeight: '900',
        color: 'rgba(255,255,255,0.4)',
        letterSpacing: 2,
    },
    externalIcon: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(255,255,255,0.06)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    divider: {
        height: 1,
        backgroundColor: 'rgba(255,255,255,0.1)',
        marginBottom: 20,
    },
    projectDesc: {
        fontSize: 15,
        color: 'rgba(255,255,255,0.6)',
        lineHeight: 24,
        fontWeight: '300',
    },
    connectBtn: {
        marginTop: 20,
    },
    connectInternal: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 24,
        gap: 16,
    },
    connectText: {
        fontSize: 13,
        fontWeight: '900',
        color: '#FFF',
        letterSpacing: 4,
    }
});
