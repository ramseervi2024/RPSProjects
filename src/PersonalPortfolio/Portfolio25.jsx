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
import { ChevronLeft, Triangle, Square, Circle, ArrowRight, Zap, Target } from 'lucide-react-native';
import Animated, { FadeIn, FadeInDown, SlideInRight } from 'react-native-reanimated';
import { portfolioprofile } from './portfoliodata';

const { width, height } = Dimensions.get('window');

const GeometryShape = ({ style, type: Icon, color = '#000', size = 100 }) => (
    <View style={[styles.shape, style]}>
        <Icon size={size} color={color} strokeWidth={2} />
    </View>
);

export default function Portfolio25({ navigation }) {
    const { personal_info, hero, summary, technical_stack, projects } = portfolioprofile;

    return (
        <View style={styles.container}>
            <SafeAreaView style={{ flex: 1 }}>
                {/* Background Art */}
                <GeometryShape type={Triangle} color="rgba(239, 68, 68, 0.1)" size={400} style={{ top: -100, right: -150, transform: [{ rotate: '45deg' }] }} />
                <GeometryShape type={Square} color="rgba(59, 130, 246, 0.1)" size={300} style={{ bottom: 0, left: -100, transform: [{ rotate: '-15deg' }] }} />
                <GeometryShape type={Circle} color="rgba(245, 158, 11, 0.1)" size={200} style={{ top: '40%', left: -50 }} />

                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <ChevronLeft size={28} color="#000" />
                    </TouchableOpacity>
                    <Text style={styles.navLabel}>ABSTRACT_25</Text>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    {/* Hero Composition */}
                    <View style={styles.heroWrap}>
                        <View style={styles.heroArt}>
                            <View style={styles.redBlock} />
                            <View style={styles.blueBorder} />
                        </View>
                        <Animated.Text entering={FadeInDown.duration(1000)} style={styles.greet}>COMPOSING_DIGITAL...</Animated.Text>
                        <Animated.Text entering={FadeInDown.delay(200).duration(1000)} style={styles.name}>{personal_info.name.toUpperCase()}</Animated.Text>
                        <View style={styles.blackLine} />
                        <Text style={styles.headline}>{personal_info.headline.toUpperCase()}</Text>
                    </View>

                    {/* Section: Theory */}
                    <View style={styles.section}>
                        <View style={styles.labelGroup}>
                            <Target size={16} color="#EF4448" />
                            <Text style={styles.sectionLabel}>01_MODERN_THEORY</Text>
                        </View>
                        <Text style={styles.summaryText}>{summary}</Text>
                    </View>

                    {/* Section: Elements (Skills) */}
                    <View style={styles.section}>
                        <View style={styles.labelGroup}>
                            <Zap size={16} color="#3B82F6" />
                            <Text style={styles.sectionLabel}>02_CORE_ELEMENTS</Text>
                        </View>
                        <View style={styles.elementsGrid}>
                            {technical_stack.mobile.concat(technical_stack.frontend.slice(0, 4)).map((skill, i) => (
                                <View key={skill} style={[styles.elementItem, { borderLeftColor: i % 2 === 0 ? '#EF4444' : '#3B82F6' }]}>
                                    <Text style={styles.elementText}>{skill.toUpperCase()}</Text>
                                </View>
                            ))}
                        </View>
                    </View>

                    {/* Section: Exhibition (Projects) */}
                    <View style={styles.section}>
                        <View style={styles.labelGroup}>
                            <Triangle size={16} color="#F59E0B" />
                            <Text style={styles.sectionLabel}>03_EXHIBITION_GALLERY</Text>
                        </View>
                        {projects.slice(0, 4).map((p, i) => (
                            <TouchableOpacity key={p.name} style={styles.projectBlock}>
                                <View style={styles.projectHeader}>
                                    <Text style={styles.projectIndex}>VOL_{i + 1}</Text>
                                    <Text style={styles.projectName}>{p.name.toUpperCase()}</Text>
                                </View>
                                <Text style={styles.projectDesc}>{p.description.slice(0, 100)}...</Text>
                                <View style={styles.projectActions}>
                                    <Text style={styles.projectCat}>{p.category.toUpperCase()}</Text>
                                    <ArrowRight size={20} color="#000" />
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Final Signature */}
                    <TouchableOpacity style={styles.footerBtn} onPress={() => navigation.goBack()}>
                        <Text style={styles.footerBtnText}>INITIATE_COLLABORATION</Text>
                        <View style={styles.dot} />
                    </TouchableOpacity>

                    <View style={styles.copyright}>
                        <Text style={styles.copyText}>© 2026 GEOMETRIC_ARCHIVE</Text>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    shape: {
        position: 'absolute',
        zIndex: -1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        paddingVertical: 16,
    },
    backBtn: {
        width: 48,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#EEE',
    },
    navLabel: {
        fontSize: 10,
        fontWeight: '900',
        color: '#999',
        letterSpacing: 4,
    },
    scrollContent: {
        paddingHorizontal: 30,
        paddingBottom: 60,
    },
    heroWrap: {
        paddingVertical: 60,
    },
    heroArt: {
        position: 'absolute',
        top: 20,
        right: 0,
        width: 100,
        height: 100,
    },
    redBlock: {
        width: 40,
        height: 40,
        backgroundColor: '#EF4444',
        position: 'absolute',
        top: 0,
        left: 0,
    },
    blueBorder: {
        width: 60,
        height: 60,
        borderWidth: 8,
        borderColor: '#3B82F6',
        position: 'absolute',
        bottom: 0,
        right: 0,
        zIndex: -1,
    },
    greet: {
        fontSize: 12,
        fontWeight: '900',
        color: '#EF4444',
        letterSpacing: 4,
        marginBottom: 16,
    },
    name: {
        fontSize: 56,
        fontWeight: '900',
        color: '#000',
        lineHeight: 52,
        letterSpacing: -3,
        marginBottom: 20,
    },
    blackLine: {
        width: 60,
        height: 8,
        backgroundColor: '#000',
        marginBottom: 24,
    },
    headline: {
        fontSize: 18,
        fontWeight: '900',
        color: '#333',
        lineHeight: 26,
    },
    section: {
        marginBottom: 60,
    },
    labelGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 24,
    },
    sectionLabel: {
        fontSize: 11,
        fontWeight: '900',
        color: '#000',
        letterSpacing: 2,
    },
    summaryText: {
        fontSize: 18,
        lineHeight: 30,
        color: '#444',
        fontWeight: '500',
    },
    elementsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 16,
    },
    elementItem: {
        width: '100%',
        paddingVertical: 16,
        paddingHorizontal: 20,
        backgroundColor: '#FFF',
        borderLeftWidth: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
    },
    elementText: {
        fontSize: 14,
        fontWeight: '900',
        color: '#000',
        letterSpacing: 1,
    },
    projectBlock: {
        backgroundColor: '#FFF',
        padding: 30,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#EEE',
    },
    projectHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
        marginBottom: 16,
    },
    projectIndex: {
        fontSize: 10,
        fontWeight: '900',
        color: '#FFF',
        backgroundColor: '#000',
        paddingHorizontal: 6,
        paddingVertical: 2,
    },
    projectName: {
        fontSize: 24,
        fontWeight: '900',
        color: '#000',
        flex: 1,
    },
    projectDesc: {
        fontSize: 16,
        color: '#666',
        lineHeight: 24,
        marginBottom: 24,
    },
    projectActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    projectCat: {
        fontSize: 10,
        fontWeight: '900',
        color: '#999',
        letterSpacing: 1,
    },
    footerBtn: {
        backgroundColor: '#000',
        padding: 30,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
    },
    footerBtnText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: '900',
        letterSpacing: 2,
    },
    dot: {
        width: 12,
        height: 12,
        backgroundColor: '#EF4444',
    },
    copyright: {
        alignItems: 'center',
        paddingVertical: 40,
    },
    copyText: {
        fontSize: 10,
        fontWeight: '900',
        color: '#BBB',
        letterSpacing: 3,
    }
});
