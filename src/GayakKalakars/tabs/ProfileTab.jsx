import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { Phone, Star } from 'lucide-react-native';
import { COLORS } from '../theme';

export default function ProfileTab() {
    return (
        <View style={styles.tabContent}>
            <View style={styles.profileHeader}>
                <View style={styles.profileImageLarge} />
                <Text style={styles.userName}>Ramesh Seervi</Text>
                <Text style={styles.userRole}>Event Organizer</Text>
                <TouchableOpacity style={styles.editProfileBtn}>
                    <Text style={styles.editProfileBtnText}>Edit Profile</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.profileStats}>
                <View style={styles.profileStatItem}>
                    <Text style={styles.profileStatValue}>12</Text>
                    <Text style={styles.profileStatLabel}>Bookings</Text>
                </View>
                <View style={styles.profileStatItem}>
                    <Text style={styles.profileStatValue}>5</Text>
                    <Text style={styles.profileStatLabel}>Reviews</Text>
                </View>
            </View>
            <View style={styles.menuList}>
                <TouchableOpacity style={styles.menuItem}>
                    <Phone size={20} color={COLORS.text} />
                    <Text style={styles.menuItemText}>Support</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem}>
                    <Star size={20} color={COLORS.text} />
                    <Text style={styles.menuItemText}>Settings</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    tabContent: {
        flex: 1,
        padding: 20,
        backgroundColor: COLORS.primary,
    },
    profileHeader: {
        alignItems: 'center',
        paddingVertical: 30,
    },
    profileImageLarge: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: COLORS.border,
        marginBottom: 15,
    },
    userName: {
        fontSize: 22,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    userRole: {
        fontSize: 14,
        color: COLORS.textSecondary,
        marginTop: 4,
    },
    editProfileBtn: {
        marginTop: 15,
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    editProfileBtnText: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.text,
    },
    profileStats: {
        flexDirection: 'row',
        backgroundColor: COLORS.cardBackground,
        padding: 20,
        borderRadius: 20,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    profileStatItem: {
        flex: 1,
        alignItems: 'center',
    },
    profileStatValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    profileStatLabel: {
        fontSize: 12,
        color: COLORS.textSecondary,
    },
    menuList: {
        marginTop: 20,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    menuItemText: {
        fontSize: 16,
        marginLeft: 15,
        fontWeight: '500',
        color: COLORS.text,
    },
});
