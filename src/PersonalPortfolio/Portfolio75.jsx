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
import { ChevronLeft, ArrowRight, Cpu, Zap, Activity, Shield, Terminal, HardDrive } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { FadeIn, FadeInDown, useAnimatedStyle, withRepeat, withTiming, withSequence, Easing } from 'react-native-reanimated';
import { portfolioprofile } from './portfoliodata';

const { width, height } = Dimensions.get('window');

const CircuitTrace = ({ points, delay }) => {
    const animatedStyle = useAnimatedStyle(() => ({
        opacity: withRepeat(withSequence(withTiming(0.1, { duration: 2000 }), withTiming(0.3, { duration: 2000 })), -1, true),
    }));

    return (
        <Animated.View style={[styles.trace, { top: points.y, left: points.x, width: points.w, height: points.h, transform: [{ rotate: points.r || '0deg' }] }, animatedStyle]} />
    );
};

const Node = ({ x, y, delay }) => {
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: withRepeat(withSequence(withTiming(1, { duration: 1500 }), withTiming(1.5, { duration: 1500 })), -1, true) }],
        opacity: withRepeat(withSequence(withTiming(0.2, { duration: 1500 }), withTiming(0.8, { duration: 1500 })), -1, true),
    }));

    return <Animated.View style={[styles.node, { top: y, left: x }, animatedStyle]} />;
};

const CircuitBackground = () => (
    <View style={StyleSheet.absoluteFill}>
        <LinearGradient colors={['#050110', '#0D0221']} style={StyleSheet.absoluteFill} />
        <CircuitTrace points={{ x: 50, y: 100, w: 200, h: 2 }} />
        <CircuitTrace points={{ x: 250, y: 100, w: 2, h: 300 }} />
        <CircuitTrace points={{ x: 100, y: 400, w: 300, h: 2, r: '45deg' }} />
        <Node x={45} y={95} />
        <Node x={245} y={395} />
        <Node x={width - 50} y={height - 200} />
    </View>
);

