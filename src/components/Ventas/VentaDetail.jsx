import { useRoute, useNavigation } from '@react-navigation/native'
import React, { useContext, useEffect } from 'react'
import { Text, TouchableOpacity, View, Linking } from 'react-native'
import { VentasContext } from '../../../context/VentasContext'
import LoadingList from '../Utils/LoadingList'
import tw from 'twrnc'

const VentaDetail = () => {
  const route = useRoute()
  const navigation = useNavigation()
  const { getVenta, loading, ventaDetail } = useContext(VentasContext)

  useEffect(() => {
    getVenta(route.params.ventaId)
  }, [])

  const handleCallPress = () => {
    Linking.openURL(`tel:${ventaDetail.cliente?.telefono_principal}`)
  }

  const handlePagosPress = () => {
    navigation.navigate('Pagos', { ventaId: ventaDetail.id })
  }

  const styleEstado = () => {
    switch (ventaDetail.estado_venta) {
      case 'Vigente':
        return 'text-green-600'
      case 'Atrasado':
        return 'text-yellow-500'
      case 'Vencido':
        return 'text-red-600'
      default:
        return 'text-green-600'
    }
  }

  return (
    <View style={tw`bg-gray-50 shadow-xl rounded-xl mx-4 my-auto p-8`}>
      {loading
        ? (
        <LoadingList />
          )
        : (
        <>
          <View style={tw`self-center mb-2`}>
            <Text style={tw`text-gray-700/70 font-extrabold text-2xl`}>
              {ventaDetail.cliente?.nombres} {ventaDetail.cliente?.apellidos}
            </Text>
          </View>
          <View style={tw`self-center mb-4`}>
            <TouchableOpacity
              onPress={handleCallPress}
              style={tw`bg-green-700/90 rounded-xl p-2 shadow-md`}
            >
              <Text style={tw`text-gray-50 font-bold`}>LLamar Cliente</Text>
            </TouchableOpacity>
          </View>
          <View style={tw`flex-row justify-between mb-3`}>
            <Text style={tw`font-extrabold text-gray-700`}>Saldo Actual</Text>
            <Text style={tw`font-extrabold text-red-600`}>
              {ventaDetail.saldo_actual}
            </Text>
          </View>
          <View style={tw`flex-row justify-between mb-3`}>
            <Text style={tw`font-bold text-gray-700/80`}>Fecha Venta</Text>
            <Text style={tw`font-bold text-gray-700/80`}>
              {ventaDetail.fecha_venta}
            </Text>
          </View>
          <View style={tw`flex-row justify-between mb-3`}>
            <Text style={tw`font-bold text-gray-700/80`}>Valor Venta</Text>
            <Text style={tw`font-bold text-sky-700/80`}>
              {ventaDetail.valor_venta}
            </Text>
          </View>
          <View style={tw`flex-row justify-between mb-3`}>
            <Text style={tw`font-bold text-gray-700/80`}>Interés</Text>
            <Text style={tw`font-bold text-gray-700/80`}>
              {ventaDetail.interes}%
            </Text>
          </View>
          <View style={tw`flex-row justify-between mb-3`}>
            <Text style={tw`font-bold text-gray-700/80`}># Cuotas</Text>
            <Text style={tw`font-bold text-gray-700/80`}>
              {ventaDetail.cuotas}
            </Text>
          </View>
          <View style={tw`flex-row justify-between mb-3`}>
            <Text style={tw`font-bold text-gray-700/80`}>Valor Cuota</Text>
            <Text style={tw`font-bold text-sky-700/80`}>
              {ventaDetail.valor_cuota}
            </Text>
          </View>
          <View style={tw`flex-row justify-between mb-3`}>
            <Text style={tw`font-bold text-gray-700/80`}>Total a Pagar</Text>
            <Text style={tw`font-bold text-gray-700/80`}>
              {ventaDetail.total_a_pagar}
            </Text>
          </View>
          <View style={tw`flex-row justify-between mb-3`}>
            <Text style={tw`font-bold text-gray-700/80`}>Pagos Realizados</Text>
            <Text style={tw`font-extrabold text-green-700/80`}>
              {ventaDetail.pagos_realizados}
            </Text>
          </View>
          <View style={tw`flex-row justify-between mb-3`}>
            <Text style={tw`font-bold text-gray-700/80`}>Pagos Pendientes</Text>
            <Text style={tw`font-bold text-gray-700/80`}>
              {ventaDetail.pagos_pendientes}
            </Text>
          </View>
          <View style={tw`flex-row justify-between mb-3`}>
            <Text style={tw`font-bold text-gray-700/80`}>
              Fecha Vencimiento
            </Text>
            <Text style={tw`font-bold text-red-700/80`}>
              {ventaDetail.fecha_vencimiento}
            </Text>
          </View>
          <View style={tw`flex-row justify-between mb-3`}>
            <Text style={tw`font-bold text-gray-700/80`}>
              Estado de la Venta
            </Text>
            <Text style={tw`font-bold ${styleEstado()}`}>
              {ventaDetail.estado_venta}
            </Text>
          </View>
          {ventaDetail.dias_atrasados < 0
            ? (
            <View style={tw`flex-row justify-between mb-3`}>
              <Text style={tw`font-bold text-gray-700/80`}>
                Pagos Adelantados
              </Text>
              <Text style={tw`font-bold text-green-700/80`}>
                {Math.abs(ventaDetail.dias_atrasados)}
              </Text>
            </View>
              )
            : (
            <View style={tw`flex-row justify-between mb-3`}>
              <Text style={tw`font-bold text-gray-700/80`}>
                Pagos Atrasados
              </Text>
              <Text style={tw`font-bold text-red-700/80`}>
                {ventaDetail.dias_atrasados}
              </Text>
            </View>
              )}
          <View style={tw`flex-row justify-between mb-3`}>
            <Text style={tw`font-bold text-gray-700/80`}>Promedio de Pago</Text>
            <Text style={tw`font-bold text-blue-700/80`}>
              {ventaDetail.promedio_pago}
            </Text>
          </View>
          <View style={tw`flex-row justify-between mb-3`}>
            <Text style={tw`font-extrabold text-gray-700`}>Total Abonado</Text>
            <Text style={tw`font-extrabold text-green-700`}>
              {ventaDetail.saldo_actual}
            </Text>
          </View>
          <TouchableOpacity
            style={tw`bg-sky-500 rounded-lg py-2 shadow-lg`}
            onPress={handlePagosPress}
          >
            <Text style={tw`text-center text-gray-50 font-bold`}>
              Ver Pagos
            </Text>
          </TouchableOpacity>
        </>
          )}
    </View>
  )
}

export default VentaDetail
