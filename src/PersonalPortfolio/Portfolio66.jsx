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
import { ChevronLeft, ArrowRight, Zap, Target, Book, FileCode, Monitor, Coffee } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { portfolioprofile } from './portfoliodata';

const { width, height } = Dimensions.get('window');

const BlueprintBackground = () => (
    <View style={StyleSheet.absoluteFill}>
        <LinearGradient colors={['#1E3A8A', '#172554']} style={StyleSheet.absoluteFill} />
        <View style={styles.gridOverlay}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                <View key={`v-${i}`} style={[styles.gridLineV, { left: i * (width / 10) }]} />
            ))}
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((i) => (
                <View key={`h-${i}`} style={[styles.gridLineH, { top: i * (height / 15) }]} />
            ))}
        </View>
    </View>
);

export default function Portfolio66({ navigation }) {
    const { personal_info, hero, summary, technical_stack, projects } = portfolioprofile;

    return (
        <View style={styles.container}>
            <BlueprintBackground />
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <ChevronLeft size={24} color="#60A5FA" />
                    </TouchableOpacity>
                    <Book size={24} color="#60A5FA" />
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    <View style={styles.profileSection}>
                        <Animated.Text entering={FadeInDown.duration(800)} style={styles.preTitle}>SCHEMA_TYPE: V66</Animated.Text>
                        <Animated.Text entering={FadeInDown.delay(200).duration(800)} style={styles.name}>{personal_info.name.toUpperCase()}</Animated.Text>
                        <Animated.Text entering={FadeInDown.delay(400).duration(800)} style={styles.role}>{personal_info.title.toUpperCase()}</Animated.Text>
                        <View style={styles.statsRow}>
                            <View style={styles.statBox}><Text style={styles.statVal}>3.5+</Text><Text style={styles.statLab}>YRS</Text></View>
                            <View style={styles.statBox}><Text style={styles.statVal}>56+</Text><Text style={styles.statLab}>APPS</Text></View>
                        </View>
                    </View>

                    <View style={styles.blueprintStack}>
                        <TouchableOpacity style={styles.blueprintCard}>
                            <View style={styles.blueprintContent}>
                                <Text style={styles.blueprintTitle}>TECHNICAL_SPECIFICATIONS</Text>
                                <Zap size={20} color="#60A5FA" fill="#60A5FA" />
                            </View>
                        </TouchableOpacity>

                        {projects.slice(0, 5).map((p, i) => (
                            <TouchableOpacity key={p.name} style={styles.projectStrip}>
                                <View style={styles.projectLead}>
                                    <View style={styles.projectDot} />
                                    <Text style={styles.projectText}>{p.name.toUpperCase()}</Text>
                                </View>
                                <ArrowRight size={18} color="#60A5FA" />
                            </TouchableOpacity>
                        ))}

                        <TouchableOpacity style={styles.terminalLink}>
                            <FileCode size={20} color="#60A5FA" />
                            <Text style={styles.terminalText}>INITIATE_UPLINK.SH</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1E3A8A',
    },
    gridOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0.1,
    },
    gridLineV: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        width: 1,
        backgroundColor: '#FFF',
    },
    gridLineH: {
        position: 'absolute',
        left: 0,
        right: 0,
        height: 1,
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
    profileSection: {
        marginVertical: 40,
    },
    preTitle: {
        fontSize: 10,
        fontWeight: '900',
        color: '#60A5FA',
        letterSpacing: 4,
        marginBottom: 16,
    },
    name: {
        fontSize: 42,
        fontWeight: '900',
        color: '#FFF',
        letterSpacing: -1,
        lineHeight: 44,
    },
    role: {
        fontSize: 14,
        fontWeight: '700',
        color: '#60A5FA',
        letterSpacing: 2,
        marginTop: 12,
        opacity: 0.8,
    },
    statsRow: {
        flexDirection: 'row',
        marginTop: 32,
        gap: 32,
    },
    statBox: {
        flexDirection: 'row',
        alignItems: 'baseline',
        gap: 8,
    },
    statVal: {
        fontSize: 18,
        fontWeight: '900',
        color: '#FFF',
    },
    statLab: {
        fontSize: 10,
        fontWeight: '900',
        color: '#60A5FA',
    },
    blueprintStack: {
        width: '100%',
        gap: 12,
    },
    blueprintCard: {
        width: '100%',
        backgroundColor: 'rgba(255,255,255,0.05)',
        paddingVertical: 24,
        paddingHorizontal: 24,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#60A5FA',
    },
    blueprintContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    blueprintTitle: {
        fontSize: 12,
        fontWeight: '900',
        color: '#FFF',
        letterSpacing: 2,
    },
    projectStrip: {
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
    projectLead: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    projectDot: {
        width: 6,
        height: 6,
        backgroundColor: '#60A5FA',
    },
    projectText: {
        fontSize: 12,
        fontWeight: '700',
        color: 'rgba(255,255,255,0.7)',
        letterSpacing: 1,
    },
    terminalLink: {
        paddingVertical: 24,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 12,
        borderTopWidth: 1,
        borderTopColor: 'rgba(255,255,255,0.1)',
        marginTop: 12,
    },
    terminalText: {
        fontSize: 12,
        fontWeight: '900',
        color: '#60A5FA',
        letterSpacing: 2,
    },
});
