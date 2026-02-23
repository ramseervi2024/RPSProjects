import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Switch, Modal, TextInput, Alert } from 'react-native';
import { COLORS, SPACING, SIZES } from '../constants/theme';
import { User, Settings, Bell, Shield, HelpCircle, LogOut, ChevronRight, CreditCard, PieChart, Users, X, Phone, Briefcase } from 'lucide-react-native';
import useFleetStore from '../store/useFleetStore';

const ProfileOption = ({ icon: Icon, title, subtitle, showSwitch, value, onValueChange, onPress }) => (
    <TouchableOpacity style={styles.option} activeOpacity={0.7} onPress={onPress}>
        <View style={[styles.iconBox, { backgroundColor: COLORS.surfaceLight + '40' }]}>
            <Icon color={COLORS.primary} size={22} />
        </View>
        <View style={styles.optionInfo}>
            <Text style={styles.optionTitle}>{title}</Text>
            {subtitle && <Text style={styles.optionSubtitle}>{subtitle}</Text>}
        </View>
        {showSwitch ? (
            <Switch
                value={value}
                onValueChange={onValueChange}
                trackColor={{ false: COLORS.surfaceLight, true: COLORS.primary }}
                thumbColor="#fff"
            />
        ) : (
            <ChevronRight color={COLORS.textSecondary} size={20} />
        )}
    </TouchableOpacity>
);

