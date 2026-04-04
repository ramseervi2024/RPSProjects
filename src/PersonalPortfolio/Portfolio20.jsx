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
import { ChevronLeft, Play, Film, User, Briefcase, Camera, ArrowRight, CornerDownRight } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { FadeIn, FadeInDown, SlideInRight } from 'react-native-reanimated';
import { portfolioprofile } from './portfoliodata';

const { width, height } = Dimensions.get('window');

const NoirSection = ({ title, children }) => (
    <View style={styles.section}>
        <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{title.toUpperCase()}</Text>
            <View style={styles.sectionLine} />
        </View>
        <View style={styles.sectionContent}>
            {children}
        </View>
    </View>
);

export default function Portfolio20({ navigation }) {
    const { personal_info, hero, summary, technical_stack, projects, education } = portfolioprofile;

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {/* Hero Cinematic Section */}
                <View style={styles.heroWrap}>
                    <LinearGradient 
                        colors={['rgba(0,0,0,0.8)', 'rgba(0,0,0,1)']} 
                        style={styles.heroOverlay} 
                    />
                    
                    <SafeAreaView style={styles.heroInternal}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                            <ChevronLeft size={32} color="#FFF" />
                        </TouchableOpacity>

                        <View style={styles.heroTextContent}>
                            <Animated.Text entering={FadeInDown.duration(1200)} style={styles.filmTitle}>
                                STORYBOARD / 20 / NOIR
                            </Animated.Text>
                            <Animated.Text entering={FadeInDown.delay(300).duration(1200)} style={styles.name}>
                                {personal_info.name}
                            </Animated.Text>
                            <Animated.View entering={FadeInDown.delay(600).duration(1200)} style={styles.heroSubtitleContainer}>
                                <View style={styles.accentLine} />
                                <Text style={styles.heroSubtitle}>{personal_info.headline}</Text>
                            </Animated.View>
                        </View>

                        <View style={styles.heroFooter}>
                            <Film size={24} color="#666" />
                            <Text style={styles.footerLabel}>SCENE 01 / INTRODUCTION</Text>
                        </View>
                    </SafeAreaView>
                </View>

                {/* Narrative Summary */}
                <NoirSection title="Prologue">
                    <Text style={styles.prologueText}>{summary}</Text>
                </NoirSection>

                {/* Roles / Expertise */}
                <NoirSection title="The Engine">
                    <View style={styles.rolesGrid}>
                        {technical_stack.mobile.map((stack, i) => (
                            <View key={i} style={styles.roleItem}>
                                <CornerDownRight size={16} color="#444" />
                                <Text style={styles.roleText}>{stack}</Text>
                            </View>
                        ))}
                    </View>
                </NoirSection>

                {/* Projects as Scenes */}
                <NoirSection title="The Curation">
                    {projects.slice(0, 4).map((project, i) => (
                        <TouchableOpacity key={i} style={styles.projectScene}>
                            <View style={styles.sceneHeader}>
                                <Text style={styles.sceneNumber}>ACT 0{i + 1}</Text>
                                <Text style={styles.sceneName}>{project.name}</Text>
                            </View>
                            <Text style={styles.sceneDesc}>{project.description.slice(0, 120)}...</Text>
                            <View style={styles.sceneMeta}>
                                <Text style={styles.sceneType}>{project.category.toUpperCase()}</Text>
                                <ArrowRight size={20} color="#FFF" />
                            </View>
                        </TouchableOpacity>
                    ))}
                </NoirSection>

                {/* Final Connection */}
                <TouchableOpacity style={styles.finalCta} onPress={() => navigation.goBack()}>
                    <LinearGradient 
                        colors={['#111', '#000']} 
                        style={StyleSheet.absoluteFill}
                    />
                    <Text style={styles.finalCtaText}>THE END / CONNECT</Text>
                    <ArrowRight size={28} color="#FFF" />
                </TouchableOpacity>

                <View style={styles.copyright}>
                    <Text style={styles.copyrightText}>© {new Date().getFullYear()} NOIR PRODUCTIONS</Text>
                </View>
            </ScrollView>
        </View>
    );
}

import { StatusBar } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    scrollContent: {
        paddingBottom: 40,
    },
    heroWrap: {
        height: height * 0.85,
        backgroundColor: '#111',
        justifyContent: 'flex-end',
    },
    heroOverlay: {
        ...StyleSheet.absoluteFillObject,
    },
    heroInternal: {
        flex: 1,
        padding: 30,
        justifyContent: 'space-between',
    },
    backBtn: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        backgroundColor: 'rgba(255,255,255,0.1)',
    },
    heroTextContent: {
        marginBottom: 40,
    },
    filmTitle: {
        fontSize: 12,
        fontWeight: '900',
        color: '#666',
        letterSpacing: 6,
        marginBottom: 20,
    },
    name: {
        fontSize: 64,
        fontWeight: '900',
        color: '#FFF',
        lineHeight: 62,
        letterSpacing: -2,
        marginBottom: 32,
    },
    heroSubtitleContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 20,
    },
    accentLine: {
        width: 2,
        height: 48,
        backgroundColor: '#FFF',
    },
    heroSubtitle: {
        fontSize: 18,
        color: '#AAA',
        lineHeight: 24,
        flex: 1,
    },
    heroFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    footerLabel: {
        fontSize: 10,
        fontWeight: '900',
        color: '#444',
        letterSpacing: 4,
    },
    section: {
        padding: 30,
        paddingTop: 60,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
        marginBottom: 40,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: '900',
        color: '#FFF',
        letterSpacing: 4,
    },
    sectionLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#333',
    },
    sectionContent: {
        paddingLeft: 0,
    },
    prologueText: {
        fontSize: 22,
        color: '#888',
        lineHeight: 34,
        fontWeight: '300',
    },
    rolesGrid: {
        gap: 24,
    },
    roleItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    roleText: {
        fontSize: 24,
        color: '#FFF',
        fontWeight: '900',
    },
    projectScene: {
        backgroundColor: '#0A0A0A',
        padding: 30,
        borderRadius: 0,
        borderWidth: 1,
        borderColor: '#111',
        marginBottom: 32,
    },
    sceneHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        marginBottom: 16,
    },
    sceneNumber: {
        fontSize: 10,
        color: '#6366F1',
        fontWeight: '900',
        letterSpacing: 2,
    },
    sceneName: {
        fontSize: 28,
        color: '#FFF',
        fontWeight: '900',
    },
    sceneDesc: {
        fontSize: 16,
        color: '#666',
        lineHeight: 24,
        marginBottom: 24,
    },
    sceneMeta: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    sceneType: {
        fontSize: 11,
        color: '#999',
        fontWeight: '900',
        letterSpacing: 2,
    },
    finalCta: {
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 30,
        marginVertical: 40,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#111',
    },
    finalCtaText: {
        fontSize: 28,
        color: '#FFF',
        fontWeight: '900',
        letterSpacing: -1,
    },
    copyright: {
        alignItems: 'center',
        paddingVertical: 40,
    },
    copyrightText: {
        fontSize: 12,
        color: '#333',
        fontWeight: '900',
        letterSpacing: 4,
    }
});
