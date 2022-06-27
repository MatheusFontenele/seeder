import React, { useEffect, useState } from "react";

import { StyleSheet, View, Image, Text, Alert } from "react-native";

import { Header } from "../components/Header";

import colors from "../styles/colors";

import waterDrop from '../../assets/waterdrop.png'
import { loadPlant, PlantProps, RemovePlant } from "../libs/storage";
import { formatDistance } from "date-fns";
import { pt } from "date-fns/locale";
import { FlatList } from "react-native-gesture-handler";
import fonts from "../styles/fonts";
import { PlantCardSecundary } from "../components/PlantCardSecundary";
import { Load } from "../components/load";


export function MyPlants() {

  const [MyPlants, setMyPlants] = useState<PlantProps[]>()
  const [Loading, setLoading] = useState(true)
  const [NextWatered, setNextWatered] = useState<string>()


  useEffect(() => {
    async function loadPlantStoraged() {
      const plantStoraged = await loadPlant()

      const nextTime = formatDistance(
        new Date(plantStoraged[0].dateTimeNotification).getTime(),
        new Date().getTime(),
        {
          locale: pt
        }
      )

      setNextWatered(
        `Nao esqueca de regar a ${plantStoraged[0].name} a ${nextTime}`
      )
      setMyPlants(plantStoraged)
      setLoading(false)
    }
    console.log(MyPlants);

    loadPlantStoraged()
  }, [])

  function handleRemove(plant: PlantProps) {
    Alert.alert('Remover', `Deseja remover a ${plant.name}?`, [
      {
        text: 'Nao 🙏',
        style: 'cancel'
      },
      {
        text: 'Sim 🥺',
        onPress: async () => {
          try {
            await RemovePlant(plant.id)
            setMyPlants((oldData) => (
              oldData.filter((item) => item.id !== plant.id)
            ))
          } catch (error) {
            Alert.alert('Nao foi possivel remover')
          }
        }
      }
    ])
  }

  if (Loading)
    return <Load />
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.spotlight}>
        <Image source={waterDrop} style={styles.spotlightImage} />

        <Text style={styles.spotlightText}>
          {NextWatered}
        </Text>
      </View>

      <View style={styles.myPlants}>
        <Text style={styles.plantsTitle}>
          Proximas Regadas
        </Text>
        <FlatList
          data={MyPlants}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <PlantCardSecundary
              data={item}
              handleRemove={() => handleRemove(item)}
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flex: 1 }}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingTop: 50,
    backgroundColor: colors.background
  },
  spotlight: {
    backgroundColor: colors.blueLight,
    paddingHorizontal: 20,
    borderRadius: 20,
    height: 110,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  spotlightImage: {
    width: 60,
    height: 60
  },
  spotlightText: {
    flex: 1,
    color: colors.blue,
    paddingHorizontal: 20,
    textAlign: 'justify',
    fontFamily: fonts.text
  },
  myPlants: {
    flex: 1,
    width: '100%'
  },
  plantsTitle: {
    fontSize: 24,
    fontFamily: fonts.heading,
    color: colors.heading,
    marginVertical: 20
  },

})