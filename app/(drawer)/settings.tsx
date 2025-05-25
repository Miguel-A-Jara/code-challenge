import { Pressable } from 'react-native'

import Container from '@/components/layout/container'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import { useColorScheme } from '@/hooks/useColorScheme'

const THEME_ID = 'dark-mode'

export default function Settings() {
  const { isDarkColorScheme, toggleColorScheme } = useColorScheme()

  return (
    <Container>
      <Pressable
        className='flex-row items-center justify-between active:bg-foreground/5 p-4 rounded-t-xl'
        onPress={toggleColorScheme}
      >
        <Label nativeID={THEME_ID} onPress={toggleColorScheme}>
          Tema Actual: {isDarkColorScheme ? 'Oscuro' : 'Claro'}
        </Label>
        <Switch
          checked={isDarkColorScheme}
          onCheckedChange={toggleColorScheme}
          nativeID={THEME_ID}
        />
      </Pressable>
      <Separator />
    </Container>
  )
}
