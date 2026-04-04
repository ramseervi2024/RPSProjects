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
import { ChevronLeft, Feather, BookOpen, PenTool, Mail, ArrowUpRight, Bookmark } from 'lucide-react-native';
import Animated, { FadeIn, FadeInDown, SlideInRight } from 'react-native-reanimated';
import { portfolioprofile } from './portfoliodata';

const { width } = Dimensions.get('window');

const PrintSection = ({ title, sub, children }) => (
    <View style={styles.section}>
        <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{title.toUpperCase()}</Text>
            {sub && <Text style={styles.sectionSub}>{sub.toUpperCase()}</Text>}
        </View>
        <View style={styles.divider} />
        {children}
    </View>
);

export default function Portfolio28({ navigation }) {
    const { personal_info, hero, summary, technical_stack, projects, stats } = portfolioprofile;

    return (
        <View style={styles.container}>
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <ChevronLeft size={24} color="#1A1A1A" />
                    </TouchableOpacity>
                    <Text style={styles.issueLabel}>ISSUE_NO_2026_01 / PAPER_AND_INK</Text>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    {/* Hero Editorial */}
                    <View style={styles.heroSection}>
                        <Animated.Text entering={FadeIn.duration(1200)} style={styles.heroPre}>THE_COLLECTIVE_WORKS_OF</Animated.Text>
                        <Animated.Text entering={FadeInDown.delay(200).duration(1200)} style={styles.name}>{personal_info.name.toUpperCase()}</Animated.Text>
                        <View style={styles.heroDivider} />
                        <Text style={styles.heroTitle}>{personal_info.title.toUpperCase()}</Text>
                        <Text style={styles.heroHeadline}>{personal_info.headline}</Text>
                    </View>

                    {/* Prologue Section */}
                    <PrintSection title="Folio_One" sub="Professional_Summary">
                        <Text style={styles.summaryText}>{summary}</Text>
                    </PrintSection>

                    {/* Stats Matrix */}
                    <View style={styles.statsMatrix}>
                        {stats.map((stat, i) => (
                            <View key={stat.label} style={[styles.statBox, { borderRightWidth: i % 2 === 0 ? 1 : 0 }]}>
                                <Text style={styles.statVal}>{stat.value}</Text>
                                <Text style={styles.statLab}>{stat.label.toUpperCase()}</Text>
                            </View>
                        ))}
                    </View>

                    {/* Capabilities */}
                    <PrintSection title="Folio_Two" sub="Core_Expertise">
                        <View style={styles.expertiseList}>
                            {technical_stack.mobile.concat(technical_stack.frontend.slice(0, 3)).map((skill) => (
                                <View key={skill} style={styles.skillRow}>
                                    <View style={styles.bullet} />
                                    <Text style={styles.skillText}>{skill.toUpperCase()}</Text>
                                </View>
                            ))}
                        </View>
                    </PrintSection>

                    {/* Projects Exhibits */}
                    <PrintSection title="Folio_Three" sub="Curated_Projects">
                        {projects.slice(0, 4).map((p, i) => (
                            <TouchableOpacity key={p.name} style={styles.projectEntry}>
                                <Text style={styles.projectType}>EXHIBIT_0{i + 1} / {p.category.toUpperCase()}</Text>
                                <Text style={styles.projectName}>{p.name.toUpperCase()}</Text>
                                <Text style={styles.projectDesc}>{p.description.slice(0, 120)}...</Text>
                                <View style={styles.projectAction}>
                                    <Text style={styles.viewLabel}>View Publication</Text>
                                    <ArrowUpRight size={18} color="#1A1A1A" />
                                </View>
                            </TouchableOpacity>
                        ))}
                    </PrintSection>

                    {/* Final Signature */}
                    <TouchableOpacity style={styles.signatureBtn} onPress={() => navigation.goBack()}>
                        <View style={styles.signatureTop}>
                            <Feather size={24} color="#1A1A1A" />
                            <Text style={styles.sigLabel}>SIGNED_AND_DELIVERED</Text>
                        </View>
                        <Text style={styles.sigLarge}>GET_IN_TOUCH</Text>
                    </TouchableOpacity>

                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FCFAF5', // Soft Paper Cream
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.1)',
    },
    backBtn: {
        width: 44,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
    },
    issueLabel: {
        fontSize: 10,
        fontWeight: '900',
        color: '#666',
        letterSpacing: 2,
    },
    scrollContent: {
        paddingHorizontal: 30,
        paddingBottom: 60,
    },
    heroSection: {
        paddingVertical: 60,
        alignItems: 'center',
    },
    heroPre: {
        fontSize: 11,
        fontWeight: '900',
        color: '#999',
        letterSpacing: 4,
        marginBottom: 16,
    },
    name: {
        fontSize: 48,
        fontWeight: '900',
        color: '#1A1A1A',
        lineHeight: 48,
        textAlign: 'center',
        letterSpacing: -2,
    },
    heroDivider: {
        width: 40,
        height: 4,
        backgroundColor: '#1A1A1A',
        marginVertical: 24,
    },
    heroTitle: {
        fontSize: 16,
        fontWeight: '900',
        color: '#1A1A1A',
        letterSpacing: 2,
        marginBottom: 12,
    },
    heroHeadline: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        lineHeight: 24,
        fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
        paddingHorizontal: 20,
    },
    section: {
        marginBottom: 60,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        marginBottom: 12,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: '900',
        letterSpacing: 2,
    },
    sectionSub: {
        fontSize: 10,
        fontWeight: '900',
        color: '#999',
    },
    divider: {
        height: 2,
        backgroundColor: '#1A1A1A',
        marginBottom: 32,
    },
    summaryText: {
        fontSize: 17,
        lineHeight: 28,
        color: '#333',
        fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
    },
    statsMatrix: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: 'rgba(0,0,0,0.1)',
        marginBottom: 60,
    },
    statBox: {
        width: '50%',
        paddingVertical: 24,
        paddingHorizontal: 16,
        borderColor: 'rgba(0,0,0,0.1)',
    },
    statVal: {
        fontSize: 28,
        fontWeight: '900',
        color: '#1A1A1A',
        marginBottom: 4,
    },
    statLab: {
        fontSize: 10,
        fontWeight: '700',
        color: '#999',
        letterSpacing: 1,
    },
    expertiseList: {
        gap: 16,
    },
    skillRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    bullet: {
        width: 6,
        height: 6,
        backgroundColor: '#1A1A1A',
        transform: [{ rotate: '45deg' }],
    },
    skillText: {
        fontSize: 14,
        fontWeight: '900',
        color: '#1A1A1A',
        letterSpacing: 1,
    },
    projectEntry: {
        marginBottom: 40,
        paddingBottom: 40,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.05)',
    },
    projectType: {
        fontSize: 10,
        fontWeight: '900',
        color: '#999',
        letterSpacing: 2,
        marginBottom: 12,
    },
    projectName: {
        fontSize: 24,
        fontWeight: '900',
        color: '#1A1A1A',
        marginBottom: 16,
    },
    projectDesc: {
        fontSize: 16,
        color: '#555',
        lineHeight: 24,
        fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
        marginBottom: 20,
    },
    projectAction: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    viewLabel: {
        fontSize: 12,
        fontWeight: '900',
        textDecorationLine: 'underline',
    },
    signatureBtn: {
        marginTop: 20,
        borderTopWidth: 2,
        borderColor: '#1A1A1A',
        paddingVertical: 40,
    },
    signatureTop: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        marginBottom: 12,
    },
    sigLabel: {
        fontSize: 11,
        fontWeight: '900',
        letterSpacing: 2,
    },
    sigLarge: {
        fontSize: 42,
        fontWeight: '900',
        letterSpacing: -2,
    }
});
