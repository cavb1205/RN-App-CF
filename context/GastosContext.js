import React, { createContext, useContext, useState } from 'react'
import { AuthContext } from './AuthContext'
import { URL, TOKEN } from '../config'
import { useNavigation } from '@react-navigation/native'

const GastosProvider = ({ children }) => {
  const navigation = useNavigation()
  const { token, logoutUser } = useContext(AuthContext)

  const [gastos, setGastos] = useState([])
  const [tipoGastos, setTipoGastos] = useState([])

  const [loading, setLoading] = useState(false)

  const getGastos = async () => {
    try {
      setLoading(true)
      const fullUrl = `${URL}/gastos/`
      const response = await fetch(fullUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TOKEN}`
        }
      })
      const data = await response.json()
      if (response.status === 200) {
        setGastos(data)
        setLoading(false)
      } else if (response.statusText === 'Unauthorized') {
        logoutUser()
      }
    } catch {
      setLoading(false)
    }
  }

  const getTipoGastos = async () => {
    const response = await fetch(`${URL}/gastos/tipo/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${TOKEN}`
      }
    })
    const data = await response.json()
    if (response.status === 200) {
      setTipoGastos(data)
    } else if (response.statusText === 'Unauthorized') {
      logoutUser()
    }
  }

  const gastoCreateItem = async (newGasto) => {
    try {
      setLoading(true)
      const fullUrl = `${URL}/gastos/create/`
      const response = await fetch(fullUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TOKEN}`
        },
        body: JSON.stringify(newGasto)
      })

      if (response.status === 200) {
        setLoading(false)
        getGastos()
        navigation.goBack()
      } else if (response.statusText === 'Unauthorized') {
        logoutUser()
      }
    } catch (error) {
      console.error(error)
    }
  }

  const contextData = {
    gastos,
    getGastos,
    gastoCreateItem,
    loading,
    getTipoGastos,
    tipoGastos
  }

  return (
    <GastosContext.Provider value={contextData}>
      {children}
    </GastosContext.Provider>
  )
}

export const GastosContext = createContext()
export default GastosProvider
