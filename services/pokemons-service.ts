import { axiosInstance } from '@/lib/axios-instance'

export interface ListPokemonsParams {
  limit: number
  page: number
}

export function listPokemons({ limit, page }: ListPokemonsParams) {
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
