import {
  View,
  StyleSheet,
  Image,
  Text,
  Pressable,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect } from "react";
import { ScrollView } from "react-native-gesture-handler";
import Card from "../../../../components/home/Card";
import ProductCard from "../../../../components/home/ProductCard";
import TextField from "../../../../components/shared/TextField";
import ProductCatagorysContext from "../../../../context/ProductCatagoryContext";
import ProductContext from "../../../../context/ProductContext";

export default function Home() {
  const { productCatagories, fetchProductCatagories } = useContext(
    ProductCatagorysContext
  );
  const { products, fetchProducts } = useContext(ProductContext);

  const navigation = useNavigation();

  // catagory use effect
  useEffect(() => {
    fetchProductCatagories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // product use effect
  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // product Press handler
  const handleProductPress = (productId) => {
    navigation.navigate("product_detail", { productId });
  };

  const renderItem = ({ item }) => (
    <Pressable
      style={styles.gridItem}
      onPress={() => handleProductPress(item._id)}
    >
      <ProductCard catagory={item.brandName} />
    </Pressable>
  );

  return (
    <ScrollView style={styles.mainContainer}>
      <View>
        <TextField placeholder="Search your Product" />
        <ScrollView
          showsHorizontalScrollIndicator={false}
          style={styles.hscroll}
          horizontal={true}
        >
          {productCatagories.map((catagory) => (
            <Pressable key={catagory._id} style={styles.categoryButton}>
              <Text style={styles.myOption}>{catagory.catagory}</Text>
            </Pressable>
          ))}
        </ScrollView>
        <Image
          source={require("../../../../assets/web.png")}
          style={styles.mycard}
        />
        <ScrollView
          showsHorizontalScrollIndicator={false}
          style={styles.imageScroll}
          horizontal={true}
        >
          {products.map((product) => (
            <Card
              key={product._id}
              productTitle={` ${product.brandName} ${product.modelName} ${product.productName}`}
            />
          ))}
        </ScrollView>
        <View style={styles.mainProductContainer}>
          <FlatList
            data={products}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
            numColumns={2}
            contentContainerStyle={styles.gridRow}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    flex: 1,
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
    marginRight: 10,
    gap: 40,
  },
  gridRow: {},
  gridItem: {
    flex: 0.5,
    height: 160,
  },
});
