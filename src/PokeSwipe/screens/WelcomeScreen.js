import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Heart } from 'lucide-react-native';

export default function WelcomeScreen({ onStart, theme }) {
  return (
    <View style={[styles.container, { backgroundColor: theme.bg }]}>
      <View style={[styles.card, { backgroundColor: theme.card }]}>
        <View style={styles.heartWrap}>
          <Heart size={28} color={theme.like} fill={theme.like} />
        </View>

        <View style={styles.list}>
          <Text style={[styles.title, { color: theme.text }]}>How to Play PokeSwipe</Text>
          <Text style={[styles.item, { color: theme.text }]}>
            • Pokémon appear one at a time
          </Text>
          <Text style={[styles.item, { color: theme.text }]}>
            • Choose “Like” or “Dislike”
          </Text>
          <Text style={[styles.item, { color: theme.text }]}>
            • Build your favorite team
          </Text>
        </View>

        <TouchableOpacity
          onPress={onStart}
          activeOpacity={0.8}
          style={[styles.button, { backgroundColor: theme.like }]}
        >
          <Text style={styles.buttonText}>Let’s Go!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },

  card: {
    width: '94%',
    borderRadius: 22,
    padding: 30,
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    paddingVertical: 40
  },

  heartWrap: {
    position: 'absolute',
    top: 26,
    right: 26,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#f8a5c2',
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    fontSize: 22,
    marginTop: 60,
    marginBottom: 14,

  },

  list: {
    width: '100%',
    marginBottom: 20,
  },

  item: {
    fontSize: 16,
    marginVertical: 6,
  },

  button: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
});
