import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import "react-native-gesture-handler";

import SelectedScreen from "./screens/SelectedScreen";
import AllScreen from "./screens/AllScreen";
import RandomScreen from "./screens/RandomScreen";
import SearchScreen from "./screens/SearchScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Selected">
        <Stack.Screen name="Selected" component={SelectedScreen} />
        <Stack.Screen name="All" component={AllScreen} />
        <Stack.Screen name="Random" component={RandomScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
