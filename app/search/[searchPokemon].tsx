import { useEffect } from 'react'

import { HttpStatusCode, isAxiosError } from 'axios'
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router'
import { View } from 'react-native'

import Container from '@/components/layout/container'
import ErrorLayout from '@/components/layout/error-layout'
import LoadingLayout from '@/components/layout/loading-layout'
import PokemonListItem from '@/components/pokemons/pokemon-list-item'
import { Separator } from '@/components/ui/separator'
import { H1, H3 } from '@/components/ui/typography'
import useSearchPokemon from '@/hooks/pokemons/useSearchPokemon'

type SearchPokemonProps = {
  searchPokemon: string
}

export default function SearchPokemon() {
  const router = useRouter()
  const navigation = useNavigation()

  const { searchPokemon } = useLocalSearchParams<SearchPokemonProps>()
  const pokemonQuery = useSearchPokemon(searchPokemon)

  useEffect(() => {
    navigation.setOptions({
      title: searchPokemon,
    })
  }, [navigation, searchPokemon])

  const isNotFound =
    pokemonQuery.isError &&
    isAxiosError(pokemonQuery.error) &&
    pokemonQuery.error.status === HttpStatusCode.NotFound

  return (
    <Container>
      <View className='gap-4 flex-1'>
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
                pathname: '/[pokemonName]',
                params: { pokemonName: pokemonQuery.data.name },
              })
            }}
          />
        )}
      </View>
    </Container>
  )
}
