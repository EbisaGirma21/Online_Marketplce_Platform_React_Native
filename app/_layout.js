import React from "react";
import { Stack } from "expo-router";
import { AuthProvider } from "../context/AuthContext";
import { ProductCatagoryProvider } from "../context/ProductCatagoryContext";

const App = () => {
  return (
    <AuthProvider>
      <ProductCatagoryProvider>
        <Layout />
      </ProductCatagoryProvider>
    </AuthProvider>
  );
};

function Layout() {
  return (
    <Stack>
      <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
      <Stack.Screen name="auth" options={{ headerShown: false }} />
    </Stack>
  );
}
export default App;
