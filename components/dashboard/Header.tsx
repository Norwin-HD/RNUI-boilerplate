
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { moderateScale, scale } from 'react-native-size-matters';

const Header: React.FC = () => {
  return (
    <View style={styles.column}>
      {/* <View style={styles.row}>
        <Image
          source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/krSnDOWpDM/8zwj1rf6_expires_30_days.png" }}
          resizeMode={"stretch"}
          style={styles.image}
        />
        <Image
          source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/krSnDOWpDM/t4eqchy9_expires_30_days.png" }}
          resizeMode={"stretch"}
          style={styles.image2}
        />
      </View> */}
      <View style={styles.row2}>
        <View style={styles.row3}>
          <Image
            source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/krSnDOWpDM/1v0qoj99_expires_30_days.png" }}
            resizeMode={"stretch"}
            style={styles.image3}
          />
          <View style={styles.column2}>
            <Text style={styles.text}>{"Aarón Portobanco"}</Text>
            <Text style={styles.text2}>{"aaronportobanco@gmail.com"}</Text>
          </View>
        </View>
        <Image
          source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/krSnDOWpDM/1z1wxrrc_expires_30_days.png" }}
          resizeMode={"stretch"}
          style={styles.image4}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    column: {
        backgroundColor: "#FFFFFF",
        marginBottom: moderateScale(20),
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#FFFFFF",
        paddingVertical: moderateScale(12),
        marginBottom: moderateScale(17),
    },
    image: {
        width: scale(61),
        height: moderateScale(18),
        marginLeft: scale(18),
    },
    image2: {
        width: scale(114),
        height: moderateScale(18),
        marginRight: scale(19),
    },
    row2: {
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: scale(20),
    },
    row3: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        marginRight: scale(12),
    },
    image3: {
        width: moderateScale(32),
        height: moderateScale(32),
        marginRight: scale(12),
    },
    column2: {
        flex: 1,
    },
    text: {
        color: "#454A53",
        fontSize: moderateScale(14),
        fontFamily: "Montserrat_600SemiBold",
    },
    text2: {
        color: "#9EA2AD",
        fontSize: moderateScale(12),
        fontFamily: "Montserrat_600SemiBold",
    },
    image4: {
        width: moderateScale(24),
        height: moderateScale(24),
    },
});

export default Header;
