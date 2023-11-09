import Link from "next/link";
import Image from "next/image";

import { titleCase } from "@/utils/titleCase";
import { PokemonBase } from "@/types/pokemon";

interface CardProps {
  pokemon: PokemonBase;
}

export function Card({ pokemon }: CardProps) {
  return (
    <Link
      href={`/${pokemon.name}`}
      className="w-full rounded-md bg-white shadow-sm"
    >
      <div className="flex justify-center rounded-md rounded-b-none bg-green-300">
        <Image
          width={180}
          height={180}
          alt={titleCase(pokemon.name)}
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
          className=""
        />
      </div>

      <div className="p-4">
        <div className="flex items-center">
          <span className="text-lg font-bold">
            #{String(pokemon.id).padStart(3, "0")}
          </span>
          <strong className="ml-4">{titleCase(pokemon.name)}</strong>
        </div>

        <div className="flex">
          <span className="font-medium">Tipo</span>
          <span className="ml-auto text-gray-600">
            {titleCase(pokemon.types[0])}{" "}
            {pokemon.types[1] && ` / ${titleCase(pokemon.types[1])}`}
          </span>
        </div>

        <div className="flex">
          <span className="font-medium">Tamanho</span>
          <span className="ml-auto text-gray-600">{pokemon.height / 10} m</span>
        </div>

        <div className="flex">
          <span className="font-medium">Peso</span>
          <span className="ml-auto text-gray-600">
            {pokemon.weight / 10} kg
          </span>
        </div>
      </div>
    </Link>
  );
}
