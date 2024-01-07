import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
} from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import { Link } from "expo-router";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../context/AuthContext";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { COLOR } from "../../constants/color";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { onLogin, isLoading } = useAuth();
  const navigation = useNavigation();

  const handleSigninPress = async () => {
    if (!email || !password) {
      alert("Please fill all field!");
    } else {
      const myToken = await registerForPushNotificationsAsync();
      const result = await onLogin(email, password, myToken);
      if (result && result.error) {
        alert(result.message);
      } else {
        setEmail("");
        setPassword("");
        navigation.navigate("home");
      }
    }
  };

  async function registerForPushNotificationsAsync() {
    let token;
    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }

      token = (
        await Notifications.getExpoPushTokenAsync({
          projectId: "d29e0a1a-3a9c-440b-acb3-ed371c6be510",
        })
      ).data;
    } else {
      alert("Must use physical device for Push Notifications");
    }
    return token;
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.mainContainer}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ width: "100%", height: "100%" }}>
          <View style={styles.container}>
            <Image
              source={require("../../assets/web.png")}
              style={styles.mycard}
            />
            <Text style={styles.titleText}>Welcome back to Your market!</Text>
            <TextInput
              autoComplete="email"
              keyboardType="email-address"
              style={styles.textInput}
              placeholder="Email address"
              onChangeText={(text) => setEmail(text)}
              value={email}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Password"
              onChangeText={(text) => setPassword(text)}
              secureTextEntry
              value={password}
            />
            <Link style={styles.link} href="forgot_password">
              <Text style={{ textAlign: "right" }}>Forgot Password?</Text>
            </Link>
            <TouchableOpacity
              style={styles.button}
              onPress={handleSigninPress}
              disabled={isLoading}
            >
              <Text style={styles.buttonText}>Sign in</Text>
            </TouchableOpacity>
          </View>
          <Link style={styles.signUp} href="/auth/signup">
            <Text>
              Don't have an account? <Text>Sign up</Text>
            </Text>
          </Link>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  container: {
    width: "100%",
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  textInput: {
    width: "70%",
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#00a76f",
    fontSize: 18,
  },
  titleText: {
    fontSize: 25,
    color: "#637381",
  },
  link: {
    width: "70%",
    textAlign: "right",
  },
  button: {
    width: "70%",
    backgroundColor: "#c7e2d9",
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    color: "#00a76f",
    alignSelf: "center",
  },
  signUp: {
    padding: 20,
    borderTopWidth: 1,
    borderColor: "#00a76f",
    width: "100%",
    textAlign: "center",
  },
  mycard: {
    width: "90%",
    height: 200,
    alignSelf: "center",
    // backgroundColor: COLOR.jade,
  },
});
