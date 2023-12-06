import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Navbar from "../../components/shared/Navbar";

const Drawer = createDrawerNavigator();

export default function Layout() {
  return (
    <Drawer.Navigator
      screenOptions={{
        header: () => <Navbar />,
      }}
    >
      <Drawer.Screen name="user" />
      <Drawer.Screen name="product_catagory" />
      <Drawer.Screen name="product" />
    </Drawer.Navigator>
  );
}
