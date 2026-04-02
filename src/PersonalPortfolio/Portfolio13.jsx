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
import { Briefcase, Layout, TrendingUp, Info, ChevronLeft, ArrowRight, Share2, Award } from 'lucide-react-native';
import Animated, { FadeInUp, SlideInLeft } from 'react-native-reanimated';
import { portfolioprofile } from './portfoliodata';

const { width } = Dimensions.get('window');

const StrategyBlock = ({ title, desc, icon: Icon, index }) => (
    <Animated.View 
        entering={FadeInUp.delay(index * 100).duration(800)}
        style={styles.strategyBlock}
    >
        <View style={styles.blockIcon}><Icon size={20} color="#000" /></View>
        <Text style={styles.blockTitle}>{title}</Text>
        <Text style={styles.blockDesc}>{desc}</Text>
    </Animated.View>
);

export default function Portfolio13({ navigation }) {
    const { personal_info, hero, services, projects, achievements } = portfolioprofile;

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
                    
                    {/* Editorial Header */}
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                            <ChevronLeft size={24} color="#000" />
                        </TouchableOpacity>
                        <Text style={styles.headerLabel}>EST. 2024</Text>
                        <View style={styles.headerActions}>
                            <Share2 size={20} color="#000" />
                        </View>
                    </View>

                    {/* Bold Editorial Hero */}
                    <View style={styles.heroSection}>
                        <View style={styles.topBadge}><Text style={styles.badgeText}>SPECIAL EDITION : MOBILE ARCHITECTURE</Text></View>
                        <Text style={styles.heroMainTitle}>{personal_info.name.toUpperCase()}</Text>
                        <View style={styles.heroFlex}>
                            <Text style={styles.heroRole}>{personal_info.title.toUpperCase()}</Text>
                            <View style={styles.line} />
                            <Text style={styles.heroLocation}>{personal_info.location.toUpperCase()}</Text>
                        </View>
                        <Text style={styles.heroSummary}>{hero.subtitle}</Text>
                    </View>

                    {/* Strategy Grid */}
                    <View style={styles.gridSection}>
                        <View style={styles.sectionHeader}>
                            <TrendingUp size={24} color="#000" />
                            <Text style={styles.sectionTitle}>SERVICE_STRATEGY</Text>
                        </View>
                        <View style={styles.grid}>
                            {services.slice(0, 4).map((service, index) => (
                                <StrategyBlock 
                                    key={index} 
                                    title={service} 
                                    desc="Ensuring high-performance delivery and seamless cross-platform parity."
                                    icon={Layout}
                                    index={index}
                                />
                            ))}
                        </View>
                    </View>

                    {/* Featured Layout */}
                    <View style={styles.projectSection}>
                        <View style={styles.sectionHeader}>
                            <Briefcase size={24} color="#000" />
                            <Text style={styles.sectionTitle}>REPORTS_&_DEPLOYMENTS</Text>
                        </View>
                        {projects.slice(0, 3).map((project, index) => (
                            <Animated.View 
                                key={index} 
                                entering={SlideInLeft.delay(index * 200)}
                                style={styles.editorialProjectCard}
                            >
                                <View style={styles.projMeta}>
                                    <View style={styles.projYearPill}><Text style={styles.projYear}>2024</Text></View>
                                    <Text style={styles.projId}>MODULE_REF_{index + 1}</Text>
                                </View>
                                <Text style={styles.projTitle}>{project.name}</Text>
                                <Text style={styles.projDesc}>{project.description}</Text>
                                <TouchableOpacity style={styles.readMore}>
                                    <Text style={styles.readMoreText}>READ FULL CASE</Text>
                                    <ArrowRight size={16} color="#000" />
                                </TouchableOpacity>
                            </Animated.View>
                        ))}
                    </View>

                    {/* Strategy Accomplishments */}
                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <Award size={24} color="#000" />
                            <Text style={styles.sectionTitle}>KEY_AWARDS_ST_ACHIEVEMENTS</Text>
                        </View>
                        <View style={styles.achContainer}>
                            {achievements.map((ach, index) => (
                                <View key={index} style={styles.achRow}>
                                    <View style={styles.dot} />
                                    <Text style={styles.achText}>{ach}</Text>
                                </View>
                            ))}
                        </View>
                    </View>

                    {/* Footer Clean */}
                    <View style={styles.footer}>
                        <View style={styles.footerLine} />
                        <View style={styles.footerRow}>
                            <Text style={styles.footerBrand}>RAMESH SEERVI</Text>
                            <Text style={styles.footerCopyright}>© 2024 STRATEGY_UI</Text>
                        </View>
                        <TouchableOpacity style={styles.contactBtn}>
                            <Text style={styles.contactText}>GET_IN_TOUCH_</Text>
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
        backgroundColor: '#FFF',
    },
    safeArea: {
        flex: 1,
    },
    scrollContainer: {
        paddingBottom: 40,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 24,
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
    },
    backBtn: {
        padding: 8,
    },
    headerLabel: {
        fontSize: 10,
        fontWeight: '900',
        color: '#999',
        letterSpacing: 2,
    },
    heroSection: {
        padding: 24,
        paddingTop: 40,
        backgroundColor: '#F9F9F9',
    },
    topBadge: {
        backgroundColor: '#000',
        paddingHorizontal: 12,
        paddingVertical: 6,
        alignSelf: 'flex-start',
        marginBottom: 20,
    },
    badgeText: {
        color: '#FFF',
        fontSize: 10,
        fontWeight: '900',
        letterSpacing: 1.5,
    },
    heroMainTitle: {
        fontSize: 64,
        fontWeight: '900',
        color: '#000',
        letterSpacing: -2,
        lineHeight: 64,
    },
    heroFlex: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        marginTop: 20,
        marginBottom: 32,
    },
    heroRole: {
        fontSize: 12,
        fontWeight: '900',
        color: '#666',
        letterSpacing: 1,
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: '#DDD',
    },
    heroLocation: {
        fontSize: 12,
        fontWeight: '900',
        color: '#000',
    },
    heroSummary: {
        fontSize: 20,
        color: '#333',
        lineHeight: 28,
        fontWeight: '500',
    },
    gridSection: {
        padding: 24,
        marginTop: 40,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 32,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: '900',
        color: '#000',
        letterSpacing: 2,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 16,
    },
    strategyBlock: {
        width: (width - 64) / 2,
        backgroundColor: '#FFF',
        padding: 20,
        borderWidth: 2,
        borderColor: '#000',
    },
    blockIcon: {
        marginBottom: 16,
    },
    blockTitle: {
        fontSize: 16,
        fontWeight: '900',
        color: '#000',
        marginBottom: 8,
    },
    blockDesc: {
        fontSize: 12,
        color: '#666',
        lineHeight: 18,
    },
    projectSection: {
        padding: 24,
        marginTop: 40,
    },
    editorialProjectCard: {
        marginBottom: 32,
        padding: 24,
        backgroundColor: '#FFF',
        borderLeftWidth: 8,
        borderLeftColor: '#000',
        borderWidth: 1,
        borderColor: '#EEE',
    },
    projMeta: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    projYearPill: {
        backgroundColor: '#EEE',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
    },
    projYear: {
        fontSize: 10,
        fontWeight: '800',
        color: '#000',
    },
    projId: {
        fontSize: 10,
        fontWeight: '700',
        color: '#999',
        letterSpacing: 1,
    },
    projTitle: {
        fontSize: 24,
        fontWeight: '900',
        color: '#000',
        marginBottom: 12,
    },
    projDesc: {
        fontSize: 14,
        color: '#444',
        lineHeight: 22,
        marginBottom: 20,
    },
    readMore: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    readMoreText: {
        fontSize: 12,
        fontWeight: '900',
        color: '#000',
    },
    section: {
        padding: 24,
    },
    achContainer: {
        gap: 20,
    },
    achRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    dot: {
        width: 8,
        height: 8,
        backgroundColor: '#000',
    },
    achText: {
        fontSize: 15,
        color: '#444',
        fontWeight: '500',
        flex: 1,
    },
    footer: {
        padding: 24,
        marginTop: 40,
    },
    footerLine: {
        height: 4,
        backgroundColor: '#000',
        marginBottom: 24,
    },
    footerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 32,
    },
    footerBrand: {
        fontSize: 14,
        fontWeight: '900',
        color: '#000',
        letterSpacing: 1,
    },
    footerCopyright: {
        fontSize: 10,
        color: '#999',
        fontWeight: '700',
    },
    contactBtn: {
        backgroundColor: '#000',
        paddingVertical: 20,
        alignItems: 'center',
    },
    contactText: {
        color: '#FFF',
        fontSize: 14,
        fontWeight: '900',
        letterSpacing: 2,
    }
});
