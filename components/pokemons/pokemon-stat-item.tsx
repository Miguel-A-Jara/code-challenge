import { View } from 'react-native'

import { Code, H3 } from '@/components/ui/typography'

interface PokemonStatItemProps {
  stat: string
  value: string
}
export default function PokemonStatItem({ stat, value }: PokemonStatItemProps) {
  return (
    <View className='flex-row items-baseline justify-between'>
      <H3>{stat}</H3>
      <Code className='text-lg capitalize w-1/4 text-right'>{value}</Code>
    </View>
  )
}
