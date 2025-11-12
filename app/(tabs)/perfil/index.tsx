import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Alert } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { account, databases } from "@/src/lib/appwrite";
import { Query } from "appwrite";
import { router } from "expo-router";
import ProfileHeader from "./components/ProfileHeader";
import ProfileCard from "./components/ProfileCard";
import ProfileOption from "./components/ProfileOption";

const APPWRITE_DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const APPWRITE_USERS_COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_PROFILES_COLLECTION_ID!;

interface UserData {
  name: string;
  last_name: string;
  email: string;
  createdAt?: string;
}

const PerfilScreen = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [joinMessage, setJoinMessage] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentAccount = await account.get();
        const result = await databases.listDocuments(
          APPWRITE_DATABASE_ID,
          APPWRITE_USERS_COLLECTION_ID,
          [Query.equal("userId", currentAccount.$id)]
        );

        if (result.documents.length > 0) {
          const userDoc = result.documents[0];
          const userData: UserData = {
            name: userDoc.name,
            last_name: userDoc.last_name,
            email: currentAccount.email,
            createdAt: userDoc.$createdAt,
          };
          setUser(userData);

          const createdDate = new Date(userDoc.$createdAt);
          const now = new Date();
          const diffMonths =
            (now.getFullYear() - createdDate.getFullYear()) * 12 +
            (now.getMonth() - createdDate.getMonth());
          const diffDays = Math.floor(
            (now.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24)
          );

          const monthName = createdDate.toLocaleString("es-ES", {
            month: "long",
          });
          setJoinMessage(
            `Te uniste a Kovara Finance el ${createdDate.getDate()} de ${monthName} de ${createdDate.getFullYear()}, hace ${
              diffMonths > 0
                ? `${diffMonths} ${diffMonths === 1 ? "mes" : "meses"}`
                : `${diffDays} ${diffDays === 1 ? "día" : "días"}`
            } y nuestra misión sigue siendo la misma: ayudarte a gestionar tus finanzas personales.`
          );
        }
      } catch (error) {
        console.error("Error al obtener usuario:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await account.deleteSession("current");
      router.replace("/auth/login");
    } catch (error) {
      Alert.alert("Error", "No se pudo cerrar sesión correctamente");
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: "center" }]}>
        <ActivityIndicator size="small" color="#3476F4" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ProfileHeader />
      <ProfileCard
        name={user?.name}
        lastName={user?.last_name}
        email={user?.email}
      />

      <Text style={styles.configTitle}>Configuraciones</Text>

      <View style={styles.settingsContainer}>
        <ProfileOption
          icon="person-circle-outline"
          text="Mi Cuenta"
        />
        <ProfileOption
          icon="folder-outline"
          text="Administrar categorías"
        />
        <ProfileOption
          icon="log-out-outline"
          text="Cerrar sesión"
          color="#E74C3C"
          onPress={handleLogout}
          showBorder={false}
        />
      </View>

      <Text style={styles.footerText}>{joinMessage}</Text>
    </View>
  );
};

export default PerfilScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(40),
  },
  configTitle: {
    fontSize: moderateScale(16),
    fontWeight: "600",
    color: "#1C1C1C",
    marginBottom: verticalScale(10),
  },
  settingsContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingVertical: verticalScale(8),
    paddingHorizontal: scale(5),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  footerText: {
    fontSize: moderateScale(12),
    color: "#9E9E9E",
    textAlign: "center",
    marginTop: verticalScale(35),
    lineHeight: 18,
  },
});
