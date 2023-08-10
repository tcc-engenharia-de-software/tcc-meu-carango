import Constants from "expo-constants";
import { NativeWindStyleSheet } from "nativewind";
import { SafeAreaView } from "react-native";

import { EntryPoint } from "./src";
import { TopBar } from "src/components/TopBar";

NativeWindStyleSheet.setOutput({ default: "native" });

export default () => (
  <SafeAreaView style={{ flex: 1, marginTop: Constants.statusBarHeight }}>
    <TopBar title="te" description="fwef" />
    <EntryPoint />
  </SafeAreaView>
);
