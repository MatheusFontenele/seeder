import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";

import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  FlatList,
  ActivityIndicator
} from 'react-native'
import { EnviromentButton } from "../components/EnviromentButton";


import { Header } from "../components/Header";
import { Load } from "../components/load";
import { PlantCardPrimary } from "../components/PlantCardPrimary";
import { PlantProps } from "../libs/storage";
import api from "../services/api";

import colors from "../styles/colors";
import fonts from "../styles/fonts";

interface EnvorimentProps {
  key: string,
  title: string
}



export function PlantSelect() {

  const [environments, setenvironments] = useState<EnvorimentProps[]>([])
  const [plants, setPlants] = useState<PlantProps[]>([])
  const [FilteredPlants, setFilteredPlants] = useState<PlantProps[]>([])
  const [environmentSelected, setEnvironmentselected] = useState('all')

  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [loadingMore, setLoadingMore] = useState(false)

  const navigation = useNavigation()


  async function fetchPlants() {
    const { data } = await api.get('plants', {
      params: {
        _sort: 'name',
        _order: 'asc',
        _page: `${page}`,
        _limit: 8
      }
    })

    if (!data) {
      return setLoading(true)
    }
    if (page > 1) {
      setPlants(oldValue => [...oldValue, ...data])
      setFilteredPlants(oldValue => [...oldValue, ...data])
    } else {
      setPlants(data)
      setFilteredPlants(data)
    }
    setLoading(false)
    setLoadingMore(false)
  }

  function handleEnvironmentselected(environment: string) {
    setEnvironmentselected(environment)

    if (environment == 'all')
      return setFilteredPlants(plants)

    const filtered = plants.filter(plant => plant.environments.includes(environment))

    setFilteredPlants(filtered)

  }

  function handleFetchMore(distance: number) {
    if (distance < 1) {
      return
    }
    setLoadingMore(true)
    setPage(oldValue => oldValue + 1)
    fetchPlants()
  }

  function handlePlantSelect(plant: PlantProps) {
    navigation.navigate('PlantSave', { plant })
  }

  useEffect(() => {
    async function fetchEnviroment() {
      const { data } = await api.get('plants_environments', {
        params: {
          _sort: 'title',
          _order: 'asc'
        }
      })
      setenvironments([
        {
          key: 'all',
          title: 'Todos'
        },
        ...data
      ])
    }
    fetchEnviroment()
  }, [])

  useEffect(() => {
    fetchPlants()
  }, [])



  if (loading)
    return <Load />
  return (
    <SafeAreaView style={style.container}>
      <View style={style.content}>

        <View style={style.headerArea}>
          <Header />
          <View style={style.titleArea}>

            <Text style={style.title1}>
              Em qual ambiente
            </Text>
            <Text style={style.title2}>
              voce quer colocar sua planta?
            </Text>
          </View>
        </View>

        <View style={style.placeButtonArea}>

          <FlatList
            data={environments}
            //keyExtractor={(item) => String(item.key)}
            renderItem={({ item }) => (
              <EnviromentButton
                title={item.title}
                active={item.key === environmentSelected}
                onPress={() => handleEnvironmentselected(item.key)}
              />
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={style.environmentArea}
          />

        </View>

        <View style={style.PlantCardArea}>

          <FlatList
            data={FilteredPlants}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <PlantCardPrimary
                data={item}
                onPress={() => handlePlantSelect(item)}
              />
            )}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            onEndReachedThreshold={.1}
            onEndReached={({ distanceFromEnd }) => handleFetchMore(distanceFromEnd)}
            ListFooterComponent={
              loadingMore ? <ActivityIndicator
                color={colors.green}
              /> : <></>
            }
          />

        </View>

      </View>
    </SafeAreaView>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 50
  },
  content: {
    flex: 1,
  },
  headerArea: {
    paddingHorizontal: 30
  },
  titleArea: {
    paddingVertical: 20
  },
  title1: {
    fontFamily: fonts.title,
    fontSize: 17,
    lineHeight: 23,
    color: colors.heading
  },
  title2: {
    fontFamily: fonts.text,
    fontSize: 17
  },
  placeButtonArea: {
    paddingVertical: 14,
    width: "100%"
  },
  environmentArea: {
    height: 40,
    justifyContent: 'center',
    marginLeft: 32
  },
  PlantCardArea: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: 'center'
  },

})