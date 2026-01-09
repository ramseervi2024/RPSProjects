import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Heart, X } from 'lucide-react-native';
import { Text } from 'react-native-gesture-handler';

export default function ActionButtons({ onLike, onDislike, theme }) {
  return (
    <>
      {/* <View style={styles.container}>
        <TouchableOpacity
          onPress={onDislike}
          activeOpacity={0.8}
          style={[
            styles.circle,
            styles.dislike,
            { backgroundColor: theme.card },
          ]}
        >
          <X size={34} color={theme.dislike} strokeWidth={3} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onLike}
          activeOpacity={0.8}
          style={[
            styles.circle,
            styles.like,
            { backgroundColor: theme.card },
          ]}
        >
          <Heart size={34} color={theme.like} strokeWidth={3} />
        </TouchableOpacity>
      </View> */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.dislike} onPress={onDislike}>
          <Text style={styles.actionText}>Dislike</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.like} onPress={onLike}>
          <Text style={styles.actionText}>Like</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 40,
    marginTop: 24,
  },

  circle: {
    width: 76,
    height: 76,
    borderRadius: 38,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
  },

  dislike: {
    borderWidth: 2,
    borderColor: '#ff6b6b',
  },

  like: {
    borderWidth: 2,
    borderColor: '#2ecc71',
  },

  actions: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 12,
  },

  dislike: {
    backgroundColor: '#ff7675',
    paddingHorizontal: 50,
    paddingVertical: 15,
    borderRadius: 10,
  },

  like: {
    backgroundColor: '#2ecc71',
    paddingHorizontal: 50,
    paddingVertical: 15,
    borderRadius: 10,
  },

  actionText: {
    color: '#fff',
    fontWeight: '700',
  },
});
