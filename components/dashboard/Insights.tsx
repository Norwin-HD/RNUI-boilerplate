
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

const Insights: React.FC = () => {
  return (
    <View>
      <View style={styles.column14}>
        <View style={styles.row17}>
          <Image
            source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/krSnDOWpDM/03z6e7zv_expires_30_days.png" }}
            resizeMode={"stretch"}
            style={styles.image11}
          />
          <Text style={styles.text29}>{"Insight del mes"}</Text>
        </View>
        <Text style={styles.text30}>
          {"Tus gastos en comidas fuera subieron 20% este mes. 🌮 Considera cocinar más en casa para ahorrar."}
        </Text>
      </View>
      <View style={styles.row18}>
        <Text style={styles.text31}>{"Configurar alertas"}</Text>
        <Image
          source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/krSnDOWpDM/eoj7bu7f_expires_30_days.png" }}
          resizeMode={"stretch"}
          style={styles.image4}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    column14: {
        backgroundColor: "#3476F4",
        borderRadius: moderateScale(18),
        paddingVertical: verticalScale(16),
        marginBottom: verticalScale(25),
        shadowColor: "#000000",
        shadowOpacity: 1.0,
    },
    row17: {
        alignSelf: "flex-start",
        flexDirection: "row",
        alignItems: "center",
        marginBottom: verticalScale(16),
        marginLeft: scale(16),
    },
    image11: {
        width: moderateScale(30),
        height: moderateScale(30),
        marginRight: scale(8),
    },
    text29: {
        color: "#FFFFFF",
        fontSize: moderateScale(16),
        fontWeight: "bold",
    },
    text30: {
        color: "#FFFFFF",
        fontSize: moderateScale(14),
        marginHorizontal: scale(16),
    },
    row18: {
        alignSelf: "flex-start",
        flexDirection: "row",
        alignItems: "center",
        marginLeft: scale(8),
        marginBottom: verticalScale(100),
    },
    text31: {
        color: "#000000",
        fontSize: moderateScale(18),
        marginRight: scale(12),
        fontFamily: "Montserrat_500Medium",
    },
    image4: {
        width: moderateScale(24),
        height: moderateScale(24),
    },
});

export default Insights;
