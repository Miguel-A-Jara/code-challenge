import { useFonts } from 'expo-font'
import { Image } from 'expo-image'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { cssInterop } from 'nativewind'
import 'react-native-reanimated'

import { NAVIGATION_THEME } from '@/constants/navigation-theme'
import { useColorScheme } from '@/hooks/useColorScheme'
import '@/styles.css'
import Icon from '@expo/vector-icons/MaterialIcons'
import { ThemeProvider } from '@react-navigation/native'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// NOTE: Sets up expo icons for nativewind (https://github.com/expo/vector-icons/issues/277)
cssInterop(Icon, {
  className: {
    target: 'style',
  },
})

// NOTE: Sets up expo image for nativewind
cssInterop(Image, {
  className: {
    target: 'style',
  },
})

const queryClient = new QueryClient()

export default function RootLayout() {
  const { colorScheme } = useColorScheme()
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  })

  if (!loaded) {
    // NOTE: Async font loading only occurs in development.
    return null
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        value={
          colorScheme === 'dark'
            ? NAVIGATION_THEME.dark
            : NAVIGATION_THEME.light
        }
      >
        <StatusBar style='auto' />
        <Stack>
          <Stack.Screen name='index' />
          <Stack.Screen name='(drawer)' options={{ headerShown: false }} />
          <Stack.Screen name='[pokemonId]' options={{ headerShown: true }} />
          <Stack.Screen
            name='search-pokemon'
            options={{
              headerShown: true,
              headerBackButtonDisplayMode: 'minimal',
            }}
          />
        </Stack>
      </ThemeProvider>
    </QueryClientProvider>
  )
}
