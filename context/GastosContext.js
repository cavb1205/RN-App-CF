import React, { createContext, useContext, useState } from 'react'
import { AuthContext } from './AuthContext'
import { URL } from '../config'
import { useNavigation } from '@react-navigation/native'

const GastosProvider = ({ children }) => {
  const navigation = useNavigation()
  const { token, logoutUser } = useContext(AuthContext)

  const [gastos, setGastos] = useState([])
  const [gastosFecha, setGastosFecha] = useState([])
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
          Authorization: `Bearer ${token}`
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
      alert('Error al cargar los gastos, intente de nuevo!')
    }
  }

  const getTipoGastos = async () => {
    const response = await fetch(`${URL}/gastos/tipo/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
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
          Authorization: `Bearer ${token}`
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
      alert('Error al cargar los gastos, intente de nuevo!')
      setLoading(false)
    }
  }

  const getGastosFecha = async (fecha) => {
    try {
      const fullUrl = `${URL}/gastos/list/${fecha}/`

      const response = await fetch(fullUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })
      const data = await response.json()
      if (response.status === 200) {
        setGastosFecha(data)
        setLoading(false)
      } else if (response.statusText === 'Unauthorized') {
        logoutUser()
      }
    } catch {
      alert('Error al cargar los gastos, intente de nuevo!')
    }
  }

  const [aportes, setAportes] = useState([])
  const getAportesFecha = async (fecha) => {
    try {
      const fullUrl = `${URL}/aportes/list/${fecha}/`

      const response = await fetch(fullUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })

      const data = await response.json()

      if (response.status === 200) {
        setAportes(data)
      } else if (response.statusText === 'Unauthorized') {
        logoutUser()
      }
    } catch {
      alert('Error al cargar los Aportes, intente de nuevo!')
    }
  }

  const [utilidades, setUtilidades] = useState([])
  const getUtilidadesFecha = async (fecha) => {
    try {
      const fullUrl = `${URL}/utilidades/list/${fecha}/`

      const response = await fetch(fullUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })
      const data = await response.json()
      if (response.status === 200) {
        setUtilidades(data)
      } else if (response.statusText === 'Unauthorized') {
        logoutUser()
      }
    } catch {
      alert('Error al cargar las utilidades, intente de nuevo!')
    }
  }

  const contextData = {
    gastos,
    gastosFecha,
    getGastos,
    gastoCreateItem,
    loading,
    getTipoGastos,
    tipoGastos,
    getAportesFecha,
    aportes,
    getUtilidadesFecha,
    utilidades,
    getGastosFecha
  }

  return (
    <GastosContext.Provider value={contextData}>
      {children}
    </GastosContext.Provider>
  )
}

export const GastosContext = createContext()
export default GastosProvider
