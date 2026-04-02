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
import { Box, Layers, Play, Zap, ChevronLeft, ArrowUpRight, Cpu, MousePointer2 } from 'lucide-react-native';
import Animated, { FadeInUp, useAnimatedStyle, withRepeat, withTiming, withSequence, useSharedValue, interpolate } from 'react-native-reanimated';
import { portfolioprofile } from './portfoliodata';

const { width } = Dimensions.get('window');

const ThreeDCard = ({ children, style, index }) => {
    const rotateX = useSharedValue(0);
    const rotateY = useSharedValue(0);

    React.useEffect(() => {
        rotateX.value = withRepeat(withSequence(withTiming(5, { duration: 2000 }), withTiming(-5, { duration: 2000 })), -1, true);
        rotateY.value = withRepeat(withSequence(withTiming(-5, { duration: 2500 }), withTiming(5, { duration: 2500 })), -1, true);
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            { perspective: 1000 },
            { rotateX: `${rotateX.value}deg` },
            { rotateY: `${rotateY.value}deg` },
        ],
    }));

    return (
        <Animated.View style={[styles.card3d, style, animatedStyle]}>
            {children}
            <View style={styles.cardShadow} />
        </Animated.View>
    );
};

export default function Portfolio10({ navigation }) {
    const { personal_info, hero, projects } = portfolioprofile;

    return (
        <View style={styles.container}>
            <LinearGradient colors={['#111827', '#030712']} style={StyleSheet.absoluteFill} />
            
            <SafeAreaView style={styles.safeArea}>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
                    
                    {/* Header */}
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                            <ChevronLeft size={24} color="#F97316" />
                        </TouchableOpacity>
                        <Text style={styles.headerLabel}>3D_INTERACTIVE.EXE</Text>
                        <MousePointer2 size={18} color="#F97316" />
                    </View>

                    {/* Interactive Hero */}
                    <View style={styles.heroSection}>
                        <ThreeDCard index={0} style={styles.heroCard}>
                            <LinearGradient 
                                colors={['#1F2937', '#111827']} 
                                style={styles.heroGradient}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                            />
                            <View style={styles.heroContent}>
                                <Text style={styles.heroPre}>MOBILE SYSTEM ARCHITECT</Text>
                                <Text style={styles.heroName}>{personal_info.name.toUpperCase()}</Text>
                                <View style={styles.divider} />
                                <Text style={styles.heroSubtitle}>{hero.title}</Text>
                            </View>
                        </ThreeDCard>
                    </View>

                    {/* Stats Blocks */}
                    <View style={styles.statsGrid}>
                        <ThreeDCard style={styles.statCard} index={1}>
                            <Text style={styles.statVal}>{personal_info.experience_years}+</Text>
                            <Text style={styles.statLabel}>EXP_YEARS</Text>
                        </ThreeDCard>
                        <ThreeDCard style={styles.statCard} index={2}>
                            <Text style={[styles.statVal, { color: '#F97316' }]}>15+</Text>
                            <Text style={styles.statLabel}>DEPLOYALS</Text>
                        </ThreeDCard>
                    </View>

                    {/* Project Stack */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>DYNAMIC_REPOS_</Text>
                        {projects.slice(0, 3).map((project, index) => (
                            <ThreeDCard key={index} style={styles.projectCard} index={index + 3}>
                                <View style={styles.projHeader}>
                                    <Box size={24} color="#F97316" />
                                    <TouchableOpacity style={styles.linkCircle}>
                                        <ArrowUpRight size={16} color="#FFF" />
                                    </TouchableOpacity>
                                </View>
                                <Text style={styles.projName}>{project.name}</Text>
                                <Text style={styles.projDesc}>{project.description}</Text>
                                <View style={styles.tagRow}>
                                    {project.technologies.slice(0, 3).map((tag, i) => (
                                        <View key={i} style={styles.tag}><Text style={styles.tagText}>{tag}</Text></View>
                                    ))}
                                </View>
                            </ThreeDCard>
                        ))}
                    </View>

                    {/* Bottom Action */}
                    <View style={styles.footer}>
                        <Text style={styles.footerText}>READY_FOR_ENGAGEMENT_</Text>
                        <TouchableOpacity style={styles.actionBtn}>
                            <Text style={styles.actionBtnText}>LAUNCH CONTACT UI</Text>
                            <Zap size={18} color="#000" fill="#000" />
                        </TouchableOpacity>
                    </View>

                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#030712',
    },
    safeArea: {
        flex: 1,
    },
    scrollContainer: {
        paddingBottom: 40,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 24,
    },
    backBtn: {
        padding: 8,
    },
    headerLabel: {
        fontSize: 10,
        fontWeight: '900',
        color: '#F97316',
        letterSpacing: 2,
    },
    heroSection: {
        paddingHorizontal: 24,
        marginTop: 20,
    },
    heroCard: {
        height: 280,
    },
    heroGradient: {
        ...StyleSheet.absoluteFillObject,
        borderRadius: 24,
    },
    heroContent: {
        padding: 30,
        height: '100%',
        justifyContent: 'center',
    },
    heroPre: {
        fontSize: 10,
        fontWeight: '800',
        color: '#F97316',
        letterSpacing: 2,
        marginBottom: 12,
    },
    heroName: {
        fontSize: 42,
        fontWeight: '900',
        color: '#FFF',
        letterSpacing: -1,
    },
    divider: {
        width: 40,
        height: 3,
        backgroundColor: '#F97316',
        marginVertical: 20,
    },
    heroSubtitle: {
        fontSize: 16,
        color: '#9CA3AF',
        lineHeight: 24,
        fontWeight: '500',
    },
    statsGrid: {
        flexDirection: 'row',
        padding: 24,
        gap: 16,
    },
    statCard: {
        flex: 1,
        height: 120,
        backgroundColor: '#111827',
        borderRadius: 24,
        justifyContent: 'center',
        padding: 20,
    },
    statVal: {
        fontSize: 28,
        fontWeight: '900',
        color: '#FFF',
    },
    statLabel: {
        fontSize: 10,
        fontWeight: '800',
        color: '#4B5563',
        marginTop: 4,
        letterSpacing: 1,
    },
    section: {
        padding: 24,
    },
    sectionTitle: {
        fontSize: 12,
        fontWeight: '900',
        color: '#4B5563',
        letterSpacing: 3,
        marginBottom: 24,
    },
    projectCard: {
        backgroundColor: '#111827',
        borderRadius: 32,
        padding: 24,
        marginBottom: 24,
    },
    projHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    linkCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#1F2937',
        justifyContent: 'center',
        alignItems: 'center',
    },
    projName: {
        fontSize: 24,
        fontWeight: '800',
        color: '#FFF',
        marginBottom: 12,
    },
    projDesc: {
        fontSize: 14,
        color: '#9CA3AF',
        lineHeight: 22,
        marginBottom: 24,
    },
    tagRow: {
        flexDirection: 'row',
        gap: 12,
    },
    tag: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        backgroundColor: 'rgba(249, 115, 22, 0.1)',
        borderRadius: 8,
    },
    tagText: {
        fontSize: 11,
        color: '#F97316',
        fontWeight: '800',
    },
    card3d: {
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 20 },
        shadowOpacity: 0.5,
        shadowRadius: 30,
        elevation: 10,
    },
    cardShadow: {
        position: 'absolute',
        bottom: -20,
        left: 20,
        right: 20,
        height: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        borderRadius: 20,
        zIndex: -1,
    },
    footer: {
        padding: 40,
        alignItems: 'center',
    },
    footerText: {
        fontSize: 10,
        fontWeight: '900',
        color: '#4B5563',
        letterSpacing: 2,
        marginBottom: 24,
    },
    actionBtn: {
        backgroundColor: '#F97316',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 18,
        paddingHorizontal: 40,
        borderRadius: 40,
        gap: 12,
    },
    actionBtnText: {
        fontSize: 14,
        fontWeight: '900',
        color: '#000',
        letterSpacing: 1,
    }
});
