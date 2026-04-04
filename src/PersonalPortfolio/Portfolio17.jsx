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
import { ChevronLeft, ArrowRight, Github, Mail, MapPin, ExternalLink, Briefcase, GraduationCap } from 'lucide-react-native';
import Animated, { FadeInDown, SlideInRight, SlideInLeft } from 'react-native-reanimated';
import { portfolioprofile } from './portfoliodata';

const { width } = Dimensions.get('window');

const SectionHeader = ({ title, icon: Icon }) => (
    <View style={styles.sectionHeader}>
        <View style={styles.sectionHeaderLine} />
        <View style={styles.sectionHeaderTitleContainer}>
            <Icon size={20} color="#000" strokeWidth={2.5} />
            <Text style={styles.sectionHeaderTitle}>{title.toUpperCase()}</Text>
        </View>
    </View>
);

export default function Portfolio17({ navigation }) {
    const { personal_info, hero, summary, technical_stack, projects, education, stats } = portfolioprofile;

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <ChevronLeft size={28} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerLabel}>REF / BRUTALIST_017</Text>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {/* Hero Section */}
                <View style={styles.heroSection}>
                    <Animated.Text entering={SlideInLeft.duration(800)} style={styles.name}>
                        {personal_info.name.toUpperCase()}
                    </Animated.Text>
                    <View style={styles.titleBox}>
                        <Text style={styles.titleText}>{personal_info.title.toUpperCase()}</Text>
                    </View>
                    <Animated.Text entering={FadeInDown.delay(400)} style={styles.headline}>
                        {personal_info.headline}
                    </Animated.Text>
                </View>

                {/* Stats Grid */}
                <View style={styles.statsGrid}>
                    {stats.map((stat, i) => (
                        <View key={i} style={styles.statItem}>
                            <Text style={styles.statValue}>{stat.value}</Text>
                            <Text style={styles.statLabel}>{stat.label.toUpperCase()}</Text>
                        </View>
                    ))}
                </View>

                {/* Summary Section */}
                <View style={styles.section}>
                    <SectionHeader title="System_Summary" icon={Briefcase} />
                    <View style={styles.summaryBox}>
                        <Text style={styles.summaryText}>{summary}</Text>
                    </View>
                </View>

                {/* Technical Stack */}
                <View style={styles.section}>
                    <SectionHeader title="Tech_Architecture" icon={MapPin} />
                    <View style={styles.skillsWrapper}>
                        {technical_stack.mobile.concat(technical_stack.frontend).map((skill, index) => (
                            <View key={index} style={styles.skillTag}>
                                <Text style={styles.skillText}>{skill.toUpperCase()}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Featured Projects */}
                <View style={styles.section}>
                    <SectionHeader title="Project_Logs" icon={ExternalLink} />
                    {projects.slice(0, 4).map((project, index) => (
                        <Animated.View 
                            key={index} 
                            entering={FadeInDown.delay(index * 100)}
                            style={styles.projectCard}
                        >
                            <View style={styles.projectHeader}>
                                <Text style={styles.projectIndex}>0{index + 1}</Text>
                                <Text style={styles.projectName}>{project.name.toUpperCase()}</Text>
                            </View>
                            <Text style={styles.projectDesc}>{project.description}</Text>
                            <View style={styles.projectFooter}>
                                <Text style={styles.projectType}>{project.category}</Text>
                                <ArrowRight size={18} color="#000" />
                            </View>
                        </Animated.View>
                    ))}
                </View>

                {/* Contact CTA */}
                <TouchableOpacity style={styles.contactFooter} onPress={() => navigation.goBack()}>
                    <Text style={styles.contactFooterText}>INITIATE_CONNECTION</Text>
                    <ArrowRight size={24} color="#FFF" />
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        paddingVertical: 16,
        borderBottomWidth: 4,
        borderBottomColor: '#000',
    },
    backButton: {
        width: 44,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#000',
    },
    headerLabel: {
        fontFamily: 'monospace',
        fontSize: 12,
        fontWeight: '900',
        color: '#000',
    },
    scrollContent: {
        paddingHorizontal: 24,
        paddingBottom: 60,
        paddingTop: 40,
    },
    heroSection: {
        marginBottom: 60,
    },
    name: {
        fontSize: 56,
        fontWeight: '900',
        color: '#000',
        lineHeight: 52,
        marginBottom: 16,
        letterSpacing: -2,
    },
    titleBox: {
        backgroundColor: '#000',
        alignSelf: 'flex-start',
        paddingHorizontal: 12,
        paddingVertical: 6,
        marginBottom: 24,
    },
    titleText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '900',
        letterSpacing: 2,
    },
    headline: {
        fontSize: 18,
        lineHeight: 28,
        color: '#333',
        fontWeight: '500',
        fontFamily: 'monospace',
    },
    statsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        borderWidth: 3,
        borderColor: '#000',
        marginBottom: 60,
    },
    statItem: {
        width: '50%',
        padding: 24,
        borderWidth: 1,
        borderColor: '#000',
    },
    statValue: {
        fontSize: 32,
        fontWeight: '900',
        color: '#000',
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 12,
        fontWeight: '700',
        color: '#666',
        letterSpacing: 1,
    },
    section: {
        marginBottom: 60,
    },
    sectionHeader: {
        marginBottom: 32,
    },
    sectionHeaderLine: {
        height: 8,
        backgroundColor: '#000',
        width: 60,
        marginBottom: 12,
    },
    sectionHeaderTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    sectionHeaderTitle: {
        fontSize: 24,
        fontWeight: '900',
        color: '#000',
    },
    summaryBox: {
        padding: 24,
        backgroundColor: '#F3F4F6',
        borderLeftWidth: 12,
        borderLeftColor: '#000',
    },
    summaryText: {
        fontSize: 16,
        lineHeight: 26,
        color: '#000',
        fontFamily: 'monospace',
    },
    skillsWrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    skillTag: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderWidth: 2,
        borderColor: '#000',
    },
    skillText: {
        fontSize: 13,
        fontWeight: '900',
        color: '#000',
    },
    projectCard: {
        padding: 24,
        borderBottomWidth: 3,
        borderBottomColor: '#000',
        marginBottom: 20,
    },
    projectHeader: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 16,
        marginBottom: 16,
    },
    projectIndex: {
        fontSize: 14,
        fontWeight: '900',
        color: '#000',
        backgroundColor: '#EEE',
        padding: 4,
    },
    projectName: {
        fontSize: 24,
        fontWeight: '900',
        color: '#000',
        flex: 1,
        lineHeight: 28,
    },
    projectDesc: {
        fontSize: 16,
        color: '#444',
        lineHeight: 24,
        marginBottom: 20,
    },
    projectFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    projectType: {
        fontSize: 12,
        fontWeight: '900',
        color: '#666',
        letterSpacing: 1,
    },
    contactFooter: {
        backgroundColor: '#000',
        padding: 32,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 40,
    },
    contactFooterText: {
        color: '#FFF',
        fontSize: 20,
        fontWeight: '900',
        letterSpacing: 2,
    }
});
