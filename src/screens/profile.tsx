import {Button, Text, View} from 'react-native-ui-lib';
import React, {useEffect} from 'react';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';

import {HomeStackParamList} from '@app/navigators/types';
import {Linking} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ProfileCard} from '@app/components/cards';
import {ProfileData} from '@screens/types';
import {StyleSheet} from 'react-native';
import {axiosInstance} from '@app/components';
import globalStyles from '@app/constants/globalStyles';
import {useMutation} from '@tanstack/react-query';

export default function Profile(): JSX.Element {
  const {params} = useRoute<RouteProp<HomeStackParamList, 'Profile'>>();
  const {profileData} = params ?? {};
  const {url = '', login = ''} = profileData ?? {};

  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

  // #region Fetch
  const fetchProfile = (fetchURL: string): Promise<ProfileData> =>
    axiosInstance.get(fetchURL, {}).then(response => response.data);

  const {data, mutate} = useMutation({
    mutationFn: fetchProfile,
  });
  //#endregion

  useEffect(() => {
    navigation?.setOptions({
      title: `${login}'s profile`,
    });
  }, [login, navigation]);

  useEffect(() => {
    mutate(url);
  }, [mutate, url]);

  return (
    <View style={styles?.containerBase}>
      <View style={styles?.mainView}>
        <ProfileCard data={data} />

        <Text text14 marginV-8>
          Bio: {data?.bio ?? 'N/A'}
        </Text>

        <Text text14 marginV-8>
          Company: {data?.company ?? 'N/A'}
        </Text>

        <Text text14 marginV-8>
          Location: {data?.location ?? 'N/A'}
        </Text>
      </View>

      <Button
        marginV-8
        label={'View on GitHub'}
        onPress={() => Linking?.openURL(data?.html_url ?? '')}
      />
    </View>
  );
}

const styles: any = StyleSheet.flatten([
  globalStyles,
  StyleSheet.create({
    mainView: {
      flex: 1,
    },
  }),
]);
