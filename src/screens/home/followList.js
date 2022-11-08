import { Avatar, Colors, Text, TouchableOpacity } from "react-native-ui-lib";
import { FlatList, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";

import { Icons } from "@app/components";
import apiKit from "@app/apiKit";
import globalStyles from "@app/constants/globalStyles";

export default function FollowList({ navigation, route }) {
  const { title = "", listAPI = "" } = route?.params ?? {};

  const [userList, setUserList] = useState([]);

  useEffect(() => {
    navigation?.setOptions({ title: title });

    const formattedURL = listAPI?.split("{")[0];

    apiKit
      .get(formattedURL, {})
      .then((res) => setUserList(res?.data))
      .catch((err) => {
        console.error(err);
        setUserList();
      });
  }, [title, listAPI]);

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
          <Icons
            iconSet="MaterialCommunityIcons"
            name="chevron-right"
            size={18}
            color={Colors.listItemBorder}
          />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles?.mainContainer}>
      <FlatList
        data={userList}
        renderItem={RenderListItem}
        keyExtractor={(item) => item?.login?.toString()}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={styles?.flatList}
        contentContainerStyle={{ flexGrow: 1 }}
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
    flatList: { flex: 1, width: "100%" },
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
    listItemInfoSection: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginLeft: 8,
      flex: 1,
    },
    listItemName: { fontWeight: "600", fontSize: 14 },
  },
]);
