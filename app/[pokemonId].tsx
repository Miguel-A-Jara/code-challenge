import { useLocalSearchParams } from 'expo-router'
import { Text } from 'react-native'

type PokemonIdParams = {
  pokemonId: string
}

export default function PokemonId() {
  const { pokemonId } = useLocalSearchParams<PokemonIdParams>()

  return <Text className='text-5xl text-white'>{pokemonId}</Text>
}
