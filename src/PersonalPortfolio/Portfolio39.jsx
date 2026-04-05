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
import { ChevronLeft, ArrowRight, Grid, Zap, Activity, Shield, Hash, Layout } from 'lucide-react-native';
import Animated, { FadeIn, FadeInDown, SlideInRight } from 'react-native-reanimated';
import { portfolioprofile } from './portfoliodata';

const { width, height } = Dimensions.get('window');

const SwissLabel = ({ text, sub }) => (
    <View style={styles.swissLabel}>
        <Text style={styles.labelNum}>{sub}</Text>
        <Text style={styles.labelText}>{text.toUpperCase()}</Text>
    </View>
);

export default function Portfolio39({ navigation }) {
    const { personal_info, hero, summary, technical_stack, projects } = portfolioprofile;

    return (
        <View style={styles.container}>
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.navBtn}>
                        <ChevronLeft size={32} color="#000" />
                    </TouchableOpacity>
                    <View style={styles.headerInfo}>
                        <Text style={styles.headerGrid}>GRID_80_V39</Text>
                        <Text style={styles.headerDate}>2026_COLLECTION</Text>
                    </View>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    {/* Massive Swiss Header */}
                    <View style={styles.heroSection}>
                        <View style={styles.heroAccent} />
                        <Animated.Text entering={FadeIn.duration(1000)} style={styles.nameLarge}>
                            {personal_info.name.split(' ')[0].toUpperCase()}
                            {'\n'}
                            {personal_info.name.split(' ')[1].toUpperCase()}
                        </Animated.Text>
                        <View style={styles.heroMeta}>
                            <Text style={styles.heroTitle}>CROSS_PLATFORM_ENGINEER</Text>
                            <Text style={styles.heroLoc}>BENGALURU_IND_GLOBAL_AVAILABILITY</Text>
                        </View>
                    </View>

                    {/* Section 01: Narrative */}
                    <View style={styles.section}>
                        <SwissLabel text="Philosophy" sub="01" />
                        <View style={styles.narrativeWrap}>
                            <Text style={styles.summaryText}>{summary}</Text>
                        </View>
                    </View>

                    {/* Section 02: Expertise */}
                    <View style={styles.section}>
                        <SwissLabel text="Hardware" sub="02" />
                        <View style={styles.skillsGrid}>
                            {technical_stack.mobile.concat(technical_stack.frontend.slice(0, 3)).map((skill) => (
                                <View key={skill} style={styles.skillItem}>
                                    <View style={styles.skillDot} />
                                    <Text style={styles.skillText}>{skill.toUpperCase()}</Text>
                                </View>
                            ))}
                        </View>
                    </View>

                    {/* Section 03: Artifacts */}
                    <View style={styles.section}>
                        <SwissLabel text="Artifacts" sub="03" />
                        {projects.slice(0, 4).map((p, i) => (
                            <TouchableOpacity key={p.name} style={styles.projectStrip}>
                                <View style={styles.stripLeft}>
                                    <Text style={styles.stripIndex}>P_0{i + 1}</Text>
                                    <Text style={styles.stripName}>{p.name.toUpperCase()}</Text>
                                </View>
                                <ArrowRight size={28} color="#000" />
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Final Assembly */}
                    <TouchableOpacity style={styles.footerBtn} onPress={() => navigation.goBack()}>
                        <View style={styles.footerInner}>
                            <Text style={styles.footerText}>INITIATE_CONTACT</Text>
                            <View style={styles.footerBox} />
                        </View>
                    </TouchableOpacity>

                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingVertical: 24,
        borderBottomWidth: 2,
        borderBottomColor: '#000',
    },
    navBtn: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerInfo: {
        alignItems: 'flex-end',
    },
    headerGrid: {
        fontSize: 10,
        fontWeight: '900',
        color: '#E63946',
        letterSpacing: 2,
    },
    headerDate: {
        fontSize: 10,
        fontWeight: '900',
        color: '#000',
        letterSpacing: 4,
    },
    scrollContent: {
        paddingBottom: 60,
    },
    heroSection: {
        paddingHorizontal: 24,
        paddingVertical: 80,
        borderBottomWidth: 2,
        borderBottomColor: '#000',
    },
    heroAccent: {
        width: 80,
        height: 80,
        backgroundColor: '#E63946',
        position: 'absolute',
        top: 20,
        right: 40,
        zIndex: -1,
    },
    nameLarge: {
        fontSize: 92,
        fontWeight: '900',
        color: '#000',
        lineHeight: 82,
        letterSpacing: -5,
        marginBottom: 40,
    },
    heroMeta: {
        gap: 8,
    },
    heroTitle: {
        fontSize: 14,
        fontWeight: '900',
        letterSpacing: 4,
    },
    heroLoc: {
        fontSize: 10,
        fontWeight: '900',
        color: '#999',
        letterSpacing: 2,
    },
    section: {
        paddingHorizontal: 24,
        paddingVertical: 60,
        borderBottomWidth: 2,
        borderBottomColor: '#000',
    },
    swissLabel: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
        marginBottom: 40,
    },
    labelNum: {
        fontSize: 16,
        fontWeight: '900',
        color: '#E63946',
    },
    labelText: {
        fontSize: 16,
        fontWeight: '900',
        letterSpacing: 4,
    },
    narrativeWrap: {
        paddingRight: 40,
    },
    summaryText: {
        fontSize: 28,
        lineHeight: 42,
        fontWeight: '700',
        color: '#000',
        letterSpacing: -1,
    },
    skillsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 24,
    },
    skillItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        width: '45%',
    },
    skillDot: {
        width: 12,
        height: 12,
        backgroundColor: '#000',
    },
    skillText: {
        fontSize: 14,
        fontWeight: '900',
        letterSpacing: 1,
    },
    projectStrip: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 32,
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
    },
    stripLeft: {
        gap: 8,
    },
    stripIndex: {
        fontSize: 10,
        fontWeight: '900',
        color: '#E63946',
    },
    stripName: {
        fontSize: 32,
        fontWeight: '900',
        letterSpacing: -1,
    },
    footerBtn: {
        padding: 24,
        paddingTop: 80,
    },
    footerInner: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    footerText: {
        fontSize: 42,
        fontWeight: '900',
        letterSpacing: -2,
    },
    footerBox: {
        width: 40,
        height: 40,
        backgroundColor: '#000',
    }
});
