import React, { useContext, useEffect } from 'react'
import { View, FlatList } from 'react-native'
import CreateButton from '../Utils/CreateButton'
import { VentasContext } from '../../../context/VentasContext'
import LoadingList from '../Utils/LoadingList'
import { useFilter } from '../Hooks/useFilter'
import AlertMessage from '../Utils/AlertMessage'
import Paginator from '../Utils/Paginator'
import Search from '../Utils/Search'
import VentaItem from './VentaItem'
import tw from 'twrnc'

const VentasList = () => {
  const { loading, ventasActivas, getVentasActivas } = useContext(VentasContext)
  const { nextPage, prevPage, filterList } = useFilter()

  useEffect(() => {
    getVentasActivas()
  }, [])

  const filteredList = filterList(ventasActivas, 'ventas')
  return (
    <View style={tw`flex-1 py-2`}>
      <CreateButton tipo={'Nuevo Gasto'} />
      <View>
        <Search />
      </View>
      <View style={tw`flex-1`}>
        {loading
          ? (
          <LoadingList />
            )
          : filteredList.length > 0
            ? (
          <FlatList
            data={filteredList}
            renderItem={({ item }) => <VentaItem item={item} />}
            keyExtractor={(cliente) => cliente.id}
          />
              )
            : (
          <AlertMessage message={'No se encontraron ventas.'} />
              )}
      </View>
      <View style={tw`m-2`} >
        <Paginator nextPage={nextPage} prevPage={prevPage} />
      </View>
    </View>
  )
}

export default VentasList
