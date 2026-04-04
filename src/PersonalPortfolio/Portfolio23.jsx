import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    Dimensions,
    Platform,
} from 'react-native';
import { ChevronLeft, Zap, Star, Globe, Shield, ArrowUpRight, Github, Mail } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { FadeIn, FadeInDown, SlideInRight } from 'react-native-reanimated';
import { portfolioprofile } from './portfoliodata';

const { width, height } = Dimensions.get('window');

const MeshBackground = () => (
    <View style={StyleSheet.absoluteFill}>
        <LinearGradient 
            colors={['#4F46E5', '#7C3AED', '#EC4899']} 
            style={StyleSheet.absoluteFill}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
        />
        <View style={[styles.meshCircle, { top: -100, left: -100, backgroundColor: '#06B6D4' }]} />
        <View style={[styles.meshCircle, { bottom: -200, right: -100, backgroundColor: '#F59E0B' }]} />
        <View style={[styles.meshCircle, { top: '30%', right: -150, backgroundColor: '#EC4899' }]} />
    </View>
);

const IridescentCard = ({ children, style }) => (
    <View style={[styles.glassCard, style]}>
        <LinearGradient 
            colors={['rgba(255,255,255,0.15)', 'rgba(255,255,255,0.05)']} 
            style={StyleSheet.absoluteFill}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
        />
        <View style={styles.cardInternal}>
            {children}
        </View>
    </View>
);

