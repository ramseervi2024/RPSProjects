import React, { useState, useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Dimensions,
    SafeAreaView,
    StatusBar,
    Modal,
    TextInput,
    Alert,
} from 'react-native';
import { ChevronLeft, Play, X, Star, ShieldCheck, Share2, Info, MapPin, Award, Briefcase } from 'lucide-react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import { COLORS } from '../theme';

const { width } = Dimensions.get('window');

export default function ArtistDetails({ artist, onBack, isAlreadyBooked = false }) {
    const [bookingModalVisible, setBookingModalVisible] = useState(false);
    const [playingVideoId, setPlayingVideoId] = useState(artist.famousSongs[0]?.youtubeId);
    const [bookingData, setBookingData] = useState({
        date: '',
        eventType: '',
        contact: '',
        requirements: '',
    });

    const handleBookingSubmit = () => {
        if (!bookingData.date || !bookingData.eventType || !bookingData.contact) {
            Alert.alert('Error', 'Please fill in mandatory fields');
            return;
        }
        Alert.alert('Success', `Booking request for ${artist.name} has been sent! Status: Pending Approval.`);
        setBookingModalVisible(false);
    };

    const onStateChange = useCallback((state) => {
        if (state === 'ended') {
            console.log('Video has ended');
        }
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={onBack}>
                    <ChevronLeft size={28} color={COLORS.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Artist Profile</Text>
                <View style={styles.headerActions}>
                    <Share2 size={22} color={COLORS.text} />
                </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                {/* YouTube Video Section */}
                <View style={styles.videoSection}>
                    {playingVideoId ? (
                        <YoutubePlayer
                            height={width * 0.56}
                            play={false}
                            videoId={playingVideoId}
                            onChangeState={onStateChange}
                        />
                    ) : (
                        <View style={styles.videoPlaceholder}>
                            <Text style={styles.videoPlaceholderText}>Video Unavailable</Text>
                        </View>
                    )}
                </View>

                {/* Profile Info */}
                <View style={styles.profileSection}>
                    <View style={styles.artistInfoRow}>
                        <View style={styles.profileImagePlaceholder}>
                            <Text style={styles.profileInitials}>{artist.name.charAt(0)}</Text>
                        </View>
                        <View style={styles.profileMeta}>
                            <Text style={styles.artistName}>{artist.name}</Text>
                            <Text style={styles.artistTitle}>{artist.title}</Text>
                            <View style={styles.verifiedBadge}>
                                <ShieldCheck size={14} color={COLORS.success} />
                                <Text style={styles.verifiedText}>Verified Kalakar</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.statsRow}>
                        <View style={styles.statItem}>
                            <Text style={styles.statValue}>{artist.stats.followers}</Text>
                            <Text style={styles.statLabel}>Fans</Text>
                        </View>
                        <View style={styles.statItem}>
                            <Text style={styles.statValue}>{artist.stats.events}</Text>
                            <Text style={styles.statLabel}>Shows</Text>
                        </View>
                        <View style={styles.statItem}>
                            <View style={styles.ratingRow}>
                                <Star size={16} color={COLORS.accent} fill={COLORS.accent} />
                                <Text style={styles.statValue}> 4.9</Text>
                            </View>
                            <Text style={styles.statLabel}>Rating</Text>
                        </View>
                    </View>
                </View>

                {/* Extra Details */}
                <View style={styles.detailsSection}>
                    <View style={styles.detailCard}>
                        <MapPin size={20} color={COLORS.accentRed} />
                        <View style={styles.detailTextContainer}>
                            <Text style={styles.detailLabel}>Native Location</Text>
                            <Text style={styles.detailValue}>{artist.location || 'Rajasthan'}</Text>
                        </View>
                    </View>
                    <View style={styles.detailCard}>
                        <Briefcase size={20} color={COLORS.accentRed} />
                        <View style={styles.detailTextContainer}>
                            <Text style={styles.detailLabel}>Professional Experience</Text>
                            <Text style={styles.detailValue}>{artist.experience || '10+ Years'}</Text>
                        </View>
                    </View>
                    <View style={styles.detailCard}>
                        <Award size={20} color={COLORS.accentRed} />
                        <View style={styles.detailTextContainer}>
                            <Text style={styles.detailLabel}>Major Awards</Text>
                            <Text style={styles.detailValue}>{artist.awards?.join(', ') || 'Folk Legend'}</Text>
                        </View>
                    </View>
                </View>

                {/* Bio */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Life Journey</Text>
                    <Text style={styles.bioText}>{artist.bio}</Text>
                </View>

                {/* Famous Songs List */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Famous Melodies</Text>
                    {artist.famousSongs.map((song) => (
                        <TouchableOpacity
                            key={song.id}
                            style={[styles.songRow, playingVideoId === song.youtubeId && styles.songRowActive]}
                            onPress={() => setPlayingVideoId(song.youtubeId)}
                        >
                            <View style={styles.songIcon}>
                                <Play size={16} color={playingVideoId === song.youtubeId ? COLORS.white : COLORS.accentRed} fill={playingVideoId === song.youtubeId ? COLORS.white : COLORS.accentRed} />
                            </View>
                            <View style={styles.songInfo}>
                                <Text style={[styles.songTitle, playingVideoId === song.youtubeId && styles.songTitleActive]}>{song.title}</Text>
                                <Text style={styles.songPlays}>Click to Play Video</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>

                <View style={styles.footerSpacer} />
            </ScrollView>

            {/* Booking Action */}
            {!isAlreadyBooked && (
                <View style={styles.bookingFooter}>
                    <View style={styles.priceInfo}>
                        <Text style={styles.priceLabel}>Starting from</Text>
                        <Text style={styles.priceValue}>₹25,000</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.bookActionBtn}
                        onPress={() => setBookingModalVisible(true)}
                    >
                        <Text style={styles.bookActionBtnText}>Quick Book</Text>
                    </TouchableOpacity>
                </View>
            )}

            {/* Advanced Booking Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={bookingModalVisible}
                onRequestClose={() => setBookingModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Reserve your Date</Text>
                            <TouchableOpacity onPress={() => setBookingModalVisible(false)}>
                                <X size={24} color={COLORS.text} />
                            </TouchableOpacity>
                        </View>

                        <ScrollView showsVerticalScrollIndicator={false} style={styles.modalScroll}>
                            <Text style={styles.inputLabel}>Select Event Date *</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="DD/MM/YYYY"
                                value={bookingData.date}
                                onChangeText={(text) => setBookingData({ ...bookingData, date: text })}
                            />

                            <Text style={styles.inputLabel}>Event Type *</Text>
                            <View style={styles.chipRow}>
                                {['Wedding', 'Bhajan', 'Corporate', 'Folk Night'].map(type => (
                                    <TouchableOpacity
                                        key={type}
                                        style={[styles.chip, bookingData.eventType === type && styles.chipActive]}
                                        onPress={() => setBookingData({ ...bookingData, eventType: type })}
                                    >
                                        <Text style={[styles.chipText, bookingData.eventType === type && styles.chipTextActive]}>{type}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>

                            <Text style={styles.inputLabel}>Your Mobile Number *</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="+91 XXXXX XXXXX"
                                keyboardType="phone-pad"
                                value={bookingData.contact}
                                onChangeText={(text) => setBookingData({ ...bookingData, contact: text })}
                            />

                            <Text style={styles.inputLabel}>Special Requirements (Optional)</Text>
                            <TextInput
                                style={[styles.input, styles.textArea]}
                                placeholder="Mention stage size, sound system, etc."
                                multiline
                                numberOfLines={4}
                                value={bookingData.requirements}
                                onChangeText={(text) => setBookingData({ ...bookingData, requirements: text })}
                            />

                            <View style={styles.advanceInfo}>
                                <Info size={16} color={COLORS.accent} />
                                <Text style={styles.advanceInfoText}>Advance payment of 20% required for confirmation.</Text>
                            </View>

                            <TouchableOpacity style={styles.finalBookBtn} onPress={handleBookingSubmit}>
                                <Text style={styles.finalBookBtnText}>Send Booking Request</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.primary,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: COLORS.white,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
        zIndex: 10,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    headerActions: {
        width: 40,
        alignItems: 'flex-end',
    },
    videoSection: {
        width: width,
        backgroundColor: '#000',
    },
    videoPlaceholder: {
        height: width * 0.56,
        justifyContent: 'center',
        alignItems: 'center',
    },
    videoPlaceholderText: {
        color: COLORS.white,
    },
    profileSection: {
        padding: 20,
        backgroundColor: COLORS.cardBackground,
    },
    artistInfoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    profileImagePlaceholder: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: COLORS.border,
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileInitials: {
        fontSize: 32,
        fontWeight: 'bold',
        color: COLORS.accentRed,
    },
    profileMeta: {
        marginLeft: 20,
        flex: 1,
    },
    artistName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    artistTitle: {
        fontSize: 14,
        color: COLORS.textSecondary,
        marginVertical: 4,
    },
    verifiedBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(39, 174, 96, 0.1)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        alignSelf: 'flex-start',
    },
    verifiedText: {
        fontSize: 12,
        color: COLORS.success,
        marginLeft: 4,
        fontWeight: '600',
    },
    statsRow: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around',
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
        paddingTop: 20,
    },
    statItem: {
        alignItems: 'center',
    },
    statValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    statLabel: {
        fontSize: 12,
        color: COLORS.textSecondary,
        marginTop: 2,
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    detailsSection: {
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    detailCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        padding: 15,
        borderRadius: 12,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    detailTextContainer: {
        marginLeft: 15,
        flex: 1,
    },
    detailLabel: {
        fontSize: 11,
        color: COLORS.textSecondary,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    detailValue: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.text,
        marginTop: 2,
    },
    section: {
        padding: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.text,
        marginBottom: 15,
    },
    bioText: {
        fontSize: 15,
        lineHeight: 24,
        color: COLORS.textSecondary,
        textAlign: 'justify',
    },
    songRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.cardBackground,
        padding: 12,
        borderRadius: 12,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    songRowActive: {
        backgroundColor: COLORS.accentRed,
        borderColor: COLORS.accentRed,
    },
    songIcon: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    songInfo: {
        flex: 1,
        marginLeft: 15,
    },
    songTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: COLORS.text,
    },
    songTitleActive: {
        color: COLORS.white,
    },
    songPlays: {
        fontSize: 12,
        color: COLORS.textSecondary,
        marginTop: 2,
    },
    footerSpacer: {
        height: 120,
    },
    bookingFooter: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: COLORS.primary,
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    priceInfo: {
        flex: 1,
    },
    priceLabel: {
        fontSize: 12,
        color: COLORS.textSecondary,
    },
    priceValue: {
        fontSize: 22,
        fontWeight: 'bold',
        color: COLORS.accentRed,
    },
    bookActionBtn: {
        backgroundColor: COLORS.accentRed,
        paddingHorizontal: 30,
        paddingVertical: 15,
        borderRadius: 12,
    },
    bookActionBtnText: {
        color: COLORS.primary,
        fontWeight: 'bold',
        fontSize: 16,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: COLORS.primary,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingBottom: 40,
        maxHeight: '85%',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    modalScroll: {
        padding: 20,
    },
    inputLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.text,
        marginBottom: 8,
        marginTop: 15,
    },
    input: {
        backgroundColor: COLORS.cardBackground,
        borderRadius: 10,
        padding: 15,
        fontSize: 16,
        borderWidth: 1,
        borderColor: COLORS.border,
        color: COLORS.text,
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
    },
    chipRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    chip: {
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: COLORS.border,
        marginRight: 10,
        marginBottom: 10,
    },
    chipActive: {
        backgroundColor: COLORS.accentRed,
        borderColor: COLORS.accentRed,
    },
    chipText: {
        fontSize: 14,
        color: COLORS.textSecondary,
    },
    chipTextActive: {
        color: COLORS.primary,
        fontWeight: 'bold',
    },
    advanceInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(212, 175, 55, 0.1)',
        padding: 12,
        borderRadius: 8,
        marginTop: 25,
    },
    advanceInfoText: {
        fontSize: 12,
        color: COLORS.text,
        marginLeft: 10,
        flex: 1,
    },
    finalBookBtn: {
        backgroundColor: COLORS.accentRed,
        padding: 18,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 30,
    },
    finalBookBtnText: {
        color: COLORS.primary,
        fontSize: 18,
        fontWeight: 'bold',
    },
});
