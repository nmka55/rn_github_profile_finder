import {Colors, Text, TouchableOpacity, View} from 'react-native-ui-lib';
import {FormProvider, useForm} from 'react-hook-form';
import {ProfileData, UserList} from '../types';
import {RHFTextField, axiosInstance} from '@app/components';

import {FlatList} from 'react-native';
import Icons from '@app/components/icons';
import {ProfileItem} from '@app/components/listItems';
import ProfileResult from './profileResultSection';
import React from 'react';
import {StyleSheet} from 'react-native';
import globalStyles from '@app/constants/globalStyles';
import {useMutation} from '@tanstack/react-query';

interface SearchFormType {
  query: string;
}

export default function Search(): JSX.Element {
  const form = useForm<SearchFormType>({});

  // #region Fetches
  const fetchProfile = (query: string): Promise<ProfileData> =>
    axiosInstance.get(`users/${query}`).then(response => response.data);

  const fetchUserList = (query: string): Promise<UserList> =>
    axiosInstance
      .get('search/users', {
        params: {
          q: query,
          sort: 'followers',
          order: 'desc',
        },
      })
      .then(response => response.data);

  //#endregion

  //#region Fetch hooks
  const {data: fetchProfileHookData, ...fetchProfileHook} = useMutation({
    mutationFn: fetchProfile,
  });

  const {data: fetchUserListHookData, ...fetchUserListHook} = useMutation({
    mutationFn: fetchUserList,
  });

  //#endregion

  //#region OnSearchClick event
  const onSearch = (formData: SearchFormType) => {
    fetchProfileHook.mutate(formData?.query);
    fetchUserListHook.mutate(formData?.query);
  };

  //#endregion

  const SearchButton = (
    <TouchableOpacity
      paddingH-16
      onPress={() => form?.handleSubmit(onSearch)()}>
      <Icons
        iconSet="MaterialDesignIcons"
        name="search"
        size={20}
        color={Colors?.$iconPrimary}
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles?.containerBase}>
      <FormProvider {...form}>
        <RHFTextField
          name="query"
          placeholder="GitHub username"
          rules={{required: 'Please enter username to search'}}
          returnKeyType="search"
          onEndEditing={() => form?.handleSubmit(onSearch)()}
          trailingAccessory={SearchButton}
          showTrailingAccessoryAlways={true}
        />
      </FormProvider>
      <Text marginV-8>Profile Details</Text>

      <ProfileResult
        data={fetchProfileHookData}
        isError={fetchProfileHook?.isError}
        isSuccess={fetchProfileHook?.isSuccess}
        isLoading={fetchProfileHook?.isLoading}
      />

      <View marginV-8>
        <Text font14>People you may also know</Text>
      </View>

      <FlatList
        data={fetchUserListHookData?.items}
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
