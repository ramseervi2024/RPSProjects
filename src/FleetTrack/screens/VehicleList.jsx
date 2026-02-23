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
        paddingHorizontal: 20,
        paddingVertical: 12,
        marginBottom: 8,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.text,
        letterSpacing: -0.5,
    },
    subTitle: {
        fontSize: 13,
        color: COLORS.textSecondary,
        marginTop: 1,
    },
    headerIcons: {
        flexDirection: 'row',
        gap: 10,
    },
    iconBtn: {
        width: 38,
        height: 38,
        borderRadius: 10,
        backgroundColor: COLORS.surface,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ffffff10',
    },
    listContent: {
        padding: 20, // Standardized padding
        paddingBottom: 100,
    },
    addBtn: {
        backgroundColor: COLORS.primary + '10',
        borderWidth: 1,
        borderStyle: 'dashed',
        borderColor: COLORS.primary,
        padding: 16,
        borderRadius: 16,
        alignItems: 'center',
        marginBottom: 20,
    },
    addBtnText: {
        color: COLORS.primary,
        fontWeight: 'bold',
        fontSize: 14,
    },
    card: {
        backgroundColor: COLORS.surface,
        borderRadius: 20,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#ffffff08',
        overflow: 'hidden',
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16, // Unified card inner padding
    },
    iconContainer: {
        width: 48, // Slightly more compact
        height: 48,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    info: {
        flex: 1,
        marginLeft: 14,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 2,
    },
    plateText: {
        color: COLORS.text,
        fontSize: 16,
        fontWeight: 'bold',
    },
    statusBadge: {
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 6,
    },
    statusBadgeText: {
        fontSize: 9,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    modelText: {
        color: COLORS.textSecondary,
        fontSize: 12,
        marginBottom: 8,
    },
    metaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    metaItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    metaText: {
        color: COLORS.textSecondary,
        fontSize: 10,
        fontWeight: '500',
    },
    metaDivider: {
        width: 1,
        height: 10,
        backgroundColor: '#ffffff20',
        marginHorizontal: 8,
    },
    fuelBarContainer: {
        height: 3,
        backgroundColor: COLORS.surfaceLight,
        borderRadius: 1.5,
        width: '100%',
        overflow: 'hidden',
    },
    fuelBar: {
        height: '100%',
        borderRadius: 1.5,
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
        padding: 20,
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
        marginTop: 16,
    },
    input: {
        backgroundColor: COLORS.surface,
        borderRadius: 14,
        padding: 14,
        color: COLORS.text,
        fontSize: 15,
        borderWidth: 1,
        borderColor: '#ffffff10',
    },
    statusOptions: {
        flexDirection: 'row',
        gap: 10,
        marginTop: 6,
    },
    statusToggle: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 12,
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
