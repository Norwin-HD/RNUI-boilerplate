import { IncomeSchema } from "@/src/features/transacciones/schemas";
import { Ionicons } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system/legacy";
import * as ImagePicker from "expo-image-picker";
import { Control, Controller } from "react-hook-form";
import { Alert, Image, Linking, Platform, StyleSheet } from "react-native";
import { moderateScale, verticalScale } from "react-native-size-matters";
import { Text, TouchableOpacity, View } from "react-native-ui-lib";
import { z } from "zod";

type IncomeFormData = z.infer<typeof IncomeSchema>;

interface VaucherComponentProps {
  control: Control<IncomeFormData>;
}

const VaucherComponent = ({ control }: VaucherComponentProps) => {
  const [status, requestPermissions] = ImagePicker.useMediaLibraryPermissions();

  const result = async (onChange: (value: string | null) => void) => {
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
          const sourceUri = result.assets[0].uri;
          try {
            const maybeExt = sourceUri.split('.').pop()?.split('?')[0] || 'jpg';
            const filename = `img_${Date.now()}.${maybeExt}`;
            const dest = `${(FileSystem as any).cacheDirectory}${filename}`;
            console.log('Copiando imagen a:', dest);
            await FileSystem.copyAsync({ from: sourceUri, to: dest });
            console.log('Imagen copiada exitosamente');
            onChange(dest);
          } catch (e) {
            console.log('Error copiando imagen al cache, usando URI original', e);
            onChange(sourceUri);
          }
        }
      }
    } catch (error) {
      console.log("Error al solicitar permisos de la galería:", error);
    }
  };

  return (
    <Controller
      control={control}
      name="imagen"
      render={({ field: { onChange, value } }) => (
        <View style={styles.container}>
          <Text style={styles.title}>Recibo o vaucher (opcional)</Text>

          <TouchableOpacity
            onPress={() => result(onChange)}
            style={styles.imagePicker}
          >
            <View style={styles.imagePickerContent}>
              {value ? (
                <>
                  <Image source={{ uri: value }} style={styles.selectedImage} />
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
      )}
    />
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
