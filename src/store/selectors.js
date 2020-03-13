export const getPokemons = state => state.pokemons || { data: {} };

export const getPokemon = pokemon => state => state[pokemon] || {};
