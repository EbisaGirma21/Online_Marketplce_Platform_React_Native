import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const navigation = useNavigation();
  const { authState, onLogout } = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.navComponent}>
        {authState.authenticated ? (
          <Ionicons
            style={styles.icons}
            name="menu-outline"
            size={32}
            onPress={() => navigation.toggleDrawer()}
          />
        ) : null}

        <Text style={styles.title}>My Market</Text>
      </View>
      <View style={styles.navComponent}>
        {!authState.authenticated ? (
          <Link href="/auth">
            <Text style={styles.buttonText}>Sign in</Text>
          </Link>
        ) : null}
        <Link href="/notification">
          <View>
            <Ionicons style={styles.notsicons} name="notifications" size={24} />
            <View style={styles.badge}>
              <Text style={{ color: "#fff" }}>12</Text>
            </View>
          </View>
        </Link>
        <Ionicons style={styles.icons} name="cart-outline" size={24} />
        {authState.authenticated ? (
          <TouchableOpacity onPress={onLogout}>
            <Text style={styles.buttonText}>Sign out</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 15,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  navComponent: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  title: {
    color: "#637381",
    fontSize: 20,
  },
  icons: {
    color: "#00a76f",
  },
  notsicons: {
    color: "#00a76f",
    position: "relative",
  },
  badge: {
    backgroundColor: "#DC1A1A",
    color: "#fff",
    position: "absolute",
    top: -8,
    right: -5,
    width: 20,
    height: 20,
    borderRadius: 50,
    padding: 2,
    alignItems: "center",
  },
  buttonText: {
    color: "#637381",
  },
});
