import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { COLOR } from "../../../constants/color";
import ProductCard from "../../../components/home/ProductCard";
import ProductContext from "../../../context/ProductContext";
import { FlatList } from "react-native-gesture-handler";

const WishList = () => {
  // my context api
  const { wishlist, fetchMyWishList } = useContext(ProductContext);

  // product use effect
  useEffect(() => {
    fetchMyWishList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.productList}>
      <View style={{ width: "35%" }}>
        <ProductCard catagory={item.brandName} imageUrl={item.image.url} />
      </View>
      <View style={{ width: "55%", alignSelf: "center" }}>
        <Text style={{ color: COLOR.palesky, fontWeight: "bold", padding: 5 }}>
          {item.productName}
        </Text>
        <Text style={{ color: COLOR.palesky, fontWeight: "bold", padding: 5 }}>
          {item.modelName}
        </Text>
        <Text style={{ color: COLOR.jade, fontWeight: "bold", padding: 5 }}>
          ETB {item.price}
        </Text>
      </View>
    </View>
  );

  return (
    <>
      <View>
        <Text style={{ color: COLOR.palesky, fontWeight: "bold", padding: 5 }}>
          My Products
        </Text>
        {wishlist.length === 0 ? (
          <ActivityIndicator
            style={styles.spinner}
            size="large"
            color={COLOR.jade}
          />
        ) : (
          <FlatList
            data={wishlist}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
            numColumns={2}
            contentContainerStyle={styles.gridRow}
          />
        )}
      </View>
    </>
  );
};

export default WishList;

const styles = StyleSheet.create({
  myProduct: {
    width: "100%",
    height: 200,
    alignSelf: "center",
    objectFit: "contain",
  },
  topCard: {
    width: "95%",
    alignSelf: "center",
    backgroundColor: "#fff",
    padding: 5,
    borderRadius: 10,
    marginTop: -10,
  },
  topInnerCard: {
    padding: 10,
    display: "flex",
    flexDirection: "row",
    width: "95%",
    gap: 5,
  },
  topInnerCards: {
    padding: 10,
    display: "flex",
    flexDirection: "row",
    width: "95%",
    gap: 5,
  },
  reqButton: {
    padding: 12,
    width: "50%",
    borderWidth: 1,
    borderColor: COLOR.jade,
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
  },

  cButton: {
    width: "25%",
    paddingTop: 8,
    paddingBottom: 8,
    borderWidth: 1,
    borderColor: COLOR.jade,
    borderRadius: 10,
  },
  callButton: {
    padding: 12,
    width: "50%",
    backgroundColor: COLOR.jade,
    borderRadius: 10,
  },
  contactCard: {
    marginVertical: 5,
    width: "95%",
    alignSelf: "center",
    backgroundColor: "#fff",
    padding: 5,
    borderRadius: 10,
  },
  chatButton: {
    marginVertical: 10,
    padding: 12,
    alignSelf: "center",
    width: "95%",
    backgroundColor: "#FFB534",
    borderRadius: 10,
  },
  detailCard: {
    marginVertical: 5,
    display: "flex",
    flexDirection: "row",
    width: "95%",
    alignSelf: "center",
    backgroundColor: "#fff",
    padding: 5,
    borderRadius: 10,
  },
  productList: {
    width: "100%",
    height: 160,
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: COLOR.palesky,
  },
});
