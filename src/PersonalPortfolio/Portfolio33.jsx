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
import { ChevronLeft, Zap, Cpu, Activity, Shield, ArrowRight, Github, Monitor } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { FadeIn, FadeInDown, SlideInRight, useAnimatedStyle, withRepeat, withTiming, withSequence } from 'react-native-reanimated';
import { portfolioprofile } from './portfoliodata';

const { width, height } = Dimensions.get('window');

const NeonBorder = ({ children, color = '#00F3FF', style }) => (
    <View style={[styles.neonCard, { borderColor: color, shadowColor: color }, style]}>
        {children}
    </View>
);

export default function Portfolio33({ navigation }) {
    const { personal_info, hero, summary, technical_stack, projects } = portfolioprofile;

    const scanLineStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: withRepeat(withTiming(height, { duration: 4000 }), -1, false) }],
    }));

    return (
        <View style={styles.container}>
            <LinearGradient colors={['#050110', '#0D0221', '#14033C']} style={StyleSheet.absoluteFill} />
            <Animated.View style={[styles.scanLine, scanLineStyle]} />

            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.navBtn}>
                        <ChevronLeft size={24} color="#00F3FF" />
                    </TouchableOpacity>
                    <View style={styles.statusDisplay}>
                        <Activity size={14} color="#00F3FF" />
                        <Text style={styles.statusText}>UPLINK_ESTABLISHED_V3.3</Text>
                    </View>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    {/* Hero Module */}
                    <NeonBorder color="#FF00FF" style={styles.heroSection}>
                        <View style={styles.heroHeader}>
                            <Cpu size={16} color="#FF00FF" />
                            <Text style={styles.heroTitle}>CORE_PROCESSOR</Text>
                        </View>
                        <Animated.Text entering={FadeIn.duration(1000)} style={styles.name}>{personal_info.name.toUpperCase()}</Animated.Text>
                        <View style={styles.cyberLine} />
                        <Text style={styles.headline}>{personal_info.headline.toUpperCase()}</Text>
                    </NeonBorder>

                    {/* Data Array (Summary) */}
                    <NeonBorder color="#00F3FF" style={styles.summarySection}>
                        <Text style={styles.sectionLabel}>// DATA_STREAM_MANIFESTO</Text>
                        <Text style={styles.summaryText}>{summary}</Text>
                    </NeonBorder>

                    {/* Tech Augmentations (Skills) */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>TECH_AUGMENTATIONS</Text>
                        <View style={styles.skillsGrid}>
                            {technical_stack.mobile.concat(technical_stack.frontend.slice(0, 3)).map((skill, i) => (
                                <View key={skill} style={styles.skillChip}>
                                    <View style={[styles.chipIndicator, { backgroundColor: i % 2 === 0 ? '#00F3FF' : '#FF00FF' }]} />
                                    <Text style={styles.skillText}>{skill.toUpperCase()}</Text>
                                </View>
                            ))}
                        </View>
                    </View>

                    {/* Active Deployments (Projects) */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>ACTIVE_DEPLOYMENTS</Text>
                        {projects.slice(0, 4).map((p, i) => (
                            <TouchableOpacity key={p.name} style={styles.projectCard}>
                                <LinearGradient 
                                    colors={['rgba(0,243,255,0.05)', 'transparent']} 
                                    style={StyleSheet.absoluteFill}
                                />
                                <View style={styles.projectHeader}>
                                    <Text style={styles.projectIndex}>[0{i + 1}]</Text>
                                    <Text style={styles.projectName}>{p.name.toUpperCase()}</Text>
                                </View>
                                <Text style={styles.projectDesc}>{p.description.slice(0, 100)}...</Text>
                                <View style={styles.projectFooter}>
                                    <Text style={styles.projectType}>{p.category.toUpperCase()}</Text>
                                    <View style={styles.btnGlow}>
                                        <ArrowRight size={18} color="#FFF" />
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Terminal Uplink */}
                    <TouchableOpacity style={styles.connectBtn} onPress={() => navigation.goBack()}>
                        <LinearGradient colors={['#FF00FF', '#7000FF']} style={styles.connectInner}>
                            <Text style={styles.connectText}>ESTABLISH_NEURAL_LINK</Text>
                            <Zap size={24} color="#FFF" />
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
    scanLine: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        backgroundColor: 'rgba(0, 243, 255, 0.1)',
        zIndex: 10,
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
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#00F3FF',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 243, 255, 0.05)',
    },
    statusDisplay: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    statusText: {
        fontSize: 10,
        fontWeight: '900',
        color: '#00F3FF',
        fontFamily: 'monospace',
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 60,
    },
    neonCard: {
        borderWidth: 1,
        borderRadius: 12,
        padding: 24,
        backgroundColor: 'rgba(255, 255, 255, 0.02)',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 10,
        marginBottom: 32,
    },
    heroSection: {
        marginTop: 20,
    },
    heroHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 20,
    },
    heroTitle: {
        fontSize: 10,
        fontWeight: '900',
        color: '#FF00FF',
        letterSpacing: 4,
    },
    name: {
        fontSize: 42,
        fontWeight: '900',
        color: '#FFF',
        letterSpacing: -2,
        marginBottom: 16,
    },
    cyberLine: {
        width: 60,
        height: 4,
        backgroundColor: '#FF00FF',
        marginBottom: 20,
    },
    headline: {
        fontSize: 14,
        fontWeight: '700',
        color: 'rgba(255,255,255,0.7)',
        lineHeight: 22,
        letterSpacing: 1,
    },
    summarySection: {
        padding: 30,
    },
    sectionLabel: {
        fontSize: 11,
        fontWeight: '900',
        color: '#00F3FF',
        marginBottom: 20,
        fontFamily: 'monospace',
    },
    summaryText: {
        fontSize: 16,
        lineHeight: 28,
        color: 'rgba(255,255,255,0.8)',
    },
    section: {
        marginBottom: 40,
    },
    sectionTitle: {
        fontSize: 12,
        fontWeight: '900',
        color: 'rgba(255,255,255,0.4)',
        letterSpacing: 4,
        marginBottom: 24,
        marginLeft: 4,
    },
    skillsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    skillChip: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: 'rgba(255,255,255,0.03)',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
        borderRadius: 4,
    },
    chipIndicator: {
        width: 6,
        height: 6,
        borderRadius: 1,
    },
    skillText: {
        fontSize: 12,
        fontWeight: '900',
        color: '#FFF',
    },
    projectCard: {
        padding: 30,
        backgroundColor: 'rgba(255,255,255,0.02)',
        borderWidth: 1,
        borderColor: 'rgba(0, 243, 255, 0.2)',
        borderRadius: 16,
        marginBottom: 16,
        overflow: 'hidden',
    },
    projectHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        marginBottom: 20,
    },
    projectIndex: {
        fontSize: 12,
        fontWeight: '900',
        color: '#00F3FF',
        fontFamily: 'monospace',
    },
    projectName: {
        fontSize: 22,
        fontWeight: '900',
        color: '#FFF',
    },
    projectDesc: {
        fontSize: 15,
        color: 'rgba(255,255,255,0.6)',
        lineHeight: 24,
        marginBottom: 24,
    },
    projectFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    projectType: {
        fontSize: 10,
        fontWeight: '900',
        color: 'rgba(255,255,255,0.3)',
        letterSpacing: 2,
    },
    btnGlow: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(0, 243, 255, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#00F3FF',
    },
    connectBtn: {
        marginTop: 20,
        borderRadius: 8,
        overflow: 'hidden',
    },
    connectInner: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 24,
        gap: 20,
    },
    connectText: {
        fontSize: 13,
        fontWeight: '900',
        color: '#FFF',
        letterSpacing: 2,
    }
});
