import Image from "next/image";
import { Search, Filter } from "lucide-react";
import { titleCase } from "@/utils/titleCase";

const getData = async () => {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon/zubat");

  if (!res.ok) {
    throw new Error("Não foi possível localizar este pokémon.");
  }

  return res.json();
};

type Pokemon = {
  id: number;
  name: string;
  types: Array<any>;
  height: number;
  weight: number;
};

export default async function Home() {
  const pokemon: Pokemon = await getData();

  return (
    <>
      <div className="flex items-center gap-2">
        <div className="flex h-10 flex-1 items-center rounded-full border border-gray-200 bg-white px-2">
          <Search className="h-5 w-5 text-gray-500" />
          <input
            type="text"
            placeholder="Procurar pokémon"
            className="flex-1 bg-transparent pl-2 text-gray-900 placeholder-gray-400"
          />
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-gray-200"
        >
          <Filter className="h-6 w-6 text-gray-700" />
        </button>
      </div>

      <section className="mt-4 flex flex-col gap-3">
        <div className="rounded-md bg-white shadow-sm">
          <div className="flex justify-center rounded-md rounded-b-none bg-green-300">
            <Image
              width={180}
              height={180}
              alt={titleCase(pokemon.name)}
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png`}
              className=""
            />
          </div>

          <div className="p-4">
            <div className="flex items-center">
              <span className="text-lg font-bold">
                #{pokemon.id.toString().padStart(3, "0")}
              </span>
              <strong className="ml-4">{titleCase(pokemon.name)}</strong>
            </div>

            <div className="flex">
              <span className="font-medium">Tipo</span>
              <span className="ml-auto text-gray-600">
                {titleCase(pokemon.types[0].type.name)}
                {pokemon.types[1] &&
                  ` / ${titleCase(pokemon.types[1]?.type.name)}`}
              </span>
            </div>

            <div className="flex">
              <span className="font-medium">Tamanho</span>
              <span className="ml-auto text-gray-600">
                {Number(pokemon.height) / 10} m
              </span>
            </div>

            <div className="flex">
              <span className="font-medium">Peso</span>
              <span className="ml-auto text-gray-600">
                {Number(pokemon.weight) / 10} kg
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
