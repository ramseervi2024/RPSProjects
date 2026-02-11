import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, runOnJS, withTiming, useAnimatedReaction, Layout } from 'react-native-reanimated';
import { Reply, ThumbsUp, ThumbsDown } from 'lucide-react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = 50;

export default function MessageBubble({ message, onReply, onReact, onFeedback, replyMessage }) {
    const isUser = message.sender === 'user';
    const isAi = message.type === 'ai';
    const isSystem = message.type === 'event';

    const translateX = useSharedValue(0);
    const showFeedback = useSharedValue(0);
    const [showEmojiBar, setShowEmojiBar] = useState(false);

    // Swipe Gesture for Reply
    const panGesture = Gesture.Pan()
        .activeOffsetX([-10, 10]) // Don't interfere with vertical scroll
        .onUpdate((event) => {
            if (event.translationX > 0 && isUser) { // Swipe right to reply (user messages usually on right, so swipe left? Actually requirement says "Swipe to right")
                // Wait, standard behavior:
                // If I am sender (Right side), I swipe LEFT to reply?
                // Requirement: "Swiping a message bubble to the right should reveal a Reply icon."
                // Okay, I will follow requirement strictly. Swipe RIGHT.
                translateX.value = event.translationX;
            } else if (event.translationX > 0 && !isUser) {
                translateX.value = event.translationX;
            }
        })
        .onEnd(() => {
            if (translateX.value > SWIPE_THRESHOLD) {
                runOnJS(onReply)(message);
            }
            translateX.value = withSpring(0);
        });

    // Long Press for Reactions
    const longPressGesture = Gesture.LongPress()
        .onStart(() => {
            runOnJS(setShowEmojiBar)(true);
        });

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: translateX.value }],
    }));

    const replyIconStyle = useAnimatedStyle(() => ({
        opacity: withTiming(translateX.value > 10 ? 1 : 0),
        transform: [
            { scale: withSpring(translateX.value > SWIPE_THRESHOLD ? 1.2 : 0.8) },
            { translateX: -40 + translateX.value } // Move with swipe
        ],
        position: 'absolute',
        left: 0,
        top: '30%',
        zIndex: -1,
    }));

    const composedGesture = Gesture.Simultaneous(panGesture, longPressGesture);

    if (isSystem) {
        return (
            <View style={styles.systemMessage}>
                <Text style={styles.systemMessageText}>{message.text}</Text>
            </View>
        );
    }

    return (
        <View style={[styles.container, isUser ? styles.containerRight : styles.containerLeft]}>

            {/* Reply Icon revealing behind */}
            <Animated.View style={[replyIconStyle]}>
                <Reply size={20} color="#666" />
            </Animated.View>

            <GestureDetector gesture={composedGesture}>
                <Animated.View style={[
                    styles.bubble,
                    isUser ? styles.bubbleRight : styles.bubbleLeft,
                    isAi && styles.bubbleAi,
                    animatedStyle
                ]}>
                    {replyMessage && (
                        <View style={styles.replyContext}>
                            <View style={styles.replyLine} />
                            <Text style={styles.replyText} numberOfLines={1}>{replyMessage.text}</Text>
                        </View>
                    )}

                    <Text style={[styles.text, isUser ? styles.textRight : styles.textLeft]}>
                        {message.text}
                    </Text>

                    {/* Reactions Display */}
                    {message.reaction && (
                        <View style={styles.reactionBadge}>
                            <Text style={styles.reactionText}>{message.reaction}</Text>
                        </View>
                    )}
                </Animated.View>
            </GestureDetector>

            {/* Timestamp */}
            <Text style={[styles.timestamp, isUser ? styles.timestampRight : styles.timestampLeft]}>
                {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Text>

            {/* Emoji Action Bar (Floating) */}
            {showEmojiBar && (
                <EmojiActionBar
                    onSelect={(emoji) => {
                        onReact(message.id, emoji);
                        setShowEmojiBar(false);
                    }}
                    onClose={() => setShowEmojiBar(false)}
                />
            )}

            {/* AI Feedback Section */}
            {isAi && (
                <AiFeedback
                    message={message}
                    onFeedback={onFeedback}
                />
            )}
        </View>
    );
}

