import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  FlatList,
} from "react-native";
import React, { useContext, useEffect } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { useAuth } from "../../../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { Link } from "expo-router";
import { COLOR } from "../../../constants/color";
import MessageContext from "../../../context/MessageContext";
import { formatDistanceToNow } from "date-fns";

export default function Message() {
  const { authState, getMyCustomer, myCustomer, id } = useAuth();
  const { updateStatus } = useContext(MessageContext);
  const navigation = useNavigation();

  // authState.authenticated effect
  useEffect(() => {
    const authChecker = async () => {
      if (!authState.authenticated) {
        navigation.navigate("home");
      }
    };

    authChecker();
  }, []);

  // authState.authenticated effect
  useEffect(() => {
    getMyCustomer();
  }, [id]);

  const handleUserPress = async (id) => {
    navigation.navigate(`chat/my_chat`, { id: id });
    console.log(id);

    await updateStatus(id);
  };
  const renderItem = ({ item }) => (
    <View style={styles.topCard}>
      <Image
        style={styles.mypp}
        source={
          item.image.url
            ? { uri: item.image.url }
            : require("../../../assets/myphoto.png")
        }
      />
      <Text style={styles.topname}>{item.firstName}</Text>
    </View>
  );

  const renderItem1 = ({ item }) => (
    <Pressable
      onPress={() => handleUserPress(item._id)}
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        padding: 5,
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: COLOR.swansdown,
      }}
    >
      <View style={styles.userContainer}>
        <Image
          style={styles.mypp}
          source={
            item.image.url
              ? { uri: item.image.url }
              : require("../../../assets/myphoto.png")
          }
        />
        <View style={styles.container}>
          <Text style={styles.name}>
            {item.firstName + " " + item.lastName}
          </Text>
          <Text
            style={{
              color: `${item.chatStatus !== "unseen" ? "#637381" : "#000"}`,
              fontWeight: "bold",
            }}
          >
            {item.recentMessage.message}
          </Text>
        </View>
      </View>
      <Text style={styles.time}>
        {formatDistanceToNow(item.lastStatusChange, { addSuffix: true }) ||
          "Long time ago"}
      </Text>
    </Pressable>
  );
  if (myCustomer.customers && myCustomer.customers.length === 0) {
    return (
      <View style={{ width: "100%", height: "100%", justifyContent: "center" }}>
        <Text style={{ alignSelf: "center" }}>No chat exist yet!</Text>
      </View>
    );
  }
  return (
    <View>
      <FlatList
        data={myCustomer.customers}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
      />

      {/* User cards */}
      <View style={styles.mainContainer}>
        <FlatList
          data={myCustomer.customers}
          keyExtractor={(item) => item._id}
          renderItem={renderItem1}
          style={{
            width: "100%",
            borderTopWidth: 1,
            borderTopColor: COLOR.jade,
          }}
        />
      </View>
    </View>
  );
}
// }

// my styles
const styles = StyleSheet.create({
  mainContainer: {
    padding: 2,
    gap: 10,
  },
  topCard: {
    marginVertical: 5,
    marginLeft: 10,
    alignItems: "center",
  },
  userContainer: {
    flex: 1,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  container: {
    marginLeft: 10,
    gap: 10,
  },
  mypp: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#00a76f",
  },
  topname: {
    marginTop: 5,
    fontSize: 15,
    color: "#00a76f",
  },
  message: {
    color: "#637381",
  },
  time: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#00a76f",
    alignSelf: "center",
  },
});
