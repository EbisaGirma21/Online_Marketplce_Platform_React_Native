import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Stack } from "expo-router";
import { COLOR } from "../../constants/color";
import { EvilIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { useAuth } from "../../context/AuthContext";
import { StatusBar } from "expo-status-bar";

const Setting = () => {
  const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);

  const navigation = useNavigation();
  const { onLogout } = useAuth();

  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };

  const toggleLogoutModal = () => {
    setLogoutModalVisible(!isLogoutModalVisible);
  };

  const handleLogout = (param) => {
    if (param) {
      onLogout();
    }
    setLogoutModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <View style={styles.topCard}>
        <Text style={styles.title}>Settings</Text>
        <Text style={{ color: "#fff", fontSize: 20 }}>Account Information</Text>
      </View>
      <View style={styles.bottomCard}>
        <Text style={{ color: COLOR.palesky }}>Login and securty</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigateToScreen("personal_info")}
        >
          <View style={styles.myView}>
            <TouchableOpacity style={styles.icons}>
              <EvilIcons
                name="user"
                style={{ alignSelf: "center", color: COLOR.jade, fontSize: 25 }}
              />
            </TouchableOpacity>
            <Text style={styles.buttonText}>Personal Info</Text>
          </View>
          <Text style={{ color: COLOR.palesky, fontSize: 28 }}>{">"}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigateToScreen("change_email")}
        >
          <View style={styles.myView}>
            <TouchableOpacity style={styles.icons}>
              <FontAwesome
                name="stack-exchange"
                style={{ alignSelf: "center", color: COLOR.jade, fontSize: 18 }}
              />
            </TouchableOpacity>
            <Text style={styles.buttonText}>Change Email</Text>
          </View>
          <Text style={{ color: COLOR.palesky, fontSize: 28 }}>{">"}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigateToScreen("change_password")}
        >
          <View style={styles.myView}>
            <TouchableOpacity style={styles.icons}>
              <FontAwesome
                name="exchange"
                style={{ alignSelf: "center", color: COLOR.jade, fontSize: 18 }}
              />
            </TouchableOpacity>
            <Text style={styles.buttonText}>Change Password</Text>
          </View>
          <Text style={{ color: COLOR.palesky, fontSize: 28 }}>{">"}</Text>
        </TouchableOpacity>
        <Text style={{ color: COLOR.palesky, marginTop: 20 }}>
          Deactivate accout
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigateToScreen("delete_account")}
        >
          <View style={styles.myView}>
            <TouchableOpacity style={styles.icons}>
              <AntDesign
                name="deleteusergroup"
                style={{ alignSelf: "center", color: COLOR.jade, fontSize: 25 }}
              />
            </TouchableOpacity>
            <Text style={styles.buttonText}>Delete Account</Text>
          </View>
          <Text style={{ color: COLOR.palesky, fontSize: 28 }}>{">"}</Text>
        </TouchableOpacity>
        <Text style={{ color: COLOR.palesky, marginTop: 20 }}>Logout</Text>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={toggleLogoutModal}
        >
          <View style={styles.myView}>
            <TouchableOpacity style={styles.icons}>
              <AntDesign
                name="logout"
                style={{ alignSelf: "center", color: "#e74c3c", fontSize: 18 }}
              />
            </TouchableOpacity>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </View>
          <Text style={{ color: "#fff", fontSize: 28 }}>{">"}</Text>
        </TouchableOpacity>
      </View>

      {/* Logout Confirmation Modal */}
      <Modal
        visible={isLogoutModalVisible}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTop}>
              Are you sure you want to logout?
            </Text>
            <View style={styles.modalBottom}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => handleLogout(false)}
              >
                <Text style={{ color: "#e74c3c", fontSize: 18 }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => handleLogout(true)}
              >
                <Text style={{ color: COLOR.jade, fontSize: 18 }}>Yes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topCard: {
    width: "100%",
    height: "25%",
    backgroundColor: COLOR.jade,
    justifyContent: "center",
    padding: 20,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
  },
  bottomCard: {
    width: "90%",
    alignSelf: "center",
    backgroundColor: "#fff",
    padding: 20,
    elevation: 5,
    marginTop: -50,
    borderRadius: 20,
  },
  button: {
    width: "100%",
    padding: 10,
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: COLOR.jade,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  buttonText: {
    color: COLOR.jade,
    fontSize: 15,
  },
  logoutButton: {
    width: "100%",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#e74c3c",
  },
  logoutButtonText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#e74c3c",
  },
  myView: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  icons: {
    backgroundColor: COLOR.blackhaze,
    borderRadius: 18,
    width: 35,
    height: 35,
    padding: 6,
  },
  // Update modal styles
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "flex-end",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: 10,
  },
  modalTop: {
    backgroundColor: COLOR.swansdown,
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    color: COLOR.jade,
  },
  modalBottom: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    padding: 10,
  },
  modalButton: {
    backgroundColor: COLOR.blackhaze,
    padding: 5,
    borderRadius: 5,
    paddingHorizontal: 20,
  },
});

export default Setting;
