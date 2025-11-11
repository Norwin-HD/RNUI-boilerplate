import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { moderateScale, verticalScale } from 'react-native-size-matters';

interface Props {
  children: React.ReactNode;
}

export default function PanelContainer({ children }: Props) {
  const insets = useSafeAreaInsets();

  return (
    <KeyboardAvoidingView
      style={styles.wrapper}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={[
          styles.container,
          { flexGrow: 1, paddingBottom: verticalScale(20) + insets.bottom + moderateScale(120) },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {children}
        <View style={{ height: insets.bottom }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: moderateScale(18),
    borderTopRightRadius: moderateScale(18),
  },
  container: {
    paddingHorizontal: moderateScale(20),
    paddingTop: verticalScale(24),
    gap: verticalScale(16),
  },
});
