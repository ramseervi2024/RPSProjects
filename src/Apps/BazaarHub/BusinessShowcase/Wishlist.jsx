import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    TouchableOpacity,
    FlatList,
    Alert,
    Dimensions
} from 'react-native';
import useWishlistStore from '../store/useWishlistStore';
import { ArrowLeft, Trash2, Heart, ArrowRight } from 'lucide-react-native';
import * as Icons from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { FadeInDown, Layout, SlideInRight, SlideOutRight } from 'react-native-reanimated';
import { Swipeable, GestureHandlerRootView } from 'react-native-gesture-handler';
import { BlurView } from "@react-native-community/blur";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const WishlistItem = ({ item, onPress, onRemove, index }) => {
    const IconComponent = Icons[item.iconName] || Icons.Briefcase;

    const renderRightActions = () => {
        return (
            <TouchableOpacity
                style={styles.deleteAction}
                onPress={() => onRemove(item.id)}
                activeOpacity={0.8}
            >
                <View style={styles.deleteData}>
                    <Trash2 size={24} color="white" />
                    <Text style={styles.deleteText}>Delete</Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <Animated.View
            entering={FadeInDown.delay(index * 100).springify().damping(14)}
            layout={Layout.springify()}
            style={styles.itemWrapper}
        >
            <Swipeable renderRightActions={renderRightActions}>
                <TouchableOpacity
                    style={styles.cardContainer}
                    activeOpacity={0.9}
                    onPress={() => onPress(item)}
                >
                    <View style={styles.cardContent}>
                        <View style={styles.iconContainer}>
                            <LinearGradient
                                colors={['#EFF6FF', '#DBEAFE']}
                                style={styles.iconGradient}
                            >
                                <IconComponent size={24} color="#2563EB" />
                            </LinearGradient>
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.cardTitle} numberOfLines={1}>{item.name}</Text>
                            <Text style={styles.cardCategory}>{item.category}</Text>
                            <View style={styles.statsContainer}>
                                <Text style={styles.statLabel}>Est. Return: </Text>
                                <Text style={styles.statValue}>{item.monthlyIncome}</Text>
                            </View>
                        </View>
                        <View style={styles.arrowContainer}>
                            <View style={styles.arrowCircle}>
                                <ArrowRight size={16} color="#94A3B8" />
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </Swipeable>
        </Animated.View>
    );
};

