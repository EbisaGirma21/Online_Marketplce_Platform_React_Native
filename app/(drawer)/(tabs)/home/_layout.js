import React from "react";
import { Stack } from "expo-router";

function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="product_detail" options={{ headerShown: false }} />
      <Stack.Screen name="edit_product" options={{ headerShown: false }} />
    </Stack>
  );
}
export default Layout;
