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
import { ChevronLeft, ArrowRight, Minus, Maximize2, Move, Layout, Globe, Mail } from 'lucide-react-native';
import Animated, { FadeIn, FadeInDown, SlideInRight } from 'react-native-reanimated';
import { portfolioprofile } from './portfoliodata';

const { width, height } = Dimensions.get('window');

const EditorialSection = ({ title, sub, children }) => (
    <View style={styles.section}>
        <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{title.toUpperCase()}</Text>
            <Text style={styles.sectionSub}>{sub.toUpperCase()}</Text>
        </View>
        <View style={styles.sectionContent}>
            {children}
        </View>
    </View>
);

export default function Portfolio47({ navigation }) {
    const { personal_info, hero, summary, technical_stack, projects } = portfolioprofile;

    return (
        <View style={styles.container}>
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.navBtn}>
                        <ChevronLeft size={24} color="#000" />
                    </TouchableOpacity>
                    <Text style={styles.issueText}>ISSUE_NO_047 / MODERNIST_EDITORIAL</Text>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    {/* Editorial Hero */}
                    <View style={styles.heroSection}>
                        <View style={styles.heroLeft}>
                            <Animated.Text entering={FadeIn.duration(1200)} style={styles.verticalTitle}>PORTFOLIO</Animated.Text>
                        </View>
                        <View style={styles.heroRight}>
                            <Animated.Text entering={FadeInDown.delay(200).duration(1200)} style={styles.name}>{personal_info.name.toUpperCase()}</Animated.Text>
                            <View style={styles.heroDivider} />
                            <Text style={styles.heroSubtitle}>{personal_info.title.toUpperCase()}</Text>
                            <Text style={styles.heroHeadline}>{personal_info.headline}</Text>
                        </View>
                    </View>

                    {/* The Narrative Section */}
                    <EditorialSection title="Prologue" sub="Narrative_V47">
                        <View style={styles.summaryWrap}>
                            <Text style={styles.summaryText}>{summary}</Text>
                        </View>
                    </EditorialSection>

                    {/* Capabilities Wall (Skills) */}
                    <EditorialSection title="Expertise" sub="Technical_Stack">
                        <View style={styles.skillsGrid}>
                            {technical_stack.mobile.concat(technical_stack.frontend.slice(0, 3)).map((skill, i) => (
                                <View key={skill} style={styles.skillRow}>
                                    <View style={styles.skillIndex}><Text style={styles.indexText}>0{i+1}</Text></View>
                                    <Text style={styles.skillText}>{skill.toUpperCase()}</Text>
                                </View>
                            ))}
                        </View>
                    </EditorialSection>

                    {/* Curated Exhibits (Projects) */}
                    <EditorialSection title="Exhibits" sub="Project_Archives">
                        {projects.slice(0, 4).map((p, i) => (
                            <TouchableOpacity key={p.name} style={styles.projectExhibit}>
                                <View style={styles.exhibitHeader}>
                                    <Text style={styles.exhibitNum}>EXP_0{i + 1}</Text>
                                    <Text style={styles.exhibitName}>{p.name.toUpperCase()}</Text>
                                </View>
                                <View style={styles.exhibitMediaPlaceholder} />
                                <Text style={styles.exhibitDesc}>{p.description.slice(0, 100)}...</Text>
                                <View style={styles.exhibitFooter}>
                                    <Text style={styles.exhibitCat}>{p.category.toUpperCase()}</Text>
                                    <ArrowRight size={24} color="#000" />
                                </View>
                            </TouchableOpacity>
                        ))}
                    </EditorialSection>

                    {/* Final Assembly Footer */}
                    <TouchableOpacity style={styles.footerBtn} onPress={() => navigation.goBack()}>
                        <View style={styles.footerInner}>
                            <Text style={styles.footerLarge}>INITIATE_CONTACT</Text>
                            <View style={styles.footerBox}>
                                <Move size={32} color="#FFF" />
                            </View>
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
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
    },
    navBtn: {
        width: 44,
        height: 44,
        justifyContent: 'center',
    },
    issueText: {
        fontSize: 10,
        fontWeight: '900',
        color: '#666',
        letterSpacing: 2,
    },
    scrollContent: {
        paddingBottom: 60,
    },
    heroSection: {
        flexDirection: 'row',
        height: 500,
        borderBottomWidth: 2,
        borderBottomColor: '#000',
    },
    heroLeft: {
        width: 100,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    verticalTitle: {
        fontSize: 14,
        fontWeight: '900',
        color: '#FFF',
        letterSpacing: 10,
        transform: [{ rotate: '-90deg' }],
        position: 'absolute',
        width: 400,
        textAlign: 'center',
    },
    heroRight: {
        flex: 1,
        padding: 40,
        justifyContent: 'center',
    },
    name: {
        fontSize: 52,
        fontWeight: '900',
        color: '#000',
        lineHeight: 52,
        letterSpacing: -2,
        marginBottom: 32,
    },
    heroDivider: {
        width: 40,
        height: 4,
        backgroundColor: '#000',
        marginBottom: 32,
    },
    heroSubtitle: {
        fontSize: 12,
        fontWeight: '900',
        color: '#666',
        letterSpacing: 4,
        marginBottom: 16,
    },
    heroHeadline: {
        fontSize: 18,
        fontWeight: '700',
        color: '#000',
        lineHeight: 28,
    },
    section: {
        paddingHorizontal: 24,
        paddingVertical: 60,
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        marginBottom: 40,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '900',
        letterSpacing: 2,
    },
    sectionSub: {
        fontSize: 10,
        fontWeight: '900',
        color: '#CCC',
        letterSpacing: 2,
    },
    summaryWrap: {
        paddingRight: 40,
    },
    summaryText: {
        fontSize: 22,
        lineHeight: 34,
        fontWeight: '300',
        color: '#333',
    },
    skillsGrid: {
        gap: 16,
    },
    skillRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 24,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F5F5F5',
    },
    skillIndex: {
        width: 32,
        height: 32,
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        alignItems: 'center',
    },
    indexText: {
        fontSize: 10,
        fontWeight: '900',
        color: '#666',
    },
    skillText: {
        fontSize: 16,
        fontWeight: '900',
        color: '#000',
    },
    projectExhibit: {
        marginBottom: 60,
    },
    exhibitHeader: {
        flexDirection: 'row',
        alignItems: 'baseline',
        gap: 20,
        marginBottom: 24,
    },
    exhibitNum: {
        fontSize: 12,
        fontWeight: '900',
        color: '#999',
    },
    exhibitName: {
        fontSize: 32,
        fontWeight: '900',
        color: '#000',
        letterSpacing: -1,
    },
    exhibitMediaPlaceholder: {
        height: 400,
        backgroundColor: '#F5F5F5',
        marginBottom: 24,
    },
    exhibitDesc: {
        fontSize: 16,
        color: '#666',
        lineHeight: 26,
        marginBottom: 24,
    },
    exhibitFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: '#F5F5F5',
    },
    exhibitCat: {
        fontSize: 10,
        fontWeight: '900',
        color: '#CCC',
        letterSpacing: 2,
    },
    footerBtn: {
        paddingHorizontal: 24,
        paddingTop: 80,
    },
    footerInner: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 40,
    },
    footerLarge: {
        fontSize: 42,
        fontWeight: '900',
        letterSpacing: -2,
    },
    footerBox: {
        width: 70,
        height: 70,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    footerBottomLine: {
        height: 10,
        backgroundColor: '#000',
    }
});
