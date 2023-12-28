import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ToastAndroid,
  Pressable,
  TextInput,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import React, { useContext, useEffect, useState } from "react";
import TextField from "../../../components/shared/TextField";
import { COLOR } from "../../../constants/color";
import Button from "../../../components/shared/Button";
import { useAuth } from "../../../context/AuthContext";
import ProductCatagorysContext from "../../../context/ProductCatagoryContext";
import { useNavigation } from "@react-navigation/native";
import ProductContext from "../../../context/ProductContext";

export default function Sell() {
  const { authState, role, onSellerRegistration } = useAuth();
  const { productCatagories, fetchProductCatagories } = useContext(
    ProductCatagorysContext
  );
  const { createProduct } = useContext(ProductContext);
  const navigation = useNavigation();

  // the information to submitted by buyer
  const [kebeleId, setKebeleId] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [specificLoaction, setSpecificLocation] = useState("");

  // product infromation
  const [catagory, setCatagory] = useState("");
  const [productName, setProductName] = useState("");
  const [brandName, setBrandName] = useState("");
  const [modelName, setModelName] = useState("");
  const [specification, setSpecification] = useState("");
  const [amount, setAmount] = useState("");
  const [price, setPrice] = useState("");
  const [condition, setCondition] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [location, setLocation] = useState("");

  // for product names
  const [searchText, setSearchText] = useState("");
  const [suggestedTags, setSuggestedTags] = useState([]);

  // authState.authenticated effect
  useEffect(() => {
    const authChecker = async () => {
      if (!authState.authenticated) {
        navigation.navigate("home");
      }
    };

    authChecker();
  }, [authState.authenticated]);

  // product catagory effect
  useEffect(() => {
    fetchProductCatagories();
  }, []);

  // buyer information submission handler
  const handleSubmitPress = async () => {
    const result = await onSellerRegistration(
      kebeleId,
      nationalId,
      birthDate,
      specificLoaction
    );

    if (result && result.error) {
      alert(result.msg);
    } else {
      showToast("Your Information Successfully");
    }
  };

  // product information submission handler
  const handlePostProduct = async () => {
    const result = await createProduct(
      // console.log(
      catagory,
      productName,
      brandName,
      modelName,
      specification,
      amount,
      price,
      condition,
      shortDescription,
      location
    );

    if (result && result.error) {
      alert(result.message);
    } else {
      showToast("Product Created Successfully");
    }
  };

  // toast Funtion
  function showToast(message) {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  }

  // filtering product catagory
  const filteredCatagory = productCatagories.filter(
    (item) => item._id === catagory
  );

  const handleInputChange = (text) => {
    setSearchText(text);
    const filteredTags = filteredCatagory.flatMap((product) =>
      product.productNames.filter((tag) =>
        tag.name.toLowerCase().includes(searchText.toLowerCase())
      )
    );
    setSuggestedTags(filteredTags);
  };
  const handleTagSelect = (tag) => {
    setSearchText(tag);
    setProductName(tag);
    setSuggestedTags([]);
  };

  const renderItem = ({ item }) => (
    <Pressable
      style={styles.list}
      key={item.name}
      onPress={() => handleTagSelect(item)}
    >
      <Text style={{ color: COLOR.jade }} key={item._id}>
        {item.name}
      </Text>
    </Pressable>
  );
  if (role === "buyer") {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.form}>
          <Text style={styles.formTitle}>Add Your Product</Text>
          <TextField
            placeholder="Kebele ID"
            onChangeText={(text) => setKebeleId(text)}
            value={kebeleId}
          />
          <TextField
            placeholder="National ID"
            onChangeText={(text) => setNationalId(text)}
            value={nationalId}
          />
          <TextField
            placeholder="Birth day"
            onChangeText={(text) => setBirthDate(text)}
            value={birthDate}
          />
          <TextField
            placeholder="Specific Location"
            onChangeText={(text) => setSpecificLocation(text)}
            value={specificLoaction}
          />
          <Button title="Submit" onPress={handleSubmitPress} />
        </View>
      </ScrollView>
    );
  } else {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.form}>
          <Picker
            selectedValue={catagory}
            onValueChange={(itemValue, itemIndex) => setCatagory(itemValue)}
            style={styles.dropdown}
          >
            <Picker.Item label="Choose a Category" value="" />
            {productCatagories.map((category) => (
              <Picker.Item
                key={category._id}
                label={category.catagory}
                value={category._id}
              />
            ))}
          </Picker>
          <View style={styles.productName}>
            <TextInput
              placeholder="Product Name"
              value={productName}
              onChangeText={(text) => setProductName(text)}
              // onChangeText={handleInputChange}
              style={styles.productInput}
            />
            {/* <FlatList
              data={suggestedTags}
              keyExtractor={(item) => item}
              renderItem={renderItem}
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.myList}
            /> */}
          </View>

          <TextField
            placeholder="Brand Name"
            value={brandName}
            onChangeText={setBrandName}
          />
          <TextField
            placeholder="Model Name"
            value={modelName}
            onChangeText={setModelName}
          />
          <TextField
            placeholder="Some Detail Specification"
            value={specification}
            onChangeText={setSpecification}
          />
          <TextField
            placeholder="Amount"
            value={amount}
            onChangeText={setAmount}
          />
          <TextField
            placeholder="Price"
            value={price}
            onChangeText={setPrice}
          />
          <TextField
            placeholder="Condition"
            value={condition}
            onChangeText={setCondition}
          />
          <TextField
            placeholder="Short Description"
            value={shortDescription}
            onChangeText={setShortDescription}
          />
          <TextField
            placeholder="Location where product exists"
            value={location}
            onChangeText={setLocation}
          />
          <Pressable style={styles.postButton} onPress={handlePostProduct}>
            <Text
              style={{ color: "#00a76f", fontSize: 18, alignSelf: "center" }}
            >
              Post Product
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  form: {
    width: "100%",
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
});
