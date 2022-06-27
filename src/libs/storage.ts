import AsyncStorage from "@react-native-async-storage/async-storage";
import { format } from "date-fns";
import * as Notification from 'expo-notifications'

export interface PlantProps {
  id: string
  name: string
  about: string
  photo: string
  environments: [string]
  frequency: {
    times: number
    repeat_every: string
  }
  water_tips: string
  dateTimeNotification: Date
}

export interface StoragePlantProps {
  [id: string]: {
    data: PlantProps,
    notificationId: string
  }
}

export async function savePlant(plant: PlantProps): Promise<void> {
  try {

    const nextTime = new Date(plant.dateTimeNotification)
    const now = new Date()
    const data = await AsyncStorage.getItem('@plantmananger:plants')
    const oldPlants = data ? (JSON.parse(data) as StoragePlantProps) : {}

    const { repeat_every, times } = plant.frequency
    if (repeat_every === 'week') {
      const interval = Math.trunc(7 / times)
      nextTime.setDate(now.getDate() + interval)
    }
    else {
      nextTime.setDate(nextTime.getDate() + 1)
    }

    const seconds = Math.abs(
      Math.ceil(now.getTime() - nextTime.getTime()) / 1000
    )

    const notificationId = await Notification.scheduleNotificationAsync({
      content: {
        title: 'Heey, 🌱',
        body: `Esta na hora de cuidar da sua ${plant.name}`,
        sound: true,
        priority: Notification.AndroidNotificationPriority.HIGH,
        data: {
          plant
        },
      },
      trigger: {
        seconds: seconds < 60 ? 60 : seconds,
        repeats: true
      }
    })

    //console.log(notificationId);


    const newPlant = {
      [plant.id]: {
        data: plant,
        notificationId
      }
    }

    await AsyncStorage.setItem('@plantmananger:plants',
      JSON.stringify({
        ...newPlant,
        ...oldPlants
      })
    )

    console.log(plant.dateTimeNotification);

  } catch (error) {
    throw new Error(error);
  }
}

export async function loadPlant(): Promise<PlantProps[]> {
  try {
    const data = await AsyncStorage.getItem('@plantmananger:plants')
    const plants = data ? (JSON.parse(data) as StoragePlantProps) : {}

    const plantSorted = Object
      .keys(plants)
      .map((plant) => {
        return {
          ...plants[plant].data,
          hour: format(new Date(plants[plant].data.dateTimeNotification), 'HH:mm')
        }
      })
      .sort((a, b) =>
        Math.floor(
          new Date(a.dateTimeNotification).getTime() / 1000 -
          Math.floor(new Date(b.dateTimeNotification).getTime() / 1000)
        )
      )

    return plantSorted

  } catch (error) {
    throw new Error(error);
  }
}

export async function RemovePlant(id: string): Promise<void> {
  const data = await AsyncStorage.getItem('@plantmananger:plants')
  const plants = data ? (JSON.parse(data) as StoragePlantProps) : {}

  await Notification.cancelScheduledNotificationAsync(plants[id].notificationId)
  delete plants[id]

  await AsyncStorage.setItem(
    '@plantmananger:plants',
    JSON.stringify(plants)
  )

}





