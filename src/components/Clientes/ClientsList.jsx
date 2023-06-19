/* eslint-disable multiline-ternary */
import React, { useContext, useEffect } from 'react'
import { FlatList, View } from 'react-native'
import tw from 'twrnc'
import ClientItem from './ClientItem'

import { ClientesContext } from '../../../context/ClientesContext'
import LoadingList from '../Utils/LoadingList'
import CreateButton from '../Utils/CreateButton'
import AlertMessage from '../Utils/AlertMessage'
import Search from '../Utils/Search'
import { useFilter } from '../Hooks/useFilter'
import Paginator from '../Utils/Paginator'

const ClientsList = () => {
  const { getClientes, clientes, loading } = useContext(ClientesContext)
  const { nextPage, prevPage, filterList } = useFilter()
  useEffect(() => {
    getClientes()
  }, [])

  const filteredList = filterList(clientes, 'clientes')
  return (
    <View style={tw`flex-1 py-2`}>
      <View>
        <Search />
      </View>
      <CreateButton tipo={'Nuevo Cliente'} />

      <View style={tw`flex-1`}>
        {loading ? (
          <LoadingList />
        ) : filteredList.length > 0 ? (
          <FlatList
            data={filteredList}
            renderItem={({ item }) => <ClientItem item={item} />}
            keyExtractor={(cliente) => cliente.id}
          />
        ) : (
          <AlertMessage message={'No se encontraron clientes.'} />
        )}
      </View>
      <View style={tw`m-2`} >
        <Paginator nextPage={nextPage} prevPage={prevPage} />
      </View>
    </View>
  )
}

export default ClientsList
