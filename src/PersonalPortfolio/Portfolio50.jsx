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
import { ChevronLeft, ArrowRight, Heart, Wind, Droplet, Sparkles, Sun } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { FadeIn, FadeInDown, useAnimatedStyle, withRepeat, withTiming, withSequence, Easing } from 'react-native-reanimated';
import { portfolioprofile } from './portfoliodata';

const { width, height } = Dimensions.get('window');

const OrganicBlob = ({ color, style, duration = 8000, delay = 0 }) => {
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            { translateX: withRepeat(withSequence(withTiming(30, { duration, easing: Easing.inOut(Easing.sin) }), withTiming(-30, { duration, easing: Easing.inOut(Easing.sin) })), -1, true) },
            { translateY: withRepeat(withSequence(withTiming(-30, { duration: duration * 1.2, easing: Easing.inOut(Easing.sin) }), withTiming(30, { duration: duration * 1.2, easing: Easing.inOut(Easing.sin) })), -1, true) },
            { scale: withRepeat(withSequence(withTiming(1.1, { duration: duration * 0.8, easing: Easing.inOut(Easing.sin) }), withTiming(0.9, { duration: duration * 0.8, easing: Easing.inOut(Easing.sin) })), -1, true) }
        ],
    }));

    return (
        <Animated.View style={[styles.blob, { backgroundColor: color }, style, animatedStyle]} />
    );
};

