import axios from 'axios';

export const getRandomPokemon = async () => {
  const id = Math.floor(Math.random() * 151) + 1;
  const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
  console.log(res?.data, 'res');
  
  return {
    id,
    name: res.data.name.toUpperCase(),
    image: res.data.sprites.other['dream_world'].front_default,
    types: res.data.types.map(t => t.type.name),
    abilities: res.data.abilities.map(a => a.ability.name),
  };
};
