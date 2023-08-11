import React, {useEffect} from 'react';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';

import {FlatList} from 'react-native';
import {HomeStackParamList} from '@app/navigators/types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ProfileItem} from '@app/components/listItems';
import {StyleSheet} from 'react-native';
import {UserData} from '@screens/types';
import {View} from 'react-native-ui-lib';
import {axiosInstance} from '@app/components';
import globalStyles from '@app/constants/globalStyles';
import {useMutation} from '@tanstack/react-query';

export default function FollowList(): JSX.Element {
  const {params} = useRoute<RouteProp<HomeStackParamList, 'FollowList'>>();
  const {listAPI = '', title = ''} = params ?? {};

  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

  // #region Fetch
  const fetchList = (url: string): Promise<UserData[]> =>
    axiosInstance.get(url, {}).then(response => response.data);

  const {data, mutate} = useMutation({
    mutationFn: fetchList,
  });
  //#endregion

  useEffect(() => {
    navigation?.setOptions({
      title: title,
    });
  }, [title, navigation]);

  useEffect(() => {
    const formattedURL = listAPI?.split('{')[0];

    mutate(formattedURL);
  }, [mutate, listAPI]);

  return (
    <View style={styles?.containerBase}>
      <FlatList
        data={data}
        renderItem={({item, index}) => <ProfileItem item={item} key={index} />}
        keyExtractor={item => item?.login}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={styles?.flatList}
        contentContainerStyle={{flexGrow: 1}}
      />
    </View>
  );
}

const styles: any = StyleSheet.flatten([
  globalStyles,
  StyleSheet.create({
    flatList: {
      flex: 1,
      width: '100%',
    },
  }),
]);
