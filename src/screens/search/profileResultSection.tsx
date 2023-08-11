import {Colors, Text, View} from 'react-native-ui-lib';

import {ProfileCard} from '@app/components/cards';
import {ProfileData} from '../types';
import React from 'react';
import {StyleSheet} from 'react-native';

type ProfileResult = {
  data: ProfileData | undefined;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
};
export default function ProfileResult({
  data,
  isError,
  isSuccess,
  isLoading,
}: ProfileResult): JSX.Element {
  if (!data) {
    const emptyText = isLoading
      ? 'Searching...'
      : !isSuccess && isError
      ? 'No user found'
      : !isSuccess && !isError && !isLoading && !data
      ? 'Nothing to show yet! Start typing username to see results :)'
      : 'hmm.... Strange.';

    return (
      <View style={styles?.noResultView}>
        <Text font14>{emptyText}</Text>
      </View>
    );
  } else {
    return <ProfileCard data={data} />;
  }
}

const styles = StyleSheet.create({
  noResultView: {
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors?.$backgroundPrimary + '40',
  },
});
