import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from "react-native";
import { moderateScale, scale } from "react-native-size-matters";
import { Ionicons } from "@expo/vector-icons";
import { account, databases } from "../../../../src/lib/appwrite";
import { Query } from "appwrite";

const APPWRITE_DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const APPWRITE_USERS_COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_PROFILES_COLLECTION_ID!;

interface UserData {
  name: string;
  last_name: string;
  email: string;
}

const Header: React.FC = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

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
          setUser({
            name: userDoc.name,
            last_name: userDoc.last_name,
            email: currentAccount.email,
          });
        }
      } catch (error) {
        console.error("Error al obtener usuario:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleNotifications = () => {
    alert("Notificaciones próximamente!");
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
      <View style={styles.userInfoContainer}>
        <Ionicons
          name="person-circle"
          size={moderateScale(32)}
          color="#454A53"
          style={{ marginRight: scale(12) }}
        />
        <View style={styles.textContainer}>
          <Text style={styles.userName}>
            {user ? `${user.name} ${user.last_name}` : "Usuario"}
          </Text>
          <Text style={styles.userEmail}>
            {user ? user.email : "correo@ejemplo.com"}
          </Text>
        </View>
      </View>

      <TouchableOpacity onPress={handleNotifications}>
        <Ionicons name="notifications" size={moderateScale(24)} color="#454A53" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingVertical: moderateScale(12),
    paddingHorizontal: scale(20),
    marginBottom: moderateScale(20),
  },
  userInfoContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginRight: scale(12),
  },
  textContainer: {
    flex: 1,
  },
  userName: {
    color: "#454A53",
    fontSize: moderateScale(14),
    fontFamily: "Montserrat_600SemiBold",
  },
  userEmail: {
    color: "#9EA2AD",
    fontSize: moderateScale(12),
    fontFamily: "Montserrat_600SemiBold",
  },
});

export default Header;
