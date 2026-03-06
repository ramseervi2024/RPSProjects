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
import { Search, MapPin } from 'lucide-react-native';
import { COLORS } from '../theme';
import { GAYAK_KALAKARS } from '../gayakkalakarslist';
import { ONGOING_EVENTS } from '../ongoingupcomingevents';

const { width } = Dimensions.get('window');

export default function HomeTab({ onSelectArtist, onSelectEvent, searchQuery, setSearchQuery }) {
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

            {/* Featured Public Events */}
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Public Events</Text>
                <TouchableOpacity onPress={() => { }}>
                    <Text style={styles.viewAll}>View All</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={ONGOING_EVENTS}
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

            {/* Artists */}
            <Text style={[styles.sectionTitle, { marginLeft: 20, marginTop: 25 }]}>Featured Gayak Kalakars</Text>
            <View style={styles.artistGrid}>
                {GAYAK_KALAKARS.map(artist => (
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
