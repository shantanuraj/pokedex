import React from "react";
import { Redirect } from "react-router";

function randomInRange(min, max) {
  return min + Math.floor(Math.random() * Math.floor(max));
}

export function Random() {
  return <Redirect to={`/entry/${randomInRange(0, 807)}`} />;
}
