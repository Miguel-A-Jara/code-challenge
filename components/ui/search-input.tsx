import { useState } from 'react'

import { TextInputProps, View } from 'react-native'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Icon from '@expo/vector-icons/MaterialIcons'

interface SearchInputProps extends TextInputProps {
  onSearch: (searchText: string) => void
}

function SearchInput({ onSearch, ...props }: SearchInputProps) {
  const [searchText, setSearchText] = useState('')

  return (
    <View className='gap-2 flex-row items-center'>
      <Input
        className='flex-1 items-center'
        placeholder='Busca un pokemon por su nombre'
        onChangeText={setSearchText}
        onEndEditing={() => {
          onSearch(searchText.trim())
        }}
        {...props}
      />

      <Button
        size='icon'
        variant='ghost'
        disabled={!props.editable}
        onPress={() => {
          onSearch(searchText.trim())
        }}
      >
        <Icon name='search' size={24} className='color-primary' />
      </Button>
    </View>
  )
}

export { SearchInput }
