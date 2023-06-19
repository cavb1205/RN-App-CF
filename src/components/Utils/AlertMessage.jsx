import React from 'react'
import { Text, View } from 'react-native'
import tw from 'twrnc'

const AlertMessage = ({ message }) => {
  return (
    <View style={tw`p-6 mt-10 mx-4 bg-sky-400 rounded-xl shadow-2xl`}>
        <Text style={tw`text-gray-50 text-xl font-semibold`}>{message}</Text>
    </View>
  )
}

export default AlertMessage
