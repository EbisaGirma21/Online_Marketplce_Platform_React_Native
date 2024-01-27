import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ToastAndroid,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import TextField from "../../../../components/shared/TextField";
import { COLOR } from "../../../../constants/color";
import { useAuth } from "../../../../context/AuthContext";
import { useNavigation, useRoute } from "@react-navigation/native";
import ProductContext from "../../../../context/ProductContext";
import { StatusBar } from "expo-status-bar";

export default function Sell() {
  const route = useRoute();
  const { product } = route.params;
  const { authState } = useAuth();
  const {} = useContext(ProductContext);
  const navigation = useNavigation();

  const [productName, setProductName] = useState(product.productName);
  const [brandName, setBrandName] = useState(product.brandName);
  const [modelName, setModelName] = useState(product.modelName);
  const [specification, setSpecification] = useState(product.specification);
  const [price, setPrice] = useState(product.price);
  const [condition, setCondition] = useState(product.condition);
  const [shortDescription, setShortDescription] = useState(
    product.shortDescription
  );

  // authState.authenticated effect
  useEffect(() => {
    const authChecker = async () => {
      if (!authState.authenticated) {
        navigation.navigate("home");
      }
    };

    authChecker();
  }, [authState.authenticated]);

  console.log(product);

  // product information submission handler
  const handleEditProduct = async () => {};

  // toast Funtion
  function showToast(message) {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <StatusBar style="dark" />
      <View style={styles.form}>
        <View style={styles.productName}>
          <Text style={styles.label}>Product Name</Text>
          <TextField
            placeholder="Product Name"
            value={productName}
            onChangeText={(text) => setProductName(text)}
          />
        </View>
        <Text style={styles.label}>Brand Name</Text>
        <TextField
          placeholder="Brand Name"
          value={brandName}
          onChangeText={setBrandName}
        />
        <Text style={styles.label}>Model Name</Text>
        <TextField
          placeholder="Model Name"
          value={modelName}
          onChangeText={setModelName}
        />
        <Text style={styles.label}>Specification</Text>
        <TextField
          placeholder="Some Detail Specification"
          value={specification}
          onChangeText={setSpecification}
        />

        <Text style={styles.label}>Price</Text>
        <TextField placeholder="Price" value={price} onChangeText={setPrice} />
        <Text style={styles.label}>Condition</Text>
        <TextField
          placeholder="Condition"
          value={condition}
          onChangeText={setCondition}
        />
        <Text style={styles.label}>Short Description</Text>
        <TextField
          placeholder="Short Description"
          value={shortDescription}
          onChangeText={setShortDescription}
        />

        <TouchableOpacity style={styles.postButton} onPress={handleEditProduct}>
          <Text style={{ color: "#00a76f", fontSize: 18, alignSelf: "center" }}>
            Save Product
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  form: {
    marginTop: 50,
    width: "90%",
    alignSelf: "center",
  },
  formTitle: {
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 18,
    color: COLOR.palesky,
  },
  postButton: {
    alignSelf: "center",
    width: "80%",
    backgroundColor: "#c7e2d9",
    padding: 15,
    paddingHorizontal: 50,
    marginVertical: 10,
    borderRadius: 10,
  },
  productName: {
    position: "relative",
  },
  productInput: {
    width: "95%",
    backgroundColor: "#fff",
    alignSelf: "center",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLOR.jade,
  },
  myList: {
    position: "absolute",
    right: "5%",
    top: "20%",
  },
  list: {
    padding: 5,
    color: COLOR.jade,
    margin: 2,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: COLOR.jade,
  },
  dropdown: {
    width: "95%",
    backgroundColor: COLOR.swansdown,
    alignSelf: "center",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLOR.jade,
    marginBottom: 10,
  },
  myImage: {
    width: "100%",
    height: 140,
    objectFit: "contain",
  },
  myImageView: {
    width: "50%",
    height: 150,
    borderRadius: 5,
    margin: 5,
    alignSelf: "center",
    backgroundColor: COLOR.jade,
    justifyContent: "center",
  },
  upButton: {
    width: "50%",
    backgroundColor: COLOR.swansdown,
    padding: 10,
    margin: 5,
    borderRadius: 5,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    marginLeft: "5%",
    color: COLOR.palesky,
    paddingTop: 5,

    fontSize: 18,
  },
});
