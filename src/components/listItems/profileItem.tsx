import {
  Avatar,
  Colors,
  Text,
  TouchableOpacity,
  View,
} from 'react-native-ui-lib';

import {HomeStackParamList} from '@app/navigators/types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet} from 'react-native';
import {UserData} from '@screens/types';
import globalStyles from '@app/constants/globalStyles';
import {useNavigation} from '@react-navigation/native';

type ProfleItemType = {
  item: UserData;
};

function ProfileItem({item}: ProfleItemType): JSX.Element {
  const {avatar_url = '', login = ''} = item ?? {};

  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

  return (
    <TouchableOpacity
      style={styles?.listItem}
      onPress={() => navigation?.push('Profile', {profileData: item})}>
      <Avatar
        source={{
          uri: avatar_url,
        }}
        name={login}
        size={56}
      />

      <View style={styles?.listItemInfoSection}>
        <Text style={styles?.listItemName}>{login}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default React.memo(ProfileItem);

const styles: any = StyleSheet.flatten([
  globalStyles,
  StyleSheet.create({
    listItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
      paddingBottom: 16,
      width: '100%',
      borderBottomWidth: 1,
      borderColor: Colors?.$outlinePrimary + '30',
    },
    listItemInfoSection: {marginLeft: 8, flex: 1},
  }),
]);
