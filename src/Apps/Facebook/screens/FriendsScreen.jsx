import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Search, UserPlus } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const friendRequests = [
    {
        id: '1',
        name: 'Sarah Johnson',
        mutualFriends: 15,
        image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    },
    {
        id: '2',
        name: 'Michael Brown',
        mutualFriends: 8,
        image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    },
];

const suggestions = [
    {
        id: '1',
        name: 'Emma Wilson',
        mutualFriends: 23,
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    },
    {
        id: '2',
        name: 'David Lee',
        mutualFriends: 12,
        image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    },
];

export default function FriendsScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Friends</Text>
                    <TouchableOpacity style={styles.searchButton}>
                        <Search size={24} color="#000" />
                    </TouchableOpacity>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Friend Requests</Text>
                    {friendRequests.map((request) => (
                        <View key={request.id} style={styles.requestCard}>
                            <Image source={{ uri: request.image }} style={styles.userImage} />
                            <View style={styles.requestInfo}>
                                <Text style={styles.userName}>{request.name}</Text>
                                <Text style={styles.mutualFriends}>{request.mutualFriends} mutual friends</Text>
                                <View style={styles.requestActions}>
                                    <TouchableOpacity style={styles.confirmButton}>
                                        <Text style={styles.confirmButtonText}>Confirm</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.deleteButton}>
                                        <Text style={styles.deleteButtonText}>Delete</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    ))}
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>People You May Know</Text>
                    {suggestions.map((suggestion) => (
                        <View key={suggestion.id} style={styles.suggestionCard}>
                            <Image source={{ uri: suggestion.image }} style={styles.userImage} />
                            <View style={styles.suggestionInfo}>
                                <Text style={styles.userName}>{suggestion.name}</Text>
                                <Text style={styles.mutualFriends}>{suggestion.mutualFriends} mutual friends</Text>
                                <TouchableOpacity style={styles.addFriendButton}>
                                    <UserPlus size={16} color="#1877F2" />
                                    <Text style={styles.addFriendText}>Add Friend</Text>
                                </TouchableOpacity>
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
        backgroundColor: '#F0F2F5',
        justifyContent: 'center',
        alignItems: 'center',
    },
    section: {
        padding: 16,
        backgroundColor: 'white',
        marginBottom: 8,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 16,
    },
    requestCard: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    suggestionCard: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    userImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginRight: 12,
    },
    requestInfo: {
        flex: 1,
    },
    suggestionInfo: {
        flex: 1,
    },
    userName: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
    },
    mutualFriends: {
        fontSize: 14,
        color: '#65676B',
        marginBottom: 8,
    },
    requestActions: {
        flexDirection: 'row',
        gap: 8,
    },
    confirmButton: {
        backgroundColor: '#1877F2',
        paddingVertical: 8,
        paddingHorizontal: 24,
        borderRadius: 6,
    },
    confirmButtonText: {
        color: 'white',
        fontWeight: '600',
    },
    deleteButton: {
        backgroundColor: '#E4E6EB',
        paddingVertical: 8,
        paddingHorizontal: 24,
        borderRadius: 6,
    },
    deleteButtonText: {
        color: '#050505',
        fontWeight: '600',
    },
    addFriendButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E7F3FF',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 6,
        alignSelf: 'flex-start',
    },
    addFriendText: {
        color: '#1877F2',
        fontWeight: '600',
        marginLeft: 4,
    },
});