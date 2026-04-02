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
import LinearGradient from 'react-native-linear-gradient';
import { ArrowRight, BookOpen, Quote, ChevronLeft, Layout, Smartphone, Code, Terminal } from 'lucide-react-native';
import Animated, { FadeIn, FadeInRight, SlideInRight } from 'react-native-reanimated';
import { portfolioprofile } from './portfoliodata';

const { width, height } = Dimensions.get('window');

const StorySlide = ({ title, subtitle, quote, icon: Icon, children, bg = '#FFF' }) => (
    <View style={[styles.slide, { backgroundColor: bg }]}>
        <SafeAreaView style={styles.safeSlide}>
            <View style={styles.slideHeader}>
                <Icon size={32} color="#1A1A1A" strokeWidth={1} />
            </View>
            <View style={styles.slideBody}>
                <Animated.Text entering={FadeInRight.duration(1000)} style={styles.slideTitle}>{title}</Animated.Text>
                {quote && <Animated.Text entering={FadeInRight.delay(200).duration(1000)} style={styles.slideQuote}>{quote}</Animated.Text>}
                <Animated.Text entering={FadeInRight.delay(400).duration(1000)} style={styles.slideSubtitle}>{subtitle}</Animated.Text>
                <View style={styles.childrenContainer}>
                    {children}
                </View>
            </View>
        </SafeAreaView>
    </View>
);

