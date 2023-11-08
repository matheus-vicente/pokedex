"use client";

import { useEffect } from "react";

import { useStore } from "@/store";
import { Card } from "@/components/Card";

export default function Home() {
  const { pokemon_list, start } = useStore();

  useEffect(() => {
    async function load() {
      await start();
    }

    load();
  }, []);

  return (
    <>
      {pokemon_list.map((pokemon) => (
        <Card key={pokemon.id} pokemon={pokemon} />
      ))}
    </>
  );
}
