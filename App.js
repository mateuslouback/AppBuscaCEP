import React, { useCallback, useRef } from "react";
import MapView, { Marker } from "react-native-maps";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { debounce, throttle } from "lodash";
import BottomSheet from "reanimated-bottom-sheet";

export default function App() {
  const delayedHandleChange = debounce((eventData) => alert(eventData), 1000);

  const handleChange = (e) => {
    let eventData = "Teste debounce.";
    delayedHandleChange(eventData);
  };

  const sheetRef = useRef(null);

  const renderContent = () => (
    <View
      style={{
        backgroundColor: "white",
        padding: 16,
        height: 450,
      }}
    >
      <Text>Swipe down to close</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapStyle}
        initialRegion={{
          latitude: -21.7808787,
          longitude: -43.3589147,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <SafeAreaView style={styles.safeArea}>
          <TextInput
            style={styles.input}
            placeholder="Digite o CEP aqui"
            keyboardAppearance="dark"
            keyboardType="number-pad"
            onChange={handleChange}
            returnKeyType={"done"}
          />
        </SafeAreaView>
        <Marker
          coordinate={{ latitude: -21.7808787, longitude: -43.3589147 }}
        />
      </MapView>
      <BottomSheet
        ref={sheetRef}
        snapPoints={[450, 300, 0]}
        borderRadius={25}
        renderContent={renderContent}
        style={{ borderColor: "#EEE", borderWidth: 4 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  input: {
    width: "auto",
    height: 55,
    backgroundColor: "#FFF",
    borderColor: "#EEE",
    borderWidth: 4,
    marginTop: 10,
    borderRadius: 25,
    paddingHorizontal: 15,
    fontSize: 14,
    marginHorizontal: 25,
  },
});
