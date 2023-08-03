import React, { useContext } from 'react'
import { View, Text, TouchableOpacity, Pressable } from 'react-native'
import tw from 'twrnc'
import { RecaudosContext } from '../../../context/RecaudosContext'
import { useNavigation } from '@react-navigation/native'

const LiquidarVentasItem = ({ item }) => {
  const navigation = useNavigation()
  const { selectedNoPago, SelectedRecaudo } = useContext(RecaudosContext)
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
  const handleDetail = (itemId) => {
    navigation.navigate('Detalle Venta', { ventaId: itemId })
  }

  return (
    <View style={tw`bg-gray-50 p-2 mx-4 my-1 rounded-xl shadow-lg `}>
      <Pressable onPress={() => handleDetail(item.id)}>
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
      </Pressable>
      <View style={tw`self-center`}>
        <Text style={tw`font-bold text-sky-600 text-base`}>
          Cuota {item.valor_cuota}
        </Text>
      </View>
      <View style={tw`flex flex-row justify-evenly m-2`}>
        <TouchableOpacity
          onPress={() => selectedNoPago(item)}
          style={tw`bg-red-500 p-2 rounded-xl shadow-md w-30`}
        >
          <Text style={tw`text-center text-gray-50 font-extrabold text-lg`}>No Pagó</Text>
        </TouchableOpacity>
        <TouchableOpacity style={tw`bg-green-700 p-2 rounded-xl shadow-md w-30`}
        onPress={() => SelectedRecaudo(item)}
        >
          <Text style={tw`text-center text-gray-50 font-extrabold text-lg`}>Abonar</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default LiquidarVentasItem
