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
import { ChevronLeft, ArrowRight, Zap, Sparkles, Instagram, Twitter, Linkedin, Github } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { FadeIn, FadeInDown, useAnimatedStyle, withRepeat, withTiming, withSequence, Easing } from 'react-native-reanimated';
import { portfolioprofile } from './portfoliodata';

const { width } = Dimensions.get('window');

const HolographicBackground = () => {
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            { rotate: withRepeat(withTiming('360deg', { duration: 15000, easing: Easing.linear }), -1, false) },
            { scale: withRepeat(withSequence(withTiming(1.2, { duration: 5000 }), withTiming(1, { duration: 5000 })), -1, true) },
        ],
    }));

    return (
        <View style={StyleSheet.absoluteFill}>
            <View style={styles.blackBase} />
            <Animated.View style={[styles.holoBlob, animatedStyle]}>
                <LinearGradient
                    colors={['#FF00CC', '#3333FF', '#00CCFF', '#00FF99', '#FFFF00', '#FF00CC']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={StyleSheet.absoluteFill}
                />
            </Animated.View>
            <View style={styles.overlayGlass} />
        </View>
    );
};

export default function Portfolio67({ navigation }) {
    const { personal_info, hero, summary, technical_stack, projects } = portfolioprofile;

    return (
        <View style={styles.container}>
            <HolographicBackground />
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <ChevronLeft size={24} color="#FFF" />
                    </TouchableOpacity>
                    <Sparkles size={24} color="#00FF99" fill="#00FF99" />
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    <View style={styles.heroSection}>
                        <Animated.Text entering={FadeInDown.duration(800)} style={styles.preTitle}>HOLO_MATRIX_V67</Animated.Text>
                        <Animated.Text entering={FadeInDown.delay(200).duration(800)} style={styles.name}>{personal_info.name.toUpperCase()}</Animated.Text>
                        <Animated.Text entering={FadeInDown.delay(400).duration(800)} style={styles.title}>{personal_info.title.toUpperCase()}</Animated.Text>
                    </View>

                    <View style={styles.linkStack}>
                        <TouchableOpacity style={styles.holoCard}>
                            <Text style={styles.holoCardText}>AUTHENTICATE_IDENTITY</Text>
                            <Zap size={20} color="#00FF99" fill="#00FF99" />
                        </TouchableOpacity>

                        {projects.slice(0, 5).map((p, i) => (
                            <TouchableOpacity key={p.name} style={styles.darkLink}>
                                <Text style={styles.darkLinkText}>{p.name.toUpperCase()}</Text>
                                <ArrowRight size={18} color="rgba(255,255,255,0.4)" />
                            </TouchableOpacity>
                        ))}

                        <TouchableOpacity style={styles.footerAction}>
                            <Text style={styles.footerActionText}>CONNECT_TO_CORE</Text>
                            <Github size={20} color="#00FF99" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.socialBar}>
                        <TouchableOpacity style={styles.socialIcon}><Instagram size={20} color="#FFF" /></TouchableOpacity>
                        <TouchableOpacity style={styles.socialIcon}><Twitter size={20} color="#FFF" /></TouchableOpacity>
                        <TouchableOpacity style={styles.socialIcon}><Linkedin size={20} color="#FFF" /></TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    blackBase: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#000',
    },
    holoBlob: {
        position: 'absolute',
        width: width * 1.5,
        height: width * 1.5,
        borderRadius: width * 0.75,
        top: -width * 0.25,
        left: -width * 0.25,
        opacity: 0.15,
    },
    overlayGlass: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.4)',
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
    heroSection: {
        alignItems: 'center',
        marginVertical: 60,
    },
    preTitle: {
        fontSize: 12,
        fontWeight: '900',
        color: '#00FF99',
        letterSpacing: 4,
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
        color: 'rgba(255,255,255,0.5)',
        letterSpacing: 3,
        marginTop: 12,
    },
    linkStack: {
        width: '100%',
        gap: 12,
    },
    holoCard: {
        width: '100%',
        backgroundColor: 'rgba(255,255,255,0.05)',
        paddingVertical: 24,
        paddingHorizontal: 24,
        borderRadius: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#00FF99',
    },
    holoCardText: {
        fontSize: 14,
        fontWeight: '900',
        color: '#FFF',
        letterSpacing: 2,
    },
    darkLink: {
        width: '100%',
        backgroundColor: 'rgba(255,255,255,0.02)',
        paddingVertical: 20,
        paddingHorizontal: 24,
        borderRadius: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
    },
    darkLinkText: {
        fontSize: 12,
        fontWeight: '700',
        color: 'rgba(255,255,255,0.7)',
        letterSpacing: 1,
    },
    footerAction: {
        paddingVertical: 24,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 12,
        marginTop: 12,
    },
    footerActionText: {
        fontSize: 12,
        fontWeight: '900',
        color: '#00FF99',
        letterSpacing: 2,
    },
    socialBar: {
        flexDirection: 'row',
        marginTop: 40,
        gap: 24,
    },
    socialIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: 'rgba(255,255,255,0.05)',
        justifyContent: 'center',
        alignItems: 'center',
    }
});
