import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    Dimensions,
    Platform,
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
                <Icon size={40} color="#1A1A1A" strokeWidth={1} />
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
                showsHorizontalScrollIndicator={false}
                style={styles.horizontalScroll}
                contentContainerStyle={styles.scrollContent}
                snapToInterval={width - 50}
                snapToAlignment="center"
                decelerationRate="fast"
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
        top: Platform.OS === 'ios' ? 70 : 50,
        left: 100, // Move right to clear back button
        right: 48,
        height: 2,
        backgroundColor: 'rgba(0,0,0,0.06)',
        zIndex: 1000,
        borderRadius: 2,
    },
    progressBar: {
        width: '25%',
        height: '100%',
        backgroundColor: '#1A1A1A',
    },
    horizontalScroll: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 35, // (width - (width - 70)) / 2
        paddingTop: 110,
        paddingBottom: 40,
    },
    slide: {
        width: width - 70,
        height: height * 0.68,
        marginHorizontal: 10,
        borderRadius: 36,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 15 },
        shadowOpacity: 0.05,
        shadowRadius: 30,
        elevation: 10,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.03)',
    },
    safeSlide: {
        flex: 1,
        paddingHorizontal: 60,
        paddingTop: 48,
        paddingBottom: 40,
    },
    slideHeader: {
        marginBottom: 60,
    },
    slideTitle: {
        fontSize: 11,
        fontWeight: '900',
        color: '#1A1A1A',
        letterSpacing: 8,
        marginBottom: 32,
        paddingLeft: 8,
        opacity: 0.3,
    },
    slideQuote: {
        fontSize: 32,
        fontWeight: '300',
        color: '#1A1A1A',
        lineHeight: 44,
        marginBottom: 40,
        letterSpacing: -1,
    },
    slideSubtitle: {
        fontSize: 18,
        fontWeight: '900',
        color: '#1A1A1A',
        marginBottom: 32,
        lineHeight: 28,
        textTransform: 'uppercase',
    },
    bodyText: {
        fontSize: 16,
        color: '#555',
        lineHeight: 32,
        fontWeight: '400',
    },
    childrenContainer: {
        marginTop: 30,
    },
    scrollIndicator: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        marginTop: 80,
    },
    scrollText: {
        fontSize: 11,
        fontWeight: '900',
        color: '#1A1A1A',
        letterSpacing: 3,
    },
    journeyList: {
        gap: 40,
    },
    journeyItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 24,
    },
    marker: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#1A1A1A',
    },
    journeyText: {
        fontSize: 17,
        color: '#1A1A1A',
        fontWeight: '600',
        flex: 1,
        lineHeight: 24,
    },
    projectScroll: {
        maxHeight: 450,
    },
    miniProjectCard: {
        paddingVertical: 32,
        paddingHorizontal: 8, // Added gap around card labels
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.06)',
    },
    miniProjectName: {
        fontSize: 15,
        fontWeight: '900',
        color: '#1A1A1A',
        marginBottom: 12,
        letterSpacing: 2,
    },
    miniProjectDesc: {
        fontSize: 15,
        color: '#666',
        lineHeight: 24,
    },
    contactBtn: {
        marginTop: 60,
        backgroundColor: '#1A1A1A',
        paddingVertical: 24,
        paddingHorizontal: 44,
        borderRadius: 0,
        alignSelf: 'center', // Centered for better balance
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
    },
    contactBtnText: {
        color: '#FFF',
        fontSize: 12,
        fontWeight: '900',
        letterSpacing: 4,
    },
    fixedBack: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? 50 : 30,
        left: 30,
        zIndex: 2000,
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
    }
});