const Profile = ({ navigation }) => {
    const { vehicles, drivers, addDriver } = useFleetStore();
    const [modalVisible, setModalVisible] = useState(false);
    const [newDriver, setNewDriver] = useState({
        name: '',
        phone: '',
        experience: '',
        status: 'Available'
    });

    const handleAddDriver = () => {
        if (!newDriver.name || !newDriver.phone) {
            Alert.alert('Error', 'Please fill in name and phone');
            return;
        }
        addDriver(newDriver);
        setModalVisible(false);
        setNewDriver({ name: '', phone: '', experience: '', status: 'Available' });
    };

    return (
        <SafeAreaView style={styles.safeContainer}>
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <View style={styles.avatarContainer}>
                        <View style={styles.avatar}>
                            <User size={40} color={COLORS.primary} />
                        </View>
                        <TouchableOpacity style={styles.editBtn}>
                            <Text style={styles.editBtnText}>Edit</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.userName}>Director Ramesh</Text>
                    <Text style={styles.userRole}>Fleet Operations Manager</Text>

                    <View style={styles.statsContainer}>
                        <View style={styles.statItem}>
                            <Text style={styles.statVal}>{vehicles.length}</Text>
                            <Text style={styles.statLab}>Vehicles</Text>
                        </View>
                        <View style={styles.statDivider} />
                        <View style={styles.statItem}>
                            <Text style={styles.statVal}>{drivers.length}</Text>
                            <Text style={styles.statLab}>Drivers</Text>
                        </View>
                        <View style={styles.statDivider} />
                        <View style={styles.statItem}>
                            <Text style={styles.statVal}>94%</Text>
                            <Text style={styles.statLab}>Efficiency</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.content}>
                    <Text style={styles.sectionLabel}>DRIVER MANAGEMENT</Text>
                    <View style={styles.section}>
                        <ProfileOption
                            icon={Users}
                            title="Add New Driver"
                            subtitle="Register operator to fleet"
                            onPress={() => setModalVisible(true)}
                        />
                        <ProfileOption
                            icon={Users}
                            title="View All Drivers"
                            subtitle={`${drivers.length} registered operators`}
                            onPress={() => navigation.navigate('DriversList')}
                        />
                    </View>

                    <Text style={styles.sectionLabel}>FLEET SETTINGS</Text>
                    <View style={styles.section}>
                        <ProfileOption icon={Bell} title="Smart Notifications" subtitle="Alerts for fuel and maintenance" showSwitch value={true} />
                        <ProfileOption icon={Shield} title="Security Protocol" subtitle="Biometric access for drivers" />
                        <ProfileOption icon={CreditCard} title="Billing & Payments" subtitle="Subscription: Business Pro" />
                    </View>

                    <Text style={styles.sectionLabel}>SUPPORT</Text>
                    <View style={styles.section}>
                        <ProfileOption icon={HelpCircle} title="Help Center" subtitle="FAQs and customer support" />
                        <TouchableOpacity style={styles.logoutBtn}>
                            <LogOut color={COLORS.danger} size={20} />
                            <Text style={styles.logoutText}>Sign Out from FleetTrack</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Register Driver</Text>
                            <TouchableOpacity onPress={() => setModalVisible(false)}>
                                <X color={COLORS.text} size={24} />
                            </TouchableOpacity>
                        </View>

                        <ScrollView style={styles.modalForm}>
                            <Text style={styles.inputLabel}>Full Name</Text>
                            <View style={styles.inputBox}>
                                <User size={18} color={COLORS.primary} style={{ marginRight: 10 }} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="e.g. Alok Singh"
                                    placeholderTextColor={COLORS.textSecondary + '80'}
                                    value={newDriver.name}
                                    onChangeText={(text) => setNewDriver({ ...newDriver, name: text })}
                                />
                            </View>

                            <Text style={styles.inputLabel}>Phone Number</Text>
                            <View style={styles.inputBox}>
                                <Phone size={18} color={COLORS.primary} style={{ marginRight: 10 }} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="e.g. +91 98765 43210"
                                    placeholderTextColor={COLORS.textSecondary + '80'}
                                    keyboardType="phone-pad"
                                    value={newDriver.phone}
                                    onChangeText={(text) => setNewDriver({ ...newDriver, phone: text })}
                                />
                            </View>

                            <Text style={styles.inputLabel}>Experience</Text>
                            <View style={styles.inputBox}>
                                <Briefcase size={18} color={COLORS.primary} style={{ marginRight: 10 }} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="e.g. 5 Years"
                                    placeholderTextColor={COLORS.textSecondary + '80'}
                                    value={newDriver.experience}
                                    onChangeText={(text) => setNewDriver({ ...newDriver, experience: text })}
                                />
                            </View>

                            <TouchableOpacity style={styles.submitBtn} onPress={handleAddDriver}>
                                <Text style={styles.submitBtnText}>Add Driver</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    container: {
        flex: 1,
    },
    header: {
        alignItems: 'center',
        paddingVertical: SPACING.xl,
        backgroundColor: COLORS.surface,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        borderWidth: 1,
        borderColor: '#ffffff08',
    },
    avatarContainer: {
        position: 'relative',
        marginBottom: SPACING.md,
    },
    avatar: {
        width: 90,
        height: 90,
        borderRadius: 45,
        backgroundColor: COLORS.background,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: COLORS.primary,
    },
    editBtn: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: COLORS.primary,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },
    editBtnText: {
        color: '#fff',
        fontSize: 10,
        fontWeight: 'bold',
    },
    userName: {
        fontSize: 22,
        fontWeight: '700',
        color: COLORS.text,
    },
    userRole: {
        fontSize: 14,
        color: COLORS.textSecondary,
        marginTop: 4,
    },
    statsContainer: {
        flexDirection: 'row',
        marginTop: SPACING.lg,
        alignItems: 'center',
        gap: 30,
    },
    statItem: {
        alignItems: 'center',
    },
    statVal: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    statLab: {
        fontSize: 11,
        color: COLORS.textSecondary,
        marginTop: 2,
    },
    statDivider: {
        width: 1,
        height: 20,
        backgroundColor: '#ffffff10',
    },
    content: {
        padding: SPACING.md,
        paddingBottom: 110,
    },
    sectionLabel: {
        fontSize: 12,
        fontWeight: 'bold',
        color: COLORS.textSecondary,
        marginBottom: 12,
        marginTop: SPACING.lg,
        marginLeft: 4,
        letterSpacing: 1,
    },
    section: {
        backgroundColor: COLORS.surface,
        borderRadius: SIZES.radius + 4,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#ffffff08',
        marginBottom: SPACING.sm,
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: SPACING.md,
        borderBottomWidth: 1,
        borderBottomColor: '#ffffff05',
    },
    iconBox: {
        width: 42,
        height: 42,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    optionInfo: {
        flex: 1,
        marginLeft: 14,
    },
    optionTitle: {
        fontSize: 15,
        fontWeight: '600',
        color: COLORS.text,
    },
    optionSubtitle: {
        fontSize: 12,
        color: COLORS.textSecondary,
        marginTop: 2,
    },
    logoutBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: SPACING.md,
        gap: 10,
    },
    logoutText: {
        color: COLORS.danger,
        fontWeight: 'bold',
        fontSize: 15,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: COLORS.background,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: SPACING.md,
        maxHeight: '85%',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ffffff10',
    },
    modalTitle: {
        color: COLORS.text,
        fontSize: 22,
        fontWeight: 'bold',
    },
    modalForm: {
        paddingBottom: 30,
    },
    inputLabel: {
        color: COLORS.textSecondary,
        fontSize: 14,
        fontWeight: '700',
        marginBottom: 10,
        marginTop: 20,
        marginLeft: 4,
    },
    inputBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.surface,
        borderRadius: 16,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: '#ffffff08',
    },
    input: {
        flex: 1,
        paddingVertical: 14,
        color: COLORS.text,
        fontSize: 16,
    },
    submitBtn: {
        backgroundColor: COLORS.primary,
        borderRadius: 16,
        padding: 18,
        alignItems: 'center',
        marginTop: 40,
        marginBottom: 20,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 8,
    },
    submitBtnText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Profile;
