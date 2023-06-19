import React, { useContext } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import tw from 'twrnc'
import { AuthContext } from '../../../context/AuthContext'

const Search = () => {
  const { query, setQuery } = useContext(AuthContext)
  return (
    <View style={tw`mx-4 my-2`}>
      <TextInput
        value={query}
        onChangeText={(text) => setQuery(text)}
        placeholder="Buscar"
        style={tw`text-center py-2 px-4 border rounded-xl border-sky-700/20`}
      />
      <TouchableOpacity
        onPress={() => setQuery('')}
        style={tw`py-1 w-20 mx-auto bg-slate-400 mt-1 rounded-xl shadow-md`}
      >
        <Text style={tw`text-center text-gray-100 text-sm font-semibold`}>
          Limpiar
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default Search
