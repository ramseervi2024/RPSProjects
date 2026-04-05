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
import { ChevronLeft, ArrowRight, Zap, Shield, Target, Hexagon, Activity, Cpu } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { portfolioprofile } from './portfoliodata';

const { width, height } = Dimensions.get('window');

const HexBackground = () => (
    <View style={StyleSheet.absoluteFill}>
        <LinearGradient colors={['#0F172A', '#020617']} style={StyleSheet.absoluteFill} />
        {/* Simple Hex simulation using rotation */}
        <View style={styles.hexOverlay}>
            {[...Array(15)].map((_, i) => (
                <View key={i} style={styles.hexRow}>
                    {[...Array(8)].map((_, j) => (
                        <View key={j} style={styles.hexCell} />
                    ))}
                </View>
            ))}
        </View>
        <LinearGradient colors={['transparent', 'rgba(15,23,42,0.8)']} style={StyleSheet.absoluteFill} />
    </View>
);

export default function Portfolio79({ navigation }) {
    const { personal_info, projects } = portfolioprofile;

    return (
        <View style={styles.container}>
            <HexBackground />
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <ChevronLeft size={24} color="#38BDF8" />
                    </TouchableOpacity>
                    <Shield size={24} color="#38BDF8" />
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    <View style={styles.technicalHeader}>
                        <Animated.Text entering={FadeInDown.duration(800)} style={styles.schemaType}>ARMOR_SPEC: V79_HEX_MESH</Animated.Text>
                        <Animated.Text entering={FadeInDown.delay(200).duration(800)} style={styles.name}>{personal_info.name.toUpperCase()}</Animated.Text>
                        <Animated.Text entering={FadeInDown.delay(400).duration(800)} style={styles.role}>{personal_info.title.toUpperCase()}</Animated.Text>
                        
                        <View style={styles.vitalsRow}>
                            <Activity size={14} color="#38BDF8" />
                            <Text style={styles.vitalText}>SECURE_PROTOCOL_V3</Text>
                        </View>
                    </View>

                    <View style={styles.meshStack}>
                        <TouchableOpacity style={styles.meshCard}>
                            <View style={styles.cardInfo}>
                                <Text style={styles.cardPre}>MISSION_CRITICAL</Text>
                                <Text style={styles.cardTitle}>DEPLOY_CAPABILITIES</Text>
                            </View>
                            <Zap size={24} color="#38BDF8" fill="#38BDF8" />
                        </TouchableOpacity>

                        {projects.slice(0, 5).map((p, i) => (
                            <TouchableOpacity key={p.name} style={styles.meshLink}>
                                <View style={styles.linkLead}>
                                    <View style={styles.meshDot} />
                                    <Text style={styles.linkText}>{p.name.toUpperCase()}</Text>
                                </View>
                                <ArrowRight size={18} color="rgba(56,189,248,0.3)" />
                            </TouchableOpacity>
                        ))}

                        <TouchableOpacity style={styles.authAction}>
                            <Cpu size={20} color="#38BDF8" />
                            <Text style={styles.authLabel}>AUTHENTICATE_IDENTITY</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.footerMark}>
                        <Hexagon size={16} color="rgba(56,189,248,0.1)" />
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0F172A',
    },
    hexOverlay: {
        ...StyleSheet.absoluteFillObject,
        opacity: 0.05,
    },
    hexRow: {
        flexDirection: 'row',
        height: height / 15,
        marginLeft: -20,
    },
    hexCell: {
        width: width / 6,
        height: width / 6,
        borderWidth: 1,
        borderColor: '#38BDF8',
        transform: [{ rotate: '45deg' }],
        margin: 10,
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
        backgroundColor: 'rgba(56,189,248,0.05)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(56,189,248,0.2)',
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
        color: 'rgba(56,189,248,0.4)',
        letterSpacing: 4,
        marginBottom: 16,
    },
    name: {
        fontSize: 44,
        fontWeight: '900',
        color: '#FFF',
        letterSpacing: -1,
    },
    role: {
        fontSize: 14,
        fontWeight: '800',
        color: '#38BDF8',
        letterSpacing: 2,
        marginTop: 8,
    },
    vitalsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginTop: 32,
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: 'rgba(56,189,248,0.05)',
        borderRadius: 4,
        alignSelf: 'flex-start',
    },
    vitalText: {
        fontSize: 10,
        fontWeight: '900',
        color: '#FFF',
        letterSpacing: 1,
    },
    meshStack: {
        width: '100%',
        gap: 12,
    },
    meshCard: {
        width: '100%',
        backgroundColor: 'rgba(56,189,248,0.05)',
        paddingVertical: 32,
        paddingHorizontal: 24,
        borderRadius: 4,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#38BDF8',
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
    meshLink: {
        width: '100%',
        backgroundColor: 'rgba(255,255,255,0.02)',
        paddingVertical: 20,
        paddingHorizontal: 24,
        borderRadius: 4,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(56,189,248,0.1)',
    },
    linkLead: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    meshDot: {
        width: 10,
        height: 10,
        borderWidth: 1,
        borderColor: '#38BDF8',
        transform: [{ rotate: '45deg' }],
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
        color: '#38BDF8',
        letterSpacing: 2,
    },
    footerMark: {
        marginTop: 40,
        alignItems: 'center',
        paddingBottom: 20,
    },
});
