import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image
} from 'react-native'

import { getStatusBarHeight } from "react-native-iphone-x-helper";

import ImagePerfil from '../../assets/Perfil.png'
import colors from '../styles/colors'
import fonts from '../styles/fonts';


export function Header() {

  const [userName, setUserName] = useState<string>()

  useEffect(() => {
    async function loadStorageUserName() {
      const user = await AsyncStorage.getItem('@plantmananger:user')
      setUserName(user || '')
    }
    loadStorageUserName()
  }, [])

  return (
    <View style={styles.container}>
      <View>

        <Text style={styles.TextWelcome}>
          Ola,
        </Text>

        <Text style={styles.namePerfil}>
          {userName}
        </Text>

      </View>
      <Image source={ImagePerfil} style={styles.imagePerfil} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    marginTop: getStatusBarHeight()
  },
  TextWelcome: {
    fontFamily: fonts.text,
    fontSize: 32,
    lineHeight: 36,
    color: colors.heading
  },
  namePerfil: {
    fontFamily: fonts.heading,
    fontSize: 32,
    lineHeight: 45,
    color: colors.heading
  },
  imagePerfil: {
    width: 70,
    height: 70,
    borderRadius: 50,
  }
})