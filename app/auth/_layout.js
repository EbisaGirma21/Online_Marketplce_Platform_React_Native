import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

export default function page() {
  return (
    <Stack>
      <Stack.Screen name="signin" options={{ headerTitle: "Sign in" }} />
      <Stack.Screen
        name="signup"
        options={{
          headerTitle: "Sign up",
        }}
      />
    </Stack>
  );
}
