import { ScrollView, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Search, ThumbsUp, MessageCircle, UserPlus, Heart } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const notifications = [
    {
        id: '1',
        type: 'like',
        user: 'Emma Wilson',
        userImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        content: 'liked your post',
        timeAgo: '2m ago',
        postImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        isUnread: true,
    },
    {
        id: '2',
        type: 'comment',
        user: 'John Doe',
        userImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        content: 'commented on your photo',
        timeAgo: '15m ago',
        postImage: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        isUnread: true,
    },
    {
        id: '3',
        type: 'friend_request',
        user: 'Michael Brown',
        userImage: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        content: 'sent you a friend request',
        timeAgo: '1h ago',
        isUnread: false,
    },
    {
        id: '4',
        type: 'like',
        user: 'Sarah Johnson',
        userImage: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        content: 'liked your comment',
        timeAgo: '2h ago',
        isUnread: false,
    },
];

const NotificationIcon = ({ type }) => {
    switch (type) {
        case 'like':
            return <ThumbsUp size={16} color="white" />;
        case 'comment':
            return <MessageCircle size={16} color="white" />;
        case 'friend_request':
            return <UserPlus size={16} color="white" />;
        default:
            return <Heart size={16} color="white" />;
    }
};

const getIconBackground = (type) => {
    switch (type) {
        case 'like':
            return '#1877F2';
        case 'comment':
            return '#45BD62';
        case 'friend_request':
            return '#9360FF';
        default:
            return '#F5533D';
    }
};

export default function NotificationsScreen() {
    return (
        <SafeAreaView style={styles.container}>

            <ScrollView style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Notifications</Text>
                    <TouchableOpacity style={styles.searchButton}>
                        <Search size={24} color="#000" />
                    </TouchableOpacity>
                </View>

                <View style={styles.notifications}>
                    {notifications.map((notification) => (
                        <TouchableOpacity
                            key={notification.id}
                            style={[
                                styles.notificationCard,
                                notification.isUnread && styles.unreadCard,
                            ]}
                        >
                            <View style={styles.notificationContent}>
                                <View style={styles.userImageContainer}>
                                    <Image
                                        source={{ uri: notification.userImage }}
                                        style={styles.userImage}
                                    />
                                    <View
                                        style={[
                                            styles.iconContainer,
                                            { backgroundColor: getIconBackground(notification.type) },
                                        ]}
                                    >
                                        <NotificationIcon type={notification.type} />
                                    </View>
                                </View>
                                <View style={styles.textContainer}>
                                    <Text style={styles.notificationText}>
                                        <Text style={styles.username}>{notification.user}</Text>{' '}
                                        {notification.content}
                                    </Text>
                                    <Text style={styles.timeAgo}>{notification.timeAgo}</Text>
                                </View>
                                {notification.postImage && (
                                    <Image
                                        source={{ uri: notification.postImage }}
                                        style={styles.postImage}
                                    />
                                )}
                            </View>
                        </TouchableOpacity>
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
        backgroundColor: '#F0F2F5',
        justifyContent: 'center',
        alignItems: 'center',
    },
    notifications: {
        padding: 8,
    },
    notificationCard: {
        backgroundColor: 'white',
        padding: 12,
        marginBottom: 1,
    },
    unreadCard: {
        backgroundColor: '#E7F3FF',
    },
    notificationContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    userImageContainer: {
        position: 'relative',
        marginRight: 12,
    },
    userImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    iconContainer: {
        position: 'absolute',
        bottom: -4,
        right: -4,
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: '#1877F2',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'white',
    },
    textContainer: {
        flex: 1,
        marginRight: 8,
    },
    notificationText: {
        fontSize: 14,
        color: '#050505',
        marginBottom: 4,
    },
    username: {
        fontWeight: '600',
    },
    timeAgo: {
        fontSize: 12,
        color: '#65676B',
    },
    postImage: {
        width: 60,
        height: 60,
        borderRadius: 8,
    },
});