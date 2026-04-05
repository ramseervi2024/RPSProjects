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
import { ChevronLeft, Maximize, Target, Zap, Activity, Shield, Hash, ArrowUpRight } from 'lucide-react-native';
import Animated, { FadeIn, FadeInDown, SlideInRight } from 'react-native-reanimated';
import { portfolioprofile } from './portfoliodata';

const { width } = Dimensions.get('window');

const BrutalSection = ({ title, sub, children }) => (
    <View style={styles.section}>
        <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{title.toUpperCase()}</Text>
            <View style={styles.brutalLine} />
            <Text style={styles.sectionSub}>{sub.toUpperCase()}</Text>
        </View>
        <View style={styles.sectionContent}>
            {children}
        </View>
    </View>
);

export default function Portfolio44({ navigation }) {
    const { personal_info, hero, summary, technical_stack, projects } = portfolioprofile;

    return (
        <View style={styles.container}>
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.navBtn}>
                        <ChevronLeft size={32} color="#000" strokeWidth={3} />
                    </TouchableOpacity>
                    <View style={styles.headerBadge}>
                        <Hash size={16} color="#000" strokeWidth={3} />
                        <Text style={styles.headerText}>BRUTAL_44</Text>
                    </View>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    {/* Brutal Hero */}
                    <View style={styles.heroSection}>
                        <View style={styles.heroTop}>
                            <Animated.Text entering={FadeIn.duration(1000)} style={styles.heroPre}>MANIFESTO_V1</Animated.Text>
                            <Animated.Text entering={FadeInDown.delay(200).duration(1000)} style={styles.name}>{personal_info.name.toUpperCase()}</Animated.Text>
                        </View>
                        <View style={styles.heroBottom}>
                            <Text style={styles.heroTitle}>[ {personal_info.title.toUpperCase()} ]</Text>
                            <Text style={styles.heroHeadline}>{personal_info.headline.toUpperCase()}</Text>
                        </View>
                    </View>

                    {/* Industrial Summary */}
                    <BrutalSection title="Narrative" sub="Core_Prop">
                        <View style={styles.narrativeBox}>
                            <Text style={styles.summaryText}>{summary}</Text>
                        </View>
                    </BrutalSection>

                    {/* Tooling (Skills) */}
                    <BrutalSection title="Tooling" sub="Augments">
                        <View style={styles.skillsList}>
                            {technical_stack.mobile.concat(technical_stack.frontend.slice(0, 3)).map((skill, i) => (
                                <View key={skill} style={styles.skillRow}>
                                    <View style={styles.skillIndex}><Text style={styles.indexText}>{i + 1}</Text></View>
                                    <Text style={styles.skillText}>{skill.toUpperCase()}</Text>
                                </View>
                            ))}
                        </View>
                    </BrutalSection>

                    {/* Exhibits (Projects) */}
                    <BrutalSection title="Exhibits" sub="Artifacts">
                        {projects.slice(0, 4).map((p, i) => (
                            <TouchableOpacity key={p.name} style={styles.projectBlock}>
                                <View style={styles.projectHeader}>
                                    <Text style={styles.projectName}>{p.name.toUpperCase()}</Text>
                                    <View style={styles.projectNum}><Text style={styles.numText}>0{i+1}</Text></View>
                                </View>
                                <Text style={styles.projectDesc}>{p.description.slice(0, 100)}...</Text>
                                <View style={styles.projectFooter}>
                                    <Text style={styles.projectCat}>{p.category.toUpperCase()}</Text>
                                    <View style={styles.arrowBox}>
                                        <ArrowUpRight size={24} color="#000" strokeWidth={3} />
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </BrutalSection>

                    {/* Final Action */}
                    <TouchableOpacity style={styles.footerBtn} onPress={() => navigation.goBack()}>
                        <Text style={styles.footerText}>INITIATE_CONTACT</Text>
                        <View style={styles.footerAccent} />
                    </TouchableOpacity>

                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F0F0',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingVertical: 24,
        borderBottomWidth: 4,
        borderBottomColor: '#000',
    },
    navBtn: {
        width: 60,
        height: 60,
        backgroundColor: '#FFF',
        borderWidth: 4,
        borderColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingHorizontal: 20,
        paddingVertical: 12,
        backgroundColor: '#FFF',
        borderWidth: 4,
        borderColor: '#000',
    },
    headerText: {
        fontSize: 12,
        fontWeight: '900',
        color: '#000',
        letterSpacing: 2,
    },
    scrollContent: {
        paddingBottom: 60,
    },
    heroSection: {
        paddingHorizontal: 24,
        paddingVertical: 60,
        backgroundColor: '#FFF',
        borderBottomWidth: 4,
        borderBottomColor: '#000',
    },
    heroTop: {
        marginBottom: 40,
    },
    heroPre: {
        fontSize: 12,
        fontWeight: '900',
        color: '#BBB',
        letterSpacing: 4,
        marginBottom: 16,
    },
    name: {
        fontSize: 64,
        fontWeight: '900',
        color: '#000',
        lineHeight: 58,
        letterSpacing: -4,
    },
    heroBottom: {
        gap: 16,
    },
    heroTitle: {
        fontSize: 16,
        fontWeight: '900',
        color: '#000',
        letterSpacing: 2,
    },
    heroHeadline: {
        fontSize: 18,
        fontWeight: '900',
        color: '#000',
        lineHeight: 28,
        opacity: 0.8,
    },
    section: {
        paddingHorizontal: 24,
        paddingVertical: 60,
        borderBottomWidth: 4,
        borderBottomColor: '#000',
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
        marginBottom: 40,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '900',
        color: '#000',
        letterSpacing: 2,
    },
    brutalLine: {
        flex: 1,
        height: 4,
        backgroundColor: '#000',
    },
    sectionSub: {
        fontSize: 11,
        fontWeight: '900',
        color: '#BBB',
        letterSpacing: 2,
    },
    narrativeBox: {
        padding: 40,
        backgroundColor: '#FFF',
        borderWidth: 4,
        borderColor: '#000',
    },
    summaryText: {
        fontSize: 22,
        lineHeight: 34,
        fontWeight: '900',
        color: '#000',
    },
    skillsList: {
        gap: 16,
    },
    skillRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 24,
        padding: 24,
        backgroundColor: '#FFF',
        borderWidth: 4,
        borderColor: '#000',
    },
    skillIndex: {
        width: 40,
        height: 40,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    indexText: {
        fontSize: 12,
        fontWeight: '900',
        color: '#FFF',
    },
    skillText: {
        fontSize: 16,
        fontWeight: '900',
        color: '#000',
    },
    projectBlock: {
        marginBottom: 32,
        padding: 40,
        backgroundColor: '#FFF',
        borderWidth: 4,
        borderColor: '#000',
    },
    projectHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    projectName: {
        fontSize: 32,
        fontWeight: '900',
        color: '#000',
        letterSpacing: -2,
        flex: 1,
    },
    projectNum: {
        width: 50,
        height: 50,
        backgroundColor: '#EEE',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#000',
    },
    numText: {
        fontSize: 14,
        fontWeight: '900',
    },
    projectDesc: {
        fontSize: 16,
        color: '#555',
        lineHeight: 26,
        marginBottom: 32,
        fontWeight: '700',
    },
    projectFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 24,
        borderTopWidth: 2,
        borderTopColor: '#000',
    },
    projectCat: {
        fontSize: 11,
        fontWeight: '900',
        color: '#AAA',
        letterSpacing: 2,
    },
    arrowBox: {
        width: 50,
        height: 50,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 4,
        borderColor: '#000',
    },
    footerBtn: {
        margin: 24,
        backgroundColor: '#000',
        paddingVertical: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 24,
    },
    footerText: {
        fontSize: 24,
        fontWeight: '900',
        color: '#FFF',
        letterSpacing: 2,
    },
    footerAccent: {
        width: 24,
        height: 24,
        backgroundColor: '#FFF',
    }
});
