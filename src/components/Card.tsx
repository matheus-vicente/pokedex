import Image from "next/image";

import { Pokemon } from "@/store";

interface CardProps {
  pokemon: Pokemon;
}

export function Card({ pokemon }: CardProps) {
  return (
    <div className="rounded-md bg-white shadow-sm">
      <div className="flex justify-center rounded-md rounded-b-none bg-green-300">
        <Image
          width={180}
          height={180}
          alt={pokemon.name}
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png`}
          className=""
        />
      </div>

      <div className="p-4">
        <div className="flex items-center">
          <span className="text-lg font-bold">
            #{String(pokemon.id).padStart(3, "0")}
          </span>
          <strong className="ml-4">{pokemon.name}</strong>
        </div>

        <div className="flex">
          <span className="font-medium">Tipo</span>
          <span className="ml-auto text-gray-600">
            {pokemon.types[0]} {pokemon.types[1] && ` / ${pokemon.types[1]}`}
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
    </div>
  );
}
