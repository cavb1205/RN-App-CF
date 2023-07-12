import { useState, useContext } from 'react'
import { ITEMS } from '../../../config'
import { AuthContext } from '../../../context/AuthContext'

export const useFilter = () => {
  const { query } = useContext(AuthContext)
  const [currentPage, setCurrentPage] = useState(0)

  const filterClientes = (listItems) => {
    return listItems.filter((item) =>
      item.nombres.toLowerCase().includes(query.toLowerCase()) ||
        item.apellidos.toLowerCase().includes(query.toLowerCase())
    ).slice(currentPage, currentPage + ITEMS)
  }

  const filterGastos = (listItems) => {
    return listItems.slice(currentPage, currentPage + ITEMS)
  }
  const filterVentas = (listItems) => {
    return listItems.filter((item) =>
      item.cliente?.nombres.toLowerCase().includes(query.toLowerCase()) ||
        item.cliente?.apellidos.toLowerCase().includes(query.toLowerCase())
    ).slice(currentPage, currentPage + ITEMS)
  }

  const filterLiquidar = (listItems) => {
    if (listItems.message) return []
    return listItems.filter((item) =>
      item.cliente?.nombres.toLowerCase().includes(query.toLowerCase()) ||
        item.cliente?.apellidos.toLowerCase().includes(query.toLowerCase())
    ).slice(currentPage, currentPage + ITEMS)
  }

  const filterList = (listItems, listName) => {
    switch (listName) {
      case 'clientes':
      case 'clientesDisponibles':
        return filterClientes(listItems)
      case 'gastos':
        return filterGastos(listItems)
      case 'ventas':
        return filterVentas(listItems)
      case 'liquidar':
        return filterLiquidar(listItems)
      default:
        return listItems.slice(currentPage, currentPage + ITEMS)
    }
  }

  const nextPage = () => {
    setCurrentPage(currentPage + ITEMS)
  }

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - ITEMS)
    }
  }
  return { filterList, nextPage, prevPage }
}
