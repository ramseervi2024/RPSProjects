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
import { ChevronLeft, ArrowRight, Sparkles, Droplets, Zap, Sun, Target } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { FadeIn, FadeInDown, useAnimatedStyle, withRepeat, withTiming, withSequence, Easing } from 'react-native-reanimated';
import { portfolioprofile } from './portfoliodata';

const { width, height } = Dimensions.get('window');

const GradientMesh = ({ colors, style, duration = 10000 }) => {
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            { translateX: withRepeat(withSequence(withTiming(50, { duration, easing: Easing.inOut(Easing.sin) }), withTiming(-50, { duration, easing: Easing.inOut(Easing.sin) })), -1, true) },
            { scale: withRepeat(withSequence(withTiming(1.3, { duration: duration * 1.2 }), withTiming(0.7, { duration: duration * 1.2 })), -1, true) }
        ],
        opacity: withRepeat(withSequence(withTiming(0.6, { duration: duration * 0.8 }), withTiming(0.4, { duration: duration * 0.8 })), -1, true),
    }));

    return (
        <Animated.View style={[styles.meshField, style, animatedStyle]}>
            <LinearGradient colors={colors} style={StyleSheet.absoluteFill} />
        </Animated.View>
    );
};

export default function Portfolio56({ navigation }) {
    const { personal_info, hero, summary, technical_stack, projects } = portfolioprofile;

    return (
        <View style={styles.container}>
            <View style={StyleSheet.absoluteFill}>
                <LinearGradient colors={['#EEF2FF', '#E0E7FF']} style={StyleSheet.absoluteFill} />
                <GradientMesh colors={['#A5B4FC', 'transparent']} style={{ top: -100, left: -200, width: 600, height: 600, borderRadius: 300 }} />
                <GradientMesh colors={['#C084FC', 'transparent']} style={{ bottom: -200, right: -100, width: 500, height: 500, borderRadius: 250 }} duration={12000} />
                <GradientMesh colors={['#818CF8', 'transparent']} style={{ top: '40%', right: -150, width: 400, height: 400, borderRadius: 200 }} duration={15000} />
            </View>

            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <ChevronLeft size={24} color="#4338CA" />
                    </TouchableOpacity>
                    <View style={styles.headerBadge}>
                        <Sparkles size={14} color="#4338CA" />
                        <Text style={styles.headerLabel}>GRADIENT_MESH_V56</Text>
                    </View>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    {/* Hero Section */}
                    <View style={styles.heroSection}>
                        <View style={styles.glassCard}>
                            <View style={styles.glassOverlay} />
                            <Animated.Text entering={FadeInDown.duration(800)} style={styles.heroPre}>VIBRANT_DIMENSION</Animated.Text>
                            <Animated.Text entering={FadeInDown.delay(200).duration(800)} style={styles.name}>{personal_info.name.toUpperCase()}</Animated.Text>
                            <View style={styles.heroDivider} />
                            <Text style={styles.headline}>{personal_info.headline.toUpperCase()}</Text>
                        </View>
                    </View>

                    {/* Summary Section */}
                    <View style={styles.section}>
                        <View style={styles.glassCard}>
                            <View style={styles.glassOverlay} />
                            <View style={styles.cardHeader}>
                                <Text style={styles.cardTitle}>THE_NARRATIVE</Text>
                                <Droplets size={20} color="#4338CA" opacity={0.3} />
                            </View>
                            <Text style={styles.summaryText}>{summary}</Text>
                        </View>
                    </View>

                    {/* Expertise Section */}
                    <View style={styles.section}>
                        <Text style={styles.sectionHeading}>TECHNICAL_UPLINKS</Text>
                        <View style={styles.skillsGrid}>
                            {technical_stack.mobile.concat(technical_stack.frontend.slice(0, 3)).map((skill, i) => (
                                <View key={skill} style={styles.skillGlass}>
                                    <View style={styles.glassOverlay} />
                                    <View style={[styles.skillIndicator, { backgroundColor: i % 2 === 0 ? '#A5B4FC' : '#C084FC' }]} />
                                    <Text style={styles.skillText}>{skill.toUpperCase()}</Text>
                                </View>
                            ))}
                        </View>
                    </View>

                    {/* Projects Section */}
                    <View style={styles.section}>
                        <Text style={styles.sectionHeading}>ATMOSPHERIC_EXHIBITS</Text>
                        {projects.slice(0, 4).map((p, i) => (
                            <TouchableOpacity key={p.name} style={styles.projectGlass}>
                                <View style={styles.glassOverlay} />
                                <View style={styles.projectHeader}>
                                    <View style={styles.projectIndexBox}>
                                        <Text style={styles.projectIndex}>0{i + 1}</Text>
                                    </View>
                                    <Text style={styles.projectName}>{p.name.toUpperCase()}</Text>
                                </View>
                                <Text style={styles.projectDesc}>{p.description.slice(0, 100)}...</Text>
                                <View style={styles.projectFooter}>
                                    <Text style={styles.projectCat}>{p.category.toUpperCase()}</Text>
                                    <View style={styles.arrowIcon}>
                                        <ArrowRight size={20} color="#4338CA" />
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Footer Section */}
                    <TouchableOpacity style={styles.footerBtn} onPress={() => navigation.goBack()}>
                        <LinearGradient colors={['#A5B4FC', '#C084FC']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.footerInner}>
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
    meshField: {
        position: 'absolute',
        opacity: 0.5,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingVertical: 16,
    },
    backBtn: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: 'rgba(255,255,255,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.5)',
    },
    headerBadge: {
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
    headerLabel: {
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
    heroSection: {
        marginBottom: 40,
    },
    glassCard: {
        padding: 40,
        borderRadius: 32,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.5)',
        backgroundColor: 'transparent',
    },
    glassOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(255,255,255,0.1)',
    },
    heroPre: {
        fontSize: 10,
        fontWeight: '900',
        color: 'rgba(67, 56, 202, 0.5)',
        letterSpacing: 4,
        marginBottom: 20,
    },
    name: {
        fontSize: 48,
        fontWeight: '900',
        color: '#1E1B4B',
        lineHeight: 52,
        letterSpacing: -2,
        marginBottom: 24,
    },
    heroDivider: {
        width: 40,
        height: 4,
        backgroundColor: '#4338CA',
        marginBottom: 24,
        borderRadius: 2,
        opacity: 0.8,
    },
    headline: {
        fontSize: 14,
        fontWeight: '900',
        color: 'rgba(67, 56, 202, 0.7)',
        letterSpacing: 2,
        lineHeight: 22,
    },
    section: {
        marginBottom: 40,
    },
    sectionHeading: {
        fontSize: 10,
        fontWeight: '900',
        color: 'rgba(67, 56, 202, 0.3)',
        letterSpacing: 4,
        marginBottom: 24,
        marginLeft: 4,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    cardTitle: {
        fontSize: 11,
        fontWeight: '900',
        color: 'rgba(67, 56, 202, 0.5)',
        letterSpacing: 4,
    },
    summaryText: {
        fontSize: 17,
        lineHeight: 30,
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
        color: '#4338CA',
    },
    projectGlass: {
        padding: 30,
        borderRadius: 32,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
        marginBottom: 16,
    },
    projectHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        marginBottom: 20,
    },
    projectIndexBox: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: 'rgba(255,255,255,0.1)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    projectIndex: {
        fontSize: 12,
        fontWeight: '900',
        color: 'rgba(67, 56, 202, 0.4)',
    },
    projectName: {
        fontSize: 22,
        fontWeight: '900',
        color: '#1E1B4B',
        letterSpacing: -1,
    },
    projectDesc: {
        fontSize: 15,
        color: 'rgba(67, 56, 202, 0.6)',
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
        color: 'rgba(67, 56, 202, 0.3)',
        letterSpacing: 2,
    },
    arrowIcon: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(255,255,255,0.5)',
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
