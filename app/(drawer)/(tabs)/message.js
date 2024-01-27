import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useEffect, useRef } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { socket, useAuth } from "../../../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { Link } from "expo-router";
import { COLOR } from "../../../constants/color";
import MessageContext from "../../../context/MessageContext";
import { formatDistanceToNow, formatRelative } from "date-fns";
import { io } from "socket.io-client";
import { StatusBar } from "expo-status-bar";

export default function Message() {
  const { authState, getMyCustomer, myCustomer, id } = useAuth();
  const { updateStatus } = useContext(MessageContext);
  const navigation = useNavigation();
  const socket = useRef();

  useEffect(() => {
    socket.current = io("http://192.168.137.55:8900");
  }, []);

  // get message use effect
  useEffect(() => {
    socket.current.emit("addUser", id);
    socket.current.on("getUsers", (users) => {});
  }, [id]);

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
    socket.current.on("receive_message", () => {
      getMyCustomer();
    });
  }, []);

  const handleUserPress = async (recipient, lastSender, chatStatus) => {
    socket.current.emit("send_message");
    if (lastSender === id) {
      navigation.navigate(`chat/my_chat`, { id: recipient });
    } else if (chatStatus !== "seen") {
      const result = await updateStatus(recipient);
      if (result && result.error) {
        alert("An error occured");
      } else {
        navigation.navigate(`chat/my_chat`, { id: recipient });
      }
    } else {
      navigation.navigate(`chat/my_chat`, { id: recipient });
    }
  };

  function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const currentDate = new Date();

    const isToday =
      date.toISOString().split("T")[0] ===
      currentDate.toISOString().split("T")[0];
    const isThisWeek =
      date >=
      new Date(currentDate - (currentDate.getDay() - 1) * 24 * 60 * 60 * 1000);

    if (isToday) {
      // If it's today, return the time
      const hours = date.getHours();
      const minutes = date.getMinutes();
      return `${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
    } else if (isThisWeek) {
      // If it's this week, return the day of the week
      const daysOfWeek = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      return daysOfWeek[date.getDay()];
    } else if (
      date.getMonth() === currentDate.getMonth() &&
      date.getFullYear() === currentDate.getFullYear()
    ) {
      // If it's this month, return the month and day
      const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      return `${monthNames[date.getMonth()]} ${date.getDate()}`;
    } else if (date >= new Date(currentDate - 365 * 24 * 60 * 60 * 1000)) {
      // If it's within the last year, return the month, day, and year
      return `${date.getDate()}.${date.getMonth() + 1}.${String(
        date.getFullYear()
      ).slice(-2)}`;
    } else {
      // If it's more than a year ago, return the full date
      return `${String(date.getDate()).padStart(2, "0")}.${String(
        date.getMonth() + 1
      ).padStart(2, "0")}.${String(date.getFullYear()).slice(-2)}`;
    }
  }

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
      onPress={() =>
        handleUserPress(item._id, item.recentMessage.senderId, item.chatStatus)
      }
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
              fontWeight: `${
                item.chatStatus !== "unseen" &&
                item.recentMessage.senderId !== id
                  ? "400"
                  : "300"
              }`,
            }}
          >
            {item.recentMessage.message}
          </Text>
        </View>
      </View>
      <View
        style={{
          gap: 3,
          marginRight: 10,
          alignSelf: "center",
        }}
      >
        <Text style={styles.time}>
          {formatTimestamp(item.lastStatusChange) || "Long time ago"}
        </Text>
        {item.unSeenMessage !== 0 && (
          <Text style={styles.unseen}>{item.unSeenMessage || ""}</Text>
        )}
      </View>
    </Pressable>
  );
  if (myCustomer.customers && myCustomer.customers.length === 0) {
    return (
      <View style={{ width: "100%", height: "100%", justifyContent: "center" }}>
        <Text style={{ alignSelf: "center" }}>No chat exist yet!</Text>
      </View>
    );
  }

  return myCustomer.length === 0 ? (
    <ActivityIndicator style={styles.spinner} size="large" color={COLOR.jade} />
  ) : (
    <View>
      <StatusBar style="dark" />
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
    color: COLOR.palesky,
  },
  unseen: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    backgroundColor: COLOR.jade,
    borderRadius: 100,
  },
});
