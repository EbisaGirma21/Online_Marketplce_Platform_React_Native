import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Linking,
  ScrollView,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { COLOR } from "../../../../constants/color";
import TextField from "../../../../components/shared/TextField";
import ProductCard from "../../../../components/home/ProductCard";
import ProductContext from "../../../../context/ProductContext";
import { FlatList } from "react-native-gesture-handler";
import { useAuth } from "../../../../context/AuthContext";
import { useNavigation, useRoute } from "@react-navigation/native";
import MessageContext from "../../../../context/MessageContext";
// import { ScrollView } from "react-native-virtualized-view";

const ProductDetail = () => {
  // my context api
  const { products, fetchProducts, myWishList } = useContext(ProductContext);
  const { getCustomer, customer, id, authState } = useAuth();
  const { sendMessage } = useContext(MessageContext);

  const navigation = useNavigation();

  // my use state
  const [message, setMessage] = useState("");

  // params
  const route = useRoute();
  const { productId } = route.params;

  // text
  const messageBody = "Please Call me back";

  // product use effect
  useEffect(() => {
    productId && fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  const filteredProduct = products.filter((product) => {
    return product._id === productId;
  });
  const otherProducts = products.filter((product) => {
    return product._id !== productId;
  });

  // product use effect
  useEffect(() => {
    filteredProduct && getCustomer(filteredProduct[0].productOwner);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredProduct]);

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

  const handleCallPress = () => {
    const phoneNumber = `tel:${customer.phoneNumber}`;
    Linking.openURL(phoneNumber);
  };

  const handleSendTextPress = () => {
    const smsUrl = `sms:${customer.phoneNumber}${
      messageBody ? `?body=${encodeURIComponent(messageBody)}` : ""
    }`;
    Linking.openURL(smsUrl);
  };
  const handleStartChatPress = async () => {
    if (!authState.authenticated) {
      navigation.navigate("auth");
    } else {
      const messageType = "text";
      const result = await sendMessage(
        filteredProduct[0].productOwner,
        messageType,
        message
      );
      if (result && result.error) {
        console.log("Error Sent");
      } else {
        setMessage("");
        navigation.navigate("message");
      }
    }
  };

  const handleWishListPress = async () => {
    if (!authState.authenticated) {
      navigation.navigate("auth");
    } else {
      const result = await myWishList(productId);
      if (result && result.error) {
      } else {
        alert("Successfully added");
      }
    }
  };

  return (
    <ScrollView>
      <View>
        <Image
          source={
            filteredProduct[0].image.url
              ? { uri: filteredProduct[0].image.url }
              : require("../../../../assets/myImage.jpg")
          }
          style={styles.myProduct}
        />
        <View style={styles.topCard}>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <View style={{ paddingLeft: 5, width: "50%" }}>
              <Text
                style={{ color: COLOR.palesky, fontWeight: "bold", padding: 5 }}
              >
                Name: {filteredProduct[0].productName}
              </Text>
              <Text
                style={{ color: COLOR.palesky, fontWeight: "bold", padding: 5 }}
              >
                Brand: {filteredProduct[0].brandName}
              </Text>
              <Text
                style={{ color: COLOR.jade, fontWeight: "bold", padding: 5 }}
              >
                Price: ETB {filteredProduct[0].price}
              </Text>
            </View>
            <View style={{ paddingLeft: 5, width: "50%" }}>
              <Text
                style={{ color: COLOR.palesky, fontWeight: "bold", padding: 5 }}
              >
                Model: {filteredProduct[0].modelName}
              </Text>
              <Text
                style={{ color: COLOR.palesky, fontWeight: "bold", padding: 5 }}
              >
                Spec: {filteredProduct[0].specification}
              </Text>
              <Text
                style={{ color: COLOR.palesky, fontWeight: "bold", padding: 5 }}
              >
                Condition: {filteredProduct[0].condition}
              </Text>
            </View>
          </View>
          {id !== filteredProduct[0].productOwner && (
            <View style={styles.topInnerCard}>
              <TouchableOpacity
                style={styles.reqButton}
                onPress={handleSendTextPress}
              >
                <Text style={{ alignSelf: "center", color: COLOR.palesky }}>
                  Request Call Back
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.callButton}
                onPress={handleCallPress}
              >
                <Text style={{ alignSelf: "center", color: "#fff" }}>Call</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        {id !== filteredProduct[0].productOwner && (
          <View style={styles.contactCard}>
            <Text>Start to chat with seller</Text>
            <View style={styles.topInnerCards}>
              <TouchableOpacity style={styles.cButton}>
                <Text style={{ alignSelf: "center", color: COLOR.palesky }}>
                  Add to Cart
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cButton}>
                <Text style={{ alignSelf: "center", color: COLOR.palesky }}>
                  Is this avialable
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cButton}>
                <Text style={{ alignSelf: "center", color: COLOR.palesky }}>
                  Last price
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cButton}
                onPress={handleWishListPress}
              >
                <Text style={{ alignSelf: "center", color: COLOR.palesky }}>
                  Add to Wishlist
                </Text>
              </TouchableOpacity>
            </View>
            <TextField
              placeholder={"Write your message here"}
              value={message}
              onChangeText={(text) => setMessage(text)}
            />
            <TouchableOpacity
              style={styles.chatButton}
              onPress={() => handleStartChatPress()}
            >
              <Text style={{ color: "#fff", alignSelf: "center" }}>
                Start Chat
              </Text>
            </TouchableOpacity>
          </View>
        )}
        <View style={styles.detailCard}>
          <View style={{ width: "50%" }}>
            <Text
              style={{ color: COLOR.palesky, fontWeight: "bold", padding: 5 }}
            >
              Location: {filteredProduct[0].productLocation}
            </Text>
            <Text
              style={{ color: COLOR.palesky, fontWeight: "bold", padding: 5 }}
            >
              Desc: {filteredProduct[0].shortDescription}
            </Text>
          </View>
        </View>
      </View>
      <View>
        <Text style={{ color: COLOR.palesky, fontWeight: "bold", padding: 5 }}>
          Other Products
        </Text>
        <FlatList
          data={otherProducts}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          numColumns={2}
          contentContainerStyle={styles.gridRow}
        />
      </View>
    </ScrollView>
  );
};

export default ProductDetail;

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
    justifyContent: "center",
  },

  cButton: {
    width: "25%",
    paddingTop: 8,
    paddingBottom: 8,
    borderWidth: 1,
    borderColor: COLOR.jade,
    borderRadius: 10,
    justifyContent: "center",
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
