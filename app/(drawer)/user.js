import React, { useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import { Table, TableWrapper, Row, Cell } from "react-native-table-component";
import { useAuth } from "../../context/AuthContext";
import { COLOR } from "../../constants/color";

const User = () => {
  const { user, fetchUsers } = useAuth();

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const tableHead = ["User", "First Name", "Last Name", "View"];

  const renderButton = (userData, index) => {
    return (
      <TouchableOpacity onPress={() => viewDetails(userData, index)}>
        <View style={styles.btn}>
          <Text style={styles.btnText}>View</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const viewDetails = (data, index) => {
    Alert.alert(
      "User Details",
      `User ID: ${user[index]._id}\nFirst Name: ${user[index].firstName}\nLast Name: ${user[index].lastName}`,
      [{ text: "OK", onPress: () => console.log("OK Pressed") }]
    );
  };
  // Transform user data into table data
  const tableData = user.map((userData, index) => [
    <View style={styles.topCard}>
      <Image style={styles.mypp} source={require("../../assets/myphoto.png")} />
    </View>, // User index
    userData.firstName,
    userData.lastName,
    renderButton(null, index),
  ]);

  return (
    <View style={styles.container}>
      <Table borderStyle={{ borderColor: "transparent" }}>
        <Row data={tableHead} style={styles.head} textStyle={styles.text} />
        {tableData.map((rowData, rowIndex) => (
          <TableWrapper key={rowIndex} style={styles.row}>
            {rowData.map((cellData, cellIndex) => (
              <Cell
                key={cellIndex}
                data={
                  cellIndex === 3 ? renderButton(cellData, rowIndex) : cellData
                }
                textStyle={styles.text}
              />
            ))}
          </TableWrapper>
        ))}
      </Table>
    </View>
  );
};

export default User;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: "#fff" },
  head: { height: 40, backgroundColor: COLOR.jade },
  text: { margin: 6 },
  row: { flexDirection: "row", backgroundColor: COLOR.blackhaze },
  btn: {
    width: 58,
    height: 18,
    backgroundColor: COLOR.swansdown,
    borderRadius: 2,
  },
  btnText: { textAlign: "center", color: COLOR.jade },
  topCard: {
    marginVertical: 5,
    alignItems: "center",
  },
  mypp: {
    width: 30,
    height: 30,
    borderRadius: 50,
  },
});
