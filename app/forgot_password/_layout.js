import React from "react";
import { Stack } from "expo-router";

function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="confirm_email"
        options={{ headerTitle: "Confirm Email" }}
      />
      <Stack.Screen
        name="confirmation_code"
        options={{ headerTitle: "Confirmation Code" }}
      />
      <Stack.Screen
        name="change_password"
        options={{ headerTitle: "Change Password" }}
      />
    </Stack>
  );
}

export default Layout;
