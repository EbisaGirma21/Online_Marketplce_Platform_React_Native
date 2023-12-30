import React, { useEffect } from "react";
import { Link, Tabs } from "expo-router";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Pressable, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../../context/AuthContext";
import Navbar from "../../../components/shared/Navbar";
import { Fontisto } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

export default function AppTabs() {
  const { authState } = useAuth();
  const navigation = useNavigation();

  return (
    <Tabs
      screenOptions={{
        tabBarHideOnKeyboard: true,
      }}
    >
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
        name="wish_list"
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            authState.authenticated
              ? navigation.navigate("wish_list")
              : navigation.navigate("auth");
          },
        }}
        options={{
          header: () => <Navbar />,
          tabBarIcon: () => (
            <MaterialIcons name="favorite" style={styles.icons} size={20} />
          ),
          tabBarLabel: "WishList",
          tabBarActiveBackgroundColor: "#c7e2d9",

          tabBarLabelStyle: {
            fontSize: 14,
            fontWeight: "bold",
            color: "#00a76f",
            marginBottom: 5,
          },
        }}
      />
      <Tabs.Screen
        name="sell"
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            authState.authenticated
              ? navigation.navigate("sell")
              : navigation.navigate("auth");
          },
        }}
        options={{
          header: () => <Navbar />,
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
        }}
      />

      <Tabs.Screen
        name="message"
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            authState.authenticated
              ? navigation.navigate("message")
              : navigation.navigate("auth");
          },
        }}
        options={{
          header: () => <Navbar />,

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
        }}
      />
      <Tabs.Screen
        name="profile"
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            authState.authenticated
              ? navigation.navigate("profile")
              : navigation.navigate("auth");
          },
        }}
        options={{
          tabBarIcon: () => (
            <AntDesign style={styles.icons} z name="user" size={20} />
          ),
          headerTitle: "Profile",
          headerRight: () => (
            <Pressable
              style={{ marginRight: 20 }}
              onPress={() => navigation.navigate("setting")}
            >
              <Ionicons name="settings-sharp" size={24} color="black" />
            </Pressable>
          ),
          tabBarLabel: "Profile",
          tabBarActiveBackgroundColor: "#c7e2d9",
          tabBarLabelStyle: {
            fontSize: 14,
            fontWeight: "bold",
            color: "#00a76f",
            marginBottom: 5,
          },
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
