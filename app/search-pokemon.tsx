import { useState } from 'react'

import { HttpStatusCode, isAxiosError } from 'axios'
import { useRouter } from 'expo-router'
import { View } from 'react-native'

import Container from '@/components/layout/container'
import ErrorLayout from '@/components/layout/error-layout'
import LoadingLayout from '@/components/layout/loading-layout'
import PokemonListItem from '@/components/pokemons/pokemon-list-item'
import { SearchInput } from '@/components/ui/search-input'
import { Separator } from '@/components/ui/separator'
import { H1, H3 } from '@/components/ui/typography'
import useSearchPokemon from '@/hooks/pokemons/useSearchPokemon'

export default function SearchPokemon() {
  const router = useRouter()

  const [searchValue, setSearchValue] = useState('')
  const pokemonQuery = useSearchPokemon(searchValue)

  const isNotFound =
    pokemonQuery.isError &&
    isAxiosError(pokemonQuery.error) &&
    pokemonQuery.error.status === HttpStatusCode.NotFound

  return (
    <Container>
      <View className='gap-4 flex-1'>
        <SearchInput
          onSearch={setSearchValue}
          editable={!pokemonQuery.isLoading}
        />

        {pokemonQuery.isLoading && <LoadingLayout />}

        {isNotFound && (
          <View className='flex-1 items-center justify-center gap-2'>
            <H1 className='text-center'>404</H1>
            <Separator />
            <H3 className='text-center'>
              No se encontró ningún pokemon con ese nombre.
            </H3>
          </View>
        )}

        {pokemonQuery.isError && !isNotFound && (
          <ErrorLayout
            errorMessage={pokemonQuery.error.message}
            onRetry={() => {
              pokemonQuery.refetch()
            }}
          />
        )}
        {pokemonQuery.isSuccess && (
          <PokemonListItem
            title={pokemonQuery.data.name}
            pokemonId={pokemonQuery.data.id}
            onPress={() => {
              router.navigate({
                pathname: '/[pokemonId]',
                params: { pokemonId: pokemonQuery.data.id },
              })
            }}
          />
        )}
      </View>
    </Container>
  )
}
