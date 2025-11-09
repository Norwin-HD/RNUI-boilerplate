import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Alert, Image, Linking, Platform, StyleSheet } from "react-native";
import { moderateScale, verticalScale } from "react-native-size-matters";
import { Text, TouchableOpacity, View } from "react-native-ui-lib";

const VaucherComponent = () => {
  const [image, setImage] = useState<string | null>(null);
  const [status, requestPermissions] = ImagePicker.useMediaLibraryPermissions();

  const result = async () => {
    try {
      // Comprobar permisos
      if (Platform.OS !== "web") {
        console.log(status);
        if (status?.status !== "granted") {
          const permissionResult = await requestPermissions();
          console.log(permissionResult);

          if (permissionResult.status !== "granted") {
            Alert.alert(
              "Se necesitan permisos para acceder a la galería.",
              "Dar permiso",
              [
                {
                  text: "Open settings",
                  onPress: () => {
                    if (Platform.OS === "ios") {
                      Linking.openURL("app-settings:");
                    } else {
                      Linking.openSettings();
                    }
                  },
                },
                {
                  text: "Cancel",
                  style: "cancel",
                },
              ]
            );

            return;
          }
        }

        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ["images"],
          allowsEditing: false,
          quality: 0.5,
        });

        console.log(result);

        if (!result.canceled) {
          setImage(result.assets[0].uri);
        }
      }
    } catch (error) {
      console.log("Error al solicitar permisos de la galería:", error);
    }
  };

  const pickImage = () => {
    result();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recibo o vaucher (opcional)</Text>

      <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
        <View style={styles.imagePickerContent}>
          {image ? (
            <>
              <Image source={{ uri: image }} style={styles.selectedImage} />
              <View style={styles.iconContainer}>
                <Ionicons name="expand-outline" size={20} color="white" />
              </View>
            </>
          ) : (
            <>
              <Ionicons name="cloud-upload-outline" size={24} color="black" />
              <Text style={styles.imagePickerText}>Sube una foto opcional</Text>
              <Text style={styles.imagePickerSubText}>
                Tamaño máximo de archivo: 10 MB
              </Text>
            </>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: verticalScale(50),
    gap: verticalScale(16),
    paddingBottom: verticalScale(20),
  },
  title: {
    fontFamily: "Montserrat_400Regular",
    fontSize: moderateScale(16),
    lineHeight: moderateScale(24),
    color: "#181A2A",
    width: "100%",
  },
  image: {
    borderRadius: moderateScale(12),
  },
  imagePicker: {
    alignItems: "center",
    justifyContent: "center",
  },
  imagePickerContent: {
    borderWidth: 0.5,
    borderColor: "#6C75AD",
    borderStyle: "dashed",
    borderRadius: moderateScale(12),
    paddingVertical: verticalScale(12),
    width: "95%",
    minWidth: moderateScale(200),
    height: verticalScale(188),
    alignItems: "center",
    justifyContent: "center",
    gap: verticalScale(8),
  },
  selectedImage: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
    borderRadius: moderateScale(12),
    resizeMode: "cover",
  },
  iconContainer: {
    position: "absolute",
    bottom: verticalScale(12),
    right: moderateScale(8),
  },
  imagePickerText: {
    fontFamily: "Montserrat_400Regular",
    fontSize: moderateScale(16),
    lineHeight: moderateScale(24),
    color: "#181A2A",
  },
  imagePickerSubText: {
    fontFamily: "Montserrat_400Regular",
    fontSize: moderateScale(16),
    lineHeight: moderateScale(24),
    color: "#B3B3B3",
  },
});

export default VaucherComponent;
