import { useEffect } from 'react';
import { fetchPokemon, fetchPokemons } from './actions';
import { getPokemon, getPokemons } from './selectors';
import { useSelector, useDispatch } from 'react-redux';

export function usePokemonList() {
  const dispatch = useDispatch();
  const pokemons = useSelector(getPokemons);

  useEffect(() => {
    const loaded = pokemons.state === "loaded";
    const loading = pokemons.state === "loading";
    if (!loaded && !loading) dispatch(fetchPokemons());
  }, [dispatch, pokemons.state]);

  return pokemons;
}

export function usePokemonEntry(nameOrId) {
  const dispatch = useDispatch();
  const entry = useSelector(getPokemon(nameOrId));

  useEffect(() => {
    const loaded = entry.state === "loaded";
    const loading = entry.state === "loading";
    if (!loaded && !loading) dispatch(fetchPokemon(nameOrId));
  }, [dispatch, nameOrId, entry.state]);

  return entry;
}
