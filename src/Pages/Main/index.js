import React, { useState, useRef, useCallback, useEffect } from "react";
import { Text, TextInput, View, SafeAreaView, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { debounce } from "lodash";
import BottomSheet from "reanimated-bottom-sheet";
import api from "../../services/api";
import styles from "./style.js";

export default function App() {
  const sheetRef = useRef(null);
  const [inputValue, setInputValue] = useState("01001000");
  const [cep, setCep] = useState({
    latitude: -21.7808787,
    longitude: -43.3589147,
    logradouro: "Rua Ataliba de Barros",
    cidade: { nome: "Juiz de Fora" },
    estado: { sigla: "MG" },
  });

  const loadCep = async () => {
    const response = await api
      .get(`cep?cep=${inputValue}`, {
        headers: {
          Authorization: "Token token=55c30f4704c0da040807faaec4804e3a",
        },
      })
      .catch((error) => {
        Alert.alert(
          "Erro ao carregar CEP",
          "Tente novamente mais tarde.",
          [{ text: "OK" }],
          {
            cancelable: false,
          }
        );

        console.log(error);

        return;
      });

    console.log(response);

    if (Object.entries(response.data).length === 0) {
      Alert.alert(
        "Erro ao carregar CEP",
        "Tente novamente mais tarde.",
        [{ text: "OK" }],
        {
          cancelable: false,
        }
      );
    } else {
      const dadosCep = response.data;
      setCep(dadosCep);
      sheetRef.current.snapTo(100);
    }
  };

  const renderContent = () => (
    <View
      style={{
        backgroundColor: "white",
        padding: 20,
        height: 350,
      }}
    >
      <Text style={styles.nameInfo}>
        Rua: <Text style={styles.descInfo}>{cep.logradouro}</Text>
      </Text>
      <Text style={styles.nameInfo}>
        Cidade: <Text style={styles.descInfo}>{cep.cidade.nome}</Text>
      </Text>
      <Text style={styles.nameInfo}>
        Estado: <Text style={styles.descInfo}>{cep.estado.sigla}</Text>
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapStyle}
        region={{
          latitude: parseFloat(cep.latitude),
          longitude: parseFloat(cep.longitude),
          latitudeDelta: 0.011,
          longitudeDelta: 0.0421,
        }}
      >
        <SafeAreaView style={styles.safeArea}>
          <TextInput
            style={styles.input}
            placeholder="Digite o CEP aqui"
            keyboardAppearance="dark"
            keyboardType="number-pad"
            onChangeText={() => {}}
            returnKeyType={"done"}
          />
        </SafeAreaView>
        <Marker
          coordinate={{
            latitude: parseFloat(cep.latitude),
            longitude: parseFloat(cep.longitude),
          }}
          title={`Bairro ${cep.bairro}`}
          image={require("../../../assets/pin.png")}
          width={75}
        />
      </MapView>
      <BottomSheet
        ref={sheetRef}
        snapPoints={[400, 350, 0]}
        borderRadius={25}
        renderContent={renderContent}
      />
    </View>
  );
}
