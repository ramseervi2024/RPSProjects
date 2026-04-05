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
import { ChevronLeft, ArrowRight, Star, Heart, Zap, Play, Target } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { FadeIn, FadeInDown, useAnimatedStyle, withRepeat, withTiming, withSequence, Easing } from 'react-native-reanimated';
import { portfolioprofile } from './portfoliodata';

const { width, height } = Dimensions.get('window');

const KineticBackground = () => {
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            { translateX: withRepeat(withSequence(withTiming(-100, { duration: 10000, easing: Easing.linear }), withTiming(0, { duration: 0 })), -1, false) },
        ],
    }));

    return (
        <View style={styles.kineticContainer}>
            <Animated.View style={[styles.kineticTextContainer, animatedStyle]}>
                <Text style={styles.kineticText}>INTERFACE DESIGN EXPERIENCE CODE MOTION INTERFACE DESIGN EXPERIENCE CODE MOTION</Text>
            </Animated.View>
        </View>
    );
};

export default function Portfolio49({ navigation }) {
    const { personal_info, hero, summary, technical_stack, projects } = portfolioprofile;

    return (
        <View style={styles.container}>
            <KineticBackground />
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <ChevronLeft size={24} color="#000" />
                    </TouchableOpacity>
                    <View style={styles.headerIconWrap}>
                        <Star size={20} color="#FFD700" fill="#FFD700" />
                        <Text style={styles.headerLabel}>V49_KINETIC</Text>
                    </View>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    {/* Hero Section */}
                    <View style={styles.heroSection}>
                        <Animated.Text entering={FadeInDown.duration(800)} style={styles.heroPre}>MANIFESTO_V1</Animated.Text>
                        <Animated.Text entering={FadeInDown.delay(200).duration(800)} style={styles.name}>{personal_info.name.toUpperCase()}</Animated.Text>
                        <Animated.View entering={FadeInDown.delay(400).duration(800)} style={styles.heroTitleWrap}>
                            <Text style={styles.heroTitle}>{personal_info.title.toUpperCase()}</Text>
                        </Animated.View>
                        <Animated.Text entering={FadeInDown.delay(600).duration(800)} style={styles.heroHeadline}>{personal_info.headline.toUpperCase()}</Animated.Text>
                    </View>

                    {/* Summary Section */}
                    <View style={styles.section}>
                        <View style={styles.sectionTitleWrap}>
                            <Text style={styles.sectionTitle}>THE_VISION</Text>
                            <View style={styles.sectionTitleLine} />
                        </View>
                        <Text style={styles.summaryText}>{summary}</Text>
                    </View>

                    {/* Technical Stack Section */}
                    <View style={styles.section}>
                        <View style={styles.sectionTitleWrap}>
                            <Text style={styles.sectionTitle}>AUGMENTATIONS</Text>
                            <View style={styles.sectionTitleLine} />
                        </View>
                        <View style={styles.skillsGrid}>
                            {technical_stack.mobile.concat(technical_stack.frontend.slice(0, 3)).map((skill, i) => (
                                <View key={skill} style={styles.skillBox}>
                                    <View style={styles.skillDot} />
                                    <Text style={styles.skillText}>{skill.toUpperCase()}</Text>
                                </View>
                            ))}
                        </View>
                    </View>

                    {/* Projects Section */}
                    <View style={styles.section}>
                        <View style={styles.sectionTitleWrap}>
                            <Text style={styles.sectionTitle}>ARTIFACTS</Text>
                            <View style={styles.sectionTitleLine} />
                        </View>
                        {projects.slice(0, 4).map((p, i) => (
                            <TouchableOpacity key={p.name} style={styles.projectCard}>
                                <View style={styles.projectHeader}>
                                    <View style={styles.projectIndexBox}>
                                        <Text style={styles.projectIndex}>0{i + 1}</Text>
                                    </View>
                                    <Text style={styles.projectName}>{p.name.toUpperCase()}</Text>
                                </View>
                                <Text style={styles.projectDesc}>{p.description.slice(0, 100)}...</Text>
                                <View style={styles.projectFooter}>
                                    <Text style={styles.projectCategory}>{p.category.toUpperCase()}</Text>
                                    <View style={styles.projectBtn}>
                                        <ArrowRight size={20} color="#FFF" />
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Footer Section */}
                    <TouchableOpacity style={styles.footerBtn} onPress={() => navigation.goBack()}>
                        <View style={styles.footerInner}>
                            <Text style={styles.footerText}>INITIATE_UPLINK</Text>
                            <Zap size={24} color="#FFD700" fill="#FFD700" />
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
        backgroundColor: '#FFF',
    },
    kineticContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.05,
    },
    kineticTextContainer: {
        width: width * 2,
    },
    kineticText: {
        fontSize: 100,
        fontWeight: '900',
        color: '#000',
        letterSpacing: 10,
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
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerIconWrap: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        backgroundColor: '#000',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
    },
    headerLabel: {
        fontSize: 10,
        fontWeight: '900',
        color: '#FFF',
        letterSpacing: 2,
    },
    scrollContent: {
        paddingHorizontal: 24,
        paddingBottom: 60,
    },
    heroSection: {
        marginVertical: 60,
    },
    heroPre: {
        fontSize: 12,
        fontWeight: '900',
        color: '#BBB',
        letterSpacing: 4,
        marginBottom: 16,
    },
    name: {
        fontSize: 64,
        fontWeight: '900',
        color: '#000',
        lineHeight: 64,
        letterSpacing: -4,
        marginBottom: 24,
    },
    heroTitleWrap: {
        backgroundColor: '#FFD700',
        paddingHorizontal: 16,
        paddingVertical: 8,
        alignSelf: 'flex-start',
        marginBottom: 24,
    },
    heroTitle: {
        fontSize: 14,
        fontWeight: '900',
        color: '#000',
        letterSpacing: 2,
    },
    heroHeadline: {
        fontSize: 18,
        fontWeight: '700',
        color: '#666',
        lineHeight: 28,
        maxWidth: 300,
    },
    section: {
        marginBottom: 60,
    },
    sectionTitleWrap: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        marginBottom: 32,
    },
    sectionTitle: {
        fontSize: 12,
        fontWeight: '900',
        color: '#000',
        letterSpacing: 4,
    },
    sectionTitleLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#EEE',
    },
    summaryText: {
        fontSize: 18,
        lineHeight: 32,
        color: '#444',
        fontWeight: '400',
    },
    skillsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    skillBox: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingHorizontal: 20,
        paddingVertical: 14,
        borderWidth: 1,
        borderColor: '#EEE',
        borderRadius: 4,
    },
    skillDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#FFD700',
    },
    skillText: {
        fontSize: 11,
        fontWeight: '900',
        color: '#000',
    },
    projectCard: {
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#EEE',
        padding: 30,
        marginBottom: 24,
        borderRadius: 4,
    },
    projectHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        marginBottom: 24,
    },
    projectIndexBox: {
        width: 40,
        height: 40,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    projectIndex: {
        fontSize: 12,
        fontWeight: '900',
        color: '#FFF',
    },
    projectName: {
        fontSize: 24,
        fontWeight: '900',
        color: '#000',
        letterSpacing: -1,
    },
    projectDesc: {
        fontSize: 16,
        color: '#666',
        lineHeight: 24,
        marginBottom: 32,
    },
    projectFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    projectCategory: {
        fontSize: 10,
        fontWeight: '900',
        color: '#BBB',
        letterSpacing: 2,
    },
    projectBtn: {
        width: 48,
        height: 48,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    footerBtn: {
        marginTop: 40,
        backgroundColor: '#000',
        paddingVertical: 32,
    },
    footerInner: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
    },
    footerText: {
        fontSize: 12,
        fontWeight: '900',
        color: '#FFF',
        letterSpacing: 2,
    }
});
