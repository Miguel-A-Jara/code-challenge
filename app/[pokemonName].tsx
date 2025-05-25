import { useEffect, useMemo } from 'react'

import { Image } from 'expo-image'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { ScrollView, View } from 'react-native'

import Container from '@/components/layout/container'
import PokemonStatItem from '@/components/pokemons/pokemon-stat-item'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Separator } from '@/components/ui/separator'
import { H1, H3, P } from '@/components/ui/typography'
import useSearchPokemon from '@/hooks/pokemons/useSearchPokemon'

type PokemonParams = {
  pokemonName: string
}

export default function Pokemon() {
  const navigation = useNavigation()
  const { pokemonName } = useLocalSearchParams<PokemonParams>()
  const pokemonQuery = useSearchPokemon(pokemonName)

  useEffect(() => {
    navigation.setOptions({
      title: pokemonName.toUpperCase(),
    })
  }, [navigation, pokemonName])

  const images = useMemo(() => {
    const isSuccess = pokemonQuery.isSuccess
    if (!isSuccess) return []

    const data = pokemonQuery.data
    return [
      data.sprites.front_default,
      data.sprites.back_default,
      data.sprites.front_shiny,
      data.sprites.back_shiny,
    ]
  }, [pokemonQuery.data, pokemonQuery.isSuccess])

  const pokemonInfo = useMemo(() => {
    const isSuccess = pokemonQuery.isSuccess
    if (!isSuccess) return []

    const data = pokemonQuery.data
    return [
      {
        stat: 'Altura:',
        value: `${data.height}dm`,
      },
      {
        stat: 'Peso:',
        value: `${data.weight}hg`,
      },
      {
        stat: 'Tipo:',
        value: data.types[0].type.name,
      },
      {
        stat: 'Experiencia',
        value: `${data.base_experience}xp`,
      },
      {
        stat: 'Habilidad',
        value: `${data.abilities[0].ability?.name ?? 'Ninguna'}`,
      },
    ]
  }, [pokemonQuery.data, pokemonQuery.isSuccess])

  if (pokemonQuery.isSuccess) {
    return (
      <ScrollView bounces={false}>
        <Container>
          <View className='gap-8 flex-1'>
            <ScrollView
              horizontal
              className='flex-grow-0'
              contentContainerClassName='gap-4'
            >
              {images.map((image) => (
                <Image
                  key={image}
                  source={{ uri: image }}
                  className='rounded-xl bg-foreground/5 h-52 w-52'
                />
              ))}
            </ScrollView>
            <View className='gap-4'>
              <H1 className='capitalize text-center'>
                {pokemonQuery.data.name}
              </H1>
              <Separator />
            </View>

            <View className='gap-2'>
              {pokemonInfo.map((info, index) => (
                <PokemonStatItem
                  key={index}
                  stat={info.stat}
                  value={info.value}
                />
              ))}
            </View>

            <Separator />
            <Accordion type='single'>
              <AccordionItem value='movements'>
                <AccordionTrigger>
                  <H3>Movimientos:</H3>
                </AccordionTrigger>
                <AccordionContent className='flex-row flex-wrap'>
                  {pokemonQuery.data.moves.map((move) => (
                    <P className='w-1/3' key={move.move.name}>
                      {move.move.name}
                    </P>
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </View>
        </Container>
      </ScrollView>
    )
  }
}
