import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useContext, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { COLOR } from "../../constants/color";
import { useAuth } from "../../context/AuthContext";
import MessageContext from "../../context/MessageContext";
import { Entypo } from "@expo/vector-icons";

export default function Notify() {
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

  function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();

    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const period = hours < 12 ? "AM" : "PM";

    return `${formattedHours}:${formattedMinutes} ${period}`;
  }

  const formatDatetamp = (timestamp) => {
    const currentDate = new Date();
    const date = new Date(timestamp);

    if (isNaN(date.getTime())) {
      return "Invalid Date";
    }

    // Set time parts to midnight (00:00:00)
    currentDate.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);

    const timeDifference = currentDate - date;
    const oneDay = 24 * 60 * 60 * 1000;

    if (timeDifference < oneDay) {
      return "Today";
    } else if (timeDifference < 2 * oneDay) {
      return "Yesterday";
    } else {
      const options = { month: "long", day: "numeric" };
      return date.toLocaleDateString("en-US", options);
    }
  };

  const renderItem1 = ({ item }) => (
    <TouchableOpacity
      onPress={() => handleUserPress(item._id)}
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        padding: 5,
        backgroundColor: "#ddd",
        borderBottomWidth: 1,
        borderBottomColor: COLOR.swansdown,
      }}
    >
      <View style={styles.userContainer}>
        <View style={styles.container}>
          <Text style={{ whiteSpace: "pre-line" }}>
            <Text style={{ fontWeight: "bold" }}>
              {item.firstName} {item.lastName}{" "}
            </Text>{" "}
            has sent a message. You've received a new message! Check it out.
            Connect with your customer and promote your product, or make a
            purchase.
          </Text>
          <Text>New message received!</Text>
          <Text>
            {formatDatetamp(item.lastStatusChange) +
              "  " +
              formatTimestamp(item.lastStatusChange) || "Long time ago"}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={{ width: "10%", alignItems: "flex-end", padding: 10 }}
      >
        <Entypo name="dots-three-horizontal" size={15} color="black" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
  if (myCustomer.customers && myCustomer.customers.length === 0) {
    return (
      <View style={{ width: "100%", height: "100%", justifyContent: "center" }}>
        <Text style={{ alignSelf: "center" }}>No notification exist yet!</Text>
      </View>
    );
  }
  return (
    <View>
      {/* User cards */}
      <View style={styles.mainContainer}>
        <FlatList
          data={myCustomer.customers}
          keyExtractor={(item) => item._id}
          renderItem={renderItem1}
          style={{
            width: "100%",
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

  userContainer: {
    flex: 1,
    width: "95%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  container: {
    marginLeft: 10,
    gap: 2,
  },
  mypp: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  name: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#000",
    whiteSpace: "pre-line",
  },
  topname: {
    fontSize: 15,
    color: "#00a76f",
  },
  message: {
    color: "#637381",
  },
  time: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#000",
  },
});
