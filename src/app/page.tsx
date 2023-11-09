"use client";

import { useEffect } from "react";
import Image from "next/image";
import { Search, Filter, Loader } from "lucide-react";

import logo from "../../public/logo.png";

import { useStore } from "@/store";
import { Card } from "@/components/Card";
import * as Input from "@/components/Input";

export default function Home() {
  const { pokemonList, start } = useStore();

  useEffect(() => {
    async function load() {
      await start();
    }

    load();
  }, [start]);

  if (pokemonList.length === 0) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader className="animate-spin" />
      </div>
    );
  }

  return (
    <>
      <header className="fixed flex w-full flex-col items-center justify-center gap-4 bg-gray-100 p-6">
        <Image
          src={logo}
          alt=""
          className="max-lg:w-logo-lg max-md:w-logo-md max-sm:w-logo-sm"
        />

        <div className="flex w-full flex-1 items-center gap-2">
          <Input.Root>
            <Input.Prefix>
              <Search className="h-5 w-5 text-gray-500" />
            </Input.Prefix>

            <Input.Control />
          </Input.Root>

          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-gray-200"
          >
            <Filter className="h-6 w-6 text-gray-700" />
          </button>
        </div>
      </header>

      <main className="mt-sm-main space-y-4 overflow-y-scroll p-6 pt-0">
        {pokemonList.map((pokemon) => (
          <Card key={pokemon.id} pokemon={pokemon} />
        ))}
      </main>
    </>
  );
}
