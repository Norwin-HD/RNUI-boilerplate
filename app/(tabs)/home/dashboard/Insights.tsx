
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

interface InsightsProps {
  insightText: string;
  onConfigureAlerts: () => void;
}

const Insights = ({ insightText, onConfigureAlerts }: InsightsProps) => {
  return (
    <View>
      <View style={styles.card}>
        <View style={styles.header}>
          <Ionicons
            name="bulb"
            size={moderateScale(30)}
            color="#FFFFFF"
            style={{ marginRight: scale(8) }}
          />
          <Text style={styles.title}>{"Insight del mes"}</Text>
        </View>
        <Text style={styles.bodyText}>{insightText}</Text>
      </View>
      <TouchableOpacity style={styles.configureButton} onPress={onConfigureAlerts}>
        <Text style={styles.configureButtonText}>{"Configurar alertas"}</Text>
        <Ionicons
          name="chevron-forward"
          size={moderateScale(24)}
          color="#000000"
        />
      </TouchableOpacity>
    </View>
  );
};

// Using the component with mock data for demonstration
const InsightsContainer = () => {
    const mockInsight = "Tus gastos en comidas fuera subieron 20% este mes. 🌮 Considera cocinar más en casa para ahorrar.";
    const handleConfigureAlerts = () => alert("Navigate to alert configuration!");

    return <Insights insightText={mockInsight} onConfigureAlerts={handleConfigureAlerts} />;
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#3476F4",
        borderRadius: moderateScale(18),
        paddingVertical: verticalScale(16),
        marginBottom: verticalScale(25),
        // The boxShadow property is not standard in React Native, but I'm keeping it
        // as it was in the code you provided. It might be supported by a library in your project.
        boxShadow: "0 0 0 2px #000 inset, 4px 4px 0 0 #000",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: verticalScale(16),
        marginLeft: scale(16),
    },
    title: {
        color: "#FFFFFF",
        fontSize: moderateScale(16),
        fontFamily: "Montserrat_600SemiBold",
    },
    bodyText: {
        color: "#FFFFFF",
        fontSize: moderateScale(14),
        marginHorizontal: scale(16),
        fontFamily: "Montserrat_500Medium",
    },
    configureButton: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: scale(8),
        marginBottom: verticalScale(70),
    },
    configureButtonText: {
        color: "#000000",
        fontSize: moderateScale(18),
        marginRight: scale(12),
        fontFamily: "Montserrat_500Medium",
    },
});

export default InsightsContainer;
