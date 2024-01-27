import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ToastAndroid,
  TouchableOpacity,
  Image,
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
import * as ImagePicker from "expo-image-picker";
import { AntDesign } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

export default function Sell() {
  const { authState, role, onSellerRegistration, id, setRole } = useAuth();
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
  const [image, setImage] = useState(null);
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
      setRole("seller");
      showToast("Your Information Successfully");
    }
  };

  // to pick an image from the
  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error picking image:", error);
    }
  };

  // product information submission handler
  const handlePostProduct = async () => {
    const formData = new FormData();
    if (image) {
      const localUri = image;
      const filename = localUri.split("/").pop();

      formData.append("image", {
        uri: localUri,
        name: filename,
        type: "image/jpeg",
      });
      formData.append("catagory", catagory);
      formData.append("productName", productName);
      formData.append("brandName", brandName);
      formData.append("modelName", modelName);
      formData.append("specification", specification);
      formData.append("amount", amount);
      formData.append("price", price);
      formData.append("condition", condition);
      formData.append("shortDescription", shortDescription);
      formData.append("location", location);
      formData.append("owner", id);
    }

    const result = await createProduct(formData);

    if (result && result.error) {
      alert(result.message);
    } else {
      setCatagory("");
      setProductName("");
      setBrandName("");
      setModelName("");
      setAmount("");
      setPrice("");
      setCondition("");
      setLocation("");
      setShortDescription("");
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
    <TouchableOpacity
      style={styles.list}
      key={item.name}
      onPress={() => handleTagSelect(item)}
    >
      <Text style={{ color: COLOR.jade }} key={item._id}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );
  if (role === "buyer") {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <StatusBar style="dark" />

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
        <StatusBar style="dark" />
        <View style={{ display: "flex", flexDirection: "row", width: "95%" }}>
          <TouchableOpacity style={styles.upButton} onPress={pickImage}>
            <AntDesign
              name="cloudupload"
              size={54}
              color="#00a76f"
              style={{ alignSelf: "center" }}
            />
            <Text
              style={{ color: "#00a76f", fontSize: 18, alignSelf: "center" }}
            >
              Choose a photo
            </Text>
          </TouchableOpacity>
          <View style={styles.myImageView}>
            {image ? (
              <Image style={styles.myImage} source={{ uri: image }} />
            ) : (
              <Image
                style={styles.myImage}
                source={require("../../../assets/product.png")}
              />
            )}
          </View>
        </View>
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
            <Text style={styles.label}>Product Name</Text>
            <TextField
              placeholder="Product Name"
              value={productName}
              onChangeText={(text) => setProductName(text)}
              // onChangeText={handleInputChange}
              // style={styles.productInput}
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
          <Text style={styles.label}>Amount</Text>
          <TextField
            placeholder="Amount"
            value={amount}
            onChangeText={setAmount}
          />
          <Text style={styles.label}>Price</Text>
          <TextField
            placeholder="Price"
            value={price}
            onChangeText={setPrice}
          />
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
          <Text style={styles.label}>Location of Product</Text>
          <TextField
            placeholder="Location where product exists"
            value={location}
            onChangeText={setLocation}
          />
          <TouchableOpacity
            style={styles.postButton}
            onPress={handlePostProduct}
          >
            <Text
              style={{ color: "#00a76f", fontSize: 18, alignSelf: "center" }}
            >
              Post Product
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  form: {
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
