import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View, ActivityIndicator, Text, Modal } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import AppText from "../components/AppText";

interface SocialLoginProps {
  onLoginSuccess?: (user: string) => void;
}

export default function SocialLogin({ onLoginSuccess }: SocialLoginProps) {
  const router = useRouter(); 
  const [loading, setLoading] = useState<string | null>(null);
  const [modalUser, setModalUser] = useState<string | null>(null);

  const handleLogin = (provider: string) => {
    setLoading(provider);
    setTimeout(() => {
      setLoading(null);
      setModalUser(provider); 
      if (onLoginSuccess) onLoginSuccess(provider);
    }, 1500);
  };

  const handleCloseModal = () => {
    setModalUser(null);
    router.push("/home");
  };

  return (
    <>
      <View style={styles.separatorRow}>
        <View style={styles.sepLine} />
        <AppText variant="medium" style={styles.sepText}>
          O inicia con
        </AppText>
        <View style={styles.sepLine} />
      </View>

      <View style={styles.socialRow}>
        <View style={styles.socialSpacer} />

        <TouchableOpacity
          style={styles.socialBox}
          onPress={() => handleLogin("Google")}
          disabled={!!loading}
        >
          {loading === "Google" ? (
            <ActivityIndicator />
          ) : (
            <Image
              source={{ uri: "https://cdn-icons-png.flaticon.com/512/300/300221.png" }}
              style={styles.socialIcon}
            />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.socialBox}
          onPress={() => handleLogin("Microsoft")}
          disabled={!!loading}
        >
          {loading === "Microsoft" ? (
            <ActivityIndicator />
          ) : (
            <Image
              source={{ uri: "https://cdn-icons-png.flaticon.com/512/732/732221.png" }}
              style={styles.socialIcon}
            />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.socialBox}
          onPress={() => handleLogin("Facebook")}
          disabled={!!loading}
        >
          {loading === "Facebook" ? (
            <ActivityIndicator />
          ) : (
            <Image
              source={{ uri: "https://cdn-icons-png.flaticon.com/512/5968/5968764.png" }}
              style={styles.socialIcon}
            />
          )}
        </TouchableOpacity>

        <View style={styles.socialSpacer} />
      </View>
      
      <Modal
        transparent
        animationType="fade"
        visible={!!modalUser}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>¡Has iniciado sesión con {modalUser}!</Text>
            <TouchableOpacity onPress={handleCloseModal} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  separatorRow: { flexDirection: "row", alignItems: "center", justifyContent: "center", marginVertical: verticalScale(8) },
  sepLine: { height: verticalScale(2), backgroundColor: "#E5E7EB", flex: 1, marginHorizontal: scale(8) },
  sepText: { color: "#9CA3AF", fontSize: scale(12) },
  socialRow: { flexDirection: "row", justifyContent: "center", alignItems: "center", gap: scale(28), marginBottom: verticalScale(6) },
  socialBox: {
    width: scale(45),
    height: verticalScale(42),
    borderRadius: scale(12),
    borderWidth: 1,
    borderColor: "#E5E7EB",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: verticalScale(2) },
    shadowRadius: scale(3),
    elevation: 2,
  },
  socialIcon: { width: scale(24), height: verticalScale(24), resizeMode: "contain" },
  socialSpacer: { width: scale(4) },

  modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.3)", justifyContent: "center", alignItems: "center" },
  modalContent: { backgroundColor: "#fff", padding: 20, borderRadius: 12, width: "80%", alignItems: "center" },
  modalText: { fontSize: 16, color: "#333", marginBottom: 15,fontFamily: "Montserrat_500Medium" },
  modalButton: { backgroundColor: "#2563EB", paddingHorizontal: 20, paddingVertical: 10, borderRadius: 8 },
  modalButtonText: { color: "#fff", fontWeight: "bold" },
});
