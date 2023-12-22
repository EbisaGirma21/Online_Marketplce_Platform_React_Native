import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import {
  AntDesign,
  Entypo,
  FontAwesome,
  MaterialIcons,
} from "@expo/vector-icons";
import { useAuth } from "../../../context/AuthContext";
import { useNavigation } from "@react-navigation/native";

export default function Profile() {
  const { authState, onGetuser, onChange, user } = useAuth();
  const navigation = useNavigation();
  const [isEditable, setIsEditable] = useState(false);
  const [isPassWord, setIsPassword] = useState(false);

  // user Information edition
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");

  // Password Infromation
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  // authState.authenticated effect
  useEffect(() => {
    const fetchData = async () => {
      if (!authState.authenticated) {
        navigation.navigate("home");
      }
    };

    fetchData();
  }, [authState.authenticated]);

  // page checker
  const handleEditPress = (myFlag) => {
    if (!myFlag) {
      setIsEditable(true);
    } else {
      setIsEditable(false);
    }
  };

  const handleChangePassword = async (myFlag) => {
    // if not password change page
    if (!myFlag) {
      setIsPassword(true);
    }
    // if on Password change page
    else {
      if (newPassword === confirmPassword) {
        const result = await onChange(currentPassword, newPassword);
        if (result && result.error) {
          alert(result.msg);
        } else {
          alert("Password Changed Successfully");
          setIsPassword(false);
        }
      } else {
        alert("Password don't match");
      }
    }
  };

  useEffect(() => {
    onGetuser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authState.authenticated]);

  if (!isEditable && !isPassWord) {
    return (
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <View style={styles.halfCircle} />
          <Text style={styles.myname}>
            {user.firstName} {user.lastName}
          </Text>
          <Image
            style={styles.mypp}
            source={require("../../../assets/myphoto.png")}
          />
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.detailContainer}>
            <AntDesign name="user" size={24} color="#00a76f" />
            <Text style={{ color: "#637381", fontSize: 18 }}>
              {user.firstName} {user.lastName}
            </Text>
          </View>
          <View style={styles.detailContainer}>
            <Entypo name="address" size={24} color="#00a76f" />
            <Text style={{ color: "#637381", fontSize: 18 }}>
              {user.address}
            </Text>
          </View>
          <View style={styles.detailContainer}>
            <AntDesign name="phone" size={24} color="#00a76f" />
            <Text style={{ color: "#637381", fontSize: 18 }}>
              {user.phoneNumber}
            </Text>
          </View>
          <View style={styles.detailContainer}>
            <MaterialIcons name="email" size={24} color="#00a76f" />
            <Text style={{ color: "#637381", fontSize: 18 }}>{user.email}</Text>
          </View>
          <View style={styles.detailContainer}>
            <Entypo name="dial-pad" size={24} color="#00a76f" />
            <View style={styles.password}>
              <Text style={{ color: "#637381", fontSize: 18 }}>Password</Text>
              <FontAwesome
                name="exchange"
                style={{ color: "#637381", fontSize: 18 }}
                onPress={() => handleChangePassword(isPassWord)}
              />
            </View>
          </View>
          <Pressable
            style={styles.editButton}
            onPress={() => handleEditPress(isEditable)}
          >
            <Text style={{ color: "#00a76f", fontSize: 18 }}>Edit Profile</Text>
          </Pressable>
        </View>
      </View>
    );
  } else if (isEditable) {
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
                source={require("../../../assets/myphoto.png")}
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
              <TextInput
                style={styles.textInput}
                placeholder="Email address"
                onChangeText={(text) => setEmail(text)}
                value={user.email}
              />
              <Pressable
                style={styles.editButton}
                onPress={() => handleEditPress(isEditable)}
              >
                <Text style={{ color: "#00a76f", fontSize: 18 }}>Save</Text>
              </Pressable>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  } else if (isPassWord) {
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
                source={require("../../../assets/myphoto.png")}
              />
            </View>
            <View style={styles.infoContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="Current Password"
                secureTextEntry
                onChangeText={(text) => setCurrentPassword(text)}
                value={currentPassword}
              />
              <TextInput
                style={styles.textInput}
                placeholder="New Password"
                secureTextEntry
                onChangeText={(text) => setNewPassword(text)}
                value={newPassword}
              />
              <TextInput
                style={styles.textInput}
                placeholder="Confirm Password"
                secureTextEntry
                onChangeText={(text) => setConfirmPassword(text)}
                value={confirmPassword}
              />

              <Pressable
                style={styles.editButton}
                onPress={() => handleChangePassword(isPassWord)}
              >
                <Text style={{ color: "#00a76f", fontSize: 18 }}>
                  Change Password
                </Text>
              </Pressable>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
}
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
  detailContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    borderBottomColor: "#00a76f",
    borderBottomWidth: 1,
    width: "100%",
    padding: 15,
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
    backgroundColor: "#c7e2d9",

    padding: 15,
    paddingHorizontal: 50,
    marginVertical: 10,
    borderRadius: 30,
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
