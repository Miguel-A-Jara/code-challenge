import { HttpStatusCode, isAxiosError } from 'axios'

import { api } from '@/services'
import { useQuery } from '@tanstack/react-query'

export default function useSearchPokemon(searchValue: string) {
  const searchPokemonQuery = useQuery({
    enabled: !!searchValue,
    queryKey: ['pokemons', 'search', searchValue],
    queryFn: ({ signal }) => {
      return api.pokemons.searchPokemon({ name: searchValue }, signal)
    },
    select: (data) => data.data,
    retry(_failureCount, error) {
      if (isAxiosError(error)) {
        if (error.status === HttpStatusCode.NotFound) return false
      }

      return false
    },
  })

  return searchPokemonQuery
}
