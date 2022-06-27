import { Feather } from "@expo/vector-icons";
import React from "react";

import { StyleSheet, View, Image, Text, Animated } from "react-native";
import { RectButtonProps, RectButton } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { SvgFromUri } from "react-native-svg";

import colors from "../styles/colors";
import fonts from "../styles/fonts";

interface PlantProps extends RectButtonProps {
  data: {
    name: string
    photo: string,
    hour: string
  }
  handleRemove: () => void
}

export const PlantCardSecundary = ({ data, handleRemove, ...rest }: PlantProps) => {
  return (
    <Swipeable
      overshootRight={false}
      renderRightActions={() => (
        <Animated.View>
          <View>
            <RectButton
              style={styles.buttonRemove}
              onPress={handleRemove}
            >
              <Feather
                name='trash'
                size={32}
                color={colors.white}
              />
            </RectButton>
          </View>
        </Animated.View>
      )}
    >
      <RectButton style={styles.container} {...rest}>
        <SvgFromUri uri={data.photo} width={50} height={50} />
        <Text style={styles.plantName}>
          {data.name}
        </Text>
        <View style={styles.details}>
          <Text style={styles.timeLabel}>
            Regar as
          </Text>
          <Text style={styles.time}>
            {data.hour}
          </Text>
        </View>
      </RectButton>
    </Swipeable>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 25,
    borderRadius: 20,
    backgroundColor: colors.shape,
    marginVertical: 5
  },
  plantName: {
    flex: 1,
    marginLeft: 10,
    fontFamily: fonts.heading,
    fontSize: 17,
    color: colors.heading
  },
  details: {
    alignItems: 'flex-end'
  },
  timeLabel: {
    fontSize: 16,
    fontFamily: fonts.text,
    color: colors.bodyLight
  },
  time: {
    marginTop: 5,
    fontSize: 16,
    fontFamily: fonts.heading,
    color: colors.bodyDark
  },
  buttonRemove: {
    width: 150,
    height: 85,
    backgroundColor: colors.red,
    marginTop: 15,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    right: 20,
    paddingLeft: 10
  }
})