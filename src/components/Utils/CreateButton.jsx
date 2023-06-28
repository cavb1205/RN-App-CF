import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import tw from 'twrnc'

const CreateButton = ({ tipo }) => {
  const navigation = useNavigation()
  const handleCreate = () => {
    navigation.navigate(tipo)
  }
  return (
        <TouchableOpacity onPress={handleCreate} style={tw`bg-green-600 w-15 h-15 rounded-2xl shadow-2xl border-white justify-center absolute right-2 bottom-[15%] z-20`}>
            <Text style={tw`text-center font-extrabold text-5xl text-gray-200`}>+</Text>
        </TouchableOpacity>
  )
}

export default CreateButton
