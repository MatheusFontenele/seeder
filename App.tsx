import React, { useEffect } from 'react';
import * as Notification from 'expo-notifications'

import AppLoading from 'expo-app-loading';

import {
  useFonts,
  Jost_400Regular,
  Jost_600SemiBold,
  Jost_700Bold,
  Jost_500Medium
} from '@expo-google-fonts/jost'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Routes from './src/routes';

import { PlantProps, RemovePlant } from './src/libs/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();


export default function App() {

  //#region lidando com notficacoes
  // useEffect(() => {
  //   //quando notificar, os dados da planta que foi agendado, aparece
  //   // const subscription = Notification.addNotificationReceivedListener(
  //   //   async notification => {
  //   //     const data = notification.request.content.data.plant as PlantProps
  //   //     console.log(data.id, data.name);
  //   //   }
  //   // )
  //   // return () => subscription.remove()

  //   async function notifications() {
  //     //apaga todas as notificacoes agendadas
  //     //await Notification.cancelAllScheduledNotificationsAsync()

  //     // verifica todas as notificacoes
  //     // const data = await Notification.getAllScheduledNotificationsAsync()
  //     // console.log('############## NOTIFICACOES AGENDADAS ##############');
  //     // console.log(data);

  //   }

  //   notifications()

  // }, [])
  //#endregion

  const [fontsLoaded] = useFonts({
    Jost_400Regular,
    Jost_500Medium,
    Jost_600SemiBold,
    Jost_700Bold
  })

  if (!fontsLoaded) {
    return (
      <AppLoading />
    )
  }



  return (
    <Routes />
  );
}

