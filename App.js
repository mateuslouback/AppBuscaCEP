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
    sheetRef.current.snapTo(100);
  };

  const sheetRef = useRef(null);

  const renderContent = () => (
    <View
      style={{
        backgroundColor: "white",
        padding: 20,
        height: 350,
      }}
    >
      <Text style={styles.nameInfo}>
        Rua: <Text style={styles.descInfo}>Belizário de Castro, 135</Text>
      </Text>
      <Text style={styles.nameInfo}>
        Cidade: <Text style={styles.descInfo}>Juiz de Fora</Text>
      </Text>
      <Text style={styles.nameInfo}>
        Estado: <Text style={styles.descInfo}>MG</Text>
      </Text>
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
        snapPoints={[400, 350, 0]}
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
  nameInfo: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 7,
  },
  descInfo: {
    fontSize: 16,
    fontWeight: "normal",
  },
});
