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
import { ChevronLeft, ArrowRight, Zap, Target, Instagram, Github, Twitter, Cpu } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { portfolioprofile } from './portfoliodata';

const { width } = Dimensions.get('window');

const CyberBackground = () => (
    <View style={StyleSheet.absoluteFill}>
        <LinearGradient colors={['#0F0524', '#1A0B2E']} style={StyleSheet.absoluteFill} />
        <View style={styles.neonGlow} />
        <View style={[styles.neonLine, { top: 200, backgroundColor: '#BD00FF' }]} />
        <View style={[styles.neonLine, { bottom: 200, backgroundColor: '#00F3FF', height: 1 }]} />
    </View>
);

export default function Portfolio69({ navigation }) {
    const { personal_info, hero, summary, technical_stack, projects } = portfolioprofile;

    return (
        <View style={styles.container}>
            <CyberBackground />
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <ChevronLeft size={24} color="#BD00FF" />
                    </TouchableOpacity>
                    <Cpu size={24} color="#00F3FF" />
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    <View style={styles.heroBox}>
                        <Animated.Text entering={FadeInDown.duration(800)} style={styles.preTitle}>CYBER_PROTO_V69</Animated.Text>
                        <Animated.Text entering={FadeInDown.delay(200).duration(800)} style={styles.name}>{personal_info.name.toUpperCase()}</Animated.Text>
                        <Animated.Text entering={FadeInDown.delay(400).duration(800)} style={styles.title}>{personal_info.title.toUpperCase()}</Animated.Text>
                    </View>

                    <View style={styles.matrixList}>
                        <TouchableOpacity style={styles.neonCard}>
                            <View style={styles.neonCardInner}>
                                <Text style={styles.neonCardText}>EXECUTE_PORTFOLIO_SCAN</Text>
                                <Zap size={20} color="#00F3FF" fill="#00F3FF" />
                            </View>
                        </TouchableOpacity>

                        {projects.slice(0, 5).map((p, i) => (
                            <TouchableOpacity key={p.name} style={styles.darkLink}>
                                <Text style={styles.darkLinkText}>{p.name.toUpperCase()}</Text>
                                <ArrowRight size={18} color="#BD00FF" />
                            </TouchableOpacity>
                        ))}

                        <TouchableOpacity style={styles.uplinkButton}>
                            <Target size={20} color="#00F3FF" />
                            <Text style={styles.uplinkText}>ESTABLISH_NEURAL_LINK</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.socialBar}>
                        <TouchableOpacity style={styles.socialBtn}><Instagram size={20} color="#BD00FF" /></TouchableOpacity>
                        <TouchableOpacity style={styles.socialBtn}><Github size={20} color="#00F3FF" /></TouchableOpacity>
                        <TouchableOpacity style={styles.socialBtn}><Twitter size={20} color="#BD00FF" /></TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0F0524',
    },
    neonGlow: {
        position: 'absolute',
        top: -100,
        right: -100,
        width: 300,
        height: 300,
        borderRadius: 150,
        backgroundColor: '#BD00FF',
        opacity: 0.1,
    },
    neonLine: {
        position: 'absolute',
        width: width,
        height: 2,
        opacity: 0.2,
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
        borderRadius: 4,
        backgroundColor: 'rgba(189,0,255,0.05)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(189,0,255,0.2)',
    },
    scrollContent: {
        paddingHorizontal: 24,
        paddingBottom: 40,
        alignItems: 'center',
    },
    heroBox: {
        alignItems: 'center',
        marginVertical: 50,
    },
    preTitle: {
        fontSize: 10,
        fontWeight: '900',
        color: '#00F3FF',
        letterSpacing: 4,
        marginBottom: 16,
    },
    name: {
        fontSize: 40,
        fontWeight: '900',
        color: '#FFF',
        textAlign: 'center',
        letterSpacing: -2,
    },
    title: {
        fontSize: 12,
        fontWeight: '800',
        color: '#BD00FF',
        letterSpacing: 3,
        marginTop: 8,
    },
    matrixList: {
        width: '100%',
        gap: 12,
    },
    neonCard: {
        width: '100%',
        backgroundColor: 'rgba(0,243,255,0.05)',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#00F3FF',
    },
    neonCardInner: {
        paddingVertical: 24,
        paddingHorizontal: 24,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    neonCardText: {
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
        borderRadius: 4,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(189,0,255,0.1)',
    },
    darkLinkText: {
        fontSize: 12,
        fontWeight: '800',
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
    uplinkText: {
        fontSize: 12,
        fontWeight: '900',
        color: '#00F3FF',
        letterSpacing: 2,
    },
    socialBar: {
        flexDirection: 'row',
        marginTop: 40,
        gap: 24,
    },
    socialBtn: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: 'rgba(255,255,255,0.05)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
});
