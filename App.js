// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from "react-native";
import SelectDropdown from "react-native-select-dropdown";

const destinations = ["Tsing Yi", "Kwai Fong"];

export default function App() {
  function destinationHandler(selectedDestination) {
    // console.log(selectedDestination);
    if (selectedDestination == "Tsing Yi") {
      console.log("Bus 330");
    } else {
      console.log("Bus 332");
    }
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
