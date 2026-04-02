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
import Animated, { FadeInDown, ZoomIn } from 'react-native-reanimated';
import { portfolioprofile } from './portfoliodata';

const { width } = Dimensions.get('window');
const GRID_PADDING = 12;
const CARD_WIDTH = (width - (GRID_PADDING * 3)) / 2;

export default function Portfolio6({ navigation }) {
    const { personal_info, technical_stack, projects, stats } = portfolioprofile;

    const BentoBox = ({ children, style, delay = 0 }) => (
        <Animated.View 
            entering={ZoomIn.delay(delay).duration(600)}
            style={[styles.bentoBox, style]}
        >
            {children}
        </Animated.View>
    );

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
                        <BentoBox style={styles.boxLarge}>
                            <View style={styles.profileHeader}>
                                <View style={styles.avatarPlaceholder}><Text style={styles.avatarInitial}>RS</Text></View>
                                <View>
                                    <Text style={styles.profileName}>{personal_info.name}</Text>
                                    <Text style={styles.profileTitle}>{personal_info.title}</Text>
                                </View>
                            </View>
                            <Text style={styles.profileDesc}>Crafting high-performance mobile ecosystems with React Native & modern UI/UX principles.</Text>
                            <View style={styles.locationTag}>
                                <MapPin size={14} color="#666" />
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
        paddingBottom: 40,
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
        backgroundColor: '#FFF',
        borderRadius: 24,
        padding: 20,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
        justifyContent: 'center',
    },
    boxLarge: {
        width: width - (GRID_PADDING * 2),
        minHeight: 200,
    },
    boxSmall: {
        width: CARD_WIDTH,
        height: CARD_WIDTH,
        alignItems: 'center',
        justifyContent: 'center',
    },
    boxWide: {
        width: width - (GRID_PADDING * 2),
        minHeight: 120,
    },
    profileHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    avatarPlaceholder: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#E2E8F0',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    avatarInitial: {
        fontSize: 14,
        fontWeight: '800',
        color: '#64748B',
    },
    profileName: {
        fontSize: 18,
        fontWeight: '800',
        color: '#000',
    },
    profileTitle: {
        fontSize: 12,
        color: '#64748B',
        fontWeight: '600',
    },
    profileDesc: {
        fontSize: 14,
        color: '#334155',
        lineHeight: 20,
        marginBottom: 16,
    },
    locationTag: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    locationText: {
        fontSize: 12,
        color: '#64748B',
        fontWeight: '600',
    },
    statVal: {
        fontSize: 32,
        fontWeight: '900',
        color: '#0EA5E9',
    },
    statLabel: {
        fontSize: 10,
        fontWeight: '800',
        color: '#64748B',
        textTransform: 'uppercase',
        marginTop: 4,
    },
    boxHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 16,
    },
    boxTitle: {
        fontSize: 12,
        fontWeight: '800',
        color: '#000',
        letterSpacing: 1,
    },
    techList: {
        flexDirection: 'row',
        gap: 8,
    },
    techPill: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        backgroundColor: '#EEF2FF',
        borderRadius: 8,
    },
    techText: {
        fontSize: 12,
        color: '#6366F1',
        fontWeight: '700',
    },
    projectName: {
        fontSize: 22,
        fontWeight: '800',
        marginBottom: 8,
    },
    projectDesc: {
        fontSize: 13,
        lineHeight: 18,
        marginBottom: 20,
    },
    projectLink: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    projectLinkText: {
        color: '#FACC15',
        fontWeight: '800',
        fontSize: 12,
    }
});
