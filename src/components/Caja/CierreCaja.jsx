import React, { useContext, useEffect } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import tw from 'twrnc'
import DateSelect from '../Utils/DateSelect'
import { VentasContext } from '../../../context/VentasContext'
import { AuthContext } from '../../../context/AuthContext'
import useTotalResume from '../Hooks/useTotalResume'

import { GastosContext } from '../../../context/GastosContext'
import { RecaudosContext } from '../../../context/RecaudosContext'
import { useNavigation } from '@react-navigation/native'

const CierreCaja = () => {
  const navigation = useNavigation()
  const { getCierreCaja, cajaAnterior, postCierreCaja } = useContext(AuthContext)
  const { getRecaudosFecha, recaudosFecha } = useContext(RecaudosContext)
  const { getVentasFecha, allVentas, date } = useContext(VentasContext)
  const {
    getGastosFecha,
    gastosFecha,
    getAportesFecha,
    aportes,
    getUtilidadesFecha,
    utilidades
  } = useContext(GastosContext)
  const { itemsDia } = useTotalResume()

  useEffect(() => {
    getCierreCaja(date)
    getRecaudosFecha(date)
    getAportesFecha(date)
    getVentasFecha(date)
    getGastosFecha(date)
    getUtilidadesFecha(date)
  }, [date])

  const totalCaja = () => {
    return (
      parseInt(cajaAnterior.valor) +
      itemsDia(aportes, 'aportes', date) +
      itemsDia(recaudosFecha, 'recaudos', date) -
      itemsDia(allVentas, 'ventasNetas', date) -
      itemsDia(gastosFecha, 'gastos', date) -
      itemsDia(utilidades, 'utilidades', date)
    )
  }

  const handleCierreCaja = () => {
    postCierreCaja(date)
  }

  return (
    <View style={tw`bg-gray-50 shadow-xl rounded-xl mx-4 my-10 p-6`}>
      <DateSelect />
      {!cajaAnterior.valor
        ? (
        <Text style={tw`text-red-600 font-extrabold text-lg text-center my-2`}>
          No se ha cerrado la caja del día anterior!!
        </Text>
          )
        : null}
      <View style={tw`my-3`}>
        <View style={tw`flex flex-row justify-between mb-2`}>
          <Text style={tw`font-extrabold text-2xl`}>Concepto</Text>
          <Text style={tw`font-extrabold text-2xl`}>Valor</Text>
        </View>
        <View style={tw`flex flex-row justify-between mb-2`}>
          <Text style={tw`text-gray-700 font-semibold text-lg`}>
            Fecha Cierre
          </Text>
          <Text style={tw`text-gray-500 font-semibold text-lg`}>{date}</Text>
        </View>
        <View style={tw`flex flex-row justify-between mb-2`}>
          <Text style={tw`text-gray-700 font-semibold text-lg`}>
            Inicio de Caja
          </Text>
          {cajaAnterior.valor
            ? (
            <Text style={tw`text-gray-500 font-semibold text-lg`}>
              {cajaAnterior.valor}
            </Text>
              )
            : (
            <Text style={tw`text-gray-500 font-semibold text-lg`}>0</Text>
              )}
        </View>
        <View style={tw`flex flex-row justify-between mb-2`}>
          <Text style={tw`text-gray-700 font-semibold text-lg`}>
            Ingresos Aportes
          </Text>
          <Text style={tw`text-green-700 font-semibold text-lg`}>
            {itemsDia(aportes, 'aportes', date)}
          </Text>
        </View>
        <View style={tw`flex flex-row justify-between mb-2`}>
          <Text style={tw`text-gray-700 font-semibold text-lg`}>
            Ingresos Recaudos
          </Text>
          <Text style={tw`text-green-700 font-semibold text-lg`}>
            {itemsDia(recaudosFecha, 'recaudos', date)}
          </Text>
        </View>
        <View style={tw`flex flex-row justify-between mb-2`}>
          <Text style={tw`text-gray-700 font-semibold text-lg`}>
            Salida x Ventas
          </Text>
          <Text style={tw`text-red-700 font-semibold text-lg`}>
            {itemsDia(allVentas, 'ventasNetas', date)}
          </Text>
        </View>
        <View style={tw`flex flex-row justify-between mb-2`}>
          <Text style={tw`text-gray-700 font-semibold text-lg`}>
            Salida x Gastos
          </Text>
          <Text style={tw`text-red-700 font-semibold text-lg`}>
            {' '}
            {itemsDia(gastosFecha, 'gastos', date)}
          </Text>
        </View>
        <View style={tw`flex flex-row justify-between mb-2`}>
          <Text style={tw`text-gray-700 font-semibold text-lg`}>
            Salida x Utilidades
          </Text>
          <Text style={tw`text-red-700 font-semibold text-lg`}>
            {itemsDia(utilidades, 'utilidades', date)}
          </Text>
        </View>
        <View
          style={
            totalCaja() < 0
              ? tw`flex flex-row justify-between mb-2 p-2 bg-red-200 rounded-md`
              : tw`flex flex-row justify-between mb-2 p-2 bg-green-200 rounded-md`
          }
        >
          <Text style={tw`text-gray-700 font-extrabold text-lg`}>
            Total Caja
          </Text>
          {totalCaja() || totalCaja() === 0
            ? (
            <Text style={tw`text-gray-600 font-extrabold text-lg`}>
              {totalCaja()}
            </Text>
              )
            : (
            <Text style={tw`text-red-600 font-bold`}>Sin Registro</Text>
              )}
        </View>
      </View>
      <View style={tw`flex flex-row justify-evenly`}>
        <TouchableOpacity style={tw`bg-gray-500 p-2 rounded-lg`} onPress={() => navigation.goBack()}>
          <Text style={tw`font-bold text-lg text-center text-gray-50`}>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={tw`bg-red-600 p-2 rounded-lg`} onPress={handleCierreCaja}>
          <Text style={tw`font-bold text-lg text-center text-gray-50`}>Cerrar Caja</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default CierreCaja
