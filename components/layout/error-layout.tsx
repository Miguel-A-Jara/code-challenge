import { View } from 'react-native'

import Container from '@/components/layout/container'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { H3, P } from '@/components/ui/typography'

interface ErrorLayoutProps {
  errorMessage: string
  onRetry: () => void
}

export default function ErrorLayout({
  errorMessage,
  onRetry,
}: ErrorLayoutProps) {
  return (
    <Container>
      <View className='flex-1 items-center justify-center gap-4'>
        <H3 className='text-red-500'>{errorMessage}</H3>

        <Separator />

        <Button onPress={onRetry} variant='secondary' size='lg'>
          <P>Reintentar</P>
        </Button>
      </View>
    </Container>
  )
}
