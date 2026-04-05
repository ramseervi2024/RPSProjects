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
import { ChevronLeft, ArrowRight, Map, Globe, Compass, Zap, Target, Mail } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { FadeIn, FadeInDown, useAnimatedStyle, withRepeat, withTiming, withSequence } from 'react-native-reanimated';
import { portfolioprofile } from './portfoliodata';

const { width, height } = Dimensions.get('window');

const TopoLine = ({ d, color, delay }) => {
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            { scale: withRepeat(withSequence(withTiming(1.05, { duration: 3000 }), withTiming(1, { duration: 3000 })), -1, true) },
            { rotate: withRepeat(withTiming('1deg', { duration: 4000 }), -1, true) },
        ],
    }));

    return (
        <Animated.View style={[styles.topoLine, { borderColor: color, top: d * 100, left: -d * 20, width: width * 1.5, height: 400, borderRadius: 200 }, animatedStyle]} />
    );
};

const TopoBackground = () => (
    <View style={StyleSheet.absoluteFill}>
        <LinearGradient colors={['#1E1E1E', '#121212']} style={StyleSheet.absoluteFill} />
        {[1, 2, 3, 4, 5].map((i) => (
            <TopoLine key={i} d={i} color={`rgba(255,255,255,${0.05 / i})`} delay={i * 500} />
        ))}
    </View>
);

export default function Portfolio74({ navigation }) {
    const { personal_info, hero, projects } = portfolioprofile;

    return (
        <View style={styles.container}>
            <TopoBackground />
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <ChevronLeft size={24} color="#FFF" />
                    </TouchableOpacity>
                    <Compass size={24} color="rgba(255,255,255,0.4)" />
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    <View style={styles.heroSection}>
                        <Animated.Text entering={FadeInDown.duration(800)} style={styles.preTitle}>COORD_SYSTEM: V74_LAT_LNG</Animated.Text>
                        <Animated.Text entering={FadeInDown.delay(200).duration(800)} style={styles.name}>{personal_info.name.toUpperCase()}</Animated.Text>
                        <Animated.Text entering={FadeInDown.delay(400).duration(800)} style={styles.title}>{personal_info.title.toUpperCase()}</Animated.Text>
                        
                        <View style={styles.locationTag}>
                            <Map size={12} color="#4ADE80" />
                            <Text style={styles.locationText}>{personal_info.location.toUpperCase()}</Text>
                        </View>
                    </View>

                    <View style={styles.gridStack}>
                        <TouchableOpacity style={styles.topoCard}>
                            <View style={styles.cardInfo}>
                                <Text style={styles.cardPre}>MISSION_REPORT</Text>
                                <Text style={styles.cardTitle}>STRATEGIC_SOLUTIONS</Text>
                            </View>
                            <Target size={24} color="#FFF" />
                        </TouchableOpacity>

                        {projects.slice(0, 5).map((p, i) => (
                            <TouchableOpacity key={p.name} style={styles.projectButton}>
                                <View style={styles.projectIndex}>
                                    <View style={styles.dot} />
                                    <Text style={styles.indexText}>{i + 1}</Text>
                                </View>
                                <Text style={styles.projectText}>{p.name.toUpperCase()}</Text>
                                <ArrowRight size={18} color="rgba(255,255,255,0.2)" />
                            </TouchableOpacity>
                        ))}

                        <TouchableOpacity style={styles.contactAction}>
                            <Mail size={20} color="#FFF" />
                            <Text style={styles.contactLabel}>INITIATE_UPLINK</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.socialBar}>
                        <TouchableOpacity style={styles.socialIcon}><Globe size={20} color="rgba(255,255,255,0.3)" /></TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1E1E1E',
    },
    topoLine: {
        position: 'absolute',
        borderWidth: 1,
        opacity: 0.8,
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
    heroSection: {
        marginVertical: 40,
        alignItems: 'center',
    },
    preTitle: {
        fontSize: 10,
        fontWeight: '900',
        color: 'rgba(255,255,255,0.4)',
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
    title: {
        fontSize: 14,
        fontWeight: '700',
        color: 'rgba(255,255,255,0.6)',
        letterSpacing: 2,
        marginTop: 8,
        textAlign: 'center',
    },
    locationTag: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginTop: 24,
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: 'rgba(74,222,128,0.05)',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: 'rgba(74,222,128,0.1)',
    },
    locationText: {
        fontSize: 10,
        fontWeight: '900',
        color: '#4ADE80',
        letterSpacing: 2,
    },
    gridStack: {
        width: '100%',
        gap: 12,
    },
    topoCard: {
        width: '100%',
        backgroundColor: 'rgba(255,255,255,0.05)',
        paddingVertical: 24,
        paddingHorizontal: 24,
        borderRadius: 4,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
    },
    cardInfo: {
        gap: 4,
    },
    cardPre: {
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
    projectButton: {
        width: '100%',
        backgroundColor: 'rgba(255,255,255,0.02)',
        paddingVertical: 20,
        paddingHorizontal: 24,
        borderRadius: 4,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
    },
    projectIndex: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    dot: {
        width: 12,
        height: 2,
        backgroundColor: 'rgba(255,255,255,0.2)',
    },
    indexText: {
        fontSize: 10,
        fontWeight: '900',
        color: 'rgba(255,255,255,0.3)',
    },
    projectText: {
        flex: 1,
        fontSize: 12,
        fontWeight: '700',
        color: 'rgba(255,255,255,0.6)',
        letterSpacing: 1,
        marginLeft: 16,
    },
    contactAction: {
        paddingVertical: 24,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 12,
    },
    contactLabel: {
        fontSize: 12,
        fontWeight: '900',
        color: 'rgba(255,255,255,0.6)',
        letterSpacing: 2,
    },
    socialBar: {
        marginTop: 40,
        alignItems: 'center',
        paddingBottom: 20,
    },
    socialIcon: {
        padding: 5,
    }
});
