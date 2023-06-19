import { MotiView } from 'moti'
import { Skeleton } from 'moti/skeleton'
import React from 'react'
import { Text } from 'react-native'
import tw from 'twrnc'

const LoadingDetail = () => {
  return (
    <MotiView style={tw`m-3`}>
        <Skeleton colorMode='light' width={'100%'} />
        <Text></Text>
        <Skeleton colorMode='light' width={'100%'} />
        <Text></Text>
        <Skeleton colorMode='light' width={'100%'} />
        <Text></Text>
        <Skeleton colorMode='light' width={'100%'} />
    </MotiView>
  )
}

export default LoadingDetail
