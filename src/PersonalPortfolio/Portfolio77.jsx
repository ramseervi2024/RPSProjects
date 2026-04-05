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
import { ChevronLeft, ArrowRight, Zap, Target, Cpu, HardDrive, Shield, Activity } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { FadeIn, FadeInDown, useAnimatedStyle, withRepeat, withTiming, withSequence, Easing } from 'react-native-reanimated';
import { portfolioprofile } from './portfoliodata';

const { width, height } = Dimensions.get('window');

const WaferPattern = () => (
    <View style={StyleSheet.absoluteFill}>
        <LinearGradient colors={['#1F2937', '#111827']} style={StyleSheet.absoluteFill} />
        <View style={styles.waferGrid}>
            {[...Array(20)].map((_, i) => (
                <View key={i} style={styles.waferRow}>
                    {[...Array(10)].map((_, j) => (
                        <View key={j} style={styles.waferBlock} />
                    ))}
                </View>
            ))}
        </View>
        <View style={styles.etchingLine} />
        <View style={[styles.etchingLine, { top: 400, left: 100, height: 2, width: 300, backgroundColor: '#4F46E5', opacity: 0.1 }]} />
    </View>
);

export default function Portfolio77({ navigation }) {
    const { personal_info, projects } = portfolioprofile;

    return (
        <View style={styles.container}>
            <WaferPattern />
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <ChevronLeft size={24} color="#FFF" />
                    </TouchableOpacity>
                    <Activity size={24} color="#4F46E5" />
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    <View style={styles.technicalHeader}>
                        <Animated.Text entering={FadeInDown.duration(800)} style={styles.schemaType}>DIE_LAYOUT: V77_SILICON</Animated.Text>
                        <Animated.Text entering={FadeInDown.delay(200).duration(800)} style={styles.name}>{personal_info.name.toUpperCase()}</Animated.Text>
                        <Animated.Text entering={FadeInDown.delay(400).duration(800)} style={styles.role}>{personal_info.title.toUpperCase()}</Animated.Text>
                        
                        <View style={styles.statusIndicator}>
                            <View style={styles.pulseNode} />
                            <Text style={styles.statusText}>PRECISION_CORE_READY</Text>
                        </View>
                    </View>

                    <View style={styles.dieStack}>
                        <TouchableOpacity style={styles.waferCard}>
                            <View style={styles.cardLead}>
                                <Cpu size={20} color="#FFF" />
                                <Text style={styles.cardTitle}>TECHNICAL_SPECIFICATIONS</Text>
                            </View>
                            <Zap size={20} color="#4F46E5" fill="#4F46E5" />
                        </TouchableOpacity>

                        {projects.slice(0, 5).map((p, i) => (
                            <TouchableOpacity key={p.name} style={styles.etchingButton}>
                                <View style={styles.etchingLead}>
                                    <View style={styles.etchingDot} />
                                    <Text style={styles.etchingText}>{p.name.toUpperCase()}</Text>
                                </View>
                                <ArrowRight size={18} color="rgba(255,255,255,0.2)" />
                            </TouchableOpacity>
                        ))}

                        <TouchableOpacity style={styles.footerLink}>
                            <HardDrive size={20} color="rgba(255,255,255,0.4)" />
                            <Text style={styles.footerLabel}>INITIATE_DATA_STREAM</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.bottomMark}>
                        <Shield size={16} color="rgba(255,255,255,0.05)" />
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1F2937',
    },
    waferGrid: {
        ...StyleSheet.absoluteFillObject,
        opacity: 0.1,
    },
    waferRow: {
        flexDirection: 'row',
        height: height / 20,
    },
    waferBlock: {
        width: width / 10,
        borderWidth: 0.5,
        borderColor: '#FFF',
    },
    etchingLine: {
        position: 'absolute',
        top: 200,
        right: 0,
        width: 150,
        height: 1,
        backgroundColor: '#4F46E5',
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
    technicalHeader: {
        marginVertical: 40,
    },
    schemaType: {
        fontSize: 10,
        fontWeight: '900',
        color: 'rgba(255,255,255,0.3)',
        letterSpacing: 4,
        marginBottom: 16,
    },
    name: {
        fontSize: 48,
        fontWeight: '900',
        color: '#FFF',
        letterSpacing: -2,
        lineHeight: 48,
    },
    role: {
        fontSize: 14,
        fontWeight: '700',
        color: '#4F46E5',
        letterSpacing: 2,
        marginTop: 12,
    },
    statusIndicator: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginTop: 32,
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: 'rgba(79,70,229,0.1)',
        borderRadius: 4,
        alignSelf: 'flex-start',
    },
    pulseNode: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#4F46E5',
    },
    statusText: {
        fontSize: 10,
        fontWeight: '900',
        color: '#FFF',
        letterSpacing: 2,
    },
    dieStack: {
        width: '100%',
        gap: 12,
    },
    waferCard: {
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
    cardLead: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    cardTitle: {
        fontSize: 12,
        fontWeight: '900',
        color: '#FFF',
        letterSpacing: 2,
    },
    etchingButton: {
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
    etchingLead: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    etchingDot: {
        width: 10,
        height: 2,
        backgroundColor: 'rgba(255,255,255,0.2)',
    },
    etchingText: {
        fontSize: 12,
        fontWeight: '700',
        color: 'rgba(255,255,255,0.6)',
        letterSpacing: 1,
    },
    footerLink: {
        paddingVertical: 24,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 12,
        marginTop: 12,
    },
    footerLabel: {
        fontSize: 12,
        fontWeight: '900',
        color: 'rgba(255,255,255,0.5)',
        letterSpacing: 2,
    },
    bottomMark: {
        marginTop: 40,
        alignItems: 'center',
        paddingBottom: 20,
    },
});
