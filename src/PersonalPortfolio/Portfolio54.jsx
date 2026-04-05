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
import { ChevronLeft, ArrowRight, Zap, Sparkles, Activity, Shield, Target, Moon } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { FadeIn, FadeInDown, useAnimatedStyle, withRepeat, withTiming, withSequence } from 'react-native-reanimated';
import { portfolioprofile } from './portfoliodata';

const { width, height } = Dimensions.get('window');

const NeonBorder = ({ children, color = '#00F3FF' }) => (
    <View style={[styles.neonBorder, { borderColor: color, shadowColor: color }]}>
        {children}
    </View>
);

export default function Portfolio54({ navigation }) {
    const { personal_info, hero, summary, technical_stack, projects } = portfolioprofile;

    const flickerStyle = useAnimatedStyle(() => ({
        opacity: withRepeat(withSequence(withTiming(1, { duration: 100 }), withTiming(0.8, { duration: 100 })), -1, true),
    }));

    return (
        <View style={styles.container}>
            <LinearGradient colors={['#050110', '#0D0221']} style={StyleSheet.absoluteFill} />
            <View style={styles.glowHalo} />

            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <ChevronLeft size={24} color="#FFF" />
                    </TouchableOpacity>
                    <View style={styles.headerBadge}>
                        <Moon size={14} color="#BD00FF" />
                        <Text style={styles.headerLabel}>MIDNIGHT_NEON_V54</Text>
                    </View>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    {/* Hero Section */}
                    <View style={styles.heroSection}>
                        <Animated.View style={[styles.heroNeon, flickerStyle]}>
                            <NeonBorder color="#BD00FF">
                                <View style={styles.heroInner}>
                                    <Animated.Text entering={FadeInDown.duration(800)} style={styles.heroPre}>SYSTEM_ACTIVE</Animated.Text>
                                    <Animated.Text entering={FadeInDown.delay(200).duration(800)} style={styles.name}>{personal_info.name.toUpperCase()}</Animated.Text>
                                    <View style={styles.heroDivider} />
                                    <Text style={styles.headline}>{personal_info.headline.toUpperCase()}</Text>
                                </View>
                            </NeonBorder>
                        </Animated.View>
                    </View>

                    {/* Summary Section */}
                    <View style={styles.section}>
                        <Text style={styles.sectionHeading}>// DATA_STREAM_01: NARRATIVE</Text>
                        <NeonBorder color="#00F3FF">
                            <View style={styles.cardInner}>
                                <View style={styles.cardHeader}>
                                    <Text style={styles.cardTitle}>MANIFESTO</Text>
                                    <Activity size={20} color="#00F3FF" opacity={0.5} />
                                </View>
                                <Text style={styles.summaryText}>{summary}</Text>
                            </View>
                        </NeonBorder>
                    </View>

                    {/* Skills Section */}
                    <View style={styles.section}>
                        <Text style={styles.sectionHeading}>// DATA_STREAM_02: CAPABILITIES</Text>
                        <View style={styles.skillsGrid}>
                            {technical_stack.mobile.concat(technical_stack.frontend.slice(0, 3)).map((skill, i) => (
                                <View key={skill} style={styles.skillNeon}>
                                    <View style={[styles.skillIndicator, { backgroundColor: i % 2 === 0 ? '#BD00FF' : '#00F3FF' }]} />
                                    <Text style={styles.skillText}>{skill.toUpperCase()}</Text>
                                </View>
                            ))}
                        </View>
                    </View>

                    {/* Projects Section */}
                    <View style={styles.section}>
                        <Text style={styles.sectionHeading}>// DATA_STREAM_03: ARTIFACTS</Text>
                        {projects.slice(0, 4).map((p, i) => (
                            <TouchableOpacity key={p.name} style={styles.projectNeon}>
                                <NeonBorder color={i % 2 === 0 ? '#BD00FF' : '#00F3FF'}>
                                    <View style={styles.projectInner}>
                                        <View style={styles.projectHeader}>
                                            <Text style={styles.projectIndex}>UID_0{i + 1}</Text>
                                            <Text style={styles.projectName}>{p.name.toUpperCase()}</Text>
                                        </View>
                                        <Text style={styles.projectDesc}>{p.description.slice(0, 100)}...</Text>
                                        <View style={styles.projectFooter}>
                                            <Text style={styles.projectCat}>{p.category.toUpperCase()}</Text>
                                            <View style={styles.arrowIcon}>
                                                <ArrowRight size={20} color="#FFF" />
                                            </View>
                                        </View>
                                    </View>
                                </NeonBorder>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Footer Section */}
                    <TouchableOpacity style={styles.footerBtn} onPress={() => navigation.goBack()}>
                        <LinearGradient colors={['#BD00FF', '#00F3FF']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.footerInner}>
                            <Text style={styles.footerText}>ESTABLISH_NEURAL_LINK</Text>
                            <Zap size={20} color="#FFF" />
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
    glowHalo: {
        position: 'absolute',
        top: -100,
        right: -100,
        width: 400,
        height: 400,
        borderRadius: 200,
        backgroundColor: '#BD00FF',
        opacity: 0.1,
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
        backgroundColor: 'rgba(255,255,255,0.05)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    headerBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingHorizontal: 16,
        paddingVertical: 10,
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    headerLabel: {
        fontSize: 10,
        fontWeight: '900',
        color: '#BD00FF',
        letterSpacing: 2,
    },
    scrollContent: {
        paddingHorizontal: 24,
        paddingBottom: 60,
    },
    heroSection: {
        paddingVertical: 60,
    },
    heroNeon: {
        borderRadius: 8,
        overflow: 'hidden',
    },
    neonBorder: {
        borderWidth: 2,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 10,
        backgroundColor: 'rgba(255,255,255,0.02)',
    },
    heroInner: {
        padding: 40,
        alignItems: 'center',
    },
    heroPre: {
        fontSize: 11,
        fontWeight: '900',
        color: '#BD00FF',
        letterSpacing: 4,
        marginBottom: 20,
    },
    name: {
        fontSize: 52,
        fontWeight: '900',
        color: '#FFF',
        textAlign: 'center',
        lineHeight: 52,
        letterSpacing: -2,
    },
    heroDivider: {
        width: 40,
        height: 4,
        backgroundColor: '#00F3FF',
        marginVertical: 32,
    },
    headline: {
        fontSize: 14,
        fontWeight: '900',
        color: 'rgba(255,255,255,0.6)',
        textAlign: 'center',
        letterSpacing: 4,
        lineHeight: 22,
    },
    section: {
        marginBottom: 48,
    },
    sectionHeading: {
        fontSize: 10,
        fontWeight: '900',
        color: 'rgba(255,255,255,0.2)',
        letterSpacing: 4,
        marginBottom: 24,
        marginLeft: 10,
    },
    cardInner: {
        padding: 30,
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
        color: 'rgba(255,255,255,0.4)',
        letterSpacing: 4,
    },
    summaryText: {
        fontSize: 16,
        lineHeight: 28,
        color: 'rgba(255,255,255,0.8)',
    },
    skillsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    skillNeon: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingHorizontal: 20,
        paddingVertical: 14,
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
        borderRadius: 4,
    },
    skillIndicator: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    skillText: {
        fontSize: 12,
        fontWeight: '900',
        color: '#FFF',
    },
    projectNeon: {
        marginBottom: 20,
    },
    projectInner: {
        padding: 30,
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
        color: 'rgba(255,255,255,0.4)',
    },
    projectName: {
        fontSize: 22,
        fontWeight: '900',
        color: '#FFF',
        letterSpacing: -1,
    },
    projectDesc: {
        fontSize: 16,
        color: 'rgba(255,255,255,0.6)',
        lineHeight: 24,
        marginBottom: 24,
    },
    projectFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: 'rgba(255,255,255,0.1)',
    },
    projectCat: {
        fontSize: 10,
        fontWeight: '900',
        color: 'rgba(255,255,255,0.4)',
        letterSpacing: 2,
    },
    arrowIcon: {
        width: 44,
        height: 44,
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
        gap: 20,
    },
    footerText: {
        fontSize: 12,
        fontWeight: '900',
        color: '#FFF',
        letterSpacing: 2,
    }
});
