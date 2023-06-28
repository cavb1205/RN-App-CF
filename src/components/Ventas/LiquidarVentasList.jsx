import React, { useContext, useEffect } from 'react'
import { FlatList, View } from 'react-native'

import tw from 'twrnc'
import Search from '../Utils/Search'
import Paginator from '../Utils/Paginator'
import AlertMessage from '../Utils/AlertMessage'
import LoadingList from '../Utils/LoadingList'
import { RecaudosContext } from '../../../context/RecaudosContext'
import { useFilter } from '../Hooks/useFilter'
import { VentasContext } from '../../../context/VentasContext'

import DateSelect from '../Utils/DateSelect'
import LiquidarVentasItem from './LiquidarVentasItem'
import LiquidarVentasHeader from '../Recaudos/LiquidarVentasHeader'

const LiquidarVentasList = () => {
  const { loading, getRecaudosFecha } = useContext(RecaudosContext)
  const {
    ventas,
    getVentasLiquidar,
    date,
    totalRecaudar,
    getVentasActivas,
    ventasActivas
  } = useContext(VentasContext)
  const { filterList, nextPage, prevPage } = useFilter()
  const filteredList = filterList(ventas, 'liquidar')
  useEffect(() => {
    getVentasLiquidar(date)
    getRecaudosFecha(date)
    getVentasActivas()
  }, [date])

  return (
    <View style={tw`flex-1 py-2`}>
      <View>
        <LiquidarVentasHeader
          ventas={ventas}
          ventasActivas={ventasActivas}
          totalRecaudar={totalRecaudar}
        />
      </View>
      <View>
        <Search />
      </View>
      <View>
        <DateSelect />
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
            renderItem={({ item }) => <LiquidarVentasItem item={item} />}
            keyExtractor={(cliente) => cliente.id}
          />
              )
            : (
          <AlertMessage message={'No se encontraron ventas para liquidar.'} />
              )}
      </View>
      <View style={tw`m-2`}>
        <Paginator nextPage={nextPage} prevPage={prevPage} />
      </View>
    </View>
  )
}

export default LiquidarVentasList
