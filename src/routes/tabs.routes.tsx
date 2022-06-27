import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import colors from "../styles/colors";
import { PlantSelect } from "../pages/PlantSelect";
import { MaterialIcons } from "@expo/vector-icons";
import { MyPlants } from "../pages/MyPlants";

const AppTab = createBottomTabNavigator()

const AuthRoutes = () => {
  return (
    <AppTab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.green,
        tabBarInactiveTintColor: colors.heading,
        tabBarLabelPosition: 'beside-icon',
        tabBarStyle: {
          height: 70,
        },
        headerShown: false,
      }}
    >
      <AppTab.Screen
        name='Nova Planta'
        component={PlantSelect}
        options={{
          tabBarIcon: (({ color, size }) => (
            <MaterialIcons
              name="add-circle-outline"
              size={size}
              color={color}
            />
          ))
        }}
      />
      <AppTab.Screen
        name='Minhas Plantas'
        component={MyPlants}
        options={{
          tabBarIcon: (({ color, size }) => (
            <MaterialIcons
              name="format-list-bulleted"
              size={size}
              color={color}
            />
          ))
        }}
      />
    </AppTab.Navigator>


  )
}

export default AuthRoutes