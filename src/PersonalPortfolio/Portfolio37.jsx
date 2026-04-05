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
import { ChevronLeft, Cloud, Sun, Droplet, ArrowRight, Zap, Sparkles } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { FadeIn, FadeInDown, useAnimatedStyle, withRepeat, withTiming, withSequence } from 'react-native-reanimated';
import { portfolioprofile } from './portfoliodata';

const { width, height } = Dimensions.get('window');

const LiquidBlob = ({ style, colors, duration = 8000 }) => {
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            { translateX: withRepeat(withSequence(withTiming(30, { duration }), withTiming(-30, { duration })), -1, true) },
            { translateY: withRepeat(withSequence(withTiming(-30, { duration: duration * 1.2 }), withTiming(30, { duration: duration * 1.2 })), -1, true) },
            { scale: withRepeat(withSequence(withTiming(1.1, { duration: duration * 0.8 }), withTiming(0.9, { duration: duration * 0.8 })), -1, true) }
        ],
    }));

    return (
        <Animated.View style={[styles.blob, style, animatedStyle]}>
            <LinearGradient colors={colors} style={StyleSheet.absoluteFill} />
        </Animated.View>
    );
};

export default function Portfolio37({ navigation }) {
    const { personal_info, hero, summary, technical_stack, projects } = portfolioprofile;

    return (
        <View style={styles.container}>
            <View style={StyleSheet.absoluteFill}>
                <LinearGradient colors={['#EEF2FF', '#E0E7FF']} style={StyleSheet.absoluteFill} />
                <LiquidBlob style={{ top: -100, left: -100, width: 400, height: 400 }} colors={['#A5B4FC', '#818CF8']} />
                <LiquidBlob style={{ bottom: -200, right: -100, width: 500, height: 500 }} colors={['#C084FC', '#A855F7']} duration={12000} />
            </View>

            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.glassBtn}>
                        <ChevronLeft size={24} color="#4338CA" />
                    </TouchableOpacity>
                    <View style={styles.statusChip}>
                        <Droplet size={14} color="#4338CA" fill="#4338CA" opacity={0.2} />
                        <Text style={styles.statusText}>LIQUID_GLASS_v2</Text>
                    </View>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    {/* Hero Glass */}
                    <View style={styles.heroSection}>
                        <View style={styles.glassCard}>
                            <View style={styles.glassOverlay} />
                            <Animated.Text entering={FadeIn.duration(1000)} style={styles.heroPre}>INTERFACE_FLUIDITY</Animated.Text>
                            <Animated.Text entering={FadeInDown.delay(200).duration(1000)} style={styles.name}>{personal_info.name}</Animated.Text>
                            <View style={styles.glassDivider} />
                            <Text style={styles.headline}>{personal_info.headline.toUpperCase()}</Text>
                        </View>
                    </View>

                    {/* Fluid Summary */}
                    <View style={styles.section}>
                        <View style={styles.glassCard}>
                            <View style={styles.glassOverlay} />
                            <Text style={styles.sectionTitle}>THE_FLOW</Text>
                            <Text style={styles.summaryText}>{summary}</Text>
                        </View>
                    </View>

                    {/* Expertise Bubbles */}
                    <View style={styles.section}>
                        <Text style={styles.sectionLabel}>CAPABILITIES_ARRAY</Text>
                        <View style={styles.skillsGrid}>
                            {technical_stack.mobile.concat(technical_stack.frontend.slice(0, 3)).map((skill, i) => (
                                <View key={skill} style={styles.skillGlass}>
                                    <View style={styles.glassOverlay} />
                                    <Text style={styles.skillText}>{skill.toUpperCase()}</Text>
                                </View>
                            ))}
                        </View>
                    </View>

                    {/* Project Wave (Cards) */}
                    <View style={styles.section}>
                        <Text style={styles.sectionLabel}>DEPLOYMENT_EXHIBITS</Text>
                        {projects.slice(0, 4).map((p, i) => (
                            <TouchableOpacity key={p.name} style={styles.projectGlass}>
                                <View style={styles.glassOverlay} />
                                <View style={styles.projectHeader}>
                                    <View style={[styles.projectDot, { backgroundColor: i % 2 === 0 ? '#818CF8' : '#C084FC' }]} />
                                    <Text style={styles.projectName}>{p.name.toUpperCase()}</Text>
                                </View>
                                <Text style={styles.projectDesc}>{p.description.slice(0, 100)}...</Text>
                                <View style={styles.projectFooter}>
                                    <Text style={styles.projectCat}>{p.category.toUpperCase()}</Text>
                                    <View style={styles.btnArrow}>
                                        <ArrowRight size={18} color="#4338CA" />
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Contact Translucence */}
                    <TouchableOpacity style={styles.footerBtn} onPress={() => navigation.goBack()}>
                        <LinearGradient colors={['rgba(255,255,255,0.4)', 'rgba(255,255,255,0.2)']} style={styles.footerInner}>
                            <Text style={styles.footerText}>ESTABLISH_UPLINK</Text>
                            <Sparkles size={20} color="#4338CA" fill="#4338CA" opacity={0.3} />
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
    blob: {
        position: 'absolute',
        borderRadius: 300,
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
        backgroundColor: 'rgba(255,255,255,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.5)',
    },
    statusChip: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingHorizontal: 16,
        paddingVertical: 10,
        backgroundColor: 'rgba(255,255,255,0.3)',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.4)',
    },
    statusText: {
        fontSize: 10,
        fontWeight: '900',
        color: '#4338CA',
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
        borderColor: 'rgba(255,255,255,0.5)',
    },
    glassOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(255,255,255,0.2)',
    },
    heroSection: {
        marginBottom: 40,
    },
    heroPre: {
        fontSize: 11,
        fontWeight: '900',
        color: '#4338CA',
        letterSpacing: 4,
        marginBottom: 20,
        opacity: 0.6,
    },
    name: {
        fontSize: 48,
        fontWeight: '900',
        color: '#1E1B4B',
        lineHeight: 52,
        letterSpacing: -2,
        marginBottom: 24,
    },
    glassDivider: {
        width: 40,
        height: 4,
        backgroundColor: '#4338CA',
        marginBottom: 24,
        borderRadius: 2,
    },
    headline: {
        fontSize: 14,
        fontWeight: '900',
        color: '#4338CA',
        letterSpacing: 1,
        lineHeight: 22,
    },
    section: {
        marginBottom: 40,
    },
    sectionLabel: {
        fontSize: 10,
        fontWeight: '900',
        color: 'rgba(67, 56, 202, 0.4)',
        letterSpacing: 4,
        marginBottom: 24,
        marginLeft: 4,
    },
    sectionTitle: {
        fontSize: 11,
        fontWeight: '900',
        color: '#4338CA',
        letterSpacing: 4,
        marginBottom: 24,
    },
    summaryText: {
        fontSize: 16,
        lineHeight: 28,
        color: '#312E81',
    },
    skillsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    skillGlass: {
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderRadius: 20,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.5)',
    },
    skillText: {
        fontSize: 12,
        fontWeight: '900',
        color: '#4338CA',
    },
    projectGlass: {
        padding: 30,
        borderRadius: 32,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.5)',
        marginBottom: 16,
    },
    projectHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        marginBottom: 16,
    },
    projectDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
    },
    projectName: {
        fontSize: 18,
        fontWeight: '900',
        color: '#1E1B4B',
    },
    projectDesc: {
        fontSize: 15,
        color: '#4338CA80',
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
        color: '#4338CA60',
        letterSpacing: 2,
    },
    btnArrow: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(255,255,255,0.6)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.8)',
    },
    footerBtn: {
        marginTop: 20,
        borderRadius: 32,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.5)',
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
        color: '#4338CA',
        letterSpacing: 2,
    }
});
