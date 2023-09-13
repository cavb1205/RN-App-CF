/* eslint-disable multiline-ternary */
import React, { useContext, useState } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { RecaudosContext } from '../../../context/RecaudosContext'
import tw from 'twrnc'
import { useNavigation } from '@react-navigation/native'
import Loading from '../Utils/Loading'

const RecaudosCreate = () => {
  const navigation = useNavigation()
  const { handleChange, venta, newRecaudo, recaudosCreateItem } =
    useContext(RecaudosContext)

  const [loading, setLoading] = useState(false)

  const handleSubmit = () => {
    if (newRecaudo.valor_recaudo === '') {
      alert('El valor del abono no puede estar vacio')
    } else {
      setLoading(true)
      recaudosCreateItem()
    }
  }

  return (
    <View style={tw`bg-gray-50 shadow-xl rounded-xl mx-4 my-auto p-6`}>
      <View style={tw` self-center my-3`}>
        <Text style={tw`text-2xl text-center font-bold text-gray-600`}>
          Agregar Abono a {venta.cliente?.nombres} {venta.cliente?.apellidos}
        </Text>
      </View>
      {loading ? (
        <Loading />
      ) : (
        <>
          <View style={tw`mb-2`}>
            <Text style={tw`text-lg font-semibold text-center text-blue-600`}>
              Fecha Abono: {newRecaudo.fecha_recaudo}
            </Text>
            <TextInput
              style={tw`text-lg text-green-700 border border-gray-400 font-extrabold rounded-lg px-2 py-2 mt-2 text-center`}
              value={newRecaudo.valor_recaudo}
              placeholder="Valor Abono"
              onChangeText={(text) => handleChange('valor_recaudo', text)}
              keyboardType="numeric"
            />
          </View>
          <View style={tw`flex flex-row justify-evenly my-6`}>
            <TouchableOpacity
              style={tw`bg-gray-500 rounded-lg py-2 w-30`}
              onPress={() => navigation.goBack()}
            >
              <Text style={tw`text-gray-50 mx-auto font-bold text-lg`}>
                Cancelar
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={tw`bg-green-700 rounded-lg py-2 w-30`}
              onPress={handleSubmit}
            >
              <Text style={tw`text-gray-50 mx-auto font-bold text-lg`}>
                Confirmar
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  )
}

export default RecaudosCreate
