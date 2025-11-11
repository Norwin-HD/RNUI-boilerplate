import React, { Children } from "react";

import {
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

const KeyboardAvoiding = ({children}: any) => {
  return (
    <KeyboardAvoidingView style={{flex: 1}}>
      <ScrollView>
        <TouchableWithoutFeedback>
            {children}
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default KeyboardAvoiding;
