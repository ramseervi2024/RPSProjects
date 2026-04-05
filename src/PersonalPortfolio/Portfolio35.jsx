import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    Dimensions,
    Platform,
} from 'react-native';
import { ChevronLeft, ArrowRight, ShieldCheck, Star, Diamond, Heart, Globe, Mail } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { FadeIn, FadeInDown, SlideInRight } from 'react-native-reanimated';
import { portfolioprofile } from './portfoliodata';

const { width } = Dimensions.get('window');

const BoutiqueSection = ({ title, sub, children }) => (
    <View style={styles.section}>
        <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{title.toUpperCase()}</Text>
            <View style={styles.goldLine} />
        </View>
        <Text style={styles.sectionSub}>{sub.toUpperCase()}</Text>
        <View style={styles.sectionContent}>
            {children}
        </View>
    </View>
);

export default function Portfolio35({ navigation }) {
    const { personal_info, hero, summary, technical_stack, projects } = portfolioprofile;

    return (
        <View style={styles.container}>
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <ChevronLeft size={24} color="#111" />
                    </TouchableOpacity>
                    <Text style={styles.brandTitle}>CURATED_STUDIO_35</Text>
                    <View style={styles.headerRight}>
                        <Diamond size={18} color="#D4AF37" fill="#D4AF37" />
                    </View>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    {/* Hero Editorial */}
                    <View style={styles.heroSection}>
                        <Animated.Text entering={FadeIn.duration(1500)} style={styles.heroPre}>ESTABLISHED_COLLECTION</Animated.Text>
                        <Animated.Text entering={FadeInDown.delay(200).duration(1200)} style={styles.name}>{personal_info.name.toUpperCase()}</Animated.Text>
                        <View style={styles.heroDivider} />
                        <Text style={styles.heroTitle}>{personal_info.title.toUpperCase()}</Text>
                        <Text style={styles.heroHeadline}>{personal_info.headline}</Text>
                    </View>

                    {/* The Manifesto */}
                    <BoutiqueSection title="The_Manifesto" sub="Conceptual_Philosophy">
                        <Text style={styles.summaryText}>{summary}</Text>
                    </BoutiqueSection>

                    {/* Expertise Row */}
                    <View style={styles.expertiseRow}>
                        <Text style={styles.rowLabel}>PRECISION_INSTRUMENTS</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.expertiseScroll}>
                            {technical_stack.mobile.concat(technical_stack.frontend.slice(0, 3)).map((skill) => (
                                <View key={skill} style={styles.skillCard}>
                                    <View style={styles.skillIcon}>
                                        <Star size={16} color="#D4AF37" strokeWidth={1} />
                                    </View>
                                    <Text style={styles.skillText}>{skill.toUpperCase()}</Text>
                                </View>
                            ))}
                        </ScrollView>
                    </View>

                    {/* Curated Exhibits (Projects) */}
                    <BoutiqueSection title="The_Collection" sub="Recent_Exhibitions">
                        {projects.slice(0, 4).map((p, i) => (
                            <TouchableOpacity key={p.name} style={styles.projectExhibit}>
                                <View style={styles.exhibitHeader}>
                                    <Text style={styles.exhibitIndex}>0{i + 1}</Text>
                                    <Text style={styles.exhibitTitle}>{p.name.toUpperCase()}</Text>
                                </View>
                                <View style={styles.exhibitMediaPlaceholder}>
                                    <LinearGradient 
                                        colors={['#F9F9F9', '#F1F1F1']} 
                                        style={StyleSheet.absoluteFill}
                                    />
                                    <Text style={styles.mediaLabel}>[ VIEW_VISUAL_ASSET ]</Text>
                                </View>
                                <Text style={styles.exhibitDesc}>{p.description.slice(0, 100)}...</Text>
                                <View style={styles.exhibitFooter}>
                                    <Text style={styles.exhibitCat}>{p.category.toUpperCase()}</Text>
                                    <ArrowRight size={20} color="#D4AF37" />
                                </View>
                            </TouchableOpacity>
                        ))}
                    </BoutiqueSection>

                    {/* Footer Acquisition */}
                    <TouchableOpacity style={styles.footerBtn} onPress={() => navigation.goBack()}>
                        <View style={styles.footerInner}>
                            <Text style={styles.footerText}>INITIATE_PREMIUM_COLLABORATION</Text>
                            <ShieldCheck size={20} color="#111" />
                        </View>
                        <View style={styles.bottomGold} />
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
        borderBottomColor: '#F5F5F5',
    },
    backBtn: {
        width: 44,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
    },
    brandTitle: {
        fontSize: 10,
        fontWeight: '900',
        color: '#111',
        letterSpacing: 4,
    },
    headerRight: {
        width: 44,
        alignItems: 'center',
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
        color: '#D4AF37',
        letterSpacing: 6,
        marginBottom: 20,
    },
    name: {
        fontSize: 52,
        fontWeight: '900',
        color: '#111',
        textAlign: 'center',
        lineHeight: 52,
        letterSpacing: -2,
    },
    heroDivider: {
        width: 40,
        height: 1,
        backgroundColor: '#D4AF37',
        marginVertical: 32,
    },
    heroTitle: {
        fontSize: 14,
        fontWeight: '900',
        color: '#111',
        letterSpacing: 4,
        marginBottom: 16,
    },
    heroHeadline: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        lineHeight: 28,
        fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
        paddingHorizontal: 20,
    },
    section: {
        marginBottom: 60,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        marginBottom: 8,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '900',
        color: '#111',
        letterSpacing: -0.5,
    },
    goldLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#D4AF37',
        opacity: 0.3,
    },
    sectionSub: {
        fontSize: 10,
        fontWeight: '900',
        color: '#D4AF37',
        letterSpacing: 2,
        marginBottom: 24,
    },
    summaryText: {
        fontSize: 17,
        lineHeight: 30,
        color: '#333',
        fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
    },
    expertiseRow: {
        marginBottom: 60,
    },
    rowLabel: {
        fontSize: 10,
        fontWeight: '900',
        color: '#999',
        letterSpacing: 4,
        marginBottom: 24,
        marginLeft: 10,
    },
    expertiseScroll: {
        gap: 16,
        paddingBottom: 20,
    },
    skillCard: {
        width: 150,
        padding: 24,
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#F1F1F1',
        alignItems: 'center',
    },
    skillIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#FCFAF5',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    skillText: {
        fontSize: 11,
        fontWeight: '900',
        color: '#111',
        textAlign: 'center',
    },
    projectExhibit: {
        marginBottom: 60,
    },
    exhibitHeader: {
        flexDirection: 'row',
        alignItems: 'baseline',
        gap: 16,
        marginBottom: 20,
    },
    exhibitIndex: {
        fontSize: 12,
        fontWeight: '900',
        color: '#D4AF37',
    },
    exhibitTitle: {
        fontSize: 24,
        fontWeight: '900',
        color: '#111',
        letterSpacing: -1,
    },
    exhibitMediaPlaceholder: {
        height: 450,
        backgroundColor: '#F9F9F9',
        marginBottom: 24,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#F5F5F5',
    },
    mediaLabel: {
        fontSize: 10,
        fontWeight: '900',
        color: '#CCC',
        letterSpacing: 2,
    },
    exhibitDesc: {
        fontSize: 16,
        color: '#555',
        lineHeight: 26,
        fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
        marginBottom: 20,
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
        color: '#999',
        letterSpacing: 2,
    },
    footerBtn: {
        marginTop: 40,
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#111',
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
        color: '#111',
        letterSpacing: 2,
    },
    bottomGold: {
        height: 4,
        backgroundColor: '#D4AF37',
    }
});
