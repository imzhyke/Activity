import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Button, FAB } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { Auth } from "../Firebase";
import { signOut } from "firebase/auth";
import { db } from "../Firebase";
import { collection, onSnapshot } from "firebase/firestore";
import Feather from "react-native-vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";

export default function RegisterPage({ navigation }) {
  const [dataList, setDataList] = useState([]);
  const [searchInput, setSearchInput] = useState([]);
  console.log(searchInput);

  getData = () => {
    const docs = collection(db, "Data");
    onSnapshot(docs, (ducs) => {
      const oten = [];
      ducs.forEach((element) => {
        oten.push({ ID: element.id, ...element.data() });
      });
      setDataList(oten);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  // console.log(navigation);

  const Block = ({ data, nav }) => {
    let id = data.ID;
    return (
      <TouchableOpacity onPress={() => nav.navigate("Item", id)}>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={["#44d198", "#9ce89b"]}
          style={{
            padding: 20,
            alignSelf: "center",
            borderRadius: 10,
            width: "90%",
            margin: 8,
          }}
        >
          <Text style={styles.blockTitle}>{data.Title}</Text>
          <Text style={styles.blockDescription}>{data.Description}</Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text style={styles.title}>Task List</Text>

      <View
        style={{
          flexDirection: "row",
          borderRadius: 10,
          alignItems: "center",
          backgroundColor: "#d9dbda",
          margin: 10,
          marginHorizontal: 20,
          paddingHorizontal: 15,
        }}
      >
        <Feather
          name="search"
          size={20}
          color="black"
          style={{ marginLeft: 1, marginRight: 4 }}
        />
        <TextInput
          value={searchInput}
          onChangeText={(text) => setSearchInput(text)}
          style={styles.input}
          placeholder="Search"
        />
      </View>

      <ScrollView>
        {/* Button Gradient*/}
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={["#204ad6", "#60e4ff"]}
          style={{
            padding: 20,
            alignSelf: "center",
            borderRadius: 10,
            width: "90%",
            margin: 8,
          }}
        >
          {/* Button */}
          <TouchableOpacity onPress={() => navigation.navigate("AddItem")}>
            <Text
              style={{
                color: "white",
                textAlign: "center",
                fontWeight: "bold",
                textAlign: "center",
                fontSize: 18,
              }}
            >
              + ADD ITEM
            </Text>
          </TouchableOpacity>
        </LinearGradient>

        {/* Displaying Data */}
        {dataList.map((datas, index) => {
          return <Block key={index} data={datas} nav={navigation} />;
        })}
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  block: {
    backgroundColor: "#44d198",
    padding: 20,
    alignSelf: "center",
    borderRadius: 10,
    width: "90%",
    margin: 8,
  },
  blockTitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  blockDescription: {
    color: "white",
    fontSize: 15,
  },
  container: {
    flex: 1,
    paddingTop: "15%",
    justifyContent: "center",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonText: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },
  input: {
    height: 40,
    fontSize: 18,
  },
  button: {
    backgroundColor: "blue",
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    width: "80%",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },
});
