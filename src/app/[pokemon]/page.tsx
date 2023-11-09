"use client";

import Image from "next/image";
import { useEffect } from "react";

import { useStore } from "@/store";
import { titleCase } from "@/utils/titleCase";
import { ArrowLeft, Heart, Loader } from "lucide-react";
import Link from "next/link";

export default function Pokemon({ params }: { params: { pokemon: string } }) {
  const { selectedPokemon, find } = useStore();

  useEffect(() => {
    async function load() {
      await find(params.pokemon);
    }

    load();
  }, [find, params.pokemon]);

  if (!selectedPokemon.name) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-col rounded-md rounded-b-none bg-green-300">
        <div className="flex items-center justify-between px-4 pt-4">
          <Link href="/" className="h-6 w-6">
            <ArrowLeft className="h-6 w-6" />
          </Link>

          <strong className="text-2xl font-semibold">
            {titleCase(selectedPokemon.name)}
          </strong>

          <Heart className="h-6 w-6" />
        </div>

        <Image
          width={240}
          height={240}
          className="mx-auto"
          alt={titleCase(selectedPokemon.name)}
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${selectedPokemon.id}.png`}
        />
      </div>

      <div></div>
    </div>
  );
}
