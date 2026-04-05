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
import { ChevronLeft, ArrowRight, Terminal, Github, Code, Cpu, Activity, Zap } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { FadeIn, FadeInDown, useAnimatedStyle, withRepeat, withTiming, withSequence } from 'react-native-reanimated';
import { portfolioprofile } from './portfoliodata';

const { width, height } = Dimensions.get('window');

const BlinkingCursor = () => {
    const animatedStyle = useAnimatedStyle(() => ({
        opacity: withRepeat(withSequence(withTiming(1, { duration: 500 }), withTiming(0, { duration: 500 })), -1, true),
    }));

    return (
        <Animated.View style={[styles.cursor, animatedStyle]} />
    );
};

export default function Portfolio51({ navigation }) {
    const { personal_info, hero, summary, technical_stack, projects } = portfolioprofile;

    return (
        <View style={styles.container}>
            <View style={StyleSheet.absoluteFill}>
                <LinearGradient colors={['#000', '#050505']} style={StyleSheet.absoluteFill} />
                <View style={styles.scanlines} />
            </View>

            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <ChevronLeft size={24} color="#00FF41" />
                    </TouchableOpacity>
                    <View style={styles.headerBadge}>
                        <Terminal size={14} color="#00FF41" />
                        <Text style={styles.headerLabel}>TERMINAL_V51</Text>
                    </View>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    {/* Hero Section */}
                    <View style={styles.heroSection}>
                        <Animated.Text entering={FadeInDown.duration(800)} style={styles.heroPre}>[SYSTEM_INITIATED]</Animated.Text>
                        <Animated.Text entering={FadeInDown.delay(200).duration(800)} style={styles.name}>{personal_info.name.toUpperCase()}</Animated.Text>
                        <View style={styles.heroDivider} />
                        <View style={styles.titleWrap}>
                            <Text style={styles.heroTitle}>${personal_info.title.toUpperCase()}</Text>
                            <BlinkingCursor />
                        </View>
                        <Text style={styles.headline}>"{personal_info.headline.toUpperCase()}"</Text>
                    </View>

                    {/* Summary Section */}
                    <View style={styles.section}>
                        <Text style={styles.sectionHeading}>// MANIFESTO</Text>
                        <View style={styles.terminalWindow}>
                            <View style={styles.windowHeader}>
                                <View style={styles.dot} />
                                <View style={[styles.dot, { backgroundColor: '#FFD700' }]} />
                                <View style={[styles.dot, { backgroundColor: '#FF4D4D' }]} />
                            </View>
                            <Text style={styles.summaryText}>{summary}</Text>
                        </View>
                    </View>

                    {/* Skills Section */}
                    <View style={styles.section}>
                        <Text style={styles.sectionHeading}>// CAPABILITIES_ARRAY</Text>
                        <View style={styles.skillsGrid}>
                            {technical_stack.mobile.concat(technical_stack.frontend.slice(0, 3)).map((skill, i) => (
                                <View key={skill} style={styles.skillBox}>
                                    <View style={styles.skillIndicator} />
                                    <Text style={styles.skillText}>{skill.toUpperCase()}</Text>
                                </View>
                            ))}
                        </View>
                    </View>

                    {/* Projects Section */}
                    <View style={styles.section}>
                        <Text style={styles.sectionHeading}>// ACTIVE_PROCESSES</Text>
                        {projects.slice(0, 4).map((p, i) => (
                            <TouchableOpacity key={p.name} style={styles.projectBlock}>
                                <View style={styles.projectHeader}>
                                    <Text style={styles.projectIndex}>FILE_0{i + 1}</Text>
                                    <Text style={styles.projectName}>{p.name.toUpperCase()}</Text>
                                </View>
                                <Text style={styles.projectDesc}>{p.description.slice(0, 100)}...</Text>
                                <View style={styles.projectFooter}>
                                    <Text style={styles.projectCat}>{p.category.toUpperCase()}</Text>
                                    <View style={styles.arrowIcon}>
                                        <ArrowRight size={20} color="#00FF41" />
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Footer Section */}
                    <TouchableOpacity style={styles.footerBtn} onPress={() => navigation.goBack()}>
                        <View style={styles.footerInner}>
                            <Text style={styles.footerText}>RUN PERSISTENT_CONNECTION.sh</Text>
                            <Zap size={20} color="#00FF41" />
                        </View>
                    </TouchableOpacity>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    scanlines: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'transparent',
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
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#00FF41',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 255, 65, 0.05)',
    },
    headerBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingHorizontal: 16,
        paddingVertical: 10,
        backgroundColor: 'rgba(0, 255, 65, 0.05)',
        borderWidth: 1,
        borderColor: '#00FF41',
    },
    headerLabel: {
        fontSize: 10,
        fontWeight: '900',
        color: '#00FF41',
        fontFamily: 'monospace',
        letterSpacing: 2,
    },
    scrollContent: {
        paddingHorizontal: 24,
        paddingBottom: 60,
    },
    heroSection: {
        paddingVertical: 60,
    },
    heroPre: {
        fontSize: 12,
        fontWeight: '900',
        color: '#00FF41',
        fontFamily: 'monospace',
        letterSpacing: 4,
        marginBottom: 16,
        opacity: 0.6,
    },
    name: {
        fontSize: 52,
        fontWeight: '900',
        color: '#00FF41',
        lineHeight: 52,
        letterSpacing: -2,
        fontFamily: 'monospace',
    },
    heroDivider: {
        width: 40,
        height: 2,
        backgroundColor: '#00FF41',
        marginVertical: 32,
    },
    titleWrap: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 20,
    },
    heroTitle: {
        fontSize: 16,
        fontWeight: '900',
        color: '#00FF41',
        fontFamily: 'monospace',
        letterSpacing: 2,
    },
    cursor: {
        width: 10,
        height: 24,
        backgroundColor: '#00FF41',
    },
    headline: {
        fontSize: 14,
        fontWeight: '900',
        color: 'rgba(0, 255, 65, 0.6)',
        fontFamily: 'monospace',
        letterSpacing: 2,
        lineHeight: 22,
    },
    section: {
        marginBottom: 48,
    },
    sectionHeading: {
        fontSize: 10,
        fontWeight: '900',
        color: 'rgba(0, 255, 65, 0.4)',
        fontFamily: 'monospace',
        letterSpacing: 4,
        marginBottom: 24,
        marginLeft: 10,
    },
    terminalWindow: {
        backgroundColor: 'rgba(0, 255, 65, 0.02)',
        borderWidth: 1,
        borderColor: '#00FF41',
        padding: 30,
        borderRadius: 4,
    },
    windowHeader: {
        flexDirection: 'row',
        gap: 8,
        marginBottom: 24,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#00FF41',
    },
    summaryText: {
        fontSize: 16,
        lineHeight: 28,
        color: '#00FF41',
        fontFamily: 'monospace',
    },
    skillsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    skillBox: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: 'rgba(0, 255, 65, 0.05)',
        borderWidth: 1,
        borderColor: 'rgba(0, 255, 65, 0.2)',
    },
    skillIndicator: {
        width: 8,
        height: 2,
        backgroundColor: '#00FF41',
    },
    skillText: {
        fontSize: 11,
        fontWeight: '900',
        color: '#00FF41',
        fontFamily: 'monospace',
    },
    projectBlock: {
        padding: 30,
        backgroundColor: 'rgba(0, 255, 65, 0.02)',
        borderWidth: 1,
        borderColor: 'rgba(0, 255, 65, 0.1)',
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
        color: 'rgba(0, 255, 65, 0.4)',
        fontFamily: 'monospace',
    },
    projectName: {
        fontSize: 22,
        fontWeight: '900',
        color: '#00FF41',
        fontFamily: 'monospace',
        letterSpacing: -1,
    },
    projectDesc: {
        fontSize: 15,
        color: 'rgba(0, 255, 65, 0.6)',
        lineHeight: 24,
        fontFamily: 'monospace',
        marginBottom: 24,
    },
    projectFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: 'rgba(0, 255, 65, 0.1)',
    },
    projectCat: {
        fontSize: 10,
        fontWeight: '900',
        color: 'rgba(0, 255, 65, 0.3)',
        fontFamily: 'monospace',
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
        backgroundColor: '#00FF41',
        paddingVertical: 24,
        alignItems: 'center',
    },
    footerInner: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    footerText: {
        fontSize: 12,
        fontWeight: '900',
        color: '#000',
        fontFamily: 'monospace',
        letterSpacing: 2,
    }
});
