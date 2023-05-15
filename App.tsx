/* eslint-disable camelcase */
import { NativeBaseProvider, StatusBar } from 'native-base'
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto'

import { Routes } from './src/routes'

import { THEME } from './src/theme'
import { Loading } from './src/components/Loading'

import { CartContextProvider } from './src/contexts/CartContext'
import OneSignal from 'react-native-onesignal'
import { Platform } from 'react-native'
import { tagUserInfoCreate } from './src/notifications/notificationsTags'
import { useEffect } from 'react'

const { ONESIGNAL_APP_ID_ANDROID, ONESIGNAL_APP_ID_IOS, ONESIGNAL_APP_EMAIL } =
  process.env

const oneSignalAppId =
  Platform.OS === 'ios' ? ONESIGNAL_APP_ID_IOS : ONESIGNAL_APP_ID_ANDROID

OneSignal.setAppId(oneSignalAppId)
OneSignal.setEmail(ONESIGNAL_APP_EMAIL)

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold })

  tagUserInfoCreate()

  useEffect(() => {
    const unsubscribe = OneSignal.setNotificationOpenedHandler((response) => {
      const { actionId } = response.action as any

      switch (actionId) {
        case '1':
          return console.log('Ver todas')
        case '2':
          return console.log('Ver pedido')
        default:
          return console.log('Não foi clicado em botão de ação')
      }
    })

    return () => unsubscribe
  }, [])

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <CartContextProvider>
        {fontsLoaded ? <Routes /> : <Loading />}
      </CartContextProvider>
    </NativeBaseProvider>
  )
}
