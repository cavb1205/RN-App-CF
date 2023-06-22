import React from 'react'
import ClientsList from './Clientes/ClientsList'
import ClientDetail from './Clientes/ClientDetail'
import ClientCreate from './Clientes/ClientCreate'

import { createDrawerNavigator } from '@react-navigation/drawer'
import GastosList from './Gastos/GastosList'
import GastosCreate from './Gastos/GastosCreate'
import RecaudosList from './Recaudos/RecaudosList'
import VentasList from './Ventas/VentasList'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ClientUpdate from './Clientes/ClientUpdate'
import VentaDetail from './Ventas/VentaDetail'

const Tab = createDrawerNavigator()
const Stack = createNativeStackNavigator()

function ClientStack () {
  return (
    <Stack.Navigator initialRouteName="Lista">
      <Stack.Screen name="Lista" component={ClientsList} />
      <Stack.Screen name="Detalle" component={ClientDetail} />
      <Stack.Screen name="Nuevo Cliente" component={ClientCreate} />
      <Stack.Screen name="Editar" component={ClientUpdate} />
    </Stack.Navigator>
  )
}

function GastosStack () {
  return (
    <Stack.Navigator initialRouteName="Lista">
      <Stack.Screen name="Lista" component={GastosList} />
      <Stack.Screen name="Nuevo Gasto" component={GastosCreate} />
    </Stack.Navigator>
  )
}

function VentasStack () {
  return (
    <Stack.Navigator initialRouteName="Lista">
      <Stack.Screen name="Lista" component={VentasList} />
      <Stack.Screen name="Detalle" component={VentaDetail} />
      <Stack.Screen name="Pagos" component={RecaudosList} />
    </Stack.Navigator>
  )
}

function MyMenu () {
  return (
    <Tab.Navigator initialRouteName='Ventas'>
      <Tab.Screen name="Gastos" component={GastosStack} />
      <Tab.Screen name="Recaudos" component={RecaudosList} />
      <Tab.Screen name="Ventas" component={VentasStack} />
      <Tab.Screen name="Clientes" component={ClientStack} />
    </Tab.Navigator>
  )
}

export default function Navigation () {
  return <MyMenu />
}
