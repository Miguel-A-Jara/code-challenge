import React, { useCallback, useEffect, useRef, useState } from 'react'

import { useRouter } from 'expo-router'
import {
  Animated,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native'

import Container from '@/components/layout/container'
import ErrorLayout from '@/components/layout/error-layout'
import LoadingLayout from '@/components/layout/loading-layout'
import PokemonListItem from '@/components/pokemons/pokemon-list-item'
import { Button } from '@/components/ui/button'
import useListPokemons from '@/hooks/pokemons/useListPokemons'
import Icon from '@expo/vector-icons/MaterialIcons'

const MIN_OFFSET_TO_DISPLAY_BUTTON = 500

export default function HomeDrawer() {
  const flatListRef = useRef<FlatList>(null)

  const router = useRouter()
  const listPokemonQuery = useListPokemons()
  const [hasScrolledDown, setHasScrolledDown] = useState(false)

  const opacityAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.timing(opacityAnim, {
      toValue: hasScrolledDown ? 1 : 0,
      duration: 250,
      useNativeDriver: true,
    }).start()
  }, [hasScrolledDown, opacityAnim])

  const handleOnScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const offsetY = event.nativeEvent.contentOffset.y
      if (offsetY < MIN_OFFSET_TO_DISPLAY_BUTTON && hasScrolledDown) {
        setHasScrolledDown(false)
      }

      if (offsetY > MIN_OFFSET_TO_DISPLAY_BUTTON && !hasScrolledDown) {
        setHasScrolledDown(true)
      }
    },
    [hasScrolledDown],
  )

  const handleNextPageFetch = useCallback(() => {
    if (!listPokemonQuery.hasNextPage) return
    if (listPokemonQuery.isFetchingNextPage) return
    listPokemonQuery.fetchNextPage()
  }, [listPokemonQuery])

  if (listPokemonQuery.isLoading) {
    return <LoadingLayout />
  }

  if (listPokemonQuery.isError) {
    return (
      <ErrorLayout
        errorMessage={listPokemonQuery.error.message}
        onRetry={() => {
          void listPokemonQuery.refetch()
        }}
      />
    )
  }

  if (listPokemonQuery.isSuccess) {
    return (
      <Container>
        <FlatList
          scrollEnabled
          ref={flatListRef}
          onScroll={handleOnScroll}
          onEndReachedThreshold={0.75}
          keyExtractor={(item) => item.id}
          onEndReached={handleNextPageFetch}
          showsVerticalScrollIndicator={false}
          data={listPokemonQuery.data.pokemons}
          renderItem={({ item }) => (
            <PokemonListItem
              title={item.name}
              pokemonId={item.id}
              onPress={() => {
                router.navigate({
                  pathname: '/[pokemonName]',
                  params: { pokemonName: item.name },
                })
              }}
            />
          )}
        />

        <Animated.View
          style={{ opacity: opacityAnim }}
          className='absolute right-0 bottom-0'
        >
          <Button
            size='icon'
            variant='outline'
            className='w-20 h-20 rounded-3xl'
            disabled={!hasScrolledDown}
            onPress={() => {
              flatListRef.current?.scrollToOffset({
                offset: 0,
                animated: true,
              })
            }}
          >
            <Icon name='arrow-upward' size={24} className='color-primary' />
          </Button>
        </Animated.View>
      </Container>
    )
  }
}
