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
import { ChevronLeft, ArrowRight, Zap, Target, Cpu, HardDrive, Shield, Activity, Terminal } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { FadeIn, FadeInDown, useAnimatedStyle, withRepeat, withTiming, withSequence, Easing } from 'react-native-reanimated';
import { portfolioprofile } from './portfoliodata';

const { width, height } = Dimensions.get('window');

const MatrixColumn = ({ x, delay }) => {
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: withRepeat(withTiming(height, { duration: 2000 + Math.random() * 2000, easing: Easing.linear }), -1, false) }],
        opacity: withRepeat(withSequence(withTiming(0.4, { duration: 500 }), withTiming(0.1, { duration: 500 })), -1, true),
    }));

    return (
        <Animated.View style={[styles.matrixColumn, { left: x }, animatedStyle]}>
            {[...Array(20)].map((_, i) => (
                <Text key={i} style={styles.matrixChar}>{Math.random() > 0.5 ? '1' : '0'}</Text>
            ))}
        </Animated.View>
    );
};

const MatrixBackground = () => (
    <View style={StyleSheet.absoluteFill}>
        <LinearGradient colors={['#001100', '#000800']} style={StyleSheet.absoluteFill} />
        {[...Array(15)].map((_, i) => (
            <MatrixColumn key={i} x={i * (width / 15)} />
        ))}
        <LinearGradient colors={['transparent', 'rgba(0,17,0,0.8)']} style={StyleSheet.absoluteFill} />
    </View>
);

export default function Portfolio81({ navigation }) {
    const { personal_info, projects } = portfolioprofile;

    return (
        <View style={styles.container}>
            <MatrixBackground />
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <ChevronLeft size={24} color="#00FF41" />
                    </TouchableOpacity>
                    <Terminal size={24} color="#00FF41" />
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    <View style={styles.technicalHeader}>
                        <Animated.Text entering={FadeInDown.duration(800)} style={styles.schemaType}>KERNEL_FLOW: V81_MATRIX</Animated.Text>
                        <Animated.Text entering={FadeInDown.delay(200).duration(800)} style={styles.name}>{personal_info.name.toUpperCase()}</Animated.Text>
                        <Animated.Text entering={FadeInDown.delay(400).duration(800)} style={styles.role}>{personal_info.title.toUpperCase()}</Animated.Text>
                        
                        <View style={styles.secureBadge}>
                            <Shield size={14} color="#00FF41" />
                            <Text style={styles.secureText}>ENCRYPTION_ACTIVE_V81</Text>
                        </View>
                    </View>

                    <View style={styles.matrixStack}>
                        <TouchableOpacity style={styles.matrixCard}>
                            <View style={styles.cardInfo}>
                                <Text style={styles.cardPre}>RUN_DIAGNOSTIC</Text>
                                <Text style={styles.cardTitle}>ACCESS_NEURAL_PORT</Text>
                            </View>
                            <Zap size={24} color="#00FF41" fill="#00FF41" />
                        </TouchableOpacity>

                        {projects.slice(0, 5).map((p, i) => (
                            <TouchableOpacity key={p.name} style={styles.matrixLink}>
                                <View style={styles.linkLead}>
                                    <View style={styles.matrixDot} />
                                    <Text style={styles.linkText}>{p.name.toUpperCase()}</Text>
                                </View>
                                <ArrowRight size={18} color="rgba(0,255,65,0.3)" />
                            </TouchableOpacity>
                        ))}

                        <TouchableOpacity style={styles.authAction}>
                            <Cpu size={20} color="#00FF41" />
                            <Text style={styles.authLabel}>EXECUTE_PORTFOLIO_SCAN</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.footerMark}>
                        <HardDrive size={16} color="rgba(0,255,65,0.1)" />
                        <Text style={styles.footerText}>SYSTEM_TIME: {new Date().toLocaleTimeString().toUpperCase()}</Text>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#001100',
    },
    matrixColumn: {
        position: 'absolute',
        top: -200,
        alignItems: 'center',
    },
    matrixChar: {
        fontSize: 10,
        fontWeight: '900',
        color: '#00FF41',
        marginVertical: 4,
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
        borderRadius: 4,
        backgroundColor: 'rgba(0,255,65,0.05)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(0,255,65,0.2)',
    },
    scrollContent: {
        paddingHorizontal: 24,
        paddingBottom: 40,
    },
    technicalHeader: {
        marginVertical: 40,
    },
    schemaType: {
        fontSize: 10,
        fontWeight: '900',
        color: 'rgba(0,255,65,0.4)',
        letterSpacing: 4,
        marginBottom: 16,
    },
    name: {
        fontSize: 48,
        fontWeight: '900',
        color: '#FFF',
        letterSpacing: -1,
    },
    role: {
        fontSize: 14,
        fontWeight: '800',
        color: '#00FF41',
        letterSpacing: 2,
        marginTop: 8,
    },
    secureBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginTop: 32,
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: 'rgba(0,255,65,0.05)',
        borderRadius: 4,
        alignSelf: 'flex-start',
    },
    secureText: {
        fontSize: 10,
        fontWeight: '900',
        color: '#FFF',
        letterSpacing: 1,
    },
    matrixStack: {
        width: '100%',
        gap: 12,
    },
    matrixCard: {
        width: '100%',
        backgroundColor: 'rgba(0,255,65,0.05)',
        paddingVertical: 32,
        paddingHorizontal: 24,
        borderRadius: 4,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#00FF41',
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
    matrixLink: {
        width: '100%',
        backgroundColor: 'rgba(255,255,255,0.02)',
        paddingVertical: 20,
        paddingHorizontal: 24,
        borderRadius: 4,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(0,255,65,0.1)',
    },
    linkLead: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    matrixDot: {
        width: 10,
        height: 2,
        backgroundColor: '#00FF41',
    },
    linkText: {
        fontSize: 12,
        fontWeight: '700',
        color: 'rgba(255,255,255,0.6)',
        letterSpacing: 1,
    },
    authAction: {
        paddingVertical: 32,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 12,
    },
    authLabel: {
        fontSize: 10,
        fontWeight: '900',
        color: '#00FF41',
        letterSpacing: 2,
    },
    footerMark: {
        marginTop: 40,
        alignItems: 'center',
        gap: 10,
        paddingBottom: 20,
    },
    footerText: {
        fontSize: 8,
        fontWeight: '900',
        color: 'rgba(255,255,255,0.2)',
        letterSpacing: 2,
    }
});
