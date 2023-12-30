import React from "react";
import { Stack } from "expo-router";

function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, 
        
      }}
    >
      <Stack.Screen name="setting" options={{ headerTitle: "Setting" }} />
      <Stack.Screen
        name="personal_info"
        options={{ headerShown: true, headerTitle: "Personal Info" }}
      />
      <Stack.Screen
        name="change_email"
        options={{ headerShown: true, headerTitle: "Change Email" }}
      />
      <Stack.Screen
        name="change_password"
        options={{ headerShown: true, headerTitle: "Change Password" }}
      />
      <Stack.Screen
        name="delete_account"
        options={{ headerShown: true, headerTitle: "Delete Account" }}
      />
    </Stack>
  );
}

export default Layout;
