import { useEffect } from 'react';
import { fetchPokemon, fetchPokemons, apiRequestCancel } from './actions';
import { getPokemon, getPokemons } from './selectors';
import { useSelector, useDispatch } from 'react-redux';

export function usePokemonList(load = true) {
  const dispatch = useDispatch();
  const pokemons = useSelector(getPokemons);

  useEffect(() => {
    const loaded = pokemons.state === "loaded";
    const loading = pokemons.state === "loading";
    if (!loaded && !loading && load) dispatch(fetchPokemons());

    return () => {
      if (loading) dispatch(apiRequestCancel('pokemons'))
    }
  }, [dispatch, load, pokemons.state]);

  return pokemons;
}

export function usePokemonEntry(nameOrId) {
  const dispatch = useDispatch();
  const entry = useSelector(getPokemon(nameOrId));

  useEffect(() => {
    const loaded = entry.state === "loaded";
    const loading = entry.state === "loading";
    if (!loaded && !loading) dispatch(fetchPokemon(nameOrId));
    return () => {
      if (loading) dispatch(apiRequestCancel(`pokemon_${nameOrId}`))
    }
  }, [dispatch, nameOrId, entry.state]);

  return entry;
}
