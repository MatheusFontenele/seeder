import React from "react";

import { NavigationContainer } from '@react-navigation/native'

import StackRoutes from './routes.stack'

const Routes = () => {
  return (
    <NavigationContainer>
      <StackRoutes />
    </NavigationContainer>
  )
}

export default Routes