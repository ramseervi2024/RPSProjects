import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { getRandomPokemon } from '../api/pokeApi';
import PokemonCard from '../components/PokemonCard';
import ActionButtons from '../components/ActionButtons';

export default function SwipeScreen({ onLiked, theme }) {
  const [pokemon, setPokemon] = useState(null);

  const loadPokemon = async () => {
    const p = await getRandomPokemon();
    setPokemon(p);
  };

  useEffect(() => { loadPokemon(); }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.bg }}>
      <PokemonCard pokemon={pokemon} theme={theme} />
      <ActionButtons
        theme={theme}
        onLike={() => { onLiked(pokemon); loadPokemon(); }}
        onDislike={loadPokemon}
      />
    </View>
  );
}
