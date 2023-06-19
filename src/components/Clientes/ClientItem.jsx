import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import tw from 'twrnc'

const ClientItem = ({ item }) => {
  const navigation = useNavigation()
  const handleClientDetail = (clientId) => {
    navigation.navigate('Detalle', { clienteId: clientId })
  }

  return (
    <View
      style={tw`bg-gray-50 p-2 mx-4 my-2 rounded-xl shadow-lg flex-row justify-between flex-wrap`}
    >
      <View style={tw`justify-center `}>
        <Text style={tw`text-center text-black/60 text-xl font-bold `}>
          {item.nombres} {item.apellidos}
        </Text>
      </View>
      <View>
        <TouchableOpacity
          onPress={() => handleClientDetail(item.id)}
          style={tw`bg-sky-500 p-3 rounded-xl shadow-md m-2`}
        >
          <Text style={tw`text-center text-gray-50 font-bold`}>Ver</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default ClientItem
