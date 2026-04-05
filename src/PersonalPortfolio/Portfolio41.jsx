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
import { ChevronLeft, Compass, Star, Move, ArrowRight, Eye, Moon } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { FadeIn, FadeInDown, useAnimatedStyle, withRepeat, withTiming, withSequence, withDelay } from 'react-native-reanimated';
import { portfolioprofile } from './portfoliodata';

const { width, height } = Dimensions.get('window');

const CinematicStar = ({ delay = 0, duration = 3000, style }) => {
    const animatedStyle = useAnimatedStyle(() => ({
        opacity: withRepeat(withSequence(withTiming(1, { duration }), withTiming(0.2, { duration })), -1, true),
        transform: [{ scale: withRepeat(withSequence(withTiming(1.2, { duration }), withTiming(0.8, { duration })), -1, true) }],
    }));

    return <Animated.View style={[styles.star, style, animatedStyle]} />;
};

export default function Portfolio41({ navigation }) {
    const { personal_info, hero, summary, technical_stack, projects } = portfolioprofile;

    return (
        <View style={styles.container}>
            <LinearGradient colors={['#020617', '#000000']} style={StyleSheet.absoluteFill} />
            
            {/* Cinematic Star Field */}
            <View style={StyleSheet.absoluteFill}>
                <CinematicStar style={{ top: '10%', left: '20%' }} />
                <CinematicStar style={{ top: '15%', left: '80%' }} delay={500} />
                <CinematicStar style={{ top: '40%', left: '10%' }} delay={1000} />
                <CinematicStar style={{ top: '60%', left: '70%' }} delay={1500} />
                <CinematicStar style={{ top: '80%', left: '30%' }} delay={2000} />
                <CinematicStar style={{ top: '25%', left: '50%' }} delay={2500} />
            </View>

            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.navBtn}>
                        <ChevronLeft size={24} color="#FFF" />
                    </TouchableOpacity>
                    <View style={styles.missionInfo}>
                        <Compass size={14} color="#555" />
                        <Text style={styles.missionText}>DEEP_SPACE_NOIR / 041</Text>
                    </View>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    {/* Cinematic Letterbox Header */}
                    <View style={styles.heroSection}>
                        <View style={styles.letterboxTop} />
                        <View style={styles.heroContent}>
                            <Animated.Text entering={FadeIn.duration(2000)} style={styles.heroPre}>VOYAGE_IDENTITY</Animated.Text>
                            <Animated.Text entering={FadeInDown.delay(400).duration(1500)} style={styles.name}>{personal_info.name.toUpperCase()}</Animated.Text>
                            <View style={styles.heroDivider} />
                            <Text style={styles.headline}>{personal_info.headline.toUpperCase()}</Text>
                        </View>
                        <View style={styles.letterboxBottom} />
                    </View>

                    {/* Narrative Void */}
                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <Moon size={16} color="#FFF" opacity={0.3} />
                            <Text style={styles.sectionTitle}>THE_PROLOGUE</Text>
                        </View>
                        <View style={styles.noirCard}>
                            <Text style={styles.summaryText}>{summary}</Text>
                        </View>
                    </View>

                    {/* Expertise Constellation */}
                    <View style={styles.section}>
                        <Text style={styles.sectionLabel}>CAPABILITIES_ARRAY</Text>
                        <View style={styles.skillsGrid}>
                            {technical_stack.mobile.concat(technical_stack.frontend.slice(0, 3)).map((skill, i) => (
                                <View key={skill} style={styles.skillBox}>
                                    <View style={styles.skillDot} />
                                    <Text style={styles.skillText}>{skill.toUpperCase()}</Text>
                                </View>
                            ))}
                        </View>
                    </View>

                    {/* Project Exhibits */}
                    <View style={styles.section}>
                        <Text style={styles.sectionLabel}>CURATED_DEPLOYMENTS</Text>
                        {projects.slice(0, 4).map((p, i) => (
                            <TouchableOpacity key={p.name} style={styles.projectNoir}>
                                <View style={styles.projectHeader}>
                                    <Text style={styles.projectIndex}>EXP_0{i + 1}</Text>
                                    <Text style={styles.projectName}>{p.name.toUpperCase()}</Text>
                                </View>
                                <Text style={styles.projectDesc}>{p.description.slice(0, 100)}...</Text>
                                <View style={styles.projectFooter}>
                                    <Text style={styles.projectCat}>{p.category.toUpperCase()}</Text>
                                    <ArrowRight size={20} color="#FFF" />
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Final Beacon */}
                    <TouchableOpacity style={styles.footerBtn} onPress={() => navigation.goBack()}>
                        <View style={styles.footerInner}>
                            <Text style={styles.footerText}>ESTABLISH_PERSISTENT_BEACON</Text>
                            <Eye size={24} color="#FFF" />
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
    },
    star: {
        position: 'absolute',
        width: 3,
        height: 3,
        backgroundColor: '#FFF',
        borderRadius: 2,
        shadowColor: '#FFF',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 4,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingVertical: 16,
    },
    navBtn: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: 'rgba(255,255,255,0.05)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    missionInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    missionText: {
        fontSize: 10,
        fontWeight: '900',
        color: '#555',
        letterSpacing: 2,
    },
    scrollContent: {
        paddingBottom: 60,
    },
    heroSection: {
        height: 450,
        justifyContent: 'center',
        overflow: 'hidden',
    },
    letterboxTop: {
        position: 'absolute',
        top: 0,
        width: '100%',
        height: 80,
        backgroundColor: '#000',
        opacity: 0.8,
    },
    letterboxBottom: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 80,
        backgroundColor: '#000',
        opacity: 0.8,
    },
    heroContent: {
        paddingHorizontal: 30,
        alignItems: 'center',
    },
    heroPre: {
        fontSize: 10,
        fontWeight: '900',
        color: 'rgba(255,255,255,0.3)',
        letterSpacing: 6,
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
        backgroundColor: '#FFF',
        marginVertical: 32,
    },
    headline: {
        fontSize: 14,
        fontWeight: '900',
        color: 'rgba(255,255,255,0.5)',
        textAlign: 'center',
        letterSpacing: 4,
    },
    section: {
        paddingHorizontal: 24,
        marginBottom: 60,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        marginBottom: 32,
    },
    sectionTitle: {
        fontSize: 11,
        fontWeight: '900',
        color: '#FFF',
        letterSpacing: 4,
        opacity: 0.4,
    },
    noirCard: {
        padding: 30,
        backgroundColor: 'rgba(255,255,255,0.02)',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
        borderRadius: 2,
    },
    summaryText: {
        fontSize: 17,
        lineHeight: 30,
        color: 'rgba(255,255,255,0.8)',
        fontWeight: '300',
    },
    sectionLabel: {
        fontSize: 10,
        fontWeight: '900',
        color: 'rgba(255,255,255,0.2)',
        letterSpacing: 4,
        marginBottom: 32,
        marginLeft: 10,
    },
    skillsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 16,
    },
    skillBox: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: 'rgba(255,255,255,0.03)',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    skillDot: {
        width: 8,
        height: 8,
        backgroundColor: '#FFF',
        borderRadius: 4,
        opacity: 0.4,
    },
    skillText: {
        fontSize: 11,
        fontWeight: '900',
        color: '#FFF',
    },
    projectNoir: {
        marginBottom: 32,
        padding: 40,
        backgroundColor: 'rgba(255,255,255,0.02)',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
    },
    projectHeader: {
        flexDirection: 'row',
        alignItems: 'baseline',
        gap: 20,
        marginBottom: 24,
    },
    projectIndex: {
        fontSize: 11,
        fontWeight: '900',
        color: 'rgba(255,255,255,0.3)',
    },
    projectName: {
        fontSize: 28,
        fontWeight: '900',
        color: '#FFF',
        letterSpacing: -1,
    },
    projectDesc: {
        fontSize: 16,
        color: 'rgba(255,255,255,0.6)',
        lineHeight: 26,
        marginBottom: 32,
    },
    projectFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    projectCat: {
        fontSize: 10,
        fontWeight: '900',
        color: 'rgba(255,255,255,0.3)',
        letterSpacing: 2,
    },
    footerBtn: {
        marginTop: 40,
        marginHorizontal: 24,
        borderWidth: 1,
        borderColor: '#FFF',
    },
    footerInner: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 24,
        gap: 20,
    },
    footerText: {
        fontSize: 11,
        fontWeight: '900',
        color: '#FFF',
        letterSpacing: 2,
    }
});
