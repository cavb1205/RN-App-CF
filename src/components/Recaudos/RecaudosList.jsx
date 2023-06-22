import React, { useContext, useEffect } from 'react'
import { useRoute } from '@react-navigation/native'
import { View, FlatList, Text } from 'react-native'
import LoadingList from '../Utils/LoadingList'
import AlertMessage from '../Utils/AlertMessage'
import tw from 'twrnc'
import { RecaudosContext } from '../../../context/RecaudosContext'
import RecaudosItem from './RecaudosItem'

const RecaudosList = () => {
  const route = useRoute()
  const { loading, getRecaudos, recaudos } = useContext(RecaudosContext)

  useEffect(() => {
    getRecaudos(route.params.ventaId)
  }, [])
  const totalAbonado = recaudos.length > 0 ? recaudos.reduce((sum, recaudo) => sum + parseInt(recaudo.valor_recaudo), 0) : 0
  return (
    <View style={tw`flex-1 py-2`}>
      <View style={tw` justify-center flex-row gap-4 flex-wrap`}>
        <Text style={tw`text-center text-2xl font-bold text-gray-700`}>Total Abonado:</Text>
        <Text style={tw`font-bold text-2xl text-green-700`}>{totalAbonado}</Text>
      </View>
      <View>
        <Text style={tw`text-center`}>#{recaudos.length}</Text>
      </View>
      <View style={tw`flex-1`}>
        {loading
          ? (
          <LoadingList />
            )
          : recaudos.length > 0
            ? (
          <FlatList
            data={recaudos}
            renderItem={({ item, index }) => <RecaudosItem index={index} item={item} />}
            keyExtractor={(recaudo) => recaudo.id}
          />
              )
            : (
          <AlertMessage message={'No se encontraron pagos.'} />
              )}
      </View>
    </View>
  )
}

export default RecaudosList
