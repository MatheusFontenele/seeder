import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
} from 'react-native'

import { RectButton, RectButtonProps } from 'react-native-gesture-handler'
import colors from '../styles/colors'
import fonts from '../styles/fonts'

interface EnviromentsButtonProps extends RectButtonProps {
  title: string,
  active?: boolean
}

export function EnviromentButton({
  title,
  active = false,
  ...rest
}: EnviromentsButtonProps) {
  return (
    <RectButton
      style={[styles.EnviromentButton, active && styles.containerActive]}
      {...rest}
    >
      <Text style={[styles.EnviromentText, active && styles.EnviromentTextActive]}>
        {title}
      </Text>
    </RectButton>
  )
}

const styles = StyleSheet.create({
  EnviromentButton: {
    backgroundColor: colors.shape,
    height: 40,
    width: 76,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    marginHorizontal: 10
  },
  containerActive: {
    backgroundColor: colors.greenLight
  },
  EnviromentText: {
    fontFamily: fonts.text,
    color: colors.heading
  },
  EnviromentTextActive: {
    fontFamily: fonts.heading,
    color: colors.greenDark
  }
})