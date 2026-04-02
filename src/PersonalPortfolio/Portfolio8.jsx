import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    Dimensions
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Box, Layers, Play, Zap, ChevronLeft, ArrowUpRight, Cpu, Code } from 'lucide-react-native';
import Animated, { FadeInUp, SlideInRight, useAnimatedStyle, withRepeat, withTiming, withSequence, useSharedValue } from 'react-native-reanimated';
import { portfolioprofile } from './portfoliodata';

const { width } = Dimensions.get('window');

const GlassCard = ({ children, style, index }) => (
    <Animated.View 
        entering={FadeInUp.delay(index * 150).duration(800)}
        style={[styles.glassCard, style]}
    >
        <LinearGradient
            colors={['rgba(255, 255, 255, 0.15)', 'rgba(255, 255, 255, 0.05)']}
            style={styles.glassGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
        />
        {children}
    </Animated.View>
);

export default function Portfolio8({ navigation }) {
    const { personal_info, hero, projects, services } = portfolioprofile;

    return (
        <View style={styles.container}>
            <LinearGradient colors={['#0F1115', '#1B1F24', '#0F1115']} style={StyleSheet.absoluteFill} />
            
            {/* Background Decorative Light */}
            <View style={styles.bgLight} />

            <SafeAreaView style={styles.safeArea}>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
                    
                    {/* Header */}
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                            <ChevronLeft size={20} color="#FFF" />
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>CINEMATIC.V1</Text>
                        <View style={styles.badge}>
                            <View style={styles.liveDot} />
                            <Text style={styles.liveText}>STUDIO</Text>
                        </View>
                    </View>

                    {/* Glass Hero */}
                    <View style={styles.heroSection}>
                        <Animated.Text entering={FadeInUp.duration(1000)} style={styles.heroPre}>MOBILE ARCHITECTURE / DESIGN / DEV</Animated.Text>
                        <View style={styles.heroTextContainer}>
                            <Text style={styles.heroTitle}>WE BUILD</Text>
                            <Text style={styles.heroName}>{personal_info.name.split(' ')[0].toUpperCase()}</Text>
                        </View>
                        <View style={styles.heroDivider} />
                        <Text style={styles.heroSubtitle}>{hero.subtitle}</Text>
                    </View>

                    {/* Services Row */}
                    <View style={styles.section}>
                        <Text style={styles.sectionHead}>SERVICES_</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.serviceRow}>
                            {services.slice(0, 4).map((service, index) => (
                                <GlassCard key={index} style={styles.serviceCard} index={index}>
                                    <View style={styles.serviceIcon}>
                                        <Zap size={20} color="#60A5FA" />
                                    </View>
                                    <Text style={styles.serviceTitle}>{service}</Text>
                                </GlassCard>
                            ))}
                        </ScrollView>
                    </View>

                    {/* Featured Layout */}
                    <View style={styles.section}>
                        <Text style={styles.sectionHead}>KEY_PROJECTS_</Text>
                        {projects.slice(0, 3).map((project, index) => (
                            <GlassCard key={index} style={styles.projectCard} index={index}>
                                <View style={styles.projHeader}>
                                    <Box size={24} color="#FFF" opacity={0.5} />
                                    <TouchableOpacity style={styles.projBtn}>
                                        <ArrowUpRight size={16} color="#FFF" />
                                    </TouchableOpacity>
                                </View>
                                <Text style={styles.projLabel}>PROJECT 0{index + 1}</Text>
                                <Text style={styles.projName}>{project.name}</Text>
                                <View style={styles.tagRow}>
                                    {project.technologies.slice(0, 2).map((tech, i) => (
                                        <View key={i} style={styles.tag}><Text style={styles.tagText}>{tech}</Text></View>
                                    ))}
                                </View>
                            </GlassCard>
                        ))}
                    </View>

                    {/* Tech & OS Feel */}
                    <View style={styles.section}>
                        <Text style={styles.sectionHead}>CORE_ENGINE_</Text>
                        <GlassCard style={styles.engineCard} index={5}>
                            <View style={styles.engineHeader}>
                                <Cpu size={24} color="#6366F1" />
                                <Text style={styles.engineTitle}>RUNTIME ENVIRONMENT</Text>
                            </View>
                            <View style={styles.engineGrid}>
                                <View style={styles.engineItem}>
                                    <Text style={styles.engineVal}>3.5+</Text>
                                    <Text style={styles.engineLabel}>EXP_YEARS</Text>
                                </View>
                                <View style={styles.engineItem}>
                                    <Text style={styles.engineVal}>100%</Text>
                                    <Text style={styles.engineLabel}>PIXEL_PERF</Text>
                                </View>
                            </View>
                        </GlassCard>
                    </View>

                    {/* Footer Contact */}
                    <View style={styles.footer}>
                        <TouchableOpacity style={styles.contactBtn}>
                            <View style={styles.contactBtnInner}>
                                <Text style={styles.contactBtnText}>INITIATE PROJECT</Text>
                                <Play size={16} color="#000" fill="#000" />
                            </View>
                        </TouchableOpacity>
                        <Text style={styles.footerSign}>{personal_info.name.toUpperCase()} // CVV.2024</Text>
                    </View>

                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0F1115',
    },
    safeArea: {
        flex: 1,
    },
    scrollContainer: {
        paddingBottom: 40,
    },
    bgLight: {
        position: 'absolute',
        top: -100,
        right: -100,
        width: 300,
        height: 300,
        backgroundColor: '#3B82F6',
        borderRadius: 150,
        opacity: 0.1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 24,
        gap: 16,
    },
    backBtn: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    headerTitle: {
        fontSize: 12,
        fontWeight: '900',
        color: '#FFF',
        letterSpacing: 3,
        flex: 1,
    },
    badge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        gap: 8,
    },
    liveDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#3B82F6',
    },
    liveText: {
        fontSize: 10,
        color: '#FFF',
        fontWeight: '800',
        letterSpacing: 1,
    },
    heroSection: {
        padding: 24,
        marginTop: 20,
    },
    heroPre: {
        fontSize: 10,
        fontWeight: '700',
        color: '#64748B',
        letterSpacing: 2,
        marginBottom: 12,
    },
    heroTextContainer: {
        marginBottom: 20,
    },
    heroTitle: {
        fontSize: 42,
        fontWeight: '900',
        color: '#FFF',
        letterSpacing: -2,
    },
    heroName: {
        fontSize: 72,
        fontWeight: '900',
        color: '#3B82F6',
        marginTop: -15,
        letterSpacing: -4,
    },
    heroDivider: {
        width: 40,
        height: 2,
        backgroundColor: '#3B82F6',
        marginBottom: 20,
    },
    heroSubtitle: {
        fontSize: 16,
        color: '#94A3B8',
        lineHeight: 24,
        maxWidth: 280,
    },
    section: {
        marginTop: 40,
    },
    sectionHead: {
        fontSize: 12,
        fontWeight: '900',
        color: '#475569',
        letterSpacing: 3,
        paddingHorizontal: 24,
        marginBottom: 20,
    },
    serviceRow: {
        paddingHorizontal: 24,
        gap: 16,
    },
    serviceCard: {
        width: 160,
        height: 180,
        padding: 20,
        justifyContent: 'space-between',
    },
    serviceIcon: {
        width: 40,
        height: 40,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    serviceTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#FFF',
    },
    glassCard: {
        borderRadius: 24,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    glassGradient: {
        ...StyleSheet.absoluteFillObject,
    },
    projectCard: {
        padding: 24,
        marginHorizontal: 24,
        marginBottom: 20,
    },
    projHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    projBtn: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    projLabel: {
        fontSize: 10,
        fontWeight: '800',
        color: '#3B82F6',
        letterSpacing: 1.5,
        marginBottom: 8,
    },
    projName: {
        fontSize: 24,
        fontWeight: '700',
        color: '#FFF',
        marginBottom: 16,
    },
    tagRow: {
        flexDirection: 'row',
        gap: 8,
    },
    tag: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 8,
    },
    tagText: {
        fontSize: 10,
        color: '#94A3B8',
        fontWeight: '700',
    },
    engineCard: {
        marginHorizontal: 24,
        padding: 24,
    },
    engineHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 24,
    },
    engineTitle: {
        fontSize: 12,
        fontWeight: '800',
        color: '#FFF',
        letterSpacing: 1,
    },
    engineGrid: {
        flexDirection: 'row',
        gap: 32,
    },
    engineItem: {
        flex: 1,
    },
    engineVal: {
        fontSize: 32,
        fontWeight: '900',
        color: '#FFF',
    },
    engineLabel: {
        fontSize: 10,
        fontWeight: '800',
        color: '#3B82F6',
        marginTop: 4,
    },
    footer: {
        marginTop: 60,
        alignItems: 'center',
        paddingBottom: 40,
    },
    contactBtn: {
        backgroundColor: '#FFF',
        borderRadius: 50,
        padding: 4,
        marginBottom: 40,
    },
    contactBtnInner: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        paddingVertical: 16,
        paddingHorizontal: 40,
        borderRadius: 50,
        gap: 12,
        borderWidth: 1,
        borderColor: '#EEE',
    },
    contactBtnText: {
        color: '#000',
        fontSize: 14,
        fontWeight: '900',
        letterSpacing: 1,
    },
    footerSign: {
        fontSize: 10,
        color: '#475569',
        fontWeight: '800',
        letterSpacing: 2,
    }
});