export default function Portfolio12({ navigation }) {
    const { personal_info, hero, summary, projects, education } = portfolioprofile;

    return (
        <View style={styles.container}>
            {/* Progress Top Bar */}
            <View style={styles.progressBarContainer}>
                <View style={styles.progressBar} />
            </View>

            <ScrollView 
                horizontal 
                pagingEnabled 
                showsHorizontalScrollIndicator={false}
                style={styles.horizontalScroll}
                scrollEventThrottle={16}
            >
                {/* 1. Introduction Slide */}
                <StorySlide 
                    title="CHAPTER I / ORIGIN" 
                    subtitle={`${personal_info.name}. A developer with a vision.`}
                    quote={personal_info.headline}
                    icon={BookOpen}
                    bg="#FBFBF7"
                >
                    <Text style={styles.bodyText}>{summary.slice(0, 250)}...</Text>
                    <View style={styles.scrollIndicator}>
                        <Text style={styles.scrollText}>PULL TO EXPLORE</Text>
                        <ArrowRight size={14} color="#1A1A1A" />
                    </View>
                </StorySlide>

                {/* 2. Expertise Slide */}
                <StorySlide 
                    title="CHAPTER II / THE ENGINE" 
                    subtitle="Mastering the cross-platform ecosystem."
                    icon={Terminal}
                    bg="#F5F5F0"
                >
                    <View style={styles.journeyList}>
                        <View style={styles.journeyItem}>
                            <View style={styles.marker} />
                            <Text style={styles.journeyText}>3.5+ Years of building scalable mobile apps.</Text>
                        </View>
                        <View style={styles.journeyItem}>
                            <View style={styles.marker} />
                            <Text style={styles.journeyText}>Expertise in React Native, iOS, and Android.</Text>
                        </View>
                        <View style={styles.journeyItem}>
                            <View style={styles.marker} />
                            <Text style={styles.journeyText}>5+ Production apps launched to date.</Text>
                        </View>
                    </View>
                </StorySlide>

                {/* 3. Projects Slide */}
                <StorySlide 
                    title="CHAPTER III / THE CURATION" 
                    subtitle="High-impact digital products."
                    icon={Layout}
                    bg="#F9F9F4"
                >
                    <ScrollView showsVerticalScrollIndicator={false} style={styles.projectScroll}>
                        {projects.slice(0, 3).map((p, i) => (
                            <View key={i} style={styles.miniProjectCard}>
                                <Text style={styles.miniProjectName}>{p.name.toUpperCase()}</Text>
                                <Text style={styles.miniProjectDesc}>{p.description.slice(0, 100)}...</Text>
                            </View>
                        ))}
                    </ScrollView>
                </StorySlide>

                {/* 4. Conclusion Slide */}
                <StorySlide 
                    title="FIN / CONNECT" 
                    subtitle="Foundation and Future."
                    icon={Quote}
                    bg="#F1F1EB"
                >
                    <Text style={styles.bodyText}>Academic background from {education.institution}.</Text>
                    <Text style={[styles.bodyText, { marginTop: 15 }]}>Currently {personal_info.availability}.</Text>
                    
                    <TouchableOpacity style={styles.contactBtn} onPress={() => navigation.goBack()}>
                        <Text style={styles.contactBtnText}>ESTABLISH CONNECTION</Text>
                    </TouchableOpacity>
                </StorySlide>

            </ScrollView>

            {/* Fixed Navigation Elements */}
            <TouchableOpacity 
                style={styles.fixedBack} 
                onPress={() => navigation.goBack()}
            >
                <ChevronLeft size={24} color="#000" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FBFBF7',
    },
    progressBarContainer: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? 100 : 80,
        left: 40,
        right: 40,
        height: 1,
        backgroundColor: 'rgba(0,0,0,0.05)',
        zIndex: 1000,
    },
    progressBar: {
        width: '25%',
        height: '100%',
        backgroundColor: '#1A1A1A',
    },
    horizontalScroll: {
        flex: 1,
    },
    slide: {
        width: width,
        height: height,
    },
    safeSlide: {
        flex: 1,
        paddingHorizontal: 44,
        paddingTop: Platform.OS === 'ios' ? 180 : 140,
        paddingBottom: 60,
    },
    slideHeader: {
        marginBottom: 40,
    },
    slideTitle: {
        fontSize: 10,
        fontWeight: '900',
        color: '#1A1A1A',
        letterSpacing: 4,
        marginBottom: 32,
    },
    slideQuote: {
        fontSize: 24,
        fontWeight: '300',
        color: '#1A1A1A',
        lineHeight: 34,
        marginBottom: 30,
        letterSpacing: -0.5,
    },
    slideSubtitle: {
        fontSize: 14,
        fontWeight: '800',
        color: '#1A1A1A',
        marginBottom: 24,
        lineHeight: 22,
        textTransform: 'uppercase',
    },
    bodyText: {
        fontSize: 14,
        color: '#444',
        lineHeight: 24,
        fontWeight: '400',
    },
    childrenContainer: {
        marginTop: 20,
    },
    scrollIndicator: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginTop: 60,
    },
    scrollText: {
        fontSize: 10,
        fontWeight: '900',
        color: '#1A1A1A',
        letterSpacing: 2,
    },
    journeyList: {
        gap: 32,
    },
    journeyItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
    },
    marker: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#1A1A1A',
    },
    journeyText: {
        fontSize: 15,
        color: '#1A1A1A',
        fontWeight: '600',
        flex: 1,
        lineHeight: 22,
    },
    projectScroll: {
        maxHeight: 400,
    },
    miniProjectCard: {
        paddingVertical: 24,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.08)',
    },
    miniProjectName: {
        fontSize: 14,
        fontWeight: '900',
        color: '#1A1A1A',
        marginBottom: 10,
        letterSpacing: 1,
    },
    miniProjectDesc: {
        fontSize: 14,
        color: '#666',
        lineHeight: 22,
    },
    contactBtn: {
        marginTop: 60,
        backgroundColor: '#1A1A1A',
        paddingVertical: 20,
        paddingHorizontal: 36,
        borderRadius: 0,
        alignSelf: 'flex-start',
    },
    contactBtnText: {
        color: '#FFF',
        fontSize: 11,
        fontWeight: '900',
        letterSpacing: 3,
    },
    fixedBack: {
        position: 'absolute',
        top: 50,
        left: 20,
        zIndex: 100,
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
    }
});
