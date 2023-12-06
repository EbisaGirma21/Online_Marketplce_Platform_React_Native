import React from "react";
import { Tabs } from "expo-router";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { StyleSheet } from "react-native";

export default function _layout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: () => (
            <Ionicons style={styles.icons} name="home" size={20} />
          ),
          tabBarLabel: "Home",
          tabBarActiveBackgroundColor: "#c7e2d9",
          tabBarLabelStyle: {
            fontSize: 14,
            fontWeight: "bold",
            color: "#00a76f",
            marginBottom: 5,
          },
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="sell"
        options={{
          tabBarIcon: () => (
            <FontAwesome
              style={styles.icons}
              name="shopping-basket"
              size={20}
            />
          ),
          tabBarLabel: "Sell",
          tabBarActiveBackgroundColor: "#c7e2d9",
          tabBarLabelStyle: {
            fontSize: 14,
            fontWeight: "bold",
            color: "#00a76f",
            marginBottom: 5,
          },
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="message"
        options={{
          tabBarIcon: () => (
            <MaterialCommunityIcons
              style={styles.icons}
              name="message-processing"
              size={20}
            />
          ),
          tabBarLabel: "Message",
          tabBarActiveBackgroundColor: "#c7e2d9",
          tabBarLabelStyle: {
            fontSize: 14,
            fontWeight: "bold",
            color: "#00a76f",
            marginBottom: 5,
          },
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: () => (
            <AntDesign style={styles.icons} z name="user" size={20} />
          ),
          tabBarLabel: "Profile",
          tabBarActiveBackgroundColor: "#c7e2d9",
          tabBarLabelStyle: {
            fontSize: 14,
            fontWeight: "bold",
            color: "#00a76f",
            marginBottom: 5,
          },
          headerShown: false,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  icons: {
    color: "#00a76f",
  },
});
