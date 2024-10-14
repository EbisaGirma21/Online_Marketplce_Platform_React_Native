import {
  View,
  StyleSheet,
  Image,
  Text,
  Pressable,
  FlatList,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect } from "react";
// import { ScrollView } from "react-native-gesture-handler";
import Card from "../../../../components/home/Card";
import ProductCard from "../../../../components/home/ProductCard";
import TextField from "../../../../components/shared/TextField";
import ProductCatagorysContext from "../../../../context/ProductCatagoryContext";
import ProductContext from "../../../../context/ProductContext";
import { ScrollView } from "react-native-virtualized-view";
import { Ionicons } from "@expo/vector-icons";
import { COLOR } from "../../../../constants/color";

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
  const renderItem1 = ({ item }) => (
    <Pressable style={styles.categoryButton}>
      <Text style={styles.myOption}>{item.categoryName}</Text>
    </Pressable>
  );
  const renderItem2 = ({ item }) => (
    <Card
      productTitle={` ${item.brandName} ${item.modelName} ${item.productName}`}
    />
  );

  return (
    <ScrollView style={styles.mainContainer}>
      <View>
        <View
          style={{ backgroundColor: COLOR.jade, height: 40, width: "100%" }}
        />

        <Image
          source={require("../../../../assets/web.png")}
          style={styles.mycard}
        />
        <View>
          <TextInput placeholder="Search your Product" style={styles.search} />
          <Pressable style={styles.searchButton}>
            <Ionicons name="search" size={24} color={COLOR.jade} />
          </Pressable>
        </View>

        <FlatList
          data={productCatagories}
          renderItem={renderItem1}
          keyExtractor={(item) => item._id}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={styles.hscroll}
        />

        <FlatList
          data={products}
          renderItem={renderItem2}
          keyExtractor={(item) => item._id}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={styles.imageScroll}
        />
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
    // backgroundColor: "#fff",
    paddingTop: 8,
  },
  search: {
    width: "95%",
    borderWidth: 1,
    borderColor: COLOR.jade,
    alignSelf: "center",
    padding: 8,
    borderRadius: 50,
    marginTop: -25,
    backgroundColor: "#fff",
    position: "relative",
  },
  searchButton: {
    position: "absolute",
    top: -15,
    right: 20,
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
    height: 150,
    resizeMode: "contain",
  },

  mycard: {
    width: "100%",
    height: 200,
    alignSelf: "center",
    backgroundColor: COLOR.jade,
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
