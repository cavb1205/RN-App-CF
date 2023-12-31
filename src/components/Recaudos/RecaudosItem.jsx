import React from 'react'
import { Text, View } from 'react-native'
import tw from 'twrnc'

const RecaudosItem = ({ item, index }) => {
  return (
    <View style={tw`bg-gray-50 p-2 mx-4 my-2 rounded-xl shadow-lg `}>
      <View style={tw`flex-row justify-evenly flex-wrap`}>
        <Text style={tw`text-gray-600 font-semibold`}>{index + 1}</Text>
        <Text style={tw`font-bold text-gray-600`}>{item.fecha_recaudo}</Text>
        <Text style={tw`font-bold text-green-700`}>{item.valor_recaudo}</Text>
        {item.visita_blanco?.tipo_falla
          ? (
          <Text style={tw`font-bold text-red-700`}>
            {item.visita_blanco?.tipo_falla}
          </Text>
            )
          : null}
      </View>
    </View>
  )
}

export default RecaudosItem
