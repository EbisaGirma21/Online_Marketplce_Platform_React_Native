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

const PersonalInfo = () => {
  // user Information edition
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  // context api
  const { onGetuser, user } = useAuth();
  const navigation = useNavigation();

  useEffect(() => {
    onGetuser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChangePress = () => {
    navigation.navigate("setting");
    showToast("Information Changed Successfully");
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
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.topContainer}>
            <View style={styles.halfCircle} />
            <Text style={styles.myname}>
              {user.firstName} {user.lastName}
            </Text>
            <Image
              style={styles.mypp}
              source={require("../../assets/myphoto.png")}
            />
          </View>
          <View style={styles.infoContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="First ame"
              onChangeText={(text) => setFirstName(text)}
              value={user.firstName}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Last name"
              onChangeText={(text) => setLastName(text)}
              value={user.lastName}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Address"
              onChangeText={(text) => setAddress(text)}
              value={user.address}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Phone number"
              onChangeText={(text) => setPhoneNumber(text)}
              value={user.phoneNumber}
            />

            <Pressable style={styles.editButton} onPress={handleChangePress}>
              <Text
                style={{ color: "#00a76f", fontSize: 18, alignSelf: "center" }}
              >
                Save
              </Text>
            </Pressable>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default PersonalInfo;
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
  myname: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#00a76f",
    position: "absolute",
    top: 110,
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