export default function Portfolio75({ navigation }) {
    const { personal_info, projects } = portfolioprofile;

    return (
        <View style={styles.container}>
            <CircuitBackground />
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <ChevronLeft size={24} color="#00F3FF" />
                    </TouchableOpacity>
                    <Activity size={24} color="#00F3FF" />
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    <View style={styles.technicalHeader}>
                        <Animated.Text entering={FadeInDown.duration(800)} style={styles.schemaType}>SYSTEM_CORE: V75_QUANTUM</Animated.Text>
                        <Animated.Text entering={FadeInDown.delay(200).duration(800)} style={styles.name}>{personal_info.name.toUpperCase()}</Animated.Text>
                        <Animated.Text entering={FadeInDown.delay(400).duration(800)} style={styles.title}>{personal_info.title.toUpperCase()}</Animated.Text>
                        
                        <View style={styles.statusPanel}>
                            <View style={styles.statusItem}>
                                <Text style={styles.statusLabel}>UPLINK</Text>
                                <Text style={styles.statusValue}>ESTABLISHED</Text>
                            </View>
                            <View style={styles.statusDivider} />
                            <View style={styles.statusItem}>
                                <Text style={styles.statusLabel}>LATENCY</Text>
                                <Text style={styles.statusValue}>12_MS</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.moduleStack}>
                        <TouchableOpacity style={styles.moduleCard}>
                            <View style={styles.moduleInfo}>
                                <Text style={styles.modulePre}>EXECUTE_COMMAND</Text>
                                <Text style={styles.moduleTitle}>INTELLIGENCE_LAYERS</Text>
                            </View>
                            <Zap size={24} color="#00F3FF" fill="#00F3FF" />
                        </TouchableOpacity>

                        {projects.slice(0, 5).map((p, i) => (
                            <TouchableOpacity key={p.name} style={styles.moduleSubCard}>
                                <View style={styles.moduleLead}>
                                    <View style={styles.moduleDot} />
                                    <Text style={styles.moduleText}>{p.name.toUpperCase()}</Text>
                                </View>
                                <ArrowRight size={18} color="#00F3FF" />
                            </TouchableOpacity>
                        ))}

                        <TouchableOpacity style={styles.terminalLink}>
                            <Terminal size={20} color="#00F3FF" />
                            <Text style={styles.terminalLabel}>ACCESS_ROOT_REPOSITORY</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.footer}>
                        <HardDrive size={16} color="rgba(0,243,255,0.2)" />
                        <Text style={styles.footerText}>ENCRYPTION_STATUS: AES_256_ACTIVE</Text>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#050110',
    },
    trace: {
        position: 'absolute',
        backgroundColor: '#00F3FF',
        opacity: 0.2,
    },
    node: {
        position: 'absolute',
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#00F3FF',
        shadowColor: '#00F3FF',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 10,
        elevation: 10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingVertical: 16,
    },
    backBtn: {
        width: 44,
        height: 44,
        borderRadius: 4,
        backgroundColor: 'rgba(0,243,255,0.05)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(0,243,255,0.2)',
    },
    scrollContent: {
        paddingHorizontal: 24,
        paddingBottom: 40,
    },
    technicalHeader: {
        marginVertical: 40,
    },
    schemaType: {
        fontSize: 10,
        fontWeight: '900',
        color: 'rgba(0,243,255,0.4)',
        letterSpacing: 4,
        marginBottom: 16,
    },
    name: {
        fontSize: 44,
        fontWeight: '900',
        color: '#FFF',
        letterSpacing: -1,
    },
    title: {
        fontSize: 14,
        fontWeight: '800',
        color: '#00F3FF',
        letterSpacing: 2,
        marginTop: 8,
    },
    statusPanel: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 32,
        paddingHorizontal: 20,
        paddingVertical: 12,
        backgroundColor: 'rgba(255,255,255,0.02)',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
    },
    statusItem: {
        gap: 4,
    },
    statusLabel: {
        fontSize: 8,
        fontWeight: '900',
        color: 'rgba(255,255,255,0.4)',
        letterSpacing: 1,
    },
    statusValue: {
        fontSize: 10,
        fontWeight: '900',
        color: '#FFF',
        letterSpacing: 1,
    },
    statusDivider: {
        width: 1,
        height: 20,
        backgroundColor: 'rgba(255,255,255,0.1)',
        marginHorizontal: 32,
    },
    moduleStack: {
        width: '100%',
        gap: 12,
    },
    moduleCard: {
        width: '100%',
        backgroundColor: 'rgba(0,243,255,0.05)',
        paddingVertical: 24,
        paddingHorizontal: 24,
        borderRadius: 4,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#00F3FF',
    },
    moduleInfo: {
        gap: 4,
    },
    modulePre: {
        fontSize: 10,
        fontWeight: '900',
        color: 'rgba(255,255,255,0.4)',
        letterSpacing: 2,
    },
    moduleTitle: {
        fontSize: 14,
        fontWeight: '900',
        color: '#FFF',
        letterSpacing: 1,
    },
    moduleSubCard: {
        width: '100%',
        backgroundColor: 'rgba(255,255,255,0.02)',
        paddingVertical: 20,
        paddingHorizontal: 24,
        borderRadius: 4,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
    },
    moduleLead: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    moduleDot: {
        width: 6,
        height: 6,
        backgroundColor: '#00F3FF',
    },
    moduleText: {
        fontSize: 12,
        fontWeight: '700',
        color: 'rgba(255,255,255,0.6)',
        letterSpacing: 1,
    },
    terminalLink: {
        paddingVertical: 24,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 12,
    },
    terminalLabel: {
        fontSize: 12,
        fontWeight: '900',
        color: '#00F3FF',
        letterSpacing: 2,
    },
    footer: {
        marginTop: 40,
        alignItems: 'center',
        gap: 8,
        paddingBottom: 20,
    },
    footerText: {
        fontSize: 8,
        fontWeight: '900',
        color: 'rgba(255,255,255,0.2)',
        letterSpacing: 2,
    }
});
