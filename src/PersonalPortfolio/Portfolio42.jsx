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
import { ChevronLeft, Flower, Heart, Wind, ArrowRight, Sun, Leaf } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { FadeIn, FadeInDown, SlideInRight } from 'react-native-reanimated';
import { portfolioprofile } from './portfoliodata';

const { width } = Dimensions.get('window');

const CeramicCard = ({ children, style }) => (
    <View style={[styles.ceramicCard, style]}>
        {children}
    </View>
);

export default function Portfolio42({ navigation }) {
    const { personal_info, hero, summary, technical_stack, projects } = portfolioprofile;

    return (
        <View style={styles.container}>
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <ChevronLeft size={24} color="#5D5A56" />
                    </TouchableOpacity>
                    <View style={styles.headerBadge}>
                        <Flower size={16} color="#A78B71" />
                        <Text style={styles.headerLabel}>ORGANIC_CERAMIC / 042</Text>
                    </View>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    {/* Organic Hero */}
                    <View style={styles.heroSection}>
                        <Animated.Text entering={FadeIn.duration(1200)} style={styles.heroPre}>CRAFTED_WITH_INTENTION</Animated.Text>
                        <Animated.Text entering={FadeInDown.delay(200).duration(1200)} style={styles.name}>{personal_info.name}</Animated.Text>
                        <View style={styles.heroDivider} />
                        <Text style={styles.heroTitle}>{personal_info.title.toUpperCase()}</Text>
                        <Text style={styles.heroHeadline}>{personal_info.headline}</Text>
                    </View>

                    {/* Clay Summary */}
                    <View style={styles.section}>
                        <CeramicCard style={styles.summaryCard}>
                            <View style={styles.cardHeader}>
                                <Text style={styles.cardLabel}>THE_NARRATIVE</Text>
                                <Wind size={18} color="#A78B71" />
                            </View>
                            <Text style={styles.summaryText}>{summary}</Text>
                        </CeramicCard>
                    </View>

                    {/* Earthy Expertise */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>ELEMENTAL_CAPABILITIES</Text>
                        <View style={styles.skillsGrid}>
                            {technical_stack.mobile.concat(technical_stack.frontend.slice(0, 3)).map((skill, i) => (
                                <View key={skill} style={styles.skillChip}>
                                    <View style={[styles.skillDot, { backgroundColor: i % 2 === 0 ? '#A78B71' : '#D1C2B4' }]} />
                                    <Text style={styles.skillText}>{skill.toUpperCase()}</Text>
                                </View>
                            ))}
                        </View>
                    </View>

                    {/* Kiln Projects */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>CURATED_WORK</Text>
                        {projects.slice(0, 4).map((p, i) => (
                            <TouchableOpacity key={p.name} style={styles.projectCard}>
                                <View style={styles.projectTop}>
                                    <View style={styles.projectIcon}>
                                        <Leaf size={18} color="#A78B71" />
                                    </View>
                                    <View style={styles.projectNameLine}>
                                        <Text style={styles.projectIndex}>0{i + 1}</Text>
                                        <Text style={styles.projectName}>{p.name.toUpperCase()}</Text>
                                    </View>
                                </View>
                                <Text style={styles.projectDesc}>{p.description.slice(0, 100)}...</Text>
                                <View style={styles.projectFooter}>
                                    <Text style={styles.projectCat}>{p.category.toUpperCase()}</Text>
                                    <View style={styles.btnRound}>
                                        <ArrowRight size={20} color="#FFF" />
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Final Warmth */}
                    <TouchableOpacity style={styles.footerBtn} onPress={() => navigation.goBack()}>
                        <View style={styles.footerInner}>
                            <Text style={styles.footerText}>INITIATE_CONNECTION</Text>
                            <Sun size={24} color="#FFF" />
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
        backgroundColor: '#F7F3F0', // Soft Clay White
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
        shadowOpacity: 0.03,
        shadowRadius: 10,
    },
    headerBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingHorizontal: 16,
        paddingVertical: 10,
        backgroundColor: '#FFF',
        borderRadius: 24,
    },
    headerLabel: {
        fontSize: 10,
        fontWeight: '900',
        color: '#5D5A56',
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
        color: '#A78B71',
        letterSpacing: 4,
        marginBottom: 20,
    },
    name: {
        fontSize: 48,
        fontWeight: '900',
        color: '#3C3A36',
        textAlign: 'center',
        lineHeight: 48,
        letterSpacing: -2,
    },
    heroDivider: {
        width: 40,
        height: 1,
        backgroundColor: '#A78B71',
        marginVertical: 32,
    },
    heroTitle: {
        fontSize: 14,
        fontWeight: '900',
        color: '#5D5A56',
        letterSpacing: 4,
        marginBottom: 16,
    },
    heroHeadline: {
        fontSize: 16,
        color: '#827F7A',
        textAlign: 'center',
        lineHeight: 28,
        paddingHorizontal: 20,
    },
    section: {
        marginBottom: 60,
    },
    sectionTitle: {
        fontSize: 11,
        fontWeight: '900',
        color: '#A78B71',
        letterSpacing: 4,
        marginBottom: 32,
        marginLeft: 10,
    },
    ceramicCard: {
        backgroundColor: '#FFF',
        borderRadius: 32,
        padding: 40,
        shadowColor: '#3C3A36',
        shadowOffset: { width: 0, height: 20 },
        shadowOpacity: 0.04,
        shadowRadius: 40,
        borderWidth: 1,
        borderColor: '#EFEBE9',
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    cardLabel: {
        fontSize: 10,
        fontWeight: '900',
        color: '#D1C2B4',
        letterSpacing: 2,
    },
    summaryText: {
        fontSize: 18,
        lineHeight: 30,
        color: '#5D5A56',
        fontWeight: '400',
    },
    skillsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 16,
    },
    skillChip: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingHorizontal: 20,
        paddingVertical: 14,
        backgroundColor: '#FFF',
        borderRadius: 24,
        borderWidth: 1,
        borderColor: '#EFEBE9',
    },
    skillDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
    },
    skillText: {
        fontSize: 12,
        fontWeight: '900',
        color: '#3C3A36',
    },
    projectCard: {
        backgroundColor: '#FFF',
        borderRadius: 40,
        padding: 40,
        marginBottom: 24,
        borderWidth: 1,
        borderColor: '#EFEBE9',
    },
    projectTop: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
        marginBottom: 24,
    },
    projectIcon: {
        width: 52,
        height: 52,
        borderRadius: 26,
        backgroundColor: '#FAF7F5',
        justifyContent: 'center',
        alignItems: 'center',
    },
    projectNameLine: {
        flex: 1,
        gap: 4,
    },
    projectIndex: {
        fontSize: 10,
        fontWeight: '900',
        color: '#D1C2B4',
    },
    projectName: {
        fontSize: 22,
        fontWeight: '900',
        color: '#3C3A36',
    },
    projectDesc: {
        fontSize: 16,
        color: '#827F7A',
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
        color: '#A78B71',
        letterSpacing: 2,
    },
    btnRound: {
        width: 52,
        height: 52,
        borderRadius: 26,
        backgroundColor: '#3C3A36',
        justifyContent: 'center',
        alignItems: 'center',
    },
    footerBtn: {
        marginTop: 20,
        backgroundColor: '#A78B71',
        borderRadius: 40,
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
        fontSize: 14,
        fontWeight: '900',
        color: '#FFF',
        letterSpacing: 2,
    }
});
