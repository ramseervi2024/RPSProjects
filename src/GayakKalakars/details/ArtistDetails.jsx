import React, { useState, useCallback, useRef, useEffect } from 'react';
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
    Share,
    Linking,
} from 'react-native';
import {
    ChevronLeft,
    Play,
    Pause,
    X,
    Star,
    ShieldCheck,
    Share2,
    Info,
    MapPin,
    Award,
    Briefcase,
    Phone,
    MessageCircle,
    Music,
    ThumbsUp,
    Volume2,
    VolumeX,
    Maximize,
    Heart,
    Shield
} from 'lucide-react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import { COLORS } from '../theme';

const { width } = Dimensions.get('window');

export default function ArtistDetails({ artist, onBack, isAlreadyBooked = false }) {
    const playerRef = useRef(null);
    const [bookingModalVisible, setBookingModalVisible] = useState(false);
    const [isPlaying, setIsPlaying] = useState(true);
    const [isMuted, setIsMuted] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [playingVideoId, setPlayingVideoId] = useState(artist.famousSongs[0]?.youtubeId);
    const [tilakModalVisible, setTilakModalVisible] = useState(false);
    const [selectedTilak, setSelectedTilak] = useState(null);
    const [bookingData, setBookingData] = useState({
        date: '',
        eventType: '',
        contact: '',
        requirements: '',
    });

    // Tracking progress for custom bar
    useEffect(() => {
        const interval = setInterval(async () => {
            if (playerRef.current && isPlaying) {
                const elapsed = await playerRef.current.getCurrentTime();
                const total = await playerRef.current.getDuration();
                setCurrentTime(elapsed);
                setDuration(total);
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [isPlaying]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

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
            setIsPlaying(false);
        }
    }, []);

    const togglePlaying = () => {
        setIsPlaying((prev) => !prev);
    };

    const toggleMute = () => {
        setIsMuted((prev) => !prev);
    };

    const handleShare = async () => {
        try {
            await Share.share({
                message: `Check out ${artist.name} (${artist.title}) on Marwar Artist Connect!`,
                url: 'https://marwarartistconnect.com/profile/' + artist.id,
            });
        } catch (error) {
            Alert.alert(error.message);
        }
    };

    const handleCallManager = () => {
        Linking.openURL('tel:+919876543210');
    };

    const handleWhatsAppManager = () => {
        Linking.openURL('whatsapp://send?text=Hello, I want to book ' + artist.name + '&phone=+919876543210');
    };

    const handleSendTilak = () => {
        if (!selectedTilak) return;
        Alert.alert('Virtual Tilak', `Thank you! Your Virtual Tilak of ₹${selectedTilak} has been sent to ${artist.name}. Digital receipt sent to your mobile.`);
        setTilakModalVisible(false);
        setSelectedTilak(null);
    };

    const reviews = [
        { id: 'r1', user: 'Ramesh Seervi', rating: 5, comment: 'Prakash ji ri aawaz mein jaadu hai! Wedding event was super successful. Marwar ri mithaas!', date: '2 days ago' },
        { id: 'r2', user: 'Dimple Pali', rating: 5, comment: 'Soulful bhajans. The "Desi" style is truly preserved. Highly recommended for spiritual events.', date: '1 week ago' },
        { id: 'r3', user: 'Sumer Singh', rating: 5, comment: 'Pure energy on stage. All our guests from Abu Road loved the folk night.', date: '3 weeks ago' },
    ];

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
                    <TouchableOpacity onPress={handleShare}>
                        <Share2 size={24} color={COLORS.text} />
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Cinema Mode Video Section */}
                <View style={styles.videoSection}>
                    {playingVideoId ? (
                        <View>
                            <YoutubePlayer
                                ref={playerRef}
                                height={width * 0.56}
                                play={isPlaying}
                                mute={isMuted}
                                videoId={playingVideoId}
                                onChangeState={onStateChange}
                                initialPlayerParams={{
                                    controls: 0,
                                    modestbranding: 1,
                                    rel: false,
                                    iv_load_policy: 3,
                                    showinfo: 0,
                                }}
                            />

                            {/* Professional HUD Overlay (Netflix Style) */}
                            <View style={styles.cinemaOverlay}>
                                {/* Top Gradient Info */}
                                <View style={styles.cinemaTopBar}>
                                    <View style={styles.liveBadge}><Text style={styles.liveText}>PRO HD</Text></View>
                                    <TouchableOpacity onPress={toggleMute}>
                                        {isMuted ? <VolumeX size={20} color="#FFF" /> : <Volume2 size={20} color="#FFF" />}
                                    </TouchableOpacity>
                                </View>

                                {/* Center Play/Pause Control */}
                                <TouchableOpacity style={styles.centerControl} onPress={togglePlaying}>
                                    <View style={styles.centerPlayCircle}>
                                        {isPlaying ? <Pause size={32} color="#FFF" fill="#FFF" /> : <Play size={32} color="#FFF" fill="#FFF" />}
                                    </View>
                                </TouchableOpacity>

                                {/* Bottom Progress Bar */}
                                <View style={styles.cinemaBottomBar}>
                                    <View style={styles.timeInfo}>
                                        <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
                                        <Text style={[styles.timeText, { marginHorizontal: 4 }]}>/</Text>
                                        <Text style={styles.timeText}>{formatTime(duration)}</Text>
                                    </View>
                                    <View style={styles.progressBarWrapper}>
                                        <View style={styles.progressBarBackground}>
                                            <View style={[styles.progressBarFill, { width: `${(currentTime / duration) * 100}%` }]} />
                                        </View>
                                    </View>
                                    <TouchableOpacity style={styles.fullscreenBtn}>
                                        <Maximize size={18} color="#FFF" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
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
                            <View style={styles.badgeRow}>
                                <View style={styles.verifiedBadge}>
                                    <ShieldCheck size={14} color={COLORS.success} />
                                    <Text style={styles.verifiedText}>Verified</Text>
                                </View>
                                <View style={styles.verifiedBadge}>
                                    <Star size={14} color={COLORS.accent} fill={COLORS.accent} />
                                    <Text style={[styles.verifiedText, { color: COLORS.accent }]}>Star Artist</Text>
                                </View>
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
                                <Star size={18} color={COLORS.accent} fill={COLORS.accent} />
                                <Text style={styles.statValue}> 4.9</Text>
                            </View>
                            <Text style={styles.statLabel}>Rating</Text>
                        </View>
                    </View>
                </View>

                {/* Quick Advance Actions Grid */}
                <View style={styles.proActionGrid}>
                    <TouchableOpacity style={styles.proActionItem} onPress={handleCallManager}>
                        <View style={[styles.proActionIcon, { backgroundColor: '#3498DB20' }]}>
                            <Phone size={24} color="#3498DB" />
                        </View>
                        <Text style={styles.proActionText}>Call Manager</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.proActionItem} onPress={handleWhatsAppManager}>
                        <View style={[styles.proActionIcon, { backgroundColor: '#27AE6020' }]}>
                            <MessageCircle size={24} color="#27AE60" />
                        </View>
                        <Text style={styles.proActionText}>WhatsApp</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.proActionItem} onPress={() => setTilakModalVisible(true)}>
                        <View style={[styles.proActionIcon, { backgroundColor: '#F1C40F20' }]}>
                            <Heart size={24} color="#F1C40F" fill="#F1C40F" />
                        </View>
                        <Text style={styles.proActionText}>Send Tilak</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.proActionItem}>
                        <View style={[styles.proActionIcon, { backgroundColor: '#E74C3C20' }]}>
                            <Music size={24} color="#E74C3C" />
                        </View>
                        <Text style={styles.proActionText}>Audio Only</Text>
                    </TouchableOpacity>
                </View>

                {/* Virtual Tilak Info Section (Monetization Tip) */}
                <View style={[styles.section, { paddingTop: 0 }]}>
                    <View style={styles.tilakBanner}>
                        <View style={styles.tilakIconBox}>
                            <Shield size={20} color={COLORS.accentRed} />
                        </View>
                        <View style={styles.tilakInfoText}>
                            <Text style={styles.tilakTitle}>Support this Kalakar</Text>
                            <Text style={styles.tilakSub}>100% of Virtual Tilak goes directly to the artist's verified bank account.</Text>
                        </View>
                        <TouchableOpacity style={styles.tilakBtnSmall} onPress={() => setTilakModalVisible(true)}>
                            <Text style={styles.tilakBtnSmallText}>TIP NOW</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Extra Details */}
                <View style={styles.detailsSection}>
                    <View style={styles.detailCard}>
                        <MapPin size={22} color={COLORS.accentRed} />
                        <View style={styles.detailTextContainer}>
                            <Text style={styles.detailLabel}>Native Location</Text>
                            <Text style={styles.detailValue}>{artist.location || 'Rajasthan'}</Text>
                        </View>
                    </View>
                    <View style={styles.detailCard}>
                        <Briefcase size={22} color={COLORS.accentRed} />
                        <View style={styles.detailTextContainer}>
                            <Text style={styles.detailLabel}>Professional Experience</Text>
                            <Text style={styles.detailValue}>{artist.experience || '10+ Years'}</Text>
                        </View>
                    </View>
                    <View style={styles.detailCard}>
                        <Award size={22} color={COLORS.accentRed} />
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
                <View style={[styles.section, { backgroundColor: COLORS.cardBackground, marginVertical: 10 }]}>
                    <Text style={styles.sectionTitle}>Famous Melodies</Text>
                    {artist.famousSongs.map((song) => (
                        <TouchableOpacity
                            key={song.id}
                            style={[styles.songRow, playingVideoId === song.youtubeId && isPlaying && styles.songRowActive]}
                            onPress={() => {
                                setPlayingVideoId(song.youtubeId);
                                setIsPlaying(true);
                            }}
                        >
                            <View style={styles.songIcon}>
                                <Play size={16} color={playingVideoId === song.youtubeId && isPlaying ? COLORS.white : COLORS.accentRed} fill={playingVideoId === song.youtubeId && isPlaying ? COLORS.white : COLORS.accentRed} />
                            </View>
                            <View style={styles.songInfo}>
                                <Text style={[styles.songTitle, playingVideoId === song.youtubeId && isPlaying && styles.songTitleActive]}>{song.title}</Text>
                                <Text style={[styles.songSub, playingVideoId === song.youtubeId && isPlaying && styles.songTitleActive]}>{playingVideoId === song.youtubeId && isPlaying ? 'Playing Now' : 'Tap to Play'}</Text>
                            </View>
                            {playingVideoId === song.youtubeId && isPlaying && (
                                <Music size={18} color={COLORS.white} />
                            )}
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Professional Reviews Section */}
                <View style={styles.section}>
                    <View style={styles.sectionHeaderRow}>
                        <Text style={styles.sectionTitle}>Fans Reviews</Text>
                        <TouchableOpacity>
                            <Text style={styles.viewMoreText}>Write Review</Text>
                        </TouchableOpacity>
                    </View>
                    {reviews.map(review => (
                        <View key={review.id} style={styles.reviewCard}>
                            <View style={styles.reviewHeader}>
                                <View style={styles.reviewUserCircle}>
                                    <Text style={styles.reviewUserInit}>{review.user.charAt(0)}</Text>
                                </View>
                                <View style={styles.reviewMeta}>
                                    <Text style={styles.reviewUser}>{review.user}</Text>
                                    <View style={styles.reviewRating}>
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <Star key={i} size={12} color={COLORS.accent} fill={COLORS.accent} />
                                        ))}
                                        <Text style={styles.reviewDate}>{review.date}</Text>
                                    </View>
                                </View>
                            </View>
                            <Text style={styles.reviewComment}>{review.comment}</Text>
                            <TouchableOpacity style={styles.likeReview}>
                                <ThumbsUp size={14} color={COLORS.textSecondary} />
                                <Text style={styles.likeText}>Helpful</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>

                <View style={styles.footerSpacer} />
            </ScrollView>

            {/* Pro Booking Action */}
            {!isAlreadyBooked && (
                <View style={styles.bookingFooter}>
                    <View style={styles.priceInfo}>
                        <Text style={styles.priceLabel}>Starting package</Text>
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

            {/* Floating Quick Call Button for Emergency Bookings */}
            <TouchableOpacity style={styles.floatingCallBtn} onPress={handleCallManager}>
                <Phone size={24} color={COLORS.white} fill={COLORS.white} />
            </TouchableOpacity>

            {/* Virtual Tilak Modal */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={tilakModalVisible}
                onRequestClose={() => setTilakModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={[styles.modalContent, { borderTopLeftRadius: 30, borderTopRightRadius: 30 }]}>
                        <View style={styles.modalHeader}>
                            <View style={styles.tilakModalIcon}>
                                <Heart size={30} color={COLORS.accentRed} fill={COLORS.accentRed} />
                            </View>
                            <Text style={styles.modalTitle}>Virtual Tilak</Text>
                            <TouchableOpacity onPress={() => setTilakModalVisible(false)}>
                                <X size={24} color={COLORS.text} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.modalScroll}>
                            <Text style={styles.tilakDesc}>Support {artist.name} by sending a digital blessing (Tilak).</Text>

                            <View style={styles.tilakGrid}>
                                {[101, 251, 501, 1101].map(amount => (
                                    <TouchableOpacity
                                        key={amount}
                                        style={[styles.tilakOption, selectedTilak === amount && styles.tilakOptionActive]}
                                        onPress={() => setSelectedTilak(amount)}
                                    >
                                        <Text style={[styles.tilakAmount, selectedTilak === amount && styles.tilakAmountActive]}>₹{amount}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>

                            <TouchableOpacity
                                style={[styles.finalBookBtn, !selectedTilak && { opacity: 0.5 }]}
                                disabled={!selectedTilak}
                                onPress={handleSendTilak}
                            >
                                <Text style={styles.finalBookBtnText}>Send Blessing</Text>
                            </TouchableOpacity>
                            <Text style={styles.payoutNotice}>Includes 2.5% platform gateway fee.</Text>
                        </View>
                    </View>
                </View>
            </Modal>

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
        backgroundColor: '#111',
        position: 'relative',
        overflow: 'hidden',
    },
    cinemaOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.4)',
        zIndex: 100,
        justifyContent: 'space-between',
    },
    cinemaTopBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
    },
    liveBadge: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
    },
    liveText: {
        color: '#FFF',
        fontSize: 10,
        fontWeight: 'bold',
    },
    centerControl: {
        alignSelf: 'center',
    },
    centerPlayCircle: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: 'rgba(255,255,255,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cinemaBottomBar: {
        paddingHorizontal: 15,
        paddingBottom: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },
    timeInfo: {
        flexDirection: 'row',
        marginRight: 10,
    },
    timeText: {
        color: '#FFF',
        fontSize: 10,
        fontWeight: '700',
    },
    progressBarWrapper: {
        flex: 1,
    },
    progressBarBackground: {
        height: 3,
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 2,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: '#E50914', // Netflix Red
    },
    fullscreenBtn: {
        marginLeft: 15,
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
    badgeRow: {
        flexDirection: 'row',
        marginTop: 5,
    },
    verifiedBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(39, 174, 96, 0.1)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        marginRight: 8,
    },
    verifiedText: {
        fontSize: 10,
        color: COLORS.success,
        marginLeft: 4,
        fontWeight: 'bold',
        textTransform: 'uppercase',
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
    proActionGrid: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 15,
        marginHorizontal: 20,
        backgroundColor: COLORS.white,
        borderRadius: 16,
        marginTop: -15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    proActionItem: {
        alignItems: 'center',
    },
    proActionIcon: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    proActionText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    tilakBanner: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.cardBackground,
        padding: 15,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: COLORS.border,
        marginTop: 15,
    },
    tilakIconBox: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: COLORS.white,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tilakInfoText: {
        flex: 1,
        marginLeft: 12,
    },
    tilakTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    tilakSub: {
        fontSize: 10,
        color: COLORS.textSecondary,
        marginTop: 2,
    },
    tilakBtnSmall: {
        backgroundColor: COLORS.accentRed,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
    },
    tilakBtnSmallText: {
        color: COLORS.white,
        fontSize: 10,
        fontWeight: 'bold',
    },
    tilakModalIcon: {
        marginBottom: 10,
        alignItems: 'center',
    },
    tilakDesc: {
        textAlign: 'center',
        color: COLORS.textSecondary,
        fontSize: 14,
        marginBottom: 20,
    },
    tilakGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    tilakOption: {
        width: '48%',
        paddingVertical: 20,
        backgroundColor: COLORS.cardBackground,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: COLORS.border,
        alignItems: 'center',
        marginBottom: 15,
    },
    tilakOptionActive: {
        borderColor: COLORS.accentRed,
        backgroundColor: '#FFF5F5',
    },
    tilakAmount: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    tilakAmountActive: {
        color: COLORS.accentRed,
    },
    payoutNotice: {
        textAlign: 'center',
        fontSize: 11,
        color: COLORS.textSecondary,
        marginTop: 15,
    },
    detailsSection: {
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    detailCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        padding: 15,
        borderRadius: 16,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    detailTextContainer: {
        marginLeft: 15,
        flex: 1,
    },
    detailLabel: {
        fontSize: 10,
        color: COLORS.textSecondary,
        textTransform: 'uppercase',
        fontWeight: 'bold',
        letterSpacing: 0.5,
    },
    detailValue: {
        fontSize: 15,
        fontWeight: '600',
        color: COLORS.text,
        marginTop: 2,
    },
    section: {
        padding: 20,
    },
    sectionHeaderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    viewMoreText: {
        fontSize: 12,
        color: COLORS.accentRed,
        fontWeight: 'bold',
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
        backgroundColor: COLORS.primary,
        padding: 15,
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
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: COLORS.cardBackground,
        justifyContent: 'center',
        alignItems: 'center',
    },
    songInfo: {
        flex: 1,
        marginLeft: 15,
    },
    songTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    songSub: {
        fontSize: 11,
        color: COLORS.textSecondary,
        marginTop: 2,
    },
    songTitleActive: {
        color: COLORS.white,
    },
    reviewCard: {
        backgroundColor: COLORS.cardBackground,
        padding: 20,
        borderRadius: 16,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    reviewHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    reviewUserCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: COLORS.accent,
        justifyContent: 'center',
        alignItems: 'center',
    },
    reviewUserInit: {
        color: COLORS.white,
        fontWeight: 'bold',
    },
    reviewMeta: {
        marginLeft: 12,
        flex: 1,
    },
    reviewUser: {
        fontSize: 14,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    reviewRating: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 2,
    },
    reviewDate: {
        fontSize: 10,
        color: COLORS.textSecondary,
        marginLeft: 10,
    },
    reviewComment: {
        fontSize: 14,
        lineHeight: 20,
        color: COLORS.text,
    },
    likeReview: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
    },
    likeText: {
        fontSize: 12,
        color: COLORS.textSecondary,
        marginLeft: 6,
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
        fontSize: 11,
        color: COLORS.textSecondary,
        textTransform: 'uppercase',
        fontWeight: 'bold',
    },
    priceValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.accentRed,
    },
    bookActionBtn: {
        backgroundColor: COLORS.accentRed,
        paddingHorizontal: 30,
        paddingVertical: 15,
        borderRadius: 16,
        shadowColor: '#8B0000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    bookActionBtnText: {
        color: COLORS.primary,
        fontWeight: 'bold',
        fontSize: 16,
    },
    floatingCallBtn: {
        position: 'absolute',
        bottom: 100,
        right: 20,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: COLORS.success,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
        zIndex: 100,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: COLORS.primary,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingBottom: 40,
        maxHeight: '90%',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 25,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    modalScroll: {
        padding: 25,
    },
    inputLabel: {
        fontSize: 14,
        fontWeight: 'bold',
        color: COLORS.text,
        marginBottom: 10,
        marginTop: 15,
    },
    input: {
        backgroundColor: COLORS.cardBackground,
        borderRadius: 12,
        padding: 18,
        fontSize: 16,
        borderWidth: 1,
        borderColor: COLORS.border,
        color: COLORS.text,
    },
    textArea: {
        height: 120,
        textAlignVertical: 'top',
    },
    chipRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    chip: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: COLORS.border,
        marginRight: 10,
        marginBottom: 10,
        backgroundColor: COLORS.white,
    },
    chipActive: {
        backgroundColor: COLORS.accentRed,
        borderColor: COLORS.accentRed,
    },
    chipText: {
        fontSize: 14,
        color: COLORS.textSecondary,
        fontWeight: '600',
    },
    chipTextActive: {
        color: COLORS.primary,
        fontWeight: 'bold',
    },
    advanceInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F7DC6F20',
        padding: 15,
        borderRadius: 12,
        marginTop: 30,
    },
    advanceInfoText: {
        fontSize: 12,
        color: COLORS.text,
        marginLeft: 12,
        flex: 1,
        lineHeight: 18,
    },
    finalBookBtn: {
        backgroundColor: COLORS.accentRed,
        padding: 20,
        borderRadius: 16,
        alignItems: 'center',
        marginTop: 40,
        shadowColor: '#8B0000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    finalBookBtnText: {
        color: COLORS.primary,
        fontSize: 18,
        fontWeight: 'bold',
    },
});
