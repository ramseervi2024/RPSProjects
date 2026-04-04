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
import { ChevronLeft, ArrowRight, Minus, Maximize2, User, Layout, Smartphone, Mail } from 'lucide-react-native';
import Animated, { FadeIn, FadeInDown, SlideInUp } from 'react-native-reanimated';
import { portfolioprofile } from './portfoliodata';

const { width, height } = Dimensions.get('window');

const MinimalCard = ({ children, style }) => (
    <View style={[styles.soloCard, style]}>
        <View style={styles.cardHeader}>
            <View style={styles.dotGroup}>
                <View style={[styles.dot, { backgroundColor: '#FF5F56' }]} />
                <View style={[styles.dot, { backgroundColor: '#FFBD2E' }]} />
                <View style={[styles.dot, { backgroundColor: '#27C93F' }]} />
            </View>
            <Maximize2 size={14} color="#CCC" />
        </View>
        <View style={styles.cardBody}>
            {children}
        </View>
    </View>
);

export default function Portfolio31({ navigation }) {
    const { personal_info, hero, summary, technical_stack, projects } = portfolioprofile;

    return (
        <View style={styles.container}>
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <ChevronLeft size={24} color="#000" />
                    </TouchableOpacity>
                    <Text style={styles.statusLabel}>MINIMAL_SOLO_31</Text>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    {/* Centered Solo Card Hero */}
                    <View style={styles.heroSection}>
                        <MinimalCard>
                            <Animated.Text entering={FadeIn.duration(1000)} style={styles.cardPre}>{personal_info.title.toUpperCase()}</Animated.Text>
                            <Animated.Text entering={FadeInDown.delay(200).duration(1000)} style={styles.cardTitle}>{personal_info.name}</Animated.Text>
                            <View style={styles.cardDivider} />
                            <Text style={styles.cardHeadline}>{personal_info.headline}</Text>
                            <TouchableOpacity style={styles.cardBtn} onPress={() => navigation.goBack()}>
                                <Text style={styles.cardBtnText}>ESTABLISH CONNECTION</Text>
                                <ArrowRight size={18} color="#FFF" />
                            </TouchableOpacity>
                        </MinimalCard>
                    </View>

                    {/* Sequential Context Cards */}
                    <View style={styles.sequence}>
                        <View style={styles.seqItem}>
                            <Text style={styles.seqLabel}>CHAPTER_01 / NARRATIVE</Text>
                            <Text style={styles.seqText}>{summary}</Text>
                        </View>

                        <View style={styles.seqItem}>
                            <Text style={styles.seqLabel}>CHAPTER_02 / ARCHITECTURE</Text>
                            <View style={styles.skillsGrid}>
                                {technical_stack.mobile.concat(technical_stack.frontend.slice(0, 3)).map((skill) => (
                                    <View key={skill} style={styles.skillChip}>
                                        <Text style={styles.skillText}>{skill.toUpperCase()}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>

                        <View style={styles.seqItem}>
                            <Text style={styles.seqLabel}>CHAPTER_03 / ARTIFACTS</Text>
                            {projects.slice(0, 3).map((p, i) => (
                                <TouchableOpacity key={p.name} style={styles.miniLog}>
                                    <View style={styles.logLeft}>
                                        <Text style={styles.logTitle}>{p.name.toUpperCase()}</Text>
                                        <Text style={styles.logCat}>{p.category.toUpperCase()}</Text>
                                    </View>
                                    <ArrowRight size={20} color="#CCC" />
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    {/* Dynamic Footer */}
                    <View style={styles.footer}>
                        <View style={styles.footerCircle} />
                        <Text style={styles.footerText}>LESS_IS_MORE_ARCHITECTURE_2026</Text>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3F4F6',
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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
    },
    statusLabel: {
        fontSize: 10,
        fontWeight: '900',
        color: '#999',
        letterSpacing: 2,
    },
    scrollContent: {
        paddingBottom: 60,
    },
    heroSection: {
        paddingHorizontal: 24,
        paddingVertical: 40,
        alignItems: 'center',
    },
    soloCard: {
        width: '100%',
        backgroundColor: '#FFF',
        borderRadius: 32,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 20 },
        shadowOpacity: 0.1,
        shadowRadius: 40,
        elevation: 20,
        overflow: 'hidden',
    },
    cardHeader: {
        height: 50,
        backgroundColor: '#F9FAFB',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    dotGroup: {
        flexDirection: 'row',
        gap: 6,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    cardBody: {
        padding: 40,
        alignItems: 'center',
    },
    cardPre: {
        fontSize: 11,
        fontWeight: '900',
        color: '#666',
        letterSpacing: 4,
        marginBottom: 16,
    },
    cardTitle: {
        fontSize: 42,
        fontWeight: '900',
        color: '#000',
        textAlign: 'center',
        marginBottom: 24,
        letterSpacing: -2,
    },
    cardDivider: {
        width: 40,
        height: 2,
        backgroundColor: '#EEE',
        marginBottom: 24,
    },
    cardHeadline: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        lineHeight: 26,
        marginBottom: 40,
        paddingHorizontal: 20,
    },
    cardBtn: {
        backgroundColor: '#000',
        paddingVertical: 20,
        paddingHorizontal: 40,
        borderRadius: 100,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    cardBtnText: {
        color: '#FFF',
        fontSize: 13,
        fontWeight: '900',
        letterSpacing: 1,
    },
    sequence: {
        paddingHorizontal: 24,
        marginTop: 40,
        gap: 40,
    },
    seqItem: {
        gap: 16,
    },
    seqLabel: {
        fontSize: 10,
        fontWeight: '900',
        color: '#CCC',
        letterSpacing: 2,
    },
    seqText: {
        fontSize: 16,
        lineHeight: 28,
        color: '#444',
    },
    skillsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    skillChip: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        backgroundColor: '#FFF',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#EEE',
    },
    skillText: {
        fontSize: 11,
        fontWeight: '900',
        color: '#000',
    },
    miniLog: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
    },
    logLeft: {
        gap: 4,
    },
    logTitle: {
        fontSize: 16,
        fontWeight: '900',
        color: '#000',
    },
    logCat: {
        fontSize: 10,
        fontWeight: '900',
        color: '#AAA',
        letterSpacing: 1,
    },
    footer: {
        paddingVertical: 60,
        alignItems: 'center',
        gap: 16,
    },
    footerCircle: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#DDD',
    },
    footerText: {
        fontSize: 10,
        fontWeight: '900',
        color: '#999',
        letterSpacing: 3,
    }
});
