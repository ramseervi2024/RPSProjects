import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    Dimensions,
    ImageBackground
} from 'react-native';
import { Palette, Compass, Star, ArrowUpRight, ChevronLeft, Instagram, Globe } from 'lucide-react-native';
import Animated, { FadeInLeft, FadeInRight, BounceIn, FadeInUp } from 'react-native-reanimated';
import { portfolioprofile } from './portfoliodata';

const { width } = Dimensions.get('window');

export default function Portfolio3({ navigation }) {
    const { personal_info, summary, projects, services } = portfolioprofile;

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
                    
                    {/* Header */}
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backLink}>
                            <ChevronLeft size={20} color="#000" />
                            <Text style={styles.backText}>BACK</Text>
                        </TouchableOpacity>
                        <Text style={styles.brand}>DESIGN.LAB</Text>
                    </View>

                    {/* Creative Hero */}
                    <View style={styles.heroSection}>
                        <Animated.Text entering={FadeInLeft.delay(100).duration(800)} style={styles.helloText}>
                            HELLO, I'M
                        </Animated.Text>
                        <Animated.Text entering={FadeInLeft.delay(300).duration(800)} style={styles.hugeName}>
                            {personal_info.name.split(' ')[0]}
                        </Animated.Text>
                        <View style={styles.rotatedTextContainer}>
                            <Text style={[styles.rotatedText, { color: '#F59E0B' }]}>{personal_info.title.toUpperCase()}</Text>
                        </View>
                    </View>

                    {/* Bold Summary */}
                    <View style={styles.summaryContainer}>
                        <Text style={styles.summaryLabel}>ABOUT_ME</Text>
                        <Text style={styles.summaryText}>{summary}</Text>
                    </View>

                    {/* Services / Expertise */}
                    <View style={styles.serviceSection}>
                        <Text style={styles.sectionHeading}>EXPERTISE_</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.serviceScroll}>
                            {services.map((service, index) => (
                                <Animated.View 
                                    key={index} 
                                    entering={BounceIn.delay(index * 150)}
                                    style={styles.serviceBox}
                                >
                                    <Palette size={24} color="#F59E0B" />
                                    <Text style={styles.serviceName}>{service}</Text>
                                </Animated.View>
                            ))}
                        </ScrollView>
                    </View>

                    {/* Creative Projects */}
                    <View style={styles.projectSection}>
                        <Text style={styles.sectionHeading}>RECENT_WORKS_</Text>
                        {projects.slice(0, 4).map((project, index) => (
                            <Animated.View 
                                key={index} 
                                entering={FadeInUp.delay(index * 200)}
                                style={styles.creativeProjectCard}
                            >
                                <View style={styles.projectNumberContainer}>
                                    <Text style={styles.projectNumber}>0{index + 1}</Text>
                                </View>
                                <View style={styles.projectInfo}>
                                    <Text style={styles.projectName}>{project.name}</Text>
                                    <Text style={styles.projectType}>{project.category}</Text>
                                </View>
                                <TouchableOpacity style={styles.projectArrow}>
                                    <ArrowUpRight size={20} color="#FFF" />
                                </TouchableOpacity>
                            </Animated.View>
                        ))}
                    </View>

                    {/* Social/Contact Footer */}
                    <View style={styles.footer}>
                        <Text style={styles.footerCall}>LET'S_COLLABORATE_</Text>
                        <Text style={styles.footerEmail}>{personal_info.email}</Text>
                        <View style={styles.footerSocials}>
                            <TouchableOpacity style={styles.socialBtn}><Instagram size={24} color="#000" /></TouchableOpacity>
                            <TouchableOpacity style={styles.socialBtn}><Globe size={24} color="#000" /></TouchableOpacity>
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
        backgroundColor: '#FFFBEB', // Light amber/cream
    },
    safeArea: {
        flex: 1,
    },
    scrollContainer: {
        padding: 24,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 40,
    },
    backLink: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    backText: {
        fontSize: 12,
        fontWeight: '900',
        color: '#000',
        letterSpacing: 2,
    },
    brand: {
        fontSize: 14,
        fontWeight: '900',
        color: '#000',
        letterSpacing: 4,
    },
    heroSection: {
        marginBottom: 60,
    },
    helloText: {
        fontSize: 18,
        fontWeight: '700',
        color: '#F59E0B',
        letterSpacing: 2,
    },
    hugeName: {
        fontSize: 84,
        fontWeight: '900',
        color: '#000',
        marginTop: -10,
        letterSpacing: -4,
    },
    rotatedTextContainer: {
        marginTop: 10,
        backgroundColor: '#000',
        alignSelf: 'flex-start',
        paddingHorizontal: 12,
        paddingVertical: 6,
        transform: [{ rotate: '-2deg' }],
    },
    rotatedText: {
        fontSize: 12,
        fontWeight: '900',
        letterSpacing: 1,
    },
    summaryContainer: {
        marginBottom: 60,
    },
    summaryLabel: {
        fontSize: 10,
        fontWeight: '800',
        color: '#92400E',
        marginBottom: 16,
        letterSpacing: 2,
    },
    summaryText: {
        fontSize: 24,
        fontWeight: '600',
        color: '#000',
        lineHeight: 34,
    },
    sectionHeading: {
        fontSize: 14,
        fontWeight: '900',
        color: '#000',
        marginBottom: 24,
        letterSpacing: 2,
    },
    serviceSection: {
        marginBottom: 60,
    },
    serviceScroll: {
        gap: 16,
    },
    serviceBox: {
        width: 140,
        height: 140,
        backgroundColor: '#FFF',
        borderRadius: 24,
        padding: 20,
        justifyContent: 'space-between',
        borderWidth: 2,
        borderColor: '#000',
        shadowColor: '#000',
        shadowOffset: { width: 8, height: 8 },
        shadowOpacity: 1,
        shadowRadius: 0,
        elevation: 10,
    },
    serviceName: {
        fontSize: 14,
        fontWeight: '800',
        color: '#000',
        lineHeight: 18,
    },
    projectSection: {
        marginBottom: 60,
    },
    creativeProjectCard: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 24,
        borderBottomWidth: 2,
        borderBottomColor: '#FDE68A',
    },
    projectNumberContainer: {
        width: 40,
    },
    projectNumber: {
        fontSize: 12,
        fontWeight: '800',
        color: '#F59E0B',
    },
    projectInfo: {
        flex: 1,
    },
    projectName: {
        fontSize: 22,
        fontWeight: '800',
        color: '#000',
    },
    projectType: {
        fontSize: 12,
        color: '#92400E',
        fontWeight: '600',
        marginTop: 4,
    },
    projectArrow: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    footer: {
        paddingTop: 40,
        paddingBottom: 20,
        borderTopWidth: 2,
        borderTopColor: '#000',
    },
    footerCall: {
        fontSize: 14,
        fontWeight: '900',
        color: '#F59E0B',
        marginBottom: 12,
    },
    footerEmail: {
        fontSize: 24,
        fontWeight: '800',
        color: '#000',
        marginBottom: 24,
    },
    footerSocials: {
        flexDirection: 'row',
        gap: 20,
    }
});
