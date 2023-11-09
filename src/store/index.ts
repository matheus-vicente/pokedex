import { create } from "zustand";

import { api, apiBasic } from "@/libs/api";
import {
  Move,
  Stat,
  Ability,
  PokemonBase,
  PokemonRequest,
  PokemonComplete,
  MoveRequest,
  AbilityRequest,
  PokemonListRequest,
} from "@/types/pokemon";

const LAST_POKEMON_ID = 1017;

interface PokemonState {
  pokemonList: Array<PokemonBase>;
  selectedPokemon: PokemonComplete;
}

interface PokemonAction {
  start: () => Promise<void>;
  find: (name: string) => Promise<void>;
}

export const useStore = create<PokemonState & PokemonAction>((set) => ({
  pokemonList: [],
  selectedPokemon: {} as PokemonComplete,

  start: async () => {
    const list: PokemonBase[] = [];

    for (let i = 1; i <= 151; i++) {
      try {
        const { data } = await api.get<PokemonRequest>(`pokemon/${i}`);

        const types: Array<string> = [data.types[0].type.name];

        if (!!data.types[1]) {
          types.push(data.types[1].type.name);
        }

        list.push({
          ...data,
          types,
          name: data.name,
        });
      } catch (error: any) {
        console.log(error.message);
      }
    }

    set(() => ({ pokemonList: list }));
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

      data.stats.forEach((item) => {
        const s: Stat = {
          ...item,
          base: item.base_stat,
          name: item.stat.name,
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
        types,
        moves,
        stats,
        abilities,
      };

      set(() => ({ selectedPokemon: pokemon }));
    } catch (error: any) {
      console.log(error.message);
    }
  },
}));
