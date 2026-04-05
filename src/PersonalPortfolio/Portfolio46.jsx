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
import { ChevronLeft, Zap, Target, Activity, Shield, ArrowRight, Github, Monitor, Cpu } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { FadeIn, FadeInDown, useAnimatedStyle, withRepeat, withTiming, withSequence, withDelay } from 'react-native-reanimated';
import { portfolioprofile } from './portfoliodata';

const { width, height } = Dimensions.get('window');

const HolographicScanline = () => {
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: withRepeat(withTiming(height, { duration: 3000 }), -1, false) }],
    }));

    return <Animated.View style={[styles.scanline, animatedStyle]} />;
};

const HolographicCard = ({ children, style }) => (
    <View style={[styles.hologramCard, style]}>
        <View style={styles.hologramInner}>
            {children}
        </View>
        <View style={styles.hologramGlow} />
    </View>
);

export default function Portfolio46({ navigation }) {
    const { personal_info, hero, summary, technical_stack, projects } = portfolioprofile;

    const flickerStyle = useAnimatedStyle(() => ({
        opacity: withRepeat(withSequence(withTiming(1, { duration: 100 }), withTiming(0.8, { duration: 100 })), -1, true),
    }));

    return (
        <View style={styles.container}>
            <LinearGradient colors={['#050110', '#0D0221']} style={StyleSheet.absoluteFill} />
            <HolographicScanline />

            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.navBtn}>
                        <ChevronLeft size={24} color="#00F3FF" />
                    </TouchableOpacity>
                    <View style={styles.hologramBadge}>
                        <Activity size={14} color="#00F3FF" />
                        <Text style={styles.hologramLabel}>HOLOGRAPHIC_OS_46</Text>
                    </View>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    {/* Projection Hero */}
                    <Animated.View style={[styles.heroSection, flickerStyle]}>
                        <HolographicCard style={styles.heroCard}>
                            <View style={styles.heroHeader}>
                                <Cpu size={16} color="#00F3FF" />
                                <Text style={styles.heroBadge}>NEURAL_INTERFACE_OK</Text>
                            </View>
                            <Animated.Text entering={FadeIn.duration(1000)} style={styles.name}>{personal_info.name.toUpperCase()}</Animated.Text>
                            <View style={styles.hologramLine} />
                            <Text style={styles.headline}>{personal_info.headline.toUpperCase()}</Text>
                        </HolographicCard>
                    </Animated.View>

                    {/* Data Array Summary */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>// DATA_ARRAY_NARRATIVE</Text>
                        <HolographicCard>
                            <Text style={styles.summaryText}>{summary}</Text>
                        </HolographicCard>
                    </View>

                    {/* System Augments (Skills) */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>// SYSTEM_AUGMENTS</Text>
                        <View style={styles.skillsGrid}>
                            {technical_stack.mobile.concat(technical_stack.frontend.slice(0, 3)).map((skill, i) => (
                                <View key={skill} style={styles.skillHologram}>
                                    <View style={styles.skillMarker} />
                                    <Text style={styles.skillText}>{skill.toUpperCase()}</Text>
                                </View>
                            ))}
                        </View>
                    </View>

                    {/* Projected Exhibits (Projects) */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>// PROJECTED_EXHIBITS</Text>
                        {projects.slice(0, 4).map((p, i) => (
                            <TouchableOpacity key={p.name} style={styles.projectHologram}>
                                <View style={styles.projectHeader}>
                                    <Text style={styles.projectIndex}>UID_0{i + 1}</Text>
                                    <Text style={styles.projectName}>{p.name.toUpperCase()}</Text>
                                </View>
                                <Text style={styles.projectDesc}>{p.description.slice(0, 100)}...</Text>
                                <View style={styles.projectFooter}>
                                    <Text style={styles.projectCat}>{p.category.toUpperCase()}</Text>
                                    <View style={styles.arrowBox}>
                                        <ArrowRight size={20} color="#00F3FF" />
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Final Uplink */}
                    <TouchableOpacity style={styles.footerBtn} onPress={() => navigation.goBack()}>
                        <LinearGradient colors={['#00F3FF', '#0077FF']} style={styles.footerInner}>
                            <Text style={styles.footerText}>ESTABLISH_UPLINK</Text>
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
    scanline: {
        position: 'absolute',
        left: 0,
        right: 0,
        height: 2,
        backgroundColor: 'rgba(0, 243, 255, 0.15)',
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
    hologramBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingHorizontal: 16,
        paddingVertical: 10,
        backgroundColor: 'rgba(0, 243, 255, 0.05)',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: 'rgba(0, 243, 255, 0.2)',
    },
    hologramLabel: {
        fontSize: 10,
        fontWeight: '900',
        color: '#00F3FF',
        letterSpacing: 2,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 60,
    },
    hologramCard: {
        borderRadius: 4,
        borderWidth: 1,
        borderColor: 'rgba(0, 243, 255, 0.3)',
        backgroundColor: 'rgba(0, 243, 255, 0.02)',
        marginBottom: 32,
    },
    hologramInner: {
        padding: 30,
    },
    hologramGlow: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 1,
        backgroundColor: '#00F3FF',
        shadowColor: '#00F3FF',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 10,
    },
    heroSection: {
        marginTop: 20,
    },
    heroCard: {
        height: 300,
        justifyContent: 'center',
    },
    heroHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 24,
    },
    heroBadge: {
        fontSize: 9,
        fontWeight: '900',
        color: '#00F3FF',
        letterSpacing: 4,
    },
    name: {
        fontSize: 42,
        fontWeight: '900',
        color: '#00F3FF',
        letterSpacing: -2,
        marginBottom: 20,
        textShadowColor: '#00F3FF',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 10,
    },
    hologramLine: {
        width: 40,
        height: 2,
        backgroundColor: '#00F3FF',
        marginBottom: 24,
    },
    headline: {
        fontSize: 14,
        fontWeight: '900',
        color: 'rgba(0, 243, 255, 0.7)',
        letterSpacing: 2,
        lineHeight: 22,
    },
    section: {
        marginBottom: 40,
    },
    sectionTitle: {
        fontSize: 10,
        fontWeight: '900',
        color: 'rgba(0, 243, 255, 0.3)',
        letterSpacing: 4,
        marginBottom: 24,
        marginLeft: 4,
    },
    summaryText: {
        fontSize: 16,
        lineHeight: 28,
        color: 'rgba(0, 243, 255, 0.8)',
    },
    skillsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    skillHologram: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: 'rgba(0, 243, 255, 0.05)',
        borderWidth: 1,
        borderColor: 'rgba(0, 243, 255, 0.2)',
    },
    skillMarker: {
        width: 8,
        height: 2,
        backgroundColor: '#00F3FF',
    },
    skillText: {
        fontSize: 11,
        fontWeight: '900',
        color: '#FFF',
    },
    projectHologram: {
        padding: 30,
        backgroundColor: 'rgba(0, 243, 255, 0.02)',
        borderWidth: 1,
        borderColor: 'rgba(0, 243, 255, 0.1)',
        marginBottom: 16,
    },
    projectHeader: {
        flexDirection: 'row',
        alignItems: 'baseline',
        gap: 16,
        marginBottom: 16,
    },
    projectIndex: {
        fontSize: 10,
        fontWeight: '900',
        color: 'rgba(0, 243, 255, 0.4)',
    },
    projectName: {
        fontSize: 22,
        fontWeight: '900',
        color: '#FFF',
        letterSpacing: -1,
    },
    projectDesc: {
        fontSize: 15,
        color: 'rgba(0, 243, 255, 0.6)',
        lineHeight: 24,
        marginBottom: 24,
    },
    projectFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    projectCat: {
        fontSize: 10,
        fontWeight: '900',
        color: 'rgba(0, 243, 255, 0.3)',
        letterSpacing: 2,
    },
    arrowBox: {
        width: 44,
        height: 44,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#00F3FF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    footerBtn: {
        marginTop: 20,
    },
    footerInner: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 24,
        backgroundColor: '#00F3FF',
        gap: 20,
    },
    footerText: {
        fontSize: 12,
        fontWeight: '900',
        color: '#050110',
        letterSpacing: 2,
    }
});
