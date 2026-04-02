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
import { BlurView } from '@react-native-community/blur'; // Assuming available based on package.json check earlier
import { Layers, Sparkles, Zap, Heart, ChevronLeft, ArrowRight, Smile, Briefcase } from 'lucide-react-native';
import Animated, { FadeIn, FadeInDown, useAnimatedStyle, withRepeat, withTiming, withSequence, useSharedValue } from 'react-native-reanimated';
import { portfolioprofile } from './portfoliodata';

const { width, height } = Dimensions.get('window');

const GlassCard = ({ children, style, index }) => (
    <Animated.View 
        entering={FadeInDown.delay(index * 150).duration(800)}
        style={[styles.glassCard, style]}
    >
        <LinearGradient
            colors={['rgba(255, 255, 255, 0.4)', 'rgba(255, 255, 255, 0.1)']}
            style={styles.glassGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
        />
        {children}
    </Animated.View>
);

export default function Portfolio11({ navigation }) {
    const { personal_info, summary, technical_stack, projects } = portfolioprofile;

    return (
        <View style={styles.container}>
            {/* Liquid Background */}
            <LinearGradient colors={['#FFEDF2', '#E0F2FE', '#F5F3FF']} style={StyleSheet.absoluteFill} />
            <View style={[styles.blob, styles.blob1]} />
            <View style={[styles.blob, styles.blob2]} />
            <View style={[styles.blob, styles.blob3]} />

            <SafeAreaView style={styles.safeArea}>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
                    
                    {/* Glass Header */}
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                            <ChevronLeft size={20} color="#EC4899" />
                        </TouchableOpacity>
                        <Text style={styles.headerLabel}>GLASS.UI</Text>
                        <View style={styles.proBadge}>
                            <Sparkles size={14} color="#FFF" />
                            <Text style={styles.proText}>PRO</Text>
                        </View>
                    </View>

                    {/* Glass Hero */}
                    <View style={styles.heroSection}>
                        <GlassCard style={styles.heroCard} index={0}>
                            <View style={styles.heroHeader}>
                                <View style={styles.avatarMock}><Text style={styles.avatarInitial}>RS</Text></View>
                                <View>
                                    <Text style={styles.heroName}>{personal_info.name}</Text>
                                    <Text style={styles.heroTitle}>{personal_info.title}</Text>
                                </View>
                            </View>
                            <Text style={styles.heroDesc}>{summary.slice(0, 150)}...</Text>
                            <View style={styles.locationTag}>
                                <Text style={styles.locationText}>📍 {personal_info.location}</Text>
                            </View>
                        </GlassCard>
                    </View>

                    {/* Glass Stats Row */}
                    <View style={styles.statsRow}>
                        <GlassCard style={styles.statBox} index={1}>
                            <Text style={styles.statVal}>{personal_info.experience_years}+</Text>
                            <Text style={styles.statLabel}>Exp Years</Text>
                        </GlassCard>
                        <GlassCard style={styles.statBox} index={2}>
                            <Text style={[styles.statVal, { color: '#EC4899' }]}>15+</Text>
                            <Text style={styles.statLabel}>Success Projects</Text>
                        </GlassCard>
                    </View>

                    {/* Glass Skills */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>CORE.SKILLS</Text>
                        <View style={styles.skillList}>
                            {technical_stack.mobile.map((skill, index) => (
                                <GlassCard key={index} style={styles.skillPill} index={index + 3}>
                                    <Text style={styles.skillText}>{skill}</Text>
                                </GlassCard>
                            ))}
                        </View>
                    </View>

                    {/* Glass Projects */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>FEATURED.WORKS</Text>
                        {projects.slice(0, 3).map((project, index) => (
                            <GlassCard key={index} style={styles.projectCard} index={index + 6}>
                                <View style={styles.projIcon}><Layers size={24} color="#FFF" /></View>
                                <View style={styles.projInfo}>
                                    <View>
                                        <Text style={styles.projName}>{project.name}</Text>
                                        <Text style={styles.projCategory}>{project.category}</Text>
                                    </View>
                                    <TouchableOpacity style={styles.exploreBtn}>
                                        <ArrowRight size={20} color="#EC4899" />
                                    </TouchableOpacity>
                                </View>
                            </GlassCard>
                        ))}
                    </View>

                    {/* Glass Footer */}
                    <View style={styles.footer}>
                        <GlassCard style={styles.footerCard} index={10}>
                            <Text style={styles.footerTitle}>Let's build something delightful.</Text>
                            <TouchableOpacity style={styles.contactBtn}>
                                <LinearGradient colors={['#EC4899', '#DB2777']} style={styles.contactGradient}>
                                    <Text style={styles.contactText}>Get In Touch</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </GlassCard>
                    </View>

                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    safeArea: {
        flex: 1,
    },
    scrollContainer: {
        paddingBottom: 40,
    },
    blob: {
        position: 'absolute',
        width: 250,
        height: 250,
        borderRadius: 125,
        opacity: 0.4,
    },
    blob1: {
        top: -50,
        left: -50,
        backgroundColor: '#EC4899',
    },
    blob2: {
        bottom: 100,
        right: -100,
        backgroundColor: '#3B82F6',
    },
    blob3: {
        top: height / 2,
        left: width / 2,
        backgroundColor: '#8B5CF6',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 24,
    },
    backBtn: {
        width: 44,
        height: 44,
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.5)',
    },
    headerLabel: {
        fontSize: 10,
        fontWeight: '900',
        color: '#DB2777',
        letterSpacing: 3,
    },
    proBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#EC4899',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        gap: 6,
    },
    proText: {
        color: '#FFF',
        fontSize: 10,
        fontWeight: '900',
    },
    heroSection: {
        padding: 24,
    },
    heroCard: {
        padding: 24,
    },
    heroHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        marginBottom: 20,
    },
    avatarMock: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#EC4899',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarInitial: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '800',
    },
    heroName: {
        fontSize: 24,
        fontWeight: '800',
        color: '#1F2937',
    },
    heroTitle: {
        fontSize: 13,
        color: '#6B7280',
        fontWeight: '600',
        marginTop: 2,
    },
    heroDesc: {
        fontSize: 14,
        color: '#4B5563',
        lineHeight: 22,
        marginBottom: 20,
    },
    locationTag: {
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 10,
        alignSelf: 'flex-start',
    },
    locationText: {
        fontSize: 12,
        color: '#DB2777',
        fontWeight: '700',
    },
    statsRow: {
        flexDirection: 'row',
        paddingHorizontal: 24,
        gap: 16,
        marginBottom: 32,
    },
    statBox: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
    },
    statVal: {
        fontSize: 24,
        fontWeight: '900',
        color: '#1F2937',
    },
    statLabel: {
        fontSize: 10,
        fontWeight: '700',
        color: '#6B7280',
        textTransform: 'uppercase',
        marginTop: 4,
    },
    section: {
        padding: 24,
    },
    sectionTitle: {
        fontSize: 12,
        fontWeight: '900',
        color: '#DB2777',
        letterSpacing: 2,
        marginBottom: 20,
    },
    skillList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    skillPill: {
        paddingHorizontal: 16,
        paddingVertical: 10,
    },
    skillText: {
        fontSize: 12,
        fontWeight: '700',
        color: '#1F2937',
    },
    projectCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        marginBottom: 16,
        gap: 16,
    },
    projIcon: {
        width: 48,
        height: 48,
        backgroundColor: '#EC4899',
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
    },
    projInfo: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    projName: {
        fontSize: 18,
        fontWeight: '800',
        color: '#1F2937',
    },
    projCategory: {
        fontSize: 11,
        color: '#6B7280',
        fontWeight: '600',
        marginTop: 2,
    },
    exploreBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    footerCard: {
        margin: 24,
        padding: 30,
        alignItems: 'center',
    },
    footerTitle: {
        fontSize: 20,
        fontWeight: '800',
        color: '#1F2937',
        textAlign: 'center',
        marginBottom: 24,
    },
    contactBtn: {
        width: '100%',
        borderRadius: 14,
        overflow: 'hidden',
    },
    contactGradient: {
        paddingVertical: 16,
        alignItems: 'center',
    },
    contactText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '800',
    },
    glassCard: {
        borderRadius: 24,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.5)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.05,
        shadowRadius: 20,
        elevation: 2,
    },
    glassGradient: {
        ...StyleSheet.absoluteFillObject,
    }
});
