import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    Dimensions
} from 'react-native';
import { LayoutGrid, Cpu, Globe, Smartphone, ChevronLeft, MapPin, ExternalLink, Mail, Github } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { FadeInDown, ZoomIn, useAnimatedStyle, withHover, withSpring, withSequence, withTiming, useSharedValue, interpolate, Extrapolate } from 'react-native-reanimated';
import { portfolioprofile } from './portfoliodata';

const { width } = Dimensions.get('window');
const GRID_PADDING = 12;
const CARD_WIDTH = (width - (GRID_PADDING * 3)) / 2;

export default function Portfolio6({ navigation }) {
    const { personal_info, technical_stack, projects, stats } = portfolioprofile;

    const BentoBox = ({ children, style, delay = 0 }) => {
        const scale = useSharedValue(1);
        
        const animatedStyle = useAnimatedStyle(() => ({
            transform: [{ scale: scale.value }]
        }));

        return (
            <Animated.View 
                entering={ZoomIn.delay(delay).duration(600)}
                style={[styles.bentoBox, style, animatedStyle]}
            >
                <TouchableOpacity 
                    activeOpacity={0.9}
                    onPressIn={() => scale.value = withSpring(0.97)}
                    onPressOut={() => scale.value = withSpring(1)}
                    style={styles.innerBox}
                >
                    {children}
                </TouchableOpacity>
            </Animated.View>
        );
    };

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
                    
                    {/* Header Nav */}
                    <View style={styles.nav}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                            <ChevronLeft size={20} color="#000" />
                        </TouchableOpacity>
                        <Text style={styles.navTitle}>BENTO.PORTFOLIO</Text>
                    </View>

                    {/* Bento Grid Layout */}
                    <View style={styles.grid}>
                                                {/* Profile Large Box */}
                        <BentoBox style={[styles.boxLarge, { backgroundColor: '#FFF' }]}>
                            <View style={styles.profileHeader}>
                                <LinearGradient 
                                    colors={['#3B82F6', '#1D4ED8']} 
                                    style={styles.avatarPlaceholder}
                                >
                                    <Text style={[styles.avatarInitial, { color: '#FFF' }]}>RS</Text>
                                </LinearGradient>
                                <View>
                                    <Text style={styles.profileName}>{personal_info.name}</Text>
                                <View style={styles.statusBadge}>
                                    <View style={styles.statusDot} />
                                    <Text style={styles.statusText}>ACTIVE NOW</Text>
                                </View>
                                </View>
                            </View>
                            <Text style={styles.profileDesc}>Crafting high-performance mobile ecosystems with React Native & modern UI/UX principles.</Text>
                            <View style={styles.locationTag}>
                                <MapPin size={14} color="#64748B" />
                                <Text style={styles.locationText}>{personal_info.location}</Text>
                            </View>
                        </BentoBox>

                        {/* Experience Box (Small) */}
                        <BentoBox style={[styles.boxSmall, { backgroundColor: '#F0F9FF' }]} delay={100}>
                            <Text style={styles.statVal}>{personal_info.experience_years}+</Text>
                            <Text style={styles.statLabel}>Exp Years</Text>
                        </BentoBox>

                        {/* Projects Count (Small) */}
                        <BentoBox style={[styles.boxSmall, { backgroundColor: '#F0FDF4' }]} delay={200}>
                            <Text style={[styles.statVal, { color: '#10B981' }]}>15+</Text>
                            <Text style={styles.statLabel}>Total Projects</Text>
                        </BentoBox>

                        {/* Tech Stack Horizontal Box */}
                        <BentoBox style={styles.boxWide} delay={300}>
                            <View style={styles.boxHeader}>
                                <Cpu size={20} color="#6366F1" />
                                <Text style={styles.boxTitle}>Technical Stack</Text>
                            </View>
                            <View style={styles.techList}>
                                {technical_stack.mobile.slice(0, 3).map((tech, i) => (
                                    <View key={i} style={styles.techPill}><Text style={styles.techText}>{tech}</Text></View>
                                ))}
                            </View>
                        </BentoBox>

                        {/* Featured Project Box */}
                        <BentoBox style={[styles.boxLarge, { backgroundColor: '#0F172A' }]} delay={400}>
                            <View style={styles.boxHeader}>
                                <Smartphone size={20} color="#FACC15" />
                                <Text style={[styles.boxTitle, { color: '#FFF' }]}>Main Project</Text>
                            </View>
                            <Text style={[styles.projectName, { color: '#FFF' }]}>{projects[0].name}</Text>
                            <Text style={[styles.projectDesc, { color: '#94A3B8' }]}>{projects[0].description}</Text>
                            <TouchableOpacity style={styles.projectLink}>
                                <Text style={styles.projectLinkText}>Open App</Text>
                                <ExternalLink size={14} color="#FACC15" />
                            </TouchableOpacity>
                        </BentoBox>

                        {/* Contact Box */}
                        <BentoBox style={[styles.boxSmall, { backgroundColor: '#000' }]} delay={500}>
                            <Mail size={24} color="#FFF" />
                            <Text style={[styles.statLabel, { color: '#999' }]}>Contact</Text>
                        </BentoBox>

                        {/* Github Box */}
                        <BentoBox style={[styles.boxSmall, { backgroundColor: '#FFF', borderWidth: 1, borderColor: '#EEE' }]} delay={600}>
                            <Github size={24} color="#000" />
                            <Text style={styles.statLabel}>Source</Text>
                        </BentoBox>

                    </View>

                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    safeArea: {
        flex: 1,
    },
    scrollContainer: {
        paddingBottom: 60,
    },
    nav: {
        flexDirection: 'row',
        padding: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    navTitle: {
        fontSize: 12,
        fontWeight: '900',
        letterSpacing: 2,
        color: '#000',
    },
    backBtn: {
        padding: 8,
    },
    grid: {
        padding: GRID_PADDING,
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: GRID_PADDING,
    },
    bentoBox: {
        borderRadius: 32,
        shadowColor: '#1E293B',
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.1,
        shadowRadius: 24,
        elevation: 10,
    },
    innerBox: {
        flex: 1,
        width: '100%',
        padding: 24,
        borderRadius: 32,
        overflow: 'hidden',
    },
    boxLarge: {
        width: width - (GRID_PADDING * 2),
        minHeight: 240,
    },
    boxSmall: {
        width: CARD_WIDTH,
        height: CARD_WIDTH,
    },
    boxWide: {
        width: width - (GRID_PADDING * 2),
        minHeight: 140,
    },
    profileHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    avatarPlaceholder: {
        width: 64,
        height: 64,
        borderRadius: 32,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
        shadowColor: '#3B82F6',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    avatarInitial: {
        fontSize: 20,
        fontWeight: '900',
    },
    profileName: {
        fontSize: 24,
        fontWeight: '900',
        color: '#0F172A',
        letterSpacing: -0.5,
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginTop: 6,
        backgroundColor: '#F0FDF4',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        alignSelf: 'flex-start',
    },
    statusDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#10B981',
    },
    statusText: {
        fontSize: 9,
        color: '#10B981',
        fontWeight: '900',
        letterSpacing: 1,
    },
    profileDesc: {
        fontSize: 16,
        color: '#475569',
        lineHeight: 24,
        marginBottom: 24,
        fontWeight: '500',
    },
    locationTag: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        backgroundColor: '#F8FAFC',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 24,
        alignSelf: 'flex-start',
        borderWidth: 1,
        borderColor: '#F1F5F9',
    },
    locationText: {
        fontSize: 11,
        color: '#64748B',
        fontWeight: '800',
    },
    statVal: {
        fontSize: 42,
        fontWeight: '900',
        color: '#3B82F6',
        letterSpacing: -2,
    },
    statLabel: {
        fontSize: 10,
        fontWeight: '900',
        color: '#94A3B8',
        textTransform: 'uppercase',
        marginTop: 4,
        letterSpacing: 1.5,
    },
    boxHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 16,
    },
    boxTitle: {
        fontSize: 12,
        fontWeight: '900',
        color: '#475569',
        letterSpacing: 1.5,
        textTransform: 'uppercase',
    },
    techList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    techPill: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#F1F5F9',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
    },
    techText: {
        fontSize: 12,
        color: '#6366F1',
        fontWeight: '800',
    },
    projectName: {
        fontSize: 28,
        fontWeight: '900',
        marginBottom: 12,
        letterSpacing: -1,
    },
    projectDesc: {
        fontSize: 14,
        lineHeight: 22,
        marginBottom: 28,
        fontWeight: '500',
    },
    projectLink: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
        paddingHorizontal: 24,
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 32,
        alignSelf: 'flex-start',
        gap: 12,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    projectLinkText: {
        color: '#FFF',
        fontWeight: '900',
        fontSize: 12,
        letterSpacing: 0.5,
    }
});
