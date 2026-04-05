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
import { ChevronLeft, ArrowRight, Zap, Target, Instagram, Twitter, Linkedin, Heart } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { FadeIn, FadeInDown, SlideInRight } from 'react-native-reanimated';
import { portfolioprofile } from './portfoliodata';

const { width } = Dimensions.get('window');

const ClayBackground = () => (
    <View style={StyleSheet.absoluteFill}>
        <LinearGradient colors={['#FDFCF0', '#F9F7E8']} style={StyleSheet.absoluteFill} />
        <View style={[styles.clayOrb, { top: -50, right: -50 }]} />
        <View style={[styles.clayOrb, { bottom: -100, left: -100, width: 300, height: 300 }]} />
    </View>
);

export default function Portfolio63({ navigation }) {
    const { personal_info, hero, summary, technical_stack, projects } = portfolioprofile;

    return (
        <View style={styles.container}>
            <ClayBackground />
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <ChevronLeft size={24} color="#8E8D7A" />
                    </TouchableOpacity>
                    <Target size={24} color="#8E8D7A" />
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    <View style={styles.profileSection}>
                        <Animated.View entering={FadeInDown.duration(800)} style={styles.avatarClay}>
                            <View style={styles.avatarInner} />
                        </Animated.View>
                        <Animated.Text entering={FadeInDown.delay(200).duration(800)} style={styles.name}>{personal_info.name}</Animated.Text>
                        <Animated.Text entering={FadeInDown.delay(400).duration(800)} style={styles.headline}>{personal_info.headline}</Animated.Text>
                    </View>

                    <View style={styles.linkGrid}>
                        <TouchableOpacity style={styles.clayButtonMain}>
                            <Text style={styles.clayTextMain}>WORK_ARCHIVE_2024</Text>
                            <Zap size={20} color="#8E8D7A" fill="#8E8D7A" />
                        </TouchableOpacity>

                        {projects.slice(0, 5).map((p, i) => (
                            <TouchableOpacity key={p.name} style={styles.clayButton}>
                                <Text style={styles.clayText}>{p.name.toUpperCase()}</Text>
                                <ArrowRight size={18} color="#8E8D7A" />
                            </TouchableOpacity>
                        ))}

                        <TouchableOpacity style={styles.clayButtonGhost}>
                            <Heart size={20} color="#8E8D7A" />
                            <Text style={styles.clayTextGhost}>ESTABLISH_LINK</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.socialBar}>
                        <TouchableOpacity style={styles.socialIcon}><Instagram size={24} color="#8E8D7A" /></TouchableOpacity>
                        <TouchableOpacity style={styles.socialIcon}><Twitter size={24} color="#8E8D7A" /></TouchableOpacity>
                        <TouchableOpacity style={styles.socialIcon}><Linkedin size={24} color="#8E8D7A" /></TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FDFCF0',
    },
    clayOrb: {
        position: 'absolute',
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: '#F3F1DF',
        opacity: 0.5,
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
        backgroundColor: '#FDFCF0',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: 'rgba(0,0,0,0.1)',
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 10,
        elevation: 5,
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
    avatarClay: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#FDFCF0',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: 'rgba(0,0,0,0.05)',
        shadowOffset: { width: 8, height: 8 },
        shadowOpacity: 1,
        shadowRadius: 12,
        marginBottom: 24,
    },
    avatarInner: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#EAE7D0',
    },
    name: {
        fontSize: 26,
        fontWeight: '900',
        color: '#3D3D35',
        marginBottom: 12,
    },
    headline: {
        fontSize: 14,
        color: '#8E8D7A',
        textAlign: 'center',
        paddingHorizontal: 40,
        lineHeight: 22,
    },
    linkGrid: {
        width: '100%',
        gap: 16,
    },
    clayButtonMain: {
        width: '100%',
        backgroundColor: '#FDFCF0',
        paddingVertical: 24,
        paddingHorizontal: 24,
        borderRadius: 24,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: 'rgba(0,0,0,0.08)',
        shadowOffset: { width: 8, height: 8 },
        shadowOpacity: 1,
        shadowRadius: 16,
        elevation: 8,
    },
    clayButton: {
        width: '100%',
        backgroundColor: '#FDFCF0',
        paddingVertical: 20,
        paddingHorizontal: 24,
        borderRadius: 24,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: 'rgba(0,0,0,0.04)',
        shadowOffset: { width: 6, height: 6 },
        shadowOpacity: 1,
        shadowRadius: 12,
        elevation: 4,
    },
    clayButtonGhost: {
        width: '100%',
        paddingVertical: 24,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 12,
    },
    clayTextMain: {
        fontSize: 14,
        fontWeight: '900',
        color: '#3D3D35',
        letterSpacing: 2,
    },
    clayText: {
        fontSize: 12,
        fontWeight: '700',
        color: '#8E8D7A',
        letterSpacing: 1,
    },
    clayTextGhost: {
        fontSize: 12,
        fontWeight: '900',
        color: '#8E8D7A',
        letterSpacing: 2,
    },
    socialBar: {
        flexDirection: 'row',
        marginTop: 40,
        gap: 24,
    },
    socialIcon: {
        width: 52,
        height: 52,
        borderRadius: 26,
        backgroundColor: '#FDFCF0',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: 'rgba(0,0,0,0.05)',
        shadowOffset: { width: 6, height: 6 },
        shadowOpacity: 1,
        shadowRadius: 10,
    }
});
