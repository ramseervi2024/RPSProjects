import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    StatusBar,
    SafeAreaView,
    TouchableOpacity
} from 'react-native';
import BusinessCard from './BusinessCard';
import useWishlistStore from '../store/useWishlistStore';
import { ArrowLeft, Heart } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';

const Wishlist = ({ navigation }) => {
    const { wishlist } = useWishlistStore();

    const handleSelectBusiness = (business) => {
        navigation.navigate('BusinessDetails', { business });
    };

    const handleBack = () => {
        navigation.goBack();
    };

    const renderHeader = () => (
        <View style={styles.headerContainer}>
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
                </SafeAreaView>
            </LinearGradient>
            <View style={styles.summaryContainer}>
                <Text style={styles.summaryText}>
                    {wishlist.length} {wishlist.length === 1 ? 'Idea' : 'Ideas'} Saved
                </Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#2563EB" />

            {renderHeader()}

            <FlatList
                data={wishlist}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <BusinessCard
                        business={item}
                        onPress={handleSelectBusiness}
                    />
                )}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
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
                    </View>
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    headerContainer: {
        marginBottom: 16,
        backgroundColor: '#F8FAFC',
        zIndex: 10,
    },
    headerBackground: {
        paddingBottom: 20,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 10,
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
        fontSize: 22,
        fontWeight: '700',
        color: 'white',
    },
    summaryContainer: {
        marginHorizontal: 20,
        marginTop: -20,
        backgroundColor: 'white',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 4,
        alignItems: 'center',
    },
    summaryText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#2563EB',
    },
    listContent: {
        paddingHorizontal: 16,
        paddingBottom: 40,
    },
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
