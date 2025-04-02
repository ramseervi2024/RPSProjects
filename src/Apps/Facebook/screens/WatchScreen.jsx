import { ScrollView, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Search, CirclePlay as PlayCircle, ThumbsUp, MessageCircle, Share } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const videos = [
    {
        id: '1',
        user: 'National Geographic',
        userImage: 'https://images.unsplash.com/photo-1535083783855-76ae62b2914e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        timeAgo: '3 hours ago',
        title: 'Amazing Wildlife in Africa 🦁',
        description: 'Watch these incredible moments captured in the Serengeti...',
        thumbnail: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        views: '2.5M',
        duration: '12:45',
        likes: 45000,
        comments: 1200,
        shares: 300,
    },
    {
        id: '2',
        user: 'Food Network',
        userImage: 'https://images.unsplash.com/photo-1542834369-f10ebf06d3e0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        timeAgo: '5 hours ago',
        title: 'Easy 15-Minute Pasta Recipes 🍝',
        description: 'Quick and delicious pasta recipes for busy weeknights...',
        thumbnail: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        views: '1.2M',
        duration: '8:30',
        likes: 28000,
        comments: 850,
        shares: 150,
    },
    {
        id: '3',
        user: 'Travel & Living',
        userImage: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        timeAgo: '1 day ago',
        title: 'Hidden Gems in Bali 🌴',
        description: 'Discover secret beaches and ancient temples...',
        thumbnail: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        views: '890K',
        duration: '15:20',
        likes: 32000,
        comments: 920,
        shares: 250,
    },
];

export default function WatchScreen() {
    return (
        <SafeAreaView style={styles.container}>

            <ScrollView style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Watch</Text>
                    <TouchableOpacity style={styles.searchButton}>
                        <Search size={24} color="#000" />
                    </TouchableOpacity>
                </View>

                <View style={styles.videos}>
                    {videos.map((video) => (
                        <View key={video.id} style={styles.videoCard}>
                            <View style={styles.thumbnailContainer}>
                                <Image source={{ uri: video.thumbnail }} style={styles.thumbnail} />
                                <View style={styles.duration}>
                                    <Text style={styles.durationText}>{video.duration}</Text>
                                </View>
                                <TouchableOpacity style={styles.playButton}>
                                    <PlayCircle size={48} color="white" />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.videoInfo}>
                                <View style={styles.videoHeader}>
                                    <Image source={{ uri: video.userImage }} style={styles.userImage} />
                                    <View style={styles.videoMeta}>
                                        <Text style={styles.videoTitle}>{video.title}</Text>
                                        <Text style={styles.videoStats}>
                                            {video.user} • {video.views} views • {video.timeAgo}
                                        </Text>
                                    </View>
                                </View>
                                <Text style={styles.videoDescription}>{video.description}</Text>
                                <View style={styles.videoActions}>
                                    <TouchableOpacity style={styles.actionButton}>
                                        <ThumbsUp size={20} color="#65676B" />
                                        <Text style={styles.actionText}>{video.likes}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.actionButton}>
                                        <MessageCircle size={20} color="#65676B" />
                                        <Text style={styles.actionText}>{video.comments}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.actionButton}>
                                        <Share size={20} color="#65676B" />
                                        <Text style={styles.actionText}>{video.shares}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#E4E4E4',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    searchButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    videos: {
        padding: 8,
    },
    videoCard: {
        backgroundColor: 'white',
        borderRadius: 8,
        marginBottom: 8,
        overflow: 'hidden',
    },
    thumbnailContainer: {
        position: 'relative',
        height: 240,
    },
    thumbnail: {
        width: '100%',
        height: '100%',
    },
    duration: {
        position: 'absolute',
        bottom: 8,
        right: 8,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
    },
    durationText: {
        color: 'white',
        fontSize: 12,
        fontWeight: '500',
    },
    playButton: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -24 }, { translateY: -24 }],
    },
    videoInfo: {
        padding: 12,
    },
    videoHeader: {
        flexDirection: 'row',
        marginBottom: 8,
    },
    userImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 8,
    },
    videoMeta: {
        flex: 1,
    },
    videoTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
    },
    videoStats: {
        fontSize: 12,
        color: '#65676B',
    },
    videoDescription: {
        fontSize: 14,
        color: '#050505',
        marginBottom: 12,
    },
    videoActions: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: '#E4E4E4',
        paddingTop: 12,
    },
    actionButton: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
    },
    actionText: {
        color: '#65676B',
        marginLeft: 4,
        fontSize: 12,
    },
});