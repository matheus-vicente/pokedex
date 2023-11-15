"use client";

import Image from "next/image";
import { useCallback, useEffect } from "react";
import { Search, Filter, Loader } from "lucide-react";

import logo from "../../public/logo.png";

import { useStore } from "@/store";
import { Card } from "@/components/Card";
import * as Input from "@/components/Input";

export default function Home() {
  const { pokemonList, start, toPage, next, prev } = useStore();

  const handleNext = useCallback(
    (url: string) => {
      Promise.resolve(toPage(url));
    },
    [toPage],
  );

  const renderPokemonList = useCallback(() => {
    if (!pokemonList) {
      return (
        <div className="flex items-center justify-center">
          <Loader className="animate-spin" />
        </div>
      );
    }

    return pokemonList.map((pokemon, index) => {
      if (index === 0) {
        return <Card id="first-card" key={pokemon.id} pokemon={pokemon} />;
      }

      if (index === pokemonList.length - 1) {
        return <Card id="last-card" key={pokemon.id} pokemon={pokemon} />;
      }

      return <Card key={pokemon.id} pokemon={pokemon} />;
    });
  }, [pokemonList]);

  useEffect(() => {
    const main = document.getElementById("main");

    if (!main) {
      return;
    }

    const observer = new IntersectionObserver(
      async (entries) => {
        if (entries[0].target.id === "last-card" && entries[0].isIntersecting) {
          if (next) {
            await toPage(next);

            main.scrollTo({ top: 20, behavior: "instant" });
          }
        }

        if (
          entries[0].target.id === "first-card" &&
          entries[0].isIntersecting
        ) {
          if (prev) {
            await toPage(prev);

            main.scrollTo({ top: 6090, behavior: "instant" });
          }
        }
      },
      {
        root: main,
        threshold: 1,
      },
    );

    const firstCard = document.getElementById("first-card");
    const lastCard = document.getElementById("last-card");

    if (firstCard) {
      observer.observe(firstCard);
    }

    if (lastCard) {
      observer.observe(lastCard);
    }

    return () => observer.disconnect();
  });

  useEffect(() => {
    async function load() {
      await start();
    }

    load();
  }, [start]);

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

      <main
        id="main"
        className="mt-sm-main space-y-4 overflow-y-scroll p-6 pt-0"
      >
        {renderPokemonList()}
      </main>
    </>
  );
}
