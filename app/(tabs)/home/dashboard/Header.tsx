
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { moderateScale, scale } from 'react-native-size-matters';
import { Ionicons } from '@expo/vector-icons';

interface User {
    name: string;
    email: string;
    avatarUrl: string;
}

// Mock data for demonstration
const mockUser: User = {
    name: "Aarón Portobanco",
    email: "aaronportobanco@gmail.com",
    avatarUrl: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/krSnDOWpDM/1v0qoj99_expires_30_days.png",
};

const Header: React.FC = () => {
  const { user, onNotificationsPress } = { user: mockUser, onNotificationsPress: () => alert('Notifications pressed!') };

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
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={onNotificationsPress}>
        <Ionicons
          name="notifications"
          size={moderateScale(24)}
          color="#454A53"
        />
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
