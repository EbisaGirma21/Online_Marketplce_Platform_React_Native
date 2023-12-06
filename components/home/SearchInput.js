import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { TextInput } from "react-native-gesture-handler";

export default function SearchInput() {
  return (
    <View>
      <TextInput style={styles.searchInput} placeholder="Search your Product" />
    </View>
  );
}
const styles = StyleSheet.create({
  searchInput: {
    backgroundColor: "#fff",
    fontSize: 18,
    marginVertical: 10,
    marginHorizontal: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#00a76f",
    borderRadius: 10,
  },
});
