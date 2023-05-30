import { FC } from "react";

import { RootStackParamList } from "src/shared";

import { HomeView } from "../../views";

type LoginControllerProps = FC<RootStackParamList["Home"]>;

export const LoginController: LoginControllerProps = () => <HomeView />;
