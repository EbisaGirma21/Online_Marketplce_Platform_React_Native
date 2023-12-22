import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
  FlatList,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import ProductCard from "../../components/home/ProductCard";
import TextField from "../../components/shared/TextField";
import { COLOR } from "../../constants/color";
import * as ImagePicker from "expo-image-picker";
import { TextInput } from "react-native-gesture-handler";
import ProductCatagorysContext from "../../context/ProductCatagoryContext";
import * as FileSystem from "expo-file-system";

export default function ProductCatagory() {
  const [isAddPage, setIsAddPage] = useState(false);

  // my input attribute
  const [catagory, setCatagory] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [image, setImage] = useState(null);
  const [productNames, setProductNames] = useState([]);

  // context api
  const { createProductCatagory, productCatagories, fetchProductCatagories } =
    useContext(ProductCatagorysContext);

  // catagory use effect
  useEffect(() => {
    fetchProductCatagories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

      // Use "canceled" instead of "cancelled"
      if (!result.canceled) {
        await setFileToBase(result.assets[0].uri);
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error picking image:", error);
    }
  };

  const setFileToBase = async (uri) => {
    try {
      let fileContent = await FileSystem.readAsStringAsync(uri, {
        encoding: "base64",
      });
      setImageFile(fileContent);
    } catch (error) {
      console.error("Error reading file:", error);
    }
  };

  const handleAddPress = async (myFlag) => {
    if (!myFlag) {
      setIsAddPage(true);
    } else {
      const result = await createProductCatagory(
        catagory,
        productNames,
        imageFile
      );
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
      <ProductCard catagory={item.catagory} />
    </View>
  );

  if (!isAddPage) {
    return (
      <View>
        <View style={styles.topPart}>
          <Pressable
            style={styles.button}
            onPress={() => handleAddPress(isAddPage)}
          >
            <Text style={{ color: COLOR.jade }}>Add Catagory</Text>
          </Pressable>
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
        <Text style={styles.formTitle}>Add Your Product</Text>
        <View style={styles.infoContainer}>
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
          <Pressable style={styles.button} onPress={pickImage}>
            <Text
              style={{ color: "#00a76f", fontSize: 18, alignSelf: "center" }}
            >
              Choose a photo
            </Text>
          </Pressable>

          <View style={styles.myImageView}>
            {image && (
              <Image style={styles.myImageView} source={{ uri: image }} />
            )}
          </View>

          <Pressable
            style={styles.button}
            onPress={() => handleAddPress(isAddPage)}
          >
            <Text
              style={{ color: "#00a76f", fontSize: 18, alignSelf: "center" }}
            >
              <Text>Add Catagory</Text>
            </Text>
          </Pressable>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainProductContainer: {},
  gridRow: {},
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
  },
  myImageView: {
    width: 320,
    height: 320,
    alignSelf: "center",
  },
  formTitle: {
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 18,
    color: COLOR.palesky,
  },
});
