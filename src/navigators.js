import FollowList from "@app/screens/home/followList";
import { NavigationContainer } from "@react-navigation/native";
import Profile from "@app/screens/home/profile";
import React from "react";
import Search from "@app/screens/home/search";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

function StackNav() {
  const { Navigator, Screen } = createNativeStackNavigator();

  return (
    <Navigator initialRouteName="Search">
      <Screen name="Search" component={Search} />
      <Screen name="Profile" component={Profile} />
      <Screen name="FollowList" component={FollowList} />
    </Navigator>
  );
}

export default () => {
  return (
    <NavigationContainer>
      <StackNav />
    </NavigationContainer>
  );
};
