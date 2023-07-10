import React, { createContext, useContext, useState } from 'react'
import { AuthContext } from './AuthContext'
import { URL } from '../config'
import { createUtcDateIso } from '../src/components/Hooks/useDate'
import { useNavigation } from '@react-navigation/native'
import { VentasContext } from './VentasContext'

const RecaudosProvider = ({ children }) => {
  const { date, getVentasLiquidar } = useContext(VentasContext)
  const navigation = useNavigation()
  const { token, logoutUser } = useContext(AuthContext)

  const [venta, setVenta] = useState({})

  const [recaudos, setRecaudos] = useState([])

  const [recaudosFecha, setRecaudosFecha] = useState([])
  const [loading, setLoading] = useState(false)

  const [liquidarDate, setLiquidarDate] = useState({
    fecha_liquidar: createUtcDateIso()
  })
  const [newRecaudo, setNewRecaudo] = useState({})
  const [noPago, setNoPago] = useState({
    fecha_recaudo: date,
    valor_recaudo: 0,
    venta: venta.id,
    tienda: ''
  })

  const recaudosCreateItem = async () => {
    try {
      setLoading(true)
      const fullUrl = `${URL}/recaudos/create/`
      const response = await fetch(fullUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(newRecaudo)
      })

      if (response.status === 200) {
        setLoading(false)
        setNewRecaudo({})
        getVentasLiquidar(date)
        navigation.navigate('Lista')
      } else if (response.statusText === 'Unauthorized') {
        logoutUser()
      }
    } catch (error) {
      alert('Error al crear el recaudo')
    }
  }

  const recaudosCreateNoPago = async () => {
    try {
      setLoading(true)
      const fullUrl = `${URL}/recaudos/create/nopay/`

      const response = await fetch(fullUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(noPago)
      })

      if (response.status === 200) {
        setLoading(false)
        getVentasLiquidar(date)
        navigation.navigate('Lista')
      } else if (response.statusText === 'Unauthorized') {
        logoutUser()
      }
    } catch (error) {
      alert('Error al crear el recaudo')
    }
  }

  const getRecaudos = async (ventaId) => {
    try {
      setLoading(true)
      const response = await fetch(`${URL}/recaudos/list/${ventaId}/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })
      const data = await response.json()
      if (response.status === 200) {
        setRecaudos(data)
        setLoading(false)
      } else if (response.statusText === 'Unauthorized') {
        logoutUser()
      }
    } catch (error) {
      alert('Error al cargar los recaudos')
    }
  }

  const getRecaudosFecha = async (date) => {
    try {
      setLoading(true)
      const fullUrl = `${URL}/recaudos/list/${date}/`
      const response = await fetch(fullUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })
      const data = await response.json()
      if (response.status === 200) {
        setRecaudosFecha(data)
        setLoading(false)
      } else if (response.statusText === 'Unauthorized') {
        logoutUser()
      }
    } catch (error) {
      alert('Error al cargar los recaudos por fecha')
      setLoading(false)
    }
  }

  const handleChange = (name, value) => {
    setNewRecaudo({
      ...newRecaudo,
      [name]: value
    })
  }

  const [tipoFalla, setTipoFalla] = useState({
    comentario: '',
    tipo_falla: 'Casa o Local Cerrado'
  })

  const handleChangeNoPago = (name, value) => {
    setTipoFalla({
      ...tipoFalla,
      [name]: value
    })
    setNoPago({
      ...noPago,
      visita_blanco: {
        ...tipoFalla,
        [name]: value
      }
    })
  }

  // boton abonar de liquidar ventas
  const SelectedRecaudo = (venta) => {
    setVenta(venta)
    if (venta.saldo_actual < venta.valor_cuota) {
      setNewRecaudo({
        fecha_recaudo: date,
        valor_recaudo: venta.saldo_actual,
        venta: venta.id,
        tienda: ''
      })
    } else {
      setNewRecaudo({
        fecha_recaudo: date,
        valor_recaudo: venta.valor_cuota.toString(),
        venta: venta.id,
        tienda: ''
      })
    }
    navigation.navigate('Abono')
  }

  // boton no pago de liquidar ventas
  const selectedNoPago = (venta) => {
    setVenta(venta)
    setTipoFalla({
      comentario: '',
      tipo_falla: 'Casa o Local Cerrado'
    })
    setNoPago({
      fecha_recaudo: date,
      valor_recaudo: 0,
      venta: venta.id,
      tienda: '',
      visita_blanco: {
        comentario: '',
        tipo_falla: 'Casa o Local Cerrado'
      }
    })
    navigation.navigate('No Pago')
  }

  const totalRecaudosVenta = () => {
    if (recaudos.message) {
      return 0
    } else {
      return recaudos
        .map((recaudo) => parseFloat(recaudo.valor_recaudo))
        .reduce((a, b) => a + b, 0)
    }
  }

  const totalRecaudosFecha = () => {
    if (recaudosFecha.message) {
      return 0
    } else {
      // liquidarDate
      return recaudosFecha
        .map((recaudo) => parseFloat(recaudo.valor_recaudo))
        .reduce((a, b) => a + b, 0)
    }
  }

  const contextData = {
    venta,
    liquidarDate,
    setLiquidarDate,
    recaudos,

    SelectedRecaudo,
    handleChange,
    noPago,
    getRecaudos,
    recaudosCreateItem,
    totalRecaudosVenta,
    selectedNoPago,
    handleChangeNoPago,
    recaudosCreateNoPago,
    getRecaudosFecha,
    loading,
    newRecaudo,
    totalRecaudosFecha,
    recaudosFecha
  }
  return (
    <RecaudosContext.Provider value={contextData}>
      {children}
    </RecaudosContext.Provider>
  )
}

export const RecaudosContext = createContext()
export default RecaudosProvider