function EmojiActionBar({ onSelect, onClose }) {
    const emojis = ['🙏', '✨', '🌙', '🔥', '❤️'];
    return (
        <View style={styles.emojiBarOverlay}>
            <TouchableOpacity style={styles.emojiBarBackdrop} onPress={onClose} />
            <View style={styles.emojiBar}>
                {emojis.map(emoji => (
                    <TouchableOpacity key={emoji} onPress={() => onSelect(emoji)} style={styles.emojiButton}>
                        <Text style={styles.emojiText}>{emoji}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
}

function AiFeedback({ message, onFeedback }) {
    const [expanded, setExpanded] = useState(false);

    // Check if feedback is already given
    const isLiked = message.feedbackType === 'liked';
    const isDisliked = message.feedbackType === 'disliked';

    const handleDislike = () => {
        setExpanded(true);
        onFeedback(message.id, 'disliked');
    };

    const handleFeatureSelect = (tag) => {
        onFeedback(message.id, 'disliked', [tag]); // Simple single select for demo
    };

    return (
        <View style={styles.feedbackContainer}>
            <View style={styles.feedbackActions}>
                <TouchableOpacity
                    onPress={() => onFeedback(message.id, isLiked ? null : 'liked')}
                    style={[styles.feedbackButton, isLiked && styles.feedbackActive]}
                >
                    <ThumbsUp size={14} color={isLiked ? "#6C63FF" : "#999"} />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={handleDislike}
                    style={[styles.feedbackButton, isDisliked && styles.feedbackActive]}
                >
                    <ThumbsDown size={14} color={isDisliked ? "#D93025" : "#999"} />
                </TouchableOpacity>
            </View>

            {(expanded || isDisliked) && (
                <Animated.View
                    style={styles.feedbackChips}
                    layout={Layout.springify()}
                >
                    {['Inaccurate', 'Too Vague', 'Too Long'].map(chip => (
                        <TouchableOpacity
                            key={chip}
                            style={[
                                styles.chip,
                                message.feedbackTags?.includes(chip) && styles.chipActive
                            ]}
                            onPress={() => handleFeatureSelect(chip)}
                        >
                            <Text style={[
                                styles.chipText,
                                message.feedbackTags?.includes(chip) && styles.chipTextActive
                            ]}>{chip}</Text>
                        </TouchableOpacity>
                    ))}
                </Animated.View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 4,
        width: '100%',
        position: 'relative',
    },
    containerRight: {
        alignItems: 'flex-end',
    },
    containerLeft: {
        alignItems: 'flex-start',
    },
    systemMessage: {
        alignSelf: 'center',
        backgroundColor: '#E0F2F1',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
        marginVertical: 8,
    },
    systemMessageText: {
        fontSize: 12,
        color: '#00796B',
    },
    bubble: {
        maxWidth: '80%',
        padding: 12,
        borderRadius: 16,
        elevation: 1,
    },
    bubbleRight: {
        backgroundColor: '#E3F2FD',
        borderBottomRightRadius: 2,
    },
    bubbleLeft: {
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 2,
    },
    bubbleAi: {
        backgroundColor: '#F3E5F5', // Light purple for AI
        borderColor: '#E1BEE7',
        borderWidth: 1,
    },
    text: {
        fontSize: 15,
        lineHeight: 22,
        color: '#333',
    },
    textRight: {
        color: '#222',
    },
    textLeft: {
        color: '#222',
    },
    timestamp: {
        fontSize: 10,
        color: '#999',
        marginTop: 2,
        marginHorizontal: 8,
    },
    timestampRight: {
        textAlign: 'right',
    },
    timestampLeft: {
        textAlign: 'left',
    },
    replyContext: {
        backgroundColor: 'rgba(0,0,0,0.05)',
        padding: 6,
        borderRadius: 8,
        marginBottom: 6,
        flexDirection: 'row',
    },
    replyLine: {
        width: 3,
        backgroundColor: '#666',
        borderRadius: 2,
        marginRight: 6,
    },
    replyText: {
        fontSize: 12,
        color: '#666',
        flex: 1,
    },
    emojiBarOverlay: {
        position: 'absolute',
        top: -50,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emojiBarBackdrop: {
        ...StyleSheet.absoluteFillObject,
        //    backgroundColor: 'rgba(0,0,0,0.1)', // Optional dimming
    },
    emojiBar: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 24,
        padding: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 5,
    },
    emojiButton: {
        padding: 8,
    },
    emojiText: {
        fontSize: 20,
    },
    reactionBadge: {
        position: 'absolute',
        bottom: -6,
        right: -6,
        backgroundColor: '#fff',
        borderRadius: 12,
        paddingHorizontal: 4,
        paddingVertical: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
        elevation: 2,
    },
    reactionText: {
        fontSize: 12,
    },
    feedbackContainer: {
        marginTop: 4,
    },
    feedbackActions: {
        flexDirection: 'row',
        gap: 12,
        marginLeft: 4,
    },
    feedbackButton: {
        padding: 4,
    },
    feedbackChips: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 6,
        marginTop: 6,
        marginLeft: 4,
        maxWidth: '80%',
    },
    chip: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        backgroundColor: '#fff',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#eee',
    },
    chipActive: {
        backgroundColor: '#FFE5E5',
        borderColor: '#D93025',
    },
    chipText: {
        fontSize: 10,
        color: '#666',
    },
    chipTextActive: {
        color: '#D93025',
    }

});
