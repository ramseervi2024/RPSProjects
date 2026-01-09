import { Heart } from 'lucide-react-native';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SvgUri } from 'react-native-svg';

export default function PokemonCard({
  pokemon,
  theme = 'light',
  onLike,
  onDislike,
}) {
  if (!pokemon) return null;

  const isDark = theme === 'dark';

  return (
    <View style={[styles.stack]}>
      <View style={[styles.card, isDark && styles.cardDark]}>
        {/* Heart */}
        <View style={[styles.heart, isDark && styles.heartDark]}>
          <Heart name="heart" size={18} color={isDark ? '#000' : '#fff'} />
        </View>

        {/* Image */}
        <SvgUri uri={pokemon.image} width={200} height={200} />

        {/* Name */}
        <Text style={[styles.name, isDark && styles.textDark]}>
          {pokemon.name.toUpperCase()}
        </Text>

        {/* Badges */}
        <View style={styles.badges}>
          {pokemon.types.map(t => (
            <Text key={t} style={[styles.badge, styles.type]}>
              {t.toUpperCase()}
            </Text>
          ))}
          {pokemon.abilities.map(a => (
            <Text key={a} style={[styles.badge, styles.ability]}>
              {a.toUpperCase()}
            </Text>
          ))}
        </View>

        {/* Actions */}
        {/* <View style={styles.actions}>
          <TouchableOpacity style={styles.dislike} onPress={onDislike}>
            <Text style={styles.actionText}>Dislike</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.like} onPress={onLike}>
            <Text style={styles.actionText}>Like</Text>
          </TouchableOpacity>
        </View> */}
      </View>

      {/* Card shadow stack */}
      <View style={[styles.shadowCard, isDark && styles.shadowDark]} />
      <View style={[styles.shadowCard, isDark && styles.shadowDark]} />
    </View>
  );
}

const styles = StyleSheet.create({
  stack: {
    alignItems: 'center',
    marginTop: -50
  },

  card: {
    width: 320,
    backgroundColor: '#ecf0f1',
    borderRadius: 22,
    padding: 32,
    alignItems: 'center',
    zIndex: 3,
    borderWidth: 0.4
  },

  cardDark: {
    backgroundColor: '#1e1e1e',
  },

  shadowCard: {
    width: 300,
    height: 12,
    // backgroundColor: '#ccc',
    borderRadius: 20,
    marginTop: -6,
  },

  shadowDark: {
    backgroundColor: '#111',
  },

  heart: {
    position: 'absolute',
    top: 14,
    right: 14,
    backgroundColor: '#ff6b9c',
    padding: 10,
    borderRadius: 30,
  },

  heartDark: {
    backgroundColor: '#b04b6b',
  },

  name: {
    fontSize: 22,
    fontWeight: '800',
    marginVertical: 8,
    color: '#000',
    letterSpacing: 1,
  },

  textDark: {
    color: '#fff',
  },

  badges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginVertical: 10,
    justifyContent: 'center',
  },

  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    fontSize: 12,
    fontWeight: '700',
    color: '#fff',
  },

  type: {
    backgroundColor: '#f39c12',
  },

  ability: {
    backgroundColor: '#1abc9c',
  },

  actions: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 12,
  },

  dislike: {
    backgroundColor: '#ff7675',
    paddingHorizontal: 22,
    paddingVertical: 10,
    borderRadius: 10,
  },

  like: {
    backgroundColor: '#2ecc71',
    paddingHorizontal: 32,
    paddingVertical: 10,
    borderRadius: 10,
  },

  actionText: {
    color: '#fff',
    fontWeight: '700',
  },
});
