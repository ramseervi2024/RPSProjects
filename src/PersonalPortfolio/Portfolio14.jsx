import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    Dimensions,
    Platform
} from 'react-native';
import { Terminal, Cpu, Database, Activity, ChevronLeft, Plus, Settings, Wifi } from 'lucide-react-native';
import Animated, { FadeIn, useAnimatedStyle, withRepeat, withTiming, withSequence, useSharedValue } from 'react-native-reanimated';
import { portfolioprofile } from './portfoliodata';

const { width } = Dimensions.get('window');
const MONO = Platform.OS === 'ios' ? 'Courier' : 'monospace';

const OSWindow = ({ title, children, style }) => (
    <View style={[styles.window, style]}>
        <View style={styles.windowHeader}>
            <View style={styles.windowDots}>
                <View style={[styles.dot, { backgroundColor: '#FF5F56' }]} />
                <View style={[styles.dot, { backgroundColor: '#FFBD2E' }]} />
                <View style={[styles.dot, { backgroundColor: '#27C93F' }]} />
            </View>
            <Text style={styles.windowTitle}>{title.toUpperCase()}</Text>
            <View style={{ width: 40 }} />
        </View>
        <View style={styles.windowBody}>
            {children}
        </View>
    </View>
);

export default function Portfolio14({ navigation }) {
    const { personal_info, technical_stack, projects, employment } = portfolioprofile;
    const cursorOpacity = useSharedValue(1);

    React.useEffect(() => {
        cursorOpacity.value = withRepeat(
            withSequence(
                withTiming(0, { duration: 500 }),
                withTiming(1, { duration: 500 })
            ),
            -1,
            true
        );
    }, []);

    const cursorStyle = useAnimatedStyle(() => ({
        opacity: cursorOpacity.value,
    }));

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                
                {/* OS Top Bar */}
                <View style={styles.topBar}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.appleIcon}>
                        <ChevronLeft size={18} color="#FFF" />
                    </TouchableOpacity>
                    <Text style={styles.topBarText}>DeveloperOS</Text>
                    <Text style={styles.topBarText}>File</Text>
                    <Text style={styles.topBarText}>Edit</Text>
                    <Text style={styles.topBarText}>View</Text>
                    <View style={{ flex: 1 }} />
                    <View style={styles.topBarIcons}>
                        <Wifi size={14} color="#FFF" />
                        <Text style={styles.topBarTime}>19:51</Text>
                    </View>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
                    
                    {/* System Overview Window */}
                    <OSWindow title="System_Overview">
                        <View style={styles.profileRow}>
                            <View style={styles.avatarMock}><Text style={styles.avatarText}>RS</Text></View>
                            <View>
                                <Text style={styles.sysName}>{personal_info.name}</Text>
                                <Text style={styles.sysStatus}>STATUS: ACTIVE_DEVELOPER</Text>
                            </View>
                        </View>
                        <View style={styles.sysStats}>
                            <View style={styles.sysStatItem}>
                                <Cpu size={16} color="#4ADE80" />
                                <Text style={styles.sysStatLabel}>CORE_EXP</Text>
                                <Text style={styles.sysStatVal}>{personal_info.experience_years}Y</Text>
                            </View>
                            <View style={styles.sysStatItem}>
                                <Database size={16} color="#60A5FA" />
                                <Text style={styles.sysStatLabel}>STK_LEVEL</Text>
                                <Text style={styles.sysStatVal}>SENIOR</Text>
                            </View>
                            <View style={styles.sysStatItem}>
                                <Activity size={16} color="#FACC15" />
                                <Text style={styles.sysStatLabel}>UPTIME</Text>
                                <Text style={styles.sysStatVal}>99.9%</Text>
                            </View>
                        </View>
                    </OSWindow>

                    {/* Terminal Window */}
                    <OSWindow title="Terminal -- node stack.js" style={styles.terminalWindow}>
                        <Text style={styles.termText}>$ system.getSkills()</Text>
                        <Text style={styles.termResponse}>[ "{technical_stack.mobile.join('", "')}" ]</Text>
                        <Text style={[styles.termText, { marginTop: 12 }]}>$ system.getLocation()</Text>
                        <Text style={styles.termResponse}>"{personal_info.location}"</Text>
                        <Text style={[styles.termText, { marginTop: 12 }]}>$ _</Text>
                        <Animated.View style={[styles.cursor, cursorStyle]} />
                    </OSWindow>

                    {/* Repository Explorer */}
                    <View style={styles.explorerSection}>
                        <Text style={styles.explorerTitle}>REPOSITORY_EXPLORER</Text>
                        <View style={styles.folderGrid}>
                            {projects.slice(0, 4).map((project, index) => (
                                <TouchableOpacity key={index} style={styles.folderItem}>
                                    <View style={styles.folderIcon}>
                                        <Text style={styles.folderExt}>JS</Text>
                                    </View>
                                    <Text style={styles.folderName} numberOfLines={1}>{project.name.toLowerCase().replace(/\s/g, '_')}</Text>
                                </TouchableOpacity>
                            ))}
                            <TouchableOpacity style={styles.folderItem}>
                                <View style={[styles.folderIcon, { backgroundColor: '#334155' }]}>
                                    <Plus size={20} color="#94A3B8" />
                                </View>
                                <Text style={styles.folderName}>new_project</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Employment Log */}
                    <OSWindow title="Employment_Logs" style={styles.logWindow}>
                        {employment.map((job, index) => (
                            <View key={index} style={styles.logEntry}>
                                <Text style={styles.logTime}>[ {job.duration.toUpperCase()} ]</Text>
                                <Text style={styles.logBody}><Text style={styles.logHighlight}>{job.role}</Text> @ {job.company}</Text>
                                <Text style={styles.logDesc}>{job.description.slice(0, 100)}...</Text>
                            </View>
                        ))}
                    </OSWindow>

                </ScrollView>

                {/* Dock */}
                <View style={styles.dock}>
                    <View style={styles.dockIcon}><Terminal size={24} color="#FFF" /></View>
                    <View style={styles.dockIcon}><Cpu size={24} color="#FFF" /></View>
                    <View style={styles.dockIcon}><Settings size={24} color="#FFF" /></View>
                    <View style={styles.dockDivider} />
                    <View style={styles.dockIcon}><Activity size={24} color="#FFF" /></View>
                </View>

            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0F172A',
    },
    safeArea: {
        flex: 1,
    },
    topBar: {
        height: 28,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        gap: 16,
    },
    topBarText: {
        color: '#FFF',
        fontSize: 12,
        fontWeight: '600',
    },
    topBarIcons: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    topBarTime: {
        color: '#FFF',
        fontSize: 12,
        fontWeight: '700',
    },
    scrollContainer: {
        padding: 16,
        paddingBottom: 100,
    },
    window: {
        backgroundColor: '#1E293B',
        borderRadius: 10,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#334155',
        marginBottom: 20,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 20,
    },
    windowHeader: {
        height: 32,
        backgroundColor: '#334155',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 12,
    },
    windowDots: {
        flexDirection: 'row',
        gap: 6,
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
    },
    windowTitle: {
        color: '#94A3B8',
        fontSize: 10,
        fontWeight: '800',
        letterSpacing: 1,
    },
    windowBody: {
        padding: 16,
    },
    profileRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        marginBottom: 24,
    },
    avatarMock: {
        width: 50,
        height: 50,
        borderRadius: 8,
        backgroundColor: '#334155',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#475569',
    },
    avatarText: {
        color: '#94A3B8',
        fontWeight: '900',
    },
    sysName: {
        color: '#FFF',
        fontSize: 20,
        fontWeight: '800',
    },
    sysStatus: {
        color: '#4ADE80',
        fontSize: 10,
        fontWeight: '700',
        marginTop: 4,
    },
    sysStats: {
        flexDirection: 'row',
        gap: 12,
    },
    sysStatItem: {
        flex: 1,
        backgroundColor: '#0F172A',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#1E293B',
    },
    sysStatLabel: {
        color: '#475569',
        fontSize: 9,
        fontWeight: '800',
        marginTop: 6,
    },
    sysStatVal: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '900',
        marginTop: 2,
    },
    terminalWindow: {
        backgroundColor: '#020617',
    },
    termText: {
        color: '#4ADE80',
        fontFamily: MONO,
        fontSize: 13,
    },
    termResponse: {
        color: '#94A3B8',
        fontFamily: MONO,
        fontSize: 12,
        marginTop: 4,
    },
    cursor: {
        width: 8,
        height: 16,
        backgroundColor: '#4ADE80',
        marginTop: 4,
    },
    explorerSection: {
        paddingVertical: 12,
    },
    explorerTitle: {
        color: '#475569',
        fontSize: 10,
        fontWeight: '900',
        letterSpacing: 2,
        marginBottom: 16,
    },
    folderGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 16,
    },
    folderItem: {
        width: (width - 64) / 3,
        alignItems: 'center',
        gap: 8,
    },
    folderIcon: {
        width: 50,
        height: 50,
        backgroundColor: '#1E293B',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#334155',
    },
    folderExt: {
        color: '#60A5FA',
        fontSize: 12,
        fontWeight: '900',
    },
    folderName: {
        color: '#94A3B8',
        fontSize: 10,
        fontWeight: '600',
        textAlign: 'center',
    },
    logWindow: {
        marginTop: 20,
    },
    logEntry: {
        marginBottom: 20,
    },
    logTime: {
        color: '#475569',
        fontSize: 10,
        fontFamily: MONO,
        fontWeight: '800',
    },
    logBody: {
        color: '#CBD5E1',
        fontSize: 14,
        fontWeight: '700',
        marginTop: 4,
    },
    logHighlight: {
        color: '#4ADE80',
    },
    logDesc: {
        color: '#64748B',
        fontSize: 12,
        lineHeight: 18,
        marginTop: 4,
    },
    dock: {
        position: 'absolute',
        bottom: 20,
        left: 24,
        right: 24,
        height: 64,
        backgroundColor: 'rgba(30, 41, 59, 0.8)',
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 12,
        gap: 12,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    dockIcon: {
        width: 44,
        height: 44,
        backgroundColor: '#334155',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dockDivider: {
        width: 1,
        height: 32,
        backgroundColor: '#475569',
        marginHorizontal: 8,
    }
});
