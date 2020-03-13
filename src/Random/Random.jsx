import React from "react";
import { Redirect } from "react-router";
import { usePokemonList } from "../store/hooks";

function randomInRange(min, max) {
  return min + Math.floor(Math.random() * Math.floor(max));
}

const entryApiRegex = /https:\/\/pokeapi.co\/api\/v2\/pokemon\/(\d+)/;

const getId = entry => entry.url.match(entryApiRegex)[1];

export function Random() {
  const pokemons = usePokemonList(false);
  if (pokemons.state !== 'loaded') {
    return <Redirect to={`/entry/${randomInRange(1, 807)}`} />;
  }
  const { results } = pokemons.data;
  const randomEntry = results[randomInRange(0, results.length - 1)];
  console.log(randomEntry, getId(randomEntry));
  return <Redirect to={`/entry/${getId(randomEntry)}`} />;
}
