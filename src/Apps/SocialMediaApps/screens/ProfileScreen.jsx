import { View, Text, StyleSheet, Pressable, FlatList } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Settings, Grid2x2 as Grid, Bookmark } from 'lucide-react-native';

const PROFILE = {
    username: 'johndoe',
    name: 'John Doe',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
    bio: 'Digital creator | Photography enthusiast 📸\nExploring the world one photo at a time ✈️',
    stats: {
        posts: 42,
        followers: 1234,
        following: 567,
    },
    posts: [
        {
            id: '1',
            image: 'https://images.unsplash.com/photo-1707343843437-caacff5cfa74',
        },
        {
            id: '2',
            image: 'https://images.unsplash.com/photo-1707144960723-b81cacfca6e5',
        },
        {
            id: '4',
            image: 'https://images.unsplash.com/photo-1707343843437-caacff5cfa74',
        },
        {
            id: '12',
            image: 'https://images.unsplash.com/photo-1707144960723-b81cacfca6e5',
        },
        {
            id: '13',
            image: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba',
        },
        {
            id: '21',
            image: 'https://images.unsplash.com/photo-1707343843437-caacff5cfa74',
        },
        {
            id: '22',
            image: 'https://images.unsplash.com/photo-1707144960723-b81cacfca6e5',
        },
        {
            id: '23',
            image: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba',
        },
    ],
};

export default function ProfileScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>{PROFILE.username}</Text>
                <Pressable>
                    <Settings size={24} color="#000" />
                </Pressable>
            </View>

            <FlatList
                ListHeaderComponent={() => (
                    <>
                        <View style={styles.profileHeader}>
                            <FastImage source={{ uri: PROFILE.avatar }} style={styles.avatar} />
                            <View style={styles.statsContainer}>
                                <View style={styles.stat}>
                                    <Text style={styles.statNumber}>{PROFILE.stats.posts}</Text>
                                    <Text style={styles.statLabel}>Posts</Text>
                                </View>
                                <View style={styles.stat}>
                                    <Text style={styles.statNumber}>{PROFILE.stats.followers}</Text>
                                    <Text style={styles.statLabel}>Followers</Text>
                                </View>
                                <View style={styles.stat}>
                                    <Text style={styles.statNumber}>{PROFILE.stats.following}</Text>
                                    <Text style={styles.statLabel}>Following</Text>
                                </View>
                            </View>
                        </View>

                        <View style={styles.bioSection}>
                            <Text style={styles.name}>{PROFILE.name}</Text>
                            <Text style={styles.bio}>{PROFILE.bio}</Text>
                        </View>

                        <Pressable style={styles.editButton}>
                            <Text style={styles.editButtonText}>Edit Profile</Text>
                        </Pressable>

                        <View style={styles.tabBar}>
                            <Pressable style={[styles.tab, styles.activeTab]}>
                                <Grid size={24} color="#000" />
                            </Pressable>
                            <Pressable style={styles.tab}>
                                <Bookmark size={24} color="#666" />
                            </Pressable>
                        </View>
                    </>
                )}
                data={PROFILE.posts}
                renderItem={({ item }) => (
                    <View style={styles.gridItem}>
                        <FastImage source={{ uri: item.image }} style={styles.gridImage} />
                    </View>
                )}
                keyExtractor={(item) => item.id}
                numColumns={3}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        paddingTop: 60,
        paddingHorizontal: 16,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#f1f1f1',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 24,
        fontFamily: 'Inter_700Bold',
    },
    profileHeader: {
        flexDirection: 'row',
        padding: 16,
        alignItems: 'center',
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
    },
    statsContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginLeft: 16,
    },
    stat: {
        alignItems: 'center',
    },
    statNumber: {
        fontSize: 18,
        fontFamily: 'Inter_600SemiBold',
    },
    statLabel: {
        fontSize: 12,
        color: '#666',
        fontFamily: 'Inter_400Regular',
    },
    bioSection: {
        padding: 16,
        paddingTop: 0,
    },
    name: {
        fontSize: 16,
        fontFamily: 'Inter_600SemiBold',
        marginBottom: 4,
    },
    bio: {
        fontSize: 14,
        fontFamily: 'Inter_400Regular',
        lineHeight: 20,
    },
    editButton: {
        margin: 16,
        padding: 8,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#dbdbdb',
        alignItems: 'center',
    },
    editButtonText: {
        fontSize: 14,
        fontFamily: 'Inter_600SemiBold',
    },
    tabBar: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: '#dbdbdb',
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        padding: 12,
    },
    activeTab: {
        borderBottomWidth: 2,
        borderBottomColor: '#000',
    },
    gridItem: {
        flex: 1 / 3,
        aspectRatio: 1,
        padding: 1,
    },
    gridImage: {
        flex: 1,
    },
});
