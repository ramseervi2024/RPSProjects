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
        padding: 24, // Unified header padding
        alignItems: 'center',
        backgroundColor: COLORS.surface,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        borderWidth: 1,
        borderTopWidth: 0,
        borderColor: '#ffffff08',
    },
    avatarContainer: {
        alignItems: 'center',
        marginBottom: 16,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: COLORS.background,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.primary + '30',
    },
    editBtn: {
        position: 'absolute',
        bottom: -5,
        backgroundColor: COLORS.primary,
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 10,
    },
    editBtnText: {
        color: 'white',
        fontSize: 10,
        fontWeight: 'bold',
    },
    userName: {
        color: COLORS.text,
        fontSize: 22,
        fontWeight: 'bold',
    },
    userRole: {
        color: COLORS.textSecondary,
        fontSize: 13,
        marginTop: 2,
    },
    statsContainer: {
        flexDirection: 'row',
        marginTop: 24,
        paddingHorizontal: 20,
    },
    statItem: {
        flex: 1,
        alignItems: 'center',
    },
    statVal: {
        color: COLORS.text,
        fontSize: 18,
        fontWeight: '800',
    },
    statLab: {
        color: COLORS.textSecondary,
        fontSize: 11,
        marginTop: 2,
    },
    statDivider: {
        width: 1,
        height: '60%',
        backgroundColor: '#ffffff10',
        alignSelf: 'center',
    },
    content: {
        padding: 20, // Unified container padding
        paddingBottom: 110,
    },
    sectionLabel: {
        color: COLORS.textSecondary,
        fontSize: 11,
        fontWeight: '700',
        marginBottom: 10,
        marginLeft: 4,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    section: {
        backgroundColor: COLORS.surface,
        borderRadius: 20,
        padding: 4, // Inner padding for options
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#ffffff08',
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 14,
        borderBottomWidth: 1,
        borderBottomColor: '#ffffff05',
    },
    optionIcon: {
        width: 40,
        height: 40,
        borderRadius: 10,
        backgroundColor: '#ffffff05',
        justifyContent: 'center',
        alignItems: 'center',
    },
    optionContent: {
        flex: 1,
        marginLeft: 14,
    },
    optionTitle: {
        color: COLORS.text,
        fontSize: 14,
        fontWeight: '600',
    },
    optionSubtitle: {
        color: COLORS.textSecondary,
        fontSize: 11,
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
        backgroundColor: 'rgba(0,0,0,0.85)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: COLORS.background,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 24,
        maxHeight: '80%',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ffffff10',
    },
    modalTitle: {
        color: COLORS.text,
        fontSize: 20,
        fontWeight: 'bold',
    },
    modalForm: {
        paddingBottom: 40,
    },
    inputLabel: {
        color: COLORS.textSecondary,
        fontSize: 13,
        fontWeight: '600',
        marginBottom: 8,
        marginTop: 18,
    },
    inputBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.surface,
        borderRadius: 14,
        paddingHorizontal: 14,
        borderWidth: 1,
        borderColor: '#ffffff10',
    },
    input: {
        flex: 1,
        paddingVertical: 14,
        color: COLORS.text,
        fontSize: 15,
    },
    statusOptions: {
        flexDirection: 'row',
        gap: 10,
        marginTop: 8,
    },
    statusToggle: {
        flex: 1,
        paddingVertical: 10,
        borderRadius: 10,
        backgroundColor: COLORS.surface,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ffffff10',
    },
    statusToggleText: {
        color: COLORS.textSecondary,
        fontWeight: 'bold',
        fontSize: 11,
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
