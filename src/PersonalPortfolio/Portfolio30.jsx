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
import { ChevronLeft, Globe, Star, Sun, Moon, ArrowUpRight, Zap, Orbit } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { FadeIn, FadeInDown, SlideInRight, useAnimatedStyle, withRepeat, withTiming, withSequence, Easing } from 'react-native-reanimated';
import { portfolioprofile } from './portfoliodata';

const { width } = Dimensions.get('window');

const OrbitalNode = ({ label, delay = 0, style, color }) => {
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ rotate: withRepeat(withTiming('360deg', { duration: 10000, easing: Easing.linear }), -1, false) }],
    }));

    return (
        <Animated.View style={[styles.orbit, style, animatedStyle]}>
            <View style={[styles.node, { borderColor: color }]}>
                <Text style={styles.nodeText}>{label.toUpperCase()}</Text>
            </View>
        </Animated.View>
    );
};

export default function Portfolio30({ navigation }) {
    const { personal_info, hero, summary, technical_stack, projects } = portfolioprofile;

    return (
        <View style={styles.container}>
            <LinearGradient colors={['#020617', '#0F172A', '#1E293B']} style={StyleSheet.absoluteFill} />
            
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <ChevronLeft size={24} color="#FFF" />
                    </TouchableOpacity>
                    <View style={styles.systemBadge}>
                        <Globe size={14} color="#FFF" />
                        <Text style={styles.systemText}>CELESTIAL_30</Text>
                    </View>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    {/* Solar Center */}
                    <View style={styles.solarSystem}>
                        <View style={styles.sunCenter}>
                            <LinearGradient colors={['#F59E0B', '#EF4444']} style={styles.sunGradient} />
                            <Text style={styles.sunName}>{personal_info.name.split(' ')[0][0]}{personal_info.name.split(' ')[1][0]}</Text>
                        </View>
                        
                        {/* Orbital Skills */}
                        <OrbitalNode label={technical_stack.mobile[0]} color="#F59E0B" style={{ width: 220, height: 220 }} />
                        <OrbitalNode label={technical_stack.mobile[1]} color="#3B82F6" style={{ width: 320, height: 320 }} />
                        <OrbitalNode label={technical_stack.frontend[0]} color="#EC4899" style={{ width: 420, height: 420 }} />
                        
                        <View style={styles.profileMeta}>
                            <Animated.Text entering={FadeIn.duration(1000)} style={styles.profileName}>{personal_info.name.toUpperCase()}</Animated.Text>
                            <Animated.Text entering={FadeInDown.delay(200).duration(1000)} style={styles.profileHeadline}>{personal_info.headline}</Animated.Text>
                        </View>
                    </View>

                    {/* Galaxy Sections */}
                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <Star size={16} color="#F59E0B" fill="#F59E0B" />
                            <Text style={styles.sectionTitle}>CONSTELLATIONS_OF_WORK</Text>
                        </View>
                        {projects.slice(0, 4).map((p, i) => (
                            <TouchableOpacity key={p.name} style={styles.celestialCard}>
                                <LinearGradient 
                                    colors={['rgba(255,255,255,0.08)', 'rgba(255,255,255,0.02)']} 
                                    style={StyleSheet.absoluteFill}
                                />
                                <View style={styles.cardTop}>
                                    <View style={styles.planetIcon}>
                                        <View style={[styles.planet, { backgroundColor: i % 2 === 0 ? '#3B82F6' : '#EF4444' }]} />
                                    </View>
                                    <View style={styles.cardInfo}>
                                        <Text style={styles.projectName}>{p.name.toUpperCase()}</Text>
                                        <Text style={styles.projectCat}>{p.category.toUpperCase()}</Text>
                                    </View>
                                </View>
                                <Text style={styles.projectDesc}>{p.description.slice(0, 100)}...</Text>
                                <View style={styles.cardFooter}>
                                    <Text style={styles.viewLabel}>Enter Orbit</Text>
                                    <ArrowUpRight size={18} color="#FFF" />
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Final Gravity Pull */}
                    <TouchableOpacity style={styles.footerBtn} onPress={() => navigation.goBack()}>
                        <LinearGradient colors={['#F59E0B', '#EF4444']} style={styles.footerGradient}>
                            <Text style={styles.footerText}>ESTABLISH_NEURAL_UPLINK</Text>
                            <Orbit size={24} color="#FFF" />
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
        backgroundColor: 'rgba(255,255,255,0.05)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    systemBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingHorizontal: 16,
        paddingVertical: 10,
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: 20,
    },
    systemText: {
        fontSize: 10,
        fontWeight: '900',
        color: '#FFF',
        letterSpacing: 2,
    },
    scrollContent: {
        paddingBottom: 60,
    },
    solarSystem: {
        height: 500,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    sunCenter: {
        width: 100,
        height: 100,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
        shadowColor: '#F59E0B',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 30,
        elevation: 20,
    },
    sunGradient: {
        ...StyleSheet.absoluteFillObject,
        borderRadius: 50,
    },
    sunName: {
        fontSize: 32,
        fontWeight: '900',
        color: '#FFF',
    },
    orbit: {
        position: 'absolute',
        borderRadius: 500,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    node: {
        position: 'absolute',
        top: -10,
        paddingHorizontal: 12,
        paddingVertical: 6,
        backgroundColor: '#020617',
        borderWidth: 2,
        borderRadius: 12,
    },
    nodeText: {
        fontSize: 8,
        fontWeight: '900',
        color: '#FFF',
    },
    profileMeta: {
        position: 'absolute',
        bottom: 20,
        alignItems: 'center',
    },
    profileName: {
        fontSize: 32,
        fontWeight: '900',
        color: '#FFF',
        letterSpacing: 4,
        marginBottom: 8,
    },
    profileHeadline: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.5)',
        textAlign: 'center',
        paddingHorizontal: 40,
    },
    section: {
        paddingHorizontal: 24,
        marginTop: 40,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        marginBottom: 32,
    },
    sectionTitle: {
        fontSize: 12,
        fontWeight: '900',
        color: '#FFF',
        letterSpacing: 4,
    },
    celestialCard: {
        marginBottom: 20,
        padding: 30,
        borderRadius: 32,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
    },
    cardTop: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        marginBottom: 20,
    },
    planetIcon: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(255,255,255,0.02)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    planet: {
        width: 24,
        height: 24,
        borderRadius: 12,
    },
    cardInfo: {
        flex: 1,
    },
    projectName: {
        fontSize: 20,
        fontWeight: '900',
        color: '#FFF',
        marginBottom: 4,
    },
    projectCat: {
        fontSize: 9,
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
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    viewLabel: {
        fontSize: 11,
        fontWeight: '900',
        color: '#FFF',
        letterSpacing: 1,
    },
    footerBtn: {
        marginHorizontal: 24,
        marginTop: 40,
        borderRadius: 32,
        overflow: 'hidden',
    },
    footerGradient: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 24,
        gap: 20,
    },
    footerText: {
        fontSize: 12,
        fontWeight: '900',
        color: '#FFF',
        letterSpacing: 2,
    }
});
