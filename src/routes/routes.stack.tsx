import React from "react";

import { createStackNavigator } from '@react-navigation/stack'
import colors from "../styles/colors";

import { Welcome } from "../pages/welcome";
import { UserIdentification } from "../pages/UserIdentification";
import { Confimation } from "../pages/confimation";
import { PlantSelect } from "../pages/PlantSelect";
import { PlantSave } from "../pages/plantSave";
import { MyPlants } from "../pages/MyPlants";
import AuthRoutes from "./tabs.routes";

const stackRoutes = createStackNavigator()

const AppRoutes: React.FC = () => {
  return (
    <stackRoutes.Navigator
      screenOptions={{
        cardStyle: {
          backgroundColor: colors.white
        },
        headerShown: false
      }}
    >
      <stackRoutes.Screen name="Welcome" component={Welcome} />
      <stackRoutes.Screen name="UserIdentification" component={UserIdentification} />
      <stackRoutes.Screen name="Confirmation" component={Confimation} />
      <stackRoutes.Screen name="PlantSelect" component={AuthRoutes} />
      <stackRoutes.Screen name="PlantSave" component={PlantSave} />
      <stackRoutes.Screen name="MyPlants" component={AuthRoutes} />


    </stackRoutes.Navigator>
  )
}

export default AppRoutes