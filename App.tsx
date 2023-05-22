import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";
import { NativeWindStyleSheet } from "nativewind";
import { SafeAreaView } from "react-native";

import { Bootstrap } from "./src";

NativeWindStyleSheet.setOutput({ default: "native" });
const statusBarHeight = Constants.statusBarHeight;

export default () => {
  return (
    <SafeAreaView style={{ flex: 1, marginTop: statusBarHeight }}>
      <StatusBar style="dark" />
      <Bootstrap />
    </SafeAreaView>
  );
};
