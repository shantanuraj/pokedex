import React from "react";
import Loading from "../Loading";
import { PokemonList } from "./PokemonList";
import { usePokemonList } from "../store/hooks";

import "./Home.css";

export function Home() {
  const pokemons = usePokemonList();
  const loaded = pokemons.state === "loaded";
  return (
    <div className="home">
      <h1>pokédex</h1>
      {!loaded && <Loading />}
      {loaded && <PokemonList pokemons={pokemons.data.results} />}
    </div>
  );
}

