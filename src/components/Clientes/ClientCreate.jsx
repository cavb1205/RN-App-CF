import React, { useContext, useState } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import tw from 'twrnc'
import { ClientesContext } from '../../../context/ClientesContext'

const ClientCreate = () => {
  const { clienteCreateItem } = useContext(ClientesContext)
  const [cliente, setCliente] = useState({
    identificacion: '',
    nombres: '',
    apellidos: '',
    nombre_local: '',
    telefono_principal: '',
    direccion: '',
    telefono_opcional: ''
  })
  const handleChange = (name, value) => {
    setCliente({
      ...cliente,
      [name]: value
    })
  }
  const handleSubmit = () => {
    if (cliente.identificacion === '') {
      alert('Debes ingresar una identificación')
      return
    }
    if (cliente.nombres === '') {
      alert('Debes ingresar un nombre')
      return
    }
    if (cliente.apellidos === '') {
      alert('Debes ingresar un apellido')
      return
    }
    if (cliente.nombre_local === '') {
      alert('Debes ingresar un nombre de local')
      return
    }
    if (cliente.telefono_principal === '') {
      alert('Debes ingresar un teléfono')
      return
    }
    if (cliente.direccion === '') {
      alert('Debes ingresar una dirección')
      return
    }

    clienteCreateItem(cliente)
  }

  return (
    <View style={tw`bg-gray-50 shadow-xl rounded-xl mx-4 my-auto p-6`}>
        <Text style={tw`text-center text-2xl font-extrabold text-gray-500 mb-3`}>Crear Cliente</Text>
        <View style={tw`p-2 rounded-lg shadow-lg bg-gray-50`}>
            <View style={tw`m-2`}>
                <TextInput onChangeText={(text) => handleChange('identificacion', text)} value={cliente.identificacion} placeholder='Identificación' style={tw`border border-gray-300 rounded-md p-1`} />
            </View>
            <View style={tw`m-2`}>
                <TextInput onChangeText={(text) => handleChange('nombres', text)} value={cliente.nombres} placeholder='Nombres' style={tw`border border-gray-300 rounded-md p-1`} />
            </View>
            <View style={tw`m-2`}>
                <TextInput onChangeText={(text) => handleChange('apellidos', text)} value={cliente.apellidos} placeholder='Apellidos' style={tw`border border-gray-300 rounded-md p-1`} />
            </View>
            <View style={tw`m-2`}>
                <TextInput onChangeText={(text) => handleChange('nombre_local', text)} value={cliente.nombre_local} placeholder='Nombre del local' style={tw`border border-gray-300 rounded-md p-1`} />
            </View>
            <View style={tw`m-2`}>
                <TextInput onChangeText={(text) => handleChange('telefono_principal', text)} value={cliente.telefono_principal} placeholder='Teléfono' style={tw`border border-gray-300 rounded-md p-1`} />
            </View>
            <View style={tw`m-2`}>
                <TextInput onChangeText={(text) => handleChange('direccion', text)} value={cliente.direccion} placeholder='Dirección' style={tw`border border-gray-300 rounded-md p-1`} />
            </View>
        </View>
        <TouchableOpacity onPress={handleSubmit} style={tw`bg-green-600 rounded-md p-2 mt-3 shadow-md`}>
            <Text style={tw`text-center text-white font-bold text-lg`}>Crear</Text>
        </TouchableOpacity>
    </View>
  )
}

export default ClientCreate
