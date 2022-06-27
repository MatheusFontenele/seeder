import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  Image
} from "react-native";

import EmojiConfirmation from '../../assets/EmojiConfirmation.png'
import EmojiConfirmation2 from '../../assets/EmojiConfirmation2.png'


import { Button } from "../components/button";
import colors from "../styles/colors";
import fonts from "../styles/fonts";

interface Params {
  title: string
  subtitle: string
  buttonTitle: string
  icon: 'smile' | 'hug'
  nextScreen: string
}

const emojis = {
  hug: EmojiConfirmation2,
  smile: EmojiConfirmation
}

export function Confimation() {

  const navigation = useNavigation()
  const routes = useRoute()

  const {
    title,
    subtitle,
    icon,
    buttonTitle,
    nextScreen
  } = routes.params as Params

  function handleStart() {
    navigation.navigate(nextScreen)
  }

  return (
    <SafeAreaView style={style.container}>
      <View style={style.content}>
        <Image
          source={emojis[icon]}
        />

        <View style={style.TextArea}>
          <Text style={style.TextTitle}>
            {title}
          </Text>
          <Text style={style.TextSubTitle}>
            {subtitle}
          </Text>
        </View>
        <View style={style.ButtonArea}>
          <Button title={buttonTitle} onPress={handleStart} />
        </View>
      </View>
    </SafeAreaView>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40
  },
  TextArea: {
    marginTop: 64,
    marginBottom: 40,
    alignItems: 'center'
  },
  TextTitle: {
    fontFamily: fonts.heading,
    fontSize: 24,
    color: colors.heading,

  },
  TextSubTitle: {
    color: colors.heading,
    fontFamily: fonts.text,
    fontSize: 17,
    textAlign: 'center',
    lineHeight: 24,
    marginTop: 16
  },
  ButtonArea: {
    width: '100%',
  }
})