import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";

export default function ProductCard({ catagory }) {
  return (
    <View style={styles.container}>
      <Text style={styles.productTitle}>{catagory}</Text>
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
    padding: 10,
  },
  productImage: {
    height: "100%",
    width: "100%",
    objectFit: "contain",
    alignSelf: "center",
  },
  productTitle: {
    textAlign: "center",
    color: "#637381",
  },
});
