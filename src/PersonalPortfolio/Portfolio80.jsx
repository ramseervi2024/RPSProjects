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
import { ChevronLeft, ArrowRight, Zap, Orbit, Compass, Target, Globe, Radio } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { FadeIn, FadeInDown, useAnimatedStyle, withRepeat, withTiming, withSequence, Easing } from 'react-native-reanimated';
import { portfolioprofile } from './portfoliodata';

const { width, height } = Dimensions.get('window');

const RadarRing = ({ size, delay }) => {
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: withRepeat(withSequence(withTiming(1, { duration: 3000 + delay }), withTiming(1.1, { duration: 3000 + delay })), -1, true) }],
        opacity: withRepeat(withSequence(withTiming(0.1, { duration: 3000 + delay }), withTiming(0.3, { duration: 3000 + delay })), -1, true),
    }));

    return (
        <Animated.View style={[styles.radarRing, { width: size, height: size, borderRadius: size / 2 }, animatedStyle]} />
    );
};

const RadarBackground = () => (
    <View style={styles.radarContainer}>
        <LinearGradient colors={['#020617', '#0F172A']} style={StyleSheet.absoluteFill} />
        <RadarRing size={width * 0.5} delay={0} />
        <RadarRing size={width * 0.9} delay={500} />
        <RadarRing size={width * 1.3} delay={1000} />
        <View style={styles.radarLineV} />
        <View style={styles.radarLineH} />
    </View>
);

export default function Portfolio80({ navigation }) {
    const { personal_info, projects } = portfolioprofile;

    return (
        <View style={styles.container}>
            <RadarBackground />
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <ChevronLeft size={24} color="#FBBF24" />
                    </TouchableOpacity>
                    <Orbit size={24} color="#FBBF24" />
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    <View style={styles.technicalHeader}>
                        <Animated.Text entering={FadeInDown.duration(800)} style={styles.schemaType}>RADAR_SCOPE: V80_POLAR</Animated.Text>
                        <Animated.Text entering={FadeInDown.delay(200).duration(800)} style={styles.name}>{personal_info.name.toUpperCase()}</Animated.Text>
                        <Animated.Text entering={FadeInDown.delay(400).duration(800)} style={styles.role}>{personal_info.title.toUpperCase()}</Animated.Text>
                        
                        <View style={styles.coordBox}>
                            <Compass size={14} color="#FBBF24" />
                            <Text style={styles.coordText}>34.0522° N, 118.2437° W</Text>
                        </View>
                    </View>

                    <View style={styles.radarStack}>
                        <TouchableOpacity style={styles.radarCard}>
                            <View style={styles.cardLead}>
                                <Radio size={20} color="#000" />
                                <Text style={styles.cardTitle}>PING_REPOSITORY</Text>
                            </View>
                            <Zap size={20} color="#000" fill="#000" />
                        </TouchableOpacity>

                        {projects.slice(0, 5).map((p, i) => (
                            <TouchableOpacity key={p.name} style={styles.radarLink}>
                                <View style={styles.linkInfo}>
                                    <View style={styles.linkDot} />
                                    <Text style={styles.linkText}>{p.name.toUpperCase()}</Text>
                                </View>
                                <ArrowRight size={18} color="#FBBF24" />
                            </TouchableOpacity>
                        ))}

                        <TouchableOpacity style={styles.uplinkButton}>
                            <Globe size={20} color="#FBBF24" />
                            <Text style={styles.uplinkLabel}>ESTABLISH_UPLINK.SH</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.footerMark}>
                        <Target size={16} color="rgba(251,191,36,0.2)" />
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
    radarContainer: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
    },
    radarRing: {
        position: 'absolute',
        borderWidth: 1,
        borderColor: '#FBBF24',
    },
    radarLineV: {
        position: 'absolute',
        width: 1,
        height: height,
        backgroundColor: '#FBBF24',
        opacity: 0.1,
    },
    radarLineH: {
        position: 'absolute',
        width: width,
        height: 1,
        backgroundColor: '#FBBF24',
        opacity: 0.1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingVertical: 16,
    },
    backBtn: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(251,191,36,0.05)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(251,191,36,0.2)',
    },
    scrollContent: {
        paddingHorizontal: 24,
        paddingBottom: 40,
    },
    technicalHeader: {
        marginVertical: 40,
        alignItems: 'center',
    },
    schemaType: {
        fontSize: 10,
        fontWeight: '900',
        color: 'rgba(251,191,36,0.4)',
        letterSpacing: 4,
        marginBottom: 16,
    },
    name: {
        fontSize: 52,
        fontWeight: '900',
        color: '#FFF',
        letterSpacing: -2,
        textAlign: 'center',
    },
    role: {
        fontSize: 14,
        fontWeight: '800',
        color: '#FBBF24',
        letterSpacing: 3,
        marginTop: 8,
        textAlign: 'center',
    },
    coordBox: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginTop: 32,
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: 'rgba(251,191,36,0.1)',
        borderRadius: 4,
    },
    coordText: {
        fontSize: 10,
        fontWeight: '900',
        color: '#FFF',
        letterSpacing: 1,
    },
    radarStack: {
        width: '100%',
        gap: 12,
    },
    radarCard: {
        width: '100%',
        backgroundColor: '#FBBF24',
        paddingVertical: 24,
        paddingHorizontal: 24,
        borderRadius: 4,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cardLead: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    cardTitle: {
        fontSize: 12,
        fontWeight: '900',
        color: '#000',
        letterSpacing: 2,
    },
    radarLink: {
        width: '100%',
        backgroundColor: 'rgba(255,255,255,0.02)',
        paddingVertical: 20,
        paddingHorizontal: 24,
        borderRadius: 4,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(251,191,36,0.1)',
    },
    linkInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    linkDot: {
        width: 12,
        height: 12,
        borderWidth: 1,
        borderColor: '#FBBF24',
        borderRadius: 6,
    },
    linkText: {
        fontSize: 12,
        fontWeight: '700',
        color: 'rgba(255,255,255,0.6)',
        letterSpacing: 1,
    },
    uplinkButton: {
        paddingVertical: 24,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 12,
        marginTop: 12,
    },
    uplinkLabel: {
        fontSize: 12,
        fontWeight: '900',
        color: '#FBBF24',
        letterSpacing: 2,
    },
    footerMark: {
        marginTop: 40,
        alignItems: 'center',
        paddingBottom: 20,
    },
});
