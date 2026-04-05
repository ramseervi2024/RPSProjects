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
import { ChevronLeft, ArrowRight, Zap, Cpu, Shield, Activity, FileCode, Github } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { portfolioprofile } from './portfoliodata';

const { width } = Dimensions.get('window');

const CarbonFiberBackground = () => (
    <View style={StyleSheet.absoluteFill}>
        <LinearGradient colors={['#1A1A1A', '#0D0D0D']} style={StyleSheet.absoluteFill} />
        <View style={styles.carbonOverlay}>
            {[...Array(20)].map((_, i) => (
                <View key={i} style={[styles.carbonStripe, { top: i * 40, transform: [{ rotate: '-45deg' }, { scaleX: 2 }] }]} />
            ))}
        </View>
    </View>
);

export default function Portfolio73({ navigation }) {
    const { personal_info, projects } = portfolioprofile;

    return (
        <View style={styles.container}>
            <CarbonFiberBackground />
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <ChevronLeft size={24} color="#FFF" />
                    </TouchableOpacity>
                    <Shield size={24} color="#FFF" />
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    <View style={styles.technicalHeader}>
                        <Animated.Text entering={FadeInDown.duration(800)} style={styles.schemaType}>SCHEMA_TYPE: V73_CARBON</Animated.Text>
                        <Animated.Text entering={FadeInDown.delay(200).duration(800)} style={styles.name}>{personal_info.name.toUpperCase()}</Animated.Text>
                        <Animated.Text entering={FadeInDown.delay(400).duration(800)} style={styles.role}>{personal_info.title.toUpperCase()}</Animated.Text>
                        
                        <View style={styles.statusRow}>
                            <Activity size={14} color="#4ADE80" />
                            <Text style={styles.statusText}>SYSTEM_ACTIVE // STABLE_BUILD</Text>
                        </View>
                    </View>

                    <View style={styles.actionStack}>
                        <TouchableOpacity style={styles.tacticalCard}>
                            <View style={styles.cardLead}>
                                <Cpu size={20} color="#FFF" />
                                <Text style={styles.cardTitle}>CORE_COMPETENCIES</Text>
                            </View>
                            <Zap size={20} color="#FFF" fill="#FFF" />
                        </TouchableOpacity>

                        {projects.slice(0, 5).map((p, i) => (
                            <TouchableOpacity key={p.name} style={styles.projectNode}>
                                <View style={styles.nodeIndicator} />
                                <Text style={styles.nodeText}>{p.name.toUpperCase()}</Text>
                                <ArrowRight size={18} color="rgba(255,255,255,0.3)" />
                            </TouchableOpacity>
                        ))}

                        <TouchableOpacity style={styles.terminalButton}>
                            <FileCode size={20} color="rgba(255,255,255,0.6)" />
                            <Text style={styles.terminalText}>INITIATE_UPLINK.PROTOTYPE</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.footer}>
                        <Github size={20} color="rgba(255,255,255,0.2)" />
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1A1A1A',
    },
    carbonOverlay: {
        ...StyleSheet.absoluteFillObject,
        opacity: 0.1,
    },
    carbonStripe: {
        position: 'absolute',
        width: width * 2,
        height: 2,
        backgroundColor: '#FFF',
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
        color: 'rgba(255,255,255,0.4)',
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
        color: 'rgba(255,255,255,0.6)',
        letterSpacing: 2,
        marginTop: 12,
    },
    statusRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginTop: 24,
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: 'rgba(74,222,128,0.05)',
        borderRadius: 4,
        alignSelf: 'flex-start',
    },
    statusText: {
        fontSize: 10,
        fontWeight: '900',
        color: '#4ADE80',
        letterSpacing: 2,
    },
    actionStack: {
        width: '100%',
        gap: 12,
    },
    tacticalCard: {
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
    projectNode: {
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
    nodeIndicator: {
        width: 12,
        height: 2,
        backgroundColor: 'rgba(255,255,255,0.2)',
    },
    nodeText: {
        flex: 1,
        fontSize: 12,
        fontWeight: '700',
        color: 'rgba(255,255,255,0.6)',
        letterSpacing: 1,
        marginLeft: 16,
    },
    terminalButton: {
        paddingVertical: 24,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 12,
        marginTop: 12,
    },
    terminalText: {
        fontSize: 12,
        fontWeight: '900',
        color: 'rgba(255,255,255,0.6)',
        letterSpacing: 2,
    },
    footer: {
        marginTop: 40,
        alignItems: 'center',
        paddingBottom: 20,
    },
});
