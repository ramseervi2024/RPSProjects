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
import { ChevronLeft, Sparkles, Wind, Droplets, ArrowRight, Zap, Target } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { FadeIn, FadeInDown, useAnimatedStyle, withRepeat, withTiming, withSequence, Easing } from 'react-native-reanimated';
import { portfolioprofile } from './portfoliodata';

const { width, height } = Dimensions.get('window');

const AuroraBlob = ({ colors, style, duration = 10000 }) => {
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            { translateX: withRepeat(withSequence(withTiming(40, { duration, easing: Easing.inOut(Easing.sin) }), withTiming(-40, { duration, easing: Easing.inOut(Easing.sin) })), -1, true) },
            { scale: withRepeat(withSequence(withTiming(1.2, { duration: duration * 0.8 }), withTiming(0.8, { duration: duration * 0.8 })), -1, true) }
        ],
        opacity: withRepeat(withSequence(withTiming(0.6, { duration: duration * 0.5 }), withTiming(0.3, { duration: duration * 0.5 })), -1, true),
    }));

    return (
        <Animated.View style={[styles.aurora, style, animatedStyle]}>
            <LinearGradient colors={colors} style={StyleSheet.absoluteFill} />
        </Animated.View>
    );
};

export default function Portfolio45({ navigation }) {
    const { personal_info, hero, summary, technical_stack, projects } = portfolioprofile;

    return (
        <View style={styles.container}>
            <View style={StyleSheet.absoluteFill}>
                <LinearGradient colors={['#0F172A', '#1E293B']} style={StyleSheet.absoluteFill} />
                <AuroraBlob colors={['#22D3EE', 'transparent']} style={{ top: -100, left: -200, width: 600, height: 600, borderRadius: 300 }} />
                <AuroraBlob colors={['#818CF8', 'transparent']} style={{ bottom: -200, right: -100, width: 500, height: 500, borderRadius: 250 }} duration={12000} />
                <AuroraBlob colors={['#EC4899', 'transparent']} style={{ top: '30%', right: -150, width: 400, height: 400, borderRadius: 200 }} duration={15000} />
            </View>

            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.glassBtn}>
                        <ChevronLeft size={24} color="#FFF" />
                    </TouchableOpacity>
                    <View style={styles.auroraBadge}>
                        <Sparkles size={14} color="#FFF" />
                        <Text style={styles.auroraLabel}>AURORA_MESH / 045</Text>
                    </View>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    {/* Aurora Hero Card */}
                    <View style={styles.heroSection}>
                        <View style={styles.glassCard}>
                            <View style={styles.glassOverlay} />
                            <Animated.Text entering={FadeIn.duration(1000)} style={styles.heroPre}>ATMOSPHERIC_IDENTITY</Animated.Text>
                            <Animated.Text entering={FadeInDown.delay(200).duration(1000)} style={styles.name}>{personal_info.name.toUpperCase()}</Animated.Text>
                            <View style={styles.glassLine} />
                            <Text style={styles.headline}>{personal_info.headline.toUpperCase()}</Text>
                        </View>
                    </View>

                    {/* Fluid Summary */}
                    <View style={styles.section}>
                        <View style={styles.glassCard}>
                            <View style={styles.glassOverlay} />
                            <Text style={styles.sectionTitle}>THE_MANIFESTO</Text>
                            <Text style={styles.summaryText}>{summary}</Text>
                        </View>
                    </View>

                    {/* Luminous Expertise */}
                    <View style={styles.section}>
                        <Text style={styles.sectionHeading}>AURORA_CAPABILITIES</Text>
                        <View style={styles.skillsGrid}>
                            {technical_stack.mobile.concat(technical_stack.frontend.slice(0, 3)).map((skill, i) => (
                                <View key={skill} style={styles.skillGlass}>
                                    <View style={styles.glassOverlay} />
                                    <View style={[styles.skillIndicator, { backgroundColor: i % 2 === 0 ? '#22D3EE' : '#EC4899' }]} />
                                    <Text style={styles.skillText}>{skill.toUpperCase()}</Text>
                                </View>
                            ))}
                        </View>
                    </View>

                    {/* Shimmering Projects */}
                    <View style={styles.section}>
                        <Text style={styles.sectionHeading}>ATMOSPHERIC_EXHIBITS</Text>
                        {projects.slice(0, 4).map((p, i) => (
                            <TouchableOpacity key={p.name} style={styles.projectGlass}>
                                <View style={styles.glassOverlay} />
                                <View style={styles.projectTop}>
                                    <View style={styles.projectIndexBox}>
                                        <Text style={styles.projectIndex}>0{i + 1}</Text>
                                    </View>
                                    <Text style={styles.projectName}>{p.name.toUpperCase()}</Text>
                                </View>
                                <Text style={styles.projectDesc}>{p.description.slice(0, 100)}...</Text>
                                <View style={styles.projectFooter}>
                                    <Text style={styles.projectCat}>{p.category.toUpperCase()}</Text>
                                    <View style={styles.arrowGlow}>
                                        <ArrowRight size={20} color="#FFF" />
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Final Radiance */}
                    <TouchableOpacity style={styles.footerBtn} onPress={() => navigation.goBack()}>
                        <LinearGradient colors={['#22D3EE', '#818CF8']} style={styles.footerInner}>
                            <Text style={styles.footerText}>INITIATE_RADIANT_LINK</Text>
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
    aurora: {
        position: 'absolute',
        opacity: 0.4,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingVertical: 16,
    },
    glassBtn: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: 'rgba(255,255,255,0.05)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    auroraBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingHorizontal: 16,
        paddingVertical: 10,
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: 20,
    },
    auroraLabel: {
        fontSize: 10,
        fontWeight: '900',
        color: '#FFF',
        letterSpacing: 2,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 60,
        paddingTop: 20,
    },
    glassCard: {
        padding: 40,
        borderRadius: 32,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
        backgroundColor: 'transparent',
    },
    glassOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(255,255,255,0.03)',
    },
    heroSection: {
        marginBottom: 40,
    },
    heroPre: {
        fontSize: 10,
        fontWeight: '900',
        color: 'rgba(255,255,255,0.3)',
        letterSpacing: 4,
        marginBottom: 20,
    },
    name: {
        fontSize: 48,
        fontWeight: '900',
        color: '#FFF',
        lineHeight: 52,
        letterSpacing: -2,
        marginBottom: 24,
    },
    glassLine: {
        width: 40,
        height: 4,
        backgroundColor: '#FFF',
        marginBottom: 24,
        borderRadius: 2,
        opacity: 0.8,
    },
    headline: {
        fontSize: 14,
        fontWeight: '900',
        color: 'rgba(255,255,255,0.6)',
        letterSpacing: 2,
    },
    section: {
        marginBottom: 40,
    },
    sectionHeading: {
        fontSize: 10,
        fontWeight: '900',
        color: 'rgba(255,255,255,0.2)',
        letterSpacing: 4,
        marginBottom: 24,
        marginLeft: 4,
    },
    sectionTitle: {
        fontSize: 11,
        fontWeight: '900',
        color: 'rgba(255,255,255,0.4)',
        letterSpacing: 4,
        marginBottom: 24,
    },
    summaryText: {
        fontSize: 17,
        lineHeight: 30,
        color: 'rgba(255,255,255,0.8)',
    },
    skillsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    skillGlass: {
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderRadius: 24,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    skillIndicator: {
        width: 6,
        height: 6,
        borderRadius: 3,
    },
    skillText: {
        fontSize: 11,
        fontWeight: '900',
        color: '#FFF',
    },
    projectGlass: {
        padding: 30,
        borderRadius: 32,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
        marginBottom: 16,
    },
    projectTop: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        marginBottom: 20,
    },
    projectIndexBox: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: 'rgba(255,255,255,0.05)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    projectIndex: {
        fontSize: 12,
        fontWeight: '900',
        color: 'rgba(255,255,255,0.3)',
    },
    projectName: {
        fontSize: 22,
        fontWeight: '900',
        color: '#FFF',
        letterSpacing: -1,
    },
    projectDesc: {
        fontSize: 15,
        color: 'rgba(255,255,255,0.5)',
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
        color: 'rgba(255,255,255,0.2)',
        letterSpacing: 2,
    },
    arrowGlow: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(255,255,255,0.05)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    footerBtn: {
        marginTop: 20,
        borderRadius: 32,
        overflow: 'hidden',
    },
    footerInner: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 24,
        gap: 20,
    },
    footerText: {
        fontSize: 12,
        fontWeight: '900',
        color: '#FFF',
        letterSpacing: 2,
    }
});
