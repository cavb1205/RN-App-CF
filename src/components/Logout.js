import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { useNavigation } from '@react-navigation/native'
import { View, Text, TouchableOpacity } from 'react-native'
import tw from 'twrnc'

export const Logout = () => {
  const { logoutUser } = useContext(AuthContext)
  useEffect(() => {
    logoutUser()
  }, [])

  const navigation = useNavigation()
  const handleLogin = () => {
    console.log('login')
    navigation.navigate('Login')
  }

  return (
    <View style={tw`bg-gray-50 shadow-xl rounded-xl mx-4 my-10 p-8`}>
      <Text style={tw`text-gray-600 font-bold text-center`}>Sesión cerrada correctamente!</Text>
      <TouchableOpacity style={tw`bg-sky-600 rounded-lg p-2 mt-3 w-50 mx-auto `} onPress={handleLogin}>
        <Text style={tw`text-gray-50 font-bold text-center`}>Iniciar Sesión</Text>
      </TouchableOpacity>
    </View>
  )
}
