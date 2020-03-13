export const getPokemons = state => state.pokemons || { data: { results: [] } };

export const getPokemon = pokemon => state => state[`pokemon_${pokemon}`] || {};
