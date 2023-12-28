import React, { useContext, useEffect, useState } from "react";
import {
  View,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  TextInput,
  Text,
  Pressable,
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
  const { id } = useAuth();
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
    recepientId && fetchMessages(recepientId);
    // Start polling for new messages
    const intervalId = setInterval(() => {
      recepientId && fetchMessages(recepientId);
    }, 500);

    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, [recepientId]);

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
      console.log("Successfully Sent");
      setMessage("");
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <Stack.Screen options={{ headerTitle: `User ${recepientId}` }} />
      <ScrollView
        style={{ flex: 1, flexDirection: "column-reverse", flexGrow: 1 }}
        contentContainerStyle={{ justifyContent: "flex-end" }}
      >
        {messages.map((item, index) => {
          return (
            <Pressable
              key={index}
              style={
                item.senderId._id === id
                  ? {
                      alignSelf: "flex-end",
                      backgroundColor: "#C8FAD6",
                      padding: 8,
                      maxWidth: "80%",
                      borderRadius: 7,
                      margin: 10,
                    }
                  : {
                      alignSelf: "flex-start",
                      backgroundColor: "#F4F6F8",
                      padding: 8,
                      maxWidth: "80%",
                      borderRadius: 7,
                      margin: 10,
                    }
              }
            >
              8<Text style={{ fontSize: 13 }}>{item.message}</Text>
            </Pressable>
          );
        })}
      </ScrollView>
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
