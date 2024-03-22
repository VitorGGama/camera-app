import React, { useState } from "react";
import { Camera, CameraType } from "expo-camera";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function App() {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  // Verificando as permissões da câmera
  if (!permission) {
    // As permissões da câmera ainda estão carregando
    return <View />;
  }

  if (!permission.granted) {
    // As permissões da câmera ainda não foram concedidas
    return (
      <View style={styles.container}>
        <Text style={styles.permissionText}>
          Precisamos da sua permissão para mostrar a câmera
        </Text>
        <Button onPress={requestPermission} title="Conceder Permissão" />
      </View>
    );
  }

  // Função para alternar entre a câmera frontal e traseira
  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
            <Text style={styles.text}>Alternar Câmera</Text>
          </TouchableOpacity>
          <Text style={styles.bannerText}>
            Sorria, você está sendo filmado 😮
          </Text>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "rgba(0,0,0,0.3)",
    padding: 20,
  },
  button: {
    alignSelf: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  bannerText: {
    fontSize: 18,
    color: "white",
    position: "absolute",
    top: 20,
    alignSelf: "center",
  },
  permissionText: {
    textAlign: "center",
    color: "black",
  },
});
