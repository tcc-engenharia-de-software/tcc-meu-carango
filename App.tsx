import { AuthProvider } from "src/modules";
import Constants from "expo-constants";
import { EntryPoint } from "src";
import { NativeWindStyleSheet } from "nativewind";
import { SafeAreaView } from "react-native";

NativeWindStyleSheet.setOutput({ default: "native" });

export default () => {
  return (
    <SafeAreaView style={{ flex: 1, marginTop: Constants.statusBarHeight }}>
      <AuthProvider>
        <EntryPoint />
      </AuthProvider>
    </SafeAreaView>
  );
};
