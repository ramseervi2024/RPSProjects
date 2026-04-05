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
import { ChevronLeft, ArrowRight, Moon, Box, Zap, Github, Linkedin, Mail } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { FadeIn, FadeInDown, SlideInRight } from 'react-native-reanimated';
import { portfolioprofile } from './portfoliodata';

const { width } = Dimensions.get('window');

const NoirBackground = () => (
    <View style={StyleSheet.absoluteFill}>
        <LinearGradient colors={['#111827', '#000000']} style={StyleSheet.absoluteFill} />
        <View style={styles.lightOrb} />
    </View>
);

export default function Portfolio61({ navigation }) {
    const { personal_info, hero, summary, technical_stack, projects } = portfolioprofile;

    return (
        <View style={styles.container}>
            <NoirBackground />
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <ChevronLeft size={24} color="#FFF" />
                    </TouchableOpacity>
                    <Moon size={24} color="#FFF" fill="#FFF" />
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    <View style={styles.profileBox}>
                        <Animated.View entering={FadeInDown.duration(800)} style={styles.avatarBorder}>
                            <View style={styles.avatar} />
                        </Animated.View>
                        <Animated.Text entering={FadeInDown.delay(200).duration(800)} style={styles.name}>{personal_info.name.toUpperCase()}</Animated.Text>
                        <Animated.Text entering={FadeInDown.delay(400).duration(800)} style={styles.role}>{personal_info.title}</Animated.Text>
                    </View>

                    <View style={styles.glassStack}>
                        <TouchableOpacity style={styles.glassCard}>
                            <View style={styles.glassContent}>
                                <Text style={styles.glassText}>DISCOVER MY PROCESS</Text>
                                <Zap size={20} color="#FFF" />
                            </View>
                        </TouchableOpacity>

                        {projects.slice(0, 5).map((p, i) => (
                            <TouchableOpacity key={p.name} style={styles.glassCardSub}>
                                <Text style={styles.glassTextSub}>{p.name.toUpperCase()}</Text>
                                <ArrowRight size={18} color="rgba(255,255,255,0.4)" />
                            </TouchableOpacity>
                        ))}

                        <TouchableOpacity style={styles.glassCardSolid}>
                            <Text style={styles.glassTextSolid}>LET'S BUILD SOMETHING</Text>
                            <Mail size={20} color="#000" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.socialBar}>
                        <TouchableOpacity style={styles.socialIcon}><Github size={20} color="#FFF" /></TouchableOpacity>
                        <TouchableOpacity style={styles.socialIcon}><Linkedin size={20} color="#FFF" /></TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    lightOrb: {
        position: 'absolute',
        top: -100,
        right: -100,
        width: 300,
        height: 300,
        borderRadius: 150,
        backgroundColor: '#374151',
        opacity: 0.2,
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
        backgroundColor: 'rgba(255,255,255,0.05)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    scrollContent: {
        paddingHorizontal: 24,
        paddingBottom: 40,
        alignItems: 'center',
    },
    profileBox: {
        alignItems: 'center',
        marginVertical: 40,
    },
    avatarBorder: {
        width: 84,
        height: 84,
        borderRadius: 42,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    avatar: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#FFF',
    },
    name: {
        fontSize: 28,
        fontWeight: '900',
        color: '#FFF',
        letterSpacing: 2,
        marginBottom: 8,
    },
    role: {
        fontSize: 12,
        fontWeight: '600',
        color: 'rgba(255,255,255,0.4)',
        letterSpacing: 4,
    },
    glassStack: {
        width: '100%',
        gap: 12,
    },
    glassCard: {
        width: '100%',
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
        paddingVertical: 24,
        paddingHorizontal: 24,
        overflow: 'hidden',
    },
    glassContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    glassText: {
        fontSize: 14,
        fontWeight: '900',
        color: '#FFF',
        letterSpacing: 2,
    },
    glassCardSub: {
        width: '100%',
        backgroundColor: 'rgba(255,255,255,0.02)',
        paddingVertical: 20,
        paddingHorizontal: 24,
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
    },
    glassTextSub: {
        fontSize: 12,
        fontWeight: '700',
        color: 'rgba(255,255,255,0.8)',
        letterSpacing: 1,
    },
    glassCardSolid: {
        width: '100%',
        backgroundColor: '#FFF',
        paddingVertical: 24,
        paddingHorizontal: 24,
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 12,
    },
    glassTextSolid: {
        fontSize: 12,
        fontWeight: '900',
        color: '#000',
        letterSpacing: 2,
    },
    socialBar: {
        flexDirection: 'row',
        marginTop: 40,
        gap: 32,
    },
    socialIcon: {
        padding: 5,
    }
});
