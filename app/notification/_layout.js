import React from "react";
import { Stack } from "expo-router";

function Layout() {
  return (
    <Stack>
      <Stack.Screen name="notify" options={{ headerTitle: "Notification" }} />
    </Stack>
  );
}

export default Layout;
