import React, { useState } from 'react';
import {
    View, Text, StyleSheet, ScrollView, TouchableOpacity,
    SafeAreaView, Switch, Modal, TextInput, Alert
} from 'react-native';
import { COLORS } from '../constants/theme';
import {
    User, Bell, Shield, HelpCircle, LogOut, ChevronRight,
    CreditCard, Users, X, Phone, Briefcase
} from 'lucide-react-native';
import useFleetStore from '../store/useFleetStore';
import LinearGradient from 'react-native-linear-gradient';

/* ──────────────────────────────────────────────
   ROW COMPONENT
────────────────────────────────────────────── */
const SettingRow = ({ icon: Icon, label, sub, right, onPress, color }) => (
    <TouchableOpacity style={styles.row} onPress={onPress} activeOpacity={onPress ? 0.7 : 1}>
        <View style={[styles.rowIcon, { backgroundColor: (color || COLORS.primary) + '18' }]}>
            <Icon size={18} color={color || COLORS.primary} />
        </View>
        <View style={styles.rowText}>
            <Text style={styles.rowLabel}>{label}</Text>
            {sub ? <Text style={styles.rowSub}>{sub}</Text> : null}
        </View>
        {right ?? <ChevronRight size={16} color={COLORS.textSecondary} />}
    </TouchableOpacity>
);

