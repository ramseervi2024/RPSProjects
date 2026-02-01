import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import Header from '../components/Header';
import { User, Settings, LogOut, ChevronRight, MapPin, Phone } from 'lucide-react-native';

const ProfileOption = ({ icon, title }) => (
    <TouchableOpacity style={styles.option}>
        <View style={styles.optionLeft}>
            {icon}
            <Text style={styles.optionText}>{title}</Text>
        </View>
        <ChevronRight size={20} color="#9CA3AF" />
    </TouchableOpacity>
);

const ProfileScreen = () => {
    return (
        <View style={styles.container}>
            <Header title="My Profile" />
            <ScrollView style={styles.content}>
                <View style={styles.profileCard}>
                    <View style={styles.avatarContainer}>
                        <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.avatar} />
                        <View style={styles.editIcon}>
                            <User size={16} color="#FFFFFF" />
                        </View>
                    </View>
                    <Text style={styles.name}>Ram Lal</Text>
                    <Text style={styles.role}>Farmer • 15 Acres</Text>

                    <View style={styles.infoRow}>
                        <MapPin size={16} color="#9CA3AF" />
                        <Text style={styles.infoText}>Village Jadan, Pali, Rajasthan</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Phone size={16} color="#9CA3AF" />
                        <Text style={styles.infoText}>+91 98765 43210</Text>
                    </View>
                </View>

                <Text style={styles.sectionTitle}>Account</Text>
                <View style={styles.optionsList}>
                    <ProfileOption icon={<User size={20} color="#FFFFFF" />} title="Edit Profile" />
                    <ProfileOption icon={<MapPin size={20} color="#FFFFFF" />} title="Manage Addresses" />
                    <ProfileOption icon={<Settings size={20} color="#FFFFFF" />} title="Settings" />
                </View>

                <TouchableOpacity style={styles.logoutButton}>
                    <LogOut size={20} color="#EF4444" />
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0F172A',
    },
    content: {
        padding: 16,
    },
    profileCard: {
        backgroundColor: '#111827',
        borderRadius: 16,
        padding: 24,
        alignItems: 'center',
        marginBottom: 24
    },
    avatarContainer: {
        position: 'relative',
        marginBottom: 16
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 4,
        borderColor: '#16A34A'
    },
    editIcon: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: '#16A34A',
        padding: 8,
        borderRadius: 20
    },
    name: {
        color: '#FFFFFF',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 4
    },
    role: {
        color: '#16A34A',
        fontSize: 16,
        marginBottom: 16,
        fontWeight: '600'
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
        gap: 8
    },
    infoText: {
        color: '#D1D5DB'
    },
    sectionTitle: {
        color: '#9CA3AF',
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 8,
        marginLeft: 8,
        textTransform: 'uppercase'
    },
    optionsList: {
        backgroundColor: '#111827',
        borderRadius: 16,
        padding: 8,
        marginBottom: 24
    },
    option: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#1F2937'
    },
    optionLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12
    },
    optionText: {
        color: '#FFFFFF',
        fontSize: 16
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        gap: 8
    },
    logoutText: {
        color: '#EF4444',
        fontSize: 16,
        fontWeight: 'bold'
    }
});

export default ProfileScreen;
