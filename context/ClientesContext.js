import React, { createContext, useState, useContext } from 'react'

import { AuthContext } from './AuthContext'

import { URL, TOKEN } from '../config'
import { useNavigation } from '@react-navigation/native'
export const ClientesContext = createContext()

const ClientesProvider = ({ children }) => {
  const navigation = useNavigation()
  const { token, logoutUser } = useContext(AuthContext)

  const [clientes, setClientes] = useState([])

  const [clientesActivos, setClientesActivos] = useState([])

  const [ventasActivas, setVentasActivas] = useState([])
  const [cliente, setCliente] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const getClientes = async (tiendaId = null) => {
    try {
      setLoading(true)
      let fullUrl = `${URL}/clientes/`
      if (tiendaId) {
        fullUrl = `${URL}/clientes/tienda/${tiendaId}/`
      }
      const response = await fetch(fullUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Authorization: `Bearer ${token}`
          Authorization: `Bearer ${TOKEN}`
        }
      })
      const data = await response.json()

      if (response.status === 200) {
        setClientes(data)
        setLoading(false)
      } else if (response.statusText === 'Unauthorized') {
        logoutUser()
      }
    } catch (error) {
      alert('Error al cargar los datos, intente de nuevo!')
      setLoading(false)
    }
  }

  const getClientesActivos = async (tiendaId = null) => {
    try {
      setLoading(true)
      const fullUrl = `${URL}/clientes/activos/`

      const response = await fetch(fullUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TOKEN}`
        }
      })
      const data = await response.json()

      if (response.status === 200) {
        setClientesActivos(data)
        setLoading(false)
      } else if (response.statusText === 'Unauthorized') {
        logoutUser()
      }
    } catch (error) {
      alert('Error al cargar los datos, intente de nuevo!')
      setLoading(false)
    }
  }

  const getCliente = async (clienteId) => {
    try {
      setLoading(true)
      const response = await fetch(`${URL}/clientes/${clienteId}/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TOKEN}`
        }
      })
      const data = await response.json()

      if (response.status === 200) {
        setCliente(data)
        setLoading(false)
      } else if (response.statusText === 'Unauthorized') {
        logoutUser()
      } else {
        setError(data)
      }
    } catch (error) {
      alert('Error al cargar los datos, intente de nuevo!')
      setLoading(false)
    }
  }

  const clienteCreateItem = async (cliente) => {
    try {
      setLoading(true)
      const fullUrl = `${URL}/clientes/create/`

      const response = await fetch(fullUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TOKEN}`
        },
        body: JSON.stringify(cliente)
      })

      if (response.status === 200) {
        getClientes()
        setLoading(false)
        navigation.goBack()
      } else if (response.statusText === 'Unauthorized') {
        logoutUser()
      } else {
        alert('Error al cargar los datos, intente de nuevo!')
      }
    } catch (error) {
      alert('Error al cargar los datos, intente de nuevo!')
      setLoading(false)
    }
  }

  const clienteUpdateItem = async (cliente) => {
    try {
      setLoading(true)
      const response = await fetch(`${URL}/clientes/${cliente.id}/update/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TOKEN}`
        },
        body: JSON.stringify(cliente)
      })
      const data = await response.json()
      if (response.status === 200) {
        setLoading(false)
        navigation.goBack()
      } else if (response.statusText === 'Unauthorized') {
        logoutUser()
      } else {
        setError(data)
      }
    } catch (error) {
      alert('Error al cargar los datos, intente de nuevo!')
      setLoading(false)
    }
  }

  const getVentasActivasCliente = async (clienteId, tiendaId = null) => {
    try {
      setLoading(true)
      let fullUrl = `${URL}/ventas/activas/${clienteId}/`
      if (tiendaId) {
        fullUrl = `${URL}/ventas/activas/${clienteId}/t/${tiendaId}/`
      }
      const response = await fetch(fullUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })
      const data = await response.json()
      if (response.status === 200) {
        setVentasActivas(data)
        setLoading(false)
      } else if (response.statusText === 'Unauthorized') {
        logoutUser()
      }
    } catch (error) {
      alert('Error al cargar los datos, intente de nuevo!')
      setLoading(false)
    }
  }
  const handleChangeUpdate = (name, value) => {
    setCliente({
      ...cliente,
      [name]: value
    })
  }

  const contextData = {
    clientes,
    cliente,

    getClientes,
    getCliente,
    clienteUpdateItem,

    clienteCreateItem,
    getVentasActivasCliente,
    ventasActivas,
    getClientesActivos,
    clientesActivos,
    error,
    loading,
    handleChangeUpdate

  }

  return (
    <ClientesContext.Provider value={contextData}>
      {children}
    </ClientesContext.Provider>
  )
}

export default ClientesProvider
