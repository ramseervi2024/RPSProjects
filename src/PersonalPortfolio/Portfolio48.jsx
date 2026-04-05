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
import { ChevronLeft, Gamepad2, Database, Zap, Cpu, ArrowRight, Heart, Star, Trophy } from 'lucide-react-native';
import Animated, { FadeIn, FadeInDown, SlideInRight } from 'react-native-reanimated';
import { portfolioprofile } from './portfoliodata';

const { width } = Dimensions.get('window');

const PixelFrame = ({ children, color = '#3D3D3D', style }) => (
    <View style={[styles.pixelFrame, { borderColor: color }, style]}>
        <View style={styles.pixelInner}>
            {children}
        </View>
    </View>
);

export default function Portfolio48({ navigation }) {
    const { personal_info, hero, summary, technical_stack, projects } = portfolioprofile;

    return (
        <View style={styles.container}>
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.navBtn}>
                        <ChevronLeft size={24} color="#FFF" />
                    </TouchableOpacity>
                    <View style={styles.lifeBar}>
                        <Heart size={16} color="#FF4D4D" fill="#FF4D4D" />
                        <View style={styles.barWrap}><View style={styles.barFill} /></View>
                        <Text style={styles.lifeText}>HP_100</Text>
                    </View>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    {/* Pixel Hero Title */}
                    <View style={styles.heroSection}>
                        <PixelFrame color="#5F5F5F" style={styles.heroFrame}>
                            <Animated.Text entering={FadeIn.duration(1000)} style={styles.heroPre}>STAGE_48 // WORLD_1</Animated.Text>
                            <Animated.Text entering={FadeInDown.delay(200).duration(1000)} style={styles.name}>{personal_info.name.toUpperCase()}</Animated.Text>
                            <View style={styles.pixelDivider} />
                            <Text style={styles.headline}>{personal_info.headline.toUpperCase()}</Text>
                        </PixelFrame>
                    </View>

                    {/* Quest Text (Summary) */}
                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <Star size={16} color="#FFD700" fill="#FFD700" />
                            <Text style={styles.sectionTitle}>QUEST_OBJECTIVE</Text>
                        </View>
                        <PixelFrame color="#4A90E2">
                            <Text style={styles.summaryText}>{summary}</Text>
                        </PixelFrame>
                    </View>

                    {/* Skill Tree (Expertise) */}
                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <Gamepad2 size={16} color="#4A90E2" />
                            <Text style={styles.sectionTitle}>SKILL_TREE_V48</Text>
                        </View>
                        <View style={styles.skillsGrid}>
                            {technical_stack.mobile.concat(technical_stack.frontend.slice(0, 3)).map((skill, i) => (
                                <View key={skill} style={styles.skillBlock}>
                                    <View style={[styles.skillIcon, { backgroundColor: i % 2 === 0 ? '#4A90E2' : '#50E3C2' }]} />
                                    <Text style={styles.skillLabel}>{skill.toUpperCase()}</Text>
                                </View>
                            ))}
                        </View>
                    </View>

                    {/* Loot Chests (Projects) */}
                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <Trophy size={16} color="#FFD700" />
                            <Text style={styles.sectionTitle}>UNLOCKED_ACHIEVEMENTS</Text>
                        </View>
                        {projects.slice(0, 4).map((p, i) => (
                            <TouchableOpacity key={p.name} style={styles.projectPixel}>
                                <View style={styles.projectHeader}>
                                    <View style={styles.projectIndexBox}><Text style={styles.indexText}>{i+1}</Text></View>
                                    <Text style={styles.projectName}>{p.name.toUpperCase()}</Text>
                                </View>
                                <Text style={styles.projectDesc}>{p.description.slice(0, 80)}...</Text>
                                <View style={styles.projectFooter}>
                                    <Text style={styles.projectCat}>{p.category.toUpperCase()}</Text>
                                    <ArrowRight size={20} color="#50E3C2" />
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Final Boss Fight (Contact) */}
                    <TouchableOpacity style={styles.footerBtn} onPress={() => navigation.goBack()}>
                        <Text style={styles.footerText}>PRESS_START_TO_CONNECT</Text>
                        <Zap size={24} color="#FFD700" fill="#FFD700" />
                    </TouchableOpacity>

                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1A1A1A',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingVertical: 16,
        borderBottomWidth: 4,
        borderBottomColor: '#333',
    },
    navBtn: {
        width: 44,
        height: 44,
        backgroundColor: '#333',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#444',
    },
    lifeBar: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        backgroundColor: '#000',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderWidth: 2,
        borderColor: '#333',
    },
    barWrap: {
        width: 60,
        height: 8,
        backgroundColor: '#333',
    },
    barFill: {
        width: '100%',
        height: '100%',
        backgroundColor: '#FF4D4D',
    },
    lifeText: {
        fontSize: 8,
        fontFamily: 'monospace',
        color: '#FFF',
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 60,
    },
    heroSection: {
        marginTop: 20,
        marginBottom: 40,
    },
    heroFrame: {
        height: 280,
        justifyContent: 'center',
    },
    pixelFrame: {
        padding: 4,
        borderWidth: 4,
        backgroundColor: '#333',
    },
    pixelInner: {
        flex: 1,
        backgroundColor: '#2A2A2A',
        padding: 24,
        justifyContent: 'center',
    },
    heroPre: {
        fontSize: 10,
        fontFamily: 'monospace',
        color: '#4A90E2',
        marginBottom: 16,
    },
    name: {
        fontSize: 36,
        fontWeight: '900',
        color: '#FFF',
        lineHeight: 36,
        textAlign: 'center',
        letterSpacing: 2,
        marginBottom: 20,
    },
    pixelDivider: {
        height: 4,
        backgroundColor: '#444',
        marginBottom: 20,
        width: 40,
        alignSelf: 'center',
    },
    headline: {
        fontSize: 12,
        fontFamily: 'monospace',
        color: '#AAA',
        textAlign: 'center',
        lineHeight: 18,
    },
    section: {
        marginBottom: 40,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 10,
        fontFamily: 'monospace',
        color: '#FFF',
        letterSpacing: 2,
    },
    summaryText: {
        fontSize: 14,
        fontFamily: 'monospace',
        color: '#CCC',
        lineHeight: 22,
    },
    skillsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    skillBlock: {
        width: (width - 72) / 3,
        padding: 16,
        backgroundColor: '#2A2A2A',
        borderWidth: 2,
        borderColor: '#333',
        alignItems: 'center',
        gap: 12,
    },
    skillIcon: {
        width: 16,
        height: 16,
        borderRadius: 2,
    },
    skillLabel: {
        fontSize: 8,
        fontFamily: 'monospace',
        color: '#FFF',
        textAlign: 'center',
    },
    projectPixel: {
        backgroundColor: '#2A2A2A',
        padding: 24,
        borderWidth: 4,
        borderColor: '#333',
        marginBottom: 16,
    },
    projectHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        marginBottom: 16,
    },
    projectIndexBox: {
        width: 24,
        height: 24,
        backgroundColor: '#4A90E2',
        justifyContent: 'center',
        alignItems: 'center',
    },
    indexText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#FFF',
    },
    projectName: {
        fontSize: 18,
        fontWeight: '900',
        color: '#FFF',
        letterSpacing: 1,
    },
    projectDesc: {
        fontSize: 12,
        fontFamily: 'monospace',
        color: '#888',
        lineHeight: 18,
        marginBottom: 20,
    },
    projectFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    projectCat: {
        fontSize: 8,
        fontFamily: 'monospace',
        color: '#555',
    },
    footerBtn: {
        marginTop: 20,
        backgroundColor: '#50E3C2',
        paddingVertical: 32,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
        borderWidth: 4,
        borderColor: '#1A1A1A',
        shadowColor: '#50E3C2',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
    },
    footerText: {
        fontSize: 12,
        fontWeight: '900',
        color: '#1A1A1A',
        letterSpacing: 1,
    }
});
