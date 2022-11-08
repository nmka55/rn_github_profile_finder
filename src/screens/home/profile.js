import { Button, Colors, Text, View } from "react-native-ui-lib";
import {
  DateTimeFormatter,
  ProfileItem,
  RHFCheckbox,
  RHFDatePicker,
  RHFPicker,
  RHFTextInput,
} from "@app/components";
import { FormProvider, useForm } from "react-hook-form";
import { Linking, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";

import apiKit from "@app/apiKit";
import globalStyles from "@app/constants/globalStyles";
import { userLogin } from "@app/redux/actions";

export default function Profile({ navigation, route }) {
  const { profileData = {} } = route?.params ?? {};

  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    const { url = "", login = "" } = profileData;

    navigation?.setOptions({ title: `${login}'s profile ` });

    apiKit
      .get(url, {})
      .then((res) => setUserInfo(res?.data))
      .catch((err) => {
        console.error(err);
        setUserInfo();
      });
  }, [profileData]);

  return (
    <View style={styles?.mainContainer}>
      <ProfileItem profileData={userInfo} />

      {userInfo && (
        <View style={styles?.flex}>
          <Text font12>Company: {userInfo?.company}</Text>
          <Text font12>Email: {userInfo?.email}</Text>
          <Text font12>
            Joined on: {DateTimeFormatter(userInfo?.created_at ?? "")}
          </Text>
          <Text font12>Location: {userInfo?.location}</Text>
          <Text font12>Twitter: {userInfo?.twitter_username}</Text>
        </View>
      )}

      <Button
        fullWidth
        label={"View on GitHub"}
        size={Button.sizes.medium}
        style={{ marginBottom: 16 }}
        onPress={() => Linking?.openURL(userInfo?.html_url)}
      />
    </View>
  );
}

const styles = StyleSheet.flatten([
  globalStyles,
  {
    mainContainer: {
      flex: 1,
      justifyContent: "space-between",
      padding: 16,
      backgroundColor: Colors?.mainBackground,
    },
  },
]);
