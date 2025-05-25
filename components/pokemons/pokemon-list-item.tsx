import { Image } from 'expo-image'
import { Pressable, View } from 'react-native'

import loadingPokemon from '@/assets/images/loading-pokemon.gif'
import { Separator } from '@/components/ui/separator'
import { H3 } from '@/components/ui/typography'

interface PokemonListItemProps {
  title: string
  pokemonId: string

  onPress: () => void
}

export default function PokemonListItem({
  title,
  pokemonId,
  onPress,
}: PokemonListItemProps) {
  const frontImageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`
  const backImageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${pokemonId}.png`

  return (
    <Pressable
      onPress={onPress}
      className='active:bg-foreground/5 p-4 rounded-2xl gap-4'
    >
      <View className='flex-row items-center gap-4'>
        <Image
          contentFit='contain'
          placeholder={loadingPokemon}
          placeholderContentFit='cover'
          source={{ uri: frontImageUrl }}
          className='w-28 aspect-square rounded-xl bg-foreground/5'
        />

        <Image
          contentFit='contain'
          placeholder={loadingPokemon}
          placeholderContentFit='cover'
          source={{ uri: backImageUrl }}
          className='w-28 aspect-square rounded-xl bg-foreground/5'
        />
      </View>

      <H3 className='capitalize'>{title}</H3>
      <Separator />
    </Pressable>
  )
}
