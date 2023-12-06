import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import Navbar from "../components/shared/Navbar";

export default function _layout() {
  return (
    <Stack >
      <Stack.Screen name="(tabs)" options={{ header: () => <Navbar /> }} />
      <Stack.Screen name="(dashboard)" options={{ headerShown: false }} />
      <Stack.Screen name="auth" options={{ headerShown: false }} />
    </Stack>
  );
}
