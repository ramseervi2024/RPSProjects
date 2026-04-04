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
import { ChevronLeft, ArrowRight, Aperture, Layers, Smartphone, Code, Mail } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { FadeIn, FadeInLeft, FadeInRight } from 'react-native-reanimated';
import { portfolioprofile } from './portfoliodata';

const { width, height } = Dimensions.get('window');

const DuoSection = ({ title, bg, children }) => (
    <View style={styles.section}>
        <View style={[styles.sectionArt, { backgroundColor: bg }]} />
        <View style={styles.sectionGlass}>
            <LinearGradient 
                colors={['rgba(255,255,255,0.15)', 'rgba(255,255,255,0.05)']} 
                style={StyleSheet.absoluteFill}
            />
            <Text style={styles.sectionTitle}>{title.toUpperCase()}</Text>
            {children}
        </View>
    </View>
);

export default function Portfolio26({ navigation }) {
    const { personal_info, hero, summary, technical_stack, projects } = portfolioprofile;

    return (
        <View style={styles.container}>
            <LinearGradient colors={['#0F172A', '#1E293B']} style={StyleSheet.absoluteFill} />
            
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <ChevronLeft size={24} color="#FFF" />
                    </TouchableOpacity>
                    <Text style={styles.headerLabel}>DUO_TONE / 26</Text>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    {/* Hero Split */}
                    <View style={styles.heroSplit}>
                        <View style={styles.heroLeft}>
                            <Animated.Text entering={FadeInLeft.duration(1000)} style={styles.name}>
                                {personal_info.name.split(' ')[0]}
                                {'\n'}
                                {personal_info.name.split(' ')[1]}
                            </Animated.Text>
                        </View>
                        <View style={styles.heroRight}>
                            <LinearGradient colors={['#3B82F6', '#2563EB']} style={StyleSheet.absoluteFill} />
                            <Animated.Text entering={FadeInRight.delay(400).duration(1000)} style={styles.heroTitle}>
                                {personal_info.title.toUpperCase()}
                            </Animated.Text>
                        </View>
                    </View>

                    {/* Narrative Glass */}
                    <DuoSection title="Mission_Manifesto" bg="#EF4444">
                        <Text style={styles.summaryText}>{summary}</Text>
                    </DuoSection>

                    {/* Expertise Row */}
                    <View style={styles.expertiseWrap}>
                        <Text style={styles.expertiseHeader}>SYSTEM_CAPABILITIES</Text>
                        <View style={styles.skillsGrid}>
                            {technical_stack.mobile.concat(technical_stack.frontend.slice(0, 3)).map((skill, i) => (
                                <View key={skill} style={styles.skillBox}>
                                    <View style={[styles.skillAccent, { backgroundColor: i % 2 === 0 ? '#3B82F6' : '#EF4444' }]} />
                                    <View style={styles.skillGlass}>
                                        <Text style={styles.skillText}>{skill.toUpperCase()}</Text>
                                    </View>
                                </View>
                            ))}
                        </View>
                    </View>

                    {/* Project Gallery Duo */}
                    <View style={styles.projectsWrap}>
                        {projects.slice(0, 4).map((p, i) => (
                            <TouchableOpacity key={p.name} style={styles.projectCard}>
                                <View style={[styles.projectArt, { backgroundColor: i % 2 === 0 ? '#3B82F6' : '#F59E0B' }]} />
                                <View style={styles.projectGlass}>
                                    <LinearGradient 
                                        colors={['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.02)']} 
                                        style={StyleSheet.absoluteFill}
                                    />
                                    <Text style={styles.projectNumber}>0{i + 1}</Text>
                                    <Text style={styles.projectName}>{p.name.toUpperCase()}</Text>
                                    <Text style={styles.projectDesc}>{p.description.slice(0, 80)}...</Text>
                                    <View style={styles.projectFooter}>
                                        <Text style={styles.projectCat}>{p.category.toUpperCase()}</Text>
                                        <ArrowRight size={20} color="#FFF" />
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Footer Uplink */}
                    <TouchableOpacity style={styles.footerBtn} onPress={() => navigation.goBack()}>
                        <LinearGradient colors={['#3B82F6', '#8B5CF6']} style={styles.footerInner}>
                            <Text style={styles.footerText}>ESTABLISH_PERSISTENT_CONNECTION</Text>
                            <Aperture size={24} color="#FFF" />
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
        backgroundColor: 'rgba(255,255,255,0.05)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    headerLabel: {
        fontSize: 10,
        fontWeight: '900',
        color: 'rgba(255,255,255,0.5)',
        letterSpacing: 4,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 60,
        paddingTop: 20,
    },
    heroSplit: {
        height: 320,
        flexDirection: 'row',
        marginBottom: 40,
        borderRadius: 32,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    heroLeft: {
        flex: 1,
        backgroundColor: 'rgba(255,255,255,0.02)',
        justifyContent: 'center',
        padding: 30,
    },
    name: {
        fontSize: 48,
        fontWeight: '900',
        color: '#FFF',
        lineHeight: 44,
        letterSpacing: -2,
    },
    heroRight: {
        flex: 0.8,
        justifyContent: 'center',
        padding: 30,
    },
    heroTitle: {
        fontSize: 14,
        fontWeight: '900',
        color: '#FFF',
        letterSpacing: 4,
        transform: [{ rotate: '90deg' }],
        position: 'absolute',
        right: -20,
    },
    section: {
        marginBottom: 40,
        borderRadius: 32,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
        flexDirection: 'row',
    },
    sectionArt: {
        width: 10,
    },
    sectionGlass: {
        flex: 1,
        padding: 30,
    },
    sectionTitle: {
        fontSize: 11,
        fontWeight: '900',
        color: 'rgba(255,255,255,0.4)',
        letterSpacing: 4,
        marginBottom: 20,
    },
    summaryText: {
        fontSize: 16,
        lineHeight: 28,
        color: 'rgba(255,255,255,0.8)',
    },
    expertiseWrap: {
        marginBottom: 60,
    },
    expertiseHeader: {
        fontSize: 10,
        fontWeight: '900',
        color: 'rgba(255,255,255,0.4)',
        letterSpacing: 4,
        marginBottom: 24,
        marginLeft: 10,
    },
    skillsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 16,
    },
    skillBox: {
        width: (width - 72) / 2,
        height: 100,
        borderRadius: 24,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    skillAccent: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        width: 6,
    },
    skillGlass: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
        backgroundColor: 'rgba(255,255,255,0.02)',
    },
    skillText: {
        fontSize: 12,
        fontWeight: '900',
        color: '#FFF',
        letterSpacing: 1,
    },
    projectsWrap: {
        gap: 24,
    },
    projectCard: {
        height: 240,
        borderRadius: 32,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
        flexDirection: 'row',
    },
    projectArt: {
        width: 100,
        opacity: 0.8,
    },
    projectGlass: {
        flex: 1,
        padding: 30,
    },
    projectNumber: {
        fontSize: 10,
        fontWeight: '900',
        color: 'rgba(255,255,255,0.4)',
        marginBottom: 16,
    },
    projectName: {
        fontSize: 24,
        fontWeight: '900',
        color: '#FFF',
        marginBottom: 12,
    },
    projectDesc: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.6)',
        lineHeight: 22,
        marginBottom: 20,
    },
    projectFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 'auto',
    },
    projectCat: {
        fontSize: 10,
        fontWeight: '900',
        color: 'rgba(255,255,255,0.3)',
        letterSpacing: 2,
    },
    footerBtn: {
        marginTop: 40,
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
