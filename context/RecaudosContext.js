import React, { createContext, useContext, useState } from 'react'
import { AuthContext } from './AuthContext'
import { URL, TOKEN } from '../config'
import { createUtcDateIso } from '../src/components/Hooks/useDate'

const RecaudosProvider = ({ children }) => {
  const { token, logoutUser } = useContext(AuthContext)

  const [venta, setVenta] = useState({})

  const [recaudos, setRecaudos] = useState([])
  const [recaudo, setRecaudo] = useState({})
  const [recaudosFecha, setRecaudosFecha] = useState([])
  const [loading, setLoading] = useState(false)

  const [liquidarDate, setLiquidarDate] = useState({
    fecha_liquidar: createUtcDateIso()
  })

  const [noPago, setNoPago] = useState({
    fecha_recaudo: liquidarDate.fecha_liquidar,
    valor_recaudo: 0,
    venta: venta.id,
    tienda: ''
  })

  const recaudosCreateItem = async (tiendaId = null) => {
    try {
      setLoading(true)
      let fullUrl = `${URL}/recaudos/create/`
      if (tiendaId) {
        fullUrl = `${URL}/recaudos/create/t/${tiendaId}/`
      }
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
        navigate('/liquidar/')
      } else if (response.statusText == 'Unauthorized') {
        logoutUser()
      }
    } catch (error) {
      console.error(error)
    }
  }

  const recaudosCreateNoPago = async (tiendaId = null) => {
    try {
      setLoading(true)
      let fullUrl = `${URL}/recaudos/create/nopay/`
      if (tiendaId) {
        fullUrl = `${URL}/recaudos/create/nopay/t/${tiendaId}/`
      }
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
        setNewRecaudo({})
        navigate('/liquidar/')
      } else if (response.statusText == 'Unauthorized') {
        logoutUser()
      }
    } catch (error) {
      console.error(error)
    }
  }

  const getRecaudos = async (ventaId) => {
    try {
      setLoading(true)
      const response = await fetch(`${URL}/recaudos/list/${ventaId}/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TOKEN}`
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

  const getRecaudosFecha = async (date, tiendaId = null) => {
    try {
      setLoading(true)
      let fullUrl = `${URL}/recaudos/list/${date}/`
      if (tiendaId) {
        fullUrl = `${URL}/recaudos/list/${date}/t/${tiendaId}/`
      }
      const response = await fetch(fullUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TOKEN}`
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
      alert('Error al cargar los recaudos')
      setLoading(false)
    }
  }

  //   const handleChange = (event) => {
  //     const { name, value } = event.target
  //     setNewRecaudo({
  //       ...newRecaudo,
  //       [name]: value
  //     })
  //   }

  const [tipoFalla, setTipoFalla] = useState({
    comentario: '',
    tipo_falla: 'Casa o Local Cerrado'
  })

  const handleChangeNoPago = (event) => {
    const { name, value } = event.target
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

  const handleChangeUpdate = (event) => {
    const { name, value } = event.target
    setRecaudo({
      ...recaudo,
      [name]: value
    })
  }

  const handleChangeDate = (event) => {
    const { name, value } = event.target
    setLiquidarDate({ ...liquidarDate, [name]: value })
  }

  // boton abonar de liquidar ventas
  const SelectedRecaudo = (venta) => {
    setVenta(venta)
    if (venta.saldo_actual < venta.valor_cuota) {
      setNewRecaudo({
        fecha_recaudo: liquidarDate.fecha_liquidar,
        valor_recaudo: venta.saldo_actual,
        venta: venta.id,
        tienda: ''
      })
    } else {
      setNewRecaudo({
        fecha_recaudo: liquidarDate.fecha_liquidar,
        valor_recaudo: venta.valor_cuota,
        venta: venta.id,
        tienda: ''
      })
    }
    navigate('/liquidar/pay/')
  }

  // boton no pago de liquidar ventas
  const selectedNoPago = (venta) => {
    setVenta(venta)
    setTipoFalla({
      comentario: '',
      tipo_falla: 'Casa o Local Cerrado'
    })
    setNoPago({
      fecha_recaudo: liquidarDate.fecha_liquidar,
      valor_recaudo: 0,
      venta: venta.id,
      tienda: '',
      visita_blanco: {
        comentario: '',
        tipo_falla: 'Casa o Local Cerrado'
      }
    })
    navigate('/liquidar/nopay/')
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
    handleChangeDate,
    liquidarDate,
    setLiquidarDate,
    recaudos,
    recaudo,
    SelectedRecaudo,
    // handleChange,
    handleChangeUpdate,
    getRecaudos,
    recaudosCreateItem,
    totalRecaudosVenta,
    selectedNoPago,
    handleChangeNoPago,
    recaudosCreateNoPago,
    getRecaudosFecha,
    loading,

    totalRecaudosFecha
  }
  return (
    <RecaudosContext.Provider value={contextData}>
      {children}
    </RecaudosContext.Provider>
  )
}

export const RecaudosContext = createContext()
export default RecaudosProvider
