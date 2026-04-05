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
import { ChevronLeft, Compass, Eye, Sparkles, Layers, Box, Globe, Zap } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { FadeIn, FadeInDown, SlideInRight, useAnimatedStyle, withRepeat, withTiming, withSequence } from 'react-native-reanimated';
import { portfolioprofile } from './portfoliodata';

const { width, height } = Dimensions.get('window');

const SpatialWindow = ({ children, style }) => (
    <View style={[styles.spatialWindow, style]}>
        <LinearGradient 
            colors={['rgba(255,255,255,0.15)', 'rgba(255,255,255,0.05)']} 
            style={StyleSheet.absoluteFill}
        />
        <View style={styles.windowContent}>
            {children}
        </View>
    </View>
);

export default function Portfolio40({ navigation }) {
    const { personal_info, hero, summary, technical_stack, projects } = portfolioprofile;

    return (
        <View style={styles.container}>
            <View style={StyleSheet.absoluteFill}>
                <LinearGradient colors={['#1E293B', '#0F172A']} style={StyleSheet.absoluteFill} />
                <View style={[styles.halo, { top: -200, left: -200, width: 600, height: 600, backgroundColor: '#3B82F6', opacity: 0.1 }]} />
                <View style={[styles.halo, { bottom: -200, right: -200, width: 500, height: 500, backgroundColor: '#EC4899', opacity: 0.1 }]} />
            </View>

            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.glassBtn}>
                        <ChevronLeft size={24} color="#FFF" />
                    </TouchableOpacity>
                    <View style={styles.statusBadge}>
                        <Eye size={14} color="#FFF" />
                        <Text style={styles.statusText}>SPATIAL_OS_40</Text>
                    </View>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    {/* Hero Spatial Card */}
                    <View style={styles.heroSection}>
                        <SpatialWindow style={styles.heroWindow}>
                            <Animated.Text entering={FadeIn.duration(1000)} style={styles.heroPre}>SPATIAL_COORDINATES</Animated.Text>
                            <Animated.Text entering={FadeInDown.delay(200).duration(1000)} style={styles.name}>{personal_info.name.toUpperCase()}</Animated.Text>
                            <View style={styles.spatialLine} />
                            <Text style={styles.headline}>{personal_info.headline.toUpperCase()}</Text>
                        </SpatialWindow>
                    </View>

                    {/* Meta Layers (Summary) */}
                    <View style={styles.section}>
                        <Text style={styles.sectionLabel}>// DATA_LAYERS</Text>
                        <SpatialWindow>
                            <Text style={styles.summaryText}>{summary}</Text>
                        </SpatialWindow>
                    </View>

                    {/* Expertise Orbits (Skills) */}
                    <View style={styles.section}>
                        <Text style={styles.sectionLabel}>// SYSTEM_CAPABILITIES</Text>
                        <View style={styles.skillsGrid}>
                            {technical_stack.mobile.concat(technical_stack.frontend.slice(0, 3)).map((skill, i) => (
                                <View key={skill} style={styles.skillChip}>
                                    <LinearGradient colors={['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.02)']} style={StyleSheet.absoluteFill} />
                                    <View style={styles.skillIcon}>
                                        <Sparkles size={12} color={i % 2 === 0 ? '#3B82F6' : '#EC4899'} fill={i % 2 === 0 ? '#3B82F6' : '#EC4899'} opacity={0.3} />
                                    </View>
                                    <Text style={styles.skillText}>{skill.toUpperCase()}</Text>
                                </View>
                            ))}
                        </View>
                    </View>

                    {/* Immersive Artifacts (Projects) */}
                    <View style={styles.section}>
                        <Text style={styles.sectionLabel}>// SPATIAL_ARTIFACTS</Text>
                        {projects.slice(0, 4).map((p, i) => (
                            <TouchableOpacity key={p.name} style={styles.projectWindow}>
                                <LinearGradient colors={['rgba(255,255,255,0.08)', 'rgba(255,255,255,0.02)']} style={StyleSheet.absoluteFill} />
                                <View style={styles.projectHeader}>
                                    <View style={styles.projectIcon}>
                                        <Layers size={18} color="#FFF" opacity={0.6} />
                                    </View>
                                    <View style={styles.projectInfo}>
                                        <Text style={styles.projectName}>{p.name.toUpperCase()}</Text>
                                        <Text style={styles.projectCat}>{p.category.toUpperCase()}</Text>
                                    </View>
                                </View>
                                <Text style={styles.projectDesc}>{p.description.slice(0, 100)}...</Text>
                                <View style={styles.projectFooter}>
                                    <Text style={styles.exploreText}>Sync_Environment</Text>
                                    <Box size={20} color="#FFF" opacity={0.6} />
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Final Projection */}
                    <TouchableOpacity style={styles.footerBtn} onPress={() => navigation.goBack()}>
                        <LinearGradient colors={['#3B82F6', '#2563EB']} style={styles.footerInner}>
                            <Text style={styles.footerText}>INITIATE_SPATIAL_LINK</Text>
                            <Compass size={24} color="#FFF" />
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
    },
    halo: {
        position: 'absolute',
        borderRadius: 300,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingVertical: 16,
    },
    glassBtn: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: 'rgba(255,255,255,0.05)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingHorizontal: 16,
        paddingVertical: 10,
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: 20,
    },
    statusText: {
        fontSize: 10,
        fontWeight: '900',
        color: '#FFF',
        letterSpacing: 2,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 60,
        paddingTop: 20,
    },
    spatialWindow: {
        borderRadius: 32,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    windowContent: {
        padding: 40,
    },
    heroSection: {
        marginBottom: 40,
    },
    heroWindow: {
        height: 320,
        justifyContent: 'center',
    },
    heroPre: {
        fontSize: 10,
        fontWeight: '900',
        color: '#FFF',
        letterSpacing: 4,
        marginBottom: 20,
        opacity: 0.5,
    },
    name: {
        fontSize: 42,
        fontWeight: '900',
        color: '#FFF',
        letterSpacing: -2,
        marginBottom: 20,
    },
    spatialLine: {
        width: 40,
        height: 4,
        backgroundColor: '#FFF',
        marginBottom: 24,
        opacity: 0.8,
    },
    headline: {
        fontSize: 14,
        fontWeight: '900',
        color: '#FFF',
        letterSpacing: 1,
        lineHeight: 22,
        opacity: 0.7,
    },
    section: {
        marginBottom: 40,
    },
    sectionLabel: {
        fontSize: 10,
        fontWeight: '900',
        color: 'rgba(255,255,255,0.3)',
        letterSpacing: 4,
        marginBottom: 24,
        marginLeft: 10,
    },
    summaryText: {
        fontSize: 17,
        lineHeight: 30,
        color: '#FFF',
        opacity: 0.8,
    },
    skillsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    skillChip: {
        paddingHorizontal: 20,
        paddingVertical: 14,
        borderRadius: 24,
        overflow: 'hidden',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
    },
    skillIcon: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: 'rgba(255,255,255,0.05)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    skillText: {
        fontSize: 11,
        fontWeight: '900',
        color: '#FFF',
    },
    projectWindow: {
        padding: 30,
        borderRadius: 32,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
        marginBottom: 20,
    },
    projectHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
        marginBottom: 24,
    },
    projectIcon: {
        width: 52,
        height: 52,
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.05)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    projectInfo: {
        flex: 1,
    },
    projectName: {
        fontSize: 22,
        fontWeight: '900',
        color: '#FFF',
        marginBottom: 4,
    },
    projectCat: {
        fontSize: 10,
        fontWeight: '900',
        color: 'rgba(255,255,255,0.4)',
        letterSpacing: 2,
    },
    projectDesc: {
        fontSize: 15,
        color: 'rgba(255,255,255,0.6)',
        lineHeight: 24,
        marginBottom: 24,
    },
    projectFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 24,
        borderTopWidth: 1,
        borderTopColor: 'rgba(255,255,255,0.05)',
    },
    exploreText: {
        fontSize: 11,
        fontWeight: '900',
        color: '#FFF',
        letterSpacing: 1,
    },
    footerBtn: {
        marginTop: 20,
        borderRadius: 32,
        overflow: 'hidden',
    },
    footerInner: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 24,
        gap: 20,
    },
    footerText: {
        fontSize: 13,
        fontWeight: '900',
        color: '#FFF',
        letterSpacing: 2,
    }
});