/* ──────────────────────────────────────────────
   MAIN SCREEN
────────────────────────────────────────────── */
const Profile = ({ navigation }) => {
    const { vehicles, drivers, addDriver } = useFleetStore();
    const [notifications, setNotifications] = useState(true);
    const [modal, setModal] = useState(false);
    const [form, setForm] = useState({ name: '', phone: '', experience: '', status: 'Available' });

    const handleAdd = () => {
        if (!form.name || !form.phone) {
            Alert.alert('Missing Info', 'Please fill in name and phone.');
            return;
        }
        addDriver(form);
        setModal(false);
        setForm({ name: '', phone: '', experience: '', status: 'Available' });
    };

    return (
        <SafeAreaView style={styles.safe}>
            <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>

                {/* ── PROFILE HEADER ── */}
                <LinearGradient
                    colors={[COLORS.surface, COLORS.background]}
                    style={styles.profileHeader}
                >
                    <View style={styles.avatarWrap}>
                        <View style={styles.avatarRing}>
                            <User size={36} color={COLORS.primary} />
                        </View>
                        <View style={styles.editChip}>
                            <Text style={styles.editChipText}>Edit</Text>
                        </View>
                    </View>
                    <Text style={styles.name}>Director Ramesh</Text>
                    <Text style={styles.role}>Fleet Operations Manager</Text>

                    <View style={styles.statsRow}>
                        <View style={styles.stat}>
                            <Text style={styles.statVal}>{vehicles.length}</Text>
                            <Text style={styles.statLab}>Vehicles</Text>
                        </View>
                        <View style={styles.statDiv} />
                        <View style={styles.stat}>
                            <Text style={styles.statVal}>{drivers.length}</Text>
                            <Text style={styles.statLab}>Drivers</Text>
                        </View>
                        <View style={styles.statDiv} />
                        <View style={styles.stat}>
                            <Text style={styles.statVal}>94%</Text>
                            <Text style={styles.statLab}>Efficiency</Text>
                        </View>
                    </View>
                </LinearGradient>

                <View style={styles.content}>
                    {/* ── DRIVER MANAGEMENT ── */}
                    <Text style={styles.section}>Driver Management</Text>
                    <View style={styles.card}>
                        <SettingRow
                            icon={Users} label="Add New Driver"
                            sub="Register operator to fleet"
                            onPress={() => setModal(true)}
                        />
                        <View style={styles.divider} />
                        <SettingRow
                            icon={Users} label="View All Drivers"
                            sub={`${drivers.length} registered operators`}
                            onPress={() => navigation.navigate('DriversList')}
                        />
                    </View>

                    {/* ── FLEET SETTINGS ── */}
                    <Text style={styles.section}>Fleet Settings</Text>
                    <View style={styles.card}>
                        <SettingRow
                            icon={Bell} label="Smart Notifications"
                            sub="Alerts for fuel and maintenance"
                            right={
                                <Switch
                                    value={notifications}
                                    onValueChange={setNotifications}
                                    trackColor={{ false: COLORS.surface, true: COLORS.primary }}
                                    thumbColor="#ffffff"
                                />
                            }
                        />
                        <View style={styles.divider} />
                        <SettingRow
                            icon={Shield} label="Security Protocol"
                            sub="Biometric access for drivers"
                        />
                        <View style={styles.divider} />
                        <SettingRow
                            icon={CreditCard} label="Billing & Payments"
                            sub="Subscription: Business Pro"
                        />
                    </View>

                    {/* ── SUPPORT ── */}
                    <Text style={styles.section}>Support</Text>
                    <View style={styles.card}>
                        <SettingRow
                            icon={HelpCircle} label="Help Center"
                            sub="FAQs and customer support"
                        />
                    </View>

                    {/* ── SIGN OUT ── */}
                    <TouchableOpacity style={styles.signOutBtn}>
                        <LogOut size={18} color={COLORS.danger} />
                        <Text style={styles.signOutText}>Sign Out from FleetTrack</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            {/* ── ADD DRIVER MODAL ── */}
            <Modal
                visible={modal}
                animationType="slide"
                transparent
                onRequestClose={() => setModal(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalSheet}>
                        <View style={styles.modalHead}>
                            <Text style={styles.modalTitle}>Register Driver</Text>
                            <TouchableOpacity onPress={() => setModal(false)}>
                                <X color={COLORS.text} size={22} />
                            </TouchableOpacity>
                        </View>
                        <ScrollView style={styles.modalBody}>
                            <Text style={styles.fieldLabel}>Full Name</Text>
                            <View style={styles.fieldRow}>
                                <User size={15} color={COLORS.primary} style={{ marginRight: 10 }} />
                                <TextInput
                                    style={styles.field}
                                    placeholder="e.g. Alok Singh"
                                    placeholderTextColor={COLORS.textSecondary + '60'}
                                    value={form.name}
                                    onChangeText={t => setForm({ ...form, name: t })}
                                />
                            </View>
                            <Text style={styles.fieldLabel}>Phone Number</Text>
                            <View style={styles.fieldRow}>
                                <Phone size={15} color={COLORS.primary} style={{ marginRight: 10 }} />
                                <TextInput
                                    style={styles.field}
                                    placeholder="e.g. +91 98765 43210"
                                    placeholderTextColor={COLORS.textSecondary + '60'}
                                    keyboardType="phone-pad"
                                    value={form.phone}
                                    onChangeText={t => setForm({ ...form, phone: t })}
                                />
                            </View>
                            <Text style={styles.fieldLabel}>Experience</Text>
                            <View style={styles.fieldRow}>
                                <Briefcase size={15} color={COLORS.primary} style={{ marginRight: 10 }} />
                                <TextInput
                                    style={styles.field}
                                    placeholder="e.g. 5 Years"
                                    placeholderTextColor={COLORS.textSecondary + '60'}
                                    value={form.experience}
                                    onChangeText={t => setForm({ ...form, experience: t })}
                                />
                            </View>
                            <TouchableOpacity style={styles.addBtn} onPress={handleAdd}>
                                <Text style={styles.addBtnText}>Add Driver</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

/* ──────────────────────────────────────────────
   STYLES
────────────────────────────────────────────── */
const styles = StyleSheet.create({
    safe: { flex: 1, backgroundColor: COLORS.background },
    scroll: { flex: 1 },

    /* Profile Header */
    profileHeader: {
        alignItems: 'center',
        paddingTop: 32, paddingBottom: 28, paddingHorizontal: 24,
        borderBottomLeftRadius: 28, borderBottomRightRadius: 28,
        borderWidth: 1, borderTopWidth: 0, borderColor: '#ffffff08',
    },
    avatarWrap: { alignItems: 'center', marginBottom: 14 },
    avatarRing: {
        width: 84, height: 84, borderRadius: 42,
        backgroundColor: COLORS.background,
        justifyContent: 'center', alignItems: 'center',
        borderWidth: 2, borderColor: COLORS.primary + '35',
    },
    editChip: {
        position: 'absolute', bottom: -4,
        backgroundColor: COLORS.primary,
        paddingHorizontal: 14, paddingVertical: 4, borderRadius: 10,
    },
    editChipText: { color: 'white', fontSize: 10, fontWeight: '800' },
    name: { fontSize: 22, fontWeight: '800', color: COLORS.text, marginTop: 4 },
    role: { fontSize: 13, color: COLORS.textSecondary, marginTop: 3 },

    /* Stats Row */
    statsRow: {
        flexDirection: 'row', marginTop: 24,
        backgroundColor: COLORS.background + '80',
        borderRadius: 16, paddingVertical: 14, paddingHorizontal: 20,
        borderWidth: 1, borderColor: '#ffffff08', width: '100%',
    },
    stat: { flex: 1, alignItems: 'center' },
    statVal: { color: COLORS.text, fontSize: 20, fontWeight: '800' },
    statLab: { color: COLORS.textSecondary, fontSize: 11, marginTop: 3, fontWeight: '600' },
    statDiv: { width: 1, backgroundColor: '#ffffff12', marginHorizontal: 10 },

    /* Content */
    content: { padding: 20, paddingBottom: 100 },
    section: {
        fontSize: 11, color: COLORS.textSecondary, fontWeight: '700',
        textTransform: 'uppercase', letterSpacing: 1,
        marginBottom: 10, marginTop: 6, marginLeft: 2,
    },
    card: {
        backgroundColor: COLORS.surface, borderRadius: 18,
        borderWidth: 1, borderColor: '#ffffff08',
        marginBottom: 16, overflow: 'hidden',
    },
    divider: { height: 1, backgroundColor: '#ffffff06', marginLeft: 62 },

    /* Row */
    row: { flexDirection: 'row', alignItems: 'center', padding: 14 },
    rowIcon: {
        width: 40, height: 40, borderRadius: 12,
        justifyContent: 'center', alignItems: 'center',
        marginRight: 14,
    },
    rowText: { flex: 1 },
    rowLabel: { color: COLORS.text, fontSize: 14, fontWeight: '600' },
    rowSub: { color: COLORS.textSecondary, fontSize: 11, marginTop: 2 },

    /* Sign Out */
    signOutBtn: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
        paddingVertical: 18, gap: 10, marginTop: 8,
    },
    signOutText: { color: COLORS.danger, fontWeight: '700', fontSize: 15 },

    /* Modal */
    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.78)', justifyContent: 'flex-end' },
    modalSheet: {
        backgroundColor: COLORS.background, borderTopLeftRadius: 28,
        borderTopRightRadius: 28, padding: 24, maxHeight: '80%',
    },
    modalHead: {
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
        borderBottomWidth: 1, borderBottomColor: '#ffffff10',
        paddingBottom: 16, marginBottom: 4,
    },
    modalTitle: { color: COLORS.text, fontSize: 18, fontWeight: '800' },
    modalBody: { paddingBottom: 30 },
    fieldLabel: {
        color: COLORS.textSecondary, fontSize: 11, fontWeight: '700',
        textTransform: 'uppercase', letterSpacing: 0.5,
        marginTop: 18, marginBottom: 8,
    },
    fieldRow: {
        flexDirection: 'row', alignItems: 'center',
        backgroundColor: COLORS.surface, borderRadius: 14,
        paddingHorizontal: 14, borderWidth: 1, borderColor: '#ffffff10',
    },
    field: { flex: 1, paddingVertical: 13, color: COLORS.text, fontSize: 14 },
    addBtn: {
        backgroundColor: COLORS.primary, borderRadius: 16,
        padding: 16, alignItems: 'center', marginTop: 32, marginBottom: 20,
    },
    addBtnText: { color: 'white', fontSize: 15, fontWeight: '800' },
});

export default Profile;
