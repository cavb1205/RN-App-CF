import React from 'react'
import { Text, View } from 'react-native'
import tw from 'twrnc'

const GastosItem = ({ item }) => {
  return (
    <View
      style={tw`bg-gray-50 p-2 mx-4 my-2 rounded-xl shadow-lg justify-center`}
    >
      <View style={tw`justify-center mb-1 `}>
        <Text style={tw`text-center text-black/60 text-2xl font-bold `}>
          {item.tipo_gasto?.tipo_gasto}
        </Text>
      </View>
      <View style={tw`flex flex-row justify-evenly mb-1`}>
        <Text style={tw`font-bold text-gray-500 text-sm`}>Fecha: {item.fecha}</Text>
        <Text style={tw`font-bold text-gray-500 text-sm`}>Valor: {item.valor}</Text>
      </View>
      <View style={tw`flex flex-row justify-center mb-1`}>
        <Text style={tw`font-bold text-gray-500 text-xs`}>Comentario: {item.comentario}</Text>
      </View>
    </View>
  )
}

export default GastosItem
