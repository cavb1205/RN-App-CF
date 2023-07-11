import React, { createContext, useState, useEffect } from 'react'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { URL } from '../config'
import { useNavigation } from '@react-navigation/native'

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null)
  const [refresh, setRefresh] = useState(null)
  const [user, setUser] = useState(null)
  const [perfil, setPerfil] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [membresia, setMembresia] = useState(null)

  const navigation = useNavigation()

  const loginUser = async (username, password) => {
    const response = await fetch(`${URL}/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        password
      })
    })
    const data = await response.json()

    if (response.status === 200) {
      setToken(data.token)
      setRefresh(data.refresh)
      setUser(data.user)
      setPerfil(data.perfil)
      setMembresia(data.membresia)
      await AsyncStorage.setItem('token', JSON.stringify(data.token))
      await AsyncStorage.setItem('refresh', JSON.stringify(data.refresh))
      await AsyncStorage.setItem('user', JSON.stringify(data.user))
      await AsyncStorage.setItem('userName', JSON.stringify(data.user.username))
      await AsyncStorage.setItem('perfil', JSON.stringify(data.perfil))

      navigation.navigate('Liquidar Ventas')
    } else {
      alert('Usuario o contraseña incorrectos')
    }
  }
  const logoutUser = async () => {
    setError(false)
    setToken(null)
    setRefresh(null)
    setUser(null)
    setPerfil(null)
    await AsyncStorage.removeItem('token')
    await AsyncStorage.removeItem('refresh')
    await AsyncStorage.removeItem('user')
    await AsyncStorage.removeItem('perfil')
  }

  const updateToken = async () => {
    const response = await fetch(`${URL}/token/refresh/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ refresh })
    })
    const data = await response.json()
    if (response.status === 200) {
      setToken(data.access)
      await AsyncStorage.setItem('token', JSON.stringify(data.access))
    } else {
      logoutUser()
    }

    if (loading) {
      setLoading(false)
    }
  }

  const [tienda, setTienda] = useState({})
  const getTiendaMembresia = async () => {
    setLoading(true)
    const response = await fetch(`${URL}/tiendas/detail/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    const data = await response.json()
    if (response.status === 200) {
      setTienda(data)
      setLoading(false)
    } else if (response.statusText === 'Unauthorized') {
      logoutUser()
    }
  }

  const [cajaAnterior, setCajaAnterior] = useState({})
  const getCierreCaja = async (fecha) => {
    setLoading(true)
    const fullUrl = `${URL}/tiendas/cierre/${fecha}/`
    const response = await fetch(fullUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    const data = await response.json()
    if (response.status === 200) {
      setCajaAnterior(data)
      setLoading(false)
    } else if (response.statusText === 'Unauthorized') {
      logoutUser()
    }
  }

  const postCierreCaja = async (fecha) => {
    setLoading(true)
    const fullUrl = `${URL}/tiendas/cierre/post/${fecha}/`

    const response = await fetch(fullUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    if (response.status === 200) {
      setLoading(false)
      alert('Cierre de Caja Exitoso')
      navigation.navigate('Caja Ruta')
    } else if (response.statusText === 'Unauthorized') {
      logoutUser()
    }
  }

  const [query, setQuery] = useState('')

  const handleSearch = (event) => {
    setQuery(event.target.value.toLowerCase())
  }

  const contextData = {
    loginUser,
    logoutUser,
    token,
    refresh,
    user,
    error,
    query,
    handleSearch,
    setQuery,
    perfil,
    membresia,
    getTiendaMembresia,
    tienda,
    cajaAnterior,
    getCierreCaja,
    postCierreCaja
  }

  useEffect(() => {
    if (loading) {
      updateToken()
    }
    const minutes = 30
    const calcTime = 1000 * 60 * minutes
    const interval = setInterval(() => {
      if (token) {
        updateToken()
      } else {
        // navigation.navigate('Login')
      }
    }, calcTime)
    return () => clearInterval(interval)
  }, [token, loading])

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  )
}

export default AuthProvider
