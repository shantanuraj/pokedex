import React, { useRef, useCallback, useMemo, useState } from 'react';
import Loading from '../Loading';
import PokemonList from "../PokemonList";
import { usePokemonList } from '../store/hooks';

import "./Search.css";

export function Search () {
  const pokemons = usePokemonList();
  const inputRef = useRef(null);
  const [ query, setQuery ] = useState('');
  const loaded = pokemons.state === "loaded";

  const handleChange = useCallback(
    () => setQuery(inputRef.current.value),
    [inputRef, setQuery]
  );

  const filteredList = useMemo(
    () => {
      if (!loaded || !query) return pokemons.data.results || emptyArray;
      return pokemons.data.results.filter(matchQuery(query))
    },
    [loaded, query, pokemons.data.results]
  )

  return (
    <div className="search">
      <h1>search</h1>
      {!loaded && <Loading />}
      {loaded && (
        <React.Fragment>
          <input
            ref={inputRef}
            onChange={handleChange}
            type="search"
            autoComplete="off"
          />
          <PokemonList pokemons={filteredList} />
        </React.Fragment>
      )}
    </div>
  );
}

const emptyArray = [];

const matchQuery = query => pokemon => {
  return pokemon.name.includes(query);
}
