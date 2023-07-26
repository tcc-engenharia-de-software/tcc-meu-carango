import { FC } from "react";

import { RootStackParamList } from "src/shared";

import { HomeView } from "../views";
import { useHomeModel } from "../model";

type HomeControllerProps = FC<RootStackParamList["Home"]>;

export const HomeController: HomeControllerProps = ({ navigation }) => (
  <HomeView {...useHomeModel({ navigation })} />
);
