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
import { ChevronLeft, Heart, Sun, Cloud, Sparkles, ArrowRight, User } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { FadeIn, FadeInDown, SlideInRight } from 'react-native-reanimated';
import { portfolioprofile } from './portfoliodata';

const { width } = Dimensions.get('window');

const OrganicBlob = ({ style, colors }) => (
    <View style={[styles.blob, style]}>
        <LinearGradient 
            colors={colors} 
            style={StyleSheet.absoluteFill}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
        />
    </View>
);

export default function Portfolio22({ navigation }) {
    const { personal_info, hero, summary, technical_stack, projects } = portfolioprofile;

    return (
        <View style={styles.container}>
            <LinearGradient colors={['#F5F3FF', '#EDE9FE']} style={StyleSheet.absoluteFill} />
            
            {/* Soft Background Blobs */}
            <OrganicBlob style={{ top: -50, right: -50, width: 300, height: 300 }} colors={['#DDD6FE', '#C4B5FD']} />
            <OrganicBlob style={{ bottom: -100, left: -100, width: 400, height: 400 }} colors={['#EDE9FE', '#F5F3FF']} />

            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backCircle}>
                        <ChevronLeft size={24} color="#7C3AED" />
                    </TouchableOpacity>
                    <View style={styles.statusChip}>
                        <Sparkles size={14} color="#7C3AED" />
                        <Text style={styles.statusText}>ORGANIC_FLOW</Text>
                    </View>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    {/* Hero Section */}
                    <View style={styles.heroSection}>
                        <View style={styles.avatarWrap}>
                            <User size={40} color="#FFF" />
                            <OrganicBlob style={StyleSheet.absoluteFill} colors={['#8B5CF6', '#7C3AED']} />
                        </View>
                        <Text style={styles.greeting}>HELLO, I AM</Text>
                        <Text style={styles.name}>{personal_info.name}</Text>
                        <Text style={styles.headline}>{personal_info.headline}</Text>
                    </View>

                    {/* Summary Bubble */}
                    <View style={styles.mainBubble}>
                        <Text style={styles.summaryTitle}>The Narrative</Text>
                        <Text style={styles.summaryText}>{summary}</Text>
                    </View>

                    {/* Expertise Row */}
                    <View style={styles.expertiseSection}>
                        <Text style={styles.sectionTitle}>Core Expertise</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.expertiseScroll}>
                            {technical_stack.mobile.map((item, i) => (
                                <View key={i} style={styles.expertiseCard}>
                                    <View style={styles.expertiseIcon}>
                                        <Heart size={20} color="#7C3AED" fill="#7C3AED" opacity={0.2} />
                                    </View>
                                    <Text style={styles.expertiseText}>{item}</Text>
                                </View>
                            ))}
                        </ScrollView>
                    </View>

                    {/* Fluid Project Layout */}
                    <View style={styles.projectsSection}>
                        <Text style={styles.sectionTitle}>Recent Works</Text>
                        {projects.slice(0, 3).map((p, i) => (
                            <TouchableOpacity key={i} style={[styles.projectCard, { borderTopLeftRadius: i % 2 === 0 ? 60 : 20, borderBottomRightRadius: i % 2 !== 0 ? 60 : 20 }]}>
                                <LinearGradient colors={['#FFF', '#F9FAFB']} style={StyleSheet.absoluteFill} />
                                <View style={styles.projectHeader}>
                                    <Text style={styles.projectName}>{p.name}</Text>
                                    <View style={styles.categoryBadge}>
                                        <Text style={styles.categoryText}>{p.category}</Text>
                                    </View>
                                </View>
                                <Text style={styles.projectDesc}>{p.description.slice(0, 80)}...</Text>
                                <View style={styles.projectFooter}>
                                    <Text style={styles.viewLink}>Read Case Study</Text>
                                    <ArrowRight size={16} color="#7C3AED" />
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Connection CTA */}
                    <TouchableOpacity style={styles.ctaButton} onPress={() => navigation.goBack()}>
                        <LinearGradient colors={['#7C3AED', '#6D28D9']} style={styles.ctaInner}>
                            <Text style={styles.ctaText}>Let's Build Something Together</Text>
                            <Sparkles size={20} color="#FFF" />
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
    blob: {
        position: 'absolute',
        borderRadius: 200,
        opacity: 0.3,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingVertical: 16,
    },
    backCircle: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#7C3AED',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
    statusChip: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        backgroundColor: 'rgba(124, 58, 237, 0.1)',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 30,
    },
    statusText: {
        fontSize: 11,
        fontWeight: '900',
        color: '#7C3AED',
        letterSpacing: 1,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 60,
    },
    heroSection: {
        alignItems: 'center',
        paddingVertical: 40,
    },
    avatarWrap: {
        width: 80,
        height: 80,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
        overflow: 'hidden',
    },
    greeting: {
        fontSize: 12,
        fontWeight: '900',
        color: '#7C3AED',
        letterSpacing: 4,
        marginBottom: 8,
    },
    name: {
        fontSize: 40,
        fontWeight: '900',
        color: '#1F2937',
        textAlign: 'center',
        marginBottom: 16,
    },
    headline: {
        fontSize: 16,
        color: '#6B7280',
        textAlign: 'center',
        lineHeight: 24,
        paddingHorizontal: 30,
    },
    mainBubble: {
        backgroundColor: '#FFF',
        padding: 30,
        borderRadius: 40,
        borderBottomLeftRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.05,
        shadowRadius: 20,
        marginBottom: 40,
    },
    summaryTitle: {
        fontSize: 12,
        fontWeight: '900',
        color: '#7C3AED',
        textTransform: 'uppercase',
        letterSpacing: 2,
        marginBottom: 16,
    },
    summaryText: {
        fontSize: 16,
        lineHeight: 28,
        color: '#4B5563',
        fontWeight: '400',
    },
    expertiseSection: {
        marginBottom: 40,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '900',
        color: '#1F2937',
        marginBottom: 24,
        marginLeft: 4,
    },
    expertiseScroll: {
        gap: 16,
        paddingBottom: 10,
    },
    expertiseCard: {
        width: 140,
        backgroundColor: '#FFF',
        padding: 20,
        borderRadius: 30,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
    },
    expertiseIcon: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#F5F3FF',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    expertiseText: {
        fontSize: 12,
        fontWeight: '800',
        color: '#4B5563',
        textAlign: 'center',
    },
    projectsSection: {
        marginBottom: 40,
    },
    projectCard: {
        padding: 24,
        marginBottom: 20,
        backgroundColor: '#FFF',
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.05,
        shadowRadius: 15,
        overflow: 'hidden',
    },
    projectHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 16,
    },
    projectName: {
        fontSize: 18,
        fontWeight: '900',
        color: '#1F2937',
        flex: 1,
    },
    categoryBadge: {
        backgroundColor: '#F5F3FF',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },
    categoryText: {
        fontSize: 10,
        fontWeight: '900',
        color: '#7C3AED',
    },
    projectDesc: {
        fontSize: 14,
        color: '#6B7280',
        lineHeight: 22,
        marginBottom: 20,
    },
    projectFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    viewLink: {
        fontSize: 12,
        fontWeight: '900',
        color: '#7C3AED',
    },
    ctaButton: {
        marginTop: 20,
        borderRadius: 30,
        overflow: 'hidden',
    },
    ctaInner: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 24,
        gap: 16,
    },
    ctaText: {
        fontSize: 16,
        fontWeight: '900',
        color: '#FFF',
    }
});
