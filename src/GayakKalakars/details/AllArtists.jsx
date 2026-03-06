import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    TextInput,
    Dimensions,
    SafeAreaView,
    StatusBar,
} from 'react-native';
import { ChevronLeft, Search, Star } from 'lucide-react-native';
import { COLORS } from '../theme';
import { GAYAK_KALAKARS } from '../data/gayakkalakarslist';

const { width } = Dimensions.get('window');

export default function AllArtists({ onSelectArtist, onBack }) {
    const [search, setSearch] = useState('');

    const filteredArtists = GAYAK_KALAKARS.filter(artist =>
        artist.name.toLowerCase().includes(search.toLowerCase()) ||
        artist.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={onBack} style={styles.backButton}>
                    <ChevronLeft size={28} color={COLORS.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>All Gayak Kalakars</Text>
                <View style={{ width: 28 }} />
            </View>

            {/* Search Bar */}
            <View style={styles.searchSection}>
                <View style={styles.searchBar}>
                    <Search size={20} color={COLORS.textSecondary} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search by name or title..."
                        value={search}
                        onChangeText={setSearch}
                    />
                </View>
            </View>

            {/* Artists Grid */}
            <FlatList
                data={filteredArtists}
                numColumns={2}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContainer}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.artistCard}
                        onPress={() => onSelectArtist(item)}
                    >
                        <View style={styles.artistCircle}>
                            <Text style={styles.artistInitial}>{item.name.charAt(0)}</Text>
                        </View>
                        <Text style={styles.artistName} numberOfLines={1}>{item.name}</Text>
                        <Text style={styles.artistTitle}>{item.title}</Text>
                        <View style={styles.ratingRow}>
                            <Star size={12} color={COLORS.accent} fill={COLORS.accent} />
                            <Text style={styles.ratingText}>4.9</Text>
                        </View>
                    </TouchableOpacity>
                )}
                ListEmptyComponent={
                    <View style={styles.emptyView}>
                        <Text style={styles.emptyText}>No artists found for "{search}"</Text>
                    </View>
                }
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.primary,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.text,
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
    listContainer: {
        paddingHorizontal: 10,
        paddingBottom: 40,
    },
    artistCard: {
        width: (width - 60) / 2,
        margin: 10,
        alignItems: 'center',
        padding: 20,
        backgroundColor: COLORS.cardBackground,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: COLORS.border,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    artistCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: COLORS.accent,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    artistInitial: {
        fontSize: 32,
        color: COLORS.primary,
        fontWeight: 'bold',
    },
    artistName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    artistTitle: {
        fontSize: 12,
        color: COLORS.textSecondary,
        marginVertical: 4,
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    ratingText: {
        fontSize: 12,
        color: COLORS.text,
        marginLeft: 4,
        fontWeight: '600',
    },
    emptyView: {
        marginTop: 100,
        alignItems: 'center',
    },
    emptyText: {
        color: COLORS.textSecondary,
        fontSize: 16,
    },
});
