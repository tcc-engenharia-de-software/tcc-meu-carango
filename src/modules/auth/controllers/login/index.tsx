import { FC } from "react";
import { RootStackParamList } from "src/shared";

import { useLoginModel } from "../../models";
import { LoginView } from "../../views";

type LoginControllerProps = FC<RootStackParamList["Home"]>;

export const LoginController: LoginControllerProps = ({ navigation }) => (
  <LoginView {...useLoginModel({ navigation })} />
);
