import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    StatusBar,
    Dimensions,
    Platform
} from 'react-native';
import {
    ArrowLeft, CheckCircle, IndianRupee,
    Target, TrendingUp, Briefcase, Wrench, ThumbsUp, ThumbsDown, Heart
} from 'lucide-react-native';
import * as Icons from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';
import useWishlistStore from '../store/useWishlistStore';
import Animated, {
    useAnimatedScrollHandler,
    useSharedValue,
    useAnimatedStyle,
    interpolate,
    Extrapolate,
    FadeInDown
} from 'react-native-reanimated';
import { BlurView } from "@react-native-community/blur";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');
const HEADER_HEIGHT = 320;

const BusinessDetails = ({ route, navigation }) => {
    const { business } = route.params;
    const IconComponent = Icons[business.iconName] || Briefcase;
    const scrollY = useSharedValue(0);
    const insets = useSafeAreaInsets();

    // Wishlist Logic
    const { isInWishlist, toggleWishlist } = useWishlistStore();
    const isSaved = isInWishlist(business.id);

    const handleBack = () => {
        navigation.goBack();
    };

    const scrollHandler = useAnimatedScrollHandler((event) => {
        scrollY.value = event.contentOffset.y;
    });

    const headerStyle = useAnimatedStyle(() => {
        return {
            height: HEADER_HEIGHT,
            transform: [
                {
                    translateY: interpolate(
                        scrollY.value,
                        [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
                        [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75],
                        Extrapolate.CLAMP
                    ),
                },
                {
                    scale: interpolate(
                        scrollY.value,
                        [-HEADER_HEIGHT, 0],
                        [2, 1],
                        Extrapolate.CLAMP
                    )
                }
            ],
        };
    });

    const imageOpacityStyle = useAnimatedStyle(() => {
        const opacity = interpolate(
            scrollY.value,
            [0, HEADER_HEIGHT * 0.5],
            [1, 0],
            Extrapolate.CLAMP
        );
        return { opacity };
    });

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

            {/* Animated Parallax Header */}
            <Animated.View style={[styles.headerContainer, headerStyle]}>
                <LinearGradient
                    colors={['#0F172A', '#1E293B', '#334155']}
                    style={StyleSheet.absoluteFill}
                />

                {/* Giant Background Icon Pattern */}
                <Animated.View style={[styles.headerPattern, imageOpacityStyle]}>
                    <IconComponent size={300} color="rgba(255,255,255,0.05)" />
                </Animated.View>

                {/* Content Overlay */}
                <Animated.View style={[styles.heroContent, imageOpacityStyle, { paddingTop: insets.top + 20 }]}>
                    <View style={styles.heroIconWrapper}>
                        <LinearGradient
                            colors={['rgba(255,255,255,0.2)', 'rgba(255,255,255,0.05)']}
                            style={styles.heroIconGlass}
                        >
                            <IconComponent size={48} color="white" />
                        </LinearGradient>
                    </View>
                    <View style={styles.categoryBadge}>
                        <Text style={styles.categoryText}>{business.category}</Text>
                    </View>
                    <Text style={styles.heroTitle}>{business.name}</Text>
                </Animated.View>
            </Animated.View>

            {/* Back Button (Fixed) */}
            <TouchableOpacity
                onPress={handleBack}
                style={[styles.backButton, { top: insets.top + 10 }]}
            >
                <BlurView
                    style={styles.glassButton}
                    blurType="light"
                    blurAmount={20}
                    reducedTransparencyFallbackColor="white"
                >
                    <ArrowLeft size={24} color="white" />
                </BlurView>
            </TouchableOpacity>

            {/* Scrollable Content */}
            <Animated.ScrollView
                onScroll={scrollHandler}
                scrollEventThrottle={16}
                style={styles.scrollView}
                contentContainerStyle={{ paddingTop: HEADER_HEIGHT - 40, paddingBottom: 120 }}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.contentBody}>
                    {/* Stats Section with Glass Effect */}
                    <Animated.View entering={FadeInDown.delay(100).duration(600)} style={styles.statsContainer}>
                        <View style={styles.statBox}>
                            <View style={[styles.statIconBadge, { backgroundColor: '#FFF7ED' }]}>
                                <IndianRupee size={20} color="#F97316" />
                            </View>
                            <View>
                                <Text style={styles.statLabel}>Investment</Text>
                                <Text style={styles.statValue}>{business.minInvestment}</Text>
                            </View>
                        </View>
                        <View style={styles.verticalDivider} />
                        <View style={styles.statBox}>
                            <View style={[styles.statIconBadge, { backgroundColor: '#F0FDF4' }]}>
                                <TrendingUp size={20} color="#16A34A" />
                            </View>
                            <View>
                                <Text style={styles.statLabel}>Monthly Income</Text>
                                <Text style={styles.statValue}>{business.monthlyIncome}</Text>
                            </View>
                        </View>
                    </Animated.View>

                    {/* Overview */}
                    <Animated.View entering={FadeInDown.delay(200).duration(600)} style={styles.section}>
                        <Text style={styles.sectionHeader}>Overview</Text>
                        <Text style={styles.bodyText}>{business.detailedOverview}</Text>
                    </Animated.View>

                    {/* How It Works */}
                    <Animated.View entering={FadeInDown.delay(300).duration(600)} style={styles.cardContainer}>
                        <View style={styles.cardHeader}>
                            <View style={[styles.iconBox, { backgroundColor: '#EFF6FF' }]}>
                                <Target size={20} color="#2563EB" />
                            </View>
                            <Text style={styles.cardTitle}>How it works</Text>
                        </View>
                        <View style={styles.timeline}>
                            {business.workflowSteps.map((step, index) => (
                                <View key={index} style={styles.timelineItem}>
                                    <View style={styles.timelineIndicator}>
                                        <View style={styles.timelineDot} />
                                        {index !== business.workflowSteps.length - 1 && <View style={styles.timelineLine} />}
                                    </View>
                                    <Text style={styles.timelineText}>{step}</Text>
                                </View>
                            ))}
                        </View>
                    </Animated.View>

                    {/* Investment Breakdown */}
                    <Animated.View entering={FadeInDown.delay(400).duration(600)} style={styles.cardContainer}>
                        <View style={styles.cardHeader}>
                            <View style={[styles.iconBox, { backgroundColor: '#FFF7ED' }]}>
                                <IndianRupee size={20} color="#F97316" />
                            </View>
                            <Text style={styles.cardTitle}>Investment Breakdown</Text>
                        </View>
                        {business.investmentBreakdown.map((item, index) => (
                            <View key={index} style={styles.costRow}>
                                <Text style={styles.costLabel}>{item.item}</Text>
                                <Text style={styles.costValue}>{item.cost}</Text>
                            </View>
                        ))}
                    </Animated.View>

                    {/* Pros & Cons Grid */}
                    <Animated.View entering={FadeInDown.delay(500).duration(600)} style={styles.gridRow}>
                        <View style={[styles.gridCard, { backgroundColor: '#F0FDF4', borderColor: '#BBF7D0' }]}>
                            <View style={styles.gridHeader}>
                                <ThumbsUp size={16} color="#16A34A" />
                                <Text style={[styles.gridTitle, { color: '#16A34A' }]}>Pros</Text>
                            </View>
                            {business.pros.map((pro, idx) => (
                                <Text key={idx} style={styles.gridText}>• {pro}</Text>
                            ))}
                        </View>
                        <View style={[styles.gridCard, { backgroundColor: '#FEF2F2', borderColor: '#FECACA' }]}>
                            <View style={styles.gridHeader}>
                                <ThumbsDown size={16} color="#DC2626" />
                                <Text style={[styles.gridTitle, { color: '#DC2626' }]}>Cons</Text>
                            </View>
                            {business.cons.map((con, idx) => (
                                <Text key={idx} style={styles.gridText}>• {con}</Text>
                            ))}
                        </View>
                    </Animated.View>

                </View>
            </Animated.ScrollView>

            {/* Glassmorphism Bottom Action Bar */}
            <View style={styles.bottomBarWrapper}>
                <BlurView
                    style={styles.bottomBarBlur}
                    blurType="light"
                    blurAmount={20}
                    reducedTransparencyFallbackColor="white"
                />
                <View style={[styles.bottomBarContent, { paddingBottom: insets.bottom + 10 }]}>
                    <TouchableOpacity
                        style={styles.secondaryBtn}
                        onPress={handleBack}
                    >
                        <ArrowLeft size={24} color="#334155" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.primaryBtn, isSaved && styles.savedBtn]}
                        onPress={() => toggleWishlist(business)}
                    >
                        <Heart
                            size={20}
                            color="white"
                            fill={isSaved ? "white" : "transparent"}
                            style={{ marginRight: 8 }}
                        />
                        <Text style={styles.primaryBtnText}>
                            {isSaved ? 'Saved to Wishlist' : 'Add to Wishlist'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F1F5F9',
    },
    headerContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        overflow: 'hidden',
        zIndex: 1,
    },
    headerPattern: {
        position: 'absolute',
        bottom: -50,
        right: -50,
        transform: [{ rotate: '-15deg' }],
    },
    heroContent: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        paddingHorizontal: 20,
    },
    heroIconWrapper: {
        marginBottom: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 10,
    },
    heroIconGlass: {
        width: 80,
        height: 80,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.3)',
    },
    categoryBadge: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        backgroundColor: 'rgba(255,255,255,0.15)',
        borderRadius: 100,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
    },
    categoryText: {
        color: '#E2E8F0',
        fontSize: 13,
        fontWeight: '600',
        letterSpacing: 0.5,
    },
    heroTitle: {
        fontSize: 28,
        fontWeight: '800',
        color: 'white',
        textAlign: 'center',
        letterSpacing: -0.5,
        lineHeight: 34,
        textShadowColor: 'rgba(0,0,0,0.3)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
    },
    backButton: {
        position: 'absolute',
        left: 20,
        zIndex: 100,
    },
    glassButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    scrollView: {
        flex: 1,
        zIndex: 2,
    },
    contentBody: {
        paddingHorizontal: 20,
        backgroundColor: '#F1F5F9',
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        minHeight: height - HEADER_HEIGHT,
        paddingTop: 30,
    },
    statsContainer: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 24,
        padding: 20,
        marginTop: -60, // Overlap effect
        shadowColor: "#64748B",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.1,
        shadowRadius: 16,
        elevation: 8,
        marginBottom: 24,
    },
    statBox: {
        flex: 1,
        alignItems: 'center',
    },
    statIconBadge: {
        width: 40,
        height: 40,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
    },
    statLabel: {
        fontSize: 12,
        color: '#64748B',
        fontWeight: '600',
        marginBottom: 4,
    },
    statValue: {
        fontSize: 16,
        fontWeight: '700',
        color: '#0F172A',
    },
    verticalDivider: {
        width: 1,
        height: '100%',
        backgroundColor: '#E2E8F0',
        marginHorizontal: 10,
    },
    section: {
        marginBottom: 24,
    },
    sectionHeader: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1E293B',
        marginBottom: 8,
    },
    bodyText: {
        fontSize: 16,
        color: '#475569',
        lineHeight: 24,
    },
    cardContainer: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    iconBox: {
        width: 32,
        height: 32,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#0F172A',
    },
    timeline: {
        marginLeft: 10,
    },
    timelineItem: {
        flexDirection: 'row',
        paddingBottom: 20,
    },
    timelineIndicator: {
        alignItems: 'center',
        marginRight: 16,
    },
    timelineDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#2563EB',
        borderWidth: 2,
        borderColor: '#DBEAFE',
    },
    timelineLine: {
        width: 2,
        flex: 1,
        backgroundColor: '#E2E8F0',
        marginTop: 4,
    },
    timelineText: {
        flex: 1,
        fontSize: 15,
        color: '#334155',
        lineHeight: 22,
        marginTop: -4,
    },
    costRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
    },
    costLabel: {
        fontSize: 15,
        color: '#64748B',
    },
    costValue: {
        fontSize: 15,
        fontWeight: '600',
        color: '#0F172A',
    },
    gridRow: {
        flexDirection: 'row',
        gap: 12,
    },
    gridCard: {
        flex: 1,
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
    },
    gridHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    gridTitle: {
        fontSize: 14,
        fontWeight: '700',
        marginLeft: 6,
    },
    gridText: {
        fontSize: 13,
        color: '#475569',
        marginBottom: 6,
        lineHeight: 18,
    },
    bottomBarWrapper: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        overflow: 'hidden', // Contain blur
    },
    bottomBarBlur: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    bottomBarContent: {
        flexDirection: 'row',
        padding: 20,
        paddingTop: 20,
        gap: 12,
        backgroundColor: 'rgba(255,255,255,0.7)', // Fallback / Overlay
    },
    secondaryBtn: {
        width: 50,
        height: 50,
        borderRadius: 14,
        backgroundColor: 'rgba(255,255,255,0.8)',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    primaryBtn: {
        flex: 1,
        height: 50,
        borderRadius: 14,
        backgroundColor: '#2563EB',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        shadowColor: "#2563EB",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    savedBtn: {
        backgroundColor: '#BE185D',
        shadowColor: "#BE185D",
    },
    primaryBtnText: {
        fontSize: 16,
        fontWeight: '700',
        color: 'white',
    },
});

export default BusinessDetails;
