import React, { useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Cpu, Terminal, Bot, Zap, ChevronLeft, MessageSquare, Shield, Activity } from 'lucide-react-native';
import Animated, { FadeIn, FadeInDown, useAnimatedStyle, withRepeat, withTiming, withSequence, useSharedValue } from 'react-native-reanimated';
import { portfolioprofile } from './portfoliodata';

const { width } = Dimensions.get('window');

const NeonBox = ({ children, style, color = '#06B6D4' }) => (
    <View style={[styles.neonBox, { borderColor: color, shadowColor: color }, style]}>
        {children}
    </View>
);

export default function Portfolio9({ navigation }) {
    const { personal_info, hero, technical_stack, projects } = portfolioprofile;

    const scanLinePos = useSharedValue(-100);

    useEffect(() => {
        scanLinePos.value = withRepeat(withTiming(height, { duration: 3000 }), -1, false);
    }, []);

    const scanLineStyle = useAnimatedStyle(() => ({
        top: scanLinePos.value,
    }));

    return (
        <View style={styles.container}>
            <View style={styles.bgDark} />
            <LinearGradient colors={['rgba(6, 182, 212, 0.05)', 'transparent']} style={StyleSheet.absoluteFill} />
            
            {/* Scanline Effect */}
            <Animated.View style={[styles.scanline, scanLineStyle]} />

            <SafeAreaView style={styles.safeArea}>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
                    
                    {/* Neural Header */}
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                            <ChevronLeft size={20} color="#06B6D4" />
                        </TouchableOpacity>
                        <View style={styles.headerLabel}>
                            <Activity size={12} color="#06B6D4" />
                            <Text style={styles.headerText}>SYSTEM.READY_</Text>
                        </View>
                    </View>

                    {/* AI Chat Hero */}
                    <View style={styles.heroSection}>
                        <View style={styles.aiMessage}>
                            <Bot size={24} color="#06B6D4" />
                            <View style={styles.aiBubble}>
                                <Text style={styles.aiText}>INITIALIZING ARCHITECT PROFILE...</Text>
                            </View>
                        </View>

                        <Animated.View entering={FadeIn.duration(1000)} style={styles.mainDisplay}>
                            <Text style={styles.displayName}>{personal_info.name.toUpperCase()}</Text>
                            <Text style={styles.displayRole}>{personal_info.title.toUpperCase()}</Text>
                            <View style={styles.neonDivider} />
                            <Text style={styles.displayHero}>{hero.title}</Text>
                        </Animated.View>

                        <View style={styles.userResponse}>
                            <View style={styles.userBubble}>
                                <Text style={styles.userText}>Show me the core data.</Text>
                            </View>
                        </View>
                    </View>

                    {/* Tech Matrix */}
                    <View style={styles.section}>
                        <View style={styles.sectionTitleRow}>
                            <Terminal size={18} color="#06B6D4" />
                            <Text style={styles.sectionTitle}>CORE_MATRIX</Text>
                        </View>
                        <View style={styles.matrixGrid}>
                            {technical_stack.mobile.map((skill, index) => (
                                <NeonBox key={index} style={styles.matrixItem}>
                                    <Cpu size={16} color="#06B6D4" />
                                    <Text style={styles.matrixText}>{skill}</Text>
                                </NeonBox>
                            ))}
                        </View>
                    </View>

                    {/* Encrypted Projects */}
                    <View style={styles.section}>
                        <View style={styles.sectionTitleRow}>
                            <Shield size={18} color="#06B6D4" />
                            <Text style={styles.sectionTitle}>DEPLOYED_REPOS</Text>
                        </View>
                        {projects.slice(0, 3).map((project, index) => (
                            <TouchableOpacity key={index} activeOpacity={0.8}>
                                <NeonBox style={styles.projectCard}>
                                    <View style={styles.projHead}>
                                        <Text style={styles.projId}>MODULE_0{index + 1}</Text>
                                        <Zap size={14} color="#FACC15" />
                                    </View>
                                    <Text style={styles.projName}>{project.name}</Text>
                                    <Text style={styles.projDesc}>{project.description}</Text>
                                    <View style={styles.statusRow}>
                                        <View style={styles.statusDot} />
                                        <Text style={styles.statusLabel}>OPERATIONAL</Text>
                                    </View>
                                </NeonBox>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Neural Footer */}
                    <View style={styles.footer}>
                        <TouchableOpacity style={styles.connectBtn}>
                            <LinearGradient 
                                colors={['#06B6D4', '#22D3EE']} 
                                style={styles.connectGradient}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                            >
                                <MessageSquare size={20} color="#000" />
                                <Text style={styles.connectText}>ESTABLISH NEXUS</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                        <Text style={styles.footerVersion}>V3.5.0_STABLE // {new Date().getFullYear()}</Text>
                    </View>

                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    bgDark: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#040d12',
    },
    safeArea: {
        flex: 1,
    },
    scrollContainer: {
        paddingBottom: 40,
    },
    scanline: {
        position: 'absolute',
        width: '100%',
        height: 2,
        backgroundColor: 'rgba(6, 182, 212, 0.3)',
        zIndex: 100,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 24,
    },
    backBtn: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#06B6D4',
        borderRadius: 4,
    },
    headerLabel: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    headerText: {
        color: '#06B6D4',
        fontSize: 10,
        fontWeight: '900',
        letterSpacing: 2,
    },
    heroSection: {
        padding: 24,
        marginTop: 10,
    },
    aiMessage: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 30,
    },
    aiBubble: {
        backgroundColor: 'rgba(6, 182, 212, 0.1)',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(6, 182, 212, 0.3)',
    },
    aiText: {
        color: '#06B6D4',
        fontSize: 10,
        fontWeight: '900',
        letterSpacing: 1,
    },
    mainDisplay: {
        alignItems: 'center',
        padding: 40,
        borderWidth: 1,
        borderColor: 'rgba(6, 182, 212, 0.2)',
        borderRadius: 20,
        backgroundColor: 'rgba(6, 182, 212, 0.05)',
        marginBottom: 30,
    },
    displayName: {
        fontSize: 32,
        fontWeight: '900',
        color: '#FFF',
        letterSpacing: 2,
    },
    displayRole: {
        fontSize: 12,
        color: '#06B6D4',
        fontWeight: '700',
        marginTop: 8,
    },
    neonDivider: {
        width: 100,
        height: 1,
        backgroundColor: '#06B6D4',
        marginVertical: 24,
        shadowColor: '#06B6D4',
        shadowRadius: 10,
        shadowOpacity: 1,
    },
    displayHero: {
        fontSize: 18,
        color: '#94A3B8',
        textAlign: 'center',
        fontWeight: '500',
        lineHeight: 28,
    },
    userResponse: {
        alignItems: 'flex-end',
    },
    userBubble: {
        backgroundColor: '#1E293B',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#334155',
    },
    userText: {
        color: '#FFF',
        fontSize: 14,
        fontWeight: '600',
    },
    section: {
        padding: 24,
        marginTop: 20,
    },
    sectionTitleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 12,
        fontWeight: '900',
        color: '#06B6D4',
        letterSpacing: 3,
    },
    matrixGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 16,
    },
    matrixItem: {
        width: (width - 64) / 2,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    matrixText: {
        color: '#FFF',
        fontSize: 11,
        fontWeight: '700',
    },
    neonBox: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderWidth: 1,
        borderRadius: 8,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 2,
    },
    projectCard: {
        padding: 20,
        marginBottom: 16,
    },
    projHead: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    projId: {
        fontSize: 10,
        fontWeight: '900',
        color: '#06B6D4',
        letterSpacing: 2,
    },
    projName: {
        fontSize: 18,
        fontWeight: '800',
        color: '#FFF',
        marginBottom: 8,
    },
    projDesc: {
        fontSize: 13,
        color: '#94A3B8',
        lineHeight: 20,
        marginBottom: 20,
    },
    statusRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    statusDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#10B981',
    },
    statusLabel: {
        fontSize: 9,
        fontWeight: '900',
        color: '#10B981',
        letterSpacing: 1,
    },
    footer: {
        padding: 40,
        alignItems: 'center',
    },
    connectBtn: {
        width: '100%',
        marginBottom: 32,
    },
    connectGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 18,
        borderRadius: 4,
        gap: 12,
    },
    connectText: {
        fontSize: 14,
        fontWeight: '900',
        color: '#000',
        letterSpacing: 2,
    },
    footerVersion: {
        fontSize: 9,
        color: '#334155',
        fontWeight: '800',
        letterSpacing: 2,
    }
});
