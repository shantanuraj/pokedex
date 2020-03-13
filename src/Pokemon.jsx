import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Loading } from "./Loading";
import { apiRequest } from "./reducers";

const getPokemon = pokemon => state => state[pokemon] || {};

const fetchPokemon = pokemon =>
  apiRequest(pokemon, `https://pokeapi.co/api/v2/pokemon/${pokemon}`);

export function Pokemon({
  match: {
    params: { pokemon }
  }
}) {
  const dispatch = useDispatch();
  const entry = useSelector(getPokemon(pokemon));
  const loaded = entry.state === "loaded";
  React.useEffect(() => {
    if (!loaded) dispatch(fetchPokemon(pokemon));
  }, [dispatch, pokemon, loaded]);
  if (!loaded) {
    return <Loading />;
  }
  const { data } = entry;
  const { id, height, weight, sprites, types, name } = data;
  const displayId = id.toString().padStart(3, "0");
  const typeNames = types.sort((a, b) => a.slot - b.slot).map(e => e.type.name);
  return (
    <div>
      <h1>{`#${displayId} ${name}`}</h1>
      <Sprites sprites={sprites} />
      <div className="types">{typeNames.join(", ")}</div>
      <div className="info">
        <div className="stat">
          <span>height</span> <span>{height / 10}m</span>
        </div>
        <div className="stat">
          <span>weight</span> <span>{weight / 10}kg</span>
        </div>
      </div>
    </div>
  );
}

function Sprites({ sprites }) {
  const { front_default, back_default, ...other } = sprites;
  const spriteArray = [
    front_default,
    back_default,
    ...Object.values(other)
  ].filter(e => e);
  return (
    <div className="sprites">
      {spriteArray.map(src => (
        <img height="96px" width="96px" key={src} alt={src} src={src} />
      ))}
    </div>
  );
}

export default Pokemon;
