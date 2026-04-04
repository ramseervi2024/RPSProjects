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
import { ChevronLeft, ArrowUpRight, Github, Mail, Globe, Menu } from 'lucide-react-native';
import Animated, { FadeIn, FadeInDown, SlideInRight } from 'react-native-reanimated';
import { portfolioprofile } from './portfoliodata';

const { width } = Dimensions.get('window');

const GridLine = ({ horizontal, vertical, top, left, right, bottom }) => (
    <View style={[
        styles.gridLine,
        horizontal && { height: 1, left: 0, right: 0 },
        vertical && { width: 1, top: 0, bottom: 0 },
        { top, left, right, bottom }
    ]} />
);

export default function Portfolio19({ navigation }) {
    const { personal_info, hero, summary, technical_stack, projects, education, stats } = portfolioprofile;

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                {/* Fixed Border System */}
                <GridLine vertical left={24} />
                <GridLine vertical right={24} />
                <GridLine horizontal top={100} />

                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <ChevronLeft size={24} color="#000" />
                        <Text style={styles.backText}>BACK</Text>
                    </TouchableOpacity>
                    <Text style={styles.navLogo}>SWISS_MODERN / 19</Text>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    {/* Hero Grid */}
                    <View style={styles.heroSection}>
                        <Animated.Text entering={FadeInDown.duration(800)} style={styles.titleSmall}>
                            VISUAL COMMUNICATIONS
                        </Animated.Text>
                        <Animated.Text entering={FadeInDown.delay(200).duration(800)} style={styles.nameLarge}>
                            {personal_info.name.toUpperCase()}
                        </Animated.Text>
                        <View style={styles.redBlock} />
                        <Text style={styles.occupation}>
                            {personal_info.title.toUpperCase()} — BENGALURU
                        </Text>
                    </View>

                    {/* Stats Block */}
                    <View style={styles.statsContainer}>
                        {stats.map((stat, i) => (
                            <View key={i} style={styles.statBox}>
                                <Text style={styles.statLabel}>{stat.label.toUpperCase()}</Text>
                                <Text style={styles.statValue}>{stat.value}</Text>
                            </View>
                        ))}
                    </View>

                    {/* Content Grid */}
                    <View style={styles.mainGrid}>
                        {/* Summary */}
                        <View style={styles.contentSection}>
                            <Text style={styles.sectionHeading}>01 / SUMMARY</Text>
                            <Text style={styles.summaryText}>{summary}</Text>
                        </View>

                        {/* Skills */}
                        <View style={styles.contentSection}>
                            <Text style={styles.sectionHeading}>02 / EXPERTISE</Text>
                            <View style={styles.skillsGrid}>
                                {technical_stack.mobile.concat(technical_stack.frontend).map((skill, i) => (
                                    <Text key={i} style={styles.skillItem}>{skill.toUpperCase()}</Text>
                                ))}
                            </View>
                        </View>

                        {/* Projects */}
                        <View style={styles.contentSection}>
                            <Text style={styles.sectionHeading}>03 / SELECTED WORKS</Text>
                            {projects.slice(0, 5).map((project, i) => (
                                <TouchableOpacity key={i} style={styles.projectRow}>
                                    <View style={styles.projectInfo}>
                                        <Text style={styles.projectYear}>2024</Text>
                                        <Text style={styles.projectName}>{project.name.toUpperCase()}</Text>
                                    </View>
                                    <ArrowUpRight size={20} color="#000" />
                                </TouchableOpacity>
                            ))}
                        </View>

                        {/* Education */}
                        <View style={styles.contentSection}>
                            <Text style={styles.sectionHeading}>04 / EDUCATION</Text>
                            <Text style={styles.eduText}>{education.degree.toUpperCase()}</Text>
                            <Text style={styles.eduSub}>{education.institution.toUpperCase()}</Text>
                        </View>
                    </View>

                    {/* Contact Footer */}
                    <TouchableOpacity style={styles.footer} onPress={() => navigation.goBack()}>
                        <View style={styles.footerLine} />
                        <View style={styles.footerContent}>
                            <Text style={styles.footerCall}>CONTACT@WORK</Text>
                            <Text style={styles.footerLarge}>LET'S CREATE</Text>
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
        backgroundColor: '#F0F0F0', // Classic Swiss Paper White
    },
    safeArea: {
        flex: 1,
    },
    gridLine: {
        position: 'absolute',
        backgroundColor: '#000',
        zIndex: 100,
    },
    header: {
        height: 100,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
    },
    backBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    backText: {
        fontSize: 14,
        fontWeight: '900',
        letterSpacing: 2,
    },
    navLogo: {
        fontSize: 12,
        fontWeight: '900',
        letterSpacing: 1,
    },
    scrollContent: {
        paddingHorizontal: 24,
        paddingBottom: 60,
    },
    heroSection: {
        paddingTop: 40,
        marginBottom: 60,
    },
    titleSmall: {
        fontSize: 14,
        fontWeight: '900',
        color: '#000',
        letterSpacing: 4,
        marginBottom: 12,
    },
    nameLarge: {
        fontSize: 72,
        fontWeight: '900',
        color: '#000',
        lineHeight: 65,
        letterSpacing: -4,
        marginBottom: 24,
    },
    redBlock: {
        width: 120,
        height: 120,
        backgroundColor: '#E63946', // Classic Swiss Red
        position: 'absolute',
        right: -24,
        top: 60,
        zIndex: -1,
    },
    occupation: {
        fontSize: 16,
        fontWeight: '900',
        color: '#000',
        borderTopWidth: 2,
        borderTopColor: '#000',
        paddingTop: 12,
        alignSelf: 'flex-start',
    },
    statsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 80,
    },
    statBox: {
        width: '50%',
        paddingVertical: 24,
        borderBottomWidth: 1,
        borderBottomColor: '#000',
    },
    statLabel: {
        fontSize: 11,
        fontWeight: '900',
        letterSpacing: 2,
        marginBottom: 8,
    },
    statValue: {
        fontSize: 32,
        fontWeight: '900',
    },
    mainGrid: {
        marginBottom: 80,
    },
    contentSection: {
        marginBottom: 60,
    },
    sectionHeading: {
        fontSize: 14,
        fontWeight: '900',
        letterSpacing: 4,
        marginBottom: 24,
        color: '#000',
    },
    summaryText: {
        fontSize: 20,
        fontWeight: '700',
        lineHeight: 30,
        color: '#1A1A1A',
    },
    skillsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 16,
    },
    skillItem: {
        fontSize: 14,
        fontWeight: '900',
        color: '#000',
        backgroundColor: '#FFF',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderWidth: 1,
        borderColor: '#000',
    },
    projectRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 24,
        borderBottomWidth: 1,
        borderBottomColor: '#CCC',
    },
    projectInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 40,
    },
    projectYear: {
        fontSize: 14,
        fontWeight: '900',
        color: '#999',
    },
    projectName: {
        fontSize: 18,
        fontWeight: '900',
    },
    eduText: {
        fontSize: 24,
        fontWeight: '900',
        marginBottom: 8,
    },
    eduSub: {
        fontSize: 14,
        fontWeight: '700',
        color: '#666',
    },
    footer: {
        marginTop: 40,
    },
    footerLine: {
        height: 6,
        backgroundColor: '#000',
        width: 100,
        marginBottom: 24,
    },
    footerContent: {
        gap: 8,
    },
    footerCall: {
        fontSize: 14,
        fontWeight: '900',
        letterSpacing: 3,
    },
    footerLarge: {
        fontSize: 48,
        fontWeight: '900',
        letterSpacing: -2,
    }
});
