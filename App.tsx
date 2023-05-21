import { StatusBar } from "expo-status-bar";
import { NativeWindStyleSheet } from "nativewind";

import { Bootstrap } from "./src";

NativeWindStyleSheet.setOutput({ default: "native" });

export default () => (
  <>
    <StatusBar style="auto" />
    <Bootstrap />
  </>
);
