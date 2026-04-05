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
import { ChevronLeft, ArrowRight, Scissors, Layers, Bookmark, Zap, Heart, Sun } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { FadeIn, FadeInDown, SlideInRight } from 'react-native-reanimated';
import { portfolioprofile } from './portfoliodata';

const { width, height } = Dimensions.get('window');

const PaperLayer = ({ children, style, elevation = 10 }) => (
    <View style={[styles.paperLayer, { shadowRadius: elevation }, style]}>
        {children}
    </View>
);

export default function Portfolio53({ navigation }) {
    const { personal_info, hero, summary, technical_stack, projects } = portfolioprofile;

    return (
        <View style={styles.container}>
            <View style={StyleSheet.absoluteFill}>
                <LinearGradient colors={['#F5F5F5', '#E5E5E5']} style={StyleSheet.absoluteFill} />
                <View style={styles.paperTexture} />
            </View>

            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <ChevronLeft size={24} color="#333" />
                    </TouchableOpacity>
                    <View style={styles.headerBadge}>
                        <Scissors size={14} color="#333" />
                        <Text style={styles.headerLabel}>PAPER_CUT_V53</Text>
                    </View>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    {/* Hero Section */}
                    <View style={styles.heroSection}>
                        <PaperLayer style={styles.heroCard} elevation={20}>
                            <Animated.Text entering={FadeInDown.duration(800)} style={styles.heroPre}>TACTILE_DIMENSION</Animated.Text>
                            <Animated.Text entering={FadeInDown.delay(200).duration(800)} style={styles.name}>{personal_info.name.toUpperCase()}</Animated.Text>
                            <View style={styles.heroDivider} />
                            <Text style={styles.headline}>{personal_info.headline.toUpperCase()}</Text>
                        </PaperLayer>
                    </View>

                    {/* Summary Section */}
                    <View style={styles.section}>
                        <Text style={styles.sectionHeading}>// CUT_01: NARRATIVE</Text>
                        <PaperLayer style={styles.summaryCard}>
                            <View style={styles.cardHeader}>
                                <Text style={styles.cardTitle}>MANIFESTO</Text>
                                <Bookmark size={20} color="#333" opacity={0.3} />
                            </View>
                            <Text style={styles.summaryText}>{summary}</Text>
                        </PaperLayer>
                    </View>

                    {/* Skills Section */}
                    <View style={styles.section}>
                        <Text style={styles.sectionHeading}>// CUT_02: CAPABILITIES</Text>
                        <View style={styles.skillsGrid}>
                            {technical_stack.mobile.concat(technical_stack.frontend.slice(0, 3)).map((skill, i) => (
                                <View key={skill} style={styles.skillStack}>
                                    <View style={styles.skillOverlay} />
                                    <View style={styles.skillIndicator} />
                                    <Text style={styles.skillText}>{skill.toUpperCase()}</Text>
                                </View>
                            ))}
                        </View>
                    </View>

                    {/* Projects Section */}
                    <View style={styles.section}>
                        <Text style={styles.sectionHeading}>// CUT_03: ARTIFACTS</Text>
                        {projects.slice(0, 4).map((p, i) => (
                            <TouchableOpacity key={p.name} style={styles.projectStrip}>
                                <PaperLayer style={styles.projectInner}>
                                    <View style={styles.projectHeader}>
                                        <Text style={styles.projectIndex}>VOL_0{i + 1}</Text>
                                        <Text style={styles.projectName}>{p.name.toUpperCase()}</Text>
                                    </View>
                                    <Text style={styles.projectDesc}>{p.description.slice(0, 100)}...</Text>
                                    <View style={styles.projectFooter}>
                                        <Text style={styles.projectCat}>{p.category.toUpperCase()}</Text>
                                        <View style={styles.arrowIcon}>
                                            <ArrowRight size={20} color="#333" />
                                        </View>
                                    </View>
                                </PaperLayer>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Footer Section */}
                    <TouchableOpacity style={styles.footerBtn} onPress={() => navigation.goBack()}>
                        <PaperLayer style={styles.footerInner}>
                            <Text style={styles.footerText}>INITIATE_TACTILE_UPLINK</Text>
                            <Zap size={20} color="#333" />
                        </PaperLayer>
                    </TouchableOpacity>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    paperTexture: {
        ...StyleSheet.absoluteFillObject,
        opacity: 0.05,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingVertical: 16,
    },
    backBtn: {
        width: 48,
        height: 48,
        borderRadius: 4,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
    headerBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingHorizontal: 16,
        paddingVertical: 10,
        backgroundColor: '#FFF',
        borderRadius: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
    headerLabel: {
        fontSize: 10,
        fontWeight: '900',
        color: '#333',
        letterSpacing: 2,
    },
    scrollContent: {
        paddingHorizontal: 24,
        paddingBottom: 60,
    },
    heroSection: {
        paddingVertical: 60,
    },
    paperLayer: {
        backgroundColor: '#FFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        borderRadius: 4,
    },
    heroCard: {
        padding: 40,
        alignItems: 'center',
    },
    heroPre: {
        fontSize: 11,
        fontWeight: '900',
        color: '#999',
        letterSpacing: 4,
        marginBottom: 20,
    },
    name: {
        fontSize: 52,
        fontWeight: '900',
        color: '#333',
        textAlign: 'center',
        lineHeight: 52,
        letterSpacing: -2,
    },
    heroDivider: {
        width: 40,
        height: 4,
        backgroundColor: '#333',
        marginVertical: 32,
    },
    headline: {
        fontSize: 14,
        fontWeight: '900',
        color: '#666',
        textAlign: 'center',
        letterSpacing: 4,
        lineHeight: 22,
    },
    section: {
        marginBottom: 48,
    },
    sectionHeading: {
        fontSize: 10,
        fontWeight: '900',
        color: '#AAA',
        letterSpacing: 4,
        marginBottom: 24,
        marginLeft: 10,
    },
    summaryCard: {
        padding: 40,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    cardTitle: {
        fontSize: 11,
        fontWeight: '900',
        color: '#BBB',
        letterSpacing: 4,
    },
    summaryText: {
        fontSize: 18,
        lineHeight: 30,
        color: '#444',
    },
    skillsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    skillStack: {
        paddingHorizontal: 20,
        paddingVertical: 14,
        backgroundColor: '#FFF',
        borderRadius: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    skillIndicator: {
        width: 8,
        height: 8,
        backgroundColor: '#333',
    },
    skillText: {
        fontSize: 12,
        fontWeight: '900',
        color: '#333',
    },
    projectStrip: {
        marginBottom: 20,
    },
    projectInner: {
        padding: 30,
    },
    projectHeader: {
        flexDirection: 'row',
        alignItems: 'baseline',
        gap: 16,
        marginBottom: 16,
    },
    projectIndex: {
        fontSize: 10,
        fontWeight: '900',
        color: '#BBB',
    },
    projectName: {
        fontSize: 22,
        fontWeight: '900',
        color: '#333',
        letterSpacing: -1,
    },
    projectDesc: {
        fontSize: 16,
        color: '#666',
        lineHeight: 24,
        marginBottom: 24,
    },
    projectFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: '#F5F5F5',
    },
    projectCat: {
        fontSize: 10,
        fontWeight: '900',
        color: '#BBB',
        letterSpacing: 2,
    },
    arrowIcon: {
        width: 44,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
    },
    footerBtn: {
        marginTop: 20,
    },
    footerInner: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 24,
        gap: 20,
    },
    footerText: {
        fontSize: 12,
        fontWeight: '900',
        color: '#333',
        letterSpacing: 2,
    }
});