export default function Portfolio23({ navigation }) {
    const { personal_info, hero, summary, technical_stack, projects, stats } = portfolioprofile;

    return (
        <View style={styles.container}>
            <MeshBackground />
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.glassBack}>
                        <ChevronLeft size={24} color="#FFF" />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>MESH_EXPERIMENTAL / 23</Text>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    {/* Hero Landing */}
                    <View style={styles.heroSection}>
                        <Animated.Text entering={FadeInDown.duration(1000)} style={styles.greet}>SYSTEM_INITIALIZING...</Animated.Text>
                        <Animated.Text entering={FadeInDown.delay(200).duration(1000)} style={styles.name}>{personal_info.name}</Animated.Text>
                        <Animated.Text entering={FadeInDown.delay(400).duration(1000)} style={styles.headline}>{personal_info.headline}</Animated.Text>
                    </View>

                    {/* Iridescent Stats */}
                    <View style={styles.statsRow}>
                        {stats.slice(0, 3).map((stat, i) => (
                            <IridescentCard key={i} style={styles.statCard}>
                                <Text style={styles.statValue}>{stat.value}</Text>
                                <Text style={styles.statLabel}>{stat.label}</Text>
                            </IridescentCard>
                        ))}
                    </View>

                    {/* Glass Summary */}
                    <View style={styles.section}>
                        <IridescentCard>
                            <View style={styles.sectionHeader}>
                                <Shield size={18} color="#FFF" />
                                <Text style={styles.sectionTitle}>MISSION_STATEMENT</Text>
                            </View>
                            <Text style={styles.summaryText}>{summary}</Text>
                        </IridescentCard>
                    </View>

                    {/* Skill Orbit */}
                    <View style={styles.section}>
                        <Text style={styles.sectionHeaderLabel}>CORE_ARCHITECTURE</Text>
                        <View style={styles.skillsGrid}>
                            {technical_stack.mobile.concat(technical_stack.frontend).map((skill, i) => (
                                <View key={i} style={styles.glassChip}>
                                    <View style={styles.chipPulse} />
                                    <Text style={styles.chipText}>{skill.toUpperCase()}</Text>
                                </View>
                            ))}
                        </View>
                    </View>

                    {/* High-Contrast Projects */}
                    <View style={styles.section}>
                        <Text style={styles.sectionHeaderLabel}>ACTIVE_PROJECTS</Text>
                        {projects.slice(0, 4).map((p, i) => (
                            <TouchableOpacity key={i} style={styles.projectGlass}>
                                <LinearGradient 
                                    colors={['rgba(255,255,255,0.1)', 'transparent']} 
                                    style={StyleSheet.absoluteFill}
                                />
                                <View style={styles.projectMeta}>
                                    <Text style={styles.projectIndex}>0{i+1}</Text>
                                    <Text style={styles.projectName}>{p.name}</Text>
                                </View>
                                <Text style={styles.projectDesc}>{p.description.slice(0, 100)}...</Text>
                                <View style={styles.projectFooter}>
                                    <Text style={styles.projectType}>{p.category}</Text>
                                    <View style={styles.glassBtn}>
                                        <ArrowUpRight size={18} color="#FFF" />
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Final Connect */}
                    <TouchableOpacity style={styles.contactBtn} onPress={() => navigation.goBack()}>
                        <LinearGradient colors={['#FFF', '#F3F4F6']} style={styles.contactInner}>
                            <Text style={styles.contactBtnText}>ESTABLISH_UPLINK</Text>
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
        backgroundColor: '#4F46E5',
    },
    meshCircle: {
        position: 'absolute',
        width: 500,
        height: 500,
        borderRadius: 250,
        opacity: 0.4,
        filter: Platform.OS === 'ios' ? 'blur(80px)' : undefined, // Native blur not supported in basic RN, but simulate with opacity
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingVertical: 16,
        gap: 20,
    },
    glassBack: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: 'rgba(255,255,255,0.15)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
    },
    headerText: {
        fontSize: 10,
        fontWeight: '900',
        color: 'rgba(255,255,255,0.6)',
        letterSpacing: 4,
    },
    scrollContent: {
        paddingHorizontal: 24,
        paddingBottom: 60,
    },
    heroSection: {
        paddingVertical: 50,
    },
    greet: {
        fontSize: 12,
        fontWeight: '900',
        color: 'rgba(255,255,255,0.7)',
        letterSpacing: 4,
        marginBottom: 16,
    },
    name: {
        fontSize: 52,
        fontWeight: '900',
        color: '#FFF',
        lineHeight: 52,
        letterSpacing: -2,
        marginBottom: 24,
    },
    headline: {
        fontSize: 18,
        color: 'rgba(255,255,255,0.8)',
        lineHeight: 28,
        fontWeight: '300',
    },
    statsRow: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 40,
    },
    statCard: {
        flex: 1,
        paddingVertical: 24,
    },
    statValue: {
        fontSize: 24,
        fontWeight: '900',
        color: '#FFF',
        textAlign: 'center',
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 9,
        fontWeight: '900',
        color: 'rgba(255,255,255,0.6)',
        textAlign: 'center',
        letterSpacing: 1,
    },
    glassCard: {
        borderRadius: 24,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
    },
    cardInternal: {
        padding: 30,
    },
    section: {
        marginBottom: 40,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 11,
        fontWeight: '900',
        color: '#FFF',
        letterSpacing: 2,
    },
    summaryText: {
        fontSize: 16,
        color: 'rgba(255,255,255,0.9)',
        lineHeight: 28,
    },
    sectionHeaderLabel: {
        fontSize: 11,
        fontWeight: '900',
        color: 'rgba(255,255,255,0.5)',
        letterSpacing: 4,
        marginBottom: 24,
        marginLeft: 4,
    },
    skillsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    glassChip: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.15)',
    },
    chipPulse: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#FFF',
    },
    chipText: {
        fontSize: 12,
        fontWeight: '800',
        color: '#FFF',
    },
    projectGlass: {
        padding: 30,
        backgroundColor: 'rgba(0,0,0,0.1)',
        borderRadius: 30,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
        overflow: 'hidden',
    },
    projectMeta: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        marginBottom: 20,
    },
    projectIndex: {
        fontSize: 12,
        fontWeight: '900',
        color: 'rgba(255,255,255,0.4)',
    },
    projectName: {
        fontSize: 22,
        fontWeight: '900',
        color: '#FFF',
    },
    projectDesc: {
        fontSize: 16,
        color: 'rgba(255,255,255,0.7)',
        lineHeight: 24,
        marginBottom: 24,
    },
    projectFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    projectType: {
        fontSize: 10,
        fontWeight: '900',
        color: 'rgba(255,255,255,0.5)',
        letterSpacing: 2,
    },
    glassBtn: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    contactBtn: {
        marginTop: 20,
        borderRadius: 20,
        overflow: 'hidden',
    },
    contactInner: {
        paddingVertical: 24,
        alignItems: 'center',
    },
    contactBtnText: {
        fontSize: 13,
        fontWeight: '900',
        color: '#000',
        letterSpacing: 4,
    }
});
