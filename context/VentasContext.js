import React, { createContext, useContext, useState } from 'react'
import { AuthContext } from './AuthContext'
import { URL, TOKEN } from '../config'
import { useNavigation } from '@react-navigation/native'

import { createUtcDateIso } from '../src/components/Hooks/useDate'

const VentasProvider = ({ children }) => {
  const { token, logoutUser } = useContext(AuthContext)

  const [allVentas, setAllVentas] = useState([])
  const [ventas, setVentas] = useState([])

  const [ventaDetail, setVentaDetail] = useState({})
  const [ventasActivas, setVentasActivas] = useState([])

  const [loading, setLoading] = useState(false)

  const navigation = useNavigation()

  const [newVenta, setNewVenta] = useState({
    fecha_venta: createUtcDateIso(),
    valor_venta: '',
    interes: 20,
    cuotas: 20,
    comentario: '',
    cliente: '',
    fecha_vencimiento: '',
    saldo_actual: ''
  })

  const getVentasFecha = async (fecha, tiendaId = null) => {
    try {
      setLoading(true)
      let fullUrl = `${URL}/ventas/list/${fecha}/`
      if (tiendaId) {
        fullUrl = `${URL}/ventas/list/${fecha}/t/${tiendaId}/`
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
        setAllVentas(data)
        setLoading(false)
      } else if (response.statusText === 'Unauthorized') {
        logoutUser()
      }
    } catch {
      alert('Error al cargar los datos, intente de nuevo!')
    }
  }

  const getVentasActivas = async () => {
    try {
      setLoading(true)
      const fullUrl = `${URL}/ventas/activas/`

      const response = await fetch(fullUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TOKEN}`
        }
      })
      const data = await response.json()
      if (response.status === 200) {
        setVentasActivas(data)
        setLoading(false)
      } else if (response.statusText === 'Unauthorized') {
        logoutUser()
      }
    } catch {
      alert('Error al cargar los datos, intente de nuevo!')
    }
  }

  const getVentasLiquidar = async (date, tiendaId = null) => {
    try {
      setLoading(true)
      let fullUrl = `${URL}/ventas/activas/liquidar/${date}/`
      if (tiendaId) {
        fullUrl = `${URL}/ventas/activas/liquidar/${date}/t/${tiendaId}/`
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
        setVentas(data)
        setLoading(false)
      } else if (response.statusText === 'Unauthorized') {
        logoutUser()
      }
    } catch {
      alert('Error al cargar los datos, intente de nuevo!')
    }
  }

  const ventasCreateItem = async (tiendaId = null) => {
    try {
      setLoading(true)
      const fullUrl = `${URL}/ventas/create/`

      const response = await fetch(fullUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TOKEN}`
        },
        body: JSON.stringify(newVenta)
      })
      if (response.status === 200) {
        getVentasActivas()
        navigation.goBack()
      } else if (response.statusText === 'Unauthorized') {
        logoutUser()
      }
    } catch {
      alert('Error al cargar los datos, intente de nuevo!')
    }
  }

  const getVenta = async (ventaId) => {
    try {
      setLoading(true)
      const response = await fetch(`${URL}/ventas/${ventaId}/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TOKEN}`
        }
      })
      const data = await response.json()
      if (response.status === 200) {
        setVentaDetail(data)
        setLoading(false)
      } else if (response.statusText === 'Unauthorized') {
        setLoading(false)
        logoutUser()
      }
    } catch {
      alert('Error al cargar los datos, intente de nuevo!')
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setNewVenta({
      ...newVenta,
      [name]: value
    })
  }

  const handleChangeUpdate = (event) => {
    const { name, value } = event.target
    setVentaDetail({
      ...ventaDetail,
      [name]: value
    })
  }

  const [query, setQuery] = useState('')

  const handleSearch = (event) => {
    setQuery(event.target.value.toLowerCase())
  }

  const totalRecaudar = () => {
    if (ventas.message) {
      return 0
    } else {
      return ventas
        .map((venta) => parseFloat(venta.valor_cuota))
        .reduce((a, b) => a + b, 0)
    }
  }

  const contextData = {
    newVenta,
    setNewVenta,
    allVentas,
    ventas,
    ventaDetail,
    getVentasLiquidar,
    getVentasFecha,
    ventasCreateItem,
    getVenta,
    totalRecaudar,
    handleChange,
    handleChangeUpdate,
    handleSearch,

    ventasActivas,
    getVentasActivas,
    loading,

    query
  }

  return (
    <VentasContext.Provider value={contextData}>
      {children}
    </VentasContext.Provider>
  )
}

export const VentasContext = createContext()
export default VentasProvider
