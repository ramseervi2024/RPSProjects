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
import { Sparkles, Star, Satellite, Radio, ChevronLeft, Rocket, Globe2, Moon } from 'lucide-react-native';
import Animated, { FadeIn, FadeInUp, FadeInDown, useAnimatedStyle, withRepeat, withTiming, withSequence, useSharedValue, withDelay, FadeInRight } from 'react-native-reanimated';
import { portfolioprofile } from './portfoliodata';

const { width, height } = Dimensions.get('window');

const FloatingStar = ({ index }) => {
    const opacity = useSharedValue(Math.random());
    const translateY = useSharedValue(Math.random() * 20);

    React.useEffect(() => {
        opacity.value = withRepeat(withSequence(withTiming(0.2, { duration: 1000 }), withTiming(1, { duration: 1000 })), -1, true);
        translateY.value = withRepeat(withTiming(-20, { duration: 2000 + Math.random() * 2000 }), -1, true);
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
        transform: [{ translateY: translateY.value }],
    }));

    return (
        <Animated.View 
            style={[
                styles.star, 
                { 
                    top: Math.random() * 400, 
                    left: Math.random() * width 
                }, 
                animatedStyle
            ]}
        >
            <Star size={Math.random() * 4 + 2} color="#FFF" fill="#FFF" />
        </Animated.View>
    );
};

