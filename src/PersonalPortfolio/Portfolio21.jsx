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
import { ChevronLeft, Cpu, Globe, Rocket, Zap, Bell, Activity, Terminal, ArrowRight } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { FadeIn, FadeInDown, FadeInRight } from 'react-native-reanimated';
import { portfolioprofile } from './portfoliodata';

const { width } = Dimensions.get('window');

const CyberPanel = ({ children, title, subtitle, color = '#06B6D4' }) => (
    <View style={[styles.panel, { borderColor: color }]}>
        <View style={[styles.panelHeader, { backgroundColor: color }]}>
            <Text style={styles.panelTitle}>{title.toUpperCase()}</Text>
            {subtitle && <Text style={styles.panelSubtitle}>{subtitle.toUpperCase()}</Text>}
        </View>
        <View style={styles.panelBody}>
            {children}
        </View>
        <View style={[styles.panelCorner, { borderBottomColor: color, borderRightColor: color }]} />
    </View>
);

export default function Portfolio21({ navigation }) {
    const { personal_info, hero, summary, technical_stack, projects, stats } = portfolioprofile;

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.topNav}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <ChevronLeft size={24} color="#06B6D4" />
                        <Text style={styles.backText}>SYSTEM / EXIT</Text>
                    </TouchableOpacity>
                    <View style={styles.statusIndicator}>
                        <View style={styles.pulseDot} />
                        <Text style={styles.statusText}>LIVE_FEED</Text>
                    </View>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    {/* Header Bento */}
                    <View style={styles.bentoGrid}>
                        <View style={[styles.bentoItem, { flex: 2 }]}>
                            <CyberPanel title="User_Protocol_01" subtitle="Digital Identity">
                                <Text style={styles.name}>{personal_info.name}</Text>
                                <Text style={styles.title}>{personal_info.title}</Text>
                                <View style={styles.accentBar} />
                            </CyberPanel>
                        </View>
                        
                        <View style={[styles.bentoItem, { width: '100%' }]}>
                            <CyberPanel title="Operational_Overview" color="#EC4899">
                                <Text style={styles.summaryText}>{summary.slice(0, 180)}...</Text>
                            </CyberPanel>
                        </View>

                        {/* Stats Row */}
                        <View style={styles.row}>
                            {stats.slice(0, 2).map((stat, i) => (
                                <View key={i} style={styles.bentoItemHalf}>
                                    <CyberPanel title={stat.label} color={i % 2 === 0 ? '#10B981' : '#F59E0B'}>
                                        <Text style={styles.statValue}>{stat.value}</Text>
                                    </CyberPanel>
                                </View>
                            ))}
                        </View>

                        {/* Expertise Panel */}
                        <View style={[styles.bentoItem, { width: '100%' }]}>
                            <CyberPanel title="Tech_Stack_Array" color="#8B5CF6">
                                <View style={styles.skillsScroll}>
                                    {technical_stack.mobile.concat(technical_stack.frontend).map((skill, i) => (
                                        <View key={i} style={styles.skillEntry}>
                                            <Terminal size={14} color="#8B5CF6" />
                                            <Text style={styles.skillText}>{skill.toUpperCase()}</Text>
                                        </View>
                                    ))}
                                </View>
                            </CyberPanel>
                        </View>

                        {/* Projects Stream */}
                        <View style={[styles.bentoItem, { width: '100%' }]}>
                            <CyberPanel title="Active_Deployments" color="#06B6D4">
                                {projects.slice(0, 4).map((p, i) => (
                                    <TouchableOpacity key={i} style={styles.projectStrip}>
                                        <View style={styles.projectInfo}>
                                            <Text style={styles.projectName}>{p.name.toUpperCase()}</Text>
                                            <Text style={styles.projectCategory}>{p.category}</Text>
                                        </View>
                                        <ArrowRight size={20} color="#06B6D4" />
                                    </TouchableOpacity>
                                ))}
                            </CyberPanel>
                        </View>

                    </View>

                    {/* Footer System */}
                    <TouchableOpacity style={styles.systemFooter} onPress={() => navigation.goBack()}>
                        <LinearGradient 
                            colors={['rgba(6, 182, 212, 0.1)', 'rgba(6, 182, 212, 0.05)']} 
                            style={styles.footerInner}
                        >
                            <Text style={styles.footerText}>SYNC_SYSTEM_NODES</Text>
                            <Zap size={20} color="#06B6D4" />
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
        backgroundColor: '#050505',
    },
    safeArea: {
        flex: 1,
    },
    topNav: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#1A1A1A',
    },
    backBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    backText: {
        fontSize: 10,
        fontWeight: '900',
        color: '#06B6D4',
        letterSpacing: 2,
    },
    statusIndicator: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    pulseDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#10B981',
    },
    statusText: {
        fontSize: 10,
        fontWeight: '900',
        color: '#10B981',
        letterSpacing: 2,
    },
    scrollContent: {
        paddingHorizontal: 16,
        paddingTop: 20,
        paddingBottom: 60,
    },
    bentoGrid: {
        gap: 16,
    },
    panel: {
        borderWidth: 1,
        backgroundColor: '#0A0A0A',
        position: 'relative',
        paddingTop: 30, // for header
    },
    panelHeader: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 12,
    },
    panelTitle: {
        fontSize: 10,
        fontWeight: '900',
        color: '#000',
        letterSpacing: 1,
    },
    panelSubtitle: {
        fontSize: 8,
        fontWeight: '600',
        color: 'rgba(0,0,0,0.5)',
    },
    panelBody: {
        padding: 20,
    },
    panelCorner: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 12,
        height: 12,
        borderBottomWidth: 2,
        borderRightWidth: 2,
    },
    name: {
        fontSize: 32,
        fontWeight: '900',
        color: '#FFF',
        lineHeight: 38,
        marginBottom: 8,
    },
    title: {
        fontSize: 14,
        color: '#06B6D4',
        fontWeight: '900',
        letterSpacing: 2,
        marginBottom: 20,
    },
    accentBar: {
        width: 40,
        height: 4,
        backgroundColor: '#06B6D4',
    },
    summaryText: {
        fontSize: 15,
        color: '#AAA',
        lineHeight: 24,
    },
    row: {
        flexDirection: 'row',
        gap: 16,
    },
    bentoItemHalf: {
        flex: 1,
    },
    statValue: {
        fontSize: 24,
        fontWeight: '900',
        color: '#FFF',
    },
    skillsScroll: {
        gap: 12,
    },
    skillEntry: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    skillText: {
        fontSize: 12,
        color: '#EEE',
        fontWeight: '900',
        letterSpacing: 1,
    },
    projectStrip: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#1A1A1A',
    },
    projectName: {
        fontSize: 16,
        fontWeight: '900',
        color: '#FFF',
        marginBottom: 4,
    },
    projectCategory: {
        fontSize: 11,
        color: '#666',
        fontWeight: '900',
    },
    systemFooter: {
        marginTop: 40,
        borderWidth: 1,
        borderColor: '#06B6D4',
        borderStyle: 'dashed',
    },
    footerInner: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 24,
        gap: 16,
    },
    footerText: {
        fontSize: 14,
        fontWeight: '900',
        color: '#06B6D4',
        letterSpacing: 4,
    }
});
