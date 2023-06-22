import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import tw from 'twrnc'

const VentaItem = ({ item }) => {
  const navigation = useNavigation()
  const handleDetail = (itemId) => {
    navigation.navigate('Detalle', { ventaId: itemId })
  }
  const styleEstado = () => {
    switch (item.estado_venta) {
      case 'Vigente':
        return 'bg-green-600'
      case 'Atrasado':
        return 'bg-yellow-500'
      case 'Vencido':
        return 'bg-red-600'
      default:
        return 'bg-green-600'
    }
  }

  return (
    <View style={tw`bg-gray-50 p-2 mx-4 my-2 rounded-xl shadow-lg `}>
      <View style={tw`justify-center flex-row gap-3 items-center flex-wrap `}>
        <Text style={tw`text-center text-black/60 text-xl font-bold `}>
          {item.cliente?.nombres} {item.cliente?.apellidos}
        </Text>
        <View style={tw`${styleEstado()} rounded-full py-1 px-2`}>
          <Text style={tw`text-gray-50 text-xs font-semibold`}>
            {item.estado_venta}
          </Text>
        </View>
      </View>
      <View style={tw`self-center border border-red-400 p-1 rounded-lg my-1`}>
        <Text style={tw`text-red-500 font-bold`}>
          Saldo {item.saldo_actual}
        </Text>
      </View>
      <View style={tw`flex flex-row flex-wrap justify-center gap-4 my-2`}>
        <Text style={tw`text-gray-600 font-bold`}>
          Pendientes: {item.pagos_pendientes}
        </Text>
        {item.dias_atrasados < 0
          ? (
          <Text style={tw`text-green-700 font-bold`}>
            Adelantados: {Math.abs(item.dias_atrasados)}
          </Text>
            )
          : (
          <Text style={tw`text-red-500 font-bold`}>
            Atrasados: {item.dias_atrasados}
          </Text>
            )}
        <Text style={tw`text-green-700 font-bold`}>
          Abonados: {item.pagos_realizados}
        </Text>
      </View>
      <View style={tw`self-center`}>
        <Text style={tw`font-bold text-sky-600 text-base`}>
          Cuota {item.valor_cuota}
        </Text>
      </View>
      <View style={tw`w-50 mx-auto my-2`}>
        <TouchableOpacity
          onPress={() => handleDetail(item.id)}
          style={tw`bg-sky-500 p-3 rounded-xl shadow-md`}
        >
          <Text style={tw`text-center text-gray-50 font-bold`}>
            Ver Detalle
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default VentaItem
