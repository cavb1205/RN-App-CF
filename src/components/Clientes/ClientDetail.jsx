import React, { useContext, useEffect } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { useRoute, useNavigation } from '@react-navigation/native'
import tw from 'twrnc'

import { ClientesContext } from '../../../context/ClientesContext'
import LoadingList from '../Utils/LoadingList'

const ClientDetail = () => {
  const route = useRoute()
  const { getCliente, cliente, loading } = useContext(ClientesContext)
  const navigation = useNavigation()
  useEffect(() => {
    getCliente(route.params.clienteId)
  }, [])

  return (
    <View style={tw`bg-gray-50 shadow-xl rounded-xl mx-4 my-auto p-8`}>
      {loading
        ? (
        <LoadingList />
          )
        : (
        <>
          <Text
            style={tw`text-center text-4xl font-extrabold text-black/60 mb-3`}
          >
            {cliente.nombres} {cliente.apellidos}
          </Text>
          <View style={tw`flex flex-row justify-between mt-2`}>
            <Text style={tw`text-center   text-black/70 font-bold`}>
              Identificación:
            </Text>
            <Text style={tw`text-center   text-black/60`}>
              {cliente.identificacion}
            </Text>
          </View>
          <View style={tw`flex flex-row justify-between mt-2`}>
            <Text style={tw`text-center   text-black/70 font-bold`}>
              Nombre Local:{' '}
            </Text>
            <Text style={tw`text-center   text-black/60`}>
              {cliente.nombre_local}
            </Text>
          </View>
          <View style={tw`flex flex-row justify-between mt-2`}>
            <Text style={tw`text-center   text-black/70 font-bold`}>
              Dirección:
            </Text>
            <Text style={tw`text-center   text-black/60`}>
              {cliente.direccion}
            </Text>
          </View>
          <View style={tw`flex flex-row justify-between mt-2`}>
            <Text style={tw`text-center   text-black/70 font-bold`}>
              Teléfono:
            </Text>
            <Text style={tw`text-center   text-black/60`}>
              {cliente.telefono_principal}
            </Text>
          </View>
          <View style={tw`flex flex-row justify-between mt-2`}>
            <Text style={tw`text-center   text-black/70 font-bold`}>
              Estado:
            </Text>
            {cliente.estado_cliente === 'Bloqueado'
              ? (
              <View style={tw`bg-red-600 p-2 rounded-full`}>
                <Text style={tw`text-center text-white font-bold`}>
                  {cliente.estado_cliente}
                </Text>
              </View>
                )
              : (
              <View style={tw`bg-green-700 p-2 rounded-full`}>
                <Text style={tw`text-center text-white font-bold`}>
                  {cliente.estado_cliente}
                </Text>
              </View>
                )}
          </View>
          <View style={tw`flex flex-row justify-evenly my-3`}>
            <Text style={tw`text-black/50 font-semibold`}>
              Creado: {cliente.fecha_creacion}
            </Text>
          </View>
          <View>
            <TouchableOpacity onPress={() => navigation.navigate('Editar', { clienteId: cliente.id })} style={tw`bg-yellow-500 p-3 rounded-full`}>
              <Text style={tw`text-center text-gray-200 font-bold text-lg`}>Actualizar</Text>
            </TouchableOpacity>
          </View>
        </>
          )}
    </View>
  )
}

export default ClientDetail
