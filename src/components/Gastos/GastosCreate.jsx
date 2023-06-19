import React, { useContext, useEffect, useState } from 'react'
import { Button, Text, TextInput, TouchableOpacity, View } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import { Picker } from '@react-native-picker/picker'

import tw from 'twrnc'

import { GastosContext } from '../../../context/GastosContext'
import { createUtcDateIso } from '../Hooks/useDate'

const GastosCreate = () => {
  const { gastoCreateItem, getTipoGastos, tipoGastos } = useContext(GastosContext)
  const [date, setDate] = useState(createUtcDateIso())
  const [show, setShow] = useState(false)

  const [newGasto, setNewGasto] = useState({
    fecha: date,
    tipo_gasto: '',
    valor: '',
    comentario: ''
  })

  useEffect(() => {
    getTipoGastos()
  }, [])

  const showDatePicker = () => {
    setShow(true)
  }

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date
    setShow(false)
    setDate(currentDate)
    setNewGasto({
      ...newGasto,
      fecha: currentDate.toISOString().slice(0, 10)
    })
  }

  const handleSubmit = () => {
    if (newGasto.tipo_gasto === '') {
      alert('Debes seleccionar un tipo de gasto')
      return
    }
    if (newGasto.valor === '') {
      alert('Debes ingresar un valor')
      return
    }
    gastoCreateItem(newGasto)
  }
  const handleChange = (name, value) => {
    setNewGasto({
      ...newGasto,
      [name]: value
    })
  }

  return (
    <View style={tw`bg-gray-50 shadow-xl rounded-xl mx-4 my-auto p-6`}>
      <Text style={tw`text-center text-2xl font-extrabold text-gray-500 mb-3`}>
        Crear Gasto
      </Text>
      <View style={tw`p-2 rounded-lg shadow-lg bg-gray-50`}>
        <View style={tw`m-2 `}>
          <Button title={newGasto.fecha + ' ' + '🗓️'} onPress={showDatePicker}/>
          {show && <DateTimePicker style={tw`mx-auto`} value={ new Date() } mode={'date'} onChange={onChange} />}
        </View>
        <View style={tw`m-2`}>
          <Picker selectedValue={newGasto.tipo_gasto} onValueChange={(itemValue) => handleChange('tipo_gasto', itemValue)} >
            <Picker.Item label="Selecciona 👇" value="" />
            {tipoGastos.map((tipoGasto) => (
              <Picker.Item key={tipoGasto.id} label={tipoGasto.tipo_gasto} value={tipoGasto.id} />
            ))}
          </Picker>
        </View>
        <View style={tw`m-2`}>
          <TextInput
            onChangeText={(text) => handleChange('valor', text)}
            value={newGasto.valor}
            keyboardType='numeric'
            placeholder="Valor"
            style={tw`border border-gray-300 rounded-md p-1`}
          />
        </View>
        <View style={tw`m-2`}>
          <TextInput
            onChangeText={(text) => handleChange('comentario', text)}
            value={newGasto.comentario}
            placeholder="Comentario"
            style={tw`border border-gray-300 rounded-md p-1`}
          />
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

export default GastosCreate
