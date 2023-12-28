import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import * as SecureStorage from "expo-secure-store";
import { useNavigation } from "@react-navigation/native";

const TOKEN_KEY = "my-jwt";
const CURRENT_USER = "user";
const USER_ROLE = "role";
export const API_URL = "http://10.194.65.14:8000/api";
const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [customer, setCustomer] = useState([]);
  const [myCustomer, setMyCustomer] = useState([]);

  const [authState, setAuthState] = useState({
    token: null,
    authenticated: false,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [id, setId] = useState(SecureStorage.getItemAsync(CURRENT_USER));
  const [role, setRole] = useState("seller");
  const navigation = useNavigation();

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStorage.getItemAsync(TOKEN_KEY);
      const _id = await SecureStorage.getItemAsync(CURRENT_USER);
      const role = await SecureStorage.getItemAsync(USER_ROLE);

      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        setId(_id);
        setRole(role);
        getUser();
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

  const sellerRegistration = async (
    kebeleId,
    nationalId,
    birthDate,
    specificLoaction
  ) => {
    try {
      const result = await axios.post(`${API_URL}/user/sellerRegistration`, {
        kebeleId,
        nationalId,
        birthDate,
        specificLoaction,
        id,
      });

      return result;
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
      await SecureStorage.setItemAsync(USER_ROLE, result.data.role);

      setId(result.data._id);
      setRole(result.data.role);

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

  const getCustomer = async (id) => {
    try {
      const result = await axios.get(`${API_URL}/user/${id}`);
      setCustomer(result.data);
    } catch (e) {
      return { error: true, message: e.response.data.message };
    }
  };

  const getMyCustomer = async () => {
    try {
      const result = await axios.get(`${API_URL}/user/customers/${id}`);
      setMyCustomer(result.data);
    } catch (e) {
      console.log("this", e);
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
    await SecureStorage.deleteItemAsync(USER_ROLE);
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
    onSellerRegistration: sellerRegistration,
    getCustomer,
    getMyCustomer,
    myCustomer,
    customer,
    user,
    id,
    role,
    authState,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
