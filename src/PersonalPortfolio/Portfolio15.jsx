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
import { ChevronLeft } from 'lucide-react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { portfolioprofile } from './portfoliodata';

const { width } = Dimensions.get('window');

export default function Portfolio15({ navigation }) {
    const { personal_info, hero, projects, technical_stack } = portfolioprofile;

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
                    
                    {/* Zen Header */}
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                            <ChevronLeft size={20} color="#000" />
                        </TouchableOpacity>
                        <Text style={styles.headerSign}>{personal_info.name.toUpperCase()}</Text>
                    </View>

                    {/* Minimal Hero */}
                    <View style={styles.heroSection}>
                        <Animated.Text entering={FadeIn.duration(1500)} style={styles.heroTitle}>
                            Less is{'\n'}more.
                        </Animated.Text>
                        <View style={styles.divider} />
                        <Text style={styles.heroSubtitle}>
                            {personal_info.title}. Based in {personal_info.location}.
                        </Text>
                        <Text style={styles.heroIntro}>
                            {hero.subtitle}
                        </Text>
                    </View>

                    {/* Zen Skills */}
                    <View style={styles.section}>
                        <Text style={styles.sectionLabel}>Disciplines</Text>
                        <View style={styles.skillList}>
                            {technical_stack.mobile.map((skill, index) => (
                                <Text key={index} style={styles.skillItem}>{skill}</Text>
                            ))}
                        </View>
                    </View>

                    {/* Project List */}
                    <View style={styles.section}>
                        <Text style={styles.sectionLabel}>Selected Works</Text>
                        {projects.slice(0, 4).map((project, index) => (
                            <View key={index} style={styles.projectRow}>
                                <View style={styles.projectHeader}>
                                    <Text style={styles.projectName}>{project.name}</Text>
                                    <Text style={styles.projectYear}>2024</Text>
                                </View>
                                <Text style={styles.projectDesc}>{project.description}</Text>
                            </View>
                        ))}
                    </View>

                    {/* Simple Footer */}
                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Available for new challenges.</Text>
                        <TouchableOpacity style={styles.emailBtn}>
                            <Text style={styles.emailText}>{personal_info.email}</Text>
                        </TouchableOpacity>
                        <View style={styles.footerMeta}>
                            <Text style={styles.metaText}>RPS // DESIGN</Text>
                            <Text style={styles.metaText}>MMXXIV</Text>
                        </View>
                    </View>

                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FCFCFC',
    },
    safeArea: {
        flex: 1,
    },
    scrollContainer: {
        paddingHorizontal: 32,
        paddingBottom: 60,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 32,
    },
    backBtn: {
        padding: 4,
    },
    headerSign: {
        fontSize: 10,
        fontWeight: '300',
        color: '#999',
        letterSpacing: 4,
    },
    heroSection: {
        marginTop: 60,
        marginBottom: 80,
    },
    heroTitle: {
        fontSize: 48,
        fontWeight: '200',
        color: '#000',
        lineHeight: 56,
        letterSpacing: -1,
    },
    divider: {
        width: 30,
        height: 1,
        backgroundColor: '#E5E5E5',
        marginVertical: 40,
    },
    heroSubtitle: {
        fontSize: 14,
        fontWeight: '500',
        color: '#000',
        marginBottom: 16,
    },
    heroIntro: {
        fontSize: 16,
        fontWeight: '300',
        color: '#666',
        lineHeight: 28,
        maxWidth: 280,
    },
    section: {
        marginBottom: 80,
    },
    sectionLabel: {
        fontSize: 10,
        fontWeight: '700',
        color: '#999',
        textTransform: 'uppercase',
        letterSpacing: 2,
        marginBottom: 32,
    },
    skillList: {
        gap: 12,
    },
    skillItem: {
        fontSize: 18,
        fontWeight: '200',
        color: '#000',
    },
    projectRow: {
        marginBottom: 40,
    },
    projectHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        marginBottom: 12,
    },
    projectName: {
        fontSize: 22,
        fontWeight: '300',
        color: '#000',
    },
    projectYear: {
        fontSize: 10,
        fontWeight: '400',
        color: '#999',
    },
    projectDesc: {
        fontSize: 14,
        fontWeight: '300',
        color: '#666',
        lineHeight: 24,
    },
    footer: {
        marginTop: 40,
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0',
        paddingTop: 60,
    },
    footerText: {
        fontSize: 14,
        fontWeight: '300',
        color: '#999',
        marginBottom: 16,
    },
    emailBtn: {
        marginBottom: 60,
    },
    emailText: {
        fontSize: 24,
        fontWeight: '300',
        color: '#000',
        textDecorationLine: 'underline',
    },
    footerMeta: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    metaText: {
        fontSize: 10,
        fontWeight: '300',
        color: '#CCC',
        letterSpacing: 2,
    }
});
