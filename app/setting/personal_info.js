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
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { FontAwesome } from "@expo/vector-icons";
import { COLOR } from "../../constants/color";
import { StatusBar } from "expo-status-bar";
const PersonalInfo = () => {
  // user Information edition

  const [image, setImage] = useState(null);

  // context api
  const { onGetuser, user, updateProfile, updateInformation } = useAuth();
  const navigation = useNavigation();

  useEffect(() => {
    onGetuser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // user Information edition
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [address, setAddress] = useState(user.address);
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);

  // to pick an image from the
  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error picking image:", error);
    }
  };

  const handleChangePress = async () => {
    const formData = new FormData();
    if (image) {
      const localUri = image;
      const filename = localUri.split("/").pop();

      formData.append("image", {
        uri: localUri,
        name: filename,
        type: "image/jpeg",
      });
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("address", address);
      formData.append("phoneNumber", phoneNumber);
    }
    let result;
    if (image) {
      result = await updateProfile(formData);
    } else {
      result = await updateInformation(
        firstName,
        lastName,
        address,
        phoneNumber
      );
    }

    if (result && result.error) {
      alert(result.message);
    } else {
      navigation.navigate("_setting");
      showToast("Information Changed Successfully");
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
            <Text style={styles.myname}>
              {user.firstName} {user.lastName}
            </Text>
            <TouchableOpacity style={styles.myppB} onPress={pickImage}>
              <Image
                style={styles.mypp}
                source={
                  image
                    ? { uri: image }
                    : user.image
                    ? { uri: user.image.url }
                    : require("../../assets/myphoto.png")
                }
              />
            </TouchableOpacity>

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                width: "95%",
                position: "absolute",
                justifyContent: "center",
                top: 175,
                right: -20,
              }}
            >
              <TouchableOpacity
                onPress={pickImage}
                style={{
                  backgroundColor: "#000",
                  borderRadius: 50,
                  padding: 10,
                  borderWidth: 1,
                  borderColor: COLOR.jade,
                }}
              >
                <FontAwesome
                  name="photo"
                  size={14}
                  color="#fff"
                  style={{ alignSelf: "center" }}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.infoContainer}>
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
    top: 70,
  },
  mypp: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  myppB: {
    width: 100,
    height: 100,
    borderRadius: 50,
    position: "absolute",
    top: 110,
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
