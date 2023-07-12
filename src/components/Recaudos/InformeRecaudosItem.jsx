import React from 'react'
import { Text, View } from 'react-native'
import tw from 'twrnc'

const InformeRecaudosItem = ({ item, index }) => {
  return (
    <View style={tw`bg-gray-50 p-2 mx-4 my-2 rounded-xl shadow-lg `}>
      <View style={tw`self-center mb-1`}>
        <Text style={tw`font-bold text-gray-600`}>
          {item.venta?.cliente?.nombres} {item.venta?.cliente?.apellidos}
        </Text>
      </View>
      <View style={tw`flex-row justify-evenly flex-wrap`}>
        <Text style={tw`text-gray-600 font-semibold`}>{index + 1}</Text>
        <Text style={tw`font-bold text-gray-600`}>{item.fecha_recaudo}</Text>
        <Text style={tw`font-bold text-green-700`}>{item.valor_recaudo}</Text>
      </View>
      <View style={tw`self-center`}>
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

export default InformeRecaudosItem
