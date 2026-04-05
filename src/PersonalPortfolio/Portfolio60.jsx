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
import { ChevronLeft, ArrowRight, Sun, Zap, Instagram, Linkedin, Mail } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { FadeIn, FadeInDown, SlideInUp } from 'react-native-reanimated';
import { portfolioprofile } from './portfoliodata';

const { width, height } = Dimensions.get('window');

const HorizonBackground = () => (
    <View style={StyleSheet.absoluteFill}>
        <LinearGradient colors={['#FF8C00', '#FF4500']} style={{ height: height * 0.4 }} />
        <LinearGradient colors={['#00CED1', '#20B2AA']} style={{ height: height * 0.6 }} />
        <View style={styles.horizonLine} />
    </View>
);

export default function Portfolio60({ navigation }) {
    const { personal_info, hero, summary, technical_stack, projects } = portfolioprofile;

    return (
        <View style={styles.container}>
            <HorizonBackground />
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <ChevronLeft size={24} color="#FFF" />
                    </TouchableOpacity>
                    <Sun size={24} color="#FFF" fill="#FFF" />
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    <View style={styles.heroSection}>
                        <Animated.Text entering={FadeInDown.duration(800)} style={styles.preTitle}>PORTFOLIO_V60</Animated.Text>
                        <Animated.Text entering={FadeInDown.delay(200).duration(800)} style={styles.name}>{personal_info.name.toUpperCase()}</Animated.Text>
                        <Animated.Text entering={FadeInDown.delay(400).duration(800)} style={styles.title}>{personal_info.title.toUpperCase()}</Animated.Text>
                    </View>

                    <Animated.View entering={SlideInUp.delay(500).duration(800)} style={styles.cardSection}>
                        <TouchableOpacity style={styles.mainAction}>
                            <Text style={styles.mainActionText}>EXPLORE MY EXPERTISE</Text>
                            <Zap size={20} color="#FF8C00" fill="#FF8C00" />
                        </TouchableOpacity>

                        {projects.slice(0, 5).map((p, i) => (
                            <TouchableOpacity key={p.name} style={styles.projectButton}>
                                <Text style={styles.projectButtonText}>{p.name.toUpperCase()}</Text>
                                <ArrowRight size={18} color="#00CED1" />
                            </TouchableOpacity>
                        ))}

                        <TouchableOpacity style={styles.contactButton}>
                            <Mail size={20} color="#FFF" />
                            <Text style={styles.contactButtonText}>GET IN TOUCH</Text>
                        </TouchableOpacity>
                    </Animated.View>

                    <View style={styles.socialFooter}>
                        <TouchableOpacity style={styles.socialCircle}><Instagram size={20} color="#FFF" /></TouchableOpacity>
                        <TouchableOpacity style={styles.socialCircle}><Linkedin size={20} color="#FFF" /></TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#00CED1',
    },
    horizonLine: {
        position: 'absolute',
        top: height * 0.4,
        width: width,
        height: 2,
        backgroundColor: 'rgba(255,255,255,0.3)',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingVertical: 16,
    },
    backBtn: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollContent: {
        paddingHorizontal: 24,
        paddingBottom: 40,
        alignItems: 'center',
    },
    heroSection: {
        alignItems: 'center',
        marginTop: 60,
        marginBottom: 40,
    },
    preTitle: {
        fontSize: 12,
        fontWeight: '900',
        color: '#FFF',
        letterSpacing: 4,
        opacity: 0.8,
        marginBottom: 16,
    },
    name: {
        fontSize: 48,
        fontWeight: '900',
        color: '#FFF',
        textAlign: 'center',
        letterSpacing: -2,
    },
    title: {
        fontSize: 14,
        fontWeight: '700',
        color: '#FFF',
        letterSpacing: 3,
        marginTop: 8,
        opacity: 0.9,
    },
    cardSection: {
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0.1)',
        padding: 24,
        borderRadius: 32,
        gap: 12,
    },
    mainAction: {
        backgroundColor: '#FFF',
        paddingVertical: 24,
        paddingHorizontal: 24,
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    mainActionText: {
        fontSize: 14,
        fontWeight: '900',
        color: '#FF8C00',
        letterSpacing: 1,
    },
    projectButton: {
        backgroundColor: 'rgba(255,255,255,0.05)',
        paddingVertical: 20,
        paddingHorizontal: 24,
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    projectButtonText: {
        fontSize: 12,
        fontWeight: '800',
        color: '#FFF',
        letterSpacing: 1,
    },
    contactButton: {
        paddingVertical: 24,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 12,
    },
    contactButtonText: {
        fontSize: 12,
        fontWeight: '900',
        color: '#FFF',
        letterSpacing: 2,
    },
    socialFooter: {
        flexDirection: 'row',
        marginTop: 40,
        gap: 24,
    },
    socialCircle: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: 'rgba(255,255,255,0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
    },
});
