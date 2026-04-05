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
import { ChevronLeft, ArrowRight, Leaf, Zap, Globe, Github, Linkedin, MessageCircle } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { FadeIn, FadeInDown, SlideInRight } from 'react-native-reanimated';
import { portfolioprofile } from './portfoliodata';

const { width } = Dimensions.get('window');

const EmeraldBackground = () => (
    <View style={StyleSheet.absoluteFill}>
        <LinearGradient colors={['#064E3B', '#065F46']} style={StyleSheet.absoluteFill} />
        <View style={styles.emeraldGlow} />
    </View>
);

export default function Portfolio62({ navigation }) {
    const { personal_info, hero, summary, technical_stack, projects } = portfolioprofile;

    return (
        <View style={styles.container}>
            <EmeraldBackground />
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <ChevronLeft size={24} color="#D1FAE5" />
                    </TouchableOpacity>
                    <Leaf size={24} color="#D1FAE5" fill="#D1FAE5" />
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    <View style={styles.profileBox}>
                        <Animated.View entering={FadeInDown.duration(800)} style={styles.avatarWrap}>
                            <View style={styles.avatarSquare} />
                        </Animated.View>
                        <Animated.Text entering={FadeInDown.delay(200).duration(800)} style={styles.name}>{personal_info.name}</Animated.Text>
                        <Animated.Text entering={FadeInDown.delay(400).duration(800)} style={styles.role}>{personal_info.title.toUpperCase()}</Animated.Text>
                    </View>

                    <View style={styles.linkStack}>
                        <TouchableOpacity style={styles.primaryLink}>
                            <Text style={styles.primaryLinkText}>VIEW MY CASE STUDIES</Text>
                            <Zap size={20} color="#064E3B" fill="#064E3B" />
                        </TouchableOpacity>

                        {projects.slice(0, 5).map((p, i) => (
                            <TouchableOpacity key={p.name} style={styles.secondaryLink}>
                                <View style={styles.dot} />
                                <Text style={styles.secondaryText}>{p.name.toUpperCase()}</Text>
                                <ArrowRight size={18} color="#D1FAE5" />
                            </TouchableOpacity>
                        ))}

                        <TouchableOpacity style={styles.contactLink}>
                            <MessageCircle size={20} color="#D1FAE5" />
                            <Text style={styles.contactText}>LET'S CHAT</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.socialBar}>
                        <TouchableOpacity style={styles.socialIcon}><Globe size={20} color="#D1FAE5" /></TouchableOpacity>
                        <TouchableOpacity style={styles.socialIcon}><Github size={20} color="#D1FAE5" /></TouchableOpacity>
                        <TouchableOpacity style={styles.socialIcon}><Linkedin size={20} color="#D1FAE5" /></TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#064E3B',
    },
    emeraldGlow: {
        position: 'absolute',
        bottom: -100,
        left: -100,
        width: 400,
        height: 400,
        borderRadius: 200,
        backgroundColor: '#10B981',
        opacity: 0.1,
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
        borderRadius: 12,
        backgroundColor: 'rgba(209,250,229,0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(209,250,229,0.2)',
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
    avatarWrap: {
        padding: 6,
        borderRadius: 24,
        borderWidth: 2,
        borderColor: '#10B981',
        marginBottom: 20,
    },
    avatarSquare: {
        width: 70,
        height: 70,
        borderRadius: 18,
        backgroundColor: '#FFF',
    },
    name: {
        fontSize: 28,
        fontWeight: '900',
        color: '#D1FAE5',
        letterSpacing: -1,
        marginBottom: 8,
    },
    role: {
        fontSize: 12,
        fontWeight: '800',
        color: '#10B981',
        letterSpacing: 4,
    },
    linkStack: {
        width: '100%',
        gap: 12,
    },
    primaryLink: {
        width: '100%',
        backgroundColor: '#D1FAE5',
        paddingVertical: 24,
        paddingHorizontal: 24,
        borderRadius: 24,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: '#10B981',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.2,
        shadowRadius: 20,
        elevation: 10,
    },
    primaryLinkText: {
        fontSize: 14,
        fontWeight: '900',
        color: '#064E3B',
        letterSpacing: 1,
    },
    secondaryLink: {
        width: '100%',
        backgroundColor: 'rgba(209,250,229,0.05)',
        paddingVertical: 20,
        paddingHorizontal: 24,
        borderRadius: 24,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(209,250,229,0.1)',
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#10B981',
        marginRight: 16,
    },
    secondaryText: {
        flex: 1,
        fontSize: 12,
        fontWeight: '800',
        color: '#D1FAE5',
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
        color: '#D1FAE5',
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
