import { ActivityIndicator, View } from 'react-native'

export default function LoadingLayout() {
  return (
    <View className='flex-1 items-center justify-center'>
      <ActivityIndicator size='large' />
    </View>
  )
}
