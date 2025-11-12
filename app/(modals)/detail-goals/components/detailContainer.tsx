import React from "react";
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    useWindowDimensions,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { moderateScale, verticalScale } from "react-native-size-matters";

interface Props {
  children?: React.ReactNode;
}

export default function DetailGoalsContainer({ children }: Props) {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const isLarge = width >= 768;
  const contentPadding = isLarge ? moderateScale(32) : moderateScale(20);
  const maxContentWidth = isLarge ? 760 : undefined;

  // reserve extra space at bottom so floating footer doesn't cover content
  const reservedFooterSpace = moderateScale(88);

  return (
    <KeyboardAvoidingView
      style={styles.wrapper}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.container,
          {
            paddingBottom: verticalScale(40) + insets.bottom + reservedFooterSpace,
            paddingHorizontal: contentPadding,
            alignSelf: "center",
            width: "100%",
            maxWidth: maxContentWidth,
          },
        ]}
      >
        <View style={styles.panel}>{children}</View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    borderTopLeftRadius: moderateScale(18),
    borderTopRightRadius: moderateScale(18),
    backgroundColor: "#ffffff",
  },
  container: {
    paddingTop: verticalScale(24),
    gap: verticalScale(16),
  },
  panel: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: moderateScale(18),
    borderTopRightRadius: moderateScale(18),
    paddingTop: verticalScale(24),
    gap: verticalScale(16),
  },
});
