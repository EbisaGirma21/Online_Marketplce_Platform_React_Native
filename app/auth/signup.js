import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import { Link } from "expo-router";
import { useAuth } from "../../context/AuthContext";
import { useNavigation } from "@react-navigation/native";

export default function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [consfirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { onRegister } = useAuth();
  const navigation = useNavigation();

  const handleSignupPress = async () => {
    if (password === consfirmPassword) {
      const result = await onRegister(
        firstName,
        lastName,
        address,
        phoneNumber,
        email,
        password
      );
      if (result && result.error) {
        alert(result.message);
      } else {
        navigation.navigate("signin");
      }
    } else {
      alert("Password dont match");
    }
  };

  return (
    <View style={styles.mainContainer}>
      <ScrollView
        style={{ width: "100%" }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <Text style={styles.titleText}>Welcome to Your market!</Text>
          <TextInput
            style={styles.textInput}
            placeholder="First ame"
            onChangeText={(text) => setFirstName(text)}
            value={firstName}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Last name"
            onChangeText={(text) => setLastName(text)}
            value={lastName}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Address"
            onChangeText={(text) => setAddress(text)}
            value={address}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Phone number"
            onChangeText={(text) => setPhoneNumber(text)}
            value={phoneNumber}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Email address"
            onChangeText={(text) => setEmail(text)}
            value={email}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Password"
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
            value={password}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Confirm Password"
            secureTextEntry
            onChangeText={(text) => setConfirmPassword(text)}
            value={consfirmPassword}
          />
          <Pressable style={styles.button} onPress={handleSignupPress}>
            <Text style={styles.buttonText}>Sign up</Text>
          </Pressable>
        </View>
      </ScrollView>

      <Link style={styles.signUp} href="auth/signin">
        <Text>
          Do have an account? <Text>Sign in</Text>
        </Text>
      </Link>
    </View>
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
    marginTop: 20,
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
