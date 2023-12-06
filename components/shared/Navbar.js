import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useNavigation } from "@react-navigation/native";

export default function Navbar() {
  const nav = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.navComponent}>
        {/* <Ionicons
          style={styles.icons}
          name="menu-outline"
          size={32}
          onPress={() => nav.toggleDrawer()}
        /> */}
        <Text style={styles.title}>My Market</Text>
      </View>
      <View style={styles.navComponent}>
        <Link href="/auth">
          <Text style={styles.buttonText}>Sign in</Text>
        </Link>

        <Ionicons style={styles.icons} name="notifications" size={24} />
        <Ionicons style={styles.icons} name="cart-outline" size={24} />
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
  buttonText: {
    color: "#637381",
  },
});
