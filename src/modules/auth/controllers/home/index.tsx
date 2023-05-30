import { FC } from "react";

import { RootStackParamList } from "src/shared";

import { HomeView } from "../../views";

type HomeControllerProps = FC<RootStackParamList["Home"]>;

export const HomeController: HomeControllerProps = () => <HomeView />;
