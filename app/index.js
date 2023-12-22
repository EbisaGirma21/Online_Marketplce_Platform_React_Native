import { Redirect, SplashScreen } from "expo-router";
import { View } from "react-native";

export default function StartPage() {
  return <Redirect href="/home" />;
}
