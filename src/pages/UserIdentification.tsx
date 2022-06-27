import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from 'react-native'

import AsyncStorage from "@react-native-async-storage/async-storage";

import emojiImg from '../../assets/Emoji.png'
import emojiImg2 from '../../assets/Emoji2.png'

import { Button } from "../components/button";

import colors from "../styles/colors";
import fonts from "../styles/fonts";

export function UserIdentification() {

  const [isFocused, setIsFocused] = useState(false)
  const [isFilled, setIsFilled] = useState(false)
  const [name, setName] = useState<string>()

  const navigation = useNavigation()

  async function handleSubmit() {
    if (!name)
      return Alert.alert('Desculpe, preciso saber como se chama 😔.')

    try {
      await AsyncStorage.setItem('@plantmananger:user', name)

      navigation.navigate("Confirmation", {
        title: 'Prontinho',
        subtitle: 'Agora vamos começar a cuidar das suas plantinhas com muito cuidado.',
        icon: 'smile',
        buttonTitle: 'Comecar',
        nextScreen: 'PlantSelect'
      })
    } catch {
      return Alert.alert('Nao foi possivel salvar o seu nome')

    }
  }

  function handleInputBlur() {
    setIsFocused(false)
    setIsFilled(!!name)
  }

  function handleInputFocus() {
    setIsFocused(true)
  }

  function handleInputChange(value: string) {
    setIsFilled(!!value)
    setName(value)
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.content}>

            <View style={styles.form}>

              <View style={styles.header}>
                {isFilled ?
                  <Image
                    source={emojiImg2}
                    style={styles.emoji}
                  /> :
                  <Image
                    source={emojiImg}
                    style={styles.emoji}
                  />
                }
                <Text style={styles.centerText}>
                  Como Podemos{'\n'}
                  chamar voce?
                </Text>
              </View>

              <TextInput
                style={[
                  styles.input,
                  (isFocused || isFilled) && { borderColor: colors.green }
                ]}
                placeholder='Digite um nome'
                onBlur={handleInputBlur}
                onFocus={handleInputFocus}
                onChangeText={handleInputChange}
              />

              <View style={styles.footer}>
                <Button title="Confirmar" onPress={handleSubmit} />
              </View>

            </View>

          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center'

  },
  content: {
    flex: 1,
    width: '100%'
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 54
  },
  header: {
    alignItems: 'center'
  },
  emoji: {
  },
  centerText: {
    fontSize: 24,
    lineHeight: 32,
    fontFamily: fonts.heading,
    textAlign: 'center',
    marginTop: 24
  },
  input: {
    borderBottomWidth: 1,
    borderColor: colors.gray,
    color: colors.heading,
    width: '100%',
    fontSize: 18,
    marginVertical: 50,
    padding: 10,
    textAlign: 'center'
  },
  footer: {
    width: '100%',
    paddingHorizontal: 50
  }

})