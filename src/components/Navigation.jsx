import React, { useContext } from 'react'
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
import VentaCreate from './Ventas/VentaCreate'
import LiquidarVentasList from './Ventas/LiquidarVentasList'
import RecaudosNoPago from './Recaudos/RecaudosNoPago'
import RecaudosCreate from './Recaudos/RecaudosCreate'
import InformeRecaudosFecha from './Recaudos/InformeRecaudosFecha'

import Login from './Login'
import { AuthContext } from '../../context/AuthContext'
import { Logout } from './Logout'
import Profile from './Trabajador/Profile'

import Caja from './Caja/Caja'
import CierreCaja from './Caja/CierreCaja'

const Tab = createDrawerNavigator()
const Stack = createNativeStackNavigator()

function ClientStack () {
  return (
    <Stack.Navigator initialRouteName="Lista">
      <Stack.Screen
        name="Lista"
        component={ClientsList}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Detalle" component={ClientDetail} />
      <Stack.Screen name="Nuevo Cliente" component={ClientCreate} />
      <Stack.Screen name="Editar" component={ClientUpdate} />
    </Stack.Navigator>
  )
}

function GastosStack () {
  return (
    <Stack.Navigator initialRouteName="Lista">
      <Stack.Screen
        name="Lista"
        component={GastosList}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Nuevo Gasto" component={GastosCreate} />
    </Stack.Navigator>
  )
}

function VentasStack () {
  return (
    <Stack.Navigator initialRouteName="Lista">
      <Stack.Screen
        name="Lista"
        component={VentasList}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Nueva Venta" component={VentaCreate} />
      <Stack.Screen name="Detalle" component={VentaDetail} />
      <Stack.Screen name="Pagos" component={RecaudosList} />
    </Stack.Navigator>
  )
}

function LiquidarStack () {
  return (
    <Stack.Navigator initialRouteName="Lista">
      <Stack.Screen
        name="Lista"
        component={LiquidarVentasList}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="No Pago" component={RecaudosNoPago} />
      <Stack.Screen name="Abono" component={RecaudosCreate} />
    </Stack.Navigator>
  )
}

function CajaStack () {
  return (
    <Stack.Navigator initialRouteName="Caja Ruta">
      <Stack.Screen
        name="Caja Ruta"
        component={Caja}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Cierre Caja" component={CierreCaja} />
    </Stack.Navigator>
  )
}

function MyMenu ({ perfil, logoutUser }) {
  return (
    <Tab.Navigator initialRouteName="Login">
      {perfil
        ? (
        <>
          <Tab.Screen name={'Caja'} component={CajaStack} />
          <Tab.Screen name="Gastos" component={GastosStack} />
          <Tab.Screen
            name="Informe Recaudos"
            component={InformeRecaudosFecha}
          />
          <Tab.Screen name="Ventas" component={VentasStack} />
          <Tab.Screen name="Liquidar Ventas" component={LiquidarStack} />
          <Tab.Screen name="Clientes" component={ClientStack} />
          <Tab.Screen name={'Trabajador'} component={Profile} />
        </>
          )
        : null}
      {perfil === null
        ? (
        <Tab.Screen name="Login" component={Login} />
          )
        : (
        <Tab.Screen name="Logout" component={Logout} />
          )}
    </Tab.Navigator>
  )
}

export default function Navigation () {
  const { perfil, logoutUser } = useContext(AuthContext)

  return <MyMenu perfil={perfil} logoutUser={logoutUser} />
}
