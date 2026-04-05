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
import { ChevronLeft, ArrowRight, Shield, Zap, Target, Cpu, Activity, Layout } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { FadeIn, FadeInDown, SlideInRight } from 'react-native-reanimated';
import { portfolioprofile } from './portfoliodata';

const { width, height } = Dimensions.get('window');

const MetallicCard = ({ children, style }) => (
    <View style={[styles.metallicCard, style]}>
        <LinearGradient
            colors={['#E5E7EB', '#F3F4F6', '#D1D5DB']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={StyleSheet.absoluteFill}
        />
        <View style={styles.cardContent}>
            {children}
        </View>
    </View>
);

export default function Portfolio52({ navigation }) {
    const { personal_info, hero, summary, technical_stack, projects } = portfolioprofile;

    return (
        <View style={styles.container}>
            <View style={StyleSheet.absoluteFill}>
                <LinearGradient colors={['#F3F4F6', '#E5E7EB']} style={StyleSheet.absoluteFill} />
                <View style={styles.metallicReflections} />
            </View>

            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <ChevronLeft size={24} color="#1F2937" />
                    </TouchableOpacity>
                    <View style={styles.headerBadge}>
                        <Shield size={14} color="#1F2937" />
                        <Text style={styles.headerLabel}>METALLIC_CORE_V52</Text>
                    </View>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    {/* Hero Section */}
                    <View style={styles.heroSection}>
                        <Animated.Text entering={FadeInDown.duration(800)} style={styles.heroPre}>ENGINEERED_EXCELLENCE</Animated.Text>
                        <Animated.Text entering={FadeInDown.delay(200).duration(800)} style={styles.name}>{personal_info.name.toUpperCase()}</Animated.Text>
                        <View style={styles.heroDivider} />
                        <Text style={styles.headline}>{personal_info.headline.toUpperCase()}</Text>
                    </View>

                    {/* Summary Section */}
                    <View style={styles.section}>
                        <MetallicCard style={styles.summaryCard}>
                            <View style={styles.summaryHeader}>
                                <Text style={styles.cardTitle}>MANIFESTO</Text>
                                <Layout size={20} color="#1F2937" opacity={0.3} />
                            </View>
                            <Text style={styles.summaryText}>{summary}</Text>
                        </MetallicCard>
                    </View>

                    {/* Expertise Section */}
                    <View style={styles.section}>
                        <Text style={styles.sectionHeading}>SYSTEM_CAPABILITIES</Text>
                        <View style={styles.skillsGrid}>
                            {technical_stack.mobile.concat(technical_stack.frontend.slice(0, 3)).map((skill, i) => (
                                <View key={skill} style={styles.skillChip}>
                                    <LinearGradient
                                        colors={['#F9FAFB', '#D1D5DB']}
                                        style={StyleSheet.absoluteFill}
                                    />
                                    <View style={styles.skillIndicator} />
                                    <Text style={styles.skillText}>{skill.toUpperCase()}</Text>
                                </View>
                            ))}
                        </View>
                    </View>

                    {/* Projects Section */}
                    <View style={styles.section}>
                        <Text style={styles.sectionHeading}>CURATED_DEPLOYMENTS</Text>
                        {projects.slice(0, 4).map((p, i) => (
                            <TouchableOpacity key={p.name} style={styles.projectBlock}>
                                <LinearGradient
                                    colors={['#F3F4F6', '#E5E7EB', '#D1D5DB']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                    style={StyleSheet.absoluteFill}
                                />
                                <View style={styles.projectContent}>
                                    <View style={styles.projectHeader}>
                                        <Text style={styles.projectIndex}>EXP_0{i + 1}</Text>
                                        <Text style={styles.projectName}>{p.name.toUpperCase()}</Text>
                                    </View>
                                    <Text style={styles.projectDesc}>{p.description.slice(0, 100)}...</Text>
                                    <View style={styles.projectFooter}>
                                        <Text style={styles.projectCat}>{p.category.toUpperCase()}</Text>
                                        <View style={styles.arrowIcon}>
                                            <ArrowRight size={20} color="#1F2937" />
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Footer Section */}
                    <TouchableOpacity style={styles.footerBtn} onPress={() => navigation.goBack()}>
                        <LinearGradient colors={['#1F2937', '#111827']} style={styles.footerInner}>
                            <Text style={styles.footerText}>INITIATE_PRECISION_LINK</Text>
                            <Zap size={20} color="#FFF" />
                        </LinearGradient>
                    </TouchableOpacity>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3F4F6',
    },
    metallicReflections: {
        ...StyleSheet.absoluteFillObject,
        opacity: 0.1,
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
        borderRadius: 24,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    headerBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingHorizontal: 16,
        paddingVertical: 10,
        backgroundColor: '#FFF',
        borderRadius: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    headerLabel: {
        fontSize: 10,
        fontWeight: '900',
        color: '#1F2937',
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
    heroPre: {
        fontSize: 11,
        fontWeight: '900',
        color: '#6B7280',
        letterSpacing: 4,
        marginBottom: 20,
    },
    name: {
        fontSize: 52,
        fontWeight: '900',
        color: '#1F2937',
        textAlign: 'center',
        lineHeight: 52,
        letterSpacing: -2,
    },
    heroDivider: {
        width: 40,
        height: 4,
        backgroundColor: '#1F2937',
        marginVertical: 32,
    },
    headline: {
        fontSize: 14,
        fontWeight: '900',
        color: '#4B5563',
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
        color: '#9CA3AF',
        letterSpacing: 4,
        marginBottom: 24,
        marginLeft: 10,
    },
    metallicCard: {
        borderRadius: 32,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#D1D5DB',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
    },
    cardContent: {
        padding: 40,
    },
    summaryHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    cardTitle: {
        fontSize: 11,
        fontWeight: '900',
        color: '#6B7280',
        letterSpacing: 4,
    },
    summaryText: {
        fontSize: 18,
        lineHeight: 30,
        color: '#1F2937',
        fontWeight: '400',
    },
    skillsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    skillChip: {
        paddingHorizontal: 20,
        paddingVertical: 14,
        borderRadius: 12,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#D1D5DB',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    skillIndicator: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#1F2937',
    },
    skillText: {
        fontSize: 12,
        fontWeight: '900',
        color: '#1F2937',
    },
    projectBlock: {
        borderRadius: 32,
        overflow: 'hidden',
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#D1D5DB',
    },
    projectContent: {
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
        color: '#6B7280',
    },
    projectName: {
        fontSize: 22,
        fontWeight: '900',
        color: '#1F2937',
        letterSpacing: -1,
    },
    projectDesc: {
        fontSize: 16,
        color: '#4B5563',
        lineHeight: 24,
        marginBottom: 24,
    },
    projectFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: 'rgba(0,0,0,0.05)',
    },
    projectCat: {
        fontSize: 10,
        fontWeight: '900',
        color: '#9CA3AF',
        letterSpacing: 2,
    },
    arrowIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
    footerBtn: {
        marginTop: 20,
        borderRadius: 32,
        overflow: 'hidden',
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
        color: '#FFF',
        letterSpacing: 2,
    }
});
