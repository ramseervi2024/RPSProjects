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
import { ChevronLeft, Box, Layout, Smartphone, Code, ArrowUpRight, Plus, Rocket } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { FadeIn, FadeInDown, SlideInRight } from 'react-native-reanimated';
import { portfolioprofile } from './portfoliodata';

const { width } = Dimensions.get('window');

const IsometricBlock = ({ children, color = '#3B82F6', style }) => {
    return (
        <View style={[styles.isoContainer, style]}>
            <View style={[styles.isoSide, { backgroundColor: color, opacity: 0.7, transform: [{ skewY: '-45deg' }] }]} />
            <View style={[styles.isoTop, { backgroundColor: color, transform: [{ skewX: '-45deg' }] }]} />
            <View style={[styles.isoFront, { backgroundColor: color }]}>
                {children}
            </View>
        </View>
    );
};

export default function Portfolio36({ navigation }) {
    const { personal_info, hero, summary, technical_stack, projects } = portfolioprofile;

    return (
        <View style={styles.container}>
            <LinearGradient colors={['#F3F4F6', '#E5E7EB']} style={StyleSheet.absoluteFill} />
            
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <ChevronLeft size={24} color="#1F2937" />
                    </TouchableOpacity>
                    <View style={styles.headerBadge}>
                        <Box size={14} color="#3B82F6" />
                        <Text style={styles.headerBadgeText}>ISOMETRIC_36</Text>
                    </View>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    {/* Isometric Hero Hero */}
                    <View style={styles.heroSection}>
                        <IsometricBlock color="#3B82F6" style={styles.heroBlock}>
                            <View style={styles.heroContent}>
                                <Text style={styles.heroPre}>BUILDING_DIMENSIONS</Text>
                                <Text style={styles.heroName}>{personal_info.name.toUpperCase()}</Text>
                                <View style={styles.heroLine} />
                                <Text style={styles.heroHeadline}>{personal_info.headline.toUpperCase()}</Text>
                            </View>
                        </IsometricBlock>
                    </View>

                    {/* Summary Module */}
                    <View style={styles.section}>
                        <Text style={styles.sectionLabel}>// SYSTEM_NARRATIVE</Text>
                        <View style={styles.isoCard}>
                            <View style={styles.isoCardSide} />
                            <View style={styles.isoCardTop} />
                            <View style={styles.isoCardFront}>
                                <Text style={styles.summaryText}>{summary}</Text>
                            </View>
                        </View>
                    </View>

                    {/* Expertise Grid Isometric */}
                    <View style={styles.section}>
                        <Text style={styles.sectionLabel}>// HARDWARE_SPECS</Text>
                        <View style={styles.skillsGrid}>
                            {technical_stack.mobile.concat(technical_stack.frontend.slice(0, 3)).map((skill, i) => (
                                <View key={skill} style={styles.skillIso}>
                                    <View style={[styles.skillIsoSide, { backgroundColor: i % 2 === 0 ? '#3B82F6' : '#10B981' }]} />
                                    <View style={styles.skillIsoFront}>
                                        <Text style={styles.skillText}>{skill.toUpperCase()}</Text>
                                    </View>
                                </View>
                            ))}
                        </View>
                    </View>

                    {/* Project Blocks */}
                    <View style={styles.section}>
                        <Text style={styles.sectionLabel}>// ACTIVE_EXHIBITS</Text>
                        {projects.slice(0, 4).map((p, i) => (
                            <TouchableOpacity key={p.name} style={styles.projectIso}>
                                <View style={styles.projectIsoSide} />
                                <View style={styles.projectIsoFront}>
                                    <View style={styles.projectIsoHeader}>
                                        <Text style={styles.projectIndex}>BLOK_{i + 1}</Text>
                                        <Text style={styles.projectName}>{p.name.toUpperCase()}</Text>
                                    </View>
                                    <Text style={styles.projectDesc}>{p.description.slice(0, 80)}...</Text>
                                    <View style={styles.projectFooter}>
                                        <Text style={styles.projectCat}>{p.category.toUpperCase()}</Text>
                                        <ArrowUpRight size={20} color="#3B82F6" />
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Footer Assemble */}
                    <TouchableOpacity style={styles.footerBtn} onPress={() => navigation.goBack()}>
                        <View style={styles.footerInner}>
                            <Text style={styles.footerText}>INITIATE_PRO_ASSEMBLE</Text>
                            <Rocket size={20} color="#FFF" />
                        </View>
                    </TouchableOpacity>

                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        borderRadius: 12,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
    },
    headerBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 20,
    },
    headerBadgeText: {
        fontSize: 10,
        fontWeight: '900',
        color: '#3B82F6',
        letterSpacing: 2,
    },
    scrollContent: {
        paddingHorizontal: 24,
        paddingBottom: 60,
    },
    heroSection: {
        paddingVertical: 60,
        alignItems: 'center',
    },
    isoContainer: {
        width: '100%',
        height: 240,
    },
    isoSide: {
        position: 'absolute',
        left: -20,
        top: 10,
        width: 20,
        height: '100%',
    },
    isoTop: {
        position: 'absolute',
        top: -20,
        left: 10,
        width: '100%',
        height: 20,
    },
    isoFront: {
        flex: 1,
        padding: 30,
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 10, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
    },
    heroBlock: {
        height: 300,
    },
    heroContent: {
        flex: 1,
        justifyContent: 'center',
    },
    heroPre: {
        fontSize: 10,
        fontWeight: '900',
        color: '#FFF',
        letterSpacing: 4,
        marginBottom: 16,
        opacity: 0.7,
    },
    heroName: {
        fontSize: 48,
        fontWeight: '900',
        color: '#FFF',
        lineHeight: 44,
        marginBottom: 20,
        letterSpacing: -2,
    },
    heroLine: {
        width: 40,
        height: 6,
        backgroundColor: '#FFF',
        marginBottom: 24,
    },
    heroHeadline: {
        fontSize: 16,
        fontWeight: '900',
        color: '#FFF',
        lineHeight: 24,
        opacity: 0.9,
    },
    section: {
        marginBottom: 60,
    },
    sectionLabel: {
        fontSize: 10,
        fontWeight: '900',
        color: '#9CA3AF',
        letterSpacing: 4,
        marginBottom: 24,
        marginLeft: 10,
    },
    isoCard: {
        height: 200,
    },
    isoCardSide: {
        position: 'absolute',
        left: -10,
        top: 5,
        width: 10,
        height: '100%',
        backgroundColor: '#1F2937',
        transform: [{ skewY: '-45deg' }],
        opacity: 0.8,
    },
    isoCardTop: {
        position: 'absolute',
        top: -10,
        left: 5,
        width: '100%',
        height: 10,
        backgroundColor: '#1F2937',
        transform: [{ skewX: '-45deg' }],
        opacity: 0.6,
    },
    isoCardFront: {
        flex: 1,
        backgroundColor: '#FFF',
        padding: 30,
        justifyContent: 'center',
    },
    summaryText: {
        fontSize: 16,
        lineHeight: 28,
        color: '#4B5563',
    },
    skillsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 16,
    },
    skillIso: {
        width: (width - 64) / 2,
        height: 80,
    },
    skillIsoSide: {
        position: 'absolute',
        left: -8,
        top: 4,
        width: 8,
        height: '100%',
        opacity: 0.5,
        transform: [{ skewY: '-45deg' }],
    },
    skillIsoFront: {
        flex: 1,
        backgroundColor: '#FFF',
        paddingHorizontal: 20,
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#EEE',
    },
    skillText: {
        fontSize: 11,
        fontWeight: '900',
        color: '#1F2937',
    },
    projectIso: {
        height: 220,
        marginBottom: 24,
    },
    projectIsoSide: {
        position: 'absolute',
        left: -12,
        top: 6,
        width: 12,
        height: '100%',
        backgroundColor: '#3B82F6',
        opacity: 0.3,
        transform: [{ skewY: '-45deg' }],
    },
    projectIsoFront: {
        flex: 1,
        backgroundColor: '#FFF',
        padding: 30,
    },
    projectIsoHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        marginBottom: 16,
    },
    projectIndex: {
        fontSize: 9,
        fontWeight: '900',
        color: '#3B82F6',
        letterSpacing: 2,
    },
    projectName: {
        fontSize: 22,
        fontWeight: '900',
        color: '#1F2937',
    },
    projectDesc: {
        fontSize: 15,
        color: '#6B7280',
        lineHeight: 24,
        marginBottom: 20,
    },
    projectFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 'auto',
    },
    projectCat: {
        fontSize: 10,
        fontWeight: '900',
        color: '#9CA3AF',
        letterSpacing: 2,
    },
    footerBtn: {
        marginTop: 20,
        height: 80,
    },
    footerInner: {
        flex: 1,
        backgroundColor: '#1F2937',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 16,
    },
    footerText: {
        fontSize: 13,
        fontWeight: '900',
        color: '#FFF',
        letterSpacing: 2,
    }
});
