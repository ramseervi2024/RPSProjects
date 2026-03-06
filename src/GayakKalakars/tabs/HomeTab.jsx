import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TextInput,
    FlatList,
    Dimensions,
} from 'react-native';
import { Search, MapPin, Users, Briefcase, Award, Star, ShieldCheck, Heart } from 'lucide-react-native';
import { COLORS } from '../theme';
import { GAYAK_KALAKARS } from '../data/gayakkalakarslist';
import { ONGOING_EVENTS } from '../data/ongoingupcomingevents';
import { BUSINESS_PLANS } from '../data/business_plans';

const { width } = Dimensions.get('window');

export default function HomeTab({ onSelectArtist, onSelectEvent, onViewAllEvents, onViewAllArtists, searchQuery, setSearchQuery }) {
    const topArtists = GAYAK_KALAKARS.slice(0, 4);
    const topEvents = ONGOING_EVENTS.slice(0, 4);
    return (
        <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
            {/* Search */}
            <View style={styles.searchSection}>
                <View style={styles.searchBar}>
                    <Search size={20} color={COLORS.textSecondary} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search Artists or Events"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>
            </View>

            {/* Quick Categories */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.categoryContainer}
            >
                {['Bhajan', 'Folk', 'Vivah Geet', 'DJ Night', 'Sandhya'].map((cat, i) => (
                    <TouchableOpacity key={i} style={styles.categoryChip}>
                        <Text style={styles.categoryChipText}>{cat}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* Quick Actions */}
            <View style={styles.actionGrid}>
                {[
                    { label: 'Book Artist', icon: Star, color: '#E67E22' },
                    { label: 'Upcoming', icon: Briefcase, color: '#3498DB' },
                    { label: 'Verified', icon: ShieldCheck, color: '#27AE60' },
                    { label: 'Partner', icon: Users, color: '#9B59B6' },
                ].map((action, i) => (
                    <TouchableOpacity key={i} style={styles.actionItem}>
                        <View style={[styles.actionIcon, { backgroundColor: action.color + '20' }]}>
                            <action.icon size={24} color={action.color} />
                        </View>
                        <Text style={styles.actionLabel}>{action.label}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Business Plans */}
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Business Packages</Text>
            </View>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingLeft: 20, paddingRight: 20 }}
            >
                {BUSINESS_PLANS.organizer.map((plan) => (
                    <View key={plan.id} style={[styles.planCard, { borderColor: plan.color }]}>
                        {plan.popular && <View style={styles.popularBadge}><Text style={styles.popularText}>POPULAR</Text></View>}
                        <Text style={[styles.planName, { color: plan.color }]}>{plan.name}</Text>
                        <Text style={styles.planPrice}>{plan.price}</Text>
                        <Text style={styles.planDuration}>{plan.duration}</Text>
                        <View style={styles.planFeatures}>
                            {plan.features.slice(0, 3).map((f, i) => (
                                <Text key={i} style={styles.featureText}>• {f}</Text>
                            ))}
                        </View>
                        <TouchableOpacity style={[styles.planBtn, { backgroundColor: plan.color }]}>
                            <Text style={styles.planBtnText}>Select Plan</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>

            {/* Featured Public Events */}
            <View style={[styles.sectionHeader, { marginTop: 30 }]}>
                <Text style={styles.sectionTitle}>Public Events</Text>
                <TouchableOpacity onPress={onViewAllEvents}>
                    <Text style={styles.viewAll}>View All</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={topEvents}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingLeft: 20, paddingRight: 20 }}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.publicEventCard}
                        onPress={() => onSelectEvent(item)}
                    >
                        <View style={styles.eventImagePlaceholder}>
                            <Text style={styles.eventImageText}>{item.artist}</Text>
                        </View>
                        <View style={styles.eventContent}>
                            <Text style={styles.eventArtistName}>{item.artist}</Text>
                            <Text style={styles.eventTitle}>{item.title}</Text>
                            <View style={styles.eventInfoRow}>
                                <MapPin size={12} color={COLORS.textSecondary} />
                                <Text style={styles.eventInfoText}>{item.location}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
            />

            {/* Success Stories */}
            <View style={[styles.sectionHeader, { marginTop: 30 }]}>
                <Text style={styles.sectionTitle}>Success Stories</Text>
            </View>
            <View style={styles.testimonialCard}>
                <Heart size={20} color={COLORS.accentRed} fill={COLORS.accentRed} />
                <Text style={styles.testimonialText}>"Ramesh & Dimple's wedding wouldn't have been the same without Prakash Mali. The app made booking so easy!"</Text>
                <Text style={styles.testimonialAuthor}>- Ramesh Seervi, Organizer</Text>
            </View>

            {/* Artists */}
            <View style={[styles.sectionHeader, { marginTop: 25, marginBottom: 10 }]}>
                <Text style={styles.sectionTitle}>Featured Gayak Kalakars</Text>
                <TouchableOpacity onPress={onViewAllArtists}>
                    <Text style={styles.viewAll}>View All</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.artistGrid}>
                {topArtists.map(artist => (
                    <TouchableOpacity
                        key={artist.id}
                        style={styles.artistCardSmall}
                        onPress={() => onSelectArtist(artist)}
                    >
                        <View style={styles.artistCircle}>
                            <Text style={styles.artistInitial}>{artist.name.charAt(0)}</Text>
                        </View>
                        <Text style={styles.artistNameSmall} numberOfLines={1}>{artist.name}</Text>
                        <Text style={styles.artistCategorySmall}>{artist.title}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <View style={{ height: 100 }} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.primary,
    },
    searchSection: {
        padding: 20,
        paddingBottom: 10,
    },
    categoryContainer: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    categoryChip: {
        backgroundColor: COLORS.white,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        marginRight: 10,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    categoryChipText: {
        fontSize: 13,
        fontWeight: '600',
        color: COLORS.textSecondary,
    },
    actionGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginBottom: 25,
    },
    actionItem: {
        alignItems: 'center',
        flex: 1,
    },
    actionIcon: {
        width: 50,
        height: 50,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    actionLabel: {
        fontSize: 11,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    planCard: {
        width: 180,
        backgroundColor: COLORS.white,
        borderRadius: 16,
        padding: 15,
        marginRight: 15,
        borderWidth: 2,
        position: 'relative',
    },
    popularBadge: {
        position: 'absolute',
        top: -10,
        right: 15,
        backgroundColor: '#D4AF37',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
    },
    popularText: {
        color: COLORS.white,
        fontSize: 9,
        fontWeight: 'bold',
    },
    planName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    planPrice: {
        fontSize: 22,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    planDuration: {
        fontSize: 12,
        color: COLORS.textSecondary,
        marginBottom: 10,
    },
    planFeatures: {
        marginBottom: 15,
    },
    featureText: {
        fontSize: 11,
        color: COLORS.textSecondary,
        marginBottom: 4,
    },
    planBtn: {
        paddingVertical: 8,
        borderRadius: 8,
        alignItems: 'center',
    },
    planBtnText: {
        color: COLORS.white,
        fontSize: 12,
        fontWeight: 'bold',
    },
    testimonialCard: {
        marginHorizontal: 20,
        padding: 20,
        backgroundColor: COLORS.cardBackground,
        borderRadius: 16,
        borderLeftWidth: 4,
        borderLeftColor: COLORS.accentRed,
    },
    testimonialText: {
        fontSize: 14,
        fontStyle: 'italic',
        lineHeight: 22,
        color: COLORS.text,
        marginVertical: 10,
    },
    testimonialAuthor: {
        fontSize: 12,
        fontWeight: 'bold',
        color: COLORS.textSecondary,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.cardBackground,
        paddingHorizontal: 15,
        borderRadius: 12,
        height: 50,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    searchInput: {
        flex: 1,
        marginLeft: 10,
        fontSize: 16,
        color: COLORS.text,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    viewAll: {
        fontSize: 12,
        color: COLORS.accentRed,
        fontWeight: '600',
    },
    publicEventCard: {
        width: 250,
        marginRight: 15,
        backgroundColor: COLORS.primary,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: COLORS.border,
        overflow: 'hidden',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    eventImagePlaceholder: {
        height: 120,
        backgroundColor: COLORS.accentRed,
        justifyContent: 'center',
        alignItems: 'center',
    },
    eventImageText: {
        color: COLORS.primary,
        fontWeight: 'bold',
    },
    eventContent: {
        padding: 12,
    },
    eventArtistName: {
        fontSize: 12,
        color: COLORS.accent,
        fontWeight: 'bold',
    },
    eventTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.text,
        marginVertical: 4,
    },
    eventInfoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    eventInfoText: {
        fontSize: 12,
        color: COLORS.textSecondary,
        marginLeft: 4,
    },
    artistGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 10,
    },
    artistCardSmall: {
        width: (width - 60) / 2,
        margin: 10,
        alignItems: 'center',
        padding: 15,
        backgroundColor: COLORS.cardBackground,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    artistCircle: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: COLORS.accent,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    artistInitial: {
        fontSize: 24,
        color: COLORS.primary,
        fontWeight: 'bold',
    },
    artistNameSmall: {
        fontSize: 14,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    artistCategorySmall: {
        fontSize: 11,
        color: COLORS.textSecondary,
    },
});
