import { createContext, useContext, useState } from "react";
import axios from "axios";
import * as SecureStorage from "expo-secure-store";
import { API_URL } from "./AuthContext";

const MessageContext = createContext();

const MessageProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMessages = async (recepientId) => {
    const senderId = await SecureStorage.getItemAsync("user");
    const response = await axios.get(
      `${API_URL}/message/${senderId}/${recepientId}`
    );
    setMessages(response.data);
  };

  const sendMessage = async (recepientId, messageType, message) => {
    setIsLoading(true);
    const _id = await SecureStorage.getItemAsync("user");
    try {
      const response = await axios.post(`${API_URL}/message`, {
        senderId: _id,
        recepientId,
        messageType,
        message,
      });
      setIsLoading(false);
      return response;
    } catch (e) {
      return { error: true, message: e.response.data.message };
    }
  };
  const updateStatus = async (recepientId) => {
    const senderId = await SecureStorage.getItemAsync("user");

    try {
      const result = await axios.put(
        `${API_URL}/message/updateChatStatus/${senderId}/${recepientId}`
      );
      return result;
    } catch (e) {
      return { error: true, message: e.response.data.message };
    }
  };

  const valueToShare = {
    messages,
    isLoading,
    sendMessage,
    updateStatus,
    fetchMessages,
  };

  return (
    <MessageContext.Provider value={valueToShare}>
      {children}
    </MessageContext.Provider>
  );
};

export { MessageProvider };

export default MessageContext;
