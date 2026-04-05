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
import { ChevronLeft, ArrowRight, Zap, Target, Book, Layout, Globe, Linkedin } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { portfolioprofile } from './portfoliodata';

const { width } = Dimensions.get('window');

const SandBackground = () => (
    <View style={StyleSheet.absoluteFill}>
        <LinearGradient colors={['#E5E5E5', '#D4D4D4']} style={StyleSheet.absoluteFill} />
        {/* Grainy texture dots simulation */}
        <View style={styles.grainOverlay}>
             {[...Array(20)].map((_, i) => (
                <View key={i} style={[styles.grain, { top: Math.random() * 800, left: Math.random() * width, opacity: Math.random() * 0.2 }]} />
             ))}
        </View>
    </View>
);

export default function Portfolio68({ navigation }) {
    const { personal_info, hero, summary, technical_stack, projects } = portfolioprofile;

    return (
        <View style={styles.container}>
            <SandBackground />
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <ChevronLeft size={24} color="#404040" />
                    </TouchableOpacity>
                    <Book size={24} color="#404040" />
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    <View style={styles.profileSection}>
                        <Animated.View entering={FadeInDown.duration(800)} style={styles.avatarStone}>
                            <View style={styles.avatarInner} />
                        </Animated.View>
                        <Animated.Text entering={FadeInDown.delay(200).duration(800)} style={styles.name}>{personal_info.name}</Animated.Text>
                        <Animated.Text entering={FadeInDown.delay(400).duration(800)} style={styles.role}>{personal_info.title.toUpperCase()}</Animated.Text>
                        <Animated.Text entering={FadeInDown.delay(600).duration(800)} style={styles.summary}>{summary.substring(0, 100)}...</Animated.Text>
                    </View>

                    <View style={styles.linkStack}>
                        <TouchableOpacity style={styles.stoneCard}>
                            <Text style={styles.stoneText}>NAVIGATE_COLLECTIONS</Text>
                            <Zap size={20} color="#404040" fill="#404040" />
                        </TouchableOpacity>

                        {projects.slice(0, 5).map((p, i) => (
                            <TouchableOpacity key={p.name} style={styles.stoneSubCard}>
                                <Text style={styles.stoneSubText}>{p.name.toUpperCase()}</Text>
                                <ArrowRight size={18} color="#A3A3A3" />
                            </TouchableOpacity>
                        ))}

                        <TouchableOpacity style={styles.footerLink}>
                            <Text style={styles.footerText}>INITIATE_CONTACT</Text>
                            <Target size={20} color="#404040" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.socialBar}>
                        <TouchableOpacity style={styles.socialIcon}><Globe size={20} color="#404040" /></TouchableOpacity>
                        <TouchableOpacity style={styles.socialIcon}><Linkedin size={20} color="#404040" /></TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E5E5E5',
    },
    grainOverlay: {
        ...StyleSheet.absoluteFillObject,
    },
    grain: {
        position: 'absolute',
        width: 2,
        height: 2,
        backgroundColor: '#000',
        borderRadius: 1,
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
        backgroundColor: 'rgba(255,255,255,0.4)',
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
    avatarStone: {
        width: 90,
        height: 90,
        borderRadius: 45,
        backgroundColor: '#D4D4D4',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    avatarInner: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#A3A3A3',
    },
    name: {
        fontSize: 26,
        fontWeight: '900',
        color: '#171717',
        marginBottom: 8,
    },
    role: {
        fontSize: 12,
        fontWeight: '800',
        color: '#737373',
        letterSpacing: 4,
        marginBottom: 16,
    },
    summary: {
        fontSize: 14,
        color: '#525252',
        textAlign: 'center',
        lineHeight: 22,
        paddingHorizontal: 20,
    },
    linkStack: {
        width: '100%',
        gap: 12,
    },
    stoneCard: {
        width: '100%',
        backgroundColor: '#D4D4D4',
        paddingVertical: 24,
        paddingHorizontal: 24,
        borderRadius: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    stoneText: {
        fontSize: 14,
        fontWeight: '900',
        color: '#171717',
        letterSpacing: 1,
    },
    stoneSubCard: {
        width: '100%',
        backgroundColor: '#E5E5E5',
        paddingVertical: 20,
        paddingHorizontal: 24,
        borderRadius: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#D4D4D4',
    },
    stoneSubText: {
        fontSize: 12,
        fontWeight: '700',
        color: '#525252',
        letterSpacing: 1,
    },
    footerLink: {
        paddingVertical: 24,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 12,
        marginTop: 12,
    },
    footerText: {
        fontSize: 12,
        fontWeight: '900',
        color: '#171717',
        letterSpacing: 2,
    },
    socialBar: {
        flexDirection: 'row',
        marginTop: 30,
        gap: 32,
    },
    socialIcon: {
        padding: 5,
    }
});
