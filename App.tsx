import Constants from "expo-constants";
import { NativeWindStyleSheet } from "nativewind";
import { SafeAreaView } from "react-native";

import { EntryPoint } from "./src";
import { AuthProvider } from "src/modules";

NativeWindStyleSheet.setOutput({ default: "native" });

export default () => (
  <SafeAreaView style={{ flex: 1, marginTop: Constants.statusBarHeight }}>
    <AuthProvider>
      <EntryPoint />
    </AuthProvider>
  </SafeAreaView>
);
