import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import * as SecureStorage from "expo-secure-store";
import { useNavigation } from "@react-navigation/native";

const TOKEN_KEY = "my-jwt";
const CURRENT_USER = "user";
export const API_URL = "http://10.194.65.19:8000/api";
const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState([]);

  const [authState, setAuthState] = useState({
    token: null,
    authenticated: false,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [id, setId] = useState(SecureStorage.getItemAsync(CURRENT_USER));
  const navigation = useNavigation();

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStorage.getItemAsync(TOKEN_KEY);
      const _id = await SecureStorage.getItemAsync(CURRENT_USER);

      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        setId(_id);
        setAuthState({ token: token, authenticated: true });
        setIsLoading(false);

        navigation.navigate("home");
      }
    };
    loadToken();
  }, []);

  const register = async (
    firstName,
    lastName,
    address,
    phoneNumber,
    email,
    password
  ) => {
    try {
      return await axios.post(`${API_URL}/user/registration`, {
        firstName,
        lastName,
        address,
        phoneNumber,
        email,
        password,
      });
    } catch (e) {
      return { error: true, message: e.response.data.message };
    }
  };

  const login = async (email, password) => {
    try {
      const result = await axios.post(`${API_URL}/user/login`, {
        email,
        password,
      });

      setAuthState({ token: result.data.token, authenticated: true });
      setIsLoading(false);

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${result.data.token}`;

      await SecureStorage.setItemAsync(TOKEN_KEY, result.data.token);
      await SecureStorage.setItemAsync(CURRENT_USER, result.data._id);
      setId(result.data._id);

      return result;
    } catch (e) {
      return { error: true, message: e.response.data.message };
    }
  };

  const getUser = async () => {
    try {
      const result = await axios.get(`${API_URL}/user/${id}`);
      setUser(result.data);
    } catch (e) {
      return { error: true, message: e.response.data.message };
    }
  };
  const changePassword = async (currentPassword, newPassword) => {
    try {
      const result = await axios.post(`${API_URL}/user/change`, {
        id,
        currentPassword,
        newPassword,
      });
      return result;
    } catch (e) {
      return { error: true, message: e.response.data.message };
    }
  };

  const logout = async () => {
    await SecureStorage.deleteItemAsync(TOKEN_KEY);
    await SecureStorage.deleteItemAsync(CURRENT_USER);
    axios.defaults.headers.common["Authorization"] = "";
    setAuthState({ token: null, authenticated: false });
    navigation.navigate("auth");
  };

  const value = {
    onRegister: register,
    onLogin: login,
    onLogout: logout,
    onGetuser: getUser,
    onChange: changePassword,
    user,
    authState,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
