import { api } from "@/libs/api";
import { titleCase } from "@/utils/titleCase";
import { create } from "zustand";

const LAST_POKEMON_ID = 1017;

type PokemonNamedAPIType = {
  url: string;
  name: string;
};

type PokemonRequest = {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: Array<{
    slot: number;
    type: PokemonNamedAPIType;
  }>;
};

export type Pokemon = {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: Array<string>;
};

interface PokemonState {
  pokemon_list: Array<Pokemon>;
}

interface PokemonAction {
  start: () => Promise<void>;
}

export const useStore = create<PokemonState & PokemonAction>((set) => ({
  pokemon_list: [],

  start: async () => {
    const list: Pokemon[] = [];

    for (let i = 1; i <= LAST_POKEMON_ID; i++) {
      const { data } = await api.get<PokemonRequest>(`pokemon/${i}`);

      const types: Array<string> = [titleCase(data.types[0].type.name)];

      if (!!data.types[1]) {
        types.push(titleCase(data.types[1].type.name));
      }

      list.push({
        ...data,
        types,
        name: titleCase(data.name),
      });
    }

    set(() => ({ pokemon_list: list }));
  },
}));
