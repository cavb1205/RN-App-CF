import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import tw from 'twrnc'

const Paginator = ({ nextPage, prevPage }) => {
  return (
    <View style={tw`flex flex-row justify-between`}>
      <TouchableOpacity
        onPress={prevPage}
        style={tw`py-2 w-30 mx-auto bg-slate-400 mt-1 rounded-xl shadow-md`}
      >
        <Text style={tw`text-center text-gray-100 text-base font-semibold`}>
          Anterior
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={nextPage}
        style={tw`py-2 w-30 mx-auto bg-slate-400 mt-1 rounded-xl shadow-md`}
      >
        <Text style={tw`text-center text-gray-100 text-base font-semibold`}>
          Siguiente
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default Paginator