export default function Portfolio7({ navigation }) {
    const { personal_info, hero, projects, technical_stack } = portfolioprofile;

    return (
        <View style={styles.container}>
            <LinearGradient colors={['#020617', '#1E1B4B', '#020617']} style={StyleSheet.absoluteFill} />
            
            {/* Stars Background */}
            <View style={StyleSheet.absoluteFill}>
                {[...Array(20)].map((_, i) => <FloatingStar key={i} index={i} />)}
            </View>

            <SafeAreaView style={styles.safeArea}>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
                    
                    {/* Galactic Header */}
                    <View style={styles.nav}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                            <ChevronLeft size={24} color="#A78BFA" />
                        </TouchableOpacity>
                        <View style={styles.missionControl}>
                            <Radio size={14} color="#A78BFA" />
                            <Text style={styles.missionText}>MISSION: PORTFOLIO</Text>
                        </View>
                    </View>

                    {/* Nebula Hero */}
                    <View style={styles.heroSection}>
                        <Animated.Text entering={FadeInDown.duration(1000)} style={styles.heroPre}>EXPLORING NEW FRONTIERS // MOBILE ARCHITECT</Animated.Text>
                        <Animated.Text entering={FadeInUp.delay(200).duration(1000)} style={styles.heroName}>{personal_info.name.toUpperCase()}</Animated.Text>
                        <View style={styles.glowContainer}>
                            <View style={styles.glow} />
                            <Text style={styles.heroTitle}>{hero.title}</Text>
                        </View>
                        <Text style={styles.heroSubtitle}>{hero.subtitle}</Text>
                    </View>

                    {/* Orbit / Stats Section */}
                    <View style={styles.orbitContainer}>
                        <View style={styles.circleOrbit}>
                            <Animated.View entering={FadeIn.delay(500)} style={styles.planet}>
                                <Moon size={32} color="#FACC15" fill="#FACC15" />
                            </Animated.View>
                        </View>
                        <View style={styles.statsColumn}>
                            <View style={styles.galacticStat}>
                                <Text style={styles.statVal}>{personal_info.experience_years}+</Text>
                                <Text style={styles.statLabel}>Solar Cycles Exp</Text>
                            </View>
                            <View style={styles.galacticStat}>
                                <Text style={styles.statVal}>15+</Text>
                                <Text style={styles.statLabel}>Planets (Apps) Launched</Text>
                            </View>
                        </View>
                    </View>

                    {/* Cosmos Skills */}
                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <Sparkles size={20} color="#A78BFA" />
                            <Text style={styles.sectionTitle}>TRANSMISSION_STACK</Text>
                        </View>
                        <View style={styles.skillUniverse}>
                            {technical_stack.mobile.map((skill, index) => (
                                <Animated.View 
                                    key={index} 
                                    entering={FadeInDown.delay(index * 100)}
                                    style={styles.cosmicBadge}
                                >
                                    <Text style={styles.cosmicText}>{skill.toUpperCase()}</Text>
                                </Animated.View>
                            ))}
                        </View>
                    </View>

                    {/* Nebula Repos (Projects) */}
                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <Satellite size={20} color="#A78BFA" />
                            <Text style={styles.sectionTitle}>GALACTIC_REPOS</Text>
                        </View>
                        {projects.slice(0, 3).map((project, index) => (
                            <Animated.View 
                                key={index} 
                                entering={FadeInRight.delay(index * 200)}
                                style={styles.projectNebula}
                            >
                                <LinearGradient 
                                    colors={['rgba(167, 139, 250, 0.1)', 'rgba(30, 27, 75, 0.5)']} 
                                    style={styles.nebulaGradient}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                />
                                <View style={styles.projectBody}>
                                    <Text style={styles.projTitle}>{project.name}</Text>
                                    <Text style={styles.projCategory}>{project.category}</Text>
                                    <View style={styles.divider} />
                                    <Text style={styles.projDesc}>{project.description}</Text>
                                    <TouchableOpacity style={styles.launchBtn}>
                                        <Rocket size={16} color="#A78BFA" />
                                        <Text style={styles.launchText}>LAUNCH MISSION</Text>
                                    </TouchableOpacity>
                                </View>
                            </Animated.View>
                        ))}
                    </View>

                    {/* Deep Space Contact */}
                    <View style={styles.contactVoid}>
                        <Globe2 size={40} color="#A78BFA" opacity={0.5} />
                        <Text style={styles.voidTitle}>ESTABLISH CONNECTION</Text>
                        <Text style={styles.voidEmail}>{personal_info.email}</Text>
                        <TouchableOpacity style={styles.commBtn}>
                            <Text style={styles.commText}>SEND TRANSMISSION</Text>
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
        backgroundColor: '#020617',
    },
    safeArea: {
        flex: 1,
    },
    scrollContainer: {
        paddingBottom: 40,
    },
    star: {
        position: 'absolute',
    },
    nav: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 24,
    },
    backBtn: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(167, 139, 250, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(167, 139, 250, 0.2)',
    },
    missionControl: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        backgroundColor: 'rgba(167, 139, 250, 0.05)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },
    missionText: {
        fontSize: 10,
        color: '#A78BFA',
        fontWeight: '800',
        letterSpacing: 2,
    },
    heroSection: {
        padding: 24,
        marginTop: 20,
        alignItems: 'center',
    },
    heroPre: {
        fontSize: 10,
        fontWeight: '900',
        color: '#A78BFA',
        letterSpacing: 3,
        marginBottom: 16,
        opacity: 0.8,
    },
    heroName: {
        fontSize: 42,
        fontWeight: '900',
        color: '#FFF',
        letterSpacing: -1,
        textAlign: 'center',
        textShadowColor: 'rgba(167, 139, 250, 0.8)',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 20,
    },
    glowContainer: {
        marginTop: 10,
        alignItems: 'center',
    },
    glow: {
        position: 'absolute',
        width: 150,
        height: 50,
        backgroundColor: '#A78BFA',
        borderRadius: 50,
        opacity: 0.1,
        transform: [{ scaleX: 2 }],
    },
    heroTitle: {
        fontSize: 18,
        color: '#A78BFA',
        fontWeight: '700',
        textAlign: 'center',
    },
    heroSubtitle: {
        fontSize: 14,
        color: '#94A3B8',
        textAlign: 'center',
        marginTop: 20,
        lineHeight: 22,
        maxWidth: 300,
    },
    orbitContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 24,
        marginVertical: 40,
        gap: 20,
    },
    circleOrbit: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: 'rgba(167, 139, 250, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    planet: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(250, 204, 21, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    statsColumn: {
        flex: 1,
        gap: 20,
    },
    galacticStat: {
        backgroundColor: 'rgba(167, 139, 250, 0.05)',
        padding: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: 'rgba(167, 139, 250, 0.1)',
    },
    statVal: {
        fontSize: 24,
        fontWeight: '900',
        color: '#FFF',
    },
    statLabel: {
        fontSize: 10,
        color: '#64748B',
        fontWeight: '700',
        textTransform: 'uppercase',
        marginTop: 4,
    },
    section: {
        padding: 24,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingLeft: 4,
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 12,
        fontWeight: '900',
        color: '#A78BFA',
        letterSpacing: 2,
    },
    skillUniverse: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    cosmicBadge: {
        backgroundColor: 'rgba(167, 139, 250, 0.05)',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: 'rgba(167, 139, 250, 0.2)',
    },
    cosmicText: {
        color: '#FFF',
        fontSize: 11,
        fontWeight: '800',
        letterSpacing: 1,
    },
    projectNebula: {
        borderRadius: 24,
        overflow: 'hidden',
        marginBottom: 20,
        borderWidth: 1,
        borderColor: 'rgba(167, 139, 250, 0.2)',
    },
    nebulaGradient: {
        ...StyleSheet.absoluteFillObject,
    },
    projectBody: {
        padding: 24,
    },
    projTitle: {
        fontSize: 20,
        fontWeight: '900',
        color: '#FFF',
    },
    projCategory: {
        fontSize: 10,
        color: '#A78BFA',
        fontWeight: '800',
        textTransform: 'uppercase',
        marginTop: 4,
        letterSpacing: 1,
    },
    divider: {
        width: 40,
        height: 2,
        backgroundColor: '#A78BFA',
        marginVertical: 16,
    },
    projDesc: {
        fontSize: 14,
        color: '#94A3B8',
        lineHeight: 22,
        marginBottom: 24,
    },
    launchBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    launchText: {
        fontSize: 12,
        fontWeight: '900',
        color: '#A78BFA',
        letterSpacing: 1,
    },
    contactVoid: {
        padding: 40,
        alignItems: 'center',
        backgroundColor: 'rgba(167, 139, 250, 0.02)',
        marginTop: 40,
    },
    voidTitle: {
        fontSize: 12,
        fontWeight: '900',
        color: '#A78BFA',
        letterSpacing: 3,
        marginTop: 20,
    },
    voidEmail: {
        fontSize: 20,
        color: '#FFF',
        fontWeight: '700',
        marginTop: 12,
    },
    commBtn: {
        marginTop: 32,
        backgroundColor: '#A78BFA',
        paddingHorizontal: 32,
        paddingVertical: 14,
        borderRadius: 30,
    },
    commText: {
        fontSize: 12,
        fontWeight: '900',
        color: '#1E1B4B',
    }
});
