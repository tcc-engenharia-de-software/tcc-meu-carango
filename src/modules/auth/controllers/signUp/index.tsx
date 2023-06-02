import { FC } from "react";

import { RootStackParamList } from "src/shared";

import { useSignUpModel } from "../../models";
import { SignUpView } from "../../views";

type SignUpControllerProps = FC<RootStackParamList["Home"]>;

export const SignUpController: SignUpControllerProps = ({ navigation }) => (
  <SignUpView {...useSignUpModel({ navigation })} />
);
