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
import { ChevronLeft, ArrowRight, Github, Linkedin, Mail, Layout, Terminal, Code, Settings } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { FadeIn, FadeInLeft, SlideInRight } from 'react-native-reanimated';
import { portfolioprofile } from './portfoliodata';

const { width, height } = Dimensions.get('window');

export default function Portfolio32({ navigation }) {
    const { personal_info, hero, summary, technical_stack, projects } = portfolioprofile;

    return (
        <View style={styles.container}>
            <View style={styles.sidebar}>
                <SafeAreaView style={{ flex: 1 }}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <View style={styles.backCircle}>
                            <ChevronLeft size={20} color="#FFF" />
                        </View>
                    </TouchableOpacity>

                    <View style={styles.sidebarContent}>
                        <Animated.Text entering={FadeInLeft.duration(1000)} style={styles.sidebarLabel}>COLLECTION_32</Animated.Text>
                        <Animated.Text entering={FadeInLeft.delay(200).duration(1000)} style={styles.sidebarName}>{personal_info.name.split(' ')[0]}</Animated.Text>
                        <View style={styles.sidebarLine} />
                        <Text style={styles.sidebarTitle}>{personal_info.title.toUpperCase()}</Text>
                        <Text style={styles.sidebarSummary}>{summary.slice(0, 100)}...</Text>
                        
                        <View style={styles.sidebarFooter}>
                            <TouchableOpacity style={styles.socialBtn}><Github size={18} color="#FFF" opacity={0.6} /></TouchableOpacity>
                            <TouchableOpacity style={styles.socialBtn}><Linkedin size={18} color="#FFF" opacity={0.6} /></TouchableOpacity>
                            <TouchableOpacity style={styles.socialBtn}><Mail size={18} color="#FFF" opacity={0.6} /></TouchableOpacity>
                        </View>
                    </View>
                </SafeAreaView>
            </View>

            <View style={styles.content}>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    <SafeAreaView>
                        {/* Summary Block */}
                        <View style={styles.contentHero}>
                            <Text style={styles.sectionLabel}>MISSION_MANIFESTO</Text>
                            <Text style={styles.briefText}>{summary}</Text>
                        </View>

                        {/* Expertise Wall */}
                        <View style={styles.sectionHeader}>
                            <Settings size={14} color="#000" />
                            <Text style={styles.sectionTitle}>CAPABILITIES_MATRIX</Text>
                        </View>
                        <View style={styles.skillsWall}>
                            {technical_stack.mobile.concat(technical_stack.frontend.slice(0, 3)).map((skill, i) => (
                                <View key={skill} style={styles.skillTile}>
                                    <View style={styles.tileIndex}><Text style={styles.indexText}>0{i+1}</Text></View>
                                    <Text style={styles.tileText}>{skill.toUpperCase()}</Text>
                                </View>
                            ))}
                        </View>

                        {/* Project Wall */}
                        <View style={styles.sectionHeader}>
                            <Layout size={14} color="#000" />
                            <Text style={styles.sectionTitle}>DEPLOYED_ARTIFACTS</Text>
                        </View>
                        {projects.slice(0, 5).map((p, i) => (
                            <TouchableOpacity key={p.name} style={styles.projectWallCard}>
                                <View style={styles.wallCardHeader}>
                                    <Text style={styles.wallIndex}>P_{i + 1}</Text>
                                    <Text style={styles.wallTitle}>{p.name.toUpperCase()}</Text>
                                </View>
                                <Text style={styles.wallDesc}>{p.description.slice(0, 110)}...</Text>
                                <View style={styles.wallFooter}>
                                    <Text style={styles.wallCat}>{p.category.toUpperCase()}</Text>
                                    <ArrowRight size={20} color="#000" />
                                </View>
                            </TouchableOpacity>
                        ))}

                        {/* Final Connect */}
                        <TouchableOpacity style={styles.connectWallBtn} onPress={() => navigation.goBack()}>
                            <Text style={styles.connectWallText}>INITIATE_FULL_UPLINK</Text>
                            <View style={styles.wallBtnDot} />
                        </TouchableOpacity>

                        <View style={styles.wallCopyright}>
                            <Text style={styles.copyrightText}>© 2026 ARCHIVE_PERSISTENT_MODULAR_32</Text>
                        </View>
                    </SafeAreaView>
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        flexDirection: 'row',
    },
    sidebar: {
        width: 120,
        backgroundColor: '#000',
        paddingVertical: 20,
        alignItems: 'center',
    },
    backBtn: {
        marginBottom: 40,
        alignSelf: 'center',
    },
    backCircle: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(255,255,255,0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
    },
    sidebarContent: {
        flex: 1,
        paddingHorizontal: 12,
    },
    sidebarLabel: {
        fontSize: 8,
        fontWeight: '900',
        color: 'rgba(255,255,255,0.3)',
        letterSpacing: 2,
        marginBottom: 20,
        transform: [{ rotate: '-90deg' }],
        position: 'absolute',
        top: 20,
        left: -20,
        width: 100,
    },
    sidebarName: {
        fontSize: 28,
        fontWeight: '900',
        color: '#FFF',
        marginBottom: 20,
        marginTop: 60,
    },
    sidebarLine: {
        width: 20,
        height: 4,
        backgroundColor: '#FFF',
        marginBottom: 20,
    },
    sidebarTitle: {
        fontSize: 9,
        fontWeight: '900',
        color: 'rgba(255,255,255,0.5)',
        letterSpacing: 2,
        marginBottom: 16,
    },
    sidebarSummary: {
        fontSize: 10,
        color: 'rgba(255,255,255,0.4)',
        lineHeight: 16,
    },
    sidebarFooter: {
        marginTop: 'auto',
        gap: 24,
        alignItems: 'center',
        paddingBottom: 20,
    },
    socialBtn: {
        padding: 4,
    },
    content: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 24,
        paddingBottom: 60,
        paddingTop: 40,
    },
    contentHero: {
        marginBottom: 60,
    },
    sectionLabel: {
        fontSize: 10,
        fontWeight: '900',
        color: '#CCC',
        letterSpacing: 4,
        marginBottom: 24,
    },
    briefText: {
        fontSize: 22,
        fontWeight: '400',
        color: '#000',
        lineHeight: 34,
        letterSpacing: -0.5,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        marginBottom: 32,
    },
    sectionTitle: {
        fontSize: 11,
        fontWeight: '900',
        color: '#000',
        letterSpacing: 2,
    },
    skillsWall: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
        marginBottom: 60,
    },
    skillTile: {
        width: '100%',
        paddingVertical: 24,
        paddingHorizontal: 24,
        backgroundColor: '#F9FAFB',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 24,
        borderRadius: 16,
    },
    tileIndex: {
        width: 32,
        height: 32,
        backgroundColor: '#000',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    indexText: {
        fontSize: 10,
        fontWeight: '900',
        color: '#FFF',
    },
    tileText: {
        fontSize: 16,
        fontWeight: '900',
        color: '#000',
    },
    projectWallCard: {
        paddingVertical: 40,
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
    },
    wallCardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
        marginBottom: 16,
    },
    wallIndex: {
        fontSize: 10,
        fontWeight: '900',
        color: '#999',
    },
    wallTitle: {
        fontSize: 28,
        fontWeight: '900',
        color: '#000',
        letterSpacing: -1,
        flex: 1,
    },
    wallDesc: {
        fontSize: 16,
        color: '#666',
        lineHeight: 26,
        marginBottom: 24,
    },
    wallFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    wallCat: {
        fontSize: 10,
        fontWeight: '900',
        color: '#BBB',
        letterSpacing: 2,
    },
    connectWallBtn: {
        marginTop: 60,
        backgroundColor: '#000',
        paddingVertical: 30,
        paddingHorizontal: 40,
        borderRadius: 16,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 24,
    },
    connectWallText: {
        fontSize: 16,
        fontWeight: '900',
        color: '#FFF',
        letterSpacing: 2,
    },
    wallBtnDot: {
        width: 10,
        height: 10,
        backgroundColor: '#27C93F',
        borderRadius: 5,
    },
    wallCopyright: {
        alignItems: 'center',
        paddingVertical: 60,
    },
    copyrightText: {
        fontSize: 8,
        fontWeight: '900',
        color: '#DDD',
        letterSpacing: 4,
    }
});
