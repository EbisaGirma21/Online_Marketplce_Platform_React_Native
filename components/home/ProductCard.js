import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { Link } from "expo-router";

export default function ProductCard({ catagory, imageUrl }) {
  return (
    <View style={styles.container}>
      <Text style={styles.productTitle}>{catagory}</Text>
      <Image
        style={styles.productImage}
        source={
          imageUrl ? { uri: imageUrl } : require("../../assets/myImage.jpg")
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingBottom: 10,
    marginLeft: 10,
    padding: 5,
    // marginBottom: 20,
  },
  productImage: {
    height: "85%",
    width: "100%",
    objectFit: "contain",
    alignSelf: "center",
  },
  productTitle: {
    textAlign: "center",
    color: "#637381",
  },
});
