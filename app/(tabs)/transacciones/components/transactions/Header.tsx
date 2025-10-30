
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';

const Header = () => {
  return (
    <View style={styles.column}>
        <Text style={styles.text}>{"Transacciones"}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    column: {
        backgroundColor: "#FFFFFF",
        marginBottom: moderateScale(20),
    },
    text: {
        color: "#454A53",
        fontSize: moderateScale(24),
        fontFamily: "Montserrat_700Bold",
    },
});

export default Header;
