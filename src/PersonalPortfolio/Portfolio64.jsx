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
import { ChevronLeft, ArrowRight, Instagram, Twitter, Linkedin, Zap, Target, Mail } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { portfolioprofile } from './portfoliodata';

const { width, height } = Dimensions.get('window');

const EspressoBackground = () => (
    <View style={StyleSheet.absoluteFill}>
        <LinearGradient colors={['#3E2723', '#1B1110']} style={StyleSheet.absoluteFill} />
        <View style={styles.vignette} />
    </View>
);

export default function Portfolio64({ navigation }) {
    const { personal_info, hero, summary, technical_stack, projects } = portfolioprofile;

    return (
        <View style={styles.container}>
            <EspressoBackground />
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <ChevronLeft size={24} color="#FFF" />
                    </TouchableOpacity>
                    <Target size={24} color="#D4AF37" />
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    <View style={styles.editorialHeader}>
                        <Animated.Text entering={FadeInDown.duration(800)} style={styles.preTitle}>COLLECTION_64</Animated.Text>
                        <Animated.Text entering={FadeInDown.delay(200).duration(800)} style={styles.name}>{personal_info.name.toUpperCase()}</Animated.Text>
                        <Animated.Text entering={FadeInDown.delay(400).duration(800)} style={styles.role}>{personal_info.title.toUpperCase()}</Animated.Text>
                    </View>

                    <View style={styles.actionList}>
                        <TouchableOpacity style={styles.mainAction}>
                            <Text style={styles.mainActionText}>EXPLORE THE VISION</Text>
                            <Zap size={20} color="#D4AF37" fill="#D4AF37" />
                        </TouchableOpacity>

                        {projects.slice(0, 5).map((p, i) => (
                            <TouchableOpacity key={p.name} style={styles.projectLink}>
                                <Text style={styles.projectText}>{p.name.toUpperCase()}</Text>
                                <ArrowRight size={18} color="rgba(255,255,255,0.4)" />
                            </TouchableOpacity>
                        ))}

                        <TouchableOpacity style={styles.contactLink}>
                            <Mail size={20} color="#FFF" />
                            <Text style={styles.contactText}>SECURE_UPLINK</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.footerSocial}>
                        <TouchableOpacity style={styles.socialBtn}><Instagram size={20} color="#FFF" /></TouchableOpacity>
                        <TouchableOpacity style={styles.socialBtn}><Twitter size={20} color="#FFF" /></TouchableOpacity>
                        <TouchableOpacity style={styles.socialBtn}><Linkedin size={20} color="#FFF" /></TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#111',
    },
    vignette: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'transparent',
        borderWidth: 80,
        borderColor: 'rgba(0,0,0,0.4)',
        opacity: 0.8,
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
    editorialHeader: {
        alignItems: 'center',
        marginVertical: 60,
    },
    preTitle: {
        fontSize: 12,
        fontWeight: '900',
        color: '#D4AF37',
        letterSpacing: 6,
        marginBottom: 20,
    },
    name: {
        fontSize: 40,
        fontWeight: '900',
        color: '#FFF',
        textAlign: 'center',
        letterSpacing: -1,
        lineHeight: 46,
    },
    role: {
        fontSize: 14,
        fontWeight: '700',
        color: 'rgba(255,255,255,0.4)',
        letterSpacing: 4,
        marginTop: 12,
    },
    actionList: {
        width: '100%',
        gap: 12,
    },
    mainAction: {
        width: '100%',
        backgroundColor: 'rgba(255,255,255,0.05)',
        paddingVertical: 24,
        paddingHorizontal: 24,
        borderRadius: 4,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#D4AF37',
    },
    mainActionText: {
        fontSize: 14,
        fontWeight: '900',
        color: '#FFF',
        letterSpacing: 2,
    },
    projectLink: {
        width: '100%',
        backgroundColor: 'rgba(255,255,255,0.02)',
        paddingVertical: 20,
        paddingHorizontal: 24,
        borderRadius: 4,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
    },
    projectText: {
        fontSize: 12,
        fontWeight: '800',
        color: 'rgba(255,255,255,0.7)',
        letterSpacing: 1,
    },
    contactLink: {
        paddingVertical: 24,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 12,
    },
    contactText: {
        fontSize: 12,
        fontWeight: '900',
        color: '#FFF',
        letterSpacing: 2,
    },
    footerSocial: {
        flexDirection: 'row',
        marginTop: 40,
        gap: 20,
    },
    socialBtn: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: 'rgba(255,255,255,0.05)',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
