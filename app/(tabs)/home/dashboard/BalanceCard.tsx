// documentacion: https://www.npmjs.com/package/@expo-google-fonts/montserrat

import { Image, StyleSheet, Text, View } from "react-native";

// Importa las funciones de react-native-size-matters para escalado responsivo
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

const BalanceCard: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.balancedText}>{"Balance General"}</Text>
      <View>
        <View style={styles.view}>
          <Text style={styles.textMain}>{"$200"}</Text>
          <Text style={styles.textCent}>{".10"}</Text>
        </View>
        <View style={styles.analySection}>
          <Image
            source={{
              uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/krSnDOWpDM/r4e29u3m_expires_30_days.png",
            }}
            resizeMode={"stretch"}
            style={styles.icon}
          />
          <Text style={styles.textAnaly}>{"+5.2% vs. el mes pasado"}</Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginBottom: verticalScale(19),
    marginHorizontal: scale(16),
  },
  balancedText: {
    color: "#000000",
    fontSize: moderateScale(14),
    fontFamily: "Montserrat_600SemiBold",
    marginBottom: verticalScale(10),
  },
  view: {
    flexDirection: "row",
    alignSelf: "flex-start",
    marginBottom: verticalScale(8),
  },
  textMain: {
    color: "#000000",
    fontFamily: "Montserrat_700Bold",
    fontSize: moderateScale(34),
  },
  textCent: {
    color: "#000000",
    fontSize: moderateScale(20),
    fontFamily: "Montserrat_500Medium",
    bottom: verticalScale(-10),
  },
  analySection: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: scale(5),
  },
  icon: {
    width: moderateScale(20),
    height: moderateScale(20),
    marginRight: scale(14),
  },
  // comando por si se nos ocurre eliminarlo xd: npx expo install @expo-google-fonts/montserrat expo-font
  textAnaly: {
    color: "#000000",
    fontFamily: "Montserrat_500Medium",
    fontSize: moderateScale(14),
  },
});

export default BalanceCard;
