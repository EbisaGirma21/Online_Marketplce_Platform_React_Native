import {
  View,
  Text,
  StyleSheet,
  Pressable,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import { Link } from "expo-router";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../context/AuthContext";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { onLogin } = useAuth();
  const navigation = useNavigation();

  const handleSigninPress = async () => {
    const result = await onLogin(email, password);
    if (result && result.error) {
      alert(result.message);
    } else {
      navigation.navigate("home");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.mainContainer}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ width: "100%", height: "100%" }}>
          <View style={styles.container}>
            <Text style={styles.titleText}>Welcome back to Your market!</Text>
            <TextInput
              autoComplete="email"
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
            <Link style={styles.link} href="#">
              <Text style={{ textAlign: "right" }}>Forgot Password?</Text>
            </Link>
            <Pressable style={styles.button} onPress={handleSigninPress}>
              <Text style={styles.buttonText}>Sign in</Text>
            </Pressable>
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
});
