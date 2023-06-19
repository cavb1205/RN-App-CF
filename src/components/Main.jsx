import React from 'react'
import { SafeAreaView, StatusBar } from 'react-native'
import tw from 'twrnc'

import Navigation from './Navigation'

import AuthProvider from '../../context/AuthContext'
import ClientesProvider from '../../context/ClientesContext'
import { NavigationContainer } from '@react-navigation/native'
import GastosProvider from '../../context/GastosContext'
const Main = () => {
  return (
    <SafeAreaView style={tw`flex-1`}>
      <StatusBar />
      <AuthProvider>
        <NavigationContainer>
          <ClientesProvider>
            <GastosProvider>
              <Navigation />
            </GastosProvider>
          </ClientesProvider>
        </NavigationContainer>
      </AuthProvider>
    </SafeAreaView>
  )
}

export default Main
