import React, { useContext, useEffect, useState } from "react";
import {
  View,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  TextInput,
  Text,
  Pressable,
  Image,
  FlatList,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Stack, useSearchParams } from "expo-router";
import EmojiSelector from "react-native-emoji-selector";
import MessageContext from "../../context/MessageContext";
import { useAuth } from "../../context/AuthContext";
import { COLOR } from "../../constants/color";

const ChatMessages = () => {
  const { id: recepientId } = useSearchParams();
  const { id, getMyCustomer, myCustomer } = useAuth();
  const { messages, fetchMessages, sendMessage } = useContext(MessageContext);

  const [showEmojiSelector, setShowEmojiSelector] = useState(false);
  const [message, setMessage] = useState("");

  const myInputCardStyle = StyleSheet.flatten([
    styles.myInputCard,
    {
      marginBottom: showEmojiSelector ? 0 : 10,
    },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      await fetchMessages(recepientId);
    };
    recepientId && fetchData();
    // Start polling for new messages
    const intervalId = setInterval(() => {
      recepientId && fetchData();
    }, 5000);
    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, [recepientId]);

  // get Costomer effect
  useEffect(() => {
    getMyCustomer();
  }, []);

  const handleEmojiPress = () => {
    setShowEmojiSelector(!showEmojiSelector);
  };

  const handleSendPress = async () => {
    const messageType = "text";
    const result = await sendMessage(recepientId, messageType, message);
    if (result && result.error) {
      alert(result.message);
      console.log("Error Sent");
    } else {
      setMessage("");
    }
  };

  // time formater
  function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();

    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const period = hours < 12 ? "AM" : "PM";

    return `${formattedHours}:${formattedMinutes} ${period}`;
  }

  const filterCustomerById = myCustomer.customers.filter((custom) => {
    return custom._id === recepientId;
  });

  const formatDatetamp = (timestamp, formatType) => {
    const currentDate = new Date();
    const date = new Date(timestamp);

    if (isNaN(date.getTime())) {
      return "Invalid Date";
    }

    // Set time parts to midnight (00:00:00)
    currentDate.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);

    if (formatType === "day") {
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
    } else if (formatType === "year") {
      const options = { month: "long", day: "numeric", year: "numeric" };
      return date.toLocaleDateString("en-US", options);
    } else {
      return "Invalid formatType";
    }
  };

  let pastDate = "2022-01-01T12:00:00.000Z";
  let form = "year";

  const renderItem = ({ item }) => {
    let isEqual = false;
    const date1 = new Date(item.timeStamp);
    const date2 = new Date(pastDate);

    if (
      date1.getDay() === date2.getDay() &&
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth()
    ) {
      isEqual = true;
    } else if (date1.getFullYear() !== date2.getFullYear()) {
      form = "year";
      pastDate = item.timeStamp;
    } else if (date1.getMonth() !== date2.getMonth()) {
      form = "day";
      pastDate = item.timeStamp;
    } else {
      form = "day";
      pastDate = item.timeStamp;
    }
    return (
      <>
        {!isEqual && (
          <Text
            style={{
              alignSelf: "center",
              padding: 10,
              backgroundColor: COLOR.blackhaze,
              borderRadius: 20,
              marginTop: 2,
              elevation: 1,
            }}
          >
            {formatDatetamp(item.timeStamp, form)}
          </Text>
        )}
        <Pressable
          style={
            item.senderId._id === id
              ? {
                  alignSelf: "flex-end",
                  backgroundColor: "#C8FAD6",
                  padding: 8,
                  maxWidth: "80%",
                  minWidth: "25%",
                  borderRadius: 7,
                  margin: 10,
                  paddingHorizontal: 10,
                  borderRadius: 10,
                  elevation: 1,
                }
              : {
                  alignSelf: "flex-start",
                  backgroundColor: COLOR.blackhaze,
                  padding: 8,
                  maxWidth: "80%",
                  minWidth: "25%",
                  borderRadius: 7,
                  margin: 10,
                  paddingHorizontal: 10,
                  borderRadius: 10,
                  elevation: 1,
                }
          }
        >
          <Text style={{ fontSize: 20 }}>{item.message}</Text>
          <Text style={{ alignSelf: "flex-end", marginTop: -2, fontSize: 9 }}>
            {formatTimestamp(item.timeStamp)}
          </Text>
        </Pressable>
      </>
    );
  };
  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          headerTitle: () => (
            <View style={styles.myHeader}>
              <Image
                style={styles.mypp}
                source={require("../../assets/myphoto.png")}
              />
              <Text style={styles.topname}>
                {filterCustomerById[0].firstName}
              </Text>
            </View>
          ),
        }}
      />
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        ref={(ref) => {
          this.flastList = ref;
        }}
        onContentSizeChange={() => this.flastList.scrollToEnd()}
        showsVerticalScrollIndicator={false}
      />

      <View style={myInputCardStyle}>
        <Entypo
          onPress={handleEmojiPress}
          name="emoji-happy"
          size={24}
          color={COLOR.jade}
        />
        <TextInput
          placeholder="Type your message..."
          style={styles.myInput}
          value={message}
          onChangeText={(text) => setMessage(text)}
        />
        <Entypo name="camera" size={24} color={COLOR.jade} />
        <Ionicons name="mic" size={24} color={COLOR.jade} />
        <Pressable onPress={handleSendPress}>
          <FontAwesome name="send" size={24} color={COLOR.jade} />
        </Pressable>
      </View>
      {showEmojiSelector && (
        <EmojiSelector
          style={styles.emojiSelector}
          onEmojiSelected={(emoji) =>
            setMessage((prevMessage) => prevMessage + emoji)
          }
        />
      )}
    </KeyboardAvoidingView>
  );
};

export default ChatMessages;

const styles = StyleSheet.create({
  myInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: COLOR.jade,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  mypp: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  myHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  myInputCard: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: COLOR.jade,
    gap: 5,
  },
  emojiSelector: {
    height: 250,
  },
});
