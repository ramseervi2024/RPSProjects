import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    SafeAreaView,
    TouchableOpacity,
    FlatList,
    Alert
} from 'react-native';
import useWishlistStore from '../store/useWishlistStore';
import { ArrowLeft, Trash2, Heart, ArrowRight } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { FadeInDown, Layout } from 'react-native-reanimated';
import { Swipeable, GestureHandlerRootView } from 'react-native-gesture-handler';
import * as Icons from 'lucide-react-native';

const WishlistItem = ({ item, onPress, onRemove, index }) => {
    const IconComponent = Icons[item.iconName] || Icons.Briefcase;

    const renderRightActions = () => {
        return (
            <TouchableOpacity
                style={styles.deleteAction}
                onPress={() => onRemove(item.id)}
            >
                <Trash2 size={24} color="white" />
            </TouchableOpacity>
        );
    };

    return (
        <Animated.View entering={FadeInDown.delay(index * 100).duration(500)} layout={Layout.springify()}>
            <Swipeable renderRightActions={renderRightActions}>
                <TouchableOpacity
                    style={styles.cardContainer}
                    activeOpacity={0.9}
                    onPress={() => onPress(item)}
                >
                    <View style={styles.cardContent}>
                        <View style={styles.iconContainer}>
                            <IconComponent size={24} color="#2563EB" />
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.cardTitle} numberOfLines={1}>{item.name}</Text>
                            <Text style={styles.cardCategory}>{item.category}</Text>
                            <View style={styles.statsContainer}>
                                <Text style={styles.statText}>Inv: <Text style={styles.statBold}>{item.minInvestment}</Text></Text>
                            </View>
                        </View>
                        <View style={styles.arrowContainer}>
                            <ArrowRight size={20} color="#CBD5E1" />
                        </View>
                    </View>
                </TouchableOpacity>
            </Swipeable>
        </Animated.View>
    );
};

const Wishlist = ({ navigation }) => {
    const { wishlist, removeFromWishlist } = useWishlistStore();

    const handleSelectBusiness = (business) => {
        navigation.navigate('BusinessDetails', { business });
    };

    const handleBack = () => {
        navigation.goBack();
    };

    const handleRemove = (id) => {
        Alert.alert(
            "Remove from Wishlist",
            "Are you sure you want to remove this idea?",
            [
                { text: "Cancel", style: "cancel" },
                { text: "Remove", style: "destructive", onPress: () => removeFromWishlist(id) }
            ]
        );
    };

    return (
        <GestureHandlerRootView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#2563EB" />

            <LinearGradient
                colors={['#2563EB', '#1D4ED8']}
                style={styles.headerBackground}
            >
                <SafeAreaView>
                    <View style={styles.headerContent}>
                        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                            <ArrowLeft size={24} color="white" />
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>My Wishlist</Text>
                    </View>
                    <View style={styles.headerStats}>
                        <Text style={styles.headerStatsText}>
                            {wishlist.length} {wishlist.length === 1 ? 'Idea' : 'Ideas'} Saved
                        </Text>
                    </View>
                </SafeAreaView>
            </LinearGradient>

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
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <Animated.View entering={FadeInDown.delay(300)} style={styles.emptyContainer}>
                        <View style={styles.emptyIconCircle}>
                            <Heart size={40} color="#CBD5E1" />
                        </View>
                        <Text style={styles.emptyTitle}>Your wishlist is empty</Text>
                        <Text style={styles.emptySubtitle}>
                            Save interesting business ideas here to review them later.
                        </Text>
                        <TouchableOpacity
                            style={styles.exploreButton}
                            onPress={handleBack}
                        >
                            <Text style={styles.exploreButtonText}>Explore Ideas</Text>
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
    headerBackground: {
        paddingBottom: 24,
        borderBottomLeftRadius: 32,
        borderBottomRightRadius: 32,
        marginBottom: 16,
        shadowColor: "#2563EB",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.2,
        shadowRadius: 20,
        elevation: 10,
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 10,
        marginBottom: 10,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: '800',
        color: 'white',
        letterSpacing: -0.5,
    },
    headerStats: {
        paddingHorizontal: 76,
    },
    headerStatsText: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 14,
        fontWeight: '600',
    },
    listContent: {
        paddingHorizontal: 20,
        paddingBottom: 40,
        paddingTop: 10,
    },
    // Card Styles
    cardContainer: {
        backgroundColor: 'white',
        borderRadius: 16,
        marginBottom: 12,
        shadowColor: "#64748B",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 3,
        overflow: 'hidden',
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 12,
        backgroundColor: '#EFF6FF',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    textContainer: {
        flex: 1,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#0F172A',
        marginBottom: 4,
    },
    cardCategory: {
        fontSize: 12,
        color: '#64748B',
        marginBottom: 6,
    },
    statsContainer: {
        flexDirection: 'row',
    },
    statText: {
        fontSize: 12,
        color: '#475569',
    },
    statBold: {
        fontWeight: '700',
        color: '#0F172A',
    },
    arrowContainer: {
        marginLeft: 8,
    },
    // Swipe Actions
    deleteAction: {
        backgroundColor: '#EF4444',
        justifyContent: 'center',
        alignItems: 'flex-end',
        width: 80,
        height: '100%',
        marginBottom: 12,
        borderRadius: 16,
        paddingRight: 24,
    },
    // Empty State
    emptyContainer: {
        padding: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40,
    },
    emptyIconCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#E2E8F0',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    emptyTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#334155',
        marginBottom: 8,
    },
    emptySubtitle: {
        fontSize: 14,
        color: '#64748B',
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: 24,
    },
    exploreButton: {
        paddingHorizontal: 24,
        paddingVertical: 12,
        backgroundColor: '#2563EB',
        borderRadius: 12,
        shadowColor: "#2563EB",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    exploreButtonText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 15,
    },
});

export default Wishlist;
