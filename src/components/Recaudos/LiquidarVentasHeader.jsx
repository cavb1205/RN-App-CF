import React, { useContext } from 'react'
import { Text, View } from 'react-native'
import tw from 'twrnc'
import { RecaudosContext } from '../../../context/RecaudosContext'

const LiquidarVentasHeader = ({ ventas, ventasActivas, totalRecaudar }) => {
  const { totalRecaudosFecha } = useContext(RecaudosContext)
  const totalRecaudarVentas = () => {
    if (ventasActivas.message) {
      return 0
    } else {
      return ventasActivas
        .map((venta) => parseFloat(venta.valor_cuota))
        .reduce((a, b) => a + b, 0)
    }
  }
  return (
    <View style={tw`flex flex-row flex-wrap justify-evenly gap-y-1.5`}>
        <View style={tw`flex flex-row gap-1 bg-gray-500 py-1 px-2 rounded-xl`}>
          <Text style={tw`font-bold text-gray-50 text-xs`}>
            Ventas x Cobrar:
          </Text>
          {ventas.message
            ? (
            <Text style={tw`font-bold text-gray-50 text-xs`}>0</Text>
              )
            : (
          <Text style={tw`font-bold text-gray-50 text-xs`}>{ventas.length}</Text>
              )}
        </View>
        <View style={tw`flex flex-row gap-1 bg-sky-600 py-1 px-2 rounded-xl`}>
          <Text style={tw`font-bold text-gray-50 text-xs`}>
            Total a Recaudar:
          </Text>
          <Text style={tw`font-bold text-gray-50 text-xs`}>{totalRecaudarVentas()}</Text>
        </View>
        <View style={tw`flex flex-row gap-1 bg-yellow-400 py-1 px-2 rounded-xl`}>
          <Text style={tw`font-bold text-gray-700 text-xs`}>
            Pendiente x Recaudar:
          </Text>
          <Text style={tw`font-bold text-gray-700 text-xs`}>{totalRecaudar()}</Text>
        </View>
        <View style={tw`flex flex-row gap-1 bg-green-700 py-1 px-2 rounded-xl`}>
          <Text style={tw`font-bold text-gray-50 text-xs`}>
            Total Recaudado:
          </Text>
          <Text style={tw`font-bold text-gray-50 text-xs`}>{totalRecaudosFecha()}</Text>
        </View>
      </View>
  )
}

export default LiquidarVentasHeader
