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
import { ChevronLeft, ArrowRight, Zap, Target, Instagram, Twitter, Linkedin, Sparkles } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { FadeIn, FadeInDown, useAnimatedStyle, withRepeat, withTiming, withSequence } from 'react-native-reanimated';
import { portfolioprofile } from './portfoliodata';

const { width, height } = Dimensions.get('window');

const Particle = ({ delay, style }) => {
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            { translateY: withRepeat(withSequence(withTiming(-20, { duration: 2000 }), withTiming(0, { duration: 2000 })), -1, true) },
            { rotate: withRepeat(withTiming('360deg', { duration: 5000 }), -1, false) },
        ],
    }));

    return <Animated.View style={[styles.particle, style, animatedStyle]} />;
};

const GeometricBackground = () => (
    <View style={StyleSheet.absoluteFill}>
        <LinearGradient colors={['#F8FAFC', '#F1F5F9']} style={StyleSheet.absoluteFill} />
        <Particle style={{ top: 100, left: 50, backgroundColor: '#CBD5E1' }} />
        <Particle style={{ top: 300, right: 80, backgroundColor: '#94A3B8', width: 12, height: 12 }} />
        <Particle style={{ bottom: 200, left: 100, backgroundColor: '#E2E8F0', width: 24, height: 24 }} />
    </View>
);

export default function Portfolio65({ navigation }) {
    const { personal_info, hero, summary, technical_stack, projects } = portfolioprofile;

    return (
        <View style={styles.container}>
            <GeometricBackground />
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <ChevronLeft size={24} color="#64748B" />
                    </TouchableOpacity>
                    <Sparkles size={24} color="#64748B" />
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    <View style={styles.profileSection}>
                        <Animated.View entering={FadeInDown.duration(800)} style={styles.avatarShape} />
                        <Animated.Text entering={FadeInDown.delay(200).duration(800)} style={styles.name}>{personal_info.name}</Animated.Text>
                        <Animated.Text entering={FadeInDown.delay(400).duration(800)} style={styles.headline}>{personal_info.headline}</Animated.Text>
                    </View>

                    <View style={styles.actionList}>
                        <TouchableOpacity style={styles.mainCard}>
                            <Text style={styles.mainCardText}>BROWSE MY ARTIFACTS</Text>
                            <Zap size={20} color="#64748B" fill="#64748B" />
                        </TouchableOpacity>

                        {projects.slice(0, 5).map((p, i) => (
                            <TouchableOpacity key={p.name} style={styles.linkCard}>
                                <Text style={styles.linkText}>{p.name.toUpperCase()}</Text>
                                <ArrowRight size={18} color="#94A3B8" />
                            </TouchableOpacity>
                        ))}

                        <TouchableOpacity style={styles.ghostAction}>
                            <Target size={20} color="#64748B" />
                            <Text style={styles.ghostText}>ESTABLISH_CONNECTION</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.socialRow}>
                        <TouchableOpacity style={styles.socialIcon}><Instagram size={20} color="#64748B" /></TouchableOpacity>
                        <TouchableOpacity style={styles.socialIcon}><Twitter size={20} color="#64748B" /></TouchableOpacity>
                        <TouchableOpacity style={styles.socialIcon}><Linkedin size={20} color="#64748B" /></TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    particle: {
        position: 'absolute',
        width: 16,
        height: 16,
        borderRadius: 4,
        opacity: 0.3,
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
        borderRadius: 12,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#64748B',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
    },
    scrollContent: {
        paddingHorizontal: 24,
        paddingBottom: 40,
        alignItems: 'center',
    },
    profileSection: {
        alignItems: 'center',
        marginVertical: 40,
    },
    avatarShape: {
        width: 80,
        height: 80,
        borderRadius: 24,
        backgroundColor: '#CBD5E1',
        marginBottom: 24,
        transform: [{ rotate: '45deg' }],
    },
    name: {
        fontSize: 28,
        fontWeight: '900',
        color: '#1E293B',
        marginBottom: 8,
    },
    headline: {
        fontSize: 14,
        color: '#64748B',
        textAlign: 'center',
        lineHeight: 22,
        paddingHorizontal: 30,
    },
    actionList: {
        width: '100%',
        gap: 12,
    },
    mainCard: {
        width: '100%',
        backgroundColor: '#FFF',
        paddingVertical: 24,
        paddingHorizontal: 24,
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: '#64748B',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
        elevation: 8,
    },
    mainCardText: {
        fontSize: 14,
        fontWeight: '900',
        color: '#1E293B',
        letterSpacing: 2,
    },
    linkCard: {
        width: '100%',
        backgroundColor: '#FFF',
        paddingVertical: 20,
        paddingHorizontal: 24,
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    linkText: {
        fontSize: 12,
        fontWeight: '700',
        color: '#64748B',
        letterSpacing: 1,
    },
    ghostAction: {
        paddingVertical: 24,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 12,
    },
    ghostText: {
        fontSize: 12,
        fontWeight: '900',
        color: '#64748B',
        letterSpacing: 2,
    },
    socialRow: {
        flexDirection: 'row',
        marginTop: 40,
        gap: 32,
    },
    socialIcon: {
        padding: 5,
    }
});
