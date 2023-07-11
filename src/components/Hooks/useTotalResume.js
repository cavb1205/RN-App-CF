const useTotalResume = () => {
  /// //GENERAL
  const itemsDia = (list, name, fecha) => {
    if (list.message) {
      return 0
    }
    if (name === 'aportes' || name === 'gastos' || name === 'utilidades') {
      return list
        .filter((item) => item.fecha === fecha)
        .map((item) => parseFloat(item.valor))
        .reduce((a, b) => a + b, 0)
    }
    if (name === 'recaudos') {
      return list
        .filter((item) => item.fecha_recaudo === fecha)
        .map((item) => parseFloat(item.valor_recaudo))
        .reduce((a, b) => a + b, 0)
    }
    if (name === 'ventasNetas') {
      return list
        .filter((item) => item.fecha_venta === fecha)
        .map((item) => parseFloat(item.valor_venta))
        .reduce((a, b) => a + b, 0)
    }
  }

  return {
    itemsDia
  }
}

export default useTotalResume
