import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";

export default function Card() {
  return (
    <View style={styles.container}>
      <Text style={styles.productTitle}>My Product</Text>
      <Image
        style={styles.productImage}
        source={require("../../assets/myImage.jpg")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    width: 110,
    height: 140,
    paddingBottom: 10,
    marginLeft: 10,
    padding: 2,
  },
  productImage: {
    width: 100,
    height: "100%",
    objectFit: "contain",
    alignSelf: "center",
  },
  productTitle: {
    height: "15%",
    textAlign: "center",
    color: "#637381",
  },
});
