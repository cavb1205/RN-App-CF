import React, { useContext } from 'react'
import { Text, View } from 'react-native'

import { Link } from 'react-router-native'
import tw from 'twrnc'
import { AuthContext } from '../../context/AuthContext'

const AppBar = () => {
  const { user, logoutUser } = useContext(AuthContext)
  console.log(user)
  // if (user) {
  return (
      <View style={tw`flex flex-row justify-around bg-gray-600/90 p-3 absolute bottom-0 right-0 left-0`}>
        <Link to={'/recaudos/'}>
          <Text style={tw`text-gray-100 font-extrabold`}>Recaudos</Text>
        </Link>
        <Link to={'/gastos/'}>
          <Text style={tw`text-gray-100 font-extrabold`}>Gastos</Text>
        </Link>
        <Link to={'/clientes/'}>
          <Text style={tw`text-gray-100 font-extrabold`}>Clientes</Text>
        </Link>
        <Link to={'/ventas/'}>
          <Text style={tw`text-gray-100 font-extrabold`}>Ventas</Text>
        </Link>
        <Link to={'/liquidar/'}>
          <Text style={tw`text-gray-100 font-extrabold`}>Liquidar</Text>
        </Link>
        {user
          ? (

            <Text onPress={logoutUser} style={tw`text-gray-100 font-extrabold`}>Salir</Text>

            )
          : (
        <Link to={'/login/'}>
          <Text style={tw`text-gray-100 font-extrabold`}>Login</Text>
        </Link>
            )}
      </View>
  )
  // }
}

export default AppBar