export default function Portfolio50({ navigation }) {
    const { personal_info, hero, summary, technical_stack, projects } = portfolioprofile;

    return (
        <View style={styles.container}>
            <View style={StyleSheet.absoluteFill}>
                <OrganicBlob color="#FFB7B2" style={{ top: '10%', left: '10%', width: 300, height: 300 }} />
                <OrganicBlob color="#B2E2F2" style={{ bottom: '10%', right: '10%', width: 400, height: 400 }} duration={10000} />
                <OrganicBlob color="#F2F2B2" style={{ top: '40%', right: '20%', width: 250, height: 250 }} duration={12000} />
            </View>

            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <ChevronLeft size={24} color="#000" />
                    </TouchableOpacity>
                    <View style={styles.headerBadge}>
                        <Droplet size={14} color="#000" fill="#000" opacity={0.2} />
                        <Text style={styles.headerLabel}>ORGANIC_BLOB_V50</Text>
                    </View>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    {/* Hero Section */}
                    <View style={styles.heroSection}>
                        <Animated.Text entering={FadeInDown.duration(800)} style={styles.heroPre}>SOFT_INTERFACE_FLUIDITY</Animated.Text>
                        <Animated.Text entering={FadeInDown.delay(200).duration(800)} style={styles.name}>{personal_info.name}</Animated.Text>
                        <View style={styles.heroDivider} />
                        <Text style={styles.headline}>{personal_info.headline.toUpperCase()}</Text>
                    </View>

                    {/* Summary Section */}
                    <View style={styles.section}>
                        <View style={styles.card}>
                            <View style={styles.cardOverlay} />
                            <View style={styles.cardHeader}>
                                <Text style={styles.cardTitle}>THE_FLOW</Text>
                                <Wind size={20} color="#000" opacity={0.3} />
                            </View>
                            <Text style={styles.summaryText}>{summary}</Text>
                        </View>
                    </View>

                    {/* Expertise Section */}
                    <View style={styles.section}>
                        <Text style={styles.sectionHeading}>SYSTEM_AUGMENTS</Text>
                        <View style={styles.skillsGrid}>
                            {technical_stack.mobile.concat(technical_stack.frontend.slice(0, 3)).map((skill, i) => (
                                <View key={skill} style={styles.skillChip}>
                                    <View style={styles.chipOverlay} />
                                    <View style={[styles.skillDot, { backgroundColor: i % 2 === 0 ? '#FFB7B2' : '#B2E2F2' }]} />
                                    <Text style={styles.skillText}>{skill.toUpperCase()}</Text>
                                </View>
                            ))}
                        </View>
                    </View>

                    {/* Projects Section */}
                    <View style={styles.section}>
                        <Text style={styles.sectionHeading}>CURATED_WORK</Text>
                        {projects.slice(0, 4).map((p, i) => (
                            <TouchableOpacity key={p.name} style={styles.projectCard}>
                                <View style={styles.projectOverlay} />
                                <View style={styles.projectHeader}>
                                    <View style={styles.projectDot} />
                                    <Text style={styles.projectName}>{p.name.toUpperCase()}</Text>
                                </View>
                                <Text style={styles.projectDesc}>{p.description.slice(0, 100)}...</Text>
                                <View style={styles.projectFooter}>
                                    <Text style={styles.projectCat}>{p.category.toUpperCase()}</Text>
                                    <View style={styles.arrowBtn}>
                                        <ArrowRight size={20} color="#000" />
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Footer Section */}
                    <TouchableOpacity style={styles.footerBtn} onPress={() => navigation.goBack()}>
                        <LinearGradient colors={['rgba(255,255,255,0.8)', 'rgba(255,255,255,0.4)']} style={styles.footerInner}>
                            <Text style={styles.footerText}>INITIATE_CONNECTION</Text>
                            <Sparkles size={24} color="#000" opacity={0.3} />
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
        backgroundColor: '#FFF9F9',
    },
    blob: {
        position: 'absolute',
        borderRadius: 300,
        opacity: 0.3,
        filter: 'blur(60px)',
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
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
    },
    headerBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingHorizontal: 16,
        paddingVertical: 10,
        backgroundColor: '#FFF',
        borderRadius: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
    },
    headerLabel: {
        fontSize: 10,
        fontWeight: '900',
        color: '#000',
        letterSpacing: 2,
    },
    scrollContent: {
        paddingHorizontal: 24,
        paddingBottom: 60,
    },
    heroSection: {
        paddingVertical: 60,
        alignItems: 'center',
    },
    heroPre: {
        fontSize: 11,
        fontWeight: '900',
        color: '#000',
        letterSpacing: 4,
        marginBottom: 20,
        opacity: 0.4,
    },
    name: {
        fontSize: 52,
        fontWeight: '900',
        color: '#1E1E1E',
        textAlign: 'center',
        lineHeight: 52,
        letterSpacing: -2,
    },
    heroDivider: {
        width: 40,
        height: 4,
        backgroundColor: '#1E1E1E',
        marginVertical: 32,
        borderRadius: 2,
    },
    headline: {
        fontSize: 14,
        fontWeight: '900',
        color: '#000',
        textAlign: 'center',
        letterSpacing: 4,
        opacity: 0.5,
    },
    section: {
        marginBottom: 48,
    },
    sectionHeading: {
        fontSize: 10,
        fontWeight: '900',
        color: 'rgba(0,0,0,0.3)',
        letterSpacing: 4,
        marginBottom: 24,
        marginLeft: 10,
    },
    card: {
        padding: 40,
        borderRadius: 40,
        backgroundColor: 'rgba(255,255,255,0.6)',
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.8)',
    },
    cardOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(255,255,255,0.05)',
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
        color: '#000',
        letterSpacing: 4,
    },
    summaryText: {
        fontSize: 18,
        lineHeight: 30,
        color: '#444',
    },
    skillsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    skillChip: {
        paddingHorizontal: 20,
        paddingVertical: 14,
        borderRadius: 30,
        backgroundColor: 'rgba(255,255,255,0.6)',
        overflow: 'hidden',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.8)',
    },
    chipOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(255,255,255,0.05)',
    },
    skillDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
    },
    skillText: {
        fontSize: 12,
        fontWeight: '900',
        color: '#000',
    },
    projectCard: {
        padding: 30,
        borderRadius: 40,
        backgroundColor: 'rgba(255,255,255,0.6)',
        marginBottom: 20,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.8)',
    },
    projectOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(255,255,255,0.05)',
    },
    projectHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        marginBottom: 20,
    },
    projectDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#FFB7B2',
    },
    projectName: {
        fontSize: 22,
        fontWeight: '900',
        color: '#1E1E1E',
    },
    projectDesc: {
        fontSize: 16,
        color: '#666',
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
        color: 'rgba(0,0,0,0.3)',
        letterSpacing: 2,
    },
    arrowBtn: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    footerBtn: {
        marginTop: 20,
        borderRadius: 40,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.8)',
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
        color: '#000',
        letterSpacing: 2,
    }
});
