import React from 'react'
import { SafeAreaView, StatusBar } from 'react-native'
import tw from 'twrnc'

import Navigation from './Navigation'

import AuthProvider from '../../context/AuthContext'
import ClientesProvider from '../../context/ClientesContext'
import { NavigationContainer } from '@react-navigation/native'
import GastosProvider from '../../context/GastosContext'
import VentasProvider from '../../context/VentasContext'
import RecaudosProvider from '../../context/RecaudosContext'
const Main = () => {
  return (
    <SafeAreaView style={tw`flex-1`}>
      <StatusBar />
      <NavigationContainer>
        <AuthProvider>
          <ClientesProvider>
            <GastosProvider>
              <VentasProvider>
                <RecaudosProvider>
                  <Navigation />
                </RecaudosProvider>
              </VentasProvider>
            </GastosProvider>
          </ClientesProvider>
        </AuthProvider>
      </NavigationContainer>
    </SafeAreaView>
  )
}

export default Main
