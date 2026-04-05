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
import { ChevronLeft, ArrowRight, Sun, Layers, Leaf, Zap, Github, Globe } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { portfolioprofile } from './portfoliodata';

const { width, height } = Dimensions.get('window');

const ZebraPattern = () => {
    return (
        <View style={StyleSheet.absoluteFill}>
            <LinearGradient colors={['#F5F5F0', '#E0E0D8']} style={StyleSheet.absoluteFill} />
            <View style={styles.zebraOverlay}>
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <View key={i} style={[styles.zebraLine, { top: i * 150, transform: [{ rotate: '-15deg' }, { scaleX: 1.5 }] }]} />
                ))}
            </View>
        </View>
    );
};

export default function Portfolio58({ navigation }) {
    const { personal_info, hero, summary, technical_stack, projects } = portfolioprofile;

    return (
        <View style={styles.container}>
            <ZebraPattern />
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <ChevronLeft size={24} color="#333" />
                    </TouchableOpacity>
                    <Leaf size={24} color="#8B4513" />
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    <View style={styles.heroSection}>
                        <Animated.Text entering={FadeInDown.duration(800)} style={styles.preTitle}>ESSENTIAL_CORE_V58</Animated.Text>
                        <Animated.Text entering={FadeInDown.delay(200).duration(800)} style={styles.name}>{personal_info.name.toUpperCase()}</Animated.Text>
                        <View style={styles.divider} />
                        <Animated.Text entering={FadeInDown.delay(400).duration(800)} style={styles.role}>{personal_info.title}</Animated.Text>
                    </View>

                    <View style={styles.linkStack}>
                        <TouchableOpacity style={styles.mainLink}>
                            <View style={styles.linkInner}>
                                <Layers size={20} color="#FFF" />
                                <Text style={styles.mainLinkText}>EXPLORE_SYSTEMS</Text>
                            </View>
                            <ArrowRight size={20} color="#FFF" />
                        </TouchableOpacity>

                        {projects.slice(0, 5).map((p, i) => (
                            <TouchableOpacity key={p.name} style={styles.subLink}>
                                <Text style={styles.subLinkText}>{p.name.toUpperCase()}</Text>
                                <ArrowRight size={18} color="#333" />
                            </TouchableOpacity>
                        ))}

                        <TouchableOpacity style={styles.footerLink}>
                            <Text style={styles.footerLinkText}>INITIATE_COLLABORATION</Text>
                            <Zap size={20} color="#8B4513" fill="#8B4513" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.socialBar}>
                        <TouchableOpacity style={styles.socialIcon}><Github size={20} color="#333" /></TouchableOpacity>
                        <TouchableOpacity style={styles.socialIcon}><Globe size={20} color="#333" /></TouchableOpacity>
                        <TouchableOpacity style={styles.socialIcon}><Sun size={20} color="#333" /></TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F0',
    },
    zebraOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0.05,
    },
    zebraLine: {
        position: 'absolute',
        width: width * 2,
        height: 80,
        backgroundColor: '#000',
        borderRadius: 40,
        left: -width * 0.5,
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
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E0E0D8',
    },
    scrollContent: {
        paddingHorizontal: 24,
        paddingBottom: 40,
        alignItems: 'center',
    },
    heroSection: {
        alignItems: 'center',
        marginVertical: 40,
    },
    preTitle: {
        fontSize: 10,
        fontWeight: '900',
        color: '#8B4513',
        letterSpacing: 4,
        marginBottom: 16,
    },
    name: {
        fontSize: 42,
        fontWeight: '900',
        color: '#1A1A1A',
        textAlign: 'center',
        marginBottom: 20,
        letterSpacing: -2,
    },
    divider: {
        width: 40,
        height: 4,
        backgroundColor: '#8B4513',
        marginBottom: 20,
    },
    role: {
        fontSize: 14,
        fontWeight: '700',
        color: '#666',
        letterSpacing: 2,
        textAlign: 'center',
    },
    linkStack: {
        width: '100%',
        gap: 12,
    },
    mainLink: {
        width: '100%',
        backgroundColor: '#1A1A1A',
        paddingVertical: 24,
        paddingHorizontal: 24,
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    linkInner: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    mainLinkText: {
        fontSize: 14,
        fontWeight: '900',
        color: '#FFF',
        letterSpacing: 2,
    },
    subLink: {
        width: '100%',
        backgroundColor: '#FFF',
        paddingVertical: 20,
        paddingHorizontal: 24,
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E0E0D8',
    },
    subLinkText: {
        fontSize: 12,
        fontWeight: '800',
        color: '#333',
        letterSpacing: 1,
    },
    footerLink: {
        width: '100%',
        backgroundColor: 'rgba(139,69,19,0.1)',
        paddingVertical: 24,
        paddingHorizontal: 24,
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#8B4513',
        marginTop: 12,
    },
    footerLinkText: {
        fontSize: 12,
        fontWeight: '900',
        color: '#8B4513',
        letterSpacing: 2,
    },
    socialBar: {
        flexDirection: 'row',
        marginTop: 40,
        gap: 30,
    },
    socialIcon: {
        padding: 10,
    }
});
