import { View, Text, TextInput, StyleSheet, ScrollView } from "react-native";
import React, { useEffect } from "react";
import TextField from "../../../components/shared/TextField";
import Buttton from "../../../components/shared/Buttton";
import { COLOR } from "../../../constants/color";
import { useAuth } from "../../../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { Redirect } from "expo-router";

export default function Sell() {
  const { authState } = useAuth();
  const navigation = useNavigation();

  // authState.authenticated effect
  useEffect(() => {
    const fetchData = async () => {
      if (!authState.authenticated) {
        navigation.navigate("home");
      }
    };

    fetchData();
  }, [authState.authenticated]);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.form}>
        <Text style={styles.formTitle}>Add Your Product</Text>
        <TextField placeholder="Select Catagory" />
        <TextField placeholder="Product Name" />
        <TextField placeholder="Short Description" />
        <TextField placeholder="Location" />
        <TextField autoComplete="name" placeholder="Name" />
        <TextField autoComplete="tel" placeholder="Phone Number" />
        <Buttton title="Post Product" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  form: {
    width: "100%",
  },
  formTitle: {
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 18,
    color: COLOR.palesky,
  },
});
