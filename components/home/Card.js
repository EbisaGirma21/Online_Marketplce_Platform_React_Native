import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";

export default function Card({ productTitle, imageUrl }) {
  return (
    <View style={styles.container}>
      <Text style={styles.productTitle}>{productTitle}</Text>
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
    width: 110,
    height: 140,
    paddingBottom: 10,
    marginLeft: 10,
    padding: 2,
  },
  productImage: {
    width: "100%",
    height: "85%",
    objectFit: "contain",
    alignSelf: "center",
  },
  productTitle: {
    height: "15%",
    textAlign: "center",
    color: "#637381",
  },
});
