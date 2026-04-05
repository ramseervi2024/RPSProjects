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
import { ChevronLeft, ArrowRight, Zap, Target, Book, PenTool, Layout, Layers, Box } from 'lucide-react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { portfolioprofile } from './portfoliodata';

const { width, height } = Dimensions.get('window');

const SketchBackground = () => (
    <View style={StyleSheet.absoluteFill}>
        <View style={styles.whiteBase} />
        {/* Sketch lines simulation */}
        <View style={styles.sketchOverlay}>
            {[...Array(15)].map((_, i) => (
                <View key={i} style={[styles.sketchLine, { top: i * 60, width: width, height: 1, backgroundColor: '#3B82F6', opacity: 0.1 }]} />
            ))}
            {[...Array(10)].map((_, i) => (
                <View key={`v-${i}`} style={[styles.sketchLine, { left: i * 40, width: 1, height: height, backgroundColor: '#3B82F6', opacity: 0.1 }]} />
            ))}
        </View>
        <Box size={200} color="#3B82F6" strokeWidth={0.5} style={{ position: 'absolute', bottom: -50, right: -50, opacity: 0.05, transform: [{ rotate: '15deg' }] }} />
    </View>
);

export default function Portfolio82({ navigation }) {
    const { personal_info, projects } = portfolioprofile;

    return (
        <View style={styles.container}>
            <SketchBackground />
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <ChevronLeft size={24} color="#1E40AF" />
                    </TouchableOpacity>
                    <PenTool size={24} color="#1E40AF" />
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    <View style={styles.technicalHeader}>
                        <Animated.Text entering={FadeInDown.duration(800)} style={styles.schemaType}>DRAFT_PLAN: V82_SKETCH</Animated.Text>
                        <Animated.Text entering={FadeInDown.delay(200).duration(800)} style={styles.name}>{personal_info.name.toUpperCase()}</Animated.Text>
                        <Animated.Text entering={FadeInDown.delay(400).duration(800)} style={styles.role}>{personal_info.title.toUpperCase()}</Animated.Text>
                        
                        <View style={styles.phaseTag}>
                            <Text style={styles.phaseText}>PHASE_01 // ARCHITECT_STUDY</Text>
                        </View>
                    </View>

                    <View style={styles.blueprintStack}>
                        <TouchableOpacity style={styles.sketchCard}>
                            <View style={styles.cardInfo}>
                                <Text style={styles.cardPre}>PROJECT_MANIFEST</Text>
                                <Text style={styles.cardTitle}>STRUCTURAL_ANALYTICS</Text>
                            </View>
                            <Zap size={24} color="#1E40AF" fill="#1E40AF" />
                        </TouchableOpacity>

                        {projects.slice(0, 5).map((p, i) => (
                            <TouchableOpacity key={p.name} style={styles.sketchLink}>
                                <View style={styles.linkLead}>
                                    <View style={styles.sketchBox} />
                                    <Text style={styles.linkText}>{p.name.toUpperCase()}</Text>
                                </View>
                                <ArrowRight size={18} color="#1E40AF" />
                            </TouchableOpacity>
                        ))}

                        <TouchableOpacity style={styles.footerAction}>
                            <Layers size={20} color="#1E40AF" />
                            <Text style={styles.footerLabel}>VIEW_DESIGN_SYSTEM</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.bottomMark}>
                        <Layout size={16} color="rgba(30,64,175,0.2)" />
                        <Text style={styles.bottomText}>ANALYTICAL_STUDIO_V82</Text>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    whiteBase: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#FFF',
    },
    sketchOverlay: {
        ...StyleSheet.absoluteFillObject,
    },
    sketchLine: {
        position: 'absolute',
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
        backgroundColor: '#F8FAFC',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E2E8F0',
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
        color: 'rgba(30,64,175,0.4)',
        letterSpacing: 4,
        marginBottom: 16,
    },
    name: {
        fontSize: 52,
        fontWeight: '900',
        color: '#1E3A8A',
        letterSpacing: -3,
        lineHeight: 52,
    },
    role: {
        fontSize: 14,
        fontWeight: '700',
        color: '#3B82F6',
        letterSpacing: 2,
        marginTop: 12,
    },
    phaseTag: {
        marginTop: 32,
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: '#F1F5F9',
        borderLeftWidth: 4,
        borderLeftColor: '#1E40AF',
        alignSelf: 'flex-start',
    },
    phaseText: {
        fontSize: 10,
        fontWeight: '900',
        color: '#64748B',
        letterSpacing: 1,
    },
    blueprintStack: {
        width: '100%',
        gap: 12,
    },
    sketchCard: {
        width: '100%',
        backgroundColor: '#F8FAFC',
        paddingVertical: 32,
        paddingHorizontal: 24,
        borderRadius: 4,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#3B82F6',
    },
    cardInfo: {
        gap: 4,
    },
    cardPre: {
        fontSize: 10,
        fontWeight: '900',
        color: '#64748B',
        letterSpacing: 2,
    },
    cardTitle: {
        fontSize: 14,
        fontWeight: '900',
        color: '#1E40AF',
        letterSpacing: 1,
    },
    sketchLink: {
        width: '100%',
        backgroundColor: '#FFF',
        paddingVertical: 20,
        paddingHorizontal: 24,
        borderRadius: 4,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    linkLead: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    sketchBox: {
        width: 12,
        height: 12,
        borderWidth: 1,
        borderColor: '#3B82F6',
    },
    linkText: {
        fontSize: 12,
        fontWeight: '700',
        color: '#475569',
        letterSpacing: 1,
    },
    footerAction: {
        paddingVertical: 32,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 12,
    },
    footerLabel: {
        fontSize: 12,
        fontWeight: '900',
        color: '#1E40AF',
        letterSpacing: 2,
    },
    bottomMark: {
        marginTop: 40,
        alignItems: 'center',
        gap: 12,
        paddingBottom: 20,
    },
    bottomText: {
        fontSize: 8,
        fontWeight: '900',
        color: 'rgba(30,64,175,0.4)',
        letterSpacing: 1,
    }
});
