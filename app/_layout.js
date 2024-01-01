import React from "react";
import { Stack } from "expo-router";
import { AuthProvider } from "../context/AuthContext";
import { ProductCatagoryProvider } from "../context/ProductCatagoryContext";
import { ProductProvider } from "../context/ProductContext";
import { NavigationContainer } from "@react-navigation/native";
import { MessageProvider } from "../context/MessageContext";
import { COLOR } from "../constants/color";

const App = () => {
  return (
    <AuthProvider>
      <ProductCatagoryProvider>
        <ProductProvider>
          <MessageProvider>
            <Layout />
          </MessageProvider>
        </ProductProvider>
      </ProductCatagoryProvider>
    </AuthProvider> 
  );
};


function Layout() {
  
  return (
    <Stack>
      <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
      <Stack.Screen name="auth" options={{ headerShown: false }} />
      <Stack.Screen
        name="setting"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
export default App;
