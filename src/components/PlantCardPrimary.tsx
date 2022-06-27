import React from "react";

import { StyleSheet, View, Image, Text } from "react-native";
import { RectButtonProps, RectButton } from "react-native-gesture-handler";
import { SvgFromUri } from "react-native-svg";

import colors from "../styles/colors";
import fonts from "../styles/fonts";

interface PlantProps extends RectButtonProps {
  data: {
    name: string
    photo: string
  }
}

export const PlantCardPrimary = ({ data, ...rest }: PlantProps) => {
  return (
    <RectButton style={styles.container} {...rest}>
      <SvgFromUri uri={data.photo} width={80} height={90} />
      <Text style={styles.plantName}>
        {data.name}
      </Text>
    </RectButton>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxWidth: '45%',
    backgroundColor: colors.shape,
    borderRadius: 20,
    paddingVertical: 10,
    alignItems: 'center',
    margin: 10
  },
  plantName: {
    color: colors.greenDark,
    fontFamily: fonts.heading,
    marginVertical: 16
  }
})