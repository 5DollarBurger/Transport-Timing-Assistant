// import { StatusBar } from 'expo-status-bar';
import { Asset } from "expo-asset";
import * as FileSystem from "expo-file-system";
import * as SQLite from "expo-sqlite";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import SelectDropdown from "react-native-select-dropdown";

// const destinations = ["Tsing Yi", "Kwai Fong"];

// DB ACCESS START
// const db = SQLite.openDatabase("departures.db");
const openDatabase = async () => {
  if (
    (await FileSystem.getInfoAsync(FileSystem.documentDirectory + "SQLite"))
      .exists
  ) {
    await FileSystem.downloadAsync(
      Asset.fromModule(require("./assets/departures.db")).uri,
      FileSystem.documentDirectory + "SQLite/departures.db"
    );
    const db = await SQLite.openDatabase("departures.db");
    return db;
  }
  return alert("SQLite database not found");
};
// const db = openDatabase();

const promiseDestinations = (db) => {
  return new Promise((resolve, reject) => {
    // openDatabase().then((db) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT name FROM dim_destination",
        [],
        (trans, result) => {
          // console.log(result.rows._array);
          let destinationList = [];
          for (let i = 0; i < result.rows.length; ++i)
            destinationList.push(result.rows.item(i).name);
          // setFlatListItems(destinationList);
          resolve(destinationList);
        },
        (trans, error) => reject(error)
      );
    });
    // });
  });
};

// DB ACCESS END

export default function App() {
  const [destinations, setDestinations] = useState([]);

  async function fetchDestinations() {
    const db = await openDatabase();
    const destinationList = await promiseDestinations(db);
    setDestinations(destinationList);
  }
  fetchDestinations();

  const destinationHandler = (selectedDestination) => {};

  return (
    <View style={styles.appContainer}>
      <View>
        {/* <TextInput placeholder="Your destination"></TextInput>
        <Button title="Enter" /> */}
        <SelectDropdown data={destinations} onSelect={destinationHandler} />
      </View>
      <View>
        <Text>Results...</Text>
      </View>
      {/* <StatusBar style="auto" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    padding: 50,
  },
});
