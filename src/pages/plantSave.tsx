import React, { useState } from "react";

import { useRoute } from "@react-navigation/core";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View, Text, Image, Platform, Alert } from "react-native";
import { getBottomSpace } from "react-native-iphone-x-helper";
import { SvgFromUri } from "react-native-svg";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import DateTimePicker, { Event } from "@react-native-community/datetimepicker";
import { format, isBefore } from "date-fns";

import waterDrop from '../../assets/waterdrop.png'

import { Button } from "../components/button";

import colors from "../styles/colors";
import fonts from "../styles/fonts";

import { PlantProps, savePlant } from "../libs/storage";


interface Params {
  plant: PlantProps
}

export function PlantSave() {

  const [selectedDateTime, setSelectedDateTime] = useState(new Date())
  const [showDatePicker, setShowDatePicker] = useState(Platform.OS == 'ios')

  const route = useRoute()
  const navigation = useNavigation()

  const { plant } = route.params as Params

  function handleChangeTime(event: Event, dateTime: Date | undefined) {
    if (Platform.OS === 'android') {
      setShowDatePicker(oldState => !oldState)
    }

    if (dateTime && isBefore(dateTime, new Date)) {
      setSelectedDateTime(new Date())
      return Alert.alert("Escolha uma Hora no futuro!")
    }

    if (dateTime) {
      setSelectedDateTime(dateTime)
    }

    console.log(selectedDateTime);

  }

  function handleOpenDateTimePickerForAndroid() {
    setShowDatePicker(oldState => !oldState)
  }

  async function handleSavePlant() {
    try {
      await savePlant({
        ...plant,
        dateTimeNotification: selectedDateTime
      })


      navigation.navigate("Confirmation", {
        title: 'Tudo certo',
        subtitle: 'Fique tranquilo que sempre vamos lembrar você de cuidar da sua plantinha com bastante amor.',
        icon: 'hug',
        buttonTitle: 'Muito obrigado :D',
        nextScreen: 'MyPlants'
      })
    } catch {
      Alert.alert('nao foi possivel salvar')
    }
  }

  return (

    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={style.container}
    >
      <View style={style.container}>

        <View style={style.plantInfo}>

          <SvgFromUri uri={plant.photo} />
          <Text style={style.plantName}>{plant.name}</Text>
          <Text style={style.plantAbout}>{plant.about}</Text>

        </View>

        <View style={style.controller}>

          <View style={style.tipController}>
            <Image source={waterDrop} style={style.tipImage} />
            <Text style={style.tipText}>
              {plant.water_tips}
            </Text>
          </View>


          <Text style={style.alertLabel}>Escolha o melhor horário para ser lembrado:</Text>

          {
            showDatePicker && (
              <DateTimePicker
                value={selectedDateTime}
                mode="time"
                display='default'
                onChange={handleChangeTime}
              />
            )
          }

          {
            Platform.OS == 'android' && (
              <View style={style.SelectTimePicker}>
                <TouchableOpacity
                  style={style.SelectTimePickerButton}
                  onPress={handleOpenDateTimePickerForAndroid}
                >
                  <Text style={style.selectDateTimePickerTimeText}>
                    Selecione o horario:
                  </Text>
                  <Text style={style.selectDateTimePickerTime}>
                    {`${format(selectedDateTime, 'HH:mm')}`}
                  </Text>
                </TouchableOpacity>
              </View>
            )
          }

          <Button title="Cadastrar planta" onPress={handleSavePlant} />

        </View>
      </View>
    </ScrollView>

  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: colors.shape
  },
  plantInfo: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  plantName: {
    fontFamily: fonts.heading,
    fontSize: 24,
    color: colors.heading,
    marginTop: 15
  },
  plantAbout: {
    textAlign: 'center',
    fontFamily: fonts.text,
    color: colors.heading,
    fontSize: 17,
    marginTop: 10
  },
  controller: {
    flex: 1,
    justifyContent: 'space-around',
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: getBottomSpace() || 20
  },
  tipController: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.blueLight,
    padding: 20,
    position: "relative",
    bottom: 60,
    borderRadius: 16
  },
  tipImage: {
    width: 56,
    height: 56
  },
  tipText: {
    flex: 1,
    marginLeft: 20,
    fontFamily: fonts.text,
    color: colors.blue,
    fontSize: 17,
    textAlign: 'justify'
  },
  alertLabel: {
    textAlign: 'center',
    fontFamily: fonts.complement,
    color: colors.heading,
    fontSize: 12,
    marginBottom: 5
  },
  SelectTimePicker: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  SelectTimePickerButton: {
    width: 300,
    height: 80,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectDateTimePickerTimeText: {
    color: colors.heading,
    fontSize: 24,
    fontFamily: fonts.text
  },
  selectDateTimePickerTime: {
    backgroundColor: colors.shape,
    marginLeft: 10,
    padding: 10,
    color: colors.heading,
    fontSize: 24,
    fontFamily: fonts.text,
    borderRadius: 18

  }
})