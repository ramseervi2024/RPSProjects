import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    Dimensions
} from 'react-native';
import { Camera, Maximize, ChevronLeft, ArrowRight, Layers, User } from 'lucide-react-native';
import Animated, { FadeIn, SlideInDown } from 'react-native-reanimated';
import { portfolioprofile } from './portfoliodata';

const { width } = Dimensions.get('window');

export default function Portfolio4({ navigation }) {
    const { personal_info, hero, projects } = portfolioprofile;

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
                    
                    {/* Minimal Top Nav */}
                    <View style={styles.nav}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backLink}>
                            <ChevronLeft size={20} color="#666" />
                        </TouchableOpacity>
                        <Text style={styles.navLabel}>PHOTO_PORTFOLIO</Text>
                    </View>

                    {/* Editorial Hero */}
                    <View style={styles.heroSection}>
                        <Text style={styles.metaText}>BENGALURU, INDIA // 2024</Text>
                        <Animated.Text entering={FadeIn.duration(1200)} style={styles.heroTitle}>
                            {personal_info.name.toUpperCase()}
                        </Animated.Text>
                        <View style={styles.divider} />
                        <Text style={styles.heroSubtitle}>{hero.subtitle}</Text>
                    </View>

                    {/* Visual Project Grid (Mocking high-end photography) */}
                    <View style={styles.gridSection}>
                        <Text style={styles.sectionTitle}>COLLECTIONS_</Text>
                        {projects.slice(0, 4).map((project, index) => (
                            <Animated.View 
                                key={index} 
                                entering={SlideInDown.delay(index * 200)}
                                style={styles.gridCard}
                            >
                                <View style={[styles.imageMock, { backgroundColor: index % 2 === 0 ? '#10B981' : '#3B82F6' }]}>
                                    <View style={styles.overlay}>
                                        <Text style={styles.projectIndex}>0{index + 1}</Text>
                                        <Camera size={24} color="#FFF" opacity={0.5} />
                                    </View>
                                </View>
                                <View style={styles.cardInfo}>
                                    <View>
                                        <Text style={styles.projectName}>{project.name.toUpperCase()}</Text>
                                        <Text style={styles.projectMeta}>{project.category} / IOS / ANDROID</Text>
                                    </View>
                                    <TouchableOpacity style={styles.exploreBtn}>
                                        <ArrowRight size={20} color="#000" />
                                    </TouchableOpacity>
                                </View>
                            </Animated.View>
                        ))}
                    </View>

                    {/* About Thin Section */}
                    <View style={styles.aboutSection}>
                        <View style={styles.aboutHeader}>
                            <User size={18} color="#666" />
                            <Text style={styles.aboutLabel}>WHO_IS_RAMESH</Text>
                        </View>
                        <Text style={styles.aboutText}>
                            Empowering brands through pixel-perfect implementation and robust mobile architecture. Specialized in high-performance React Native ecosystems.
                        </Text>
                    </View>

                    {/* Footer Minimal */}
                    <View style={styles.footer}>
                        <TouchableOpacity style={styles.contactCircle}>
                            <Text style={styles.contactCircleText}>MEET</Text>
                        </TouchableOpacity>
                        <Text style={styles.footerText}>©2024 RAMESH SEERVI. ALL RIGHTS RESERVED.</Text>
                    </View>

                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    safeArea: {
        flex: 1,
    },
    scrollContainer: {
        paddingBottom: 40,
    },
    nav: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 24,
    },
    backLink: {
        padding: 4,
    },
    navLabel: {
        fontSize: 10,
        fontWeight: '700',
        color: '#666',
        letterSpacing: 3,
    },
    heroSection: {
        paddingHorizontal: 24,
        marginTop: 40,
        marginBottom: 60,
    },
    metaText: {
        fontSize: 10,
        fontWeight: '600',
        color: '#999',
        letterSpacing: 2,
        marginBottom: 16,
    },
    heroTitle: {
        fontSize: 48,
        fontWeight: '300',
        color: '#000',
        letterSpacing: -1,
        lineHeight: 52,
    },
    divider: {
        width: 60,
        height: 1,
        backgroundColor: '#000',
        marginVertical: 24,
    },
    heroSubtitle: {
        fontSize: 16,
        color: '#666',
        lineHeight: 24,
        maxWidth: 300,
        fontWeight: '300',
    },
    gridSection: {
        paddingHorizontal: 24,
        marginBottom: 80,
    },
    sectionTitle: {
        fontSize: 12,
        fontWeight: '800',
        color: '#000',
        marginBottom: 32,
        letterSpacing: 1,
    },
    gridCard: {
        marginBottom: 40,
    },
    imageMock: {
        width: '100%',
        height: 450,
        borderRadius: 4,
        justifyContent: 'flex-end',
        padding: 24,
    },
    overlay: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    projectIndex: {
        fontSize: 48,
        fontWeight: '200',
        color: '#FFF',
    },
    cardInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginTop: 20,
    },
    projectName: {
        fontSize: 18,
        fontWeight: '700',
        color: '#000',
        letterSpacing: 1,
    },
    projectMeta: {
        fontSize: 11,
        color: '#999',
        fontWeight: '500',
        marginTop: 4,
        letterSpacing: 0.5,
    },
    exploreBtn: {
        width: 44,
        height: 44,
        borderRadius: 22,
        borderWidth: 1,
        borderColor: '#EEE',
        justifyContent: 'center',
        alignItems: 'center',
    },
    aboutSection: {
        padding: 40,
        backgroundColor: '#F9F9F9',
        marginBottom: 60,
    },
    aboutHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 20,
    },
    aboutLabel: {
        fontSize: 10,
        fontWeight: '800',
        color: '#999',
        letterSpacing: 2,
    },
    aboutText: {
        fontSize: 20,
        fontWeight: '300',
        color: '#333',
        lineHeight: 30,
    },
    footer: {
        alignItems: 'center',
        paddingBottom: 60,
    },
    contactCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 1,
        borderColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 32,
    },
    contactCircleText: {
        fontSize: 12,
        fontWeight: '800',
        color: '#000',
    },
    footerText: {
        fontSize: 10,
        color: '#999',
        letterSpacing: 1,
    }
});
