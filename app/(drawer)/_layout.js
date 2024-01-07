import * as React from "react";
import Navbar from "../../components/shared/Navbar";
import { Drawer } from "expo-router/drawer";
import { useAuth } from "../../context/AuthContext";



export default function Layout() {
  const { authState } = useAuth();

  return (
    <Drawer
      screenOptions={{
        swipeEnabled: authState.authenticated,
        // header: () => <Navbar />,
      }}
    >
      <Drawer.Screen
        name="(tabs)"
        options={{
          headerShown: false,
          drawerLabel: "Home",
          drawerActiveBackgroundColor: "#c7e2d9",
          drawerLabelStyle: {
            fontSize: 14,
            color: "#00a76f",
          },
        }}
      />
      <Drawer.Screen
        name="user"
        options={{
          header: () => <Navbar />,
          drawerLabel: "User",
          drawerActiveBackgroundColor: "#c7e2d9",
          drawerLabelStyle: {
            fontSize: 14,
            color: "#00a76f",
          },
        }}
      />
      <Drawer.Screen
        name="product_catagory"
        options={{
          header: () => <Navbar />,
          drawerLabel: "Product Catagory",
          drawerActiveBackgroundColor: "#c7e2d9",
          drawerLabelStyle: {
            fontSize: 14,
            color: "#00a76f",
          },
        }}
      />
      <Drawer.Screen
        name="product"
        options={{
          header: () => <Navbar />,
          drawerLabel: "Product",
          drawerActiveBackgroundColor: "#c7e2d9",
          drawerLabelStyle: {
            fontSize: 14,
            color: "#00a76f",
          },
        }}
      />
    </Drawer>
  );
}
