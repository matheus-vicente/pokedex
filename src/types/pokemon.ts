export type NamedAPIRequest = {
  url: string;
  name: string;
};

export type Stat = {
  name: string;
  base: number;
  effort: number;
};

export const Stats = [
  "HP",
  "Attack",
  "Defense",
  "Sp. Attack",
  "Sp Defence",
  "Speed",
];

export type Meta = {
  drain: number;
  healing: number;
  crit_rate: number;
  min_hits?: number;
  max_hits?: number;
  max_turns?: number;
  min_turns?: number;
  stat_chance: number;
  flinch_chance: number;
  ailment_chance: number;
  ailment: NamedAPIRequest;
  category: NamedAPIRequest;
};

export interface Ability {
  name: string;
  effect: string;
  isHidden: boolean;
}

export interface AbilityRequest {
  id: number;
  name: string;
  generation: NamedAPIRequest;
  effect_entries: Array<{
    effect: string;
    short_effect: string;
    language: NamedAPIRequest;
  }>;
  pokemon: Array<{
    pokemon: NamedAPIRequest;
  }>;
}

export interface Move {
  id: number;
  pp: number;
  type: string;
  name: string;
  level?: number;
  power: number;
  group?: string;
  effect: string;
  category: string;
}

export interface MoveRequest {
  id: number;
  pp: number;
  meta: Meta;
  name: string;
  power: number;
  accuracy: number;
  priority: number;
  effect_chance: number;
  type: NamedAPIRequest;
  target: NamedAPIRequest;
  generation: NamedAPIRequest;
  damage_class: NamedAPIRequest;
  learned_by_pokemon: Array<NamedAPIRequest>;

  effect_entries: Array<{
    effect: string;
    short_effect: string;
    language: NamedAPIRequest;
  }>;
  stat_changes?: Array<{
    change: number;
    stat: NamedAPIRequest;
  }>;
  machines: Array<{
    machine: {
      url: string;
    };
  }>;
}

export interface PokemonListRequest {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<NamedAPIRequest>;
}

export interface PokemonRequest {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
  };
  types: Array<{
    type: NamedAPIRequest;
  }>;
  abilities: Array<{
    is_hidden: boolean;
    ability: NamedAPIRequest;
  }>;
  moves: Array<{
    move: NamedAPIRequest;
    version_group_details: Array<{
      level_learned_at: number;
      version_group: NamedAPIRequest;
      move_learn_method: NamedAPIRequest;
    }>;
  }>;
  stats: Array<{
    effort: number;
    base_stat: number;
    stat: NamedAPIRequest;
  }>;
}

export interface PokemonBase {
  id: number;
  img: string;
  name: string;
  height: number;
  weight: number;
  types: Array<string>;
}

export interface PokemonComplete extends PokemonBase {
  abilities: Array<Ability>;
  moves: Array<Move>;
  stats: Array<Stat>;
  totalStats: number;
  bestStatusValue: number;
}
