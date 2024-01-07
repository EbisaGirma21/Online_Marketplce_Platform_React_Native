import React, { useContext, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import { Table, TableWrapper, Row, Cell } from "react-native-table-component";
import { COLOR } from "../../constants/color";
import ProductContext from "../../context/ProductContext";

const Product = () => {
  const { products, fetchProducts } = useContext(ProductContext);

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const tableHead = ["Product", "Product", "Brand", "Owner"];

  const renderButton = (productData, index) => {
    return (
      <TouchableOpacity onPress={() => viewDetails(productData, index)}>
        <View style={styles.btn}>
          <Text style={styles.btnText}>View</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const viewDetails = (data, index) => {
    Alert.alert(
      "Product Details",
      `Product ID: ${products[index]._id}\nProduct Name: ${products[index].productName}\nBrand Name: ${products[index].brandName}`,
      [{ text: "OK", onPress: () => console.log("OK Pressed") }]
    );
  };
  // Transform user data into table data
  const tableData = products.map((productData, index) => [
    <View style={styles.topCard}>
      <Image
        style={styles.mypp}
        source={
          productData.image
            ? { uri: productData.image.url }
            : require("../../assets/myphoto.png")
        }
      />
    </View>, // User index
    productData.productName,
    productData.brandName,
    renderButton(null, index),
  ]);

  return (
    <View style={styles.container}>
      <Text style={{ color: COLOR.palesky, fontSize: 20 }}>
        Product Details
      </Text>
      <Table borderStyle={{ borderColor: "transparent" }}>
        <Row data={tableHead} style={styles.head} textStyle={styles.text} />
        {tableData.map((rowData, rowIndex) => (
          <TableWrapper key={rowIndex} style={styles.row}>
            {rowData.map((cellData, cellIndex) => (
              <Cell
                key={cellIndex}
                data={
                  cellIndex === 3 ? renderButton(cellData, rowIndex) : cellData
                }
                textStyle={styles.text}
              />
            ))}
          </TableWrapper>
        ))}
      </Table>
    </View>
  );
};

export default Product;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 6, backgroundColor: "#fff" },
  head: { height: 40, backgroundColor: COLOR.jade },
  text: { margin: 6 },
  row: { flexDirection: "row", backgroundColor: COLOR.blackhaze },
  btn: {
    width: 58,
    height: 18,
    backgroundColor: COLOR.swansdown,
    borderRadius: 2,
  },
  btnText: { textAlign: "center", color: COLOR.jade },
  topCard: {
    marginVertical: 5,
    alignItems: "center",
  },
  mypp: {
    width: 30,
    height: 30,
    borderRadius: 50,
  },
});
