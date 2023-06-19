import React from 'react'
import { ActivityIndicator, View } from 'react-native'
import tw from 'twrnc'

const Loading = () => {
  return (
    <View style={tw`mt-20`}>
      <ActivityIndicator
        color={'#00bfff'}
       size="large" />
    </View>
  )
}

export default Loading
