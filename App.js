// import { StatusBar } from 'expo-status-bar';
import { Asset } from "expo-asset";
import * as FileSystem from "expo-file-system";
import * as SQLite from "expo-sqlite";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import SelectDropdown from "react-native-select-dropdown";

// DB ACCESS START

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

const promiseDestinations = (db) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM dim_destination",
        [],
        (trans, result) => {
          const destinationData = result.rows._array;
          resolve(destinationData);
        },
        (trans, error) => reject(error)
      );
    });
  });
};

// DB ACCESS END

export default function App() {
  const [destinations, setDestinations] = useState([]);
  const [selectedDestination, setSelectedDestination] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");

  async function fetchDestinations() {
    try {
      const db = await openDatabase();
      const destinationData = await promiseDestinations(db);
      setDestinations(destinationData);
    } catch (error) {
      throw new Error(error);
    }
  }
  if (destinations.length == 0) {
    fetchDestinations();
  }

  const destinationHandler = (selectedDestination) => {
    setSelectedDestination(selectedDestination);
    setVehicleNumber("330");
  };

  return (
    <View style={styles.appContainer}>
      <View>
        {/* <TextInput placeholder="Your destination"></TextInput>
        <Button title="Enter" /> */}
        <SelectDropdown
          data={destinations.map((destination) => destination.name)}
          onSelect={destinationHandler}
        />
      </View>
      <View>
        <Text>Vehicle Number: {vehicleNumber}</Text>
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
