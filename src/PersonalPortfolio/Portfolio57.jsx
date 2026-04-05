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
import { ChevronLeft, ArrowRight, Sparkles, Heart, Zap, Instagram, Twitter, Linkedin } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { FadeIn, FadeInDown, useAnimatedStyle, withRepeat, withTiming, withSequence, Easing } from 'react-native-reanimated';
import { portfolioprofile } from './portfoliodata';

const { width } = Dimensions.get('window');

const MeshBackground = () => {
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            { scale: withRepeat(withTiming(1.2, { duration: 10000, easing: Easing.inOut(Easing.ease) }), -1, true) },
            { rotate: withRepeat(withTiming('360deg', { duration: 20000, easing: Easing.linear }), -1, false) },
        ],
    }));

    return (
        <View style={StyleSheet.absoluteFill}>
            <LinearGradient colors={['#FFDEE9', '#B5FFFC']} style={StyleSheet.absoluteFill} />
            <Animated.View style={[styles.meshBlob, animatedStyle]} />
        </View>
    );
};

export default function Portfolio57({ navigation }) {
    const { personal_info, hero, summary, technical_stack, projects } = portfolioprofile;

    return (
        <View style={styles.container}>
            <MeshBackground />
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <ChevronLeft size={24} color="#000" />
                    </TouchableOpacity>
                    <Sparkles size={24} color="#FF6B6B" fill="#FF6B6B" />
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    <View style={styles.profileSection}>
                        <Animated.View entering={FadeInDown.duration(800)} style={styles.avatarPlaceholder} />
                        <Animated.Text entering={FadeInDown.delay(200).duration(800)} style={styles.name}>{personal_info.name}</Animated.Text>
                        <Animated.Text entering={FadeInDown.delay(400).duration(800)} style={styles.title}>{personal_info.title}</Animated.Text>
                        <Animated.Text entering={FadeInDown.delay(600).duration(800)} style={styles.headline}>{personal_info.headline}</Animated.Text>
                    </View>

                    <View style={styles.linkSection}>
                        <TouchableOpacity style={styles.linkCard}>
                            <Text style={styles.linkText}>READ MY MANIFESTO</Text>
                            <Heart size={20} color="#000" />
                        </TouchableOpacity>

                        {projects.slice(0, 4).map((p, i) => (
                            <TouchableOpacity key={p.name} style={styles.linkCard}>
                                <Text style={styles.linkText}>{p.name.toUpperCase()}</Text>
                                <ArrowRight size={20} color="#000" />
                            </TouchableOpacity>
                        ))}

                        <TouchableOpacity style={[styles.linkCard, styles.ctaCard]}>
                            <Text style={[styles.linkText, { color: '#FFF' }]}>HIRE ME TODAY</Text>
                            <Zap size={20} color="#FFF" fill="#FFF" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.socialRow}>
                        <TouchableOpacity style={styles.socialIcon}><Instagram size={24} color="#000" /></TouchableOpacity>
                        <TouchableOpacity style={styles.socialIcon}><Twitter size={24} color="#000" /></TouchableOpacity>
                        <TouchableOpacity style={styles.socialIcon}><Linkedin size={24} color="#000" /></TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFDEE9',
    },
    meshBlob: {
        position: 'absolute',
        width: width * 1.5,
        height: width * 1.5,
        borderRadius: width * 0.75,
        backgroundColor: 'rgba(255,107,107,0.2)',
        top: -width * 0.5,
        left: -width * 0.25,
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
        backgroundColor: 'rgba(255,255,255,0.8)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollContent: {
        paddingHorizontal: 24,
        paddingBottom: 40,
        alignItems: 'center',
    },
    profileSection: {
        alignItems: 'center',
        marginVertical: 40,
    },
    avatarPlaceholder: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#000',
        marginBottom: 20,
    },
    name: {
        fontSize: 24,
        fontWeight: '900',
        color: '#000',
        marginBottom: 4,
    },
    title: {
        fontSize: 14,
        fontWeight: '700',
        color: '#FF6B6B',
        letterSpacing: 2,
        marginBottom: 16,
    },
    headline: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        lineHeight: 22,
        paddingHorizontal: 20,
    },
    linkSection: {
        width: '100%',
        gap: 16,
    },
    linkCard: {
        width: '100%',
        backgroundColor: 'rgba(255,255,255,0.8)',
        paddingVertical: 20,
        paddingHorizontal: 24,
        borderRadius: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#FFF',
    },
    ctaCard: {
        backgroundColor: '#000',
        borderColor: '#000',
    },
    linkText: {
        fontSize: 14,
        fontWeight: '900',
        color: '#000',
        letterSpacing: 1,
    },
    socialRow: {
        flexDirection: 'row',
        marginTop: 40,
        gap: 20,
    },
    socialIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: 'rgba(255,255,255,0.8)',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
