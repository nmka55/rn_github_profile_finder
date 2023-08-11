import {
  Avatar,
  Colors,
  Text,
  TouchableOpacity,
  View,
} from 'react-native-ui-lib';

import {HomeStackParamList} from '@app/navigators/types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ProfileData} from '@app/screens/types';
import React from 'react';
import {StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

type ProfileCard = {
  data: ProfileData | undefined;
};

type BtnPressParam = {
  listAPI: string;
  title: string;
};

function ProfileCard({data}: ProfileCard): JSX.Element {
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

  const {
    avatar_url = '',
    login = '',
    name = '',
    bio = '',
    followers = 0,
    following = 0,
    followers_url = '',
    following_url = '',
  } = data ?? {};

  const onBtnPress = React.useCallback(
    ({listAPI, title}: BtnPressParam) => {
      navigation?.push('FollowList', {
        listAPI,
        title,
      });
    },
    [navigation],
  );

  return (
    <View style={styles?.profile}>
      <Avatar
        source={{
          uri: avatar_url,
        }}
        name={login}
        size={56}
      />

      <View style={styles?.listItemInfoSection}>
        <Text style={styles?.listItemName}>{name}</Text>
        <Text style={styles?.listItemLogin}>@{login}</Text>
        <Text style={styles?.listItemBio}>{bio}</Text>

        <View style={styles?.listItemButtonRow}>
          <TouchableOpacity
            disabled={following === 0}
            style={styles?.listItemFollowBtn}
            onPress={() =>
              onBtnPress({
                listAPI: following_url,
                title: `${login}'s followings`,
              })
            }>
            <Text style={styles?.listItemBtnText}>{following} following</Text>
          </TouchableOpacity>

          <TouchableOpacity
            disabled={followers === 0}
            style={styles?.listItemFollowBtn}
            onPress={() =>
              onBtnPress({
                listAPI: followers_url,
                title: `${login}'s followers`,
              })
            }>
            <Text style={styles?.listItemBtnText}>{followers} followers</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default React.memo(ProfileCard);

const styles = StyleSheet.create({
  profile: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors?.$backgroundPrimaryLight,
    borderRadius: 20,
    backgroundColor: Colors?.$backgroundPrimary + '40',
    padding: 8,
  },

  listItemInfoSection: {flex: 1, paddingLeft: 8},
  listItemName: {fontWeight: '600', fontSize: 14, color: Colors?.$textPrimary},
  listItemLogin: {
    fontWeight: '600',
    fontSize: 12,
    color: Colors?.$textDefault,
    marginTop: 4,
  },
  listItemBio: {
    fontWeight: '400',
    fontSize: 12,
    color: Colors?.$textGeneral,
    marginTop: 4,
  },
  listItemButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  listItemFollowBtn: {
    flex: 1,
    padding: 8,
    backgroundColor: Colors?.$backgroundGeneralLight,
    borderRadius: 10,
    marginLeft: 8,
    alignItems: 'center',
  },
  listItemBtnText: {fontWeight: '300', fontSize: 12},
});
