import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';

import FollowList from '@app/screens/followList';
import {HomeStackParamList} from './types';
import Profile from '@app/screens/profile';
import React from 'react';
import Search from '@app/screens/search';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useColorScheme} from 'react-native';

const HomeStack = (): JSX.Element => {
  const {Navigator, Screen} = createNativeStackNavigator<HomeStackParamList>();

  return (
    <Navigator initialRouteName="Search">
      <Screen name="Search" component={Search} />
      <Screen name="Profile" component={Profile} />
      <Screen name="FollowList" component={FollowList} />
    </Navigator>
  );
};

export default () => {
  const currentColorScheme = useColorScheme();
  const currentTheme = currentColorScheme === 'dark' ? DarkTheme : DefaultTheme;
  return (
    <NavigationContainer theme={currentTheme}>
      <HomeStack />
    </NavigationContainer>
  );
};
