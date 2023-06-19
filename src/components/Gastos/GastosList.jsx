import React, { useContext, useEffect } from 'react'
import { View } from 'react-native'
import tw from 'twrnc'
import { GastosContext } from '../../../context/GastosContext'
import { useFilter } from '../Hooks/useFilter'
import LoadingList from '../Utils/LoadingList'
import CreateButton from '../Utils/CreateButton'
import { FlatList } from 'react-native-gesture-handler'
import AlertMessage from '../Utils/AlertMessage'
import Paginator from '../Utils/Paginator'
import GastosItem from './GastosItem'

const GastosList = () => {
  const { getGastos, gastos, loading } = useContext(GastosContext)
  const { nextPage, prevPage, filterList } = useFilter()
  useEffect(() => {
    getGastos()
  }, [])
  const filteredList = filterList(gastos, 'gastos')
  console.log(gastos)
  return (
    <View style={tw`flex-1 py-2`}>
      <CreateButton tipo={'Nuevo Gasto'} />

      <View style={tw`flex-1`}>
        {loading
          ? (
          <LoadingList />
            )
          : filteredList.length > 0
            ? (
          <FlatList
            data={filteredList}
            renderItem={({ item }) => <GastosItem item={item} />}
            keyExtractor={(cliente) => cliente.id}
          />
              )
            : (
          <AlertMessage message={'No se encontraron gastos.'} />
              )}
      </View>
      <View style={tw`m-2`} >
        <Paginator nextPage={nextPage} prevPage={prevPage} />
      </View>
    </View>
  )
}

export default GastosList
