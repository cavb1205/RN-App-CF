import React, { useContext, useEffect } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import tw from 'twrnc'
import { ClientesContext } from '../../../context/ClientesContext'

import { useRoute } from '@react-navigation/native'

const ClientUpdate = () => {
  const { getCliente, cliente, handleChangeUpdate, clienteUpdateItem } = useContext(ClientesContext)
  const route = useRoute()

  useEffect(() => {
    getCliente(route.params.clienteId)
  }, [])

  const handleSubmit = () => {
    clienteUpdateItem(cliente)
  }
  console.log(cliente)
  return (
    <View style={tw`bg-gray-50 shadow-xl rounded-xl mx-4 my-auto p-6`}>
        <Text style={tw`text-center text-2xl font-extrabold text-gray-500 mb-3`}>Actualizar Cliente</Text>
        <View style={tw`p-2 rounded-lg shadow-lg bg-gray-50`}>
            <View style={tw`m-2`}>
                <TextInput onChangeText={(text) => handleChangeUpdate('identificacion', text)} value={cliente.identificacion} placeholder='Identificación' style={tw`border border-gray-300 rounded-md p-1`} />
            </View>
            <View style={tw`m-2`}>
                <TextInput onChangeText={(text) => handleChangeUpdate('nombres', text)} value={cliente.nombres} placeholder='Nombres' style={tw`border border-gray-300 rounded-md p-1`} />
            </View>
            <View style={tw`m-2`}>
                <TextInput onChangeText={(text) => handleChangeUpdate('apellidos', text)} value={cliente.apellidos} placeholder='Apellidos' style={tw`border border-gray-300 rounded-md p-1`} />
            </View>
            <View style={tw`m-2`}>
                <TextInput onChangeText={(text) => handleChangeUpdate('nombre_local', text)} value={cliente.nombre_local} placeholder='Nombre del local' style={tw`border border-gray-300 rounded-md p-1`} />
            </View>
            <View style={tw`m-2`}>
                <TextInput onChangeText={(text) => handleChangeUpdate('telefono_principal', text)} value={cliente.telefono_principal} placeholder='Teléfono' style={tw`border border-gray-300 rounded-md p-1`} />
            </View>
            <View style={tw`m-2`}>
                <TextInput onChangeText={(text) => handleChangeUpdate('direccion', text)} value={cliente.direccion} placeholder='Dirección' style={tw`border border-gray-300 rounded-md p-1`} />
            </View>
        </View>
        <TouchableOpacity onPress={handleSubmit} style={tw`bg-yellow-500 rounded-md p-2 mt-3 shadow-md`}>
            <Text style={tw`text-center text-white font-bold text-lg`}>Actualizar</Text>
        </TouchableOpacity>
    </View>
  )
}

export default ClientUpdate
