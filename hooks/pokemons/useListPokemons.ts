import { api } from '@/services'
import { useInfiniteQuery } from '@tanstack/react-query'

export default function useListPokemons() {
  const listPokemonQuery = useInfiniteQuery({
    initialPageParam: 0,
    queryKey: ['pokemons', 'list'],
    queryFn: (ctx) => {
      return api.pokemons.listPokemons(
        { limit: 20, page: ctx.pageParam },
        ctx.signal,
      )
    },
    getNextPageParam: (lastPage, _pages, lastPageParam) => {
      const { next } = lastPage.data

      if (!next) return null
      return lastPageParam + 1
    },
    select: (data) => {
      const pokemons = data.pages.map((page) => page.data.results).flat(1)
      const pokemonsWithId = pokemons.map((pokemon) => {
        // NOTE: I think this is a bad design choice from the PokeAPI. I would expect them to return the pokemon's id inside the returned data.
        const pokemonId = pokemon.url.split('/').at(-2)
        if (!pokemonId) throw new Error('Invalid pokemon id')

        return { ...pokemon, id: pokemonId }
      })

      return { pageParams: data.pageParams, pokemons: pokemonsWithId }
    },
  })

  return listPokemonQuery
}
