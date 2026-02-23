import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { COLORS, SPACING, SIZES } from '../constants/theme';
import useFleetStore from '../store/useFleetStore';
import { User, Phone, Briefcase, ChevronRight, ArrowLeft } from 'lucide-react-native';

const DriversList = ({ navigation }) => {
    const { drivers } = useFleetStore();

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.card} activeOpacity={0.7}>
            <View style={styles.cardContent}>
                <View style={styles.avatar}>
                    <User color={COLORS.primary} size={24} />
                </View>
                <View style={styles.info}>
                    <Text style={styles.name}>{item.name}</Text>
                    <View style={styles.metaRow}>
                        <View style={styles.metaItem}>
                            <Phone size={12} color={COLORS.textSecondary} />
                            <Text style={styles.metaText}>{item.phone}</Text>
                        </View>
                        <View style={styles.metaDivider} />
                        <View style={styles.metaItem}>
                            <Briefcase size={12} color={COLORS.textSecondary} />
                            <Text style={styles.metaText}>{item.experience || 'N/A'}</Text>
                        </View>
                    </View>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: item.status === 'On Duty' ? COLORS.success + '20' : COLORS.textSecondary + '10' }]}>
                    <Text style={[styles.statusText, { color: item.status === 'On Duty' ? COLORS.success : COLORS.textSecondary }]}>{item.status}</Text>
                </View>
                <ChevronRight color={COLORS.textSecondary} size={20} />
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.safeContainer}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <ArrowLeft color={COLORS.text} size={24} />
                    </TouchableOpacity>
                    <View>
                        <Text style={styles.title}>Fleet Operators</Text>
                        <Text style={styles.subTitle}>{drivers.length} Registered Drivers</Text>
                    </View>
                </View>

                <FlatList
                    data={drivers}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                />
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
        alignItems: 'center',
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.md,
        gap: 16,
    },
    backBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: COLORS.surface,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ffffff08',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    subTitle: {
        fontSize: 13,
        color: COLORS.textSecondary,
    },
    listContent: {
        padding: SPACING.md,
        paddingBottom: 40,
    },
    card: {
        backgroundColor: COLORS.surface,
        borderRadius: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#ffffff05',
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: COLORS.primary + '15',
        justifyContent: 'center',
        alignItems: 'center',
    },
    info: {
        flex: 1,
        marginLeft: 16,
    },
    name: {
        color: COLORS.text,
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 4,
    },
    metaRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    metaItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    metaText: {
        color: COLORS.textSecondary,
        fontSize: 11,
    },
    metaDivider: {
        width: 1,
        height: 10,
        backgroundColor: '#ffffff20',
        marginHorizontal: 10,
    },
    statusBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        marginRight: 8,
    },
    statusText: {
        fontSize: 10,
        fontWeight: '800',
        textTransform: 'uppercase',
    },
});

export default DriversList;
