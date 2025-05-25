import { axiosInstance } from '@/lib/axios-instance'

export interface ListPokemonsParams {
  limit: number
  page: number
}

export function listPokemons(
  { limit, page }: ListPokemonsParams,
  signal?: AbortSignal,
) {
  interface ListPokemonsResponse {
    count: number
    next: string | null
    previous: string | null
    results: { name: string; url: string }[]
  }

  return axiosInstance<ListPokemonsResponse>({
    method: 'GET',
    url: '/pokemon',
    params: { limit, offset: page * limit },
  })
}

export interface SearchPokemonParams {
  name: string
}

export function searchPokemon(
  { name }: SearchPokemonParams,
  signal?: AbortSignal,
) {
  interface SearchPokemonResponse {
    abilities: Ability[]
    base_experience: number
    cries: Cries
    forms: Species[]
    height: number
    id: number
    is_default: boolean
    location_area_encounters: string
    moves: Move[]
    name: string
    order: number
    species: Species
    sprites: Sprites
    stats: Stat[]
    types: Type[]
    weight: number
  }

  interface Ability {
    ability: Species | null
    is_hidden: boolean
    slot: number
  }

  interface Species {
    name: string
    url: string
  }

  interface Cries {
    latest: string
    legacy: string
  }

  interface Move {
    move: Species
    version_group_details: VersionGroupDetail[]
  }

  interface VersionGroupDetail {
    level_learned_at: number
    move_learn_method: Species
    order: null
    version_group: Species
  }

  interface Other {
    dream_world: DreamWorld
    home: Home
    'official-artwork': OfficialArtwork
    showdown: Sprites
  }

  interface Sprites {
    back_default: string
    back_female: null
    back_shiny: string
    back_shiny_female: null
    front_default: string
    front_female: null
    front_shiny: string
    front_shiny_female: null
    other?: Other
    animated?: Sprites
  }

  interface OfficialArtwork {
    front_default: string
    front_shiny: string
  }

  interface Home {
    front_default: string
    front_female: null
    front_shiny: string
    front_shiny_female: null
  }

  interface DreamWorld {
    front_default: string
    front_female: null
  }

  interface Stat {
    base_stat: number
    effort: number
    stat: Species
  }

  interface Type {
    slot: number
    type: Species
  }

  return axiosInstance<SearchPokemonResponse>({
    method: 'GET',
    url: `/pokemon/${name}`,
    signal,
  })
}
