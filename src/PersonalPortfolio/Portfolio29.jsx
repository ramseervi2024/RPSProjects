import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    Dimensions,
} from 'react-native';
import { ChevronLeft, Terminal, Cpu, Zap, Activity, ShieldCheck, Mail, Target } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { FadeIn, FadeInDown, useAnimatedStyle, withRepeat, withTiming, withSequence } from 'react-native-reanimated';
import { portfolioprofile } from './portfoliodata';

const { width } = Dimensions.get('window');

const Scanline = () => {
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: withRepeat(withTiming(height, { duration: 5000 }), -1, false) }],
    }));

    return <Animated.View style={[styles.scanline, animatedStyle]} />;
};

const HUDCard = ({ title, children }) => (
    <View style={styles.hudCard}>
        <View style={styles.hudHeader}>
            <Text style={styles.hudTitle}>{title.toUpperCase()}</Text>
            <View style={styles.hudStatus} />
        </View>
        <View style={styles.hudContent}>
            {children}
        </View>
    </View>
);

export default function Portfolio29({ navigation }) {
    const { personal_info, hero, summary, technical_stack, projects } = portfolioprofile;
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date().toLocaleTimeString()), 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <View style={styles.container}>
            <View style={StyleSheet.absoluteFill}>
                <LinearGradient colors={['#000', '#050505', '#000']} style={StyleSheet.absoluteFill} />
                <View style={styles.gridOverlay} />
            </View>

            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.navBtn}>
                        <ChevronLeft size={20} color="#00FF41" />
                    </TouchableOpacity>
                    <View style={styles.sysInfo}>
                        <Text style={styles.sysText}>UPLINK_STABLE // {currentTime}</Text>
                        <Text style={styles.sysText}>IP_SECURED_256BIT</Text>
                    </View>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    {/* Hero HUD */}
                    <View style={styles.heroSection}>
                        <View style={styles.heroHeader}>
                            <Cpu size={16} color="#00FF41" />
                            <Text style={styles.heroLabel}>CENTRAL_CORE_IDENTITY</Text>
                        </View>
                        <Animated.Text entering={FadeIn.duration(1000)} style={styles.name}>{personal_info.name.toUpperCase()}</Animated.Text>
                        <View style={styles.divider} />
                        <Text style={styles.headline}>{personal_info.headline.toUpperCase()}</Text>
                        <View style={styles.statRow}>
                            <View style={styles.stat}>
                                <Text style={styles.statVal}>SYNC_OK</Text>
                                <Text style={styles.statLab}>STATUS</Text>
                            </View>
                            <View style={styles.stat}>
                                <Text style={styles.statVal}>V_2.4.0</Text>
                                <Text style={styles.statLab}>KERNEL</Text>
                            </View>
                        </View>
                    </View>

                    {/* Mission Terminal */}
                    <HUDCard title="Mission_Manifest">
                        <View style={styles.terminal}>
                            <Text style={styles.terminalPrompt}>root@rps projects:~$ cat mission.txt</Text>
                            <Text style={styles.terminalOutput}>{summary}</Text>
                            <Text style={styles.terminalPrompt}>root@rps projects:~$ <View style={styles.cursor} /></Text>
                        </View>
                    </HUDCard>

                    {/* Tech Stack Modules */}
                    <View style={styles.sectionHeader}>
                        <Activity size={14} color="#00FF41" />
                        <Text style={styles.sectionLabel}>CAPABILITIES_ARRAY</Text>
                    </View>
                    <View style={styles.stackGrid}>
                        {technical_stack.mobile.concat(technical_stack.frontend.slice(0, 3)).map((skill) => (
                            <View key={skill} style={styles.stackItem}>
                                <Text style={styles.stackText}>{skill.toUpperCase()}</Text>
                                <View style={styles.progressBar}>
                                    <View style={[styles.progressFill, { width: '85%' }]} />
                                </View>
                            </View>
                        ))}
                    </View>

                    {/* Deployment Logs (Projects) */}
                    <View style={styles.sectionHeader}>
                        <Target size={14} color="#00FF41" />
                        <Text style={styles.sectionLabel}>DEPLOYMENT_LOGS</Text>
                    </View>
                    {projects.slice(0, 4).map((p, i) => (
                        <TouchableOpacity key={p.name} style={styles.projectLog}>
                            <View style={styles.logHeader}>
                                <Text style={styles.logIndex}>LOG_0{i + 1}</Text>
                                <Text style={styles.projectName}>{p.name.toUpperCase()}</Text>
                                <Zap size={14} color="#FFF" />
                            </View>
                            <Text style={styles.projectDesc}>{p.description.slice(0, 100)}...</Text>
                            <View style={styles.logFooter}>
                                <Text style={styles.logType}>{p.category.toUpperCase()}</Text>
                                <Text style={styles.logStatus}>VERIFIED_OK</Text>
                            </View>
                        </TouchableOpacity>
                    ))}

                    {/* Finalization Button */}
                    <TouchableOpacity style={styles.contactBtn} onPress={() => navigation.goBack()}>
                        <Text style={styles.contactText}>ESTABLISH_NEURAL_UPLINK</Text>
                        <ShieldCheck size={20} color="#000" />
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
    gridOverlay: {
        ...StyleSheet.absoluteFillObject,
        opacity: 0.1,
        borderWidth: 0.5,
        borderColor: '#00FF41',
        borderStyle: 'dashed',
    },
    scanline: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        backgroundColor: '#00FF41',
        opacity: 0.1,
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
        borderColor: '#00FF41',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 255, 65, 0.05)',
    },
    sysInfo: {
        alignItems: 'flex-end',
    },
    sysText: {
        fontSize: 9,
        fontWeight: '900',
        color: '#00FF41',
        letterSpacing: 1,
        fontFamily: 'monospace',
    },
    scrollContent: {
        paddingHorizontal: 24,
        paddingBottom: 60,
    },
    heroSection: {
        paddingVertical: 40,
        backgroundColor: 'rgba(0, 255, 65, 0.02)',
        padding: 24,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'rgba(0, 255, 65, 0.1)',
        marginBottom: 40,
    },
    heroHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 16,
    },
    heroLabel: {
        fontSize: 10,
        fontWeight: '900',
        color: '#00FF41',
        letterSpacing: 4,
        fontFamily: 'monospace',
    },
    name: {
        fontSize: 42,
        fontWeight: '900',
        color: '#FFF',
        letterSpacing: -2,
        marginBottom: 16,
    },
    divider: {
        height: 1,
        backgroundColor: 'rgba(0, 255, 65, 0.3)',
        marginBottom: 16,
    },
    headline: {
        fontSize: 14,
        fontWeight: '800',
        color: '#00FF41',
        lineHeight: 22,
        letterSpacing: 1,
        fontFamily: 'monospace',
        marginBottom: 24,
    },
    statRow: {
        flexDirection: 'row',
        gap: 24,
    },
    stat: {
        gap: 4,
    },
    statVal: {
        fontSize: 12,
        fontWeight: '900',
        color: '#FFF',
        fontFamily: 'monospace',
    },
    statLab: {
        fontSize: 8,
        fontWeight: '900',
        color: '#00FF41',
        opacity: 0.5,
    },
    hudCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
        marginBottom: 40,
        overflow: 'hidden',
    },
    hudHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 12,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
    },
    hudTitle: {
        fontSize: 10,
        fontWeight: '900',
        color: '#FFF',
        letterSpacing: 2,
        fontFamily: 'monospace',
    },
    hudStatus: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#00FF41',
    },
    hudContent: {
        padding: 24,
    },
    terminal: {
        gap: 12,
    },
    terminalPrompt: {
        fontSize: 13,
        color: '#00FF41',
        fontFamily: 'monospace',
    },
    terminalOutput: {
        fontSize: 14,
        color: '#DDD',
        lineHeight: 24,
        fontFamily: 'monospace',
    },
    cursor: {
        width: 8,
        height: 16,
        backgroundColor: '#00FF41',
        marginLeft: 4,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 24,
    },
    sectionLabel: {
        fontSize: 11,
        fontWeight: '900',
        color: '#00FF41',
        letterSpacing: 2,
        fontFamily: 'monospace',
    },
    stackGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
        marginBottom: 40,
    },
    stackItem: {
        width: '100%',
        padding: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.02)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
    },
    stackText: {
        fontSize: 12,
        fontWeight: '900',
        color: '#FFF',
        marginBottom: 12,
        fontFamily: 'monospace',
    },
    progressBar: {
        height: 4,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 2,
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#00FF41',
        borderRadius: 2,
    },
    projectLog: {
        padding: 24,
        backgroundColor: '#050505',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        marginBottom: 16,
    },
    logHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 16,
    },
    logIndex: {
        fontSize: 9,
        fontWeight: '900',
        color: '#00FF41',
        fontFamily: 'monospace',
    },
    projectName: {
        fontSize: 18,
        fontWeight: '900',
        color: '#FFF',
        flex: 1,
        fontFamily: 'monospace',
    },
    projectDesc: {
        fontSize: 14,
        color: '#666',
        lineHeight: 22,
        fontFamily: 'monospace',
        marginBottom: 20,
    },
    logFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    logType: {
        fontSize: 9,
        fontWeight: '900',
        color: 'rgba(255, 255, 255, 0.3)',
        letterSpacing: 2,
    },
    logStatus: {
        fontSize: 9,
        fontWeight: '900',
        color: '#00FF41',
        fontFamily: 'monospace',
    },
    contactBtn: {
        marginTop: 20,
        backgroundColor: '#00FF41',
        paddingVertical: 24,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 16,
    },
    contactText: {
        fontSize: 13,
        fontWeight: '900',
        color: '#000',
        letterSpacing: 2,
        fontFamily: 'monospace',
    }
});
