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
import { ChevronLeft, ArrowRight, Sparkles, Heart, Zap, Globe, Github, Twitter } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { FadeIn, FadeInDown, useAnimatedStyle, withRepeat, withTiming, withSequence } from 'react-native-reanimated';
import { portfolioprofile } from './portfoliodata';

const { width } = Dimensions.get('window');

const BlobBackground = () => {
    return (
        <View style={StyleSheet.absoluteFill}>
            <LinearGradient colors={['#F3E8FF', '#E9D5FF']} style={StyleSheet.absoluteFill} />
            <View style={[styles.blob, { top: -100, left: -100, backgroundColor: '#D8B4FE' }]} />
            <View style={[styles.blob, { bottom: -150, right: -100, backgroundColor: '#A855F7', opacity: 0.2 }]} />
            <View style={[styles.blob, { top: 300, right: -50, backgroundColor: '#C084FC', opacity: 0.3, width: 200, height: 200 }]} />
        </View>
    );
};

export default function Portfolio59({ navigation }) {
    const { personal_info, hero, summary, technical_stack, projects } = portfolioprofile;

    return (
        <View style={styles.container}>
            <BlobBackground />
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <ChevronLeft size={24} color="#6B21A8" />
                    </TouchableOpacity>
                    <Sparkles size={24} color="#6B21A8" fill="#6B21A8" />
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    <View style={styles.profileSection}>
                        <Animated.View entering={FadeInDown.duration(800)} style={styles.avatarGlow}>
                            <View style={styles.avatarInner} />
                        </Animated.View>
                        <Animated.Text entering={FadeInDown.delay(200).duration(800)} style={styles.name}>{personal_info.name}</Animated.Text>
                        <Animated.Text entering={FadeInDown.delay(400).duration(800)} style={styles.role}>{personal_info.title.toUpperCase()}</Animated.Text>
                    </View>

                    <View style={styles.linkList}>
                        <TouchableOpacity style={styles.primaryLink}>
                            <LinearGradient colors={['#A855F7', '#7E22CE']} style={styles.primaryGradient}>
                                <Text style={styles.primaryText}>VIEW MY STORY</Text>
                                <Zap size={20} color="#FFF" fill="#FFF" />
                            </LinearGradient>
                        </TouchableOpacity>

                        {projects.slice(0, 5).map((p, i) => (
                            <TouchableOpacity key={p.name} style={styles.secondaryLink}>
                                <View style={styles.secondaryDot} />
                                <Text style={styles.secondaryText}>{p.name.toUpperCase()}</Text>
                                <ArrowRight size={18} color="#6B21A8" />
                            </TouchableOpacity>
                        ))}

                        <TouchableOpacity style={styles.ghostLink}>
                            <Heart size={20} color="#6B21A8" />
                            <Text style={styles.ghostText}>GET IN TOUCH</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.socialRow}>
                        <TouchableOpacity style={styles.socialIcon}><Github size={20} color="#6B21A8" /></TouchableOpacity>
                        <TouchableOpacity style={styles.socialIcon}><Twitter size={20} color="#6B21A8" /></TouchableOpacity>
                        <TouchableOpacity style={styles.socialIcon}><Globe size={20} color="#6B21A8" /></TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3E8FF',
    },
    blob: {
        position: 'absolute',
        width: 300,
        height: 300,
        borderRadius: 150,
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
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#A855F7',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
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
    avatarGlow: {
        width: 90,
        height: 90,
        borderRadius: 45,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#A855F7',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.2,
        shadowRadius: 20,
        marginBottom: 20,
    },
    avatarInner: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#6B21A8',
    },
    name: {
        fontSize: 28,
        fontWeight: '900',
        color: '#4C1D95',
        marginBottom: 8,
    },
    role: {
        fontSize: 12,
        fontWeight: '800',
        color: '#A855F7',
        letterSpacing: 3,
        textAlign: 'center',
    },
    linkList: {
        width: '100%',
        gap: 12,
    },
    primaryLink: {
        width: '100%',
        borderRadius: 20,
        overflow: 'hidden',
        shadowColor: '#7E22CE',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.25,
        shadowRadius: 20,
        elevation: 10,
    },
    primaryGradient: {
        paddingVertical: 24,
        paddingHorizontal: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    primaryText: {
        fontSize: 14,
        fontWeight: '900',
        color: '#FFF',
        letterSpacing: 2,
    },
    secondaryLink: {
        width: '100%',
        backgroundColor: '#FFF',
        paddingVertical: 20,
        paddingHorizontal: 24,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E9D5FF',
    },
    secondaryDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#A855F7',
        marginRight: 16,
    },
    secondaryText: {
        flex: 1,
        fontSize: 12,
        fontWeight: '800',
        color: '#6B21A8',
        letterSpacing: 1,
    },
    ghostLink: {
        width: '100%',
        paddingVertical: 24,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 12,
    },
    ghostText: {
        fontSize: 12,
        fontWeight: '900',
        color: '#6B21A8',
        letterSpacing: 2,
    },
    socialRow: {
        flexDirection: 'row',
        marginTop: 30,
        gap: 30,
    },
    socialIcon: {
        padding: 5,
    }
});
