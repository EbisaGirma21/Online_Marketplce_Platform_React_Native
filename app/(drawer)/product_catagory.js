import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import ProductCard from "../../components/home/ProductCard";
import TextField from "../../components/shared/TextField";
import { COLOR } from "../../constants/color";
import * as ImagePicker from "expo-image-picker";
import { TextInput } from "react-native-gesture-handler";
import ProductCatagorysContext from "../../context/ProductCatagoryContext";
import { AntDesign } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

export default function ProductCatagory() {
  const [isAddPage, setIsAddPage] = useState(false);

  // my input attribute
  const [catagory, setCatagory] = useState("");
  const [image, setImage] = useState(null);
  const [productNames, setProductNames] = useState([]);

  // context api
  const { createProductCatagory, productCatagories, fetchProductCatagories } =
    useContext(ProductCatagorysContext);

  // catagory use effect
  useEffect(() => {
    fetchProductCatagories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAddPage]);

  // handling product name
  const handleProductNamesChange = (text) => {
    setProductNames(text.split(",").map((size) => size.trim()));
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

  const handleAddPress = async (myFlag) => {
    if (!myFlag) {
      setIsAddPage(true);
    } else {
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
        formData.append("productNames", [productNames]);
      }
      const result = await createProductCatagory(formData);
      if (result && result.error) {
        alert(result.message);
      } else {
        alert("Catagory added successfully");
        setIsAddPage(false);
      }
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.gridItem}>
      <ProductCard catagory={item.catagory} imageUrl={item.image.url} />
    </View>
  );

  if (!isAddPage) {
    return (
      <View>
        <StatusBar style="dark" />

        <View style={styles.topPart}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleAddPress(isAddPage)}
          >
            <Text style={{ color: COLOR.jade }}>Add Catagory</Text>
          </TouchableOpacity>
          <View style={styles.search}>
            <TextField placeholder="Search your Catagory" />
          </View>
        </View>

        <View style={styles.mainProductContainer}>
          <FlatList
            data={productCatagories}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
            numColumns={2}
            contentContainerStyle={styles.gridRow}
          />
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.addContainer}>
        <StatusBar style="dark" />

        <Text style={styles.formTitle}>Add Your Product</Text>
        <View style={styles.infoContainer}>
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
                  source={require("../../assets/product.png")}
                />
              )}
            </View>
          </View>

          <TextInput
            style={styles.textInput}
            placeholder="Catagory"
            onChangeText={(text) => setCatagory(text)}
            value={catagory}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Product Names"
            onChangeText={handleProductNamesChange}
            value={productNames.join(",")}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={() => handleAddPress(isAddPage)}
          >
            <Text
              style={{ color: "#00a76f", fontSize: 18, alignSelf: "center" }}
            >
              <Text>Add Catagory</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  gridItem: {
    flex: 0.5,
    height: 160,
    margin: 5,
  },

  topPart: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  button: {
    backgroundColor: COLOR.swansdown,
    padding: 10,
    margin: 5,
    borderRadius: 5,
    paddingVertical: 15,
  },
  search: {
    flex: 1,
    marginRight: 3,
  },
  textInput: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#00a76f",
    fontSize: 18,
    marginTop: 19,
    marginHorizontal: 5,
    backgroundColor: "#fff",
  },
  addContainer: {
    backgroundColor: COLOR.blackhaze,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    paddingHorizontal: 20,
    alignSelf: "center",
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
  formTitle: {
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 18,
    color: COLOR.palesky,
  },
});
