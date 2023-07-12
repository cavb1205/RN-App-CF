import React, { useContext, useState } from 'react'
import { View, Button } from 'react-native'
import tw from 'twrnc'

import DateTimePicker from '@react-native-community/datetimepicker'
import { VentasContext } from '../../../context/VentasContext'

const DateSelect = () => {
  const { date, setDate } = useContext(VentasContext)
  const [show, setShow] = useState(false)
  const showDatePicker = () => {
    setShow(true)
  }
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date
    setShow(false)
    setDate(currentDate.toISOString().slice(0, 10))
  }

  return (
    <View style={tw`mx-auto`}>
      <Button title={date + ' ' + '🗓️'} onPress={showDatePicker} />
      {show && (
        <DateTimePicker
          value={new Date()}
          mode={'date'}
          onChange={onChange}
        />
      )}
    </View>
  )
}

export default DateSelect
