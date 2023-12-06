import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { TextInput } from "react-native-gesture-handler";
import { Link } from "expo-router";

export default function Signup() {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <Text style={styles.titleText}>Welcome to Your market!</Text>
        <TextInput style={styles.textInput} placeholder="First ame" />
        <TextInput style={styles.textInput} placeholder="Last name" />
        <TextInput style={styles.textInput} placeholder="Address" />
        <TextInput style={styles.textInput} placeholder="Phone number" />
        <TextInput style={styles.textInput} placeholder="Email address" />
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Sign up</Text>
        </Pressable>
      </View>
      <Link style={styles.signUp} href="/auth/signin">
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
