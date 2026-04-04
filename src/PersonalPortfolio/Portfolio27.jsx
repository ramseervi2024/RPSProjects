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
import { ChevronLeft, ArrowUpRight, Plus, Minus, Info, Globe, Mail } from 'lucide-react-native';
import Animated, { FadeIn, FadeInDown, SlideInLeft } from 'react-native-reanimated';
import { portfolioprofile } from './portfoliodata';

const { width } = Dimensions.get('window');

const IndexRow = ({ label, title, index, active = false }) => (
    <TouchableOpacity style={styles.indexRow}>
        <View style={styles.indexLeft}>
            <Text style={styles.indexLabel}>{label.toUpperCase()}</Text>
            <Text style={styles.indexTitle}>{title.toUpperCase()}</Text>
        </View>
        <View style={styles.indexRight}>
            <Text style={styles.indexNumber}>[{index.toString().padStart(2, '0')}]</Text>
            <ArrowUpRight size={24} color={active ? '#000' : '#CCC'} />
        </View>
    </TouchableOpacity>
);

export default function Portfolio27({ navigation }) {
    const { personal_info, hero, summary, technical_stack, projects } = portfolioprofile;

    return (
        <View style={styles.container}>
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <ChevronLeft size={24} color="#000" />
                        <Text style={styles.backText}>CLOSE_ARCHIVE</Text>
                    </TouchableOpacity>
                    <Text style={styles.navDate}>2026_EDITION</Text>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    {/* Massive Header */}
                    <View style={styles.heroSection}>
                        <Animated.Text entering={FadeIn.duration(1000)} style={styles.archiveLabel}>PORTFOLIO_INDEX</Animated.Text>
                        <Animated.Text entering={SlideInLeft.delay(200).duration(1000)} style={styles.nameLarge}>
                            {personal_info.name.toUpperCase()}
                        </Animated.Text>
                        <View style={styles.heroMeta}>
                            <View style={styles.metaLine} />
                            <Text style={styles.metaText}>{personal_info.title.toUpperCase()} / BENGALURU, IN</Text>
                        </View>
                    </View>

                    {/* Content Sections as Index */}
                    <View style={styles.archiveList}>
                        <View style={styles.sectionDivider}>
                            <Text style={styles.dividerText}>01 / PROLOGUE</Text>
                        </View>
                        <View style={styles.prologueWrap}>
                            <Text style={styles.prologueText}>{summary}</Text>
                        </View>

                        <View style={styles.sectionDivider}>
                            <Text style={styles.dividerText}>02 / CAPABILITIES</Text>
                        </View>
                        {technical_stack.mobile.concat(technical_stack.frontend.slice(0, 3)).map((skill, i) => (
                            <IndexRow key={skill} label="Skillset" title={skill} index={i + 1} />
                        ))}

                        <View style={styles.sectionDivider}>
                            <Text style={styles.dividerText}>03 / EXHIBITS</Text>
                        </View>
                        {projects.slice(0, 5).map((p, i) => (
                            <IndexRow key={p.name} label={p.category} title={p.name} index={i + 1} active />
                        ))}

                        <View style={styles.sectionDivider}>
                            <Text style={styles.dividerText}>04 / TERMINAL</Text>
                        </View>
                        <TouchableOpacity style={styles.footerRow} onPress={() => navigation.goBack()}>
                            <Text style={styles.footerLarge}>INITIATE_CONTACT</Text>
                            <View style={styles.footerCircle}>
                                <Plus size={32} color="#FFF" />
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.bottomMeta}>
                        <Text style={styles.bottomText}>ALL_RIGHTS_RESERVED_2026</Text>
                        <View style={styles.bottomLine} />
                    </View>
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
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
    },
    backBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    backText: {
        fontSize: 10,
        fontWeight: '900',
        letterSpacing: 2,
    },
    navDate: {
        fontSize: 10,
        fontWeight: '900',
        color: '#999',
        letterSpacing: 3,
    },
    scrollContent: {
        paddingBottom: 60,
    },
    heroSection: {
        paddingHorizontal: 24,
        paddingVertical: 60,
        backgroundColor: '#F9F9F9',
    },
    archiveLabel: {
        fontSize: 10,
        fontWeight: '900',
        color: '#666',
        letterSpacing: 6,
        marginBottom: 16,
    },
    nameLarge: {
        fontSize: 84,
        fontWeight: '900',
        color: '#000',
        lineHeight: 74,
        letterSpacing: -5,
        marginBottom: 32,
    },
    heroMeta: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    metaLine: {
        width: 40,
        height: 2,
        backgroundColor: '#000',
    },
    metaText: {
        fontSize: 12,
        fontWeight: '900',
        letterSpacing: 2,
    },
    archiveList: {
        paddingHorizontal: 24,
    },
    sectionDivider: {
        paddingVertical: 32,
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        marginBottom: 16,
    },
    dividerText: {
        fontSize: 12,
        fontWeight: '900',
        letterSpacing: 4,
    },
    prologueWrap: {
        paddingVertical: 20,
        marginBottom: 40,
    },
    prologueText: {
        fontSize: 24,
        lineHeight: 36,
        color: '#333',
        fontWeight: '400',
    },
    indexRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 24,
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
    },
    indexLeft: {
        gap: 4,
    },
    indexLabel: {
        fontSize: 10,
        fontWeight: '900',
        color: '#AAA',
        letterSpacing: 1,
    },
    indexTitle: {
        fontSize: 28,
        fontWeight: '900',
        color: '#000',
        letterSpacing: -0.5,
    },
    indexRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    indexNumber: {
        fontSize: 12,
        fontFamily: 'monospace',
        color: '#CCC',
    },
    footerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 60,
        marginTop: 40,
    },
    footerLarge: {
        fontSize: 48,
        fontWeight: '900',
        letterSpacing: -2,
    },
    footerCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomMeta: {
        paddingHorizontal: 24,
        paddingTop: 40,
    },
    bottomText: {
        fontSize: 10,
        fontWeight: '900',
        color: '#DDD',
        letterSpacing: 4,
        marginBottom: 8,
    },
    bottomLine: {
        height: 1,
        backgroundColor: '#EEE',
    }
});
