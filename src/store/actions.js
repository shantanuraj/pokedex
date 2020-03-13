export const apiRequest = (key, url) => ({
  type: "API_REQUEST",
  payload: { key, url }
});

export const apiRequestSuccess = (key, data) => ({
  type: "API_REQUEST_SUCCESS",
  payload: { key, data }
});

export const fetchPokemons = () =>
  apiRequest("pokemons", "https://pokeapi.co/api/v2/pokemon?limit=965");

export const fetchPokemon = pokemon =>
  apiRequest(pokemon, `https://pokeapi.co/api/v2/pokemon/${pokemon}`);
