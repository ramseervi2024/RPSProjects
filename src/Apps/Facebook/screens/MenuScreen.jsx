import { ScrollView, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { User, Users, Bookmark, Clock, Store, Video, Flag, Settings, CircleHelp as HelpCircle, Moon, LogOut } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const profile = {
    name: 'John Doe',
    image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
};

const menuSections = [
    {
        id: '1',
        items: [
            { id: '1', icon: User, label: 'Profile', color: '#1877F2' },
            { id: '2', icon: Users, label: 'Friends', color: '#1877F2' },
            { id: '3', icon: Bookmark, label: 'Saved', color: '#9360FF' },
            { id: '4', icon: Clock, label: 'Memories', color: '#45BD62' },
        ],
    },
    {
        id: '2',
        items: [
            { id: '5', icon: Store, label: 'Marketplace', color: '#F5533D' },
            { id: '6', icon: Video, label: 'Video', color: '#1877F2' },
            { id: '7', icon: Flag, label: 'Pages', color: '#F7B928' },
        ],
    },
    {
        id: '3',
        items: [
            { id: '8', icon: Settings, label: 'Settings', color: '#65676B' },
            { id: '9', icon: HelpCircle, label: 'Help & Support', color: '#65676B' },
            { id: '10', icon: Moon, label: 'Dark Mode', color: '#65676B' },
            { id: '11', icon: LogOut, label: 'Log Out', color: '#65676B' },
        ],
    },
];

export default function MenuScreen() {
    return (
        <SafeAreaView style={styles.container1}>
            <ScrollView style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Menu</Text>
                </View>

                <TouchableOpacity style={styles.profileCard}>
                    <Image source={{ uri: profile.image }} style={styles.profileImage} />
                    <View style={styles.profileInfo}>
                        <Text style={styles.profileName}>{profile.name}</Text>
                        <Text style={styles.viewProfile}>View your profile</Text>
                    </View>
                </TouchableOpacity>

                {menuSections.map((section) => (
                    <View key={section.id} style={styles.section}>
                        {section.items.map((item) => {
                            const IconComponent = item.icon;
                            return (
                                <TouchableOpacity key={item.id} style={styles.menuItem}>
                                    <View style={[styles.iconContainer, { backgroundColor: `${item.color}15` }]}>
                                        <IconComponent size={24} color={item.color} />
                                    </View>
                                    <Text style={styles.menuLabel}>{item.label}</Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                ))}

                <Text style={styles.version}>Facebook © 2025</Text>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container1: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        flex: 1,
        backgroundColor: '#F0F2F5',
    },
    header: {
        padding: 16,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#E4E4E4',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    profileCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: 'white',
        marginBottom: 8,
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 12,
    },
    profileInfo: {
        flex: 1,
    },
    profileName: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 2,
    },
    viewProfile: {
        fontSize: 14,
        color: '#65676B',
    },
    section: {
        backgroundColor: 'white',
        marginBottom: 8,
        paddingVertical: 8,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
    },
    iconContainer: {
        width: 36,
        height: 36,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    menuLabel: {
        fontSize: 16,
        color: '#050505',
    },
    version: {
        textAlign: 'center',
        padding: 16,
        color: '#65676B',
        fontSize: 12,
    },
});