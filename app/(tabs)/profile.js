import React from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import {
  AntDesign,
  Entypo,
  FontAwesome,
  MaterialIcons,
} from "@expo/vector-icons";

export default function Profile() {
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.halfCircle} />
        <Text style={styles.myname}> Elsabet Awraris</Text>
        <Image
          style={styles.mypp}
          source={require("../../assets/myphoto.png")}
        />
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.detailContainer}>
          <AntDesign name="user" size={24} color="#00a76f" />
          <Text style={{ color: "#637381", fontSize: 18 }}>
            Elsabet Awraris
          </Text>
        </View>
        <View style={styles.detailContainer}>
          <FontAwesome name="birthday-cake" size={24} color="#00a76f" />
          <Text style={{ color: "#637381", fontSize: 18 }}>12/12/2012</Text>
        </View>
        <View style={styles.detailContainer}>
          <AntDesign name="phone" size={24} color="#00a76f" />
          <Text style={{ color: "#637381", fontSize: 18 }}>+251991234567</Text>
        </View>
        <View style={styles.detailContainer}>
          <MaterialIcons name="email" size={24} color="#00a76f" />
          <Text style={{ color: "#637381", fontSize: 18 }}>
            myemail@gmail.com
          </Text>
        </View>
        <View style={styles.detailContainer}>
          <Entypo name="dial-pad" size={24} color="#00a76f" />
          <Text style={{ color: "#637381", fontSize: 18 }}>Password</Text>
        </View>
        <Pressable style={styles.editButton}>
          <Text style={{ color: "#00a76f", fontSize: 18 }}>Edit Profile</Text>
        </Pressable>
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
    backgroundColor: "#c7e2d9",
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
    top: 110,
  },
  mypp: {
    width: 70,
    height: 70,
    borderRadius: 50,
    position: "absolute",
    top: 140,
  },
  editButton: {
    backgroundColor: "#c7e2d9",

    padding: 15,
    paddingHorizontal: 50,
    marginVertical: 10,
    borderRadius: 30,
  },
});
