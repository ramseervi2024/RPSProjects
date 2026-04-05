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
import { ChevronLeft, ArrowRight, Zap, Edit, Compass, Target, Info, Mail } from 'lucide-react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { portfolioprofile } from './portfoliodata';

const { width } = Dimensions.get('window');

export default function Portfolio70({ navigation }) {
    const { personal_info, hero, summary, technical_stack, projects } = portfolioprofile;

    return (
        <View style={styles.container}>
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <ChevronLeft size={24} color="#000" />
                    </TouchableOpacity>
                    <Info size={24} color="#000" />
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    <View style={styles.heroSection}>
                        <Animated.Text entering={FadeInDown.duration(800)} style={styles.preTitle}>MINIMALIST_V70</Animated.Text>
                        <Animated.Text entering={FadeInDown.delay(200).duration(800)} style={styles.name}>{personal_info.name.toUpperCase()}</Animated.Text>
                        <Animated.Text entering={FadeInDown.delay(400).duration(800)} style={styles.role}>{personal_info.title.toUpperCase()}</Animated.Text>
                    </View>

                    <View style={styles.strokeStack}>
                        <TouchableOpacity style={styles.strokeCardMain}>
                            <Text style={styles.strokeTextMain}>AUTHENTIC_PORTFOLIO_V1</Text>
                            <Zap size={20} color="#000" fill="#000" />
                        </TouchableOpacity>

                        {projects.slice(0, 6).map((p, i) => (
                            <TouchableOpacity key={p.name} style={styles.strokeCard}>
                                <Text style={styles.strokeText}>{p.name.toUpperCase()}</Text>
                                <ArrowRight size={18} color="#000" />
                            </TouchableOpacity>
                        ))}

                        <TouchableOpacity style={styles.contactAction}>
                            <Mail size={20} color="#000" />
                            <Text style={styles.contactText}>GET_IN_TOUCH_ST_ID:001</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.footer}>
                        <Text style={styles.footerLabel}>© 2024 RAMESH SEERVI. ALL RIGHTS RESERVED.</Text>
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
        paddingVertical: 16,
    },
    backBtn: {
        width: 44,
        height: 44,
        borderRadius: 0,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#000',
    },
    scrollContent: {
        paddingHorizontal: 24,
        paddingBottom: 40,
        alignItems: 'center',
    },
    heroSection: {
        alignItems: 'center',
        marginVertical: 60,
    },
    preTitle: {
        fontSize: 12,
        fontWeight: '900',
        color: '#000',
        letterSpacing: 4,
        marginBottom: 20,
    },
    name: {
        fontSize: 40,
        fontWeight: '900',
        color: '#000',
        letterSpacing: -2,
        textAlign: 'center',
    },
    role: {
        fontSize: 14,
        fontWeight: '700',
        color: '#666',
        letterSpacing: 3,
        marginTop: 8,
    },
    strokeStack: {
        width: '100%',
        gap: 12,
    },
    strokeCardMain: {
        width: '100%',
        backgroundColor: '#FFF',
        paddingVertical: 24,
        paddingHorizontal: 24,
        borderRadius: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#000',
    },
    strokeCard: {
        width: '100%',
        backgroundColor: '#FFF',
        paddingVertical: 20,
        paddingHorizontal: 24,
        borderRadius: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#000',
    },
    contactAction: {
        paddingVertical: 24,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 12,
    },
    strokeTextMain: {
        fontSize: 14,
        fontWeight: '900',
        color: '#000',
        letterSpacing: 1,
    },
    strokeText: {
        fontSize: 12,
        fontWeight: '800',
        color: '#333',
        letterSpacing: 1,
    },
    contactText: {
        fontSize: 12,
        fontWeight: '900',
        color: '#000',
        letterSpacing: 2,
    },
    footer: {
        marginTop: 40,
        paddingBottom: 20,
    },
    footerLabel: {
        fontSize: 10,
        fontWeight: '900',
        color: '#999',
        letterSpacing: 2,
    },
});
