import { View, Text, Image, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { useAuth } from "../../../context/AuthContext";
import { useNavigation } from "@react-navigation/native";

export default function Message() {
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
    <View>
      {/* Top scroll view */}
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={styles.topCard}>
          <Image
            style={styles.mypp}
            source={require("../../../assets/myphoto.png")}
          />
          <Text style={styles.topname}>Ebisa</Text>
        </View>
        <View style={styles.topCard}>
          <Image
            style={styles.mypp}
            source={require("../../../assets/myphoto.png")}
          />
          <Text style={styles.topname}>Ebisa</Text>
        </View>
        <View style={styles.topCard}>
          <Image
            style={styles.mypp}
            source={require("../../../assets/myphoto.png")}
          />
          <Text style={styles.topname}>Ebisa</Text>
        </View>
        <View style={styles.topCard}>
          <Image
            style={styles.mypp}
            source={require("../../../assets/myphoto.png")}
          />
          <Text style={styles.topname}>Ebisa</Text>
        </View>
        <View style={styles.topCard}>
          <Image
            style={styles.mypp}
            source={require("../../../assets/myphoto.png")}
          />
          <Text style={styles.topname}>Ebisa</Text>
        </View>
        <View style={styles.topCard}>
          <Image
            style={styles.mypp}
            source={require("../../../assets/myphoto.png")}
          />
          <Text style={styles.topname}>Ebisa</Text>
        </View>
        <View style={styles.topCard}>
          <Image
            style={styles.mypp}
            source={require("../../../assets/myphoto.png")}
          />
          <Text style={styles.topname}>Ebisa</Text>
        </View>
        <View style={styles.topCard}>
          <Image
            style={styles.mypp}
            source={require("../../../assets/myphoto.png")}
          />
          <Text style={styles.topname}>Ebisa</Text>
        </View>
      </ScrollView>

      {/* User cards */}
      <View style={styles.mainContainer}>
        <View style={styles.userContainer}>
          <Image
            style={styles.mypp}
            source={require("../../../assets/myphoto.png")}
          />
          <View style={styles.container}>
            <Text style={styles.name}>Ebisa Girma</Text>
            <Text style={styles.message}>
              Lorem ipsum dolor sit, amet consectetur adipisicing...
            </Text>
          </View>
          <Text style={styles.time}>Today</Text>
        </View>
        <View style={styles.userContainer}>
          <Image
            style={styles.mypp}
            source={require("../../../assets/myphoto.png")}
          />
          <View style={styles.container}>
            <Text style={styles.name}>Ebisa Girma</Text>
            <Text style={styles.message}>
              Lorem ipsum dolor sit, amet consectetur adipisicing...
            </Text>
          </View>
          <Text style={styles.time}>Today</Text>
        </View>
        <View style={styles.userContainer}>
          <Image
            style={styles.mypp}
            source={require("../../../assets/myphoto.png")}
          />
          <View style={styles.container}>
            <Text style={styles.name}>Ebisa Girma</Text>
            <Text style={styles.message}>
              Lorem ipsum dolor sit, amet consectetur adipisicing...
            </Text>
          </View>
          <Text style={styles.time}>Today</Text>
        </View>
        <View style={styles.userContainer}>
          <Image
            style={styles.mypp}
            source={require("../../../assets/myphoto.png")}
          />
          <View style={styles.container}>
            <Text style={styles.name}>Ebisa Girma</Text>
            <Text style={styles.message}>
              Lorem ipsum dolor sit, amet consectetur adipisicing...
            </Text>
          </View>
          <Text style={styles.time}>Today</Text>
        </View>
        <View style={styles.userContainer}>
          <Image
            style={styles.mypp}
            source={require("../../../assets/myphoto.png")}
          />
          <View style={styles.container}>
            <Text style={styles.name}>Ebisa Girma</Text>
            <Text style={styles.message}>
              Lorem ipsum dolor sit, amet consectetur adipisicing...
            </Text>
          </View>
          <Text style={styles.time}>Today</Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  mainContainer: {
    padding: 2,
    gap: 10,
  },
  topCard: {
    marginVertical: 5,
    marginLeft: 10,
    alignItems: "center",
  },
  userContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  container: {
    marginLeft: 10,
    gap: 10,
  },
  mypp: {
    width: 70,
    height: 70,
    borderRadius: 50,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#00a76f",
  },
  topname: {
    marginTop: 5,
    fontSize: 15,
    color: "#00a76f",
  },
  message: {
    color: "#637381",
  },
  time: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#00a76f",
  },
});
