import React from "react";

import { StyleSheet, View } from "react-native";
import LottieView from 'lottie-react-native'

import LoadAnimation from '../../assets/plant.json'

export function Load() {
  return (
    <View style={style.container}>
      <LottieView
        source={LoadAnimation}
        autoPlay
        loop
        style={style.animation}
      />
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  animation: {
    backgroundColor: 'transparent',
    width: 200,
    height: 200
  }
})