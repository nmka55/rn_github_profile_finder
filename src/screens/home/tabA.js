import { Button, ScrollView, View } from "react-native";
import { FormProvider, useForm } from "react-hook-form";
import {
  RHFCheckbox,
  RHFDatePicker,
  RHFPicker,
  RHFTextInput,
} from "@app/components";

import React from "react";
import { useSelector } from "react-redux";

export default function TabA({ navigation }) {
  const userData = useSelector((state) => state?.user?.userData ?? {});

  const form = useForm({
    defaultValues: userData,
  });

  const onEndEditingUsername = (formValue) => {
    console.log(formValue);
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between",
        padding: 16,
        backgroundColor: "#FAFAFA",
      }}
    >
      <FormProvider {...form}>
        <RHFTextInput
          name="searchQuery"
          placeholder="GitHub username"
          rules={{
            required: "Enter GitHub username you want to search please!",
          }}
          returnKeyType="search"
          onEndEditing={() => form.handleSubmit(onEndEditingUsername)()}
        />
      </FormProvider>

      <ScrollView
        style={{ flex: 1, marginTop: 16 }}
        contentContainerStyle={{ flexGrow: 1, backgroundColor: "lightpink" }}
      >
        <View></View>
      </ScrollView>
      {/* <Button onPress={onLogoutPress} title={`Logout`} /> */}
    </View>
  );
}
