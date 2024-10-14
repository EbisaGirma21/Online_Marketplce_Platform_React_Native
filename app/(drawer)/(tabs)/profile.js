import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image, ActivityIndicator } from "react-native";
import { AntDesign, Entypo, MaterialIcons } from "@expo/vector-icons";
import { useAuth } from "../../../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { COLOR } from "../../../constants/color";
import { StatusBar } from "expo-status-bar";

export default function Profile() {
  const { authState, onGetuser, user, id } = useAuth();
  const navigation = useNavigation();

  // authState.authenticated effect
  useEffect(() => {
    const authChecker = async () => {
      if (!authState.authenticated) {
        navigation.navigate("home");
      }
    };

    authChecker();
  }, [authState.authenticated]);

  useEffect(() => {
    onGetuser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return user === null ? (
    <ActivityIndicator style={styles.spinner} size="large" color={COLOR.jade} />
  ) : (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.topContainer}>
        <View style={styles.halfCircle} />
        <Text style={styles.myname}>
          {user.firstName} {user.lastName}
        </Text>
        <Image
          style={styles.mypp}
          source={
            user.image && user.image.url
              ? { uri: user.image.url }
              : require("../../../assets/myphoto.png")
          }
        />
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.detailContainer}>
          <AntDesign name="user" size={24} color="#00a76f" />
          <Text style={{ color: "#637381", fontSize: 18 }}>
            {user.firstName} {user.lastName}
          </Text>
        </View>
        <View style={styles.detailContainer}>
          <Entypo name="address" size={24} color="#00a76f" />
          <Text style={{ color: "#637381", fontSize: 18 }}>{user.address}</Text>
        </View>
        <View style={styles.detailContainer}>
          <AntDesign name="phone" size={24} color="#00a76f" />
          <Text style={{ color: "#637381", fontSize: 18 }}>
            {user.phoneNumber}
          </Text>
        </View>
        <View style={styles.detailContainer}>
          <MaterialIcons name="email" size={24} color="#00a76f" />
          <Text style={{ color: "#637381", fontSize: 18 }}>{user.email}</Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "column",
  },
  topContainer: {
    position: "relative",
    alignItems: "center",
  },
  halfCircle: {
    backgroundColor: COLOR.swansdown,
    width: 460,
    height: 230,
    borderBottomLeftRadius: 230,
    borderBottomRightRadius: 230,
    position: "absolute",
    top: -50,
  },
  detailContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    borderBottomColor: "#00a76f",
    borderBottomWidth: 1,
    width: "100%",
    padding: 15,
  },
  infoContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    top: 210,
  },
  myname: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#00a76f",
    position: "absolute",
    top: 90,
  },
  mypp: {
    width: 100,
    height: 100,
    borderRadius: 50,
    position: "absolute",
    top: 120,
  },
  editButton: {
    backgroundColor: "#c7e2d9",

    padding: 15,
    paddingHorizontal: 50,
    marginVertical: 10,
    borderRadius: 30,
  },
  password: {
    width: "80%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textInput: {
    width: "70%",
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#00a76f",
    fontSize: 18,
    marginTop: 19,
  },
});
