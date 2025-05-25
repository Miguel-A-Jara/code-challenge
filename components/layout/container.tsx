import { PropsWithChildren } from 'react'

import { SafeAreaView, View } from 'react-native'

export default function Container({ children }: PropsWithChildren) {
  return (
    <SafeAreaView className='flex-grow'>
      <View className='flex-grow px-6 py-4'>{children}</View>
    </SafeAreaView>
  )
}
