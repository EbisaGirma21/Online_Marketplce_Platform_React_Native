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
    width: 80,
    height: 130,
    paddingBottom: 10,
    marginLeft: 10,
  },
  productImage: {
    width: 80,
    height: "90%",
    objectFit: "cover",
  },
  productTitle: {
    height: "15%",
    textAlign: "center",
    color: "#637381",
  },
});
