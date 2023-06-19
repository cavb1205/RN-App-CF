import React, { useContext, useState } from 'react'
import { TextInput, TouchableOpacity, View, Text } from 'react-native'
import tw from 'twrnc'
import { AuthContext } from '../../context/AuthContext'

const Login = () => {
  const { loginUser } = useContext(AuthContext)
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = () => {
    loginUser(userName, password)
  }

  return (
    <View>
      <View style={tw`bg-gray-100 my-auto p-10 mt-30 mx-5 rounded-xl shadow-xl`}>
        <Text style={tw`text-gray-500 text-center text-2xl font-bold`}>
          Ingreso al Sistemas
        </Text>
        <Text style={tw`text-center`}>{userName}</Text>
        <TextInput
          style={tw`m-3 border-sky-200 border rounded-xl p-2`}
          placeholder="Usuario"
          value={userName}
          onChangeText={setUserName}
        />

        <TextInput
        style={tw`m-3  border-sky-200 border rounded-xl p-2 `}
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
        <TouchableOpacity style={tw`bg-sky-500 rounded-full p-2 w-50 mx-auto shadow-lg mt-2`} onPress={handleLogin}>
          <Text style={tw`text-white font-bold text-center py-1`}>Ingresar</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Login
