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
import { ChevronLeft, ArrowRight, Zap, Target, Circle, Square, Triangle, Hexagon } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { portfolioprofile } from './portfoliodata';

const { width, height } = Dimensions.get('window');

const BauhausBackground = () => (
    <View style={StyleSheet.absoluteFill}>
        <LinearGradient colors={['#F5F5F5', '#E5E5E5']} style={StyleSheet.absoluteFill} />
        <View style={styles.gridContainer}>
            {[...Array(12)].map((_, i) => (
                <View key={i} style={[styles.gridRow]}>
                    {[...Array(6)].map((_, j) => (
                        <View key={j} style={styles.gridCell} />
                    ))}
                </View>
            ))}
        </View>
        <Circle size={100} color="#E63946" strokeWidth={0.5} style={{ position: 'absolute', top: 100, right: -50, opacity: 0.1 }} />
        <Square size={120} color="#1D3557" strokeWidth={0.5} style={{ position: 'absolute', bottom: 150, left: -40, opacity: 0.1, transform: [{ rotate: '45deg' }] }} />
    </View>
);

export default function Portfolio76({ navigation }) {
    const { personal_info, projects } = portfolioprofile;

    return (
        <View style={styles.container}>
            <BauhausBackground />
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <ChevronLeft size={24} color="#1D3557" />
                    </TouchableOpacity>
                    <Target size={24} color="#E63946" />
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    <View style={styles.heroSection}>
                        <Animated.Text entering={FadeInDown.duration(800)} style={styles.schemaType}>STRUCT_GRID: V76_BAUHAUS</Animated.Text>
                        <Animated.Text entering={FadeInDown.delay(200).duration(800)} style={styles.name}>{personal_info.name.toUpperCase()}</Animated.Text>
                        <Animated.Text entering={FadeInDown.delay(400).duration(800)} style={styles.role}>{personal_info.title.toUpperCase()}</Animated.Text>
                        
                        <View style={styles.accentLine} />
                    </View>

                    <View style={styles.bauhausStack}>
                        <TouchableOpacity style={styles.mainAction}>
                            <View style={styles.actionInfo}>
                                <Text style={styles.actionPre}>PRIMARY_NAV</Text>
                                <Text style={styles.actionTitle}>ARCHITECTURAL_LOGIC</Text>
                            </View>
                            <Zap size={24} color="#FFF" fill="#FFF" />
                        </TouchableOpacity>

                        {projects.slice(0, 5).map((p, i) => (
                            <TouchableOpacity key={p.name} style={styles.bauhausButton}>
                                <View style={styles.buttonLead}>
                                    <View style={styles.dot} />
                                    <Text style={styles.buttonText}>{p.name.toUpperCase()}</Text>
                                </View>
                                <ArrowRight size={18} color="#1D3557" />
                            </TouchableOpacity>
                        ))}

                        <TouchableOpacity style={styles.footerAction}>
                            <Triangle size={20} color="#E63946" />
                            <Text style={styles.footerLabel}>SYSTEM_UPLINK.ID_076</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.bottomMark}>
                        <Hexagon size={16} color="rgba(29,53,87,0.2)" />
                        <Text style={styles.bottomText}>© 2024 RAMESH SEERVI. BAUHAUS_EXP_S1</Text>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    gridContainer: {
        ...StyleSheet.absoluteFillObject,
        opacity: 0.1,
    },
    gridRow: {
        flexDirection: 'row',
        height: height / 12,
    },
    gridCell: {
        width: width / 6,
        borderWidth: 0.5,
        borderColor: '#1D3557',
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
        borderColor: '#E5E7EB',
    },
    scrollContent: {
        paddingHorizontal: 24,
        paddingBottom: 40,
    },
    heroSection: {
        marginVertical: 40,
    },
    schemaType: {
        fontSize: 10,
        fontWeight: '900',
        color: 'rgba(29,53,87,0.4)',
        letterSpacing: 4,
        marginBottom: 16,
    },
    name: {
        fontSize: 48,
        fontWeight: '900',
        color: '#1D3557',
        letterSpacing: -2,
        lineHeight: 48,
    },
    role: {
        fontSize: 14,
        fontWeight: '700',
        color: '#E63946',
        letterSpacing: 2,
        marginTop: 12,
    },
    accentLine: {
        width: 60,
        height: 6,
        backgroundColor: '#1D3557',
        marginTop: 32,
    },
    bauhausStack: {
        width: '100%',
        gap: 12,
    },
    mainAction: {
        width: '100%',
        backgroundColor: '#1D3557',
        paddingVertical: 24,
        paddingHorizontal: 24,
        borderRadius: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    actionInfo: {
        gap: 4,
    },
    actionPre: {
        fontSize: 10,
        fontWeight: '900',
        color: 'rgba(255,255,255,0.4)',
        letterSpacing: 2,
    },
    actionTitle: {
        fontSize: 14,
        fontWeight: '900',
        color: '#FFF',
        letterSpacing: 1,
    },
    bauhausButton: {
        width: '100%',
        backgroundColor: '#FFF',
        paddingVertical: 20,
        paddingHorizontal: 24,
        borderRadius: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    buttonLead: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    dot: {
        width: 12,
        height: 12,
        backgroundColor: '#E63946',
    },
    buttonText: {
        fontSize: 12,
        fontWeight: '700',
        color: '#1D3557',
        letterSpacing: 1,
    },
    footerAction: {
        paddingVertical: 24,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 12,
        marginTop: 12,
        borderTopWidth: 1,
        borderTopColor: '#E5E7EB',
    },
    footerLabel: {
        fontSize: 12,
        fontWeight: '900',
        color: '#1D3557',
        letterSpacing: 2,
    },
    bottomMark: {
        marginTop: 40,
        alignItems: 'center',
        gap: 8,
        paddingBottom: 20,
    },
    bottomText: {
        fontSize: 8,
        fontWeight: '900',
        color: 'rgba(29,53,87,0.4)',
        letterSpacing: 1,
    }
});
