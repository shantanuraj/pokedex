import React from "react";
import Loading from "../Loading";
import { useSelector, useDispatch } from "react-redux";
import { apiRequest } from "../reducers";
import { PokemonList } from "./PokemonList";

import "./Home.css";

const fetchPokemons = () =>
  apiRequest("pokemons", "https://pokeapi.co/api/v2/pokemon?limit=965");

const getPokemons = state => state.pokemons || { data: {} };

export function Home() {
  const dispatch = useDispatch();
  const pokemons = useSelector(getPokemons);
  const loaded = pokemons.state === "loaded";
  React.useEffect(() => {
    if (!loaded) dispatch(fetchPokemons());
  }, [dispatch, loaded]);
  return (
    <div className="home">
      <h1>pokédex</h1>
      {!loaded && <Loading />}
      {loaded && <PokemonList pokemons={pokemons.data.results} />}
    </div>
  );
}

