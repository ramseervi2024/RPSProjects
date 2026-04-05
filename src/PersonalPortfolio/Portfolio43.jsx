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
import { ChevronLeft, Grid, Zap, Sparkles, Layout, Smartphone, Code, ArrowRight } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { FadeIn, FadeInDown, SlideInRight } from 'react-native-reanimated';
import { portfolioprofile } from './portfoliodata';

const { width } = Dimensions.get('window');

const BentoTile = ({ children, color = '#FFF', style, title }) => (
    <View style={[styles.bentoTile, { backgroundColor: color }, style]}>
        {title && <Text style={styles.tileTitle}>{title.toUpperCase()}</Text>}
        {children}
    </View>
);

export default function Portfolio43({ navigation }) {
    const { personal_info, hero, summary, technical_stack, projects } = portfolioprofile;

    return (
        <View style={styles.container}>
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.navBtn}>
                        <ChevronLeft size={24} color="#000" />
                    </TouchableOpacity>
                    <View style={styles.headerLabel}>
                        <Grid size={14} color="#000" />
                        <Text style={styles.headerText}>VIBRANT_BENTO_43</Text>
                    </View>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    {/* Bento Hero Grid */}
                    <View style={styles.bentoGrid}>
                        <BentoTile color="#FF6B6B" style={styles.heroMain}>
                            <Animated.Text entering={FadeIn.duration(1000)} style={styles.heroLabel}>DESIGN_ENGINEER</Animated.Text>
                            <Animated.Text entering={FadeInDown.delay(200).duration(1000)} style={styles.heroName}>{personal_info.name.split(' ')[0]}</Animated.Text>
                        </BentoTile>

                        <View style={styles.bentoRow}>
                            <BentoTile color="#4ECDC4" style={styles.heroSmall}>
                                <Zap size={32} color="#FFF" />
                            </BentoTile>
                            <BentoTile color="#FFE66D" style={styles.heroMed}>
                                <Text style={styles.heroDesc}>{personal_info.title.toUpperCase()}</Text>
                            </BentoTile>
                        </View>

                        <BentoTile color="#FFF" style={styles.summaryTile} title="Manifesto">
                            <Text style={styles.summaryText}>{summary}</Text>
                        </BentoTile>

                        {/* Skills Bento */}
                        <View style={styles.skillsSection}>
                            <Text style={styles.sectionLabel}>SYSTEMS_V43</Text>
                            <View style={styles.skillsGrid}>
                                {technical_stack.mobile.slice(0, 3).map((skill, i) => (
                                    <BentoTile key={skill} color={i % 2 === 0 ? '#6C5CE7' : '#A29BFE'} style={styles.skillTile}>
                                        <Text style={styles.skillText}>{skill.toUpperCase()}</Text>
                                    </BentoTile>
                                ))}
                            </View>
                        </View>

                        {/* Project Bento Wall */}
                        <View style={styles.projectsSection}>
                            <Text style={styles.sectionLabel}>ACTIVE_DEPLOYMENTS</Text>
                            {projects.slice(0, 4).map((p, i) => (
                                <TouchableOpacity key={p.name} style={styles.projectCard}>
                                    <View style={[styles.projectAccent, { backgroundColor: i % 2 === 0 ? '#FF6B6B' : '#4ECDC4' }]} />
                                    <View style={styles.projectContent}>
                                        <Text style={styles.projectNum}>0{i+1}</Text>
                                        <Text style={styles.projectName}>{p.name.toUpperCase()}</Text>
                                        <Text style={styles.projectDesc}>{p.description.slice(0, 80)}...</Text>
                                        <View style={styles.projectFooter}>
                                            <Text style={styles.projectCat}>{p.category.toUpperCase()}</Text>
                                            <ArrowRight size={20} color="#000" />
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    {/* Footer Bento */}
                    <TouchableOpacity style={styles.footerBtn} onPress={() => navigation.goBack()}>
                        <View style={styles.footerInner}>
                            <Text style={styles.footerText}>ESTABLISH_PERSISTENT_LINK</Text>
                            <Sparkles size={24} color="#FFF" />
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
        backgroundColor: '#F7F9FC',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingVertical: 16,
    },
    navBtn: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#EEE',
    },
    headerLabel: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingHorizontal: 16,
        paddingVertical: 10,
        backgroundColor: '#FFF',
        borderRadius: 20,
    },
    headerText: {
        fontSize: 10,
        fontWeight: '900',
        color: '#000',
        letterSpacing: 2,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 60,
    },
    bentoGrid: {
        gap: 16,
        marginTop: 20,
    },
    bentoTile: {
        borderRadius: 24,
        padding: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
    },
    tileTitle: {
        fontSize: 10,
        fontWeight: '900',
        color: '#BBB',
        letterSpacing: 2,
        marginBottom: 16,
    },
    heroMain: {
        height: 200,
        justifyContent: 'center',
    },
    heroLabel: {
        fontSize: 11,
        fontWeight: '900',
        color: 'rgba(255,255,255,0.7)',
        letterSpacing: 4,
        marginBottom: 16,
    },
    heroName: {
        fontSize: 48,
        fontWeight: '900',
        color: '#FFF',
        letterSpacing: -2,
    },
    bentoRow: {
        flexDirection: 'row',
        gap: 16,
    },
    heroSmall: {
        width: (width - 56) / 3,
        height: 120,
        justifyContent: 'center',
        alignItems: 'center',
    },
    heroMed: {
        flex: 1,
        height: 120,
        justifyContent: 'center',
    },
    heroDesc: {
        fontSize: 14,
        fontWeight: '900',
        color: '#333',
        letterSpacing: 2,
    },
    summaryTile: {
        borderWidth: 1,
        borderColor: '#EEE',
    },
    summaryText: {
        fontSize: 16,
        lineHeight: 26,
        color: '#444',
    },
    skillsSection: {
        marginTop: 24,
    },
    sectionLabel: {
        fontSize: 10,
        fontWeight: '900',
        color: '#BBB',
        letterSpacing: 4,
        marginBottom: 16,
        marginLeft: 4,
    },
    skillsGrid: {
        flexDirection: 'row',
        gap: 12,
    },
    skillTile: {
        flex: 1,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 12,
    },
    skillText: {
        fontSize: 10,
        fontWeight: '900',
        color: '#FFF',
        textAlign: 'center',
    },
    projectsSection: {
        marginTop: 24,
    },
    projectCard: {
        backgroundColor: '#FFF',
        borderRadius: 24,
        marginBottom: 16,
        flexDirection: 'row',
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#EEE',
    },
    projectAccent: {
        width: 12,
    },
    projectContent: {
        flex: 1,
        padding: 24,
    },
    projectNum: {
        fontSize: 10,
        fontWeight: '900',
        color: '#DDD',
        marginBottom: 12,
    },
    projectName: {
        fontSize: 22,
        fontWeight: '900',
        color: '#000',
        marginBottom: 12,
    },
    projectDesc: {
        fontSize: 14,
        color: '#666',
        lineHeight: 22,
        marginBottom: 20,
    },
    projectFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    projectCat: {
        fontSize: 10,
        fontWeight: '900',
        color: '#AAA',
        letterSpacing: 2,
    },
    footerBtn: {
        marginTop: 20,
        backgroundColor: '#000',
        borderRadius: 24,
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
