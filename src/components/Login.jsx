import React, { useContext, useEffect, useState } from 'react'
import { TextInput, TouchableOpacity, View, Text } from 'react-native'
import tw from 'twrnc'
import { AuthContext } from '../../context/AuthContext'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Loading from '../../src/components/Utils/Loading'

const Login = () => {
  const { loginUser, loading } = useContext(AuthContext)
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = () => {
    if (userName === '') {
      alert('Ingrese su usuario')
    } else if (password === '') {
      alert('Ingrese su contraseña')
    } else {
      loginUser(userName, password)
    }
  }

  useEffect(() => {
    const getData = async () => {
      try {
        let value = await AsyncStorage.getItem('userName')

        value = JSON.parse(value)

        if (value !== null) {
          setUserName(value)
        }
      } catch (e) {
        console.log(e)
      }
    }
    getData()
  }, [])

  if (loading) {
    return (
      <View>
        <Loading />
      </View>
    )
  }

  return (
    <View>
      <View
        style={tw`bg-gray-100 my-auto p-10 mt-30 mx-5 rounded-xl shadow-xl`}
      >
        <Text style={tw`text-gray-500 text-center text-2xl font-bold`}>
          Ingreso al Sistemas
        </Text>

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
          keyboardType="numeric"
        />
        <TouchableOpacity
          style={tw`bg-sky-500 rounded-full p-2 w-50 mx-auto shadow-lg mt-2`}
          onPress={handleLogin}
        >
          <Text style={tw`text-white font-bold text-center py-1`}>
            Ingresar
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Login
