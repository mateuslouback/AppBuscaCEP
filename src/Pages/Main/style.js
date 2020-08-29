import { StyleSheet, Dimensions } from "react-native";

module.exports = StyleSheet.create({
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
    height: 52,
    backgroundColor: "#FFF",
    borderColor: "#EEE",
    borderWidth: 4,
    marginTop: 10,
    borderRadius: 25,
    paddingHorizontal: 15,
    fontSize: 16,
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
