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
                <Icon size={40} color="#000" strokeWidth={1} />
            </View>
            <View style={styles.slideBody}>
                <Animated.Text entering={FadeInRight.duration(800)} style={styles.slideTitle}>{title}</Animated.Text>
                {quote && <Animated.Text entering={FadeInRight.delay(200)} style={styles.slideQuote}>"{quote}"</Animated.Text>}
                <Animated.Text entering={FadeInRight.delay(400)} style={styles.slideSubtitle}>{subtitle}</Animated.Text>
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
            <ScrollView 
                horizontal 
                pagingEnabled 
                showsHorizontalScrollIndicator={false}
                style={styles.horizontalScroll}
            >
                {/* 1. Introduction Slide */}
                <StorySlide 
                    title="THE BEGINNING" 
                    subtitle={`${personal_info.name}. A developer with a vision.`}
                    quote={personal_info.headline}
                    icon={BookOpen}
                    bg="#FDFCF0"
                >
                    <Text style={styles.bodyText}>{summary.slice(0, 200)}...</Text>
                    <View style={styles.scrollIndicator}>
                        <Text style={styles.scrollText}>Swipe to continue the story</Text>
                        <ArrowRight size={16} color="#000" />
                    </View>
                </StorySlide>

                {/* 2. Expertise Slide */}
                <StorySlide 
                    title="THE ENGINE" 
                    subtitle="Mastering the cross-platform ecosystem."
                    icon={Terminal}
                    bg="#F0F9FF"
                >
                    <View style={styles.journeyList}>
                        <View style={styles.journeyItem}>
                            <Layout size={20} color="#000" />
                            <Text style={styles.journeyText}>3.5+ Years of building scalable mobile apps.</Text>
                        </View>
                        <View style={styles.journeyItem}>
                            <Code size={20} color="#000" />
                            <Text style={styles.journeyText}>Expertise in React Native, iOS, and Android.</Text>
                        </View>
                        <View style={styles.journeyItem}>
                            <Smartphone size={20} color="#000" />
                            <Text style={styles.journeyText}>5+ Production apps launched to date.</Text>
                        </View>
                    </View>
                </StorySlide>

                {/* 3. Projects Slide */}
                <StorySlide 
                    title="THE WORKS" 
                    subtitle="Real-world impact through code."
                    icon={Layout}
                    bg="#F5F3FF"
                >
                    <ScrollView showsVerticalScrollIndicator={false} style={styles.projectScroll}>
                        {projects.slice(0, 3).map((p, i) => (
                            <View key={i} style={styles.miniProjectCard}>
                                <Text style={styles.miniProjectName}>{p.name}</Text>
                                <Text style={styles.miniProjectDesc}>{p.description.slice(0, 80)}...</Text>
                            </View>
                        ))}
                    </ScrollView>
                </StorySlide>

                {/* 4. Education & Conclusion Slide */}
                <StorySlide 
                    title="THE LEGACY" 
                    subtitle="Foundation and Future."
                    icon={Quote}
                    bg="#FEF2F2"
                >
                    <Text style={styles.bodyText}>Graduated from {education.institution} in {education.year}.</Text>
                    <Text style={[styles.bodyText, { marginTop: 20 }]}>Currently {personal_info.availability}.</Text>
                    <TouchableOpacity style={styles.contactBtn} onPress={() => navigation.goBack()}>
                        <Text style={styles.contactBtnText}>REACH OUT</Text>
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
        backgroundColor: '#FFF',
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
        padding: 40,
        justifyContent: 'center',
    },
    slideHeader: {
        marginBottom: 40,
    },
    slideTitle: {
        fontSize: 12,
        fontWeight: '900',
        color: '#000',
        letterSpacing: 4,
        marginBottom: 24,
    },
    slideQuote: {
        fontSize: 28,
        fontWeight: '300',
        color: '#000',
        lineHeight: 38,
        marginBottom: 32,
        fontStyle: 'italic',
    },
    slideSubtitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#000',
        marginBottom: 24,
        lineHeight: 26,
    },
    bodyText: {
        fontSize: 16,
        color: '#444',
        lineHeight: 26,
    },
    childrenContainer: {
        marginTop: 10,
    },
    scrollIndicator: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginTop: 40,
    },
    scrollText: {
        fontSize: 11,
        fontWeight: '900',
        color: '#000',
        letterSpacing: 1,
    },
    journeyList: {
        gap: 24,
    },
    journeyItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    journeyText: {
        fontSize: 14,
        color: '#333',
        fontWeight: '500',
        flex: 1,
    },
    projectScroll: {
        maxHeight: 300,
    },
    miniProjectCard: {
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.05)',
    },
    miniProjectName: {
        fontSize: 18,
        fontWeight: '800',
        color: '#000',
        marginBottom: 8,
    },
    miniProjectDesc: {
        fontSize: 13,
        color: '#666',
        lineHeight: 18,
    },
    contactBtn: {
        marginTop: 40,
        backgroundColor: '#000',
        paddingVertical: 18,
        paddingHorizontal: 32,
        borderRadius: 4,
        alignSelf: 'flex-start',
    },
    contactBtnText: {
        color: '#FFF',
        fontSize: 12,
        fontWeight: '900',
        letterSpacing: 2,
    },
    fixedBack: {
        position: 'absolute',
        top: 50,
        left: 20,
        zIndex: 100,
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(255,255,255,0.8)',
        justifyContent: 'center',
        alignItems: 'center',
    }
});
