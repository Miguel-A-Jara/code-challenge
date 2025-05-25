import { axiosInstance } from '@/lib/axios-instance'

export function listPokemon() {
  interface ListPokemonResponse {
    count: number
    next: string | null
    previous: string | null
    results: { name: string; url: string }[]
  }

  return axiosInstance<ListPokemonResponse>({
    method: 'GET',
    url: '/pokemon',
  })
}
