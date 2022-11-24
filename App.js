// import { StatusBar } from 'expo-status-bar';
import { Asset } from "expo-asset";
import * as FileSystem from "expo-file-system";
import * as SQLite from "expo-sqlite";
// import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import SelectDropdown from "react-native-select-dropdown";

const destinations = ["Tsing Yi", "Kwai Fong"];

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

const getData = () => {
  // console.log(db);
  openDatabase().then((db) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT name FROM dim_destination",
        [],
        (trans, result) => {
          console.log(result.rows._array);
        },
        (trans, error) => console.log("Error ", error)
      );
    });
  });
};
// DB ACCESS END

export default function App() {
  function destinationHandler(selectedDestination) {
    // console.log(selectedDestination);
    if (selectedDestination == "Tsing Yi") {
      console.log("Bus 330");
    } else {
      console.log("Bus 332");
    }
    console.log(getData());

    // fetchData = () => {
    //   db.transaction((tx) => {
    //     // sending 4 arguments in executeSql
    //     tx.executeSql(
    //       "SELECT name FROM dim_destination",
    //       null, // passing sql query and parameters:null
    //       // success callback which sends two things Transaction object and ResultSet Object
    //       (txObj, { rows: { _array } }) => this.setState(({ data: _array }),
    //       // failure callback which sends two things Transaction object and Error
    //       (txObj, error) => console.log("Error ", error)
    //     ); // end executeSQL
    //   }); // end transaction
    // };
  }

  function getVehicle() {}

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
