import React, { useContext, useEffect } from 'react'
import { TouchableOpacity, Text, View } from 'react-native'
import tw from 'twrnc'
import { AuthContext } from '../../../context/AuthContext'
import { GastosContext } from '../../../context/GastosContext'
import { useNavigation } from '@react-navigation/native'
import { RecaudosContext } from '../../../context/RecaudosContext'
import { VentasContext } from '../../../context/VentasContext'

const Caja = () => {
  const navigation = useNavigation()
  const { getTiendaMembresia, tienda } = useContext(AuthContext)
  const { gastos } = useContext(GastosContext)
  const { newRecaudo } = useContext(RecaudosContext)
  const { ventasActivas, ventas } = useContext(VentasContext)

  useEffect(() => {
    getTiendaMembresia()
  }, [])

  useEffect(() => {
    getTiendaMembresia()
  }, [gastos, newRecaudo, ventasActivas, ventas])

  function colorCaja () {
    if (tienda.tienda?.caja < 0) {
      return tw`bg-red-600 w-50 mx-auto p-6 rounded-lg mb-3`
    } else {
      return tw`bg-green-600 w-50 mx-auto p-6 rounded-lg mb-3`
    }
  }
  const handlePress = () => {
    navigation.navigate('Cierre Caja')
  }
  return (
    <View style={tw`bg-gray-50 shadow-xl rounded-xl mx-4 my-10 p-6`}>
      <View style={colorCaja()}>
        <Text style={tw`text-center text-gray-50 font-extrabold text-xl`}>
          Dinero en Caja
        </Text>
        <Text style={tw`text-center text-gray-50 font-extrabold mt-2 text-xl`}>
          $ {tienda.tienda?.caja}
        </Text>
      </View>
      <View>
        <TouchableOpacity
          style={tw`bg-sky-500 rounded-full p-2 w-50 mx-auto shadow-lg mt-2`}
          onPress={handlePress}
        >
          <Text style={tw`text-white font-bold text-center py-1`}>
            Cerrar Caja
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Caja
