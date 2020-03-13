import React from "react";
import { Link } from "react-router-dom";

export function PokemonList({ pokemons = [] }) {
  return (
    <ul>
      {pokemons.map(pokemon => (
        <Link to={`/entry/${pokemon.name}`} key={pokemon.url}>
          <li>{pokemon.name}</li>
        </Link>
      ))}
    </ul>
  );
}
