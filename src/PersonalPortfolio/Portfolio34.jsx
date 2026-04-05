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
import { ChevronLeft, Gamepad2, Database, Zap, Cpu, ArrowRight, Power } from 'lucide-react-native';
import Animated, { FadeIn, FadeInDown, SlideInRight } from 'react-native-reanimated';
import { portfolioprofile } from './portfoliodata';

const { width } = Dimensions.get('window');

const PixelCard = ({ children, style }) => (
    <View style={[styles.pixelCard, style]}>
        <View style={styles.pixelContent}>
            {children}
        </View>
    </View>
);

export default function Portfolio34({ navigation }) {
    const { personal_info, hero, summary, technical_stack, projects } = portfolioprofile;

    return (
        <View style={styles.container}>
            <View style={styles.backgroundLayer}>
                <View style={[styles.scanline, { top: '10%', opacity: 0.05 }]} />
                <View style={[styles.scanline, { top: '30%', opacity: 0.05 }]} />
                <View style={[styles.scanline, { top: '50%', opacity: 0.05 }]} />
                <View style={[styles.scanline, { top: '70%', opacity: 0.05 }]} />
            </View>

            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.powerBtn}>
                        <Power size={20} color="#1A2F1A" />
                    </TouchableOpacity>
                    <View style={styles.lcdHeader}>
                        <Text style={styles.lcdLabel}>PORTFOLIO_OS</Text>
                        <Text style={styles.lcdVersion}>v1.0.34</Text>
                    </View>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    {/* Hero LCD Screen */}
                    <PixelCard style={styles.heroScreen}>
                        <Animated.Text entering={FadeIn.duration(1000)} style={styles.greet}>[ SYSTEM_READY ]</Animated.Text>
                        <Animated.Text entering={FadeInDown.delay(200).duration(1000)} style={styles.name}>{personal_info.name.toUpperCase()}</Animated.Text>
                        <View style={styles.pixelLine} />
                        <Text style={styles.headline}>{personal_info.headline.toUpperCase()}</Text>
                        <View style={styles.heroFooter}>
                            <Gamepad2 size={16} color="#1A2F1A" />
                            <Text style={styles.footerText}>PRESS_START_TO_SCROLL</Text>
                        </View>
                    </PixelCard>

                    {/* Data Block (Summary) */}
                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <Database size={14} color="#1A2F1A" />
                            <Text style={styles.sectionTitle}>BIOS_MANIFEST</Text>
                        </View>
                        <PixelCard>
                            <Text style={styles.summaryText}>{summary}</Text>
                        </PixelCard>
                    </View>

                    {/* Hardware Specs (Skills) */}
                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <Cpu size={14} color="#1A2F1A" />
                            <Text style={styles.sectionTitle}>HARDWARE_SPECS</Text>
                        </View>
                        <View style={styles.skillsGrid}>
                            {technical_stack.mobile.concat(technical_stack.frontend.slice(0, 3)).map((skill) => (
                                <View key={skill} style={styles.skillBlock}>
                                    <View style={styles.blockInner}>
                                        <Text style={styles.skillText}>{skill.toUpperCase()}</Text>
                                    </View>
                                </View>
                            ))}
                        </View>
                    </View>

                    {/* Game Cartridges (Projects) */}
                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <Zap size={14} color="#1A2F1A" />
                            <Text style={styles.sectionTitle}>PROJECT_CARTRIDGES</Text>
                        </View>
                        {projects.slice(0, 4).map((p, i) => (
                            <TouchableOpacity key={p.name} style={styles.cartridge}>
                                <View style={styles.cartridgeTop}>
                                    <View style={styles.cartridgeGrip} />
                                    <View style={styles.cartridgeGrip} />
                                    <View style={styles.cartridgeGrip} />
                                </View>
                                <View style={styles.cartridgeLabel}>
                                    <View style={styles.labelHeader}>
                                        <Text style={styles.labelIndex}>LEVEL_{i + 1}</Text>
                                        <Text style={styles.labelName}>{p.name.toUpperCase()}</Text>
                                    </View>
                                    <Text style={styles.labelDesc}>{p.description.slice(0, 80)}...</Text>
                                    <View style={styles.labelFooter}>
                                        <Text style={styles.labelCat}>{p.category.toUpperCase()}</Text>
                                        <ArrowRight size={18} color="#FFF" />
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Final High Score */}
                    <TouchableOpacity style={styles.contactBtn} onPress={() => navigation.goBack()}>
                        <Text style={styles.contactBtnText}>ESTABLISH_UPLINK</Text>
                        <View style={styles.btnAccent} />
                    </TouchableOpacity>

                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#8FA38F', // GameBoy Green Background
    },
    backgroundLayer: {
        ...StyleSheet.absoluteFillObject,
        opacity: 0.1,
    },
    scanline: {
        position: 'absolute',
        left: 0,
        right: 0,
        height: 1,
        backgroundColor: '#000',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingVertical: 16,
    },
    powerBtn: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#7A8C7A',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#1A2F1A',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    lcdHeader: {
        alignItems: 'flex-end',
    },
    lcdLabel: {
        fontSize: 10,
        fontWeight: '900',
        color: '#1A2F1A',
        letterSpacing: 2,
    },
    lcdVersion: {
        fontSize: 8,
        fontWeight: '900',
        color: '#1A2F1A',
        opacity: 0.5,
    },
    scrollContent: {
        paddingHorizontal: 24,
        paddingBottom: 60,
    },
    pixelCard: {
        backgroundColor: '#9BAF9B',
        borderWidth: 3,
        borderColor: '#1A2F1A',
        borderRadius: 8,
        padding: 4,
        marginBottom: 32,
    },
    pixelContent: {
        backgroundColor: '#A9BFA9',
        borderWidth: 1,
        borderColor: '#1A2F1A',
        padding: 24,
        borderRadius: 2,
    },
    heroScreen: {
        marginTop: 10,
        height: 280,
        justifyContent: 'center',
    },
    greet: {
        fontSize: 10,
        fontWeight: '900',
        color: '#1A2F1A',
        letterSpacing: 3,
        textAlign: 'center',
        marginBottom: 20,
    },
    name: {
        fontSize: 40,
        fontWeight: '900',
        color: '#1A2F1A',
        textAlign: 'center',
        lineHeight: 40,
        marginBottom: 16,
    },
    pixelLine: {
        height: 4,
        backgroundColor: '#1A2F1A',
        marginBottom: 20,
        width: 60,
        alignSelf: 'center',
    },
    headline: {
        fontSize: 12,
        fontWeight: '900',
        color: '#1A2F1A',
        textAlign: 'center',
        lineHeight: 18,
        paddingHorizontal: 10,
        marginBottom: 24,
    },
    heroFooter: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 12,
    },
    footerText: {
        fontSize: 9,
        fontWeight: '900',
        color: '#1A2F1A',
        opacity: 0.6,
    },
    section: {
        marginBottom: 40,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 11,
        fontWeight: '900',
        color: '#1A2F1A',
        letterSpacing: 2,
    },
    summaryText: {
        fontSize: 14,
        lineHeight: 22,
        color: '#1A2F1A',
        fontWeight: '800',
    },
    skillsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    skillBlock: {
        width: (width - 72) / 2,
        backgroundColor: '#1A2F1A',
        padding: 2,
        borderRadius: 4,
    },
    blockInner: {
        backgroundColor: '#A9BFA9',
        paddingVertical: 12,
        alignItems: 'center',
        borderRadius: 2,
    },
    skillText: {
        fontSize: 10,
        fontWeight: '900',
        color: '#1A2F1A',
    },
    cartridge: {
        marginBottom: 20,
    },
    cartridgeTop: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 8,
        marginBottom: -4,
        zIndex: 1,
    },
    cartridgeGrip: {
        width: 12,
        height: 8,
        backgroundColor: '#7A8C7A',
        borderWidth: 2,
        borderColor: '#1A2F1A',
        borderBottomWidth: 0,
    },
    cartridgeLabel: {
        backgroundColor: '#1A2F1A',
        padding: 24,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: '#1A2F1A',
    },
    labelHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    labelIndex: {
        fontSize: 9,
        fontWeight: '900',
        color: '#8FA38F',
    },
    labelName: {
        fontSize: 18,
        fontWeight: '900',
        color: '#FFF',
    },
    labelDesc: {
        fontSize: 13,
        color: '#A9BFA9',
        lineHeight: 20,
        fontWeight: '700',
        marginBottom: 20,
    },
    labelFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    labelCat: {
        fontSize: 9,
        fontWeight: '900',
        color: '#8FA38F',
    },
    contactBtn: {
        marginTop: 20,
        backgroundColor: '#1A2F1A',
        paddingVertical: 24,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 16,
        borderRadius: 8,
    },
    contactBtnText: {
        fontSize: 13,
        fontWeight: '900',
        color: '#FFF',
        letterSpacing: 2,
    },
    btnAccent: {
        width: 10,
        height: 10,
        backgroundColor: '#8FA38F',
        transform: [{ rotate: '45deg' }],
    }
});
