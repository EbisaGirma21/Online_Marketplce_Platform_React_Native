import {
  View,
  Text,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  TextInput,
  Pressable,
  ToastAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

const ConfirmEmail = () => {
  // context api
  const navigation = useNavigation();
  const { confirmEmail } = useAuth();
  const [email, setEmail] = useState("");

  const handleChangePress = async () => {
    const result = await confirmEmail(email);
    if (result && result.error) {
      alert(result.message);
    } else {
      navigation.navigate("confirmation_code", { email: email });
    }
  };

  // toast Funtion
  function showToast(message) {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <StatusBar style="dark" />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.topContainer}>
            <View style={styles.halfCircle} />
            <Image
              style={styles.mypp}
              source={require("../../assets/myphoto.png")}
            />
          </View>
          <View style={styles.infoContainer}>
            <TextInput
              keyboardType="email-address"
              style={styles.textInput}
              placeholder="Email address"
              onChangeText={(text) => setEmail(text)}
              value={email}
            />
            <Pressable style={styles.editButton} onPress={handleChangePress}>
              <Text
                style={{ color: "#00a76f", fontSize: 18, alignSelf: "center" }}
              >
                Submit
              </Text>
            </Pressable>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default ConfirmEmail;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "column",
  },
  topContainer: {
    position: "relative",
    alignItems: "center",
  },
  halfCircle: {
    backgroundColor: "#c7e2d9",
    width: 460,
    height: 230,
    borderBottomLeftRadius: 230,
    borderBottomRightRadius: 230,
    position: "absolute",
    top: -50,
  },
  infoContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    top: 210,
  },
  mypp: {
    width: 70,
    height: 70,
    borderRadius: 50,
    position: "absolute",
    top: 140,
  },
  editButton: {
    width: "70%",
    backgroundColor: "#c7e2d9",
    padding: 15,
    paddingHorizontal: 50,
    marginVertical: 10,
    borderRadius: 10,
  },
  password: {
    width: "80%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textInput: {
    width: "70%",
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#00a76f",
    fontSize: 18,
    marginTop: 19,
  },
});
