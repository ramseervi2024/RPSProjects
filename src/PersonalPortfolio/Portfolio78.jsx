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
import { ChevronLeft, ArrowRight, Zap, Play, Film, SkipForward, Maximize, Ghost } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { FadeIn, FadeInDown, useAnimatedStyle, withRepeat, withTiming, withSequence } from 'react-native-reanimated';
import { portfolioprofile } from './portfoliodata';

const { width, height } = Dimensions.get('window');

const Grain = ({ delay }) => {
    const animatedStyle = useAnimatedStyle(() => ({
        opacity: withRepeat(withSequence(withTiming(0.1, { duration: 100 }), withTiming(0.3, { duration: 100 })), -1, true),
        transform: [{ translateX: Math.random() * 10 }, { translateY: Math.random() * 10 }],
    }));

    return <Animated.View style={[styles.grain, animatedStyle]} />;
};

const NoiseBackground = () => (
    <View style={StyleSheet.absoluteFill}>
        <LinearGradient colors={['#111', '#000']} style={StyleSheet.absoluteFill} />
        {/* Film grain simulation */}
        <View style={styles.grainOverlay}>
             {[...Array(50)].map((_, i) => (
                <View key={i} style={[styles.dust, { top: Math.random() * height, left: Math.random() * width, opacity: Math.random() * 0.2 }]} />
             ))}
        </View>
        <View style={styles.lightLeak} />
    </View>
);

export default function Portfolio78({ navigation }) {
    const { personal_info, projects } = portfolioprofile;

    return (
        <View style={styles.container}>
            <NoiseBackground />
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <ChevronLeft size={24} color="#FFF" />
                    </TouchableOpacity>
                    <Film size={24} color="rgba(255,255,255,0.4)" />
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    <View style={styles.cinemaHeader}>
                        <Animated.Text entering={FadeInDown.duration(800)} style={styles.preTitle}>RECORD_ID: V78_NOIR</Animated.Text>
                        <Animated.Text entering={FadeInDown.delay(200).duration(800)} style={styles.name}>{personal_info.name.toUpperCase()}</Animated.Text>
                        <Animated.Text entering={FadeInDown.delay(400).duration(800)} style={styles.role}>{personal_info.title.toUpperCase()}</Animated.Text>
                        
                        <View style={styles.timecode}>
                            <View style={styles.recDot} />
                            <Text style={styles.timeText}>00:00:24:12</Text>
                        </View>
                    </View>

                    <View style={styles.cinemaStack}>
                        <TouchableOpacity style={styles.cinemaCard}>
                            <View style={styles.cardInfo}>
                                <Text style={styles.cardLabel}>FEATURE_PRESENTATION</Text>
                                <Text style={styles.cardTitle}>DIRECTORIAL_VISION</Text>
                            </View>
                            <Play size={24} color="#FFF" fill="#FFF" />
                        </TouchableOpacity>

                        {projects.slice(0, 5).map((p, i) => (
                            <TouchableOpacity key={p.name} style={styles.sceneRow}>
                                <View style={styles.sceneIndex}>
                                    <Text style={styles.indexText}>SC_{i + 1}</Text>
                                </View>
                                <Text style={styles.sceneText}>{p.name.toUpperCase()}</Text>
                                <ArrowRight size={18} color="rgba(255,255,255,0.2)" />
                            </TouchableOpacity>
                        ))}

                        <TouchableOpacity style={styles.footerAction}>
                            <SkipForward size={20} color="rgba(255,255,255,0.6)" />
                            <Text style={styles.footerLabel}>PLAY_ARCHIVE_SESSION</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.bottomBar}>
                        <Maximize size={16} color="rgba(255,255,255,0.1)" />
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#111',
    },
    grainOverlay: {
        ...StyleSheet.absoluteFillObject,
    },
    dust: {
        position: 'absolute',
        width: 1,
        height: 1,
        backgroundColor: '#FFF',
    },
    lightLeak: {
        position: 'absolute',
        top: -100,
        right: -100,
        width: 400,
        height: 400,
        borderRadius: 200,
        backgroundColor: 'rgba(255,255,255,0.02)',
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
    },
    cinemaHeader: {
        marginVertical: 60,
        alignItems: 'center',
    },
    preTitle: {
        fontSize: 10,
        fontWeight: '900',
        color: 'rgba(255,255,255,0.3)',
        letterSpacing: 4,
        marginBottom: 20,
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
        fontWeight: '700',
        color: 'rgba(255,255,255,0.4)',
        letterSpacing: 4,
        marginTop: 12,
        textAlign: 'center',
    },
    timecode: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginTop: 40,
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: 'rgba(255,255,255,0.02)',
        borderRadius: 2,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
    },
    recDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#EF4444',
    },
    timeText: {
        fontSize: 10,
        fontWeight: '900',
        color: 'rgba(255,255,255,0.6)',
        letterSpacing: 2,
    },
    cinemaStack: {
        width: '100%',
        gap: 12,
    },
    cinemaCard: {
        width: '100%',
        backgroundColor: 'rgba(255,255,255,0.05)',
        paddingVertical: 32,
        paddingHorizontal: 24,
        borderRadius: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    cardInfo: {
        gap: 4,
    },
    cardLabel: {
        fontSize: 10,
        fontWeight: '900',
        color: 'rgba(255,255,255,0.4)',
        letterSpacing: 2,
    },
    cardTitle: {
        fontSize: 14,
        fontWeight: '900',
        color: '#FFF',
        letterSpacing: 1,
    },
    sceneRow: {
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
    sceneIndex: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: 2,
    },
    indexText: {
        fontSize: 10,
        fontWeight: '900',
        color: 'rgba(255,255,255,0.5)',
    },
    sceneText: {
        flex: 1,
        fontSize: 12,
        fontWeight: '800',
        color: 'rgba(255,255,255,0.6)',
        letterSpacing: 1,
        marginLeft: 20,
    },
    footerAction: {
        paddingVertical: 32,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 12,
    },
    footerLabel: {
        fontSize: 10,
        fontWeight: '900',
        color: 'rgba(255,255,255,0.5)',
        letterSpacing: 2,
    },
    bottomBar: {
        marginTop: 40,
        alignItems: 'center',
        paddingBottom: 20,
    },
});
