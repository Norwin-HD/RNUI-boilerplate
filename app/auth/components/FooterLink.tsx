import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface FooterLinkProps {
  question: string;
  actionText: string;
  linkTo: string; 
}

const FooterLink: React.FC<FooterLinkProps> = ({ question, actionText, linkTo }) => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {question}{" "}
        <Text
          style={styles.link}
          onPress={() => router.push(linkTo as string)}
        >
          {actionText}
        </Text>
      </Text>
    </View>
  );
};

export default FooterLink;

const styles = StyleSheet.create({
  container: { alignItems: "center", marginTop: 10 },
  text: { color: "#6B7280", fontSize: 13, textAlign: "center" },
  link: { color: "#3476F4", fontWeight: "700" },
});
