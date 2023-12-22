import { View, Text, Button, StyleSheet, Pressable } from "react-native";
import React from "react";
import { COLOR } from "../../constants/color";

export default function Buttton({ title }) {
  return (
    <View>
      <Pressable style={styles.button}>
        <Text style={{ color: COLOR.jade }}>{title}</Text>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  button: {
    width: "50%",
    backgroundColor: COLOR.swansdown,
    padding: 15,
    paddingHorizontal: 50,
    marginVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    alignSelf: "center",
  },
});
