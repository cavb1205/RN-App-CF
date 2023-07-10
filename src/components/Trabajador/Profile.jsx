import React, { useContext } from 'react'
import { View, Text } from 'react-native'
import LoadingList from '../Utils/LoadingList'

import tw from 'twrnc'
import { AuthContext } from '../../../context/AuthContext'

const Profile = () => {
  const { user, perfil, loading } = useContext(AuthContext)

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
          {user.first_name} {user.last_name}
        </Text>
        <View style={tw`flex flex-row justify-between mt-2`}>
          <Text style={tw`text-center   text-black/70 font-bold`}>
            username:
          </Text>
          <Text style={tw`text-center   text-black/60`}>
            {user.username}
          </Text>
        </View>
        <View style={tw`flex flex-row justify-between mt-2`}>
          <Text style={tw`text-center   text-black/70 font-bold`}>
            Identificación
          </Text>
          <Text style={tw`text-center   text-black/60`}>
            {perfil.identificacion}
          </Text>
        </View>
        <View style={tw`flex flex-row justify-between mt-2`}>
          <Text style={tw`text-center   text-black/70 font-bold`}>
            Dirección:
          </Text>
          <Text style={tw`text-center   text-black/60`}>
            {perfil.direccion}
          </Text>
        </View>
        <View style={tw`flex flex-row justify-between mt-2`}>
          <Text style={tw`text-center   text-black/70 font-bold`}>
            Teléfono:
          </Text>
          <Text style={tw`text-center   text-black/60`}>
            {perfil.telefono}
          </Text>
        </View>
        <View style={tw`flex flex-row justify-between mt-2`}>
          <Text style={tw`text-center   text-black/70 font-bold`}>
            Estado:
          </Text>
          {user.is_active
            ? (
            <View style={tw`bg-green-700 p-2 rounded-full`}>
              <Text style={tw`text-center text-white font-bold`}>
                Activo
              </Text>
            </View>
              )
            : (
            <View style={tw`bg-red-600 p-2 rounded-full`}>
              <Text style={tw`text-center text-white font-bold`}>
                Inactivo
              </Text>
            </View>
              )}
        </View>
        <View style={tw`flex flex-row justify-evenly my-3`}>
          <Text style={tw`text-black/50 font-semibold`}>
            Creado: {user.date_joined.slice(0, 10)}
          </Text>
        </View>
        {/* <View>
          <TouchableOpacity onPress={() => alert('hola')} style={tw`bg-sky-500 p-3 rounded-full`}>
            <Text style={tw`text-center text-gray-200 font-bold text-lg`}>Cambiar Contraseña</Text>
          </TouchableOpacity>
        </View> */}
      </>
        )}
  </View>
  )
}

export default Profile
