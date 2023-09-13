import React, { useEffect, useState, useContext } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import tw from 'twrnc'
import { createUtcDateIso } from '../Hooks/useDate'
import { Button } from '@rneui/base'
import DateTimePicker from '@react-native-community/datetimepicker'
import { Picker } from '@react-native-picker/picker'
import { ClientesContext } from '../../../context/ClientesContext'
import { VentasContext } from '../../../context/VentasContext'

const VentaCreate = () => {
  const { clientesActivos, getClientesActivos } = useContext(ClientesContext)
  const { ventasCreateItem } = useContext(VentasContext)
  const [date, setDate] = useState(createUtcDateIso())
  const [show, setShow] = useState(false)
  const [venta, setVenta] = useState({
    fecha_venta: date,
    valor_venta: '',
    interes: '20',
    cuotas: '20',
    comentario: '',
    cliente: '',
    fecha_vencimiento: '',
    saldo_actual: ''
  })

  const showDatePicker = () => {
    setShow(true)
  }

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date
    setShow(false)
    setDate(currentDate)
    setVenta({
      ...venta,
      fecha_venta: currentDate.toISOString().slice(0, 10)
    })
  }

  const handleChange = (name, value) => {
    setVenta({
      ...venta,
      [name]: value
    })
  }
  const handleSubmit = () => {
    if (venta.valor_venta === '') {
      alert('El valor de la venta es obligatorio')
      return
    }
    if (venta.cliente === '') {
      alert('El cliente es obligatorio')
      return
    }
    if (venta.cuotas === '') {
      alert('El numero de cuotas es obligatorio')
      return
    }
    if (venta.interes === '') {
      alert('El interes es obligatorio')
      return
    }

    ventasCreateItem(venta)
  }

  useEffect(() => {
    getClientesActivos()
  }, [])

  return (
    <View style={tw`bg-gray-50 shadow-xl rounded-xl mx-4 my-auto p-6`}>
      <Text style={tw`text-center text-2xl font-extrabold text-gray-500 mb-3`}>
        Crear Venta
      </Text>
      <View style={tw`p-2 rounded-lg shadow-lg bg-gray-50`}>
        <View style={tw`m-2`}>
          <Button
            title={venta.fecha_venta + ' ' + '🗓️'}
            onPress={showDatePicker}
          />
          {show && (
            <DateTimePicker
              style={tw`mx-auto`}
              value={new Date()}
              mode={'date'}
              onChange={onChange}
            />
          )}
        </View>
        <View style={tw`m-2`}>
          <TextInput
            keyboardType="numeric"
            onChangeText={(text) => handleChange('valor_venta', text)}
            value={venta.valor_venta}
            placeholder="Valor Venta"
            style={tw`border border-gray-300 rounded-md p-1`}
          />
        </View>
        <View style={tw`m-2`}>
          <TextInput
            editable={false}
            selectTextOnFocus={false}
            keyboardType="numeric"
            onChangeText={(text) => handleChange('interes', text)}
            value={venta.interes}
            placeholder="Interes"
            style={tw`border border-gray-300 rounded-md p-1`}
          />
        </View>
        <View style={tw`m-2`}>
          <TextInput
            keyboardType="numeric"
            onChangeText={(text) => handleChange('cuotas', text)}
            value={venta.cuotas}
            placeholder="Cuotas"
            style={tw`border border-gray-300 rounded-md p-1`}
          />
        </View>
        <View style={tw`m-2`}>
          <TextInput
            onChangeText={(text) => handleChange('comentario', text)}
            value={venta.comentario}
            placeholder="Comentario"
            style={tw`border border-gray-300 rounded-md p-1`}
          />
        </View>
        <View style={tw`m-2`}>
          <Picker
            selectedValue={venta.cliente}
            onValueChange={(itemValue) => handleChange('cliente', itemValue)}
          >
            <Picker.Item label="Selecciona Cliente 👇" value="" />
            {clientesActivos.map((item) => (
              <Picker.Item
                key={item.id}
                label={item.nombres + ' ' + item.apellidos}
                value={item.id}
              />
            ))}
          </Picker>
        </View>
      </View>
      <TouchableOpacity
        onPress={handleSubmit}
        style={tw`bg-green-600 rounded-md p-2 mt-3 shadow-md`}
      >
        <Text style={tw`text-center text-white font-bold text-lg`}>Crear</Text>
      </TouchableOpacity>
    </View>
  )
}

export default VentaCreate
