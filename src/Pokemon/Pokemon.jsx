import React from "react";
import Loading from "../Loading";
import { usePokemonEntry } from "../store/hooks";

import "./Pokemon.css";

export function Pokemon({
  match: {
    params: { pokemon }
  }
}) {
  const entry = usePokemonEntry(pokemon);
  const loaded = entry.state === "loaded";

  if (!loaded) {
    return <Loading />;
  }

  const { data } = entry;
  const { id, height, weight, sprites, types, name, stats } = data;
  const displayId = id.toString().padStart(3, "0");
  const typeNames = types.sort((a, b) => a.slot - b.slot).map(e => e.type.name);

  const rows = [
    [ <span>height</span>, <span>{height / 10}m</span> ],
    [ <span>weight</span>, <span>{weight / 10}kg</span> ],
    ...stats.map(info => [info.stat.name, info.base_stat]),
  ]

  return (
    <div className="entry">
      <h1>{`#${displayId} ${name}`}</h1>
      <Sprites sprites={sprites} />
      <div className="types">{typeNames.join(", ")}</div>
      <Table rows={rows} />
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

function Table({ rows }) {
  return (
    <table>
      <tbody>
        {rows.map(([info, value], key) => (
          <tr key={key}>
            <td>{info}</td>
            <td>{value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
