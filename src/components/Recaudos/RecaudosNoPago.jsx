import React, { useContext } from 'react'
import {
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import tw from 'twrnc'
import { Picker } from '@react-native-picker/picker'
import { RecaudosContext } from '../../../context/RecaudosContext'
import { useNavigation } from '@react-navigation/native'

const RecaudosNoPago = () => {
  const { venta, noPago, handleChangeNoPago, recaudosCreateNoPago } = useContext(RecaudosContext)
  const navigation = useNavigation()
  const handleSubmit = () => {
    recaudosCreateNoPago()
  }

  return (
    <View style={tw`bg-gray-50 shadow-xl rounded-xl mx-4 my-auto p-6`}>
      <View style={tw` self-center my-3`}>
        <Text style={tw`text-2xl text-center font-bold text-gray-600`}>
          Reportar No Pago a {venta.cliente?.nombres} {venta.cliente?.apellidos}
        </Text>
      </View>
      <View style={tw`mb-2`}>
        <Picker
          selectedValue={noPago.visita_blanco?.tipo_falla}
          onValueChange={(itemValue) =>
            handleChangeNoPago('tipo_falla', itemValue)
          }
        >
          <Picker.Item
            label="Casa o Local Cerrado"
            value="Casa o Local Cerrado"
          />
          <Picker.Item
            label="Cliente no Tiene Dinero"
            value="Cliente no Tiene Dinero"
          />
          <Picker.Item label="Cliente de Viaje" value="Cliente de Viaje" />
          <Picker.Item label="Cliente no Aparece" value="Cliente no Aparece" />
          <Picker.Item label="Cliente Enfermo" value="Cliente Enfermo" />
          <Picker.Item label="Otro Motivo" value="Otro Motivo" />
        </Picker>
        <TextInput
          style={tw`text-lg border border-gray-400 rounded-lg px-2 py-2 mt-2 `}
          placeholder="Comentario"
          onChangeText={(text) => handleChangeNoPago('comentario', text)}
        />
      </View>
      <View style={tw`flex flex-row justify-evenly my-6`}>
        <TouchableOpacity style={tw`bg-gray-500 rounded-lg py-2 w-30`} onPress={() => navigation.goBack()}>
          <Text style={tw`text-gray-50 mx-auto font-bold text-lg`}>
            Cancelar
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={tw`bg-green-700 rounded-lg py-2 w-30`} onPress={handleSubmit}>
          <Text style={tw`text-gray-50 mx-auto font-bold text-lg`}>
            Confirmar
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default RecaudosNoPago