const Wishlist = ({ navigation }) => {
    const { wishlist, removeFromWishlist } = useWishlistStore();
    const insets = useSafeAreaInsets();

    const handleSelectBusiness = (business) => {
        navigation.navigate('BusinessDetails', { business });
    };

    const handleBack = () => {
        navigation.goBack();
    };

    const handleRemove = (id) => {
        Alert.alert(
            "Remove Idea",
            "Are you sure you want to remove this from your wishlist?",
            [
                { text: "Cancel", style: "cancel" },
                { text: "Remove", style: "destructive", onPress: () => removeFromWishlist(id) }
            ]
        );
    };

    return (
        <GestureHandlerRootView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

            {/* Background Gradient */}
            <LinearGradient
                colors={['#F0F9FF', '#F1F5F9', '#F8FAFC']}
                style={StyleSheet.absoluteFill}
            />

            {/* Custom Glass Header */}
            <View style={[styles.headerContainer, { paddingTop: insets.top }]}>
                <BlurView
                    style={StyleSheet.absoluteFill}
                    blurType="light"
                    blurAmount={20}
                    reducedTransparencyFallbackColor="white"
                />
                {/* Tint */}
                <View style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(255,255,255,0.6)' }]} />

                <View style={styles.headerContent}>
                    <TouchableOpacity
                        onPress={handleBack}
                        style={styles.backButton}
                        activeOpacity={0.7}
                    >
                        <ArrowLeft size={24} color="#1E293B" />
                    </TouchableOpacity>
                    <View style={styles.headerTitles}>
                        <Text style={styles.headerTitle}>My Wishlist</Text>
                        <Text style={styles.headerSubtitle}>
                            {wishlist.length} {wishlist.length === 1 ? 'Idea' : 'Ideas'} Saved
                        </Text>
                    </View>
                </View>
            </View>

            <FlatList
                data={wishlist}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item, index }) => (
                    <WishlistItem
                        item={item}
                        index={index}
                        onPress={handleSelectBusiness}
                        onRemove={handleRemove}
                    />
                )}
                contentContainerStyle={[styles.listContent, { paddingTop: insets.top + 80 }]}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <Animated.View entering={FadeInDown.delay(300).springify()} style={styles.emptyContainer}>
                        <View style={styles.emptyIconCircle}>
                            <LinearGradient
                                colors={['#F4F4F5', '#E4E4E7']}
                                style={styles.emptyGradient}
                            >
                                <Heart size={44} color="#94A3B8" />
                            </LinearGradient>
                        </View>
                        <Text style={styles.emptyTitle}>Your wishlist is empty</Text>
                        <Text style={styles.emptySubtitle}>
                            Tap the heart icon on any business idea to save it for later.
                        </Text>
                        <TouchableOpacity
                            style={styles.exploreButton}
                            onPress={handleBack}
                            activeOpacity={0.8}
                        >
                            <LinearGradient
                                colors={['#3B82F6', '#2563EB']}
                                style={styles.exploreGradient}
                            >
                                <Text style={styles.exploreButtonText}>Explore Ideas</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </Animated.View>
                }
            />
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    headerContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        overflow: 'hidden',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.8)',
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingBottom: 20,
        paddingTop: 10,
    },
    backButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(255,255,255,0.6)',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.05)',
    },
    headerTitles: {
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: '800',
        color: '#0F172A',
        letterSpacing: -0.5,
    },
    headerSubtitle: {
        fontSize: 13,
        color: '#64748B',
        fontWeight: '600',
        marginTop: 2,
    },
    listContent: {
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    // Card Styles
    itemWrapper: {
        marginBottom: 16,
    },
    cardContainer: {
        backgroundColor: 'white',
        borderRadius: 20,
        shadowColor: "#64748B",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.06,
        shadowRadius: 12,
        elevation: 4,
        overflow: 'visible', // For shadow
        borderWidth: 1,
        borderColor: '#F1F5F9',
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
    },
    iconContainer: {
        marginRight: 16,
    },
    iconGradient: {
        width: 52,
        height: 52,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textContainer: {
        flex: 1,
    },
    cardTitle: {
        fontSize: 17,
        fontWeight: '700',
        color: '#0F172A',
        marginBottom: 4,
    },
    cardCategory: {
        fontSize: 13,
        color: '#64748B',
        marginBottom: 8,
        fontWeight: '500',
    },
    statsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F8FAFC',
        alignSelf: 'flex-start',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
    },
    statLabel: {
        fontSize: 12,
        color: '#64748B',
    },
    statValue: {
        fontSize: 12,
        fontWeight: '700',
        color: '#16A34A',
    },
    arrowContainer: {
        marginLeft: 12,
    },
    arrowCircle: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#F8FAFC',
        alignItems: 'center',
        justifyContent: 'center',
    },
    // Swipe Actions
    deleteAction: {
        backgroundColor: '#EF4444',
        justifyContent: 'center',
        alignItems: 'flex-end',
        width: 100,
        height: '100%',
        marginBottom: 16,
        borderRadius: 20, // Match card radius
        paddingRight: 0,
        marginLeft: -20, // Pull under
        zIndex: -1,
    },
    deleteData: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 80,
    },
    deleteText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 12,
        marginTop: 4,
    },
    // Empty State
    emptyContainer: {
        padding: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 60,
    },
    emptyIconCircle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 24,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.05,
        shadowRadius: 20,
        elevation: 5,
    },
    emptyGradient: {
        flex: 1,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyTitle: {
        fontSize: 20,
        fontWeight: '800',
        color: '#1E293B',
        marginBottom: 12,
    },
    emptySubtitle: {
        fontSize: 15,
        color: '#64748B',
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: 32,
    },
    exploreButton: {
        width: '100%',
        maxWidth: 200,
        shadowColor: "#2563EB",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.2,
        shadowRadius: 16,
        elevation: 8,
    },
    exploreGradient: {
        paddingVertical: 16,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    exploreButtonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
});

export default Wishlist;
