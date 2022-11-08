import { Avatar, Text, TouchableOpacity } from "react-native-ui-lib";
import { StyleSheet, View } from "react-native";

import React from "react";
import globalStyles from "@app/constants/globalStyles";
import { useNavigation } from "@react-navigation/native";

export default function ProfileItem({ profileData = {} }) {
  const navigation = useNavigation();

  const {
    avatar_url = "",
    login = "",
    name = "",
    bio = "",
    followers = 0,
    following = 0,
    followers_url = "",
    following_url = "",
  } = profileData ?? {};

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
            style={styles?.listItemFollowingBtn}
            onPress={() =>
              navigation?.push("FollowList", {
                listAPI: following_url,
                title: `${login}'s followings`,
              })
            }
          >
            <Text style={styles?.listItemBtnText}>{following} following</Text>
          </TouchableOpacity>

          <TouchableOpacity
            disabled={followers === 0}
            style={styles?.listItemFollowersBtn}
            onPress={() =>
              navigation?.push("FollowList", {
                listAPI: followers_url,
                title: `${login}'s followers`,
              })
            }
          >
            <Text style={styles?.listItemBtnText}>{followers} followers</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.flatten([
  globalStyles,
  {
    profile: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 16,
      paddingBottom: 16,
      width: "100%",
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
  },
]);
