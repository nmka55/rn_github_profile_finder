import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import TabA from "@app/screens/home/tabA";
import TabADetails from "@app/screens/home/tabADetails";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

function HomeTabAStack() {
  const { Navigator, Screen } = createNativeStackNavigator();

  return (
    <Navigator initialRouteName="TabA">
      <Screen name="Search" component={TabA} />
      <Screen name="User details" component={TabADetails} />
    </Navigator>
  );
}

export default () => {
  return (
    <NavigationContainer>
      <HomeTabAStack />
    </NavigationContainer>
  );
};
