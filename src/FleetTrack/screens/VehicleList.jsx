import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, Modal, TextInput, ScrollView, Alert } from 'react-native';
import { COLORS, SPACING, SIZES } from '../constants/theme';
import useFleetStore from '../store/useFleetStore';
import { Truck, MapPin, Gauge, ChevronRight, Search, Filter, Activity, X } from 'lucide-react-native';

const VehicleList = () => {
    const { vehicles, addVehicle } = useFleetStore();
    const [modalVisible, setModalVisible] = useState(false);
    const [newVehicle, setNewVehicle] = useState({
        plate: '',
        model: '',
        status: 'Active',
        fuelLevel: 100,
        health: 100,
        lastLocation: { latitude: 20.5937, longitude: 78.9629 }
    });

    const handleAddVehicle = () => {
        if (!newVehicle.plate || !newVehicle.model) {
            Alert.alert('Error', 'Please fill in all required fields');
            return;
        }
        addVehicle(newVehicle);
        setModalVisible(false);
        setNewVehicle({
            plate: '',
            model: '',
            status: 'Active',
            fuelLevel: 100,
            health: 100,
            lastLocation: { latitude: 20.5937, longitude: 78.9629 }
        });
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.card} activeOpacity={0.7}>
            <View style={styles.cardContent}>
                <View style={[styles.iconContainer, { backgroundColor: item.status === 'Active' ? COLORS.success + '20' : COLORS.warning + '20' }]}>
                    <Truck color={item.status === 'Active' ? COLORS.success : COLORS.warning} size={24} />
                </View>
                <View style={styles.info}>
                    <View style={styles.row}>
                        <Text style={styles.plateText}>{item.plate}</Text>
                        <View style={[styles.statusBadge, { backgroundColor: item.status === 'Active' ? COLORS.success + '20' : COLORS.warning + '20' }]}>
                            <Text style={[styles.statusBadgeText, { color: item.status === 'Active' ? COLORS.success : COLORS.warning }]}>{item.status}</Text>
                        </View>
                    </View>
                    <Text style={styles.modelText}>{item.model}</Text>

                    <View style={styles.metaRow}>
                        <View style={styles.metaItem}>
                            <Gauge size={12} color={COLORS.textSecondary} />
                            <Text style={styles.metaText}>{item.fuelLevel}% Fuel</Text>
                        </View>
                        <View style={styles.metaDivider} />
                        <View style={styles.metaItem}>
                            <Activity size={12} color={COLORS.textSecondary} />
                            <Text style={styles.metaText}>{item.health}% Health</Text>
                        </View>
                    </View>

                    <View style={styles.fuelBarContainer}>
                        <View style={[styles.fuelBar, { width: `${item.fuelLevel}%`, backgroundColor: item.fuelLevel < 20 ? COLORS.danger : COLORS.success }]} />
                    </View>
                </View>
                <ChevronRight color={COLORS.textSecondary} size={20} />
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.safeContainer}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <View>
                        <Text style={styles.title}>Fleet Inventory</Text>
                        <Text style={styles.subTitle}>{vehicles.length} Units Total</Text>
                    </View>
                    <View style={styles.headerIcons}>
                        <TouchableOpacity style={styles.iconBtn}>
                            <Search color={COLORS.text} size={20} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.iconBtn}>
                            <Filter color={COLORS.text} size={20} />
                        </TouchableOpacity>
                    </View>
                </View>

                <FlatList
                    data={vehicles}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={() => (
                        <TouchableOpacity style={styles.addBtn} onPress={() => setModalVisible(true)}>
                            <Text style={styles.addBtnText}>+ Register New Vehicle</Text>
                        </TouchableOpacity>
                    )}
                />

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContent}>
                            <View style={styles.modalHeader}>
                                <Text style={styles.modalTitle}>Add New Vehicle</Text>
                                <TouchableOpacity onPress={() => setModalVisible(false)}>
                                    <X color={COLORS.text} size={24} />
                                </TouchableOpacity>
                            </View>

                            <ScrollView style={styles.modalForm}>
                                <Text style={styles.inputLabel}>License Plate Number</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="e.g. GA-01-BK-2024"
                                    placeholderTextColor={COLORS.textSecondary + '80'}
                                    value={newVehicle.plate}
                                    onChangeText={(text) => setNewVehicle({ ...newVehicle, plate: text })}
                                />

                                <Text style={styles.inputLabel}>Vehicle Model / Name</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="e.g. TATA Prima 4028"
                                    placeholderTextColor={COLORS.textSecondary + '80'}
                                    value={newVehicle.model}
                                    onChangeText={(text) => setNewVehicle({ ...newVehicle, model: text })}
                                />

                                <Text style={styles.inputLabel}>Initial Status</Text>
                                <View style={styles.statusOptions}>
                                    {['Active', 'Maintenance', 'Idle'].map((status) => (
                                        <TouchableOpacity
                                            key={status}
                                            style={[styles.statusToggle, newVehicle.status === status && { backgroundColor: COLORS.primary }]}
                                            onPress={() => setNewVehicle({ ...newVehicle, status })}
                                        >
                                            <Text style={[styles.statusToggleText, newVehicle.status === status && { color: 'white' }]}>{status}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>

                                <TouchableOpacity style={styles.submitBtn} onPress={handleAddVehicle}>
                                    <Text style={styles.submitBtnText}>Add to Fleet</Text>
                                </TouchableOpacity>
                            </ScrollView>
                        </View>
                    </View>
                </Modal>
            </View>
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.sm,
        marginBottom: SPACING.sm,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    subTitle: {
        fontSize: 13,
        color: COLORS.textSecondary,
        marginTop: 2,
    },
    headerIcons: {
        flexDirection: 'row',
        gap: 12,
    },
    iconBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: COLORS.surface,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ffffff10',
    },
    listContent: {
        padding: SPACING.md,
        paddingBottom: 100,
    },
    addBtn: {
        backgroundColor: COLORS.primary + '10',
        borderWidth: 1,
        borderStyle: 'dashed',
        borderColor: COLORS.primary,
        padding: SPACING.md,
        borderRadius: SIZES.radius,
        alignItems: 'center',
        marginBottom: SPACING.lg,
    },
    addBtnText: {
        color: COLORS.primary,
        fontWeight: 'bold',
        fontSize: 15,
    },
    card: {
        backgroundColor: COLORS.surface,
        borderRadius: SIZES.radius + 2,
        marginBottom: SPACING.md,
        borderWidth: 1,
        borderColor: '#ffffff08',
        overflow: 'hidden',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: SPACING.md,
    },
    iconContainer: {
        width: 54,
        height: 54,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
    },
    info: {
        flex: 1,
        marginLeft: SPACING.md,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    plateText: {
        color: COLORS.text,
        fontSize: 17,
        fontWeight: 'bold',
    },
    statusBadge: {
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 6,
    },
    statusBadgeText: {
        fontSize: 10,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    modelText: {
        color: COLORS.textSecondary,
        fontSize: 13,
        marginBottom: 8,
    },
    metaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    metaItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    metaText: {
        color: COLORS.textSecondary,
        fontSize: 11,
        fontWeight: '500',
    },
    metaDivider: {
        width: 1,
        height: 10,
        backgroundColor: '#ffffff20',
        marginHorizontal: 10,
    },
    fuelBarContainer: {
        height: 4,
        backgroundColor: COLORS.surfaceLight,
        borderRadius: 2,
        width: '100%',
        overflow: 'hidden',
    },
    fuelBar: {
        height: '100%',
        borderRadius: 2,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: COLORS.background,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: SPACING.md,
        maxHeight: '80%',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SPACING.lg,
        paddingBottom: SPACING.sm,
        borderBottomWidth: 1,
        borderBottomColor: '#ffffff10',
    },
    modalTitle: {
        color: COLORS.text,
        fontSize: 20,
        fontWeight: 'bold',
    },
    modalForm: {
        paddingBottom: SPACING.xl,
    },
    inputLabel: {
        color: COLORS.textSecondary,
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 8,
        marginTop: 16,
    },
    input: {
        backgroundColor: COLORS.surface,
        borderRadius: 12,
        padding: 14,
        color: COLORS.text,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#ffffff10',
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
        fontSize: 12,
    },
    submitBtn: {
        backgroundColor: COLORS.primary,
        borderRadius: 14,
        padding: 16,
        alignItems: 'center',
        marginTop: 32,
        marginBottom: 20,
    },
    submitBtnText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default VehicleList;
