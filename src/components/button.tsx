import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  TouchableOpacityProps
} from 'react-native'
import colors from "../styles/colors";
import fonts from "../styles/fonts";

interface buttonProps extends TouchableOpacityProps {
  title: string
}

export function Button({ title, ...rest }: buttonProps) {
  return (
    <TouchableOpacity style={styles.button} {...rest}>
      <Text style={styles.buttonText}>
        {title}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.green,

    height: 56,

    borderRadius: 16,

    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: colors.white,
    fontFamily: fonts.heading,
    fontSize: 17
  }
})
