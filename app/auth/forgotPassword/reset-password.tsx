import { useRouter } from "expo-router";
import React, { useState, useEffect } from "react";
import {
  Alert,
  Keyboard,
  KeyboardEvent,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";

import BottomButton from "../components/BottomButton";
import PasswordInput from "../components/PasswordInput";
import ScreenHeader from "../components/ScreenHeader";
import TitleSubtitle from "../components/TittleSubtitle";

export default function ResetPasswordScreen() {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const showSub = Keyboard.addListener(
      "keyboardDidShow",
      (e: KeyboardEvent) => {
        setKeyboardHeight(
          e.endCoordinates.height - (Platform.OS === "ios" ? 20 : 0)
        );
      }
    );
    const hideSub = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardHeight(0);
    });

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const handleContinue = () => {
    if (!newPassword || !confirmPassword) {
      Alert.alert("Error", "Por favor completa ambos campos.");
      return;
    }
    if (newPassword.length < 6) {
      Alert.alert("Error", "La contraseña debe tener al menos 6 caracteres.");
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "Las contraseñas no coinciden.");
      return;
    }
    router.push("/auth/forgotPassword/success");
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        bounces={false}
      >
        <ScreenHeader
          title="Reestablecer contraseña"
          imageUri="https://ik.imagekit.io/nwogrqfzj/Mobile-login.png?updatedAt=1762808837904"
        />

        <TitleSubtitle
          title="Reestablecer contraseña"
          subtitle="Tu nueva contraseña debe ser diferente a la contraseña anterior"
          titleStyle={{
            fontSize: moderateScale(20),
            marginBottom: verticalScale(0),
          }}
          subtitleStyle={{
            fontSize: moderateScale(14),
            lineHeight: verticalScale(20),
          }}
        />

        <PasswordInput
          label="Nueva contraseña"
          value={newPassword}
          onChangeText={setNewPassword}
          showConfirm
          confirmValue={confirmPassword}
          onChangeConfirm={setConfirmPassword}
        />

        <View style={{ height: verticalScale(0) }} />
      </ScrollView>

      <View
        style={[
          styles.bottomButtonWrapper,
          { marginBottom: Platform.OS === "android" ? keyboardHeight : 0 },
        ]}
      >
        <BottomButton text="Continuar" onPress={handleContinue} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF", minHeight: "100%" },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(32),
    paddingBottom: 0,
  },
  bottomButtonWrapper: {
    width: "100%",
    paddingHorizontal: scale(0),
    paddingVertical: 0,
    backgroundColor: "#FFFFFF",
  },
});