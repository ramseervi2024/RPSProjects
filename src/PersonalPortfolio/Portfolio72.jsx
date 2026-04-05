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
import { ChevronLeft, ArrowRight, Zap, Target, Book, Layout, Globe, Linkedin, Rocket } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { FadeIn, FadeInDown, useAnimatedStyle, withRepeat, withTiming, withSequence, Easing } from 'react-native-reanimated';
import { portfolioprofile } from './portfoliodata';

const { width, height } = Dimensions.get('window');

const Star = ({ style, delay }) => {
    const animatedStyle = useAnimatedStyle(() => ({
        opacity: withRepeat(withSequence(withTiming(0.2, { duration: 1000 + delay }), withTiming(1, { duration: 1000 + delay })), -1, true),
        transform: [{ scale: withRepeat(withSequence(withTiming(0.8, { duration: 1500 }), withTiming(1.2, { duration: 1500 })), -1, true) }],
    }));

    return <Animated.View style={[styles.star, style, animatedStyle]} />;
};

const CosmicBackground = () => (
    <View style={StyleSheet.absoluteFill}>
        <LinearGradient colors={['#020617', '#000000']} style={StyleSheet.absoluteFill} />
        {[...Array(30)].map((_, i) => (
            <Star key={i} delay={i * 100} style={{ top: Math.random() * height, left: Math.random() * width }} />
        ))}
    </View>
);

export default function Portfolio72({ navigation }) {
    const { personal_info, hero, summary, technical_stack, projects } = portfolioprofile;

    return (
        <View style={styles.container}>
            <CosmicBackground />
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <ChevronLeft size={24} color="#FFF" />
                    </TouchableOpacity>
                    <Rocket size={24} color="#38BDF8" fill="#38BDF8" />
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    <View style={styles.heroBox}>
                        <Animated.Text entering={FadeInDown.duration(800)} style={styles.preTitle}>VOYAGER_PROTO_V72</Animated.Text>
                        <Animated.Text entering={FadeInDown.delay(200).duration(800)} style={styles.name}>{personal_info.name.toUpperCase()}</Animated.Text>
                        <Animated.Text entering={FadeInDown.delay(400).duration(800)} style={styles.title}>{personal_info.title.toUpperCase()}</Animated.Text>
                    </View>

                    <View style={styles.galaxyStack}>
                        <TouchableOpacity style={styles.glassButton}>
                            <LinearGradient colors={['rgba(56,189,248,0.2)', 'rgba(56,189,248,0.1)']} style={styles.glassInner}>
                                <Text style={styles.glassText}>LAUNCH_PHASE_01</Text>
                                <Zap size={20} color="#38BDF8" fill="#38BDF8" />
                            </LinearGradient>
                        </TouchableOpacity>

                        {projects.slice(0, 5).map((p, i) => (
                            <TouchableOpacity key={p.name} style={styles.satelliteRow}>
                                <View style={styles.node} />
                                <Text style={styles.satelliteText}>{p.name.toUpperCase()}</Text>
                                <ArrowRight size={18} color="rgba(255,255,255,0.3)" />
                            </TouchableOpacity>
                        ))}

                        <TouchableOpacity style={styles.uplinkAction}>
                            <Target size={20} color="#38BDF8" />
                            <Text style={styles.uplinkLabel}>ESTABLISH_UPLINK</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.socialBar}>
                        <TouchableOpacity style={styles.socialBtn}><Globe size={20} color="#FFF" /></TouchableOpacity>
                        <TouchableOpacity style={styles.socialBtn}><Linkedin size={20} color="#FFF" /></TouchableOpacity>
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
    star: {
        position: 'absolute',
        width: 2,
        height: 2,
        backgroundColor: '#FFF',
        borderRadius: 1,
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
        backgroundColor: 'rgba(255,255,255,0.05)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    scrollContent: {
        paddingHorizontal: 24,
        paddingBottom: 40,
        alignItems: 'center',
    },
    heroBox: {
        alignItems: 'center',
        marginVertical: 60,
    },
    preTitle: {
        fontSize: 12,
        fontWeight: '900',
        color: '#38BDF8',
        letterSpacing: 6,
        marginBottom: 20,
    },
    name: {
        fontSize: 48,
        fontWeight: '900',
        color: '#FFF',
        letterSpacing: -2,
        textAlign: 'center',
    },
    title: {
        fontSize: 14,
        fontWeight: '700',
        color: 'rgba(255,255,255,0.4)',
        letterSpacing: 4,
        marginTop: 12,
    },
    galaxyStack: {
        width: '100%',
        gap: 12,
    },
    glassButton: {
        width: '100%',
        borderRadius: 16,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(56,189,248,0.2)',
    },
    glassInner: {
        paddingVertical: 24,
        paddingHorizontal: 24,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    glassText: {
        fontSize: 14,
        fontWeight: '900',
        color: '#FFF',
        letterSpacing: 2,
    },
    satelliteRow: {
        width: '100%',
        backgroundColor: 'rgba(255,255,255,0.02)',
        paddingVertical: 20,
        paddingHorizontal: 24,
        borderRadius: 16,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
    },
    node: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#38BDF8',
        marginRight: 16,
    },
    satelliteText: {
        flex: 1,
        fontSize: 12,
        fontWeight: '800',
        color: 'rgba(255,255,255,0.7)',
        letterSpacing: 1,
    },
    uplinkAction: {
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
        color: '#38BDF8',
        letterSpacing: 2,
    },
    socialBar: {
        flexDirection: 'row',
        marginTop: 40,
        gap: 32,
    },
    socialBtn: {
        width: 52,
        height: 52,
        borderRadius: 26,
        backgroundColor: 'rgba(255,255,255,0.02)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
});
