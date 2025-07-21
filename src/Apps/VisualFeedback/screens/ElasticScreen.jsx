import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withTiming, 
  withRepeat,
  interpolate,
  Easing
} from 'react-native-reanimated';
import { Square, RefreshCw, Image, User } from 'lucide-react-native';

const SkeletonLine = ({ 
  width = '100%', 
  height = 16, 
  style 
}) => {
  const shimmer = useSharedValue(0);

  React.useEffect(() => {
    shimmer.value = withRepeat(
      withTiming(1, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    const translateX = interpolate(shimmer.value, [0, 1], [-200, 200]);
    return {
      transform: [{ translateX }],
    };
  });

  return (
    <View style={[styles.skeletonLine, { width, height }, style]}>
      <Animated.View style={[styles.shimmer, animatedStyle]} />
    </View>
  );
};

const SkeletonCircle = ({ size = 40 }) => {
  const shimmer = useSharedValue(0);

  React.useEffect(() => {
    shimmer.value = withRepeat(
      withTiming(1, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    const translateX = interpolate(shimmer.value, [0, 1], [-size, size]);
    return {
      transform: [{ translateX }],
    };
  });

  return (
    <View style={[styles.skeletonCircle, { width: size, height: size, borderRadius: size / 2 }]}>
      <Animated.View style={[styles.shimmer, animatedStyle]} />
    </View>
  );
};

const SkeletonCard = () => (
  <View style={styles.card}>
    <SkeletonLine width="100%" height={120} style={styles.cardImage} />
    <View style={styles.cardContent}>
      <SkeletonLine width="80%" height={20} style={{ marginBottom: 8 }} />
      <SkeletonLine width="60%" height={16} style={{ marginBottom: 12 }} />
      <View style={styles.cardMeta}>
        <SkeletonCircle size={24} />
        <SkeletonLine width={80} height={12} />
        <SkeletonLine width={60} height={12} />
      </View>
    </View>
  </View>
);

const SkeletonListItem = () => (
  <View style={styles.listItem}>
    <SkeletonCircle size={48} />
    <View style={styles.listContent}>
      <SkeletonLine width="70%" height={16} style={{ marginBottom: 6 }} />
      <SkeletonLine width="50%" height={12} />
    </View>
    <SkeletonLine width={24} height={12} />
  </View>
);

const SkeletonProfile = () => (
  <View style={styles.profile}>
    <SkeletonCircle size={80} />
    <View style={styles.profileInfo}>
      <SkeletonLine width={120} height={24} style={{ marginBottom: 8 }} />
      <SkeletonLine width={100} height={14} style={{ marginBottom: 12 }} />
      <View style={styles.profileStats}>
        <View style={styles.stat}>
          <SkeletonLine width={40} height={20} style={{ marginBottom: 4 }} />
          <SkeletonLine width={60} height={12} />
        </View>
        <View style={styles.stat}>
          <SkeletonLine width={40} height={20} style={{ marginBottom: 4 }} />
          <SkeletonLine width={60} height={12} />
        </View>
        <View style={styles.stat}>
          <SkeletonLine width={40} height={20} style={{ marginBottom: 4 }} />
          <SkeletonLine width={60} height={12} />
        </View>
      </View>
    </View>
  </View>
);

const ContentCard = ({ 
  title, 
  description, 
  author, 
  time 
}) => (
  <View style={styles.card}>
    <View style={[styles.cardImage, styles.realImage]}>
      <Image size={40} color="#6B7280" />
    </View>
    <View style={styles.cardContent}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardDescription}>{description}</Text>
      <View style={styles.cardMeta}>
        <View style={styles.authorAvatar}>
          <User size={12} color="#6B7280" />
        </View>
        <Text style={styles.metaText}>{author}</Text>
        <Text style={styles.metaText}>{time}</Text>
      </View>
    </View>
  </View>
);

export default function SkeletonScreen() {
  const [showContent, setShowContent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const simulateLoading = () => {
    setIsLoading(true);
    setShowContent(false);
    
    setTimeout(() => {
      setShowContent(true);
      setIsLoading(false);
    }, 3000);
  };

  const resetToSkeleton = () => {
    setShowContent(false);
    setIsLoading(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Square size={24} color="#3B82F6" />
        <Text style={styles.title}>Skeleton Loaders</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Profile Section</Text>
          {showContent ? (
            <View style={styles.profile}>
              <View style={styles.realAvatar}>
                <User size={32} color="#ffffff" />
              </View>
              <View style={styles.profileInfo}>
                <Text style={styles.profileName}>John Doe</Text>
                <Text style={styles.profileBio}>Software Developer</Text>
                <View style={styles.profileStats}>
                  <View style={styles.stat}>
                    <Text style={styles.statNumber}>124</Text>
                    <Text style={styles.statLabel}>Posts</Text>
                  </View>
                  <View style={styles.stat}>
                    <Text style={styles.statNumber}>1.2k</Text>
                    <Text style={styles.statLabel}>Followers</Text>
                  </View>
                  <View style={styles.stat}>
                    <Text style={styles.statNumber}>890</Text>
                    <Text style={styles.statLabel}>Following</Text>
                  </View>
                </View>
              </View>
            </View>
          ) : (
            <SkeletonProfile />
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Content Cards</Text>
          {showContent ? (
            <>
              <ContentCard
                title="Amazing React Native Animation"
                description="Learn how to create beautiful animations in React Native with Reanimated 3"
                author="Jane Smith"
                time="2h ago"
              />
              <ContentCard
                title="Building Better UIs"
                description="Tips and tricks for creating modern mobile interfaces"
                author="Mike Johnson"
                time="4h ago"
              />
            </>
          ) : (
            <>
              <SkeletonCard />
              <SkeletonCard />
            </>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>List Items</Text>
          {showContent ? (
            <>
              <View style={styles.listItem}>
                <View style={styles.realAvatar}>
                  <User size={20} color="#ffffff" />
                </View>
                <View style={styles.listContent}>
                  <Text style={styles.listTitle}>Sarah Wilson</Text>
                  <Text style={styles.listSubtitle}>UI/UX Designer</Text>
                </View>
                <Text style={styles.listTime}>now</Text>
              </View>
              <View style={styles.listItem}>
                <View style={styles.realAvatar}>
                  <User size={20} color="#ffffff" />
                </View>
                <View style={styles.listContent}>
                  <Text style={styles.listTitle}>Alex Chen</Text>
                  <Text style={styles.listSubtitle}>Frontend Developer</Text>
                </View>
                <Text style={styles.listTime}>5m</Text>
              </View>
              <View style={styles.listItem}>
                <View style={styles.realAvatar}>
                  <User size={20} color="#ffffff" />
                </View>
                <View style={styles.listContent}>
                  <Text style={styles.listTitle}>Emily Davis</Text>
                  <Text style={styles.listSubtitle}>Product Manager</Text>
                </View>
                <Text style={styles.listTime}>12m</Text>
              </View>
            </>
          ) : (
            <>
              <SkeletonListItem />
              <SkeletonListItem />
              <SkeletonListItem />
            </>
          )}
        </View>
      </ScrollView>

      <View style={styles.controls}>
        <Pressable 
          style={[styles.button, styles.primaryButton, isLoading && styles.buttonDisabled]}
          onPress={simulateLoading}
          disabled={isLoading}
        >
          <RefreshCw size={16} color="#ffffff" />
          <Text style={styles.buttonText}>
            {isLoading ? 'Loading...' : 'Simulate Loading'}
          </Text>
        </Pressable>

        <Pressable style={[styles.button, styles.secondaryButton]} onPress={resetToSkeleton}>
          <Square size={16} color="#6B7280" />
          <Text style={styles.secondaryButtonText}>Show Skeleton</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    gap: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 16,
  },
  skeletonLine: {
    backgroundColor: '#374151',
    borderRadius: 4,
    overflow: 'hidden',
    position: 'relative',
  },
  skeletonCircle: {
    backgroundColor: '#374151',
    overflow: 'hidden',
    position: 'relative',
  },
  shimmer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    width: 100,
  },
  card: {
    backgroundColor: '#1F2937',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
  },
  cardImage: {
    borderRadius: 8,
    marginBottom: 0,
  },
  realImage: {
    backgroundColor: '#374151',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContent: {
    padding: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 6,
  },
  cardDescription: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 12,
    lineHeight: 20,
  },
  cardMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  authorAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#374151',
    alignItems: 'center',
    justifyContent: 'center',
  },
  metaText: {
    fontSize: 12,
    color: '#6B7280',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 12,
  },
  listContent: {
    flex: 1,
  },
  listTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
    marginBottom: 2,
  },
  listSubtitle: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  listTime: {
    fontSize: 12,
    color: '#6B7280',
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#1F2937',
    borderRadius: 12,
    gap: 16,
  },
  realAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#3B82F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  profileBio: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 12,
  },
  profileStats: {
    flexDirection: 'row',
    gap: 20,
  },
  stat: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  controls: {
    padding: 20,
    gap: 12,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  primaryButton: {
    backgroundColor: '#3B82F6',
  },
  secondaryButton: {
    backgroundColor: '#374151',
    borderWidth: 1,
    borderColor: '#4B5563',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButtonText: {
    color: '#6B7280',
    fontSize: 16,
    fontWeight: '600',
  },
});