import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import AppText from "../components/AppText";

interface FooterLinkProps {
  question: string;
  actionText: string;
  linkTo: string;
}

const FooterLink: React.FC<FooterLinkProps> = ({
  question,
  actionText,
  linkTo,
}) => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <AppText variant="regular" style={styles.text}>
        {question}{" "}
        <AppText
          variant="medium"
          style={styles.link}
          onPress={() => router.push(linkTo)}
        >
          {actionText}
        </AppText>
      </AppText>
    </View>
  );
};

export default FooterLink;

const styles = StyleSheet.create({
  container: { alignItems: "center", marginTop: verticalScale(6) },
  text: { color: "#6B7280", fontSize: scale(12), textAlign: "center" },
  link: { color: "#3476F4" },
});