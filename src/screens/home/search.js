import { Avatar, Colors, Text, TouchableOpacity } from "react-native-ui-lib";
import { FlatList, StyleSheet, View } from "react-native";
import { FormProvider, useForm } from "react-hook-form";
import { ProfileItem, RHFTextInput } from "@app/components";
import React, { useState } from "react";

import apiKit from "@app/apiKit";
import globalStyles from "@app/constants/globalStyles";

export default function Search({ navigation }) {
  const [userInfo, setUserInfo] = useState();
  const [userList, setUserList] = useState([]);

  const [hasMadeFirstSearch, setHasMadeFirstSearch] = useState(false);

  const [isRefreshing, setIsRefreshing] = useState(false);

  const form = useForm();

  const fetchData = async () => {
    const currentFormValues = form?.getValues();
    const { searchQuery = "" } = currentFormValues ?? {};

    if (!searchQuery) {
      return;
    }

    setIsRefreshing(true);

    apiKit
      ?.get(`users/${searchQuery}`)
      ?.then((res) => setUserInfo(res?.data))
      .catch((err) => {
        console.error(err);
        setUserInfo();
      });

    apiKit
      .get("search/users", {
        params: {
          q: searchQuery,
          sort: "followers",
          order: "desc",
        },
      })
      .then((res) => setUserList(res?.data?.items))
      .catch((err) => {
        console.error(err);
        setUserList();
      })
      .finally(() => setIsRefreshing(false));
  };

  const onEndEditingUsername = () => {
    if (!hasMadeFirstSearch) {
      setHasMadeFirstSearch(true);
    }

    setUserList();
    setUserInfo();

    fetchData();
  };

  const RenderListHeader = () => {
    if (userList?.length === 0 || isRefreshing) {
      return;
    }

    return (
      <View style={styles?.headerCompView}>
        <Text font14>People you may also know</Text>
      </View>
    );
  };

  const RenderListItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles?.listItem}
        onPress={() => navigation?.push("Profile", { profileData: item })}
      >
        <Avatar
          source={{
            uri: item?.avatar_url,
          }}
          name={item?.login}
          size={56}
        />

        <View style={styles?.listItemInfoSection}>
          <Text style={styles?.listItemName}>{item?.login}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const RenderProfileNotFound = () => {
    const emptyText = hasMadeFirstSearch
      ? "No user found"
      : "Nothing to show yet! Start typing username to see results :)";

    return (
      <View style={styles?.emptyCompView}>
        <Text center font12>
          {emptyText}
        </Text>
      </View>
    );
  };

  const RenderProfileInfo = () => {
    if (!userInfo) {
      return RenderProfileNotFound();
    }

    return <ProfileItem profileData={userInfo} />;
  };

  return (
    <View style={styles?.mainContainer}>
      <FormProvider {...form}>
        <RHFTextInput
          name="searchQuery"
          placeholder="GitHub username"
          returnKeyType="search"
          autoCapitalize="none"
          onEndEditing={() => form.handleSubmit(onEndEditingUsername)()}
          rules={{
            required: "Enter GitHub username you want to search please!",
          }}
        />
      </FormProvider>

      {RenderProfileInfo()}

      <FlatList
        data={userList}
        renderItem={RenderListItem}
        keyExtractor={(item) => item?.login?.toString()}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={styles?.flatList}
        contentContainerStyle={{ flexGrow: 1 }}
        ListHeaderComponent={RenderListHeader()}
        onRefresh={() => onEndEditingUsername()}
        refreshing={isRefreshing}
      />
    </View>
  );
}

const styles = StyleSheet.flatten([
  globalStyles,
  {
    mainContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "space-between",
      padding: 16,
      backgroundColor: Colors?.mainBackground,
    },
    flatList: { flex: 1, marginTop: 4, width: "100%" },
    listItem: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 16,
      paddingBottom: 16,
      width: "100%",
      borderBottomWidth: 1,
      borderColor: Colors?.listItemBorder,
    },
    listItemInfoSection: { marginLeft: 8, flex: 1 },
    listItemName: { fontWeight: "600", fontSize: 14 },
    listItemLogin: {
      fontWeight: "600",
      fontSize: 12,
      color: "gray",
      marginTop: 4,
    },
    listItemBio: {
      fontWeight: "400",
      fontSize: 12,
      color: "gray",
      marginTop: 4,
    },
    listItemButtonRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 8,
    },
    listItemFollowingBtn: {
      flex: 1,
      padding: 8,
      backgroundColor: "#C8FFD4",
      borderRadius: 8,
      marginRight: 8,
      alignItems: "center",
    },
    listItemFollowersBtn: {
      flex: 1,
      padding: 8,
      backgroundColor: "#B8E8FC",
      borderRadius: 8,
      marginLeft: 8,
      alignItems: "center",
    },
    listItemBtnText: { fontWeight: "300", fontSize: 12 },
    emptyCompView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    headerCompView: {
      marginBottom: 20,
    },
  },
]);
