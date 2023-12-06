import { View, StyleSheet, Image, Text, Pressable } from "react-native";
import React from "react";
import SearchInput from "../../components/home/SearchInput";
import { Stack } from "expo-router";
import { ScrollView } from "react-native-gesture-handler";
import Card from "../../components/home/Card";
import ProductCard from "../../components/home/ProductCard";

const productCategories = [
  "Electronics",
  "Clothing",
  "Home & Furniture",
  "Books",
  "Beauty & Personal Care",
  "Sports & Outdoors",
  "Toys & Games",
  "Automotive",
  "Grocery",
  "Health & Wellness",
  "Movies & Music",
];

export default function Home() {
  return (
    <ScrollView style={styles.mainContainer}>
      <Stack.Screen />
      <ScrollView>
        <SearchInput />
        <ScrollView
          showsHorizontalScrollIndicator={false}
          style={styles.hscroll}
          horizontal={true}
        >
          {productCategories.map((category, index) => (
            <Pressable style={styles.categoryButton}>
              <Text key={index} style={styles.myOption}>
                {category}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
        <Image source={require("../../assets/web.png")} style={styles.mycard} />
        <ScrollView
          showsHorizontalScrollIndicator={false}
          style={styles.imageScroll}
          horizontal={true}
        >
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </ScrollView>
        <View style={styles.mainProductContainer}>
          <View style={styles.gridRow}>
            <View style={styles.gridItem}>
              <ProductCard />
            </View>
            <View style={styles.gridItem}>
              <ProductCard />
            </View>
          </View>
          <View style={styles.gridRow}>
            <View style={styles.gridItem}>
              <ProductCard />
            </View>
            <View style={styles.gridItem}>
              <ProductCard />
            </View>
          </View>
          <View style={styles.gridRow}>
            <View style={styles.gridItem}>
              <ProductCard />
            </View>
            <View style={styles.gridItem}>
              <ProductCard />
            </View>
          </View>
        </View>
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    flex: 1,
    backgroundColor: "#ddd",
  },
  hscroll: {
    height: 50,
    backgroundColor: "#fff",
    paddingTop: 8,
  },
  categoryButton: {
    backgroundColor: "#c7e2d9",
    borderRadius: 10,
    height: 35,
    marginLeft: 5,
    padding: 5,
    paddingHorizontal: 10,
  },
  myOption: {
    fontSize: 18,
    color: "#00a76f",
  },
  imageScroll: {
    marginTop: -20,
    height: 150,
    resizeMode: "contain",
  },

  mycard: {
    width: "90%",
    height: 200,
    alignSelf: "center",
    borderRadius: 10,
  },
  myProduct: {
    width: 80,
    height: 120,
    marginLeft: 15,
    resizeMode: "contain",
    backgroundColor: "#fff",
  },
  mainProductContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    gap: 40,
  },
  gridRow: {
    flexDirection: "row",
  },
  gridItem: {
    flex: 1,
    aspectRatio: 1,
    backgroundColor: "#ddd",
    height: 120,
  },
});
