import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { TextInput } from "react-native-gesture-handler";
import { COLOR } from "../../constants/color";

export default function TextField({
  autoComplete,
  placeholder,
  value,
  onChangeText,
}) {
  return (
    <View>
      <TextInput
        autoComplete={autoComplete}
        style={styles.searchInput}
        placeholder={placeholder}
        onChangeText={onChangeText}
        
        value={value}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  searchInput: {
    width: "95%",
    backgroundColor: COLOR.white,
    fontSize: 18,
    marginVertical: 10,
    marginHorizontal: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: COLOR.jade,
    borderRadius: 10,
  },
});
