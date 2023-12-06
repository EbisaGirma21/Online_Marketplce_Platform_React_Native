import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";

export default function ProductCard() {
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
    paddingBottom: 10,
    marginLeft: 10,
  },
  productImage: {
    height: "100%",
    width: "100%",
    objectFit: "cover",
  },
  productTitle: {
    textAlign: "center",
    color: "#637381",
  },
});
