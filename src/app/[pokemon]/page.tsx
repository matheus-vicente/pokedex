"use client";

import { useEffect } from "react";
import { Loader } from "lucide-react";
import * as Tabs from "@radix-ui/react-tabs";

import { Header } from "./Header";
import { useStore } from "@/store";
import { titleCase } from "@/utils/titleCase";
import { Stats } from "@/types/pokemon";

export default function Pokemon({ params }: { params: { pokemon: string } }) {
  const { selectedPokemon, find, reset } = useStore();

  useEffect(() => {
    async function load() {
      await find(params.pokemon);
    }

    load();

    return () => {
      reset();
    };
  }, [find, params.pokemon, reset]);

  if (!selectedPokemon.name) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <Header img={selectedPokemon.img} name={selectedPokemon.name} />

      <main className="absolute top-[280px] z-10 h-main-sm w-full space-y-6 rounded-t-2xl bg-gray-100 p-6 shadow-sm">
        <div className="flex items-center justify-center gap-5">
          {selectedPokemon.types.map((type) => (
            <div
              key={type}
              className="flex w-20 items-center justify-center rounded-md bg-gray-700 py-2"
            >
              <span className="h-6 text-gray-50">{titleCase(type)}</span>
            </div>
          ))}
        </div>

        <Tabs.Root className="space-y-6" defaultValue="Info">
          <Tabs.List className="grid grid-cols-3 justify-between gap-2">
            <Tabs.Trigger
              value="Info"
              className="p-2 text-lg font-semibold data-[state=active]:bg-gray-200"
            >
              Info
            </Tabs.Trigger>

            <Tabs.Trigger
              value="Stats"
              className="p-2 text-lg font-semibold data-[state=active]:bg-gray-200"
            >
              Stats
            </Tabs.Trigger>

            <Tabs.Trigger
              value="Moves"
              className="p-2 text-lg font-semibold data-[state=active]:bg-gray-200"
            >
              Moves
            </Tabs.Trigger>
          </Tabs.List>

          <div>
            <Tabs.Content value="Info">
              <div className="space-y-4 rounded-md bg-gray-800 p-4">
                <strong className="text-xl text-gray-50">
                  # {String(selectedPokemon.id).padStart(4, "0")}
                </strong>

                <div className="space-x-4">
                  <strong className="text-gray-50">Height</strong>

                  <span className="text-gray-50">
                    {selectedPokemon.height / 10} m
                  </span>
                </div>

                <div className="space-x-4">
                  <strong className="text-gray-50">Weight</strong>

                  <span className="text-gray-50">
                    {selectedPokemon.weight / 10} Kg
                  </span>
                </div>

                <div className="mb-4">
                  <strong className="text-gray-50">Abilities</strong>

                  {selectedPokemon.abilities.map((item) => (
                    <div key={item.name} className="mt-2 bg-gray-700 p-2">
                      <strong className="text-gray-50">
                        {titleCase(item.name)}
                      </strong>

                      <p className="text-gray-50">{item.effect}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Tabs.Content>

            <Tabs.Content value="Stats">
              <div className="flex gap-4 rounded-md bg-gray-800 p-4">
                <div className="flex flex-col gap-3">
                  {Stats.map((item) => (
                    <strong key={item} className="h-6 text-gray-50">
                      {item}
                    </strong>
                  ))}

                  <strong className="h-6 text-gray-50">Total</strong>
                </div>

                <div className="flex flex-1 flex-col gap-3">
                  {selectedPokemon.stats.map((item) => (
                    <div key={item.name} className="flex items-center gap-2">
                      <span className="w-10 font-semibold text-gray-50">
                        {item.base}
                      </span>

                      <div className="w-full bg-gray-700">
                        <div
                          className="h-6 w-full items-center bg-green-200 pl-2"
                          style={{
                            width: `calc(100%*${item.base}/255)`,
                          }}
                        />
                      </div>
                    </div>
                  ))}

                  <div className="h-6 w-full">
                    <span className="font-semibold text-gray-50">
                      {selectedPokemon.totalStats}
                    </span>
                  </div>
                </div>
              </div>
            </Tabs.Content>

            <Tabs.Content value="Moves">Moves Content</Tabs.Content>
          </div>
        </Tabs.Root>
      </main>
    </div>
  );
}
