import React, { useContext, useEffect } from 'react'
import { View, FlatList, Text } from 'react-native'
import LoadingList from '../Utils/LoadingList'
import AlertMessage from '../Utils/AlertMessage'
import tw from 'twrnc'
import { RecaudosContext } from '../../../context/RecaudosContext'

import { VentasContext } from '../../../context/VentasContext'
import DateSelect from '../Utils/DateSelect'
import InformeRecaudosItem from './InformeRecaudosItem'

const InformeRecaudosFecha = () => {
  const { loading, getRecaudosFecha, recaudosFecha, totalRecaudosFecha } =
    useContext(RecaudosContext)
  const { date } = useContext(VentasContext)
  useEffect(() => {
    getRecaudosFecha(date)
  }, [])
  useEffect(() => {
    getRecaudosFecha(date)
  }, [date])

  return (
    <View style={tw`flex-1 py-2`}>
      <View style={tw` justify-center flex-row gap-4 flex-wrap`}>
        <Text style={tw`text-center text-2xl font-bold text-gray-700`}>
          Total Recaudado:
        </Text>
        <Text style={tw`font-bold text-2xl text-green-700`}>{totalRecaudosFecha()}</Text>
      </View>
      <View>
        {recaudosFecha.message
          ? (
          <Text style={tw`text-center`}># 0</Text>
            )
          : (
          <Text style={tw`text-center`}>#{recaudosFecha.length}</Text>
            )}
      </View>
      <DateSelect />
      <View style={tw`flex-1`}>
        {loading
          ? (
          <LoadingList />
            )
          : recaudosFecha.message
            ? (
          <AlertMessage message={'No se encontraron recaudos.'} />
              )
            : (
          <FlatList
            data={recaudosFecha}
            renderItem={({ item, index }) => (
              <InformeRecaudosItem index={index} item={item} />
            )}
            keyExtractor={(recaudo) => recaudo.id}
          />
              )}
      </View>
    </View>
  )
}

export default InformeRecaudosFecha
