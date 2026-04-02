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
import LinearGradient from 'react-native-linear-gradient';
import { Zap, Play, Music, Radio, ChevronLeft, ArrowUpRight, Cpu, Monitor } from 'lucide-react-native';
import Animated, { FadeInUp, SlideInRight, useAnimatedStyle, withRepeat, withTiming, withSequence, useSharedValue } from 'react-native-reanimated';
import { portfolioprofile } from './portfoliodata';

const { width, height } = Dimensions.get('window');

const RetroGrid = () => (
    <View style={styles.gridContainer}>
        {[...Array(20)].map((_, i) => (
            <View key={`h-${i}`} style={[styles.gridLineH, { top: (height / 20) * i }]} />
        ))}
        {[...Array(15)].map((_, i) => (
            <View key={`v-${i}`} style={[styles.gridLineV, { left: (width / 15) * i }]} />
        ))}
    </View>
);

export default function Portfolio16({ navigation }) {
    const { personal_info, hero, projects, core_expertise } = portfolioprofile;

    const flicker = useSharedValue(1);

    React.useEffect(() => {
        flicker.value = withRepeat(withSequence(withTiming(0.7, { duration: 100 }), withTiming(1, { duration: 100 })), -1, true);
    }, []);

    const flickerStyle = useAnimatedStyle(() => ({
        opacity: flicker.value,
    }));

    return (
        <View style={styles.container}>
            <LinearGradient colors={['#240B36', '#1E0B36']} style={StyleSheet.absoluteFill} />
            <RetroGrid />
            <View style={styles.scanlines} />

            <SafeAreaView style={styles.safeArea}>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
                    
                    {/* Retro Header */}
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                            <ChevronLeft size={24} color="#FF00FF" />
                        </TouchableOpacity>
                        <Animated.Text style={[styles.headerLogo, flickerStyle]}>RAD_v2024</Animated.Text>
                        <Radio size={20} color="#00FFFF" />
                    </View>

                    {/* Synthwave Hero */}
                    <View style={styles.heroSection}>
                        <Text style={styles.heroPre}>SYSTEM_STATUS: RADIANT</Text>
                        <Animated.Text entering={FadeInUp.duration(1000)} style={styles.heroName}>
                            {personal_info.name.toUpperCase()}
                        </Animated.Text>
                        <View style={styles.neonLine} />
                        <Text style={styles.heroTitle}>{personal_info.title.toUpperCase()}</Text>
                        <Text style={styles.heroSubtitle}>{hero.title}</Text>
                    </View>

                    {/* Retro Expertise */}
                    <View style={styles.section}>
                        <Text style={styles.sectionLabel}>// CORE_CAPABILITIES</Text>
                        <View style={styles.expertiseGrid}>
                            {core_expertise.map((exp, index) => (
                                <View key={index} style={styles.expertiseCard}>
                                    <View style={styles.cardHeader}>
                                        <Cpu size={16} color="#FF00FF" />
                                        <Text style={styles.cardId}>EXP_{index + 1}</Text>
                                    </View>
                                    <Text style={styles.expText}>{exp}</Text>
                                </View>
                            ))}
                        </View>
                    </View>

                    {/* Cyber Projects */}
                    <View style={styles.section}>
                        <View style={styles.secHead}>
                            <Text style={styles.sectionLabel}>// SELECTED_LOGS</Text>
                            <Monitor size={18} color="#00FFFF" />
                        </View>
                        {projects.slice(0, 3).map((project, index) => (
                            <TouchableOpacity key={index} style={styles.retroProjectCard}>
                                <LinearGradient 
                                    colors={['rgba(255, 0, 255, 0.1)', 'rgba(0, 255, 255, 0.1)']} 
                                    style={StyleSheet.absoluteFill}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                />
                                <View style={styles.projBody}>
                                    <View style={styles.projHeadRow}>
                                        <Text style={styles.projName}>{project.name}</Text>
                                        <ArrowUpRight size={20} color="#FF00FF" />
                                    </View>
                                    <Text style={styles.projDesc}>{project.description}</Text>
                                    <View style={styles.tagRow}>
                                        {project.technologies.slice(0, 2).map((tech, i) => (
                                            <Text key={i} style={styles.tag}>#{tech.toUpperCase()}</Text>
                                        ))}
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Final Action */}
                    <View style={styles.footer}>
                        <Text style={styles.footerMsg}>READY TO PLAY?</Text>
                        <TouchableOpacity style={styles.finalBtn}>
                            <LinearGradient 
                                colors={['#FF00FF', '#00FFFF']} 
                                style={styles.btnGradient}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                            >
                                <Text style={styles.btnText}>INSERT CONTACT</Text>
                                <Play size={18} color="#000" fill="#000" />
                            </LinearGradient>
                        </TouchableOpacity>
                        <Text style={styles.footerBrand}>POWERED BY CRT_TECH 1984</Text>
                    </View>

                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1E0B36',
    },
    safeArea: {
        flex: 1,
    },
    scrollContainer: {
        paddingBottom: 40,
    },
    gridContainer: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        opacity: 0.2,
    },
    gridLineH: {
        position: 'absolute',
        width: '100%',
        height: 1,
        backgroundColor: '#FF00FF',
    },
    gridLineV: {
        position: 'absolute',
        height: '100%',
        width: 1,
        backgroundColor: '#00FFFF',
    },
    scanlines: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        zIndex: 10,
        pointerEvents: 'none',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 24,
    },
    backBtn: {
        padding: 4,
    },
    headerLogo: {
        fontSize: 14,
        fontWeight: '900',
        color: '#FF00FF',
        letterSpacing: 2,
    },
    heroSection: {
        padding: 24,
        marginTop: 40,
    },
    heroPre: {
        fontSize: 10,
        fontWeight: '900',
        color: '#00FFFF',
        letterSpacing: 2,
        marginBottom: 12,
    },
    heroName: {
        fontSize: 54,
        fontWeight: '900',
        color: '#FF00FF',
        letterSpacing: -2,
        textShadowColor: '#00FFFF',
        textShadowOffset: { width: 4, height: 4 },
        textShadowRadius: 0,
    },
    neonLine: {
        height: 4,
        width: 80,
        backgroundColor: '#00FFFF',
        marginTop: 20,
        marginBottom: 20,
        shadowColor: '#00FFFF',
        shadowRadius: 10,
        shadowOpacity: 1,
    },
    heroTitle: {
        fontSize: 16,
        fontWeight: '800',
        color: '#FF00FF',
        letterSpacing: 2,
    },
    heroSubtitle: {
        fontSize: 14,
        color: '#FFF',
        marginTop: 12,
        lineHeight: 22,
        fontWeight: '500',
        opacity: 0.8,
    },
    section: {
        marginTop: 40,
        paddingHorizontal: 24,
    },
    secHead: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    sectionLabel: {
        fontSize: 12,
        fontWeight: '900',
        color: '#00FFFF',
        letterSpacing: 1,
        marginBottom: 24,
    },
    expertiseGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 16,
    },
    expertiseCard: {
        width: (width - 64) / 2,
        backgroundColor: 'rgba(255, 0, 255, 0.05)',
        padding: 16,
        borderWidth: 1,
        borderColor: '#FF00FF',
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    cardId: {
        fontSize: 8,
        color: '#FF00FF',
        fontWeight: '900',
    },
    expText: {
        color: '#FFF',
        fontSize: 12,
        fontWeight: '700',
    },
    retroProjectCard: {
        marginBottom: 20,
        borderWidth: 2,
        borderColor: '#00FFFF',
        overflow: 'hidden',
    },
    projBody: {
        padding: 24,
    },
    projHeadRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    projName: {
        fontSize: 22,
        fontWeight: '900',
        color: '#FFF',
        letterSpacing: 0,
    },
    projDesc: {
        fontSize: 13,
        color: '#CCC',
        lineHeight: 20,
        marginBottom: 24,
    },
    tagRow: {
        flexDirection: 'row',
        gap: 12,
    },
    tag: {
        fontSize: 10,
        fontWeight: '900',
        color: '#00FFFF',
    },
    footer: {
        marginTop: 60,
        padding: 40,
        alignItems: 'center',
    },
    footerMsg: {
        fontSize: 14,
        fontWeight: '900',
        color: '#FF00FF',
        letterSpacing: 4,
        marginBottom: 24,
    },
    finalBtn: {
        width: '100%',
        marginBottom: 40,
    },
    btnGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 18,
        gap: 12,
    },
    btnText: {
        fontSize: 16,
        fontWeight: '900',
        color: '#000',
        letterSpacing: 1,
    },
    footerBrand: {
        fontSize: 8,
        color: '#444',
        fontWeight: '900',
        letterSpacing: 2,
    }
});
