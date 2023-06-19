import React, { createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { URL } from '../config'

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null)
  const [refresh, setRefresh] = useState(null)
  const [user, setUser] = useState(null)
  const [perfil, setPerfil] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [membresia, setMembresia] = useState(null)

  const navigate = useNavigate()

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
      await AsyncStorage.setItem('perfil', JSON.stringify(data.perfil))

      navigate('/liquidar/')
    }
  }
  const logoutUser = async () => {
    setError(false)
    setToken(null)
    setRefresh(null)
    setUser(null)
    await AsyncStorage.removeItem('token')
    await AsyncStorage.removeItem('refresh')
    await AsyncStorage.removeItem('user')
    navigate('/login/')
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
    navigate,
    error,
    query,
    handleSearch,
    setQuery,
    perfil,
    membresia
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
        navigate('/login/')
      }
    }, calcTime)
    return () => clearInterval(interval)
  }, [token, loading])

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  )
}

export default AuthProvider
