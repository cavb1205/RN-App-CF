import { MotiView } from 'moti'
import { Skeleton } from 'moti/skeleton'
import React from 'react'
import { Text } from 'react-native'
import tw from 'twrnc'

const LoadingList = () => {
  return (
    <MotiView style={tw`m-3`}>
        <Skeleton colorMode='light' width={'100%'} height={80} />
        <Text></Text>
        <Skeleton colorMode='light' width={'100%'} height={80} />
        <Text></Text>
        <Skeleton colorMode='light' width={'100%'} height={80} />
        <Text></Text>
        <Skeleton colorMode='light' width={'100%'} height={80} />
        <Text></Text>
        <Skeleton colorMode='light' width={'100%'} height={80} />
        <Text></Text>
        <Skeleton colorMode='light' width={'100%'} height={80} />
        <Text></Text>
        <Skeleton colorMode='light' width={'100%'} height={80} />

    </MotiView>
  )
}

export default LoadingList
