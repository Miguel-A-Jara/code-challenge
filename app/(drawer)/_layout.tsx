import { useRouter } from 'expo-router'
import { Drawer } from 'expo-router/drawer'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import { Button } from '@/components/ui/button'
import Icon from '@expo/vector-icons/MaterialIcons'

export default function HomeDrawerLayout() {
  const router = useRouter()

  return (
    <GestureHandlerRootView>
      <Drawer>
        <Drawer.Screen
          name='(tabs)'
          options={{
            title: 'PokeApp',
            drawerIcon: (props) => <Icon name='home' {...props} />,
            headerRight: () => (
              <Button
                size='icon'
                variant='ghost'
                onPress={() => {
                  router.navigate({ pathname: '/search-pokemon' })
                }}
              >
                <Icon name='search' size={24} className='text-primary' />
              </Button>
            ),
          }}
        />
        <Drawer.Screen
          name='settings'
          options={{
            title: 'Configuración',
            drawerIcon: (props) => <Icon name='settings' {...props} />,
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  )
}
