import { create } from "zustand";

import { api, apiBasic } from "@/libs/api";
import {
  Move,
  Stat,
  Ability,
  PokemonBase,
  MoveRequest,
  PokemonRequest,
  AbilityRequest,
  PokemonComplete,
  PokemonListRequest,
} from "@/types/pokemon";

interface PokemonState {
  pokemonList: Array<PokemonBase> | undefined;
  selectedPokemon: PokemonComplete;
  next: string | null;
  prev: string | null;
}

interface PokemonAction {
  reset: () => void;
  start: () => Promise<void>;
  find: (name: string) => Promise<void>;
  toPage: (url: string) => Promise<void>;
}

export const useStore = create<PokemonState & PokemonAction>((set) => ({
  pokemonList: undefined,
  selectedPokemon: {} as PokemonComplete,
  next: null,
  prev: null,

  reset: () => {
    set(() => ({ selectedPokemon: {} as PokemonComplete }));
  },

  start: async () => {
    try {
      const { data } = await api.get<PokemonListRequest>(
        "pokemon?limit=20&offset=0",
      );

      const pokemonList: Array<PokemonBase> = [];

      for (let i = 0; i < data.results.length; i++) {
        const { data: pokemonData } = await apiBasic.get<PokemonRequest>(
          data.results[i].url,
        );

        const img = pokemonData.sprites.front_default;
        const types = pokemonData.types.map(({ type }) => type.name);

        const p: PokemonBase = {
          img,
          types,
          id: pokemonData.id,
          name: pokemonData.name,
          weight: pokemonData.weight,
          height: pokemonData.height,
        };

        pokemonList.push(p);
      }

      set(() => ({ pokemonList, next: data.next, prev: data.previous }));
    } catch (error) {
      console.log(error);
    }
  },

  toPage: async (url: string) => {
    try {
      const { data } = await api.get<PokemonListRequest>(url);

      const pokemonList: Array<PokemonBase> = [];

      for (let i = 0; i < data.results.length; i++) {
        const { data: pokemonData } = await apiBasic.get<PokemonRequest>(
          data.results[i].url,
        );

        const img = pokemonData.sprites.front_default;
        const types = pokemonData.types.map(({ type }) => type.name);

        const p: PokemonBase = {
          img,
          types,
          id: pokemonData.id,
          name: pokemonData.name,
          weight: pokemonData.weight,
          height: pokemonData.height,
        };

        pokemonList.push(p);
      }

      set(() => ({ pokemonList, next: data.next, prev: data.previous }));
    } catch (error) {
      console.log(error);
    }
  },

  find: async (name: string) => {
    try {
      const { data } = await api.get<PokemonRequest>(`/pokemon/${name}`);

      const types: Array<string> = [data.types[0].type.name];

      if (!!data.types[1]) {
        types.push(data.types[1].type.name);
      }

      const moves: Array<Move> = [];

      data.moves.forEach(async ({ move, version_group_details }) => {
        const { data: moveData } = await apiBasic.get<MoveRequest>(move.url);

        let effect = "";

        moveData.effect_entries.forEach((item) => {
          if (item.language.name === "en") {
            effect = item.effect;
          }
        });

        const m: Move = {
          ...moveData,
          effect,
          type: moveData.type.name,
          category: moveData.damage_class.name,
        };

        moves.push(m);
      });

      const stats: Array<Stat> = [];
      let bestStatusValue: number = 0;
      let totalStats: number = 0;

      data.stats.forEach(({ stat, base_stat, effort }) => {
        if (base_stat > bestStatusValue) {
          bestStatusValue = base_stat;
        }

        totalStats += base_stat;

        const s: Stat = {
          effort,
          name: stat.name,
          base: base_stat,
        };

        stats.push(s);
      });

      const abilities: Array<Ability> = [];

      data.abilities.forEach(async (item) => {
        const { data: abilityData } = await apiBasic.get<AbilityRequest>(
          item.ability.url,
        );

        let effect = "";

        abilityData.effect_entries.forEach((item) => {
          if (item.language.name === "en") {
            effect = item.effect;
          }
        });

        const a: Ability = {
          ...abilityData,
          effect,
          isHidden: item.is_hidden,
        };

        abilities.push(a);
      });

      const pokemon: PokemonComplete = {
        ...data,
        img: data.sprites.front_default,
        types,
        moves,
        stats,
        abilities,
        totalStats,
        bestStatusValue,
      };

      set(() => ({ selectedPokemon: pokemon }));
    } catch (error: any) {
      console.log(error.message);
    }
  },
}));
