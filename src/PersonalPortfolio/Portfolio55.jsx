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
import { ChevronLeft, ArrowRight, Grid, Layout, Target, Zap, Activity, Shield } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { FadeIn, FadeInDown, SlideInRight } from 'react-native-reanimated';
import { portfolioprofile } from './portfoliodata';

const { width, height } = Dimensions.get('window');

const GridSection = ({ title, sub, children }) => (
    <View style={styles.section}>
        <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{title.toUpperCase()}</Text>
            <View style={styles.sectionLine} />
            <Text style={styles.sectionSub}>{sub.toUpperCase()}</Text>
        </View>
        <View style={styles.sectionContent}>
            {children}
        </View>
    </View>
);

export default function Portfolio55({ navigation }) {
    const { personal_info, hero, summary, technical_stack, projects } = portfolioprofile;

    return (
        <View style={styles.container}>
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <ChevronLeft size={24} color="#000" />
                    </TouchableOpacity>
                    <View style={styles.headerBadge}>
                        <Grid size={14} color="#000" />
                        <Text style={styles.headerLabel}>GRID_STRICT_V55</Text>
                    </View>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    {/* Hero Section */}
                    <View style={styles.heroSection}>
                        <Animated.Text entering={FadeInDown.duration(800)} style={styles.heroPre}>ARCHITECTURAL_VOID</Animated.Text>
                        <Animated.Text entering={FadeInDown.delay(200).duration(800)} style={styles.name}>{personal_info.name.toUpperCase()}</Animated.Text>
                        <View style={styles.heroDivider} />
                        <Text style={styles.headline}>{personal_info.headline.toUpperCase()}</Text>
                    </View>

                    {/* Summary Section */}
                    <GridSection title="Narrative" sub="Core_Prop">
                        <View style={styles.summaryBox}>
                            <Text style={styles.summaryText}>{summary}</Text>
                        </View>
                    </GridSection>

                    {/* Skills Section */}
                    <GridSection title="Capabilities" sub="Tool_Array">
                        <View style={styles.skillsGrid}>
                            {technical_stack.mobile.concat(technical_stack.frontend.slice(0, 3)).map((skill, i) => (
                                <View key={skill} style={styles.skillBox}>
                                    <View style={styles.skillIndicator} />
                                    <Text style={styles.skillText}>{skill.toUpperCase()}</Text>
                                </View>
                            ))}
                        </View>
                    </GridSection>

                    {/* Projects Section */}
                    <GridSection title="Artifacts" sub="Deployment_Log">
                        {projects.slice(0, 4).map((p, i) => (
                            <TouchableOpacity key={p.name} style={styles.projectStrip}>
                                <View style={styles.projectHeader}>
                                    <Text style={styles.projectIndex}>EXP_0{i + 1}</Text>
                                    <Text style={styles.projectName}>{p.name.toUpperCase()}</Text>
                                </View>
                                <Text style={styles.projectDesc}>{p.description.slice(0, 100)}...</Text>
                                <View style={styles.projectFooter}>
                                    <Text style={styles.projectCat}>{p.category.toUpperCase()}</Text>
                                    <View style={styles.arrowIcon}>
                                        <ArrowRight size={24} color="#000" />
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </GridSection>

                    {/* Footer Section */}
                    <TouchableOpacity style={styles.footerBtn} onPress={() => navigation.goBack()}>
                        <View style={styles.footerInner}>
                            <Text style={styles.footerText}>INITIATE_CONTACT_V55</Text>
                            <Zap size={24} color="#000" />
                        </View>
                        <View style={styles.footerBottomLine} />
                    </TouchableOpacity>
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
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
    },
    backBtn: {
        width: 48,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingHorizontal: 16,
        paddingVertical: 10,
        backgroundColor: '#F5F5F5',
        borderRadius: 4,
    },
    headerLabel: {
        fontSize: 10,
        fontWeight: '900',
        color: '#000',
        letterSpacing: 2,
    },
    scrollContent: {
        paddingBottom: 60,
    },
    heroSection: {
        paddingHorizontal: 24,
        paddingVertical: 80,
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
    },
    heroPre: {
        fontSize: 12,
        fontWeight: '900',
        color: '#BBB',
        letterSpacing: 4,
        marginBottom: 16,
    },
    name: {
        fontSize: 64,
        fontWeight: '900',
        color: '#000',
        lineHeight: 58,
        letterSpacing: -4,
        marginBottom: 40,
    },
    heroDivider: {
        width: 40,
        height: 4,
        backgroundColor: '#000',
        marginBottom: 40,
    },
    headline: {
        fontSize: 16,
        fontWeight: '900',
        color: '#000',
        letterSpacing: 2,
        lineHeight: 28,
        opacity: 0.8,
    },
    section: {
        paddingHorizontal: 24,
        paddingVertical: 60,
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
        marginBottom: 40,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '900',
        color: '#000',
        letterSpacing: 2,
    },
    sectionLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#EEE',
    },
    sectionSub: {
        fontSize: 10,
        fontWeight: '900',
        color: '#CCC',
        letterSpacing: 2,
    },
    summaryBox: {
        paddingRight: 40,
    },
    summaryText: {
        fontSize: 22,
        lineHeight: 34,
        fontWeight: '300',
        color: '#333',
    },
    skillsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 16,
    },
    skillBox: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F5F5F5',
        width: '45%',
    },
    skillIndicator: {
        width: 8,
        height: 8,
        backgroundColor: '#000',
    },
    skillText: {
        fontSize: 14,
        fontWeight: '900',
        color: '#000',
    },
    projectStrip: {
        paddingVertical: 40,
        borderBottomWidth: 1,
        borderBottomColor: '#F5F5F5',
    },
    projectHeader: {
        flexDirection: 'row',
        alignItems: 'baseline',
        gap: 20,
        marginBottom: 24,
    },
    projectIndex: {
        fontSize: 12,
        fontWeight: '900',
        color: '#999',
    },
    projectName: {
        fontSize: 32,
        fontWeight: '900',
        color: '#000',
        letterSpacing: -1,
    },
    projectDesc: {
        fontSize: 16,
        color: '#666',
        lineHeight: 26,
        marginBottom: 32,
    },
    projectFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    projectCat: {
        fontSize: 10,
        fontWeight: '900',
        color: '#CCC',
        letterSpacing: 2,
    },
    arrowIcon: {
        width: 48,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
    },
    footerBtn: {
        padding: 24,
        paddingTop: 80,
    },
    footerInner: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 40,
    },
    footerText: {
        fontSize: 42,
        fontWeight: '900',
        letterSpacing: -2,
    },
    footerBottomLine: {
        height: 10,
        backgroundColor: '#000',
    }
});
