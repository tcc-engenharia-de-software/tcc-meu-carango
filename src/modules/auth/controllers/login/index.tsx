import { RootStackScreenProps } from "../../../../shared";
import { useLoginController } from "../../hooks";
import { LoginView } from "../../views";

export const LoginController = ({
  navigation,
}: RootStackScreenProps<"Home">) => {
  const loginController = useLoginController({ navigation });

  return <LoginView onSubmit={loginController.onSubmit} />;
};
