import { FC } from "react";

import { RootStackParamList } from "src/shared";

import { useLoginController } from "../../hooks";
import { LoginView } from "../../views";

type LoginControllerProps = FC<RootStackParamList["Home"]>;

export const LoginController: LoginControllerProps = ({ navigation }) => (
  <LoginView {...useLoginController({ navigation })} />
);
