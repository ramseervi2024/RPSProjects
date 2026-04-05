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
import { ChevronLeft, ArrowRight, Zap, Star, Layout, Share2, Linkedin, Mail } from 'lucide-react-native';
import Animated, { FadeIn, FadeInDown, SlideInLeft, SlideInRight } from 'react-native-reanimated';
import { portfolioprofile } from './portfoliodata';

const { width, height } = Dimensions.get('window');

const SplitBackground = () => (
    <View style={StyleSheet.absoluteFill}>
        <View style={[styles.splitHalf, { backgroundColor: '#000', left: 0 }]} />
        <View style={[styles.splitHalf, { backgroundColor: '#FF007A', right: 0 }]} />
    </View>
);

export default function Portfolio71({ navigation }) {
    const { personal_info, hero, summary, technical_stack, projects } = portfolioprofile;

    return (
        <View style={styles.container}>
            <SplitBackground />
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <ChevronLeft size={24} color="#FFF" />
                    </TouchableOpacity>
                    <Share2 size={24} color="#FFF" />
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    <View style={styles.heroSplit}>
                        <Animated.View entering={SlideInLeft.duration(800)} style={styles.nameBlock}>
                            <Text style={styles.nameText}>{personal_info.name.split(' ')[0]}</Text>
                        </Animated.View>
                        <Animated.View entering={SlideInRight.duration(800)} style={styles.nameBlockRight}>
                            <Text style={styles.nameTextRight}>{personal_info.name.split(' ')[1]}</Text>
                        </Animated.View>
                    </View>

                    <Animated.Text entering={FadeIn.delay(600).duration(800)} style={styles.roleText}>{personal_info.title.toUpperCase()}</Animated.Text>

                    <View style={styles.actionStack}>
                        <TouchableOpacity style={styles.splitCard}>
                            <View style={styles.cardLeft}><Zap size={20} color="#FF007A" /></View>
                            <View style={styles.cardRight}><Text style={styles.cardText}>VIEW_MANIFESTO</Text></View>
                        </TouchableOpacity>

                        {projects.slice(0, 5).map((p, i) => (
                            <TouchableOpacity key={p.name} style={styles.projectRow}>
                                <Text style={styles.projectText}>{p.name.toUpperCase()}</Text>
                                <ArrowRight size={18} color="#FFF" />
                            </TouchableOpacity>
                        ))}

                        <TouchableOpacity style={styles.contactFooter}>
                            <Mail size={20} color="#FFF" />
                            <Text style={styles.contactFooterText}>SECURE_MESSAGE</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.socialRow}>
                        <TouchableOpacity style={styles.socialCircle}><Linkedin size={20} color="#FFF" /></TouchableOpacity>
                        <TouchableOpacity style={styles.socialCircle}><Star size={20} color="#FFF" /></TouchableOpacity>
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
    splitHalf: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        width: width / 2,
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
        backgroundColor: 'rgba(255,255,255,0.1)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollContent: {
        paddingHorizontal: 24,
        paddingBottom: 40,
        alignItems: 'center',
    },
    heroSplit: {
        flexDirection: 'row',
        marginTop: 60,
        marginBottom: 20,
    },
    nameBlock: {
        paddingRight: 10,
    },
    nameBlockRight: {
        paddingLeft: 10,
    },
    nameText: {
        fontSize: 56,
        fontWeight: '900',
        color: '#FFF',
        letterSpacing: -2,
    },
    nameTextRight: {
        fontSize: 56,
        fontWeight: '900',
        color: '#000',
        letterSpacing: -2,
    },
    roleText: {
        fontSize: 14,
        fontWeight: '900',
        color: '#FFF',
        letterSpacing: 6,
        marginBottom: 60,
    },
    actionStack: {
        width: '100%',
        gap: 12,
    },
    splitCard: {
        width: '100%',
        height: 70,
        flexDirection: 'row',
        borderRadius: 12,
        overflow: 'hidden',
    },
    cardLeft: {
        width: 70,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardRight: {
        flex: 1,
        backgroundColor: 'rgba(255,255,255,0.1)',
        justifyContent: 'center',
        paddingLeft: 24,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
    },
    cardText: {
        fontSize: 12,
        fontWeight: '900',
        color: '#FFF',
        letterSpacing: 2,
    },
    projectRow: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 24,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.1)',
    },
    projectText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#FFF',
        letterSpacing: 1,
    },
    contactFooter: {
        paddingVertical: 32,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 12,
    },
    contactFooterText: {
        fontSize: 12,
        fontWeight: '900',
        color: '#FFF',
        letterSpacing: 2,
    },
    socialRow: {
        flexDirection: 'row',
        marginTop: 20,
        gap: 24,
    },
    socialCircle: {
        width: 52,
        height: 52,
        borderRadius: 26,
        backgroundColor: 'rgba(255,255,255,0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
    },
});
